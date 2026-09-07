import type { Trip } from '@/types';

export const trips: Trip[] = [
  {
    id: 'rolig-sondag',
    name: 'En rolig søndag i Andebu',
    stopCount: 4,
    distanceKm: 38,
    durationLabel: 'omtrent 5 timer',
    note: 'Fire stopp som ligger fint etter hverandre',
    featured: true,
    stops: [
      { placeId: 'sandnes', name: 'Sandnes gårdsutsalg', note: 'Kaffe og nybakt · åpner 10' },
      { placeId: 'kleivane', name: 'Kleivane blomsterhage', note: 'Selvplukk · ta med saks' },
      { name: 'Presteskogen rundt', note: '4 km rolig tur · går med vogn' },
      { placeId: 'bjorkelia', name: 'Bjørkelia besøksgård', note: 'Fôring 15 · vafler' },
    ],
  },
  {
    id: 'med-barn-i-re',
    name: 'Med barn i Re',
    stopCount: 3,
    distanceKm: 22,
    durationLabel: '3 timer',
    note: 'Alle stopp har stellerom og parkering',
    stops: [
      { placeId: 'bjorkelia', name: 'Bjørkelia besøksgård', note: 'Fôring 12 og 15' },
      { placeId: 'vevstua', name: 'Vevstua på Vollen', note: 'Barn får prøve veven' },
      { name: 'Vollen badeplass', note: 'Grillplass og sandstrand' },
    ],
  },
  {
    id: 'handlaget-langs-lagen',
    name: 'Håndlaget langs Lågen',
    stopCount: 5,
    distanceKm: 54,
    durationLabel: 'en dag',
    note: 'Vev, keramikk, tre og glass',
    stops: [
      { placeId: 'vevstua', name: 'Vevstua på Vollen', note: 'Ull og vev' },
      { name: 'Lågen keramikk', note: 'Åpen ovn på lørdager' },
      { name: 'Treverkstedet i Hvarnes', note: 'Skjærefjøl og skåler' },
      { name: 'Glasshytta', note: 'Demonstrasjon kl. 13' },
      { name: 'Kafé Bruket', note: 'Siste stopp, hjemmebakst' },
    ],
  },
];

export const featuredTrip = trips.find((t) => t.featured) ?? trips[0];
