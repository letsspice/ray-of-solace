import React from 'react';

export default function TimelinePage() {
  return (
    <main className="mt-6">
      <h1 className="font-serifHeading text-xl mb-4" style={{ color: 'var(--solace-stone-900)' }}>
        Timeline
      </h1>

      <section className="rounded-2xl bg-white/60 p-4 shadow-sm">
        <p className="text-sm" style={{ color: 'var(--solace-stone-700)' }}>
          This is the Timeline scaffold. Saved check-ins and reflections will appear here.
        </p>

        <div className="mt-4 text-xs text-solace-stone-500" style={{ color: 'var(--solace-stone-500)' }}>
          <p>Planned next: local-only persistence + a private timeline view (no external analytics).</p>
        </div>
      </section>
    </main>
  );
}
