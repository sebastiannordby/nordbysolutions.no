import { useCallback, useEffect, useMemo, useState } from 'react';
import { getBusinessesCloseTo } from '@/api/businessApi';
import { mapBusinessProfilesToPlaces } from '@/api/mappers/businessProfileMapper';
import { calendarDays } from '@/data/events';
import { savedPlaceIds } from '@/data/profile';
import { defaultFilters, filterPlaces } from '@/lib/filtering';
import type { Filters, Language, Place, Screen } from '@/types';

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
    if (!userLocation) return;
    const currentLocation = userLocation;

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
  }, [filters.radiusKm, userLocation]);

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

  const visiblePlaces = useMemo(() => filterPlaces(places, filters), [places, filters]);

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

  return {
    screen,
    setScreen,
    selectedPlace,
    setSelectedPlaceId,
    openPlace,
    quickCategory,
    setQuickCategory,
    filters,
    patchFilters,
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
