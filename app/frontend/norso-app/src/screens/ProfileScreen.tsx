import { currentUser } from '@/data/profile';
import type { Language } from '@/types';
import './ProfileScreen.css';

interface ProfileScreenProps {
  language: Language;
  heartedCount: number;
  onLanguageChange: (lang: Language) => void;
  onAddPlace: () => void;
}

export function ProfileScreen({ language, heartedCount, onLanguageChange, onAddPlace }: ProfileScreenProps) {
  const rows = [
    { label: 'Mine steder', value: currentUser.publishedPlaces + ' publisert' },
    { label: 'Hjertet', value: heartedCount + ' steder' },
    { label: 'Varsler', value: currentUser.notificationSetting },
    { label: 'Hjelp og kontakt', value: '' },
  ];

  return (
    <div className="screen">
      <header className="profile-head">
        <div className="profile-head__avatar" />
        <div>
          <h1 className="profile-head__name">{currentUser.name}</h1>
          <p className="profile-head__meta">
            {currentUser.municipality} · med siden {currentUser.memberSince}
          </p>
        </div>
      </header>

      <div className="section">
        <div className="language-card">
          <span>Språk</span>
          <div className="segmented" role="group" aria-label="Språk">
            {(['nb', 'en'] as Language[]).map((lang) => (
              <button
                key={lang}
                type="button"
                className={'segmented__option' + (language === lang ? ' segmented__option--active' : '')}
                aria-pressed={language === lang}
                onClick={() => onLanguageChange(lang)}
              >
                {lang === 'nb' ? 'Norsk' : 'English'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="section" style={{ paddingTop: 14 }}>
        <div className="settings-card">
          {rows.map((row) => (
            <button type="button" className="settings-row" key={row.label}>
              <span>{row.label}</span>
              <span className="settings-row__value">{row.value}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="organiser-card">
          <h2 className="organiser-card__title">Har du noe å vise fram?</h2>
          <p className="organiser-card__body">
            Gårdsutsalg, verksted, loppemarked eller en åpen dag. Det tar noen minutter å legge inn.
          </p>
          <button type="button" className="button-accent" onClick={onAddPlace}>
            Legg til et sted
          </button>
        </div>
      </div>

      <div className="tabbar-spacer" />
    </div>
  );
}
