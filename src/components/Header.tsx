'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SunMark from './icons/SunMark';

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/timeline', label: 'Timeline' },
    { href: '/settings', label: 'Settings' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-solace-ray-300/30 bg-white/75 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <div className="shell-container flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Brand section */}
        <Link
          href="/"
          className="group flex items-center gap-3 self-start rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solace-ray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-solace-bg"
          aria-label="Ray of Solace - home"
        >
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl shadow-sm transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:shadow-md group-active:translate-y-0"
            style={{
              background: 'linear-gradient(145deg, var(--solace-ray-300), var(--solace-ray-500))',
              color: 'var(--solace-ray-900)',
            }}
          >
            <SunMark phase="radiant" size={18} title="Ray of Solace" />
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
              a warm little sanctuary, just for two
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav
          aria-label="Primary"
          className="flex items-center gap-1 self-stretch rounded-xl border border-solace-stone-100/70 bg-white/85 p-1 shadow-sm backdrop-blur-sm sm:self-auto"
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
                  relative flex-1 rounded-lg px-3.5 py-1.5 text-center text-sm font-medium
                  transition-all duration-200 ease-out sm:flex-none
                  focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-solace-ray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-solace-bg
                  ${
                    isActive
                      ? 'bg-solace-ray-100 shadow-sm'
                      : 'hover:bg-white/70 hover:shadow-sm active:bg-white/90'
                  }
                `}
                style={{
                  color: isActive
                    ? 'var(--solace-ray-900)'
                    : 'var(--solace-stone-600)',
                }}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-solace-ray-500"
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
