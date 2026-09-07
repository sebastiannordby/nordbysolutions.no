export type Screen =
  | 'map'
  | 'filter'
  | 'place'
  | 'explore'
  | 'events'
  | 'trips'
  | 'saved'
  | 'profile'
  | 'addPlace';

export type CategoryId =
  | 'farmShop'
  | 'petZoo'
  | 'handmade'
  | 'pickYourOwn'
  | 'fleaMarket'
  | 'cafe'
  | 'workshop'
  | 'market'
  | 'event'
  | 'walk';

export interface Category {
  id: CategoryId;
  label: string;
  color: string;
}

/** Normalised 0-1 position on the stylised map canvas. */
export interface MapPoint {
  x: number;
  y: number;
}

export interface Place {
  id: string;
  name: string;
  category: CategoryId;
  categoryLabel: string;
  municipality: string;
  distanceKm: number;
  openLabel: string;
  isOpenNow: boolean;
  shortNote: string;
  description: string;
  facts: PlaceFact[];
  facilities: Facility[];
  hearts: number;
  tips: Tip[];
  point: MapPoint;
  pinColor: string;
  longitude?: number;
  latitude?: number;
  phoneNumber?: string;
  emailAddress?: string;
}

export interface PlaceFact {
  label: string;
  value: string;
}

export type Facility = 'changingTable' | 'toilet' | 'parking' | 'vipps' | 'strollerFriendly' | 'dogsAllowed';

export interface Tip {
  id: string;
  text: string;
  author: string;
}

export interface Event {
  id: string;
  name: string;
  placeName: string;
  distanceKm?: number;
  /** ISO date, e.g. 2026-09-12 */
  date: string;
  startTime: string;
  durationLabel: string;
  priceLabel: string;
  tag: string;
}

export interface TripStop {
  placeId?: string;
  name: string;
  note: string;
}

export interface Trip {
  id: string;
  name: string;
  stopCount: number;
  distanceKm: number;
  durationLabel: string;
  note: string;
  stops: TripStop[];
  featured?: boolean;
}

export interface Filters {
  query: string;
  categories: CategoryId[];
  radiusKm: RadiusKm;
  openNow: boolean;
  changingTable: boolean;
  parking: boolean;
  vipps: boolean;
}

export type RadiusKm = 5 | 10 | 25 | 50;

export type Language = 'nb' | 'en';

export interface NewPlaceDraft {
  category: string;
  name: string;
  shortDescription: string;
  address: string;
  openingHours: string;
  season: string;
  facilities: string;
  photos: string;
  contact: string;
}
