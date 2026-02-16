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
 * Interactive, keyboard-friendly CodeWord selector.
 * - Exposes selected codeword via onChange.
 * - Each item is focusable and can be toggled via Enter/Space.
 * - Visual weights show as small bars.
 */
export default function CodeWordSelector({ selected = null, onChange }: Props) {
  const [visibleWords] = useState<CodeWord[]>(() => {
    // Respect settings: allow hiding specific code-words from the picker.
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

  return (
    <div className="p-4 rounded-2xl bg-white/80 border border-solace-rocher-100 shadow-md smooth-fade">
      <h4 className="text-sm font-semibold mb-3 tracking-tight" style={{ color: 'var(--solace-stone-900)' }}>
        Code-words
      </h4>

      <div className="grid grid-cols-2 gap-3">
        {visibleWords.map((cw) => {
          const isSelected = selected === cw.key;
          return (
            <button
              key={cw.key}
              type="button"
              role="button"
              tabIndex={0}
              onClick={() => onChange?.(cw)}
              onKeyDown={(e) => handleKey(e, cw)}
              className={`p-3 rounded-md border text-left transition-all duration-200 ease-out transform hover:-translate-y-[1px] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solace-ray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-solace-bg`}
              style={{
                borderColor: isSelected ? 'var(--solace-ray-300)' : 'var(--solace-stone-300)',
                backgroundColor: isSelected ? 'var(--solace-ray-100)' : 'white',
              }}
              aria-pressed={isSelected}
              aria-label={`${cw.label}: weight ${cw.weight} — ${cw.description ?? ''}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium" style={{ color: 'var(--solace-stone-900)' }}>
                    {cw.label}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--solace-stone-500)' }}>
                    {cw.description}
                  </div>
                </div>

                <div className="ml-3 flex items-center gap-1" aria-hidden>
                  {/* Visual weight bar (small) */}
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const filled = Math.round((cw.weight / 10) * 5) > i;
                      return (
                        <span
                          key={i}
                          className="w-2 h-3 rounded-sm"
                          style={{
                            backgroundColor: filled ? 'var(--solace-rocher-700)' : 'var(--solace-stone-100)',
                            display: 'inline-block',
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
