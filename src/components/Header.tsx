'use client';

import React from 'react';
import Link from 'next/link';

/**
 * Header with simple logo and primary nav.
 * Uses Next.js <Link> for client navigation (App Router).
 * Visuals intentionally minimal and accessible.
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
            <span
              className="text-sm font-semibold"
              style={{ color: 'var(--solace-rocher-700)' }}
            >
              RS
            </span>
          </div>

          <div>
            <div
              className="text-sm font-serifHeading"
              style={{ fontFamily: 'var(--font-serif-heading)' }}
            >
              Ray of Solace
            </div>
            <div
              className="text-xs"
              style={{ color: 'var(--solace-stone-500)' }}
            >
              a calm place for two
            </div>
          </div>
        </div>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-4">
          {/* These are real routes in the App Router */}
          <Link className="text-sm" href="/">
            <span style={{ color: 'var(--solace-stone-700)' }}>Home</span>
          </Link>
          <Link className="text-sm" href="/timeline">
            <span style={{ color: 'var(--solace-stone-700)' }}>Timeline</span>
          </Link>
          <Link className="text-sm" href="/settings">
            <span style={{ color: 'var(--solace-stone-700)' }}>Settings</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
