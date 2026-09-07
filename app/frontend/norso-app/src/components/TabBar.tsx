import { CompassIcon, HeartIcon, MapIcon, PersonIcon, TrailIcon } from './Icons';
import type { Screen } from '@/types';
import './TabBar.css';

const INK = '#22301F';
const INK_MUTED = 'rgba(34,48,31,0.72)';

const tabs = [
  { screen: 'map' as Screen, label: 'Kart', matches: ['map', 'place', 'filter'], Icon: MapIcon },
  { screen: 'explore' as Screen, label: 'Utforsk', matches: ['explore', 'events'], Icon: CompassIcon },
  { screen: 'trips' as Screen, label: 'Turer', matches: ['trips'], Icon: TrailIcon },
  { screen: 'saved' as Screen, label: 'Lagret', matches: ['saved'], Icon: HeartIcon },
  { screen: 'profile' as Screen, label: 'Profil', matches: ['profile', 'addPlace'], Icon: PersonIcon },
];

interface TabBarProps {
  current: Screen;
  onNavigate: (screen: Screen) => void;
}

export function TabBar({ current, onNavigate }: TabBarProps) {
  return (
    <nav className="tabbar" aria-label="Hovedmeny">
      {tabs.map(({ screen, label, matches, Icon }) => {
        const active = matches.includes(current);
        return (
          <button
            key={screen}
            type="button"
            className={'tabbar__item' + (active ? ' tabbar__item--active' : '')}
            aria-current={active ? 'page' : undefined}
            onClick={() => onNavigate(screen)}
          >
            <Icon color={active ? INK : INK_MUTED} />
            {label}
          </button>
        );
      })}
    </nav>
  );
}
