'use client';

import React from 'react';
import type { SpecialDate } from '../data/specialDates';

interface Props {
  todayMessage: SpecialDate;
}

/**
 * Presents the message for "today" — either a special date or the default calm message.
 * Uses semantic markup and accessible structure with enhanced visual hierarchy.
 */
export default function DateMessage({ todayMessage }: Props) {
  const { title, subtitle, message, intensity, suggestion, noteForDesigner } = todayMessage;

  // Enhanced intensity mapping with refined color tokens
  const intensityMap: Record<string, { 
    bg: string; 
    text: string; 
    icon: string;
    border: string;
    gradient: string;
  }> = {
    soft: { 
      bg: 'bg-solace-ray-100/60', 
      text: 'text-solace-ray-700',
      icon: '𓆩♡𓆪',
      border: 'border-solace-ray-200',
      gradient: 'from-solace-ray-100/20 to-transparent'
    },
    supportive: { 
      bg: 'bg-solace-ray-100/80', 
      text: 'text-solace-ray-800',
      icon: '☾',
      border: 'border-solace-ray-300',
      gradient: 'from-solace-ray-100/30 to-transparent'
    },
    celebratory: { 
      bg: 'bg-solace-ray-300/70', 
      text: 'text-solace-ray-900',
      icon: '𓋴𓍯𓃭𓂧𓏏𓇼',
      border: 'border-solace-ray-400',
      gradient: 'from-solace-ray-300/30 to-transparent'
    },
    heavy: { 
      bg: 'bg-muted-violet/10', 
      text: 'text-muted-violet',
      icon: '𓋴𓃀𓂧𓏏',
      border: 'border-muted-violet/20',
      gradient: 'from-muted-violet/5 to-transparent'
    },
  };

  const style = intensityMap[intensity] ?? intensityMap.soft;

  return (
    <section
      aria-labelledby="today-heading"
      className="relative rounded-2xl bg-white/92 backdrop-blur-sm p-5 shadow-md smooth-fade transition-all duration-300 ease-out hover:shadow-lg border border-solace-stone-100/80 overflow-hidden group md:p-6"
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
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${style.bg} ${style.border} backdrop-blur-sm md:px-4 md:py-1.5 md:text-sm`}
            style={{ color: style.text }}
            aria-label={`Intensity: ${intensity}`}
          >
            <span className="font-serifHeading text-base" aria-hidden="true">
              {style.icon}
            </span>
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
            style={{ borderLeft: `2px solid var(--solace-rocher-200)` }}
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
              className="text-xs mt-0.5" 
              style={{ color: 'var(--solace-ray-600)' }}
              aria-hidden="true"
            >
              𓃀
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