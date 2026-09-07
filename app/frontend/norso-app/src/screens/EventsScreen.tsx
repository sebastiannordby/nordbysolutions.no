import { calendarDays, eventsOnDate, events } from '@/data/events';
import { dayOfMonth, formatDistance, longDate, monthName, shortWeekday } from '@/lib/format';
import './EventsScreen.css';

interface EventsScreenProps {
  selectedDate: string;
  onSelectDate: (iso: string) => void;
}

export function EventsScreen({ selectedDate, onSelectDate }: EventsScreenProps) {
  const dayEvents = eventsOnDate(selectedDate);

  return (
    <div className="screen">
      <header
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          padding: 'calc(var(--safe-top) + 24px) var(--gutter) 0',
        }}
      >
        <h1 className="screen__title">{monthName(selectedDate)}</h1>
        <span style={{ fontSize: 13, color: 'var(--ink-secondary)' }}>{events.length} arrangementer</span>
      </header>

      <div className="day-strip" role="tablist" aria-label="Velg dag">
        {calendarDays.map((iso) => {
          const active = iso === selectedDate;
          const has = eventsOnDate(iso).length > 0;
          return (
            <button
              key={iso}
              type="button"
              role="tab"
              aria-selected={active}
              className={'day-pill' + (active ? ' day-pill--active' : '')}
              onClick={() => onSelectDate(iso)}
            >
              <span className="day-pill__day">{shortWeekday(iso)}</span>
              <span className="day-pill__num">{dayOfMonth(iso)}</span>
              <span className={'day-pill__mark' + (has ? ' day-pill__mark--has' : '')} />
            </button>
          );
        })}
      </div>

      <div className="section">
        <h2 className="section__heading">{longDate(selectedDate)}</h2>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {dayEvents.map((e) => (
            <li className="event-card" key={e.id}>
              <div className="event-card__time">
                <div className="event-card__hour">{e.startTime}</div>
                <div className="event-card__dur">{e.durationLabel}</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 className="event-card__name">{e.name}</h3>
                <p className="event-card__place">
                  {e.placeName}
                  {e.distanceKm !== undefined ? ' · ' + formatDistance(e.distanceKm) : ''}
                </p>
                <div className="event-card__tags">
                  <span className="badge-open">{e.priceLabel}</span>
                  <span className="badge-neutral">{e.tag}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="tabbar-spacer" />
    </div>
  );
}
