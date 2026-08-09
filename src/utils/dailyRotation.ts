// Deterministic picks for ordinary-day messages, shared by the app (getTodayMessage)
// and the cron email route, so both agree on whether "today" is a surprise day
// without needing to store any state.
import { DailyNote, regularDayMessages, surpriseDayMessages } from '../data/dailyMessages';

// Every month is split into this many windows, and exactly one day inside each
// window is deterministically picked as a surprise day - so every month gets
// exactly 4 well-spaced surprises rather than a lucky-or-unlucky random count.
const SURPRISE_WINDOWS_PER_MONTH = 4;

// 32-bit integer mixing (Murmur-style finalizer) - unlike hashing similar strings
// character-by-character, this avalanches well even for sequential inputs like
// consecutive chunk indices, so picks don't cluster within a month.
function mix32(input: number): number {
  let x = input;
  x = Math.imul(x ^ (x >>> 16), 0x45d9f3b);
  x = Math.imul(x ^ (x >>> 16), 0x45d9f3b);
  x = x ^ (x >>> 16);
  return x >>> 0;
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

function parseDateKey(dateKey: string): { year: number; month: number; day: number } {
  const [year, month, day] = dateKey.split('-').map(Number);
  return { year, month, day };
}

/** dateKey should be a "YYYY-MM-DD" string, in whichever timezone the caller cares about. */
export function isSurpriseDay(dateKey: string): boolean {
  const { year, month, day } = parseDateKey(dateKey);
  const totalDays = daysInMonth(year, month);
  const chunkSize = Math.ceil(totalDays / SURPRISE_WINDOWS_PER_MONTH);
  const chunkIndex = Math.floor((day - 1) / chunkSize);
  const chunkStart = chunkIndex * chunkSize + 1;
  const chunkEnd = Math.min(chunkStart + chunkSize - 1, totalDays);
  const chunkLength = chunkEnd - chunkStart + 1;

  const seed = mix32((Math.imul(year * 100 + month, 0x9e3779b1) ^ Math.imul(chunkIndex + 1, 0x85ebca6b)) >>> 0);
  const pickedDayInChunk = chunkStart + (seed % chunkLength);

  return day === pickedDayInChunk;
}

export function pickRegularMessage(dateKey: string): DailyNote {
  const { year, month, day } = parseDateKey(dateKey);
  const index = mix32(Math.imul(year * 372 + month * 31 + day, 0x27d4eb2f)) % regularDayMessages.length;
  return regularDayMessages[index];
}

export function pickSurpriseMessage(dateKey: string): DailyNote {
  const { year, month, day } = parseDateKey(dateKey);
  const index = mix32(Math.imul(year * 372 + month * 31 + day, 0x2545f491)) % surpriseDayMessages.length;
  return surpriseDayMessages[index];
}
