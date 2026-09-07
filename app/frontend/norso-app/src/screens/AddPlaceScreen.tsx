import { useState } from 'react';
import { emptyDraft } from '@/data/profile';
import type { NewPlaceDraft } from '@/types';
import './AddPlaceScreen.css';

type FieldKey = keyof NewPlaceDraft;

interface StepDef {
  title: string;
  help: string;
  cta: string;
  fields: { key: FieldKey; label: string; placeholder: string }[];
}

const steps: StepDef[] = [
  {
    title: 'Hva slags sted er dette?',
    help: 'Velg det som passer best. Du kan endre det siden.',
    cta: 'Neste',
    fields: [
      { key: 'category', label: 'Type', placeholder: 'Gårdsbutikk' },
      { key: 'name', label: 'Navn', placeholder: 'Solbakken gårdsutsalg' },
      { key: 'shortDescription', label: 'Kort beskrivelse', placeholder: 'Ubetjent utsalg med egg og syltetøy.' },
    ],
  },
  {
    title: 'Hvor og når er det åpent?',
    help: 'Åpningstider kan variere med sesong. Skriv det som gjelder nå.',
    cta: 'Neste',
    fields: [
      { key: 'address', label: 'Adresse', placeholder: 'Solbakkveien 14, 3158 Andebu' },
      { key: 'openingHours', label: 'Åpent', placeholder: 'Tor–søn 10–18, ellers etter avtale' },
      { key: 'season', label: 'Sesong', placeholder: 'Mai–oktober' },
    ],
  },
  {
    title: 'Praktisk for de som kommer',
    help: 'Dette er det folk spør mest om.',
    cta: 'Send inn til godkjenning',
    fields: [
      { key: 'facilities', label: 'Fasiliteter', placeholder: 'Parkering · Toalett · Vipps' },
      { key: 'photos', label: 'Bilder', placeholder: 'Legg til minst ett bilde' },
      { key: 'contact', label: 'Kontakt', placeholder: '901 23 456' },
    ],
  },
];

interface AddPlaceScreenProps {
  onCancel: () => void;
  onSubmit: (draft: NewPlaceDraft) => void;
}

export function AddPlaceScreen({ onCancel, onSubmit }: AddPlaceScreenProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [draft, setDraft] = useState<NewPlaceDraft>(emptyDraft);
  const step = steps[stepIndex];

  const next = () => {
    if (stepIndex < steps.length - 1) setStepIndex(stepIndex + 1);
    else onSubmit(draft);
  };

  return (
    <div className="screen">
      <div className="wizard-head">
        <button type="button" className="wizard-cancel" onClick={onCancel}>
          Avbryt
        </button>
        <span className="wizard-step-label">
          Steg {stepIndex + 1} av {steps.length}
        </span>
      </div>

      <div className="wizard-progress" aria-hidden="true">
        {steps.map((_, i) => (
          <span key={i} className={'wizard-progress__bar' + (i <= stepIndex ? ' wizard-progress__bar--done' : '')} />
        ))}
      </div>

      <div className="section" style={{ paddingTop: 20 }}>
        <h1 className="wizard-title">{step.title}</h1>
        <p className="wizard-help">{step.help}</p>
      </div>

      <div className="section" style={{ paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {step.fields.map((field) => (
          <label className="wizard-field" key={field.key}>
            <span className="wizard-field__label">{field.label}</span>
            <input
              type="text"
              value={draft[field.key]}
              placeholder={field.placeholder}
              onChange={(e) => setDraft({ ...draft, [field.key]: e.target.value })}
            />
          </label>
        ))}
      </div>

      <div style={{ height: 150 }} />
      <div className="bottom-fade">
        <button type="button" className="button-primary" onClick={next}>
          {step.cta}
        </button>
      </div>
    </div>
  );
}
