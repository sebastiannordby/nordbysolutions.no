interface IconProps {
  color?: string;
  size?: number;
}

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 22 22',
  fill: 'none' as const,
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

export function MapIcon({ color = 'currentColor', size = 22 }: IconProps) {
  return (
    <svg {...base(size)} stroke={color} aria-hidden="true">
      <path d="M8 3.5 3 5.2v13.3L8 16.8l6 1.7 5-1.7V3.5L14 5.2 8 3.5Z" />
      <path d="M8 3.5v13.3M14 5.2v13.3" />
    </svg>
  );
}

export function CompassIcon({ color = 'currentColor', size = 22 }: IconProps) {
  return (
    <svg {...base(size)} stroke={color} aria-hidden="true">
      <circle cx="11" cy="11" r="7.8" />
      <path d="M14.4 7.6l-1.8 4.9-4.9 1.8 1.8-4.9 4.9-1.8Z" />
    </svg>
  );
}

export function TrailIcon({ color = 'currentColor', size = 22 }: IconProps) {
  return (
    <svg {...base(size)} stroke={color} aria-hidden="true">
      <path d="M4.5 16.5c2.4 0 2.4-3.4 4.8-3.4s2.4 3.4 4.8 3.4 2.4-3.4 3.4-3.4" />
      <circle cx="6" cy="6.2" r="2.2" />
      <path d="M16 4.4v6.4" />
    </svg>
  );
}

export function HeartIcon({ color = 'currentColor', size = 22, filled = false }: IconProps & { filled?: boolean }) {
  return (
    <svg {...base(size)} stroke={color} fill={filled ? color : 'none'} aria-hidden="true">
      <path d="M11 18.4S3.6 13.7 3.6 8.6A4.3 4.3 0 0 1 11 6a4.3 4.3 0 0 1 7.4 2.6c0 5.1-7.4 9.8-7.4 9.8Z" />
    </svg>
  );
}

export function PersonIcon({ color = 'currentColor', size = 22 }: IconProps) {
  return (
    <svg {...base(size)} stroke={color} aria-hidden="true">
      <circle cx="11" cy="8" r="3.4" />
      <path d="M4.6 18.4c.9-3.2 3.4-4.8 6.4-4.8s5.5 1.6 6.4 4.8" />
    </svg>
  );
}

export function SearchIcon({ color = '#5E7B4F', size = 17 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 17 17" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="7.5" r="5.5" stroke={color} strokeWidth="1.8" />
      <path d="M11.5 11.5L15 15" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
