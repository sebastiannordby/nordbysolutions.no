import { useEffect, useRef } from 'react';
import * as maplibregl from 'maplibre-gl';
import { type LngLatLike, type Map as MapLibreMap, type Marker } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { Place } from '@/types';

interface MapCanvasProps {
  places: Place[];
  selectedPlaceId: string;
  onSelectPlace: (id: string) => void;
}

const BASEMAP_STYLE_URL = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

const GEO_BOUNDS = {
  minLng: 10.05,
  maxLng: 10.45,
  minLat: 59.15,
  maxLat: 59.45,
} as const;

function pointToLngLat(point: Place['point']): LngLatLike {
  const lng = GEO_BOUNDS.minLng + (GEO_BOUNDS.maxLng - GEO_BOUNDS.minLng) * point.x;
  const lat = GEO_BOUNDS.maxLat - (GEO_BOUNDS.maxLat - GEO_BOUNDS.minLat) * point.y;
  return [lng, lat];
}

function placeToLngLat(place: Place): LngLatLike {
  if (typeof place.longitude === 'number' && typeof place.latitude === 'number') {
    return [place.longitude, place.latitude];
  }
  return pointToLngLat(place.point);
}

export function MapCanvas({ places, selectedPlaceId, onSelectPlace }: MapCanvasProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Map<string, Marker>>(new Map());

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const selected = places.find((p) => p.id === selectedPlaceId) ?? places[0];
    const center: LngLatLike = selected ? placeToLngLat(selected) : [10.2167, 59.1333] as [number, number];
    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style: BASEMAP_STYLE_URL,
      center,
      zoom: 12,
      maxZoom: 18,
    });

    mapRef.current.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

    if (navigator.geolocation) {
      mapRef.current.addControl(
        new maplibregl.GeolocateControl({
          positionOptions: { enableHighAccuracy: true },
          trackUserLocation: true,
          fitBoundsOptions: { maxZoom: 15 },
        }),
        'top-right',
      );
    }

    return () => {
      for (const marker of markersRef.current.values()) marker.remove();
      markersRef.current.clear();
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [places, selectedPlaceId]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const nextIds = new Set(places.map((p) => p.id));

    for (const [id, marker] of markersRef.current.entries()) {
      if (!nextIds.has(id)) {
        marker.remove();
        markersRef.current.delete(id);
      }
    }

    for (const place of places) {
      const existing = markersRef.current.get(place.id);
      const isActive = place.id === selectedPlaceId;
      if (existing) {
        const element = existing.getElement();
        element.className = 'map-pin' + (isActive ? ' map-pin--active' : '');
        element.style.background = place.pinColor;
        continue;
      }

      const element = document.createElement('button');
      element.type = 'button';
      element.className = 'map-pin' + (isActive ? ' map-pin--active' : '');
      element.style.background = place.pinColor;
      element.setAttribute('aria-label', place.name);

      const dot = document.createElement('span');
      dot.className = 'map-pin__dot';
      element.appendChild(dot);
      element.addEventListener('click', () => onSelectPlace(place.id));

      const marker = new maplibregl.Marker({ element })
        .setLngLat(placeToLngLat(place))
        .addTo(map);

      markersRef.current.set(place.id, marker);
    }
  }, [places, selectedPlaceId, onSelectPlace]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const selected = places.find((p) => p.id === selectedPlaceId);
    if (!selected) return;

    map.easeTo({ center: placeToLngLat(selected), duration: 500 });
  }, [places, selectedPlaceId]);

  return <div ref={mapContainerRef} style={{ position: 'absolute', inset: 0 }} />;
}
