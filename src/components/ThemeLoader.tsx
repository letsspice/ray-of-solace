'use client';

import { useEffect } from 'react';
import { loadSettings, applyTheme } from '@/utils/settings';

/**
 * ThemeLoader applies the stored theme as soon as the app hydrates.
 * This keeps the Stone & Light tokens in sync with the user&apos;s
 * &quot;day&quot;/&quot;night&quot; preference across all routes.
 */
export default function ThemeLoader() {
  useEffect(() => {
    const settings = loadSettings();
    applyTheme(settings.theme);
  }, []);

  return null;
}
