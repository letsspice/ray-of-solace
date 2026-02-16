// Small pure utils for finding today's special date (recurring yearly).
import { SpecialDate, specialDates, defaultDayMessage } from '../data/specialDates';

/**
 * Returns the SpecialDate that matches today (MM-DD).
 * If none matched, returns the defaultDayMessage as a SpecialDate-like object.
 */
export function getTodayMessage(today = new Date()): SpecialDate {
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // months 0-indexed
  const dd = String(today.getDate()).padStart(2, '0');
  const key = `${mm}-${dd}`;

  const found = specialDates.find((d) => d.date === key);
  if (found) return found;

  // Convert default to SpecialDate shape
  return {
    date: key,
    title: defaultDayMessage.title,
    message: defaultDayMessage.message,
    intensity: defaultDayMessage.intensity,
    suggestion: defaultDayMessage.suggestion,
  };
}
