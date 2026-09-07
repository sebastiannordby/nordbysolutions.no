import { HeartIcon } from '@/components/Icons';
import { formatDistance } from '@/lib/format';
import type { Place } from '@/types';
import './PlaceScreen.css';

interface PlaceScreenProps {
  place: Place;
  places: Place[];
  hearted: boolean;
  onBack: () => void;
  onToggleHeart: () => void;
  onOpenPlace: (id: string) => void;
}

export function PlaceScreen({ place, places, hearted, onBack, onToggleHeart, onOpenPlace }: PlaceScreenProps) {
  const nearby = places.filter((p) => p.id !== place.id).slice(0, 3);

  return (
    <div className="screen">
      <div className="place-hero photo">foto av stedet</div>
      <button type="button" className="place-float place-float--back" onClick={onBack} aria-label="Tilbake">
        ←
      </button>
      <button
        type="button"
        className="place-float place-float--heart"
        onClick={onToggleHeart}
        aria-pressed={hearted}
        aria-label={hearted ? 'Fjern fra lagret' : 'Lagre stedet'}
      >
        <HeartIcon color="#C2643B" size={19} filled={hearted} />
      </button>

      <div className="place-body">
        <h1 className="place-body__title">{place.name}</h1>
        <p className="place-body__meta">
          {place.categoryLabel} · {formatDistance(place.distanceKm)} fra deg · {place.municipality}
        </p>

        <div className="place-actions">
          <button type="button" className="button-primary">
            Veibeskrivelse
          </button>
          <button type="button" className="place-actions__secondary">
            Ring
          </button>
        </div>

        <dl className="fact-list">
          {place.facts.map((fact) => (
            <div className="fact-list__row" key={fact.label}>
              <dt className="fact-list__key">{fact.label}</dt>
              <dd className="fact-list__value" style={{ margin: 0 }}>
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>

        <h2 style={{ marginTop: 22, fontSize: 19 }}>Om stedet</h2>
        <p className="place-description">{place.description}</p>

        <div className="hearts-row">
          <span className="hearts-row__stack">
            <span className="hearts-row__avatar" style={{ background: '#D6DFC8' }} />
            <span className="hearts-row__avatar" style={{ background: '#E4D3C2' }} />
            <span className="hearts-row__avatar" style={{ background: '#C7D8DC' }} />
          </span>
          <span>{place.hearts} har hjertet dette stedet</span>
        </div>

        {place.tips.length > 0 && (
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
            {place.tips.map((tip) => (
              <li className="tip" key={tip.id}>
                <p className="tip__text">{tip.text}</p>
                <p className="tip__author">{tip.author}</p>
              </li>
            ))}
          </ul>
        )}

        <h2 style={{ marginTop: 22, fontSize: 19 }}>I samme tur</h2>
        <div className="nearby">
          {nearby.map((p) => (
            <button type="button" className="nearby__item" key={p.id} onClick={() => onOpenPlace(p.id)}>
              <div className="nearby__photo" />
              <div className="nearby__name">{p.name}</div>
              <div className="nearby__meta">{formatDistance(p.distanceKm)} unna</div>
            </button>
          ))}
        </div>

        <div className="tabbar-spacer" />
      </div>
    </div>
  );
}
