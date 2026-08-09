// Small pure utils for finding today's message.
// Priority: a fixed calendar date in specialDates.ts, then a surprise-day note
// (~3-4 days a month), then the regular rotating pool for everyday days.
import { SpecialDate, specialDates } from '../data/specialDates';
import { isSurpriseDay, pickRegularMessage, pickSurpriseMessage } from './dailyRotation';

export function getTodayMessage(today = new Date()): SpecialDate {
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // months 0-indexed
  const dd = String(today.getDate()).padStart(2, '0');
  const key = `${mm}-${dd}`;
  const dateKey = `${today.getFullYear()}-${mm}-${dd}`;

  const found = specialDates.find((d) => d.date === key);
  if (found) return found;

  const note = isSurpriseDay(dateKey) ? pickSurpriseMessage(dateKey) : pickRegularMessage(dateKey);

  return {
    date: key,
    ...note,
  };
}
