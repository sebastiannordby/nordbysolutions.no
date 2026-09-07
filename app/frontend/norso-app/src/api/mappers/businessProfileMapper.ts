import type { BusinessProfileDto } from '@/api/contracts/business';
import type { CategoryId, Place } from '@/types';

const MISSING_VALUE = 'Mangler verdi';
const PIN_COLORS = ['#5E7B4F', '#C2643B', '#8A7B4F', '#5F7F86'] as const;

const GEO_BOUNDS = {
  minLng: 10.05,
  maxLng: 10.45,
  minLat: 59.15,
  maxLat: 59.45,
} as const;

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function toMapPoint(longitude: number, latitude: number): Place['point'] {
  const x = (longitude - GEO_BOUNDS.minLng) / (GEO_BOUNDS.maxLng - GEO_BOUNDS.minLng);
  const y = (GEO_BOUNDS.maxLat - latitude) / (GEO_BOUNDS.maxLat - GEO_BOUNDS.minLat);
  return { x: clamp(x, 0, 1), y: clamp(y, 0, 1) };
}

function toDistanceKm(userLatitude: number, userLongitude: number, latitude: number, longitude: number): number {
  const R = 6371;
  const dLat = ((latitude - userLatitude) * Math.PI) / 180;
  const dLon = ((longitude - userLongitude) * Math.PI) / 180;
  const lat1 = (userLatitude * Math.PI) / 180;
  const lat2 = (latitude * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(1));
}

interface UserLocation {
  latitude: number;
  longitude: number;
}

export function mapBusinessProfilesToPlaces(
  businesses: BusinessProfileDto[],
  userLocation: UserLocation,
): Place[] {
  return businesses.map((business) => {
    const seed = hashString(`${business.organizationNumber}-${business.name}`);
    const category: CategoryId = 'market';

    return {
      id: business.organizationNumber,
      name: business.name,
      category,
      categoryLabel: MISSING_VALUE,
      municipality: business.city,
      distanceKm: toDistanceKm(userLocation.latitude, userLocation.longitude, business.latitude, business.longitude),
      openLabel: MISSING_VALUE,
      isOpenNow: false,
      shortNote: MISSING_VALUE,
      description: `${business.name} ligger i ${business.address}, ${business.postalCode} ${business.city}.`,
      facts: [
        { label: 'Org.nr', value: business.organizationNumber },
        { label: 'Adresse', value: `${business.address}, ${business.postalCode} ${business.city}` },
        { label: 'Telefon', value: business.phoneNumber || MISSING_VALUE },
        { label: 'E-post', value: business.emailAddress || MISSING_VALUE },
        { label: 'Åpent', value: MISSING_VALUE },
        { label: 'Praktisk', value: MISSING_VALUE },
      ],
      facilities: [],
      hearts: 0,
      tips: [],
      point: toMapPoint(business.longitude, business.latitude),
      pinColor: PIN_COLORS[seed % PIN_COLORS.length],
      longitude: business.longitude,
      latitude: business.latitude,
      phoneNumber: business.phoneNumber || undefined,
      emailAddress: business.emailAddress || undefined,
    };
  });
}
