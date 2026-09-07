import { featuredTrip, trips } from '@/data/trips';
import './TripsScreen.css';

export function TripsScreen() {
  const others = trips.filter((t) => t.id !== featuredTrip.id);

  return (
    <div className="screen">
      <header style={{ padding: 'calc(var(--safe-top) + 24px) var(--gutter) 0' }}>
        <h1 className="screen__title">Turer</h1>
        <p className="screen__subtitle">Samlinger av steder som ligger fint etter hverandre</p>
      </header>

      <div className="section">
        <article className="trip-featured">
          <div className="trip-map">
            <svg viewBox="0 0 360 132" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden="true">
              <path d="M-10 96 C 60 76 110 108 180 88 C 250 68 300 100 370 82 L370 142 L-10 142Z" fill="var(--map-water)" />
              <ellipse cx="90" cy="44" rx="60" ry="30" fill="var(--map-field)" />
              <path
                d="M28 84 C 70 40 130 96 186 52 C 240 12 288 60 332 34"
                stroke="var(--terracotta)"
                strokeWidth="2.4"
                strokeDasharray="6 5"
                fill="none"
              />
              <circle cx="28" cy="84" r="6" fill="var(--terracotta)" />
              <circle cx="186" cy="52" r="5" fill="var(--moss)" />
              <circle cx="332" cy="34" r="6" fill="var(--ink)" />
            </svg>
          </div>
          <div className="trip-featured__body">
            <h2 className="trip-featured__title">{featuredTrip.name}</h2>
            <p className="trip-featured__meta">
              {featuredTrip.stopCount} stopp · {featuredTrip.distanceKm} km · {featuredTrip.durationLabel}
            </p>
            <ol style={{ marginTop: 14 }}>
              {featuredTrip.stops.map((stop, i) => (
                <li className="trip-stop" key={stop.name}>
                  <span className="trip-stop__num">{i + 1}</span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span className="trip-stop__name" style={{ display: 'block' }}>
                      {stop.name}
                    </span>
                    <span className="trip-stop__note">{stop.note}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </article>
      </div>

      <div className="section">
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {others.map((trip) => (
            <li key={trip.id}>
              <button type="button" className="trip-card">
                <span className="trip-card__photo" />
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span className="trip-card__title" style={{ display: 'block' }}>
                    {trip.name}
                  </span>
                  <span className="trip-card__meta" style={{ display: 'block' }}>
                    {trip.stopCount} stopp · {trip.distanceKm} km · {trip.durationLabel}
                  </span>
                  <span className="trip-card__note">{trip.note}</span>
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
