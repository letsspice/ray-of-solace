'use client';

import React, { useState } from 'react';

/**
 * Minimal, accessible heaviness form for testing.
 * This posts nowhere — it simulates a quick Formspree flow by showing a local confirmation.
 * Keep it quiet: submission shows a single emoji feedback in an aria-live region.
 */

export default function HeavinessForm() {
  const [score, setScore] = useState<number>(5);
  const [note, setNote] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Simulate send
    setSent(true);
    setTimeout(() => setSent(false), 2500);
    // In production, this is where you'd POST to Formspree or your endpoint.
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="Heaviness check-in form">
      <div>
        <label htmlFor="heaviness" className="text-sm font-medium" style={{ color: 'var(--solace-stone-700)' }}>
          How heavy are you feeling? <span className="text-xs text-solace-stone-500">({score})</span>
        </label>

        <div className="mt-2">
          <input
            id="heaviness"
            type="range"
            min={1}
            max={10}
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
            className="w-full"
            aria-valuemin={1}
            aria-valuemax={10}
            aria-valuenow={score}
          />
        </div>
      </div>

      <div>
        <label htmlFor="note" className="text-sm font-medium" style={{ color: 'var(--solace-stone-700)' }}>
          Optional note
        </label>
        <textarea
          id="note"
          rows={3}
          placeholder="A short note for Rocher..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="mt-2 w-full rounded-md border p-2"
          style={{ borderColor: 'var(--solace-stone-300)', color: 'var(--solace-stone-700)' }}
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="px-4 py-2 rounded bg-solace-ray-500 text-white hover:bg-solace-ray-700"
          style={{ backgroundColor: 'var(--solace-ray-500)' }}
        >
          Send quietly
        </button>

        <div aria-live="polite" aria-atomic="true">
          {sent ? <span className="text-xl">💌</span> : null}
        </div>
      </div>
    </form>
  );
}
