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
    <section className="mt-8 rounded-2xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm p-6 shadow-md border border-solace-stone-100/80 smooth-fade">
      <div className="flex items-start gap-3 mb-4">
        <div 
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
          style={{ 
            backgroundColor: 'var(--solace-ray-100)',
            color: 'var(--solace-ray-700)'
          }}
          aria-hidden="true"
        >
          𓋴𓃀
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
                borderColor: 'var(--solace-stone-200)',
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
                borderColor: 'var(--solace-stone-200)',
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
              background: 'linear-gradient(135deg, var(--solace-ray-500), var(--solace-ray-600))',
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

  // Get mood indicator based on heaviness
  const getMoodIndicator = (heaviness?: number) => {
    if (!heaviness) return null;
    if (heaviness <= 3) return { symbol: '𓆉', color: 'var(--solace-ray-500)' };
    if (heaviness <= 6) return { symbol: '𓃠', color: 'var(--solace-ray-700)' };
    if (heaviness <= 8) return { symbol: '𓆣', color: 'var(--solace-rocher-500)' };
    return { symbol: '𓃀', color: 'var(--muted-violet)' };
  };

  function refresh() {
    setEntries(loadTimeline());
  }

  return (
    <main className="space-y-6 pb-10 lg:space-y-7">
      {/* Header with poetic touch */}
      <section className="relative">
        <div className="flex items-start justify-between">
          <div>
            <h1
              className="font-serifHeading text-2xl mb-2 tracking-tight"
              style={{ color: 'var(--solace-stone-900)' }}
            >
              Walking through time
            </h1>
            <p 
              className="text-sm max-w-md leading-relaxed"
              style={{ color: 'var(--solace-stone-600)' }}
            >
              Quiet history of check-ins, code-words, and marked dates. This stays
              on this device only.
            </p>
          </div>
          <div 
            className="hidden sm:block text-4xl opacity-20"
            style={{ color: 'var(--solace-ray-500)' }}
            aria-hidden="true"
          >
            𓋴𓃀𓂧𓏏
          </div>
        </div>
        <div 
          className="absolute bottom-0 left-0 w-20 h-0.5 rounded-full"
          style={{ background: 'var(--solace-ray-300)' }}
          aria-hidden="true"
        />
      </section>

      {/* Current Snapshot - Enhanced */}
      {latest && (
        <section className="group relative rounded-2xl border border-solace-stone-100/80 bg-gradient-to-br from-white/90 to-white/75 p-5 shadow-md backdrop-blur-sm smooth-fade transition-all duration-300 hover:shadow-lg md:p-6">
          {/* Decorative corner element */}
          <div 
            className="absolute top-0 right-0 w-24 h-24 rounded-tr-2xl opacity-5 pointer-events-none"
            style={{
              background: `radial-gradient(circle at top right, var(--solace-ray-500), transparent 70%)`
            }}
            aria-hidden="true"
          />
          
          <div className="flex items-start gap-4">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
              style={{ 
                backgroundColor: 'var(--solace-ray-100)',
                color: getMoodIndicator(latest.heaviness)?.color || 'var(--solace-ray-700)'
              }}
              aria-hidden="true"
            >
              {getMoodIndicator(latest.heaviness)?.symbol || '𓋴'}
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
                    <div className="flex-1 max-w-xs h-1.5 rounded-full bg-solace-stone-200 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${latest.heaviness * 10}%`,
                          background: `linear-gradient(90deg, var(--solace-ray-300), ${getMoodIndicator(latest.heaviness)?.color || 'var(--solace-ray-500)'})`
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

      {/* Timeline Entries - Reimagined as a journey */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold" style={{ color: 'var(--solace-stone-900)' }}>
            Memory path
          </h2>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, var(--solace-rocher-200), transparent)' }} />
          <span className="text-xs" style={{ color: 'var(--solace-stone-400)' }}>
            {sortedEntries.length} {sortedEntries.length === 1 ? 'step' : 'steps'}
          </span>
        </div>

        {sortedEntries.length === 0 ? (
          <div className="text-center py-12 rounded-2xl border border-dashed border-solace-stone-200 bg-white/50">
            <div 
              className="text-4xl mb-3 opacity-30"
              style={{ color: 'var(--solace-stone-400)' }}
              aria-hidden="true"
            >
              𓃀𓋴𓂧
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
                opacity: 0.3
              }}
              aria-hidden="true"
            />

            <ul className="space-y-4 relative">
              {sortedEntries.map((entry) => {
                const mood = getMoodIndicator(entry.heaviness);
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
                        backgroundColor: mood?.color || 'var(--solace-stone-400)',
                        borderColor: 'white'
                      }}
                      aria-hidden="true"
                    />
                    
                    {/* Entry card */}
                    <div className="rounded-xl border border-solace-stone-100/80 bg-white/92 p-5 shadow-sm backdrop-blur-sm smooth-fade transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md">
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
                            className="text-[0.6rem] px-2 py-0.5 rounded-full"
                            style={{ 
                              backgroundColor: 'var(--solace-ray-100)',
                              color: mood?.color || 'var(--solace-ray-700)',
                              border: `1px solid ${mood?.color || 'var(--solace-ray-300)'}`
                            }}
                          >
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
                                color: 'var(--solace-ray-800)',
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

                      {/* Decorative element for entries with notes */}
                      {entry.message && (
                        <div 
                          className="absolute top-2 right-2 text-xs opacity-20"
                          style={{ color: 'var(--solace-ray-500)' }}
                          aria-hidden="true"
                        >
                          𓋴𓃀𓂧
                        </div>
                      )}
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
      <footer className="text-center pt-4">
        <p 
          className="text-[0.6rem] uppercase tracking-wider"
          style={{ color: 'var(--solace-stone-400)' }}
        >
          <span aria-hidden="true">𓆣</span> each step matters <span aria-hidden="true">𓆣</span>
        </p>
      </footer>
    </main>
  );
}