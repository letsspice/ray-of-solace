'use client';

import React, { useState } from 'react';
import { AppSettings, DEFAULT_SETTINGS, updateSettings, loadSettings, applyTheme } from '@/utils/settings';
import { clearTimeline } from '@/utils/timeline';
import { CODE_WORDS } from '@/components/CodeWordSelector';

export default function SettingsPage() {
  const [settings, setSettings] = useState<AppSettings>(() => {
    // Client-only: safe to read from localStorage and apply the theme
    const stored = loadSettings();
    applyTheme(stored.theme);
    return stored;
  });

  function toggleConfirmations() {
    const next = updateSettings({ showConfirmations: !settings.showConfirmations });
    setSettings(next);
  }

  function toggleTheme() {
    const nextTheme = settings.theme === 'day' ? 'night' : 'day';
    const next = updateSettings({ theme: nextTheme });
    setSettings(next);
    applyTheme(nextTheme);
  }

  function handleClearTimeline() {
    const ok = window.confirm('Clear all local timeline history on this device?');
    if (!ok) return;
    clearTimeline();
  }

  function toggleCodewordVisibility(key: string) {
    const hidden = new Set(settings.hiddenCodewords ?? []);
    if (hidden.has(key)) {
      hidden.delete(key);
    } else {
      hidden.add(key);
    }
    const next = updateSettings({ hiddenCodewords: Array.from(hidden) });
    setSettings(next);
  }

  return (
    <main className="mt-6 space-y-6">
      <section>
        <h1
          className="font-serifHeading text-xl mb-2"
          style={{ color: 'var(--solace-stone-900)' }}
        >
          Personal sanctuary controls
        </h1>
        <p className="text-sm" style={{ color: 'var(--solace-stone-700)' }}>
          These settings only live on this device. They shape how quietly the
          app responds and what you see.
        </p>
      </section>

      <section className="rounded-2xl bg-white/60 p-4 shadow-sm space-y-4">
        <h2 className="text-sm font-semibold" style={{ color: 'var(--solace-stone-900)' }}>
          Quiet confirmations
        </h2>
        <p className="text-xs" style={{ color: 'var(--solace-stone-500)' }}>
          Control whether the app shows the small &quot;sent&quot; emoji after a
          heaviness check-in. The note still sends either way.
        </p>

        <button
          type="button"
          onClick={toggleConfirmations}
          className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium border"
          style={{
            borderColor: 'var(--solace-stone-300)',
            backgroundColor: settings.showConfirmations ? 'var(--solace-ray-100)' : 'white',
            color: 'var(--solace-stone-900)',
          }}
        >
          {settings.showConfirmations ? 'Confirmations: on' : 'Confirmations: off'}
        </button>
      </section>

      <section className="rounded-2xl bg-white/60 p-4 shadow-sm space-y-3">
        <h2 className="text-sm font-semibold" style={{ color: 'var(--solace-stone-900)' }}>
          Timeline safety
        </h2>
        <p className="text-xs" style={{ color: 'var(--solace-stone-500)' }}>
          Your timeline is stored only in this browser. You can clear it at
          any time.
        </p>
        <button
          type="button"
          onClick={handleClearTimeline}
          className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium border"
          style={{
            borderColor: 'var(--solace-rocher-300)',
            backgroundColor: 'white',
            color: 'var(--solace-rocher-700)',
          }}
        >
          Clear timeline history
        </button>
      </section>

      <section className="rounded-2xl bg-white/60 p-4 shadow-sm space-y-3">
        <h2 className="text-sm font-semibold" style={{ color: 'var(--solace-stone-900)' }}>
          Code-word palette
        </h2>
        <p className="text-xs" style={{ color: 'var(--solace-stone-500)' }}>
          Hide words that no longer feel right. Hidden words disappear from the
          quick picker but stay in memories that already exist.
        </p>

        <ul className="space-y-2 text-sm">
          {CODE_WORDS.map((cw) => {
            const hidden = settings.hiddenCodewords?.includes(cw.key);
            return (
              <li key={cw.key} className="flex items-center justify-between gap-2">
                <div>
                  <div style={{ color: 'var(--solace-stone-900)' }}>{cw.label}</div>
                  {cw.description && (
                    <div className="text-xs" style={{ color: 'var(--solace-stone-500)' }}>
                      {cw.description}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => toggleCodewordVisibility(cw.key)}
                  className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium border"
                  style={{
                    borderColor: 'var(--solace-stone-300)',
                    backgroundColor: hidden ? 'white' : 'var(--solace-teal-100, #e0f2f1)',
                    color: hidden ? 'var(--solace-stone-700)' : 'var(--solace-stone-900)',
                  }}
                >
                  {hidden ? 'Hidden' : 'Visible'}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="rounded-2xl bg-white/60 p-4 shadow-sm space-y-3">
        <h2 className="text-sm font-semibold" style={{ color: 'var(--solace-stone-900)' }}>
          Theme (optional)
        </h2>
        <p className="text-xs" style={{ color: 'var(--solace-stone-500)' }}>
          Switch between a lighter Stone & Light canvas and a deeper night
          variation.
        </p>

        <button
          type="button"
          onClick={toggleTheme}
          className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium border"
          style={{
            borderColor: 'var(--solace-stone-300)',
            backgroundColor: settings.theme === 'day' ? 'var(--solace-ray-100)' : 'var(--solace-rocher-700)',
            color: settings.theme === 'day' ? 'var(--solace-stone-900)' : 'white',
          }}
        >
          Theme: {settings.theme === 'day' ? 'Daylight' : 'Night'}
        </button>
      </section>
    </main>
  );
}

