'use client';

import React, { useState } from 'react';
import { AppSettings, updateSettings, loadSettings, applyTheme } from '@/utils/settings';
import { clearTimeline } from '@/utils/timeline';
import { CODE_WORDS } from '@/components/CodeWordSelector';
import SunMark, { phaseForWeight } from '@/components/icons/SunMark';

export default function SettingsPage() {
  const [settings, setSettings] = useState<AppSettings>(() => {
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
    <main className="space-y-8 pb-12 lg:space-y-10">
      {/* Header */}
      <section className="solace-card relative overflow-hidden p-6 md:p-8">
        <div
          className="pointer-events-none absolute -right-10 -top-12 opacity-[0.07]"
          style={{ color: 'var(--solace-ray-700)' }}
          aria-hidden="true"
        >
          <SunMark phase="radiant" size={140} />
        </div>
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="solace-eyebrow mb-1.5">Your sanctuary, your rules</p>
            <h1
              className="font-serifHeading text-3xl tracking-tight md:text-[2rem]"
              style={{ color: 'var(--solace-stone-900)' }}
            >
              Sanctuary controls
            </h1>
            <p
              className="mt-2 max-w-md text-sm leading-relaxed"
              style={{ color: 'var(--solace-stone-600)' }}
            >
              These settings only live on this device. They shape how quietly the
              app responds and what you see.
            </p>
          </div>
        </div>
      </section>

      {/* Settings Grid: single column, then straight to 3 across —
          skipping a 2-column state avoids an orphaned card next to an empty gap. */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Quiet Confirmations Card */}
        <section className="solace-card p-6">
          <div className="flex items-start gap-4">
            <div
              className="solace-icon-badge"
              style={{
                backgroundColor: 'var(--solace-ray-100)',
                color: 'var(--solace-ray-700)',
              }}
              aria-hidden="true"
            >
              <SunMark phase="soft" size={20} />
            </div>
            <div className="flex-1">
              <h2 className="mb-1 text-base font-semibold" style={{ color: 'var(--solace-stone-900)' }}>
                Quiet confirmations
              </h2>
              <p className="mb-4 text-xs leading-relaxed" style={{ color: 'var(--solace-stone-500)' }}>
                Control whether the app shows the small sent emoji after a
                heaviness check-in. The note still sends either way.
              </p>

              <button
                type="button"
                onClick={toggleConfirmations}
                className={`
                  inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium
                  border shadow-sm transition-all duration-200
                  hover:shadow-md focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-solace-ray-500
                  focus-visible:ring-offset-2 focus-visible:ring-offset-solace-bg
                  ${settings.showConfirmations ? 'hover:bg-solace-ray-200/50' : 'hover:bg-solace-stone-100/50'}
                `}
                style={{
                  borderColor: settings.showConfirmations
                    ? 'var(--solace-ray-300)'
                    : 'var(--solace-stone-300)',
                  backgroundColor: settings.showConfirmations
                    ? 'var(--solace-ray-100)'
                    : 'white',
                  color: 'var(--solace-stone-900)',
                }}
              >
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center text-xs"
                  style={{
                    backgroundColor: settings.showConfirmations
                      ? 'var(--solace-ray-500)'
                      : 'var(--solace-stone-300)',
                    color: 'white'
                  }}
                >
                  {settings.showConfirmations ? '✓' : '✕'}
                </span>
                {settings.showConfirmations ? 'Confirmations on' : 'Confirmations off'}
              </button>
            </div>
          </div>
        </section>

        {/* Theme Card */}
        <section className="solace-card p-6">
          <div className="flex items-start gap-4">
            <div
              className="solace-icon-badge text-lg"
              style={{
                backgroundColor: settings.theme === 'day'
                  ? 'var(--solace-ray-100)'
                  : 'var(--solace-rocher-100)',
                color: settings.theme === 'day'
                  ? 'var(--solace-ray-700)'
                  : 'var(--solace-rocher-700)',
              }}
              aria-hidden="true"
            >
              {settings.theme === 'day' ? '☀' : '☾'}
            </div>
            <div className="flex-1">
              <h2 className="mb-1 text-base font-semibold" style={{ color: 'var(--solace-stone-900)' }}>
                Visual rhythm
              </h2>
              <p className="mb-4 text-xs leading-relaxed" style={{ color: 'var(--solace-stone-500)' }}>
                Switch between a golden-hour daytime canvas and a deeper,
                candlelit night variation.
              </p>

              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex items-center gap-3 rounded-full px-4 py-2 text-xs font-medium border shadow-sm transition-all duration-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solace-ray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-solace-bg"
                style={{
                  borderColor: settings.theme === 'day'
                    ? 'var(--solace-ray-300)'
                    : 'var(--solace-rocher-300)',
                  backgroundColor: settings.theme === 'day'
                    ? 'var(--solace-ray-100)'
                    : 'var(--solace-rocher-700)',
                  color: settings.theme === 'day'
                    ? 'var(--solace-stone-900)'
                    : 'white',
                }}
              >
                <span className="flex items-center gap-1">
                  <span className={settings.theme === 'day' ? 'opacity-100' : 'opacity-50'}>☀</span>
                  <span className="text-xs">/</span>
                  <span className={settings.theme === 'night' ? 'opacity-100' : 'opacity-50'}>☾</span>
                </span>
                <span className="capitalize">{settings.theme}</span>
              </button>
            </div>
          </div>
        </section>

        {/* Timeline Safety Card */}
        <section className="solace-card p-6">
          <div className="flex items-start gap-4">
            <div
              className="solace-icon-badge text-lg"
              style={{
                backgroundColor: 'var(--solace-rocher-100)',
                color: 'var(--solace-rocher-700)',
              }}
              aria-hidden="true"
            >
              🔒
            </div>
            <div className="flex-1">
              <h2 className="mb-1 text-base font-semibold" style={{ color: 'var(--solace-stone-900)' }}>
                Timeline safety
              </h2>
              <p className="mb-4 text-xs leading-relaxed" style={{ color: 'var(--solace-stone-500)' }}>
                Your timeline is stored only in this browser. You can clear it at
                any time.
              </p>

              <button
                type="button"
                onClick={handleClearTimeline}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium border border-solace-rocher-300 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-solace-rocher-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solace-ray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-solace-bg"
                style={{
                  color: 'var(--solace-rocher-700)',
                }}
              >
                <span className="text-base">🗑️</span>
                Clear timeline history
              </button>
            </div>
          </div>
        </section>

        {/* Code-word Palette Card - Spans Full Width on Desktop */}
        <section className="solace-card p-6 lg:col-span-3">
          <div className="mb-6 flex items-start gap-4">
            <div
              className="solace-icon-badge"
              style={{
                backgroundColor: 'var(--solace-ray-100)',
                color: 'var(--solace-ray-700)',
              }}
              aria-hidden="true"
            >
              <SunMark phase="glowing" size={20} />
            </div>
            <div>
              <h2 className="mb-1 text-base font-semibold" style={{ color: 'var(--solace-stone-900)' }}>
                Code-word palette
              </h2>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--solace-stone-500)' }}>
                Hide words that no longer feel right. Hidden words disappear from the
                quick picker but stay in memories that already exist.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CODE_WORDS.map((cw) => {
              const hidden = settings.hiddenCodewords?.includes(cw.key);
              return (
                <div
                  key={cw.key}
                  className={`
                    relative rounded-xl border-2 p-4 transition-all duration-300
                    ${hidden ? 'opacity-60' : 'hover:shadow-md hover:-translate-y-0.5'}
                  `}
                  style={{
                    borderColor: hidden
                      ? 'var(--solace-stone-300)'
                      : 'var(--solace-ray-300)',
                    backgroundColor: hidden
                      ? 'var(--solace-stone-100)'
                      : 'white',
                  }}
                >
                  {/* Weight indicator dots */}
                  <div className="absolute top-3 right-3 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className="w-1 h-1 rounded-full"
                        style={{
                          backgroundColor: i < Math.ceil(cw.weight / 2)
                            ? 'var(--solace-ray-500)'
                            : 'var(--solace-stone-300)',
                        }}
                      />
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <SunMark
                          phase={phaseForWeight(cw.weight)}
                          size={14}
                          className="opacity-70"
                        />
                        <span className="text-sm font-serifHeading" style={{ color: 'var(--solace-stone-900)' }}>
                          {cw.label}
                        </span>
                        <span className="text-xs" style={{ color: 'var(--solace-stone-500)' }}>
                          {cw.weight}
                        </span>
                      </div>
                      {cw.description && (
                        <div className="text-xs mt-0.5" style={{ color: 'var(--solace-stone-500)' }}>
                          {cw.description}
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleCodewordVisibility(cw.key)}
                      className={`
                        w-full mt-2 inline-flex items-center justify-center gap-2
                        rounded-full px-3 py-1.5 text-xs font-medium border
                        transition-all duration-200
                        hover:shadow-sm focus-visible:outline-none
                        focus-visible:ring-2 focus-visible:ring-solace-ray-500
                        focus-visible:ring-offset-2 focus-visible:ring-offset-solace-bg
                      `}
                      style={{
                        borderColor: hidden
                          ? 'var(--solace-stone-300)'
                          : 'var(--solace-ray-300)',
                        backgroundColor: hidden
                          ? 'white'
                          : 'var(--solace-ray-100)',
                        color: hidden
                          ? 'var(--solace-stone-700)'
                          : 'var(--solace-ray-900)',
                      }}
                    >
                      <span className="w-3 h-3 rounded-full flex items-center justify-center text-[8px]"
                        style={{
                          backgroundColor: hidden
                            ? 'var(--solace-stone-400)'
                            : 'var(--solace-ray-500)',
                          color: 'white'
                        }}
                      >
                        {hidden ? '✕' : '✓'}
                      </span>
                      {hidden ? 'Hidden' : 'Visible'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="solace-divider mt-6 border-t pt-5 text-[0.6rem]" style={{ borderColor: 'var(--solace-stone-100)' }}>
            <SunMark phase="soft" size={12} />
            <span className="solace-eyebrow">each word holds a weight</span>
            <SunMark phase="soft" size={12} />
          </div>
        </section>
      </div>

      {/* Footer Note */}
      <footer className="text-center">
        <p
          className="text-xs"
          style={{ color: 'var(--solace-stone-400)' }}
        >
          All settings are stored locally • Your sanctuary, your rules
        </p>
      </footer>
    </main>
  );
}
