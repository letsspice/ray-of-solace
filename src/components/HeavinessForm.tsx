'use client';

import React, { useEffect, useState } from 'react';
import CodeWordSelector, { CodeWord, CODE_WORDS } from './CodeWordSelector';
import { addTimelineEntry } from '../utils/timeline';
import { loadSettings, updateSettings } from '../utils/settings';

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
        let details = '';
        try {
          const json = await res.json();
          details = json?.error || JSON.stringify(json);
        } catch {
          details = await res.text();
        }
        throw new Error(`Formspree error: ${details || res.statusText}`);
      }

      addTimelineEntry({
        heaviness: snapshot.score,
        codeword: snapshot.selectedCode ? snapshot.selectedCode.key : undefined,
        message: snapshot.note || undefined,
      });

      setStatus('sent');
      setNote('');
      setScore(5);

      setTimeout(() => setStatus('idle'), 2500);
    } catch (err: unknown) {
      console.error(err);
      setStatus('error');
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Unknown error');
      }
    }
  }

  // Get weight description for current score
  const getWeightDescription = (value: number): string => {
    if (value <= 3) return "feather-light";
    if (value <= 6) return "noticeable";
    if (value <= 8) return "substantial";
    return "overwhelming";
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-6 p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-solace-stone-100/80 shadow-md smooth-fade"
      aria-label="Heaviness check-in form"
    >
      {/* Score Section with Visual Indicator */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label 
            htmlFor="heaviness" 
            className="text-sm font-medium"
            style={{ color: 'var(--solace-stone-700)' }}
          >
            How heavy are you feeling?
          </label>
          <div className="flex items-center gap-2">
            <span 
              className="text-2xl font-serifHeading"
                style={{ color: 'var(--solace-ray-700)' }}
            >
              {score}
            </span>
            <span 
              className="text-xs px-2 py-1 rounded-full"
              style={{ 
                backgroundColor: 'var(--solace-ray-100)',
                  color: 'var(--solace-ray-900)'
              }}
            >
              {getWeightDescription(score)}
            </span>
          </div>
        </div>

        <div className="relative pt-2 pb-1">
          <input
            id="heaviness"
            type="range"
            min={1}
            max={10}
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
            className="w-full h-2 bg-solace-stone-100 rounded-lg appearance-none cursor-pointer accent-solace-ray-500"
            style={{
              background: `linear-gradient(to right, var(--solace-ray-300) 0%, var(--solace-ray-500) ${(score - 1) * 11.11}%, var(--solace-stone-300) ${(score - 1) * 11.11}%, var(--solace-stone-300) 100%)`
            }}
            aria-valuemin={1}
            aria-valuemax={10}
            aria-valuenow={score}
            aria-valuetext={`${score} out of 10, ${getWeightDescription(score)}`}
          />
          
          {/* Tick marks */}
          <div className="flex justify-between px-1 mt-1">
            {[1, 3, 5, 7, 9, 10].map((mark) => (
              <span 
                key={mark}
                className="text-[0.6rem]"
                style={{ color: 'var(--solace-stone-400)' }}
              >
                {mark}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Note Section with Enhanced Textarea */}
      <div className="space-y-2">
        <label 
          htmlFor="note" 
          className="text-sm font-medium flex items-center gap-2"
          style={{ color: 'var(--solace-stone-700)' }}
        >
          <span>Optional note</span>
          <span className="text-xs font-normal" style={{ color: 'var(--solace-stone-500)' }}>
            (for Rocher)
          </span>
        </label>
        
        <div className="relative">
          <textarea
            id="note"
            rows={3}
            placeholder="Write a quiet note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full rounded-xl border px-4 py-3 text-sm transition-all duration-200 resize-none
                     focus:border-solace-ray-500 focus:ring-2 focus:ring-solace-ray-500/20 focus:ring-offset-2 
                     focus:ring-offset-solace-bg placeholder:text-solace-stone-400"
            style={{ 
              borderColor: 'var(--solace-stone-300)',
              color: 'var(--solace-stone-700)',
              backgroundColor: 'white'
            }}
          />
          {note && (
            <div 
              className="absolute bottom-2 right-2 text-xs px-2 py-1 rounded-full"
              style={{ 
                backgroundColor: 'var(--solace-ray-100)',
                color: 'var(--solace-ray-700)'
              }}
            >
              {note.length} characters
            </div>
          )}
        </div>
      </div>

      {/* Code Word Selector with Elegant Wrapper */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium" style={{ color: 'var(--solace-stone-700)' }}>
            Choose a code-word
          </label>
          <span className="text-xs" style={{ color: 'var(--solace-stone-500)' }}>
            (optional)
          </span>
        </div>

        <CodeWordSelector
          selected={selectedCode?.key ?? null}
          onChange={handleCodeWordChange}
        />
      </div>

      {/* Submit Section with Refined Feedback */}
      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="group relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300
                     hover:shadow-lg active:shadow-md disabled:opacity-70 disabled:cursor-not-allowed
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solace-ray-500 
                     focus-visible:ring-offset-2 focus-visible:ring-offset-solace-bg"
          style={{
            background: 'linear-gradient(135deg, var(--solace-ray-500), var(--solace-rocher-500))',
            color: 'white',
          }}
        >
          <span className="relative z-10 flex items-center gap-2">
            {status === 'sending' ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Sending quietly...</span>
              </>
            ) : (
              <>
                <span>Send quietly</span>
                <span className="text-lg opacity-70 group-hover:translate-x-0.5 transition-transform">→</span>
              </>
            )}
          </span>
        </button>

        <div aria-live="polite" aria-atomic="true" className="min-h-[2rem]">
          {status === 'sent' && showConfirmations && (
            <div className="flex items-center gap-2 animate-fade-in">
              <span className="text-2xl" role="img" aria-label="sent">💌</span>
              <span className="text-sm" style={{ color: 'var(--solace-ray-700)' }}>
                Sent with care
              </span>
            </div>
          )}
          
          {status === 'error' && (
            <div className="flex items-center gap-2" role="alert">
              <span className="text-lg" style={{ color: 'var(--muted-violet)' }}>🕯️</span>
              <span className="text-sm" style={{ color: 'var(--muted-violet)' }}>
                {errorMessage ?? 'Try again gently'}
              </span>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}