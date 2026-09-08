import { type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent, useEffect, useRef } from 'react';
import * as maplibregl from 'maplibre-gl';
import { type LngLatLike, type Map as MapLibreMap, type MapMouseEvent, type Marker } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url';
import type { Place, SearchLocation } from '@/types';

maplibregl.setWorkerUrl(maplibreWorkerUrl);

interface MapCanvasProps {
  places: Place[];
  selectedPlaceId: string;
  searchLocation: SearchLocation | null;
  onSelectPlace: (id: string) => void;
  onLongPressLocation: (location: SearchLocation) => void;
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

function searchLocationToLngLat(location: SearchLocation): LngLatLike {
  return [location.longitude, location.latitude];
}

export function MapCanvas({
  places,
  selectedPlaceId,
  searchLocation,
  onSelectPlace,
  onLongPressLocation,
}: MapCanvasProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Map<string, Marker>>(new Map());
  const searchMarkerRef = useRef<Marker | null>(null);
  const onLongPressLocationRef = useRef(onLongPressLocation);
  const longPressTimerRef = useRef<number | undefined>(undefined);
  const longPressPointRef = useRef<[number, number] | null>(null);

  useEffect(() => {
    onLongPressLocationRef.current = onLongPressLocation;
  }, [onLongPressLocation]);

  const clearLongPress = () => {
    if (longPressTimerRef.current) window.clearTimeout(longPressTimerRef.current);
    longPressTimerRef.current = undefined;
    longPressPointRef.current = null;
  };

  const placeSearchLocationFromPoint = (point: [number, number]) => {
    const map = mapRef.current;
    if (!map) return;
    if (!Number.isFinite(point[0]) || !Number.isFinite(point[1])) return;

    const lngLat = map.unproject(new maplibregl.Point(point[0], point[1]));
    onLongPressLocationRef.current({
      label: 'Valgt punkt',
      longitude: lngLat.lng,
      latitude: lngLat.lat,
    });
  };

  const pointFromReactEvent = (event: ReactMouseEvent<HTMLDivElement> | ReactPointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return [event.clientX - rect.left, event.clientY - rect.top] as [number, number];
  };

  const handlePointerDownCapture = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    clearLongPress();
    longPressPointRef.current = pointFromReactEvent(event);
    longPressTimerRef.current = window.setTimeout(() => {
      if (longPressPointRef.current) placeSearchLocationFromPoint(longPressPointRef.current);
      clearLongPress();
    }, 650);
  };

  const handlePointerMoveCapture = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!longPressPointRef.current) return;
    const nextPoint = pointFromReactEvent(event);
    if (Math.hypot(nextPoint[0] - longPressPointRef.current[0], nextPoint[1] - longPressPointRef.current[1]) > 10) {
      clearLongPress();
    }
  };

  const handleContextMenuCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    clearLongPress();
    placeSearchLocationFromPoint(pointFromReactEvent(event));
  };

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const container = mapContainerRef.current;
    const markers = markersRef.current;
    const abortController = new AbortController();
    const map = new maplibregl.Map({
      container,
      style: BASEMAP_STYLE_URL,
      center: [10.2167, 59.1333] as [number, number],
      zoom: 12,
      maxZoom: 18,
    });
    mapRef.current = map;

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

    if (navigator.geolocation) {
      map.addControl(
        new maplibregl.GeolocateControl({
          positionOptions: { enableHighAccuracy: true },
          trackUserLocation: true,
          fitBoundsOptions: { maxZoom: 15 },
        }),
        'top-right',
      );
    }

    const placeLongPressLocation = (longitude: number, latitude: number) => {
      onLongPressLocationRef.current({
        label: 'Valgt punkt',
        longitude,
        latitude,
      });
    };

    const handleContextMenu = (event: MapMouseEvent) => {
      event.preventDefault();
      placeLongPressLocation(event.lngLat.lng, event.lngLat.lat);
    };

    let longPressTimer: number | undefined;
    let startPoint: [number, number] | null = null;

    const clearLongPress = () => {
      if (longPressTimer) window.clearTimeout(longPressTimer);
      longPressTimer = undefined;
      startPoint = null;
    };

    const pointFromEvent = (event: PointerEvent | MouseEvent) => {
      const rect = container.getBoundingClientRect();
      return [event.clientX - rect.left, event.clientY - rect.top] as [number, number];
    };

    const startLongPress = (event: PointerEvent | MouseEvent) => {
      if (event.button !== 0) return;
      clearLongPress();
      startPoint = pointFromEvent(event);
      longPressTimer = window.setTimeout(() => {
        if (!startPoint) return;
        const lngLat = map.unproject(startPoint);
        placeLongPressLocation(lngLat.lng, lngLat.lat);
        clearLongPress();
      }, 650);
    };

    const handlePointerMove = (event: PointerEvent | MouseEvent) => {
      if (!startPoint) return;
      const nextPoint = pointFromEvent(event);
      if (Math.hypot(nextPoint[0] - startPoint[0], nextPoint[1] - startPoint[1]) > 10) clearLongPress();
    };

    const listenerOptions = { capture: true, signal: abortController.signal };
    container.addEventListener('pointerdown', startLongPress, listenerOptions);
    container.addEventListener('pointermove', handlePointerMove, listenerOptions);
    container.addEventListener('pointerup', clearLongPress, listenerOptions);
    container.addEventListener('pointercancel', clearLongPress, listenerOptions);
    container.addEventListener('pointerleave', clearLongPress, listenerOptions);
    container.addEventListener('mousedown', startLongPress, listenerOptions);
    container.addEventListener('mousemove', handlePointerMove, listenerOptions);
    container.addEventListener('mouseup', clearLongPress, listenerOptions);
    container.addEventListener('mouseleave', clearLongPress, listenerOptions);
    map.on('contextmenu', handleContextMenu);

    return () => {
      abortController.abort();
      clearLongPress();
      map.off('contextmenu', handleContextMenu);
      for (const marker of markers.values()) marker.remove();
      markers.clear();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const container = mapContainerRef.current;
    const map = mapRef.current;
    if (!container || !map) return;

    const observer = new ResizeObserver(() => map.resize());
    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

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

    if (!searchLocation) {
      searchMarkerRef.current?.remove();
      searchMarkerRef.current = null;
      return;
    }

    const lngLat = searchLocationToLngLat(searchLocation);
    if (searchMarkerRef.current) {
      searchMarkerRef.current.setLngLat(lngLat);
    } else {
      const element = document.createElement('div');
      element.className = 'map-search-marker';
      element.setAttribute('aria-label', searchLocation.label);
      searchMarkerRef.current = new maplibregl.Marker({ element }).setLngLat(lngLat).addTo(map);
    }

    map.easeTo({ center: lngLat, zoom: 12, duration: 500 });
  }, [searchLocation]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (searchLocation) return;

    const selected = places.find((p) => p.id === selectedPlaceId);
    if (!selected) return;

    map.easeTo({ center: placeToLngLat(selected), duration: 500 });
  }, [places, searchLocation, selectedPlaceId]);

  return (
    <div
      ref={mapContainerRef}
      className="map-canvas"
      onPointerDownCapture={handlePointerDownCapture}
      onPointerMoveCapture={handlePointerMoveCapture}
      onPointerUpCapture={clearLongPress}
      onPointerCancelCapture={clearLongPress}
      onPointerLeave={clearLongPress}
      onContextMenuCapture={handleContextMenuCapture}
    />
  );
}
