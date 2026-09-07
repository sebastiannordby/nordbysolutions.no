import { useMemo } from 'react';
import { HeartIcon } from '@/components/Icons';
import { formatDistance } from '@/lib/format';
import type { Place } from '@/types';
import './SavedScreen.css';

interface SavedScreenProps {
  places: Place[];
  heartedIds: string[];
  onOpenPlace: (id: string) => void;
  onToggleHeart: (id: string) => void;
}

export function SavedScreen({ places, heartedIds, onOpenPlace, onToggleHeart }: SavedScreenProps) {
  const placeById = useMemo(
    () => Object.fromEntries(places.map((place) => [place.id, place])) as Record<string, Place>,
    [places],
  );
  const saved = heartedIds.map((id) => placeById[id]).filter((place): place is Place => Boolean(place));

  return (
    <div className="screen">
      <header style={{ padding: 'calc(var(--safe-top) + 24px) var(--gutter) 0' }}>
        <h1 className="screen__title">Lagret</h1>
        <p className="screen__subtitle">
          {saved.length} {saved.length === 1 ? 'sted' : 'steder'} · 1 liste
        </p>
      </header>

      <div className="section">
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {saved.map((place) => (
            <li className="saved-row" key={place.id}>
              <button
                type="button"
                style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}
                onClick={() => onOpenPlace(place.id)}
              >
                <span className="saved-row__photo" />
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span className="saved-row__name" style={{ display: 'block' }}>
                    {place.name}
                  </span>
                  <span className="saved-row__meta">
                    {place.categoryLabel} · {place.municipality} · {formatDistance(place.distanceKm)}
                  </span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => onToggleHeart(place.id)}
                aria-label={'Fjern ' + place.name + ' fra lagret'}
                style={{ flex: 'none', display: 'flex' }}
              >
                <HeartIcon color="#C2643B" size={18} filled />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <button type="button" className="new-list">
          <span className="new-list__title" style={{ display: 'block' }}>
            Ny liste
          </span>
          <span className="new-list__help">Samle steder til en tur, f.eks. «Sommerferie på Sørlandet»</span>
        </button>
      </div>

      <div className="tabbar-spacer" />
    </div>
  );
}
