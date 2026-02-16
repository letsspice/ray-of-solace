import React from 'react';

export default function SettingsPage() {
  return (
    <main className="mt-6">
      <h1 className="font-serifHeading text-xl mb-4" style={{ color: 'var(--solace-stone-900)' }}>
        Settings
      </h1>

      <section className="rounded-2xl bg-white/60 p-4 shadow-sm space-y-4">
        <p className="text-sm" style={{ color: 'var(--solace-stone-700)' }}>
          This is a simple settings scaffold. For now, the page documents future personalisation:
        </p>

        <ul className="text-sm list-disc ml-4" style={{ color: 'var(--solace-stone-700)' }}>
          <li>Toggle quiet confirmations</li>
          <li>Manage code-words</li>
          <li>Export or clear local history</li>
        </ul>
      </section>
    </main>
  );
}
