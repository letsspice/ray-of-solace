'use client';

import React, { useMemo, useState } from 'react';
import { addTimelineEntry, loadTimeline, TimelineEntry } from '@/utils/timeline';
import { CODE_WORDS } from '@/components/CodeWordSelector';

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

/**
 * Small form for logging a special date or reflective note directly into the timeline.
 * This complements the automatic entries from check-ins and code-words.
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
    <section className="mt-6 rounded-2xl bg-white/60 p-4 shadow-sm">
      <h2 className="text-sm font-semibold mb-2" style={{ color: 'var(--solace-stone-900)' }}>
        Log a special date
      </h2>
      <p className="text-xs mb-3" style={{ color: 'var(--solace-stone-500)' }}>
        Use this when something meaningful happens and you want your own words
        to appear in the timeline later.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="special-date" className="text-xs font-medium" style={{ color: 'var(--solace-stone-700)' }}>
            Date (optional)
          </label>
          <input
            id="special-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-md border px-2 py-1 text-sm"
            style={{ borderColor: 'var(--solace-stone-300)', color: 'var(--solace-stone-800)' }}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="special-message" className="text-xs font-medium" style={{ color: 'var(--solace-stone-700)' }}>
            Short note
          </label>
          <textarea
            id="special-message"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="A small memory, a quiet win, or a heavy moment..."
            className="rounded-md border px-2 py-1 text-sm"
            style={{ borderColor: 'var(--solace-stone-300)', color: 'var(--solace-stone-800)' }}
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium shadow-sm transition-all duration-200 ease-out transform hover:-translate-y-[1px] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solace-ray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-solace-bg"
          style={{
            backgroundColor: 'var(--solace-ray-500)',
            color: 'var(--solace-stone-900)',
          }}
        >
          Save to timeline
        </button>
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
    <main className="mt-6 space-y-6">
      <section>
        <h1
          className="font-serifHeading text-xl mb-2"
          style={{ color: 'var(--solace-stone-900)' }}
        >
          Timeline
        </h1>
        <p className="text-sm" style={{ color: 'var(--solace-stone-700)' }}>
          Quiet history of check-ins, code-words, and marked dates. This stays
          on this device only.
        </p>
      </section>

      {latest && (
        <section className="rounded-2xl border border-solace-rocher-100 bg-white/80 p-5 shadow-md smooth-fade transition-transform duration-200 ease-out transform hover:-translate-y-[2px] hover:shadow-lg">
          <h2 className="text-sm font-semibold mb-1" style={{ color: 'var(--solace-stone-900)' }}>
            Current snapshot
          </h2>
          <p className="text-xs mb-1" style={{ color: 'var(--solace-stone-500)' }}>
            Based on your most recent entry.
          </p>
          <p className="text-sm" style={{ color: 'var(--solace-stone-800)' }}>
            {emotionalSnapshot || 'A gentle, quiet day logged.'}
          </p>
          <p className="mt-1 text-xs" style={{ color: 'var(--solace-stone-500)' }}>
            {formatTime(latest.timestamp)}
          </p>
        </section>
      )}

      <section className="space-y-3">
        <h2 className="text-sm font-semibold" style={{ color: 'var(--solace-stone-900)' }}>
          Entries
        </h2>

        {sortedEntries.length === 0 ? (
          <p className="text-sm" style={{ color: 'var(--solace-stone-600)' }}>
            No entries yet. Once you send a heaviness check-in or choose a
            code-word, they&apos;ll appear here.
          </p>
        ) : (
          <ul className="space-y-4 border-l border-dashed border-solace-rocher-100 pl-3">
            {sortedEntries.map((entry) => (
              <li
                key={entry.id}
                className="relative ml-1 rounded-2xl bg-white/80 p-4 shadow-md border border-solace-rocher-100 smooth-fade transition-transform duration-200 ease-out transform hover:-translate-y-[2px] hover:shadow-lg"
              >
                <span
                  className="absolute -left-3 top-3 h-2.5 w-2.5 rounded-full border border-white"
                  style={{ backgroundColor: 'var(--solace-rocher-500)' }}
                  aria-hidden
                />
                <div className="flex items-baseline justify-between gap-3">
                  <div className="text-xs" style={{ color: 'var(--solace-stone-500)' }}>
                    {formatTime(entry.timestamp)}
                  </div>
                </div>

                <div className="mt-1 space-y-1 text-sm" style={{ color: 'var(--solace-stone-800)' }}>
                  {entry.heaviness != null && (
                    <div>
                      <span className="text-xs uppercase tracking-wide mr-1" style={{ color: 'var(--solace-stone-500)' }}>
                        Heaviness
                      </span>
                      <span>{entry.heaviness}/10</span>
                    </div>
                  )}

                  {entry.codeword && (
                    (() => {
                      const cw = codewordByKey[entry.codeword!];
                      const label = cw?.label ?? entry.codeword;
                      const description = cw?.description;
                      return (
                        <div>
                          <div>
                            <span className="text-xs uppercase tracking-wide mr-1" style={{ color: 'var(--solace-stone-500)' }}>
                              Code-word
                            </span>
                            <span>{label}</span>
                          </div>
                          {description && (
                            <p className="text-xs mt-0.5" style={{ color: 'var(--solace-stone-500)' }}>
                              {description}
                            </p>
                          )}
                        </div>
                      );
                    })()
                  )}

                  {entry.message && (
                    <p className="text-sm mt-1" style={{ color: 'var(--solace-stone-800)' }}>
                      {entry.message}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <SpecialDateForm onCreated={refresh} />
    </main>
  );
}

