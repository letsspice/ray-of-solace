'use client';

import React from 'react';
import type { SpecialDate } from '../data/specialDates';

interface Props {
  todayMessage: SpecialDate;
}

/**
 * Presents the message for "today" — either a special date or the default calm message.
 * Uses semantic markup and accessible structure.
 */
export default function DateMessage({ todayMessage }: Props) {
  const { title, subtitle, message, intensity, suggestion, noteForDesigner } = todayMessage;

  // Map intensity to color usage (class names deliberately align with your Tailwind tokens)
  const intensityMap: Record<string, { bg: string; text: string }> = {
    soft: { bg: 'bg-solace-ray-100', text: 'text-solace-ray-700' },
    supportive: { bg: 'bg-solace-ray-100', text: 'text-solace-ray-700' },
    celebratory: { bg: 'bg-solace-ray-300', text: 'text-solace-ray-900' },
    heavy: { bg: 'bg-muted-violet', text: 'text-muted-violet' }, // fallback
  };

  const badgeStyle = intensityMap[intensity] ?? intensityMap.soft;

  return (
    <section aria-labelledby="today-heading" className="bg-white/60 rounded-2xl p-4 shadow-sm smooth-fade">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h2 id="today-heading" className="text-lg font-semibold" style={{ color: 'var(--solace-stone-900)' }}>
            {title}
          </h2>
          {subtitle ? (
            <p className="text-xs mt-1" style={{ color: 'var(--solace-stone-700)' }}>
              {subtitle}
            </p>
          ) : null}
        </div>

        <div>
          <span
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${badgeStyle.bg}`}
            style={{ color: badgeStyle.text }}
            aria-hidden="true"
          >
            {intensity === 'celebratory' ? '🎉' : intensity === 'supportive' ? '🤍' : '✨'}
            <span className="sr-only">intensity</span>
          </span>
        </div>
      </header>

      <div className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--solace-stone-700)' }}>
        <p>{message}</p>

        {noteForDesigner ? (
          <blockquote className="mt-3 pl-4 border-l-2" style={{ borderColor: 'var(--solace-rocher-300)' }}>
            <p className="text-xs italic" style={{ color: 'var(--solace-stone-500)' }}>
              {noteForDesigner}
            </p>
          </blockquote>
        ) : null}

        {suggestion ? (
          <p className="mt-3 text-xs" style={{ color: 'var(--solace-stone-500)' }}>
            {suggestion}
          </p>
        ) : null}
      </div>
    </section>
  );
}
