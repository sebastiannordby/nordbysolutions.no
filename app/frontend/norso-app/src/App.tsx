import { useAppState } from './hooks/useAppState';
import { TabBar } from './components/TabBar';
import { MapScreen } from './screens/MapScreen';
import { FilterScreen } from './screens/FilterScreen';
import { PlaceScreen } from './screens/PlaceScreen';
import { ExploreScreen } from './screens/ExploreScreen';
import { EventsScreen } from './screens/EventsScreen';
import { TripsScreen } from './screens/TripsScreen';
import { SavedScreen } from './screens/SavedScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { AddPlaceScreen } from './screens/AddPlaceScreen';
import './App.css';

export default function App() {
  const app = useAppState();
  const showTabs = app.screen !== 'filter' && app.screen !== 'addPlace';
  const selectedPlace = app.selectedPlace;

  return (
    <div className="app">
      {app.screen === 'map' && (
        <MapScreen
          selectedPlace={app.selectedPlace}
          places={app.places}
          visiblePlaces={app.visiblePlaces}
          radiusKm={app.filters.radiusKm}
          query={app.filters.query}
          onQueryChange={(query) => app.patchFilters({ query })}
          searchLocation={app.searchLocation}
          onSelectSearchLocation={app.selectSearchLocation}
          quickCategory={app.quickCategory}
          onQuickCategory={app.setQuickCategory}
          onSelectPlace={app.setSelectedPlaceId}
          onOpenPlace={app.openPlace}
          onOpenFilter={() => app.setScreen('filter')}
        />
      )}

      {app.screen === 'filter' && (
        <FilterScreen
          filters={app.filters}
          resultCount={app.visiblePlaces.length}
          onChange={app.patchFilters}
          onClose={() => app.setScreen('map')}
        />
      )}

      {app.screen === 'place' && selectedPlace && (
        <PlaceScreen
          place={selectedPlace}
          places={app.places}
          hearted={app.hearted.includes(selectedPlace.id)}
          onBack={() => app.setScreen('map')}
          onToggleHeart={() => app.toggleHeart(selectedPlace.id)}
          onOpenPlace={app.openPlace}
        />
      )}

      {app.screen === 'explore' && <ExploreScreen onOpenEvents={() => app.setScreen('events')} />}

      {app.screen === 'events' && (
        <EventsScreen selectedDate={app.selectedDate} onSelectDate={app.setSelectedDate} />
      )}

      {app.screen === 'trips' && <TripsScreen />}

      {app.screen === 'saved' && (
        <SavedScreen
          places={app.places}
          heartedIds={app.hearted}
          onOpenPlace={app.openPlace}
          onToggleHeart={app.toggleHeart}
        />
      )}

      {app.screen === 'profile' && (
        <ProfileScreen
          language={app.language}
          heartedCount={app.hearted.length}
          onLanguageChange={app.setLanguage}
          onAddPlace={() => app.setScreen('addPlace')}
        />
      )}

      {app.screen === 'addPlace' && (
        <AddPlaceScreen onCancel={() => app.setScreen('profile')} onSubmit={() => app.setScreen('profile')} />
      )}

      {showTabs && <TabBar current={app.screen} onNavigate={app.setScreen} />}
    </div>
  );
}
