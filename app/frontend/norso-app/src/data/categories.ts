import type { Category } from '@/types';

export const categories: Category[] = [
  { id: 'farmShop', label: 'Gårdsbutikk', color: '#C2643B' },
  { id: 'petZoo', label: 'Besøksgård', color: '#5E7B4F' },
  { id: 'handmade', label: 'Håndlaget', color: '#8A7B4F' },
  { id: 'pickYourOwn', label: 'Selvplukk', color: '#7E9B62' },
  { id: 'event', label: 'Små arrangement', color: '#B0774A' },
  { id: 'walk', label: 'Turer i nærheten', color: '#5F7F86' },
  { id: 'fleaMarket', label: 'Loppemarked', color: '#A9673F' },
  { id: 'cafe', label: 'Kafé', color: '#8D6A46' },
  { id: 'workshop', label: 'Verksted', color: '#6E7A52' },
  { id: 'market', label: 'Marked', color: '#B0774A' },
];

export const categoryById = Object.fromEntries(
  categories.map((c) => [c.id, c]),
) as Record<Category['id'], Category>;

/** The subset shown as filter chips on the map header. */
export const quickFilterCategories = categories.slice(0, 4);
