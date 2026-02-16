'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/timeline', label: 'Timeline' },
    { href: '/settings', label: 'Settings' },
  ];

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

        <nav
          aria-label="Primary"
          className="flex items-center gap-1 rounded-xl bg-white/40 backdrop-blur-sm px-1 py-1 shadow-sm"
        >
          {navItems.map(item => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  relative px-3 py-1.5 text-sm rounded-lg
                  transition-all duration-200
                  focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-solace-stone-400
                  ${
                    isActive
                      ? 'bg-white shadow-sm'
                      : 'hover:bg-white/70'
                  }
                `}
                style={{
                  color: isActive
                    ? 'var(--solace-stone-900)'
                    : 'var(--solace-stone-700)',
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
