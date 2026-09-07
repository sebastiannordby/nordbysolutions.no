import './Toggle.css';

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}

export function Toggle({ label, checked, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      className="toggle-row"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
    >
      <span>{label}</span>
      <span className={'toggle-track' + (checked ? ' toggle-track--on' : '')}>
        <span className="toggle-knob" />
      </span>
    </button>
  );
}
