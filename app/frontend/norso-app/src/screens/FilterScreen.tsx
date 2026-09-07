import { Chip } from '@/components/Chip';
import { Toggle } from '@/components/Toggle';
import { SearchIcon } from '@/components/Icons';
import { categories } from '@/data/categories';
import { toggleInArray } from '@/lib/filtering';
import type { Filters, RadiusKm } from '@/types';
import './FilterScreen.css';

const RADII: RadiusKm[] = [5, 10, 25, 50];

interface FilterScreenProps {
  filters: Filters;
  resultCount: number;
  onChange: (patch: Partial<Filters>) => void;
  onClose: () => void;
}

export function FilterScreen({ filters, resultCount, onChange, onClose }: FilterScreenProps) {
  const radiusIndex = RADII.indexOf(filters.radiusKm);
  const fillPercent = 18 + radiusIndex * 27;

  return (
    <div className="screen">
      <div className="filter-head">
        <button type="button" className="filter-close" onClick={onClose}>
          Lukk
        </button>
        <h2 style={{ fontSize: 20 }}>Søk og filter</h2>
      </div>

      <div className="section">
        <div className="filter-field">
          <SearchIcon />
          <input
            type="search"
            value={filters.query}
            placeholder="gårdsbutikk"
            onChange={(e) => onChange({ query: e.target.value })}
            aria-label="Søk"
          />
        </div>
        <p className="filter-recent">Siste søk: besøksgård · keramikk · selvplukk blomster</p>
      </div>

      <div className="section">
        <h3 className="filter-label" style={{ fontFamily: 'var(--font-ui)' }}>
          Kategori
        </h3>
        <div className="filter-chips">
          {categories.slice(0, 8).map((c) => (
            <Chip
              key={c.id}
              label={c.label}
              variant="plain"
              active={filters.categories.includes(c.id)}
              onClick={() => onChange({ categories: toggleInArray(filters.categories, c.id) })}
            />
          ))}
        </div>
      </div>

      <div className="section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <h3 className="filter-label" style={{ fontFamily: 'var(--font-ui)', marginBottom: 0 }}>
            Avstand fra meg
          </h3>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--terracotta)' }}>
            {filters.radiusKm} km
          </span>
        </div>
        <div className="slider">
          <div className="slider__fill" style={{ width: fillPercent + '%' }} />
          <div className="slider__knob" style={{ left: 'calc(' + fillPercent + '% - 9px)' }} />
        </div>
        <div className="radius-options">
          {RADII.map((km) => (
            <button
              key={km}
              type="button"
              className={'radius-option' + (km === filters.radiusKm ? ' radius-option--active' : '')}
              onClick={() => onChange({ radiusKm: km })}
            >
              {km} km
            </button>
          ))}
        </div>
      </div>

      <div className="section">
        <h3 className="filter-label" style={{ fontFamily: 'var(--font-ui)' }}>
          Praktisk
        </h3>
        <div className="filter-card">
          <Toggle label="Åpent nå" checked={filters.openNow} onChange={(v) => onChange({ openNow: v })} />
          <Toggle
            label="Stellerom og toalett"
            checked={filters.changingTable}
            onChange={(v) => onChange({ changingTable: v })}
          />
          <Toggle label="Egen parkering" checked={filters.parking} onChange={(v) => onChange({ parking: v })} />
          <Toggle label="Tar Vipps" checked={filters.vipps} onChange={(v) => onChange({ vipps: v })} />
        </div>
      </div>

      <div style={{ height: 150 }} />
      <div className="bottom-fade">
        <button type="button" className="button-primary" onClick={onClose}>
          Vis {resultCount} steder
        </button>
      </div>
    </div>
  );
}
