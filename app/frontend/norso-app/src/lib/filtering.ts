import type { Filters, Place } from '@/types';

export const defaultFilters: Filters = {
  query: '',
  categories: [],
  radiusKm: 10,
  openNow: false,
  changingTable: false,
  parking: false,
  vipps: false,
};

export function filterPlaces(places: Place[], filters: Filters): Place[] {
  const q = filters.query.trim().toLowerCase();
  return places.filter((place) => {
    if (q && !place.name.toLowerCase().includes(q)) return false;
    if (place.distanceKm > filters.radiusKm) return false;
    if (filters.categories.length && !filters.categories.includes(place.category)) return false;
    if (filters.openNow && !place.isOpenNow) return false;
    if (filters.changingTable && !place.facilities.includes('changingTable')) return false;
    if (filters.parking && !place.facilities.includes('parking')) return false;
    if (filters.vipps && !place.facilities.includes('vipps')) return false;
    return true;
  });
}

export function toggleInArray<T>(arr: T[], value: T): T[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}
