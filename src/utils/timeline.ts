// src/utils/timeline.ts
// Local-only timeline storage for ray-of-solace.
// Phase A: everything lives in window.localStorage so the app can remember
// check-ins and selected code-words without any backend or analytics.

export interface TimelineEntry {
  id: string;
  timestamp: string; // ISO string so it can be sorted and displayed
  heaviness?: number;
  codeword?: string;
  message?: string;
}

const STORAGE_KEY = 'ray-of-solace.timeline.v1';

function safeParse(json: string | null): TimelineEntry[] {
  if (!json) return [];
  try {
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) return [];
    return parsed as TimelineEntry[];
  } catch {
    return [];
  }
}

export function loadTimeline(): TimelineEntry[] {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return safeParse(raw);
}

export function saveTimeline(entries: TimelineEntry[]): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function addTimelineEntry(partial: Omit<TimelineEntry, 'id' | 'timestamp'> & {
  timestamp?: string;
}): TimelineEntry {
  const timestamp = partial.timestamp ?? new Date().toISOString();
  const id = `${timestamp}-${Math.random().toString(36).slice(2, 8)}`;

  const entry: TimelineEntry = {
    id,
    timestamp,
    heaviness: partial.heaviness,
    codeword: partial.codeword,
    message: partial.message,
  };

  const current = loadTimeline();
  current.push(entry);
  saveTimeline(current);

  return entry;
}

export function clearTimeline(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
}
