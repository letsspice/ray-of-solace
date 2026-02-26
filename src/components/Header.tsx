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
    <header className="sticky top-0 z-50 w-full border-b border-solace-rocher-100/70 bg-white/75 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <div className="shell-container flex items-center justify-between py-3">
        {/* Brand section with refined logo */}
        <Link 
          href="/" 
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solace-ray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-solace-bg rounded-lg"
          aria-label="Ray of Solace - home"
        >
          <div
            className="flex items-center justify-center w-9 h-9 rounded-lg shadow-sm transition-all duration-300 ease-out group-hover:shadow-md group-hover:-translate-y-0.5 group-active:translate-y-0"
            style={{ backgroundColor: 'var(--solace-rocher-100)' }}
            aria-hidden="true"
          >
            <span
              className="text-sm font-medium tracking-wide transition-transform duration-300 group-hover:scale-110"
              style={{ color: 'var(--solace-rocher-700)' }}
            >
              𓂀
            </span>
          </div>

          <div className="flex flex-col">
            <h1
              className="text-[0.98rem] leading-tight font-serifHeading transition-colors duration-200 group-hover:text-solace-ray-700"
              style={{ fontFamily: 'var(--font-serif-heading)' }}
            >
              Ray of Solace
            </h1>
            <p
              className="text-[0.68rem] leading-tight transition-colors duration-200"
              style={{ color: 'var(--solace-stone-500)' }}
            >
              a calm place for two
            </p>
          </div>
        </Link>

        {/* Navigation with refined styling */}
        <nav
          aria-label="Primary"
          className="flex items-center gap-1 rounded-xl bg-white/85 backdrop-blur-sm p-1 shadow-sm border border-solace-stone-100/70"
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
                  relative px-3.5 py-1.5 text-sm font-medium rounded-lg
                  transition-all duration-200 ease-out
                  focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-solace-ray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-solace-bg
                  ${
                    isActive
                      ? 'bg-white shadow-sm'
                      : 'hover:bg-white/70 hover:shadow-sm active:bg-white/90'
                  }
                `}
                style={{
                  color: isActive
                    ? 'var(--solace-stone-900)'
                    : 'var(--solace-stone-600)',
                }}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
                {isActive && (
                  <span 
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-solace-ray-500"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}