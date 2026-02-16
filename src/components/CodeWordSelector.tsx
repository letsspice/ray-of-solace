'use client';

import React, { KeyboardEvent, useState } from 'react';
import { loadSettings } from '../utils/settings';

export type CodeWord = {
  key: string;
  label: string;
  weight: number; // 1 - 10
  description?: string;
};

export const CODE_WORDS: CodeWord[] = [
  { key: 'moss', label: 'Moss', weight: 2, description: 'soft, resting' },
  { key: 'velvet', label: 'Velvet', weight: 4, description: 'soft and quiet' },
  { key: 'turtle', label: 'Turtle', weight: 7, description: 'pulling into shell' },
  { key: 'nebula', label: 'Nebula', weight: 9, description: 'clouded, distant' },
];

interface Props {
  selected?: string | null;
  onChange?: (cw: CodeWord) => void;
}

/**
 * Expressive, keyboard-friendly CodeWord selector.
 * Each word becomes a mood-card with visual weight indicators.
 */
export default function CodeWordSelector({ selected = null, onChange }: Props) {
  const [visibleWords] = useState<CodeWord[]>(() => {
    const settings = loadSettings();
    const hidden = new Set(settings.hiddenCodewords ?? []);
    return CODE_WORDS.filter((cw) => !hidden.has(cw.key));
  });

  function handleKey(e: KeyboardEvent, cw: CodeWord) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange?.(cw);
    }
  }

  // Get weight symbol based on value
  const getWeightSymbol = (weight: number): string => {
    if (weight <= 3) return "𓆉";
    if (weight <= 6) return "𓃠";
    if (weight <= 8) return "𓆣";
    return "𓃀";
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {visibleWords.map((cw) => {
        const isSelected = selected === cw.key;
        
        return (
          <button
            key={cw.key}
            type="button"
            onClick={() => onChange?.(cw)}
            onKeyDown={(e) => handleKey(e, cw)}
            className={`
              group relative p-4 rounded-xl border-2 text-left transition-all duration-300
              hover:shadow-md focus-visible:outline-none focus-visible:ring-2 
              focus-visible:ring-solace-ray-500 focus-visible:ring-offset-2 
              focus-visible:ring-offset-solace-bg
              ${isSelected ? 'shadow-md' : 'hover:-translate-y-0.5'}
            `}
            style={{
              borderColor: isSelected 
                ? 'var(--solace-ray-300)' 
                : 'var(--solace-stone-300)',
              backgroundColor: isSelected 
                ? 'var(--solace-ray-100)' 
                : 'white',
            }}
            aria-pressed={isSelected}
            aria-label={`${cw.label}: weight ${cw.weight} — ${cw.description}`}
          >
            {/* Decorative corner accent */}
            <span 
              className="absolute top-2 right-2 text-xs opacity-30 group-hover:opacity-60 transition-opacity"
              aria-hidden="true"
            >
              {getWeightSymbol(cw.weight)}
            </span>

            <div className="space-y-2">
              {/* Label and weight bar */}
              <div>
                <div className="flex items-center justify-between">
                  <span 
                    className="text-base font-serifHeading"
                    style={{ color: 'var(--solace-stone-900)' }}
                  >
                    {cw.label}
                  </span>
                </div>
                
                {cw.description && (
                  <div 
                    className="text-xs mt-0.5"
                    style={{ color: 'var(--solace-stone-500)' }}
                  >
                    {cw.description}
                  </div>
                )}
              </div>

              {/* Refined weight visualization */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <div className="flex-1 flex gap-0.5 h-1.5">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <span
                        key={i}
                        className="flex-1 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: i < cw.weight 
                            ? 'var(--solace-ray-500)' 
                            : 'var(--solace-stone-300)',
                          height: i < cw.weight ? '6px' : '2px',
                          marginTop: i < cw.weight ? '0' : '2px',
                        }}
                      />
                    ))}
                  </div>
                  <span 
                    className="text-xs font-medium"
                    style={{ color: 'var(--solace-ray-700)' }}
                  >
                    {cw.weight}
                  </span>
                </div>
                
                {/* Weight context */}
                <div 
                  className="text-[0.6rem] uppercase tracking-wider"
                  style={{ color: 'var(--solace-stone-500)' }}
                >
                  {cw.weight <= 3 && 'gentle'}
                  {cw.weight > 3 && cw.weight <= 6 && 'present'}
                  {cw.weight > 6 && cw.weight <= 8 && 'heavy'}
                  {cw.weight > 8 && 'immense'}
                </div>
              </div>
            </div>

            {/* Selection indicator */}
            {isSelected && (
              <div 
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs"
                style={{ 
                  backgroundColor: 'var(--solace-ray-500)',
                  color: 'white'
                }}
                aria-hidden="true"
              >
                ✓
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}