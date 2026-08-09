'use client';

import React from 'react';
import type { SpecialDate } from '../data/specialDates';
import SunMark, { SunPhase } from './icons/SunMark';

interface Props {
  todayMessage: SpecialDate;
}

/**
 * Presents the message for "today" — either a special date or the default calm message.
 * Uses semantic markup and accessible structure with enhanced visual hierarchy.
 */
export default function DateMessage({ todayMessage }: Props) {
  const { title, subtitle, message, intensity, suggestion, noteForDesigner } = todayMessage;

  // Every intensity reads from the same sun-mark language, just at a different phase,
  // so a "heavy" day still feels held rather than alarming.
  const intensityMap: Record<string, {
    bg: string;
    text: string;
    phase: SunPhase;
    border: string;
    gradient: string;
  }> = {
    soft: {
      bg: 'bg-solace-ray-100/60',
      text: 'text-solace-ray-700',
      phase: 'soft',
      border: 'border-solace-ray-200',
      gradient: 'from-solace-ray-100/20 to-transparent',
    },
    supportive: {
      bg: 'bg-solace-ray-100/80',
      text: 'text-solace-ray-800',
      phase: 'glowing',
      border: 'border-solace-ray-300',
      gradient: 'from-solace-ray-100/30 to-transparent',
    },
    celebratory: {
      bg: 'bg-solace-ray-300/70',
      text: 'text-solace-ray-900',
      phase: 'radiant',
      border: 'border-solace-ray-400',
      gradient: 'from-solace-ray-300/30 to-transparent',
    },
    heavy: {
      bg: 'bg-solace-ember-300/15',
      text: 'text-solace-ember-700',
      phase: 'veiled',
      border: 'border-solace-ember-300/40',
      gradient: 'from-solace-ember-300/10 to-transparent',
    },
  };

  const style = intensityMap[intensity] ?? intensityMap.soft;

  return (
    <section
      aria-labelledby="today-heading"
      className="solace-card group relative overflow-hidden p-5 md:p-6"
    >
      {/* Subtle gradient overlay */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-50 group-hover:opacity-70 transition-opacity duration-500`}
        aria-hidden="true"
      />
      
      <header className="relative flex flex-wrap items-start justify-between gap-3 md:flex-nowrap md:gap-4">
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2.5">
            <h2
              id="today-heading"
              className="text-xl font-serifHeading tracking-tight md:text-[1.4rem]"
              style={{ color: 'var(--solace-stone-900)' }}
            >
              {title}
            </h2>
            {intensity === 'celebratory' && (
              <span className="animate-pulse text-lg" aria-hidden="true">✨</span>
            )}
          </div>
          
          {subtitle && (
            <p 
              className="text-sm font-light italic"
              style={{ color: 'var(--solace-stone-600)' }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Refined intensity badge */}
        <div className="flex-shrink-0">
          <div
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${style.bg} ${style.text} ${style.border} backdrop-blur-sm md:px-4 md:py-1.5 md:text-sm`}
            aria-label={`Intensity: ${intensity}`}
          >
            <SunMark phase={style.phase} size={15} />
            <span className="capitalize tracking-wide">{intensity}</span>
          </div>
        </div>
      </header>

      <div className="relative mt-4 space-y-3.5">
        {/* Main message with elegant spacing */}
        <div 
          className="text-[0.98rem] leading-relaxed font-light"
          style={{ color: 'var(--solace-stone-800)' }}
        >
          <p className="whitespace-pre-wrap">{message}</p>
        </div>

        {/* Designer note with refined styling */}
        {noteForDesigner && (
          <blockquote
            className="relative pl-5 py-1"
            style={{ borderLeft: `2px solid var(--solace-rocher-300)` }}
          >
            <p 
              className="text-sm italic font-light"
              style={{ color: 'var(--solace-stone-600)' }}
            >
              {noteForDesigner}
            </p>
          </blockquote>
        )}

        {/* Suggestion with gentle emphasis */}
        {suggestion && (
          <div className="flex items-start gap-2 pt-2">
            <span
              className="mt-0.5"
              style={{ color: 'var(--solace-ray-700)' }}
              aria-hidden="true"
            >
              <SunMark phase="soft" size={14} />
            </span>
            <p
              className="text-sm font-medium"
              style={{ color: 'var(--solace-stone-600)' }}
            >
              {suggestion}
            </p>
          </div>
        )}
      </div>

      {/* Decorative bottom accent */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'var(--solace-ray-300)' }}
        aria-hidden="true"
      />
    </section>
  );
}