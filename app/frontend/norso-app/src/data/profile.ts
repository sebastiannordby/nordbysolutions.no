import type { NewPlaceDraft } from '@/types';

export const currentUser = {
  name: 'Sebastian Nordby',
  municipality: 'Sørumsand',
  memberSince: 2025,
  publishedPlaces: 1,
  notificationSetting: 'Nytt i nærheten',
};

export const savedPlaceIds = ['bjorkelia', 'kleivane', 'vevstua'];
export const savedPlaceCount = 7;

export const emptyDraft: NewPlaceDraft = {
  category: '',
  name: '',
  shortDescription: '',
  address: '',
  openingHours: '',
  season: '',
  facilities: '',
  photos: '',
  contact: '',
};

/** Values the POC showed pre-filled; useful as demo seed data. */
export const demoDraft: NewPlaceDraft = {
  category: 'Gårdsbutikk',
  name: 'Solbakken gårdsutsalg',
  shortDescription: 'Ubetjent utsalg med egg, poteter og syltetøy.',
  address: 'Solbakkveien 14, 3158 Andebu',
  openingHours: 'Tor–søn 10–18, ellers etter avtale',
  season: 'Mai–oktober',
  facilities: 'Parkering · Toalett · Vipps',
  photos: '3 bilder lagt til',
  contact: '901 23 456',
};
