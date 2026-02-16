'use client';

import React from 'react';

/**
 * Header with simple logo and placeholder nav.
 * The logo is intentionally minimal: a small circle with initials and the product name.
 * Nav links are placeholders for now and non-functional — they show structure for future pages.
 */

export default function Header() {
  return (
    <header className="w-full py-4">
      <div className="app-container flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-full"
            style={{ backgroundColor: 'var(--solace-rocher-100)' }}
            aria-hidden="true"
          >
            <span className="text-sm font-semibold" style={{ color: 'var(--solace-rocher-700)' }}>
              RS
            </span>
          </div>

          <div>
            <div className="text-sm font-serifHeading" style={{ fontFamily: 'var(--font-serif-heading)' }}>
              Ray of Solace
            </div>
            <div className="text-xs text-solace-stone-500" style={{ color: 'var(--solace-stone-500)' }}>
              a calm place for two
            </div>
          </div>
        </div>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-4">
          <a className="text-sm text-solace-stone-700 hover:underline" href="#">
            Home
          </a>
          <a className="text-sm text-solace-stone-700 hover:underline" href="#">
            Timeline
          </a>
          <a className="text-sm text-solace-stone-700 hover:underline" href="#">
            Settings
          </a>
        </nav>
      </div>
    </header>
  );
}
