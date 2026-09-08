import { useCallback, useEffect, useMemo, useState } from 'react';
import { getBusinessesCloseTo } from '@/api/businessApi';
import { mapBusinessProfilesToPlaces } from '@/api/mappers/businessProfileMapper';
import { calendarDays } from '@/data/events';
import { savedPlaceIds } from '@/data/profile';
import { defaultFilters, filterPlaces } from '@/lib/filtering';
import type { CategoryId, Filters, Language, Place, Screen, SearchLocation } from '@/types';

const DEFAULT_USER_LOCATION: { latitude: number; longitude: number } = {
  latitude: 59.1333,
  longitude: 10.2167,
};

export function useAppState() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [screen, setScreen] = useState<Screen>('map');
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>('');
  const [quickCategory, setQuickCategory] = useState<string>('all');
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [selectedDate, setSelectedDate] = useState<string>(calendarDays[1]);
  const [hearted, setHearted] = useState<string[]>(savedPlaceIds);
  const [language, setLanguage] = useState<Language>('nb');
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [searchLocation, setSearchLocation] = useState<SearchLocation | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setUserLocation(DEFAULT_USER_LOCATION);
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        // Fall back only when location is unavailable or denied.
        setUserLocation(DEFAULT_USER_LOCATION);
      },
      { enableHighAccuracy: true, maximumAge: 30_000, timeout: 8_000 },
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    const loadLocation = searchLocation ?? userLocation;
    if (!loadLocation) return;
    const currentLocation = loadLocation;

    let isCancelled = false;

    async function loadNearbyBusinesses() {
      try {
        const businesses = await getBusinessesCloseTo({
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          radiusInKilometers: filters.radiusKm,
        });

        if (isCancelled) return;
        const mapped = mapBusinessProfilesToPlaces(businesses, currentLocation);
        setPlaces(mapped);
      } catch {
        setPlaces([]);
      }
    }

    void loadNearbyBusinesses();

    return () => {
      isCancelled = true;
    };
  }, [filters.radiusKm, searchLocation, userLocation]);

  useEffect(() => {
    if (places.length === 0) {
      if (selectedPlaceId) setSelectedPlaceId('');
      return;
    }

    if (!selectedPlaceId || !places.some((p) => p.id === selectedPlaceId)) {
      setSelectedPlaceId(places[0].id);
    }
  }, [places, selectedPlaceId]);

  const selectedPlace = useMemo<Place | null>(
    () => places.find((p) => p.id === selectedPlaceId) ?? places[0] ?? null,
    [places, selectedPlaceId],
  );

  const visiblePlaces = useMemo(() => {
    const activeFilters = searchLocation ? { ...filters, query: '' } : filters;
    return filterPlaces(places, activeFilters);
  }, [filters, places, searchLocation]);

  const openPlace = useCallback((id: string) => {
    setSelectedPlaceId(id);
    setScreen('place');
  }, []);

  const toggleHeart = useCallback((id: string) => {
    setHearted((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const patchFilters = useCallback((patch: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  }, []);

  const selectSearchLocation = useCallback((location: SearchLocation | null) => {
    setSearchLocation(location);
    if (location) {
      setFilters((prev) => ({ ...prev, query: location.label }));
    }
  }, []);

  const applyQuickCategory = useCallback((category: string) => {
    setQuickCategory(category);
    setFilters((prev) => ({
      ...prev,
      categories: category === 'all' ? [] : [category as CategoryId],
    }));
  }, []);

  return {
    screen,
    setScreen,
    selectedPlace,
    setSelectedPlaceId,
    openPlace,
    quickCategory,
    setQuickCategory: applyQuickCategory,
    filters,
    patchFilters,
    searchLocation,
    selectSearchLocation,
    places,
    visiblePlaces,
    selectedDate,
    setSelectedDate,
    hearted,
    toggleHeart,
    language,
    setLanguage,
  };
}

export type AppState = ReturnType<typeof useAppState>;
