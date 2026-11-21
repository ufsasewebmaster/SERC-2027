import type { CSSProperties } from "react";

type DecorProps = { className?: string; color?: string; style?: CSSProperties };

/** Chunky outlined 5-point star, like the stars in the SERC 2027 art. */
export function Star({ className, color = "var(--color-star)", style }: DecorProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} style={style} aria-hidden="true">
      <path
        d="M24 4.5c1.2 0 2 .8 2.6 2l4.4 9.3 10 1.4c2.6.4 3.4 2.6 1.6 4.4l-7.3 7.2 1.8 10.1c.4 2.6-1.6 4-3.9 2.8L24 37l-9.2 4.7c-2.3 1.2-4.3-.2-3.9-2.8l1.8-10.1-7.3-7.2c-1.8-1.8-1-4 1.6-4.4l10-1.4 4.4-9.3c.6-1.2 1.4-2 2.6-2Z"
        fill={color}
        stroke="var(--color-ink)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Four-point sparkle. */
export function Sparkle({ className, color = "var(--color-ink)", style }: DecorProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
      <path d="M12 1c.6 5.4 2.6 8.6 11 11-8.4 2.4-10.4 5.6-11 11-.6-5.4-2.6-8.6-11-11 8.4-2.4 10.4-5.6 11-11Z" fill={color} />
    </svg>
  );
}

/** Puffy cloud. */
export function Cloud({ className, color = "var(--color-paper)", style }: DecorProps) {
  return (
    <svg viewBox="0 0 200 90" className={className} style={style} aria-hidden="true">
      <path
        d="M30 80c-15 0-25-9-25-21s10-21 24-21c2-17 16-30 34-30 13 0 24 6 30 16 5-4 12-7 20-7 17 0 30 12 31 27 3-1 6-1 9-1 15 0 26 9 26 19s-11 18-26 18H30Z"
        fill={color}
      />
    </svg>
  );
}

/** Wavy top edge for a section; `color` should match the section's background. */
export function Wave({ color, className = "" }: { color: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 -top-[59px] h-[60px] w-full ${className}`}
      aria-hidden="true"
    >
      <path d="M0 60V30c120-26 240-26 360 0s240 26 360 0 240-26 360 0 240 26 360 0v30H0Z" fill={color} />
    </svg>
  );
}

/** Mini closed box icon. */
export function BoxIcon({ className, color = "var(--color-sky)" }: DecorProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path d="M6 15h28v19a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V15Z" fill={color} stroke="var(--color-ink)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M4 9a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v6H4V9Z" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M20 7v29" stroke="var(--color-ink)" strokeWidth="2.5" strokeDasharray="3 3" />
    </svg>
  );
}
