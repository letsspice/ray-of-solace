'use client';

import React, { useMemo, useState } from 'react';
import { addTimelineEntry, loadTimeline, TimelineEntry } from '@/utils/timeline';
import { CODE_WORDS } from '@/components/CodeWordSelector';
import SunMark, { phaseForWeight, SunPhase } from '@/components/icons/SunMark';

function formatTime(timestamp: string) {
  const date = new Date(timestamp);
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatRelativeTime(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'today';
  if (diffInDays === 1) return 'yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  return formatTime(timestamp);
}

const PHASE_COLOR: Record<SunPhase, string> = {
  radiant: 'var(--solace-ray-500)',
  glowing: 'var(--solace-ray-700)',
  soft: 'var(--solace-ray-700)',
  veiled: 'var(--solace-rocher-500)',
  resting: 'var(--solace-ember-700)',
};

/**
 * Small form for logging a special date or reflective note directly into the timeline.
 */
function SpecialDateForm({ onCreated }: { onCreated: () => void }) {
  const [date, setDate] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!date && !message) return;

    const timestamp = date ? new Date(date).toISOString() : new Date().toISOString();

    addTimelineEntry({
      timestamp,
      message: message || 'Noted a special moment.',
    });

    setDate('');
    setMessage('');
    onCreated();
  }

  return (
    <section className="solace-card p-6 md:p-7">
      <div className="mb-5 flex items-start gap-3">
        <div
          className="solace-icon-badge"
          style={{
            backgroundColor: 'var(--solace-ray-100)',
            color: 'var(--solace-ray-700)',
          }}
          aria-hidden="true"
        >
          <SunMark phase="glowing" size={18} />
        </div>
        <div>
          <h2 className="text-sm font-semibold" style={{ color: 'var(--solace-stone-900)' }}>
            Log a special date
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--solace-stone-500)' }}>
            Use this when something meaningful happens
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="special-date" className="text-xs font-medium flex items-center gap-1" style={{ color: 'var(--solace-stone-700)' }}>
              <span>Date</span>
              <span className="text-[0.6rem]" style={{ color: 'var(--solace-stone-400)' }}>(optional)</span>
            </label>
            <input
              id="special-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm transition-all duration-200 focus:border-solace-ray-500 focus:ring-2 focus:ring-solace-ray-500/20 focus:ring-offset-2 focus:ring-offset-solace-bg"
              style={{
                borderColor: 'var(--solace-stone-300)',
                color: 'var(--solace-stone-800)',
                backgroundColor: 'white'
              }}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="special-message" className="text-xs font-medium" style={{ color: 'var(--solace-stone-700)' }}>
              Short note
            </label>
            <input
              id="special-message"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="A small memory..."
              className="w-full rounded-lg border px-3 py-2 text-sm transition-all duration-200 focus:border-solace-ray-500 focus:ring-2 focus:ring-solace-ray-500/20 focus:ring-offset-2 focus:ring-offset-solace-bg placeholder:text-solace-stone-400"
              style={{
                borderColor: 'var(--solace-stone-300)',
                color: 'var(--solace-stone-800)',
                backgroundColor: 'white'
              }}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!date && !message}
            className="group inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-medium shadow-sm transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solace-ray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-solace-bg"
            style={{
              background: 'linear-gradient(135deg, var(--solace-ray-500), var(--solace-ray-700))',
              color: 'white',
            }}
          >
            <span>Save to timeline</span>
            <span className="text-lg opacity-70 group-hover:translate-x-0.5 transition-transform">→</span>
          </button>
        </div>
      </form>
    </section>
  );
}

export default function TimelinePage() {
  const [entries, setEntries] = useState<TimelineEntry[]>(() => loadTimeline());

  const codewordByKey = useMemo(() => {
    const map: Record<string, (typeof CODE_WORDS)[number]> = {};
    for (const cw of CODE_WORDS) {
      map[cw.key] = cw;
    }
    return map;
  }, []);

  const sortedEntries = useMemo(
    () =>
      [...entries].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      ),
    [entries],
  );

  const latest = sortedEntries[0];

  const emotionalSnapshot = useMemo(() => {
    if (!latest) return null;

    const parts: string[] = [];
    if (latest.heaviness != null) parts.push(`Heaviness ${latest.heaviness}/10`);
    if (latest.codeword) {
      const cw = codewordByKey[latest.codeword];
      const label = cw?.label ?? latest.codeword;
      parts.push(`Code-word: ${label}`);
    }

    return parts.join(' · ');
  }, [latest, codewordByKey]);

  function refresh() {
    setEntries(loadTimeline());
  }

  return (
    <main className="space-y-8 pb-12 lg:space-y-10">
      {/* Header */}
      <section className="solace-card relative overflow-hidden p-6 md:p-8">
        <div
          className="pointer-events-none absolute -right-10 -top-12 opacity-[0.07]"
          style={{ color: 'var(--solace-rocher-700)' }}
          aria-hidden="true"
        >
          <SunMark phase="radiant" size={140} />
        </div>
        <div className="relative">
          <p className="solace-eyebrow mb-1.5">A quiet record, just for us</p>
          <h1
            className="font-serifHeading text-3xl tracking-tight md:text-[2rem]"
            style={{ color: 'var(--solace-stone-900)' }}
          >
            Walking through time
          </h1>
          <p
            className="mt-2 max-w-md text-sm leading-relaxed"
            style={{ color: 'var(--solace-stone-600)' }}
          >
            Quiet history of check-ins, code-words, and marked dates. This stays
            on this device only.
          </p>
        </div>
      </section>

      {/* Current Snapshot */}
      {latest && (
        <section className="solace-card p-6 md:p-7">
          <div className="flex items-start gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
              style={{
                backgroundColor: 'var(--solace-ray-100)',
                color: latest.heaviness != null
                  ? PHASE_COLOR[phaseForWeight(latest.heaviness)]
                  : 'var(--solace-ray-700)',
              }}
              aria-hidden="true"
            >
              <SunMark
                phase={latest.heaviness != null ? phaseForWeight(latest.heaviness) : 'soft'}
                size={24}
              />
            </div>

            <div className="flex-1">
              <h2 className="text-sm font-semibold mb-1 flex items-center gap-2" style={{ color: 'var(--solace-stone-900)' }}>
                Current emotional weather
                <span className="text-[0.6rem] px-2 py-0.5 rounded-full" style={{
                  backgroundColor: 'var(--solace-ray-100)',
                  color: 'var(--solace-ray-700)'
                }}>
                  {formatRelativeTime(latest.timestamp)}
                </span>
              </h2>

              <div className="space-y-2">
                <p className="text-base font-serifHeading" style={{ color: 'var(--solace-stone-800)' }}>
                  {emotionalSnapshot || 'A gentle, quiet day logged.'}
                </p>

                {latest.heaviness && (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 max-w-xs h-1.5 rounded-full bg-solace-stone-300 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${latest.heaviness * 10}%`,
                          background: `linear-gradient(90deg, var(--solace-ray-300), ${PHASE_COLOR[phaseForWeight(latest.heaviness)]})`
                        }}
                      />
                    </div>
                    <span className="text-xs" style={{ color: 'var(--solace-stone-500)' }}>
                      {latest.heaviness}/10
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Timeline Entries */}
      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold" style={{ color: 'var(--solace-stone-900)' }}>
            Memory path
          </h2>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, var(--solace-rocher-300), transparent)' }} />
          <span className="text-xs" style={{ color: 'var(--solace-stone-400)' }}>
            {sortedEntries.length} {sortedEntries.length === 1 ? 'step' : 'steps'}
          </span>
        </div>

        {sortedEntries.length === 0 ? (
          <div className="solace-card border-dashed py-14 text-center">
            <div className="mb-3 flex justify-center opacity-30" style={{ color: 'var(--solace-stone-500)' }} aria-hidden="true">
              <SunMark phase="soft" size={40} />
            </div>
            <p className="text-sm" style={{ color: 'var(--solace-stone-600)' }}>
              No entries yet. Once you send a heaviness check-in or choose a
              code-word, they&apos;ll appear here.
            </p>
          </div>
        ) : (
          <div className="relative">
            {/* Vertical timeline line */}
            <div
              className="absolute left-4 top-0 bottom-0 w-0.5"
              style={{
                background: `linear-gradient(to bottom, var(--solace-ray-300), var(--solace-rocher-300), var(--solace-ray-300))`,
                opacity: 0.4
              }}
              aria-hidden="true"
            />

            <ul className="space-y-5 relative">
              {sortedEntries.map((entry) => {
                const phase = entry.heaviness != null ? phaseForWeight(entry.heaviness) : 'soft';
                const moodColor = PHASE_COLOR[phase];
                const cw = entry.codeword ? codewordByKey[entry.codeword] : null;

                return (
                  <li
                    key={entry.id}
                    className="relative pl-12 group"
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute left-[0.85rem] top-6 w-3 h-3 rounded-full border-2 border-white transform -translate-x-1/2 transition-all duration-300 group-hover:scale-125 group-hover:shadow-md"
                      style={{
                        backgroundColor: moodColor,
                        borderColor: 'white'
                      }}
                      aria-hidden="true"
                    />

                    {/* Entry card */}
                    <div className="solace-card p-5 group-hover:-translate-y-0.5">
                      {/* Header with time */}
                      <div className="flex items-center justify-between mb-3">
                        <time
                          className="text-xs font-medium"
                          style={{ color: 'var(--solace-stone-500)' }}
                          dateTime={entry.timestamp}
                        >
                          {formatTime(entry.timestamp)}
                        </time>
                        {entry.heaviness && (
                          <span
                            className="inline-flex items-center gap-1 text-[0.6rem] px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: 'var(--solace-ray-100)',
                              color: moodColor,
                              border: `1px solid ${moodColor}`
                            }}
                          >
                            <SunMark phase={phase} size={10} />
                            {entry.heaviness}/10
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="space-y-2">
                        {cw && (
                          <div className="flex items-center gap-2">
                            <span
                              className="text-xs px-2 py-0.5 rounded-md"
                              style={{
                                backgroundColor: 'var(--solace-ray-100)',
                                color: 'var(--solace-ray-900)',
                                border: '1px solid var(--solace-ray-300)'
                              }}
                            >
                              {cw.label}
                            </span>
                            {cw.description && (
                              <span className="text-xs" style={{ color: 'var(--solace-stone-500)' }}>
                                {cw.description}
                              </span>
                            )}
                          </div>
                        )}

                        {entry.message && (
                          <p className="text-sm leading-relaxed" style={{ color: 'var(--solace-stone-700)' }}>
                            {entry.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </section>

      <SpecialDateForm onCreated={refresh} />

      {/* Gentle footer */}
      <div className="solace-divider pt-2 text-[0.6rem]">
        <SunMark phase="soft" size={12} />
        <span className="solace-eyebrow">each step matters</span>
        <SunMark phase="soft" size={12} />
      </div>
    </main>
  );
}
