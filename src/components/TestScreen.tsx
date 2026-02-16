// src/components/TestScreen.tsx
// Single-screen "lab" for the ray-of-solace design system – checks type, color, spacing, and responsiveness quickly.
// Kept self-contained and presentational so it's safe to iterate on without affecting core flows.
// Semantics and aria are explicit to keep this usable as a real screen while you experiment.

'use client';

import React, { useState } from 'react';

type Intensity = 'Soft' | 'Supportive' | 'Heavy';

interface DateCardProps {
  title: string;
  message: string;
  intensity: Intensity;
}

interface HeavinessFormProps {
  onSubmitted: () => void;
}

const intensityStyles: Record<Intensity, string> = {
  Soft: 'bg-solace-ray-100 text-solace-ray-700',
  Supportive: 'bg-solace-softTeal/10 text-solace-softTeal',
  Heavy: 'bg-solace-mutedViolet/10 text-solace-mutedViolet',
};

/**
 * DateCard is a semantic snapshot of "today" – it demonstrates hierarchy,
 * badge treatments, and copy rhythm without any app-specific logic.
 */
const DateCard: React.FC<DateCardProps> = ({ title, message, intensity }) => {
  const badgeClass = intensityStyles[intensity];

  return (
    <section
      aria-label="Today's emotional weather"
      className="smooth-fade rounded-xl bg-white/80 p-5 shadow-sm ring-1 ring-solace-stone-100"
    >
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-solace-stone-500">
            Today
          </p>
          <h2 className="mt-1 font-serifHeading text-lg font-semibold tracking-tight text-solace-stone-900">
            {title}
          </h2>
        </div>
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${badgeClass}`}
        >
          {/* Badge text leans on tone color to communicate intensity at a glance. */}
          {intensity} intensity
        </span>
      </header>
      <p className="mt-3 text-sm leading-relaxed text-solace-stone-700">
        {message}
      </p>
    </section>
  );
};

/**
 * HeavinessForm is a small, low-stakes form: range + textarea.
 * aria-live feedback is subtle (emoji-only) to confirm action without adding noise.
 */
const HeavinessForm: React.FC<HeavinessFormProps> = ({ onSubmitted }) => {
  const [level, setLevel] = useState<number>(3);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    onSubmitted();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLevel(Number(event.target.value));
    setSubmitted(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-5 space-y-4 rounded-xl bg-solace-bg/70 p-4 ring-1 ring-solace-stone-100"
    >
      <div className="flex items-center justify-between gap-4">
        <label
          htmlFor="heaviness"
          className="text-sm font-medium text-solace-stone-800"
        >
          How heavy does today feel?
        </label>
        <span className="inline-flex items-baseline gap-1 text-xs text-solace-stone-500">
          <span className="font-medium text-solace-stone-800">{level}</span>
          /10
        </span>
      </div>

      <input
        id="heaviness"
        name="heaviness"
        type="range"
        min={1}
        max={10}
        value={level}
        onChange={handleChange}
        className="mt-1 w-full accent-solace-ray-500"
        aria-valuemin={1}
        aria-valuemax={10}
        aria-valuenow={level}
      />

      <div>
        <label
          htmlFor="heaviness-notes"
          className="text-sm font-medium text-solace-stone-800"
        >
          Leave a quiet note
        </label>
        <p className="mt-1 text-xs text-solace-stone-500">
          No one else sees this. Write exactly what you need to release.
        </p>
        <textarea
          id="heaviness-notes"
          name="heaviness-notes"
          aria-label="Private reflection about how today feels"
          placeholder="For a moment I noticed..."
          className="mt-2 block h-28 w-full rounded-lg border-solace-stone-100 bg-white/90 text-sm text-solace-stone-900 placeholder:text-solace-stone-400 focus:border-solace-ray-500 focus:ring-solace-ray-500"
        />
      </div>

      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-solace-ray-500 px-4 py-2 text-sm font-medium text-solace-stone-900 shadow-sm transition hover:bg-solace-ray-300 focus-visible:translate-y-[0.5px]"
        >
          {/* Button copy stays gentle; no "send" anxiety. */}
          Send quietly
        </button>
        <p
          aria-live="polite"
          className="min-h-[1.25rem] text-right text-base"
        >
          {submitted ? '✨' : ''}
        </p>
      </div>
    </form>
  );
};

interface CodeWord {
  label: string;
  weight: number;
}

/**
 * CodeWordSelector uses real <button>s so keyboard interaction is built-in.
 * The weight bar is intentionally small and abstract to avoid judgmental visuals.
 */
const CodeWordSelector: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const codeWords: CodeWord[] = [
    { label: 'Moss', weight: 3 },
    { label: 'Velvet', weight: 5 },
    { label: 'Turtle', weight: 7 },
    { label: 'Nebula', weight: 9 },
  ];

  return (
    <section
      aria-labelledby="codeword-heading"
      className="rounded-xl bg-white/80 p-4 shadow-sm ring-1 ring-solace-stone-100"
    >
      <header className="flex items-baseline justify-between gap-4">
        <div>
          <h2
            id="codeword-heading"
            className="font-serifHeading text-sm font-semibold tracking-tight text-solace-stone-900"
          >
            Quiet code words
          </h2>
          <p className="mt-1 text-xs text-solace-stone-500">
            Pick a word that feels close to today. There&apos;s no wrong choice.
          </p>
        </div>
      </header>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-2">
        {codeWords.map((codeWord) => {
          const isActive = selected === codeWord.label;
          return (
            <button
              key={codeWord.label}
              type="button"
              onClick={() => setSelected(codeWord.label)}
              className={`smooth-fade flex flex-col items-start gap-2 rounded-lg border px-3 py-2 text-left text-xs transition ${
                isActive
                  ? 'border-solace-ray-500 bg-solace-ray-100/60 text-solace-stone-900'
                  : 'border-solace-stone-100 bg-solace-bg/70 text-solace-stone-700 hover:border-solace-stone-300'
              }`}
              aria-pressed={isActive}
            >
              <span className="font-medium text-solace-stone-900">
                {codeWord.label}
              </span>
              <div className="flex w-full items-center justify-between gap-2">
                <span className="text-[11px] text-solace-stone-500">
                  Weight {codeWord.weight}/10
                </span>
                <div className="flex items-center gap-[2px]">
                  {/* Small bar of filled circles to suggest weight without numeric pressure. */}
                  {Array.from({ length: 10 }).map((_, index) => {
                    const filled = index < codeWord.weight;
                    return (
                      <span
                        key={index}
                        className={`h-1.5 w-1.5 rounded-full ${
                          filled
                            ? 'bg-solace-rocher-500'
                            : 'bg-solace-stone-100'
                        }`}
                        aria-hidden="true"
                      />
                    );
                  })}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selected && (
        <p className="mt-3 text-xs text-solace-stone-600">
          You&apos;re sitting with{' '}
          <span className="font-medium text-solace-rocher-700">
            {selected.toLowerCase()}
          </span>{' '}
          today.
        </p>
      )}
    </section>
  );
};

/**
 * PaletteSwatches exposes a small, intentional subset of tokens so you can
 * visually validate how Stone, Ray, Rocher, and supportive colors interact.
 */
const PaletteSwatches: React.FC = () => {
  const swatches = [
    {
      name: 'solace-bg',
      description: 'Base surface',
      className: 'bg-solace-bg',
    },
    {
      name: 'stone-700',
      description: 'Primary text',
      className: 'bg-solace-stone-700',
    },
    {
      name: 'ray-300',
      description: 'Soft accent fill',
      className: 'bg-solace-ray-300',
    },
    {
      name: 'rocher-700',
      description: 'Grounded card',
      className: 'bg-solace-rocher-700',
    },
    {
      name: 'softTeal',
      description: 'Supportive calm',
      className: 'bg-solace-softTeal',
    },
    {
      name: 'mutedViolet',
      description: 'Reflective heavy',
      className: 'bg-solace-mutedViolet',
    },
  ];

  return (
    <section
      aria-labelledby="palette-heading"
      className="rounded-xl bg-solace-bg/80 p-4 ring-1 ring-solace-stone-100"
    >
      <header className="flex items-baseline justify-between gap-4">
        <div>
          <h2
            id="palette-heading"
            className="font-serifHeading text-sm font-semibold tracking-tight text-solace-stone-900"
          >
            Palette swatches
          </h2>
          <p className="mt-1 text-xs text-solace-stone-500">
            Key tokens to test contrast and mood on real text.
          </p>
        </div>
      </header>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {swatches.map((swatch) => (
          <div
            key={swatch.name}
            className="space-y-1 rounded-lg border border-solace-stone-100 bg-white/70 p-2"
          >
            <div
              className={`h-8 rounded-md ${swatch.className}`}
              aria-hidden="true"
            />
            <p className="text-xs font-medium text-solace-stone-800">
              {swatch.name}
            </p>
            <p className="text-[11px] text-solace-stone-500">
              {swatch.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

/**
 * TestScreen ties everything together: header, card, form, code words, and palette.
 * Layout is mobile-first, becoming a two-column centered card on larger screens.
 */
const TestScreen: React.FC = () => {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  return (
    <main className="space-y-6 md:space-y-8 lg:space-y-10">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Simple logo placeholder: circle with initials. Marked decorative for screen readers. */}
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-solace-rocher-500 text-sm font-semibold text-white shadow-sm"
          >
            RS
          </span>
          <div>
            <h1 className="font-serifHeading text-xl font-semibold tracking-tight text-solace-stone-900 md:text-2xl">
              ray-of-solace
            </h1>
            <p className="mt-1 text-sm text-solace-stone-500">
              A calm little test screen to feel how the interface holds you.
            </p>
          </div>
        </div>
        <span className="hidden text-xs text-solace-stone-400 md:inline">
          Design system sandbox
        </span>
      </header>

      <section
        aria-label="Design test card"
        className="smooth-fade mx-auto mt-1 max-w-4xl rounded-2xl bg-white/80 p-5 shadow-sm ring-1 ring-solace-stone-100 md:p-6 lg:p-7"
      >
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start">
          <div className="space-y-4 md:space-y-5">
            <DateCard
              title="A softer kind of Sunday"
              message="Things feel a little heavier than they look from the outside, but you are still here, still breathing. This space is only for noticing."
              intensity={hasSubmitted ? 'Supportive' : 'Soft'}
            />
            <HeavinessForm onSubmitted={() => setHasSubmitted(true)} />
          </div>

          <div className="space-y-4 md:space-y-5">
            <CodeWordSelector />
            <PaletteSwatches />
          </div>
        </div>
      </section>
    </main>
  );
};

export default TestScreen;
