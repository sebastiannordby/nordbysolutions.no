import { MapCanvas } from '@/components/MapCanvas';
import { Chip } from '@/components/Chip';
import { SearchIcon } from '@/components/Icons';
import { quickFilterCategories } from '@/data/categories';
import { formatDistance } from '@/lib/format';
import type { Place } from '@/types';
import './MapScreen.css';

interface MapScreenProps {
  selectedPlace: Place | null;
  visiblePlaces: Place[];
  radiusKm: number;
  quickCategory: string;
  onQuickCategory: (id: string) => void;
  onSelectPlace: (id: string) => void;
  onOpenPlace: (id: string) => void;
  onOpenFilter: () => void;
}

export function MapScreen({
  selectedPlace,
  visiblePlaces,
  radiusKm,
  quickCategory,
  onQuickCategory,
  onSelectPlace,
  onOpenPlace,
  onOpenFilter,
}: MapScreenProps) {
  const mapPlaces = selectedPlace
    ? visiblePlaces.some((p) => p.id === selectedPlace.id)
      ? visiblePlaces
      : [selectedPlace, ...visiblePlaces]
    : visiblePlaces;
  const others = selectedPlace ? mapPlaces.filter((p) => p.id !== selectedPlace.id).slice(0, 2) : [];

  return (
    <div className="screen screen--map">
      <MapCanvas places={mapPlaces} selectedPlaceId={selectedPlace?.id ?? ''} onSelectPlace={onSelectPlace} />

      <div className="map-header">
        <button type="button" className="map-search" onClick={onOpenFilter}>
          <SearchIcon />
          <span className="map-search__placeholder">Søk i Vestfold</span>
          <span className="map-search__filter">Filter</span>
        </button>
        <div className="map-chips">
          <Chip label="Alle" active={quickCategory === 'all'} onClick={() => onQuickCategory('all')} />
          {quickFilterCategories.map((c) => (
            <Chip
              key={c.id}
              label={c.label}
              active={quickCategory === c.id}
              onClick={() => onQuickCategory(c.id)}
            />
          ))}
        </div>
      </div>

      <div className="map-sheet">
        <div className="map-sheet__grabber" />
        <div className="map-sheet__head">
          <h2 style={{ fontSize: 19 }}>I nærheten</h2>
          <span className="map-sheet__count">
            {visiblePlaces.length} steder innen {radiusKm} km
          </span>
        </div>

        {selectedPlace ? (
          <button type="button" className="place-card" onClick={() => onOpenPlace(selectedPlace.id)}>
            <div className="place-card__photo photo">foto</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="place-card__name">{selectedPlace.name}</div>
              <div className="place-card__meta">
                {selectedPlace.categoryLabel} · {formatDistance(selectedPlace.distanceKm)}
              </div>
              <div className="place-card__tags">
                <span className="badge-open">{selectedPlace.openLabel}</span>
                <span>{selectedPlace.shortNote}</span>
              </div>
            </div>
          </button>
        ) : (
          <div className="place-card" aria-live="polite">
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="place-card__name">Ingen steder funnet</div>
              <div className="place-card__meta">Prøv større radius eller sjekk API-tilkoblingen.</div>
            </div>
          </div>
        )}

        <ul>
          {others.map((place) => (
            <li key={place.id}>
              <button type="button" className="place-row" onClick={() => onOpenPlace(place.id)}>
                <span className="place-row__photo" />
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span className="place-row__name" style={{ display: 'block' }}>
                    {place.name}
                  </span>
                  <span className="place-row__meta">
                    {place.categoryLabel} · {place.shortNote}
                  </span>
                </span>
                <span className="place-row__dist">{formatDistance(place.distanceKm)}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
