import { categories } from '@/data/categories';
import { events } from '@/data/events';
import { dayOfMonth, shortWeekday } from '@/lib/format';
import './ExploreScreen.css';

interface ExploreScreenProps {
  onOpenEvents: () => void;
}

export function ExploreScreen({ onOpenEvents }: ExploreScreenProps) {
  const weekend = events.filter((e) => ['2026-09-12', '2026-09-13'].includes(e.date)).slice(0, 3);

  return (
    <div className="screen">
      <header className="screen__top" style={{ padding: 'calc(var(--safe-top) + 24px) var(--gutter) 0' }}>
        <h1 className="screen__title">Utforsk</h1>
        <p className="screen__subtitle">Vestfold · september</p>
      </header>

      <div className="section">
        <article className="featured">
          <div className="featured__photo">
            <span className="featured__tag">Utvalgt denne uka</span>
          </div>
          <div className="featured__body">
            <h2 className="featured__title">Eplehøst langs Slagentangen</h2>
            <p className="featured__meta">6 gårdsutsalg · pressing og selvplukk · 12.–28. september</p>
          </div>
        </article>
      </div>

      <div className="section">
        <h2 className="section__heading">Kategorier</h2>
        <div className="category-grid">
          {categories.slice(0, 6).map((c) => (
            <button type="button" className="category-tile" key={c.id}>
              <span className="category-tile__dot" style={{ background: c.color }} />
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section__heading">
          <span>Arrangementer</span>
          <button type="button" className="link-button" onClick={onOpenEvents}>
            Se kalender
          </button>
        </div>
        <ul>
          {weekend.map((e) => (
            <li key={e.id}>
              <button type="button" className="event-row" onClick={onOpenEvents}>
                <span className="event-row__date">
                  <span className="event-row__day" style={{ display: 'block' }}>
                    {shortWeekday(e.date)}
                  </span>
                  <span className="event-row__num">{dayOfMonth(e.date)}</span>
                </span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span className="event-row__name" style={{ display: 'block' }}>
                    {e.name}
                  </span>
                  <span className="event-row__meta">
                    {e.startTime} · {e.tag}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="tabbar-spacer" />
    </div>
  );
}
