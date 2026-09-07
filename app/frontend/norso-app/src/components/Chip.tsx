import './Chip.css';

interface ChipProps {
  label: string;
  active?: boolean;
  variant?: 'floating' | 'plain';
  onClick?: () => void;
}

export function Chip({ label, active = false, variant = 'floating', onClick }: ChipProps) {
  const cls = ['chip', variant === 'plain' ? 'chip--plain' : '', active ? 'chip--active' : '']
    .filter(Boolean)
    .join(' ');
  return (
    <button type="button" className={cls} aria-pressed={active} onClick={onClick}>
      {label}
    </button>
  );
}
