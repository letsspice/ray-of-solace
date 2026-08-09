import React from 'react';
import Link from 'next/link';
import DateMessage from '../components/DateMessage';
import HeavinessForm from '../components/HeavinessForm';
import SunMark, { phaseForWeight } from '../components/icons/SunMark';
import { getTodayMessage } from '../utils/getTodayMessage';
import { CODE_WORDS } from '../data/codeWords';

function greetingForHour(hour: number): string {
  if (hour < 5) return 'Still up, Ray?';
  if (hour < 12) return 'Good morning, Ray';
  if (hour < 17) return 'Good afternoon, Ray';
  if (hour < 21) return 'Good evening, Ray';
  return 'Winding down, Ray?';
}

export default function Page() {
  const todayMessage = getTodayMessage();
  const now = new Date();
  const greeting = greetingForHour(now.getHours());
  const formattedDate = now.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-8 lg:space-y-10">
      {/* Warm welcome hero */}
      <section className="solace-card relative overflow-hidden p-6 md:p-9">
        <div
          className="pointer-events-none absolute -right-14 -top-16 h-56 w-56 rounded-full opacity-50 blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--solace-ray-300), transparent 70%)' }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-16 left-1/3 h-40 w-40 rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--solace-rocher-300), transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-sm md:h-16 md:w-16"
            style={{
              background: 'linear-gradient(145deg, var(--solace-ray-300), var(--solace-ray-500))',
              color: 'var(--solace-ray-900)',
            }}
            aria-hidden="true"
          >
            <SunMark phase="radiant" size={30} />
          </div>
          <div>
            <p className="solace-eyebrow">{formattedDate}</p>
            <h1
              className="font-serifHeading text-3xl leading-tight tracking-tight md:text-[2.1rem]"
              style={{ color: 'var(--solace-stone-900)' }}
            >
              {greeting}
            </h1>
            <p className="mt-1.5 max-w-md text-sm leading-relaxed" style={{ color: 'var(--solace-stone-500)' }}>
              This little corner is always here, however you arrive today.
            </p>
          </div>
        </div>
      </section>

      <DateMessage todayMessage={todayMessage} />

      <section
        aria-labelledby="checkin-heading"
        className="grid items-stretch gap-6 lg:gap-8 xl:grid-cols-[minmax(0,1.28fr)_minmax(0,1fr)]"
      >
        <div className="flex flex-col">
          <h3
            id="checkin-heading"
            className="solace-eyebrow mb-1.5"
          >
            Today&apos;s check-in
          </h3>
          <p className="mb-4 text-xs" style={{ color: 'var(--solace-stone-500)' }}>
            A single, quiet moment to say how you&apos;re doing.
          </p>
          <HeavinessForm />
        </div>

        <aside className="flex flex-col">
          <h4 className="solace-eyebrow mb-1.5">
            Code-words & small signals
          </h4>
          <p className="mb-4 text-xs" style={{ color: 'var(--solace-stone-500)' }}>
            A shorthand for how close or far you feel, without needing to
            explain everything.
          </p>

          <div className="solace-card flex flex-1 flex-col gap-5 p-6">
            <div>
              <p className="text-sm" style={{ color: 'var(--solace-stone-700)' }}>
                Choose a code-word in the check-in form to send it quietly:
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {CODE_WORDS.map((cw) => (
                  <div
                    key={cw.key}
                    className="rounded-xl border p-3"
                    style={{ borderColor: 'var(--solace-stone-300)', backgroundColor: 'white' }}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="opacity-70" style={{ color: 'var(--solace-ray-700)' }}>
                        <SunMark phase={phaseForWeight(cw.weight)} size={13} />
                      </span>
                      <span className="text-sm font-serifHeading" style={{ color: 'var(--solace-stone-900)' }}>
                        {cw.label}
                      </span>
                    </div>
                    <p className="mt-1 text-xs" style={{ color: 'var(--solace-stone-500)' }}>
                      {cw.description}
                    </p>
                    <div className="mt-2 flex gap-0.5">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <span
                          key={i}
                          className="h-1 flex-1 rounded-full"
                          style={{
                            backgroundColor: i < cw.weight ? 'var(--solace-ray-500)' : 'var(--solace-stone-300)',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-xl p-4 text-sm leading-relaxed"
              style={{ backgroundColor: 'var(--solace-ray-100)', color: 'var(--solace-ray-900)' }}
            >
              <SunMark phase="soft" size={13} className="mb-1 inline-block" />
              <p>
                There&apos;s no wrong code-word to send. Even a quiet one still
                reaches me, and I&apos;ll meet you wherever you are.
              </p>
            </div>

            <div
              className="mt-auto border-t pt-3 text-xs"
              style={{ borderColor: 'var(--solace-stone-100)', color: 'var(--solace-stone-500)' }}
            >
              <p>Shortcuts</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Link
                  href="timeline"
                  className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solace-ray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-solace-bg"
                  style={{ color: 'var(--solace-stone-800)' }}
                >
                  View timeline
                </Link>
                <Link
                  href="settings"
                  className="inline-flex items-center rounded-full bg-solace-rocher-100 px-3 py-1 text-xs font-medium shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solace-ray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-solace-bg"
                  style={{ color: 'var(--solace-rocher-700)' }}
                >
                  Sanctuary settings
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <div className="solace-divider pb-2 pt-2 text-xs">
        <SunMark phase="soft" size={14} />
        <span className="solace-eyebrow" style={{ color: 'var(--solace-ray-700)' }}>
          a quiet place, always here
        </span>
        <SunMark phase="soft" size={14} />
      </div>
    </div>
  );
}
