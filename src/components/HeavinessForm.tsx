
'use client';

import React, { useEffect, useState } from 'react';
import CodeWordSelector, { CodeWord, CODE_WORDS } from './CodeWordSelector';
import { addTimelineEntry } from '../utils/timeline';
import { loadSettings, updateSettings } from '../utils/settings';

/**
 * HeavinessForm wired to Formspree.
 * - Sends JSON to your Formspree endpoint.
 * - Includes codeword selection, score (1-10), optional note, and timestamp.
 * - Accessible status messaging using aria-live.
 */

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mgedowaj';

export default function HeavinessForm() {
  const [score, setScore] = useState<number>(5);
  const [note, setNote] = useState('');
  const [selectedCode, setSelectedCode] = useState<CodeWord | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showConfirmations, setShowConfirmations] = useState<boolean>(true);

  useEffect(() => {
    const settings = loadSettings();
    setShowConfirmations(settings.showConfirmations);
     if (settings.activeCodewordKey) {
       const existing = CODE_WORDS.find((cw) => cw.key === settings.activeCodewordKey);
       if (existing) {
         setSelectedCode(existing);
       }
     }
  }, []);

  function handleCodeWordChange(cw: CodeWord) {
    // Simply update the chosen code-word; we only log to the
    // timeline once the full check-in is submitted so a single
    // entry represents this moment. We do persist the active
    // selection so it feels like a default language next time.
    setSelectedCode(cw);
    updateSettings({ activeCodewordKey: cw.key });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage(null);

    const snapshot = {
      score,
      note,
      selectedCode,
    };

    const payload = {
      timestamp: new Date().toISOString(),
      heaviness: snapshot.score,
      note: snapshot.note || undefined,
      codeword: snapshot.selectedCode ? snapshot.selectedCode.key : undefined,
      codeword_label: snapshot.selectedCode ? snapshot.selectedCode.label : undefined,
      codeword_weight: snapshot.selectedCode ? snapshot.selectedCode.weight : undefined,
      source: 'ray-of-solace-web',
    };

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // Attempt to read JSON message
        let details = '';
        try {
          const json = await res.json();
          details = json?.error || JSON.stringify(json);
        } catch {
          details = await res.text();
        }
        throw new Error(`Formspree error: ${details || res.statusText}`);
      }

      // On successful send, also persist a local timeline entry so the
      // check-in appears in the in-app memory view.
      addTimelineEntry({
        heaviness: snapshot.score,
        codeword: snapshot.selectedCode ? snapshot.selectedCode.key : undefined,
        message: snapshot.note || undefined,
      });

      setStatus('sent');
      setNote('');
      setScore(5);

      // Auto-reset the "sent" state to idle after a small delay while keeping the
      // aria-live message visible for screen readers.
      setTimeout(() => setStatus('idle'), 2500);
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err?.message ?? 'Unknown error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="Heaviness check-in form">
      <div>
        <label htmlFor="heaviness" className="text-sm font-medium" style={{ color: 'var(--solace-stone-700)' }}>
          How heavy are you feeling? <span className="text-xs" style={{ color: 'var(--solace-stone-500)' }}>({score})</span>
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

      <div>
        <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--solace-stone-700)' }}>
          Pick a code-word (optional)
        </label>

        <div>
          <CodeWordSelector
            selected={selectedCode?.key ?? null}
            onChange={handleCodeWordChange}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="px-4 py-2 rounded"
          style={{
            backgroundColor: 'var(--solace-ray-500)',
            color: 'white',
          }}
        >
          {status === 'sending' ? 'Sending…' : 'Send quietly'}
        </button>

        <div aria-live="polite" aria-atomic="true" className="min-h-[1.25rem]">
          {status === 'sent' && showConfirmations && (
            <span className="text-xl" aria-hidden>
              💌
            </span>
          )}
          {status === 'error' && (
            <span className="text-sm" role="alert" style={{ color: 'var(--muted-violet)' }}>
              Error sending — {errorMessage ?? 'Try again'}
            </span>
          )}
        </div>
      </div>
    </form>
  );
}
