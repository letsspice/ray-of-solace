import React from 'react';
import DateMessage from '../components/DateMessage';
import HeavinessForm from '../components/HeavinessForm';
import { getTodayMessage } from '../utils/getTodayMessage';

/**
 * The main entry page — the initial screen users see.
 * Layout:
 *  - Mobile: stacked (DateMessage -> HeavinessForm -> Codewords area)
 *  - md: two-column with form and codewords beside the message
 *
 * For now, CodeWords UI is represented as a placeholder area (we'll add an interactive version later).
 */

export default function Page() {
  const todayMessage = getTodayMessage();

  return (
    <div className="space-y-6">
      <DateMessage todayMessage={todayMessage} />

      <section aria-labelledby="checkin-heading" className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 id="checkin-heading" className="text-sm font-semibold mb-3" style={{ color: 'var(--solace-stone-900)' }}>
            Quick check-in
          </h3>
          <div className="rounded-2xl bg-white/60 p-4 shadow-sm">
            <HeavinessForm />
          </div>
        </div>

        <aside>
          <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--solace-stone-900)' }}>
            Code-words & small signals
          </h4>

          <div className="rounded-2xl bg-white/60 p-4 shadow-sm space-y-3">
            {/* Placeholder: interactive codeword selector to be implemented */}
            <div className="text-sm text-solace-stone-700" style={{ color: 'var(--solace-stone-700)' }}>
              <p>
                Choose a code-word to send: <strong>Moss</strong>, <strong>Velvet</strong>, <strong>Turtle</strong>,{' '}
                <strong>Nebula</strong>.
              </p>
              <p className="mt-2 text-xs text-solace-stone-500">
                (Interactive picker coming next — for now this area documents the options.)
              </p>
            </div>

            <div className="mt-3 border-t pt-3 text-xs text-solace-stone-500" style={{ color: 'var(--solace-stone-500)' }}>
              <p>
                Other links:
                <span className="ml-2">
                  <a className="underline" href="timeline">
                    Timeline
                  </a>{' '}
                  •{' '}
                  <a className="underline" href="settings">
                    Settings
                  </a>
                </span>
              </p>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
