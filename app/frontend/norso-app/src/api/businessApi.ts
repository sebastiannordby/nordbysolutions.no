import type { BusinessProfileDto } from '@/api/contracts/business';
import type {
  CarmenGeojsonFeature,
  MaplibreGeocoderApi,
  MaplibreGeocoderApiConfig,
} from '@maplibre/maplibre-gl-geocoder';
import type { Feature, Geometry } from 'geojson';

interface GetBusinessesCloseToParams {
  latitude: number;
  longitude: number;
  radiusInKilometers: number;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';
const NOMINATIM_SEARCH_URL = 'https://nominatim.openstreetmap.org/search';
const NORWAY_BBOX = [4.0, 57.5, 31.5, 71.5] as const;

interface NominatimGeoJsonFeature extends Feature<Geometry> {
  bbox?: [number, number, number, number];
  properties: {
    display_name?: string;
    name?: string;
    place_id?: number;
    osm_type?: string;
    osm_id?: number;
    type?: string;
    category?: string;
  };
}

interface NominatimGeoJsonResponse {
  features?: NominatimGeoJsonFeature[];
}

function isBusinessProfileDto(value: unknown): value is BusinessProfileDto {
  if (typeof value !== 'object' || value === null) return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.name === 'string' &&
    typeof record.organizationNumber === 'string' &&
    typeof record.address === 'string' &&
    typeof record.postalCode === 'string' &&
    typeof record.city === 'string' &&
    typeof record.longitude === 'number' &&
    typeof record.latitude === 'number' &&
    typeof record.phoneNumber === 'string' &&
    (typeof record.emailAddress === 'string' || typeof record.email === 'string')
  );
}

function normalizeBusinessProfileDto(value: BusinessProfileDto): BusinessProfileDto {
  return {
    ...value,
    emailAddress: value.emailAddress ?? value.email ?? '',
  };
}

export async function getBusinessesCloseTo({
  latitude,
  longitude,
  radiusInKilometers,
}: GetBusinessesCloseToParams): Promise<BusinessProfileDto[]> {
  const query = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    radiusInKilometers: String(radiusInKilometers),
  });

  const response = await fetch(`${API_BASE_URL}/api/business/close-to?${query.toString()}`);
  if (!response.ok) {
    throw new Error(`Failed to load nearby businesses (${response.status})`);
  }

  const payload: unknown = await response.json();
  if (!Array.isArray(payload)) {
    throw new Error('Unexpected nearby businesses response shape');
  }

  return payload.filter(isBusinessProfileDto).map(normalizeBusinessProfileDto);
}

function featureCenter(feature: NominatimGeoJsonFeature): [number, number] | undefined {
  if (feature.geometry.type === 'Point') {
    const [longitude, latitude] = feature.geometry.coordinates;
    if (typeof longitude !== 'number' || typeof latitude !== 'number') return undefined;
    return [longitude, latitude];
  }

  if (feature.bbox) {
    const [minLongitude, minLatitude, maxLongitude, maxLatitude] = feature.bbox;
    return [(minLongitude + maxLongitude) / 2, (minLatitude + maxLatitude) / 2];
  }

  return undefined;
}

function toCarmenFeature(feature: NominatimGeoJsonFeature): CarmenGeojsonFeature | null {
  const center = featureCenter(feature);
  const placeName = feature.properties.display_name;
  if (!center || !placeName) return null;

  return {
    ...feature,
    id: String(feature.properties.place_id ?? `${feature.properties.osm_type}-${feature.properties.osm_id}`),
    text: feature.properties.name ?? placeName.split(',')[0],
    place_name: placeName,
    place_type: [feature.properties.type ?? feature.properties.category ?? 'place'],
    center,
    bbox: feature.bbox,
  };
}

export const nominatimGeocoderApi: MaplibreGeocoderApi = {
  async forwardGeocode(config: MaplibreGeocoderApiConfig) {
    const query = typeof config.query === 'string' ? config.query.trim() : '';
    if (query.length < 2) return { type: 'FeatureCollection', features: [] };

    const searchParams = new URLSearchParams({
      q: query,
      format: 'geojson',
      addressdetails: '1',
      countrycodes: config.countries ?? 'no',
      limit: String(config.limit ?? 5),
      'accept-language': config.language ?? 'nb',
      viewbox: config.bbox?.join(',') ?? NORWAY_BBOX.join(','),
      bounded: config.bbox ? '1' : '0',
    });

    const response = await fetch(`${NOMINATIM_SEARCH_URL}?${searchParams.toString()}`);
    if (!response.ok) {
      throw new Error(`Failed to load geocoding suggestions (${response.status})`);
    }

    const payload = (await response.json()) as NominatimGeoJsonResponse;
    const features = (payload.features ?? []).map(toCarmenFeature).filter((item): item is CarmenGeojsonFeature => Boolean(item));

    return { type: 'FeatureCollection', features };
  },
};
