import React from 'react';

/**
 * The app's signature mark: a small sun, echoing "Ray" (and Ra, the sun).
 * `phase` doubles as the shared mood/intensity vocabulary across the app —
 * radiant/glowing/soft days feel light, veiled/resting days feel heavy —
 * so every mood indicator in the app reads from one consistent visual language.
 */
export type SunPhase = 'radiant' | 'glowing' | 'soft' | 'veiled' | 'resting';

const RAY_COUNT: Record<SunPhase, number> = {
  radiant: 12,
  glowing: 8,
  soft: 6,
  veiled: 3,
  resting: 0,
};

interface Props {
  phase?: SunPhase;
  size?: number;
  className?: string;
  title?: string;
}

export default function SunMark({ phase = 'radiant', size = 24, className, title }: Props) {
  const rayCount = RAY_COUNT[phase];
  const rays = Array.from({ length: rayCount }, (_, i) => {
    const angle = (360 / rayCount) * i;
    return (
      <line
        key={i}
        x1="12"
        y1="2.4"
        x2="12"
        y2="4.7"
        transform={`rotate(${angle} 12 12)`}
      />
    );
  });

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <circle
        cx="12"
        cy="12"
        r="5"
        fill="currentColor"
        fillOpacity={phase === 'resting' ? 0.35 : 0.92}
        stroke="none"
      />
      {rays}
    </svg>
  );
}

/** Maps a 1-10 heaviness/weight score to the shared sun-phase vocabulary. */
export function phaseForWeight(weight: number): SunPhase {
  if (weight <= 3) return 'radiant';
  if (weight <= 6) return 'glowing';
  if (weight <= 8) return 'veiled';
  return 'resting';
}
