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
    <div className="space-y-8">
      <DateMessage todayMessage={todayMessage} />

      <section
        aria-labelledby="checkin-heading"
        className="grid gap-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-start"
      >
        <div>
          <h3
            id="checkin-heading"
            className="text-sm font-semibold mb-1 tracking-tight uppercase tracking-[0.12em] text-[0.7rem]"
            style={{ color: 'var(--solace-stone-900)' }}
          >
            Today&apos;s check-in
          </h3>
          <p
            className="text-xs mb-3"
            style={{ color: 'var(--solace-stone-500)' }}
          >
            A single, quiet moment to say how you&apos;re doing.
          </p>
          <div className="rounded-2xl border border-solace-rocher-100 bg-white/80 p-5 shadow-md smooth-fade transition-transform duration-200 ease-out transform hover:-translate-y-[2px] hover:shadow-lg">
            <HeavinessForm />
          </div>
        </div>

        <aside>
          <h4
            className="text-sm font-semibold mb-1 tracking-tight uppercase tracking-[0.12em] text-[0.7rem]"
            style={{ color: 'var(--solace-stone-900)' }}
          >
            Code-words & small signals
          </h4>
          <p
            className="text-xs mb-3"
            style={{ color: 'var(--solace-stone-500)' }}
          >
            A shorthand for how close or far you feel, without
            needing to explain everything.
          </p>

          <div className="rounded-2xl border border-solace-rocher-100 bg-white/80 p-5 shadow-md space-y-3 smooth-fade transition-transform duration-200 ease-out transform hover:-translate-y-[2px] hover:shadow-lg">
            {/* Placeholder: interactive codeword selector to be implemented */}
            <div
              className="text-sm text-solace-stone-700"
              style={{ color: 'var(--solace-stone-700)' }}
            >
              <div className="text-sm">
                <p>Choose a code-word to send:</p>
              </div>
              <ul className="mt-2 space-y-1 text-xs">
                <li>
                  <span className="inline-flex items-center gap-1 rounded-full bg-solace-rocher-100/80 px-2 py-0.5">
                    <span className="font-medium">Moss</span>
                    <span className="text-[0.7rem]" style={{ color: 'var(--solace-stone-600)' }}>
                      soft, resting
                    </span>
                  </span>
                </li>
                <li>
                  <span className="inline-flex items-center gap-1 rounded-full bg-solace-rocher-100/80 px-2 py-0.5">
                    <span className="font-medium">Velvet</span>
                    <span className="text-[0.7rem]" style={{ color: 'var(--solace-stone-600)' }}>
                      soft and quiet
                    </span>
                  </span>
                </li>
                <li>
                  <span className="inline-flex items-center gap-1 rounded-full bg-solace-rocher-100/80 px-2 py-0.5">
                    <span className="font-medium">Turtle</span>
                    <span className="text-[0.7rem]" style={{ color: 'var(--solace-stone-600)' }}>
                      pulling into shell
                    </span>
                  </span>
                </li>
                <li>
                  <span className="inline-flex items-center gap-1 rounded-full bg-solace-rocher-100/80 px-2 py-0.5">
                    <span className="font-medium">Nebula</span>
                    <span className="text-[0.7rem]" style={{ color: 'var(--solace-stone-600)' }}>
                      clouded, distant
                    </span>
                  </span>
                </li>
              </ul>
              <p className="mt-2 text-xs text-solace-stone-500">
                (The picker on the left uses these, this space is a
                little legend.)
              </p>
            </div>

            <div
              className="mt-3 border-t border-solace-stone-100 pt-3 text-xs text-solace-stone-500"
              style={{ color: 'var(--solace-stone-500)' }}
            >
              <p>
                Shortcuts
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <a
                  href="timeline"
                  className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solace-ray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-solace-bg"
                  style={{ color: 'var(--solace-stone-800)' }}
                >
                  View timeline
                </a>
                <a
                  href="settings"
                  className="inline-flex items-center rounded-full bg-solace-rocher-100 px-3 py-1 text-xs font-medium shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solace-ray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-solace-bg"
                  style={{ color: 'var(--solace-rocher-700)' }}
                >
                  Sanctuary settings
                </a>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
