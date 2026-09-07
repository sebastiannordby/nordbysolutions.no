const NB_DAYS = ['søn', 'man', 'tir', 'ons', 'tor', 'fre', 'lør'];
const NB_DAYS_LONG = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'];
const NB_MONTHS = [
  'januar', 'februar', 'mars', 'april', 'mai', 'juni',
  'juli', 'august', 'september', 'oktober', 'november', 'desember',
];

export function formatDistance(km: number): string {
  return km.toString().replace('.', ',') + ' km';
}

export function shortWeekday(iso: string): string {
  return NB_DAYS[new Date(iso + 'T12:00:00').getDay()];
}

export function dayOfMonth(iso: string): string {
  return String(new Date(iso + 'T12:00:00').getDate());
}

export function longDate(iso: string): string {
  const d = new Date(iso + 'T12:00:00');
  return NB_DAYS_LONG[d.getDay()] + ' ' + d.getDate() + '. ' + NB_MONTHS[d.getMonth()];
}

export function monthName(iso: string): string {
  const name = NB_MONTHS[new Date(iso + 'T12:00:00').getMonth()];
  return name.charAt(0).toUpperCase() + name.slice(1);
}
