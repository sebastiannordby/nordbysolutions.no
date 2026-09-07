import type { BusinessProfileDto } from '@/api/contracts/business';

interface GetBusinessesCloseToParams {
  latitude: number;
  longitude: number;
  radiusInKilometers: number;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5030';

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
