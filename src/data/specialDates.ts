// Central source of truth for special dates and messages.
// Use "MM-DD" string format for recurring yearly dates.
export type Intensity = 'soft' | 'supportive' | 'celebratory' | 'heavy';

export interface SpecialDate {
  date: string; // "MM-DD"
  title: string;
  subtitle?: string;
  message: string;
  intensity: Intensity;
  suggestion?: string; // optional low-pressure idea for the day
  noteForDesigner?: string; // small extra copy that references Rayael as a designer (optional)
}

/**
 * The list below is intentionally small and hand-crafted.
 * Keep messages short, human, and emotionally supportive.
 */
export const specialDates: SpecialDate[] = [
  {
    date: '03-03',
    title: 'Belated note for March 1 💛',
    subtitle: 'A little late, still very intentional',
    message:
      "Ray - this is a belated March 1 note from me. I missed the exact day, but not the meaning behind it. I appreciate you deeply, and I hope this still lands with warmth today.",
    intensity: 'supportive',
    suggestion: 'No pressure today - just receive this as a soft reminder that you are loved and seen.',
    noteForDesigner:
      'Designer note - your work and your heart both carry intention, and I admire the way you show up in both.',
  },

  // Deep Support Days
  {
    date: '03-08',
    title: "International Women's Day",
    subtitle: 'Acknowledging strength',
    message:
      "Ray - leo I am thinking about the quiet strength you carry every day. You show up for work as an amazing designer, for people, and for your dreams, and I see all of it.",
    intensity: 'supportive',
    suggestion: "If you want, we can do something easy after work - maybe a simple hot tea and mandazi, a slow walk, or just a quiet evening indoors.",
    noteForDesigner:
      "Hello Ray - your designer mind is sharp and thoughtful. The way you care about users and details is rare, and I admire it deeply.",
  },
  {
    date: '09-30',
    title: 'National Love People Day',
    subtitle: 'Unconditional kindness',
    message:
      "Quick reminder for today - you are loved intentionally, not by luck. No pressure, no performance, just real care.",
    intensity: 'soft',
    suggestion: "I can handle the small errands today so you can breathe - then later we can share some fried kuku or your favourite snack.",
  },
  {
    date: '10-07',
    title: 'National Inner Beauty Day',
    subtitle: 'Celebrating who you are inside',
    message:
      "Even when life in Nairobi gets noisy, your calm heart still stands out. Today I am celebrating who you are beyond work and beyond every deadline.",
    intensity: 'supportive',
    suggestion: "If you are up for it, we can put on a soft playlist, order in, and just rest without overthinking anything.",
    noteForDesigner:
      "Designer note - your clean layouts and thoughtful microcopy make products easier for real people. That care is a gift, and it shows.",
  },

  // Romantic & Fun Days
  {
    date: '05-01',
    title: 'Global Love Day',
    subtitle: 'Mid-year appreciation',
    message:
      "Mid-year check-in - thank you for being my person and my teammate. I love how we do ordinary life together.",
    intensity: 'celebratory',
    suggestion: "Low-key date night - I can cook, or we order and watch something light with no stress.",
  },
  {
    date: '08-01',
    title: 'National Girlfriend Day',
    subtitle: "Your day (do as you please)",
    message:
      "Happy Girlfriend Day, babe. Today is yours - pick what would make you happy and I am fully in.",
    intensity: 'celebratory',
    suggestion: "We can do a proper date, brunch, or just chill at your favourite local spot - your call.",
  },
  {
    date: '08-18',
    title: 'National Couples Day',
    subtitle: 'Partners in the small things',
    message:
      "Today I am appreciating our real life - the laughs, the hard days, the growth, all of it. Thank you for choosing us.",
    intensity: 'soft',
    suggestion: "How about a goofy playlist, takeaway, and no serious conversations tonight - just peace.",
  },
  {
    date: '10-14',
    title: 'National I Love You Day',
    subtitle: 'Say it or show it',
    message:
      "I love you - clearly, confidently, and without conditions. No extra speech, just truth.",
    intensity: 'celebratory',
    suggestion: "I will leave you a handwritten note somewhere you will find when you least expect it.",
  },
  {
    date: '10-17',
    title: 'Sweetest Day',
    subtitle: 'Little sweetness',
    message:
      "Today is about small sweetness - little effort, genuine affection, and making you smile in simple ways.",
    intensity: 'celebratory',
    suggestion: "I will hide a small treat for you somewhere random and make you work for it just a little.",
  },
];

/**
 * Default messages structure for ordinary days.
 * This is what shows when today is NOT a special date.
 * Keep it gentle and open-ended.
 */
export const defaultDayMessage = {
  title: "Hello, Ray",
  message:
    "No special date today - just a calm space. If you feel heavy, tap 'Send quietly' and I will get the note without pressuring a conversation.",
  intensity: 'soft' as Intensity,
  suggestion: "You are seen. Take your time.",
};
