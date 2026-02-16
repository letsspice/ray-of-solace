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
    <header className="w-full py-4 border-b border-solace-rocher-100/70 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="app-container flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-full shadow-sm transition-transform duration-200 ease-out hover:-translate-y-[1px] hover:shadow-md"
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
          className="flex items-center gap-1 rounded-xl bg-white/70 backdrop-blur-sm px-1 py-1 shadow-sm border border-solace-stone-100/80 transition-shadow duration-200 ease-out hover:shadow-md"
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
                  transition-all duration-200 ease-out transform
                  focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-solace-ray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-solace-bg
                  ${
                    isActive
                      ? 'bg-white shadow-sm'
                      : 'hover:bg-white/80 hover:-translate-y-[1px] hover:shadow-sm'
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
