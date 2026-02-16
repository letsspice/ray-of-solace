// src/utils/settings.ts
// Local-only settings for ray-of-solace.
// These control how gentle confirmations behave, which code-words are shown,
// and an optional theme that adjusts Stone & Light tokens.

export type ThemeMode = 'day' | 'night';

export interface AppSettings {
  showConfirmations: boolean;
  hiddenCodewords: string[];
  theme: ThemeMode;
  // Remember the last active code-word so the UI can feel
  // continuous across sessions.
  activeCodewordKey?: string | null;
}

const SETTINGS_KEY = 'ray-of-solace.settings.v1';

export const DEFAULT_SETTINGS: AppSettings = {
  showConfirmations: true,
  hiddenCodewords: [],
  theme: 'day',
  activeCodewordKey: null,
};

function safeParse(json: string | null): Partial<AppSettings> | null {
  if (!json) return null;
  try {
    return JSON.parse(json) as Partial<AppSettings>;
  } catch {
    return null;
  }
}

export function loadSettings(): AppSettings {
  if (typeof window === 'undefined') {
    return DEFAULT_SETTINGS;
  }

  const raw = window.localStorage.getItem(SETTINGS_KEY);
  const parsed = safeParse(raw);

  return {
    ...DEFAULT_SETTINGS,
    ...parsed,
    hiddenCodewords: parsed?.hiddenCodewords ?? DEFAULT_SETTINGS.hiddenCodewords,
  };
}

export function saveSettings(next: AppSettings): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
}

export function updateSettings(partial: Partial<AppSettings>): AppSettings {
  const current = loadSettings();
  const next: AppSettings = {
    ...current,
    ...partial,
  };
  saveSettings(next);
  return next;
}

export function applyTheme(theme: ThemeMode) {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.theme = theme;
}
