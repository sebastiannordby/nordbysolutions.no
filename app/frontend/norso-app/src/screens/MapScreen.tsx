import { type CSSProperties, useEffect, useRef, useState } from 'react';
import MaplibreGeocoder, { type CarmenGeojsonFeature } from '@maplibre/maplibre-gl-geocoder';
import '@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css';
import { nominatimGeocoderApi } from '@/api/businessApi';
import { MapCanvas } from '@/components/MapCanvas';
import { Chip } from '@/components/Chip';
import { quickFilterCategories } from '@/data/categories';
import { formatDistance } from '@/lib/format';
import type { Place, SearchLocation } from '@/types';
import './MapScreen.css';

interface MapScreenProps {
  selectedPlace: Place | null;
  places: Place[];
  visiblePlaces: Place[];
  radiusKm: number;
  query: string;
  onQueryChange: (query: string) => void;
  searchLocation: SearchLocation | null;
  onSelectSearchLocation: (location: SearchLocation | null) => void;
  quickCategory: string;
  onQuickCategory: (id: string) => void;
  onSelectPlace: (id: string) => void;
  onOpenPlace: (id: string) => void;
  onOpenFilter: () => void;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => {
    switch (character) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '\'':
        return '&#39;';
      default:
        return '&quot;';
    }
  });
}

export function MapScreen({
  selectedPlace,
  places,
  visiblePlaces,
  radiusKm,
  query,
  onQueryChange,
  searchLocation,
  onSelectSearchLocation,
  quickCategory,
  onQuickCategory,
  onSelectPlace,
  onOpenPlace,
  onOpenFilter,
}: MapScreenProps) {
  const geocoderContainerRef = useRef<HTMLDivElement | null>(null);
  const geocoderRef = useRef<MaplibreGeocoder | null>(null);
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const onQueryChangeRef = useRef(onQueryChange);
  const placesRef = useRef<Place[]>(places);
  const [isSheetOpen, setIsSheetOpen] = useState(true);
  const [sheetHeight, setSheetHeight] = useState(0);

  useEffect(() => {
    onQueryChangeRef.current = onQueryChange;
  }, [onQueryChange]);

  useEffect(() => {
    placesRef.current = places;
  }, [places]);

  useEffect(() => {
    const container = geocoderContainerRef.current;
    if (!container || geocoderRef.current) return;

    const geocoder = new MaplibreGeocoder(nominatimGeocoderApi, {
      countries: 'no',
      debounceSearch: 350,
      flyTo: false,
      language: 'nb',
      limit: 6,
      localGeocoder: (searchText) => {
        const normalizedSearch = searchText.trim().toLocaleLowerCase('nb-NO');
        if (normalizedSearch.length < 2) return [];

        return placesRef.current
          .filter((place) =>
            [place.name, place.municipality, place.categoryLabel]
              .join(' ')
              .toLocaleLowerCase('nb-NO')
              .includes(normalizedSearch),
          )
          .slice(0, 4)
          .map<CarmenGeojsonFeature>((place) => ({
            type: 'Feature',
            id: place.id,
            geometry: {
              type: 'Point',
              coordinates: [place.longitude ?? 10.2167, place.latitude ?? 59.1333],
            },
            properties: {},
            text: place.name,
            place_name: `${place.name}, ${place.municipality}`,
            place_type: ['business'],
            center: [place.longitude ?? 10.2167, place.latitude ?? 59.1333],
          }));
      },
      marker: false,
      minLength: 2,
      placeholder: 'Søk hvor som helst',
      showResultMarkers: false,
      showResultsWhileTyping: true,
      getItemValue: (item) => item.text,
      render: (item) => {
        if (!('place_name' in item)) return escapeHtml(item.text);
        return `<strong>${escapeHtml(item.text)}</strong><span>${escapeHtml(item.place_name)}</span>`;
      },
    });

    const handleResult = ({ result }: { result: CarmenGeojsonFeature }) => {
      const [longitude, latitude] = result.center ?? [];
      if (typeof longitude === 'number' && typeof latitude === 'number') {
        onSelectSearchLocation({ label: result.text, longitude, latitude });
      }
      onQueryChangeRef.current(result.text);
    };
    const handleClear = () => {
      onSelectSearchLocation(null);
      onQueryChangeRef.current('');
    };
    const handleInput = (event: Event) => {
      const input = event.currentTarget;
      if (!(input instanceof HTMLInputElement)) return;
      if (!input.value.trim()) onSelectSearchLocation(null);
      onQueryChangeRef.current(input.value);
    };

    geocoder.addTo(container);
    geocoder.on('result', handleResult);
    geocoder.on('clear', handleClear);
    geocoderRef.current = geocoder;

    const input = container.querySelector<HTMLInputElement>('.maplibregl-ctrl-geocoder--input');
    if (input) {
      input.type = 'text';
      input.addEventListener('input', handleInput);
    }

    return () => {
      input?.removeEventListener('input', handleInput);
      geocoder.off('result', handleResult);
      geocoder.off('clear', handleClear);
      geocoder.onRemove();
      geocoderRef.current = null;
    };
  }, [onSelectSearchLocation]);

  useEffect(() => {
    const input = geocoderContainerRef.current?.querySelector<HTMLInputElement>('.maplibregl-ctrl-geocoder--input');
    if (input?.value === query) return;
    geocoderRef.current?.setInput(query);
  }, [query]);

  const mapPlaces = selectedPlace
    ? visiblePlaces.some((p) => p.id === selectedPlace.id)
      ? visiblePlaces
      : [selectedPlace, ...visiblePlaces]
    : visiblePlaces;
  const sheetTopPlace = visiblePlaces[0] ?? null;
  const sheetPlaces = visiblePlaces.slice(sheetTopPlace ? 1 : 0, 100);

  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet || !isSheetOpen) return;

    const updateSheetHeight = () => setSheetHeight(sheet.getBoundingClientRect().height);
    updateSheetHeight();

    const observer = new ResizeObserver(updateSheetHeight);
    observer.observe(sheet);

    return () => {
      observer.disconnect();
    };
  }, [isSheetOpen, mapPlaces.length]);

  const mapBottomInset = isSheetOpen
    ? `calc(var(--tabbar-height) + ${sheetHeight}px)`
    : 'var(--tabbar-height)';
  const screenStyle = { '--map-bottom-inset': mapBottomInset } as CSSProperties;

  return (
    <div
      className={'screen screen--map' + (isSheetOpen ? ' screen--map-sheet-open' : ' screen--map-sheet-closed')}
      style={screenStyle}
    >
      <MapCanvas
        places={mapPlaces}
        selectedPlaceId={selectedPlace?.id ?? ''}
        searchLocation={searchLocation}
        onSelectPlace={onSelectPlace}
        onLongPressLocation={(location) => {
          onSelectSearchLocation(location);
          onQueryChange('');
        }}
      />

      <div className="map-header">
        <div className="map-search-wrap">
          <div ref={geocoderContainerRef} className="map-search-geocoder" />
          <button type="button" className="map-search__filter" onClick={onOpenFilter}>
            Filter
          </button>
        </div>
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

      {isSheetOpen ? (
        <div ref={sheetRef} className="map-sheet">
          <button
            type="button"
            className="map-sheet__grabber"
            aria-label="Skjul liste"
            onClick={() => setIsSheetOpen(false)}
          >
            <span />
          </button>
          <div className="map-sheet__head">
            <h2 style={{ fontSize: 19 }}>I nærheten</h2>
            <button type="button" className="map-sheet__hide" onClick={() => setIsSheetOpen(false)}>
              Skjul
            </button>
            <span className="map-sheet__count">
              {visiblePlaces.length} steder innen {radiusKm} km
            </span>
          </div>

          {sheetTopPlace ? (
            <button type="button" className="place-card" onClick={() => onOpenPlace(sheetTopPlace.id)}>
              <div className="place-card__photo photo">foto</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="place-card__name">{sheetTopPlace.name}</div>
                <div className="place-card__meta">
                  {sheetTopPlace.categoryLabel} · {formatDistance(sheetTopPlace.distanceKm)}
                </div>
                <div className="place-card__tags">
                  <span className="badge-open">{sheetTopPlace.openLabel}</span>
                  <span>{sheetTopPlace.shortNote}</span>
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

          <ul className="map-sheet__list">
            {sheetPlaces.map((place) => (
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
      ) : (
        <button type="button" className="map-sheet-toggle" onClick={() => setIsSheetOpen(true)}>
          Vis {visiblePlaces.length} steder
        </button>
      )}
    </div>
  );
}
