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
      "Ray - I missed the exact day but not the meaning behind it. I appreciate you deeply, and I hope this lands as warmth today.",
    intensity: 'supportive',
    suggestion: 'No pressure - just receive this as a quiet reminder that you are seen and loved.',
    noteForDesigner:
      'Designer note - the care you put into your work and the way you notice the small things is something I admire every day.',
  },

  // Deep Support Days
  {
    date: '03-08',
    title: "International Women's Day",
    subtitle: 'Acknowledging strength',
    message:
      "Ray - today I’m thinking about the quiet strength you carry. You show up for your work, your ideas, and the people you care about in such a steady way. I notice it more than I say, and I’m proud of you.",
    intensity: 'supportive',
    suggestion: "Later today we’re doing that lunch at your favourite place - good food, good conversation, and a moment to slow down together. See you at 11!",
    noteForDesigner:
      "Designer note - the way you think through details and care about the people using what you design is rare. Watching you work is honestly one of my favourite things.",
  },
  {
    date: '09-30',
    title: 'National Love People Day',
    subtitle: 'Unconditional kindness',
    message:
      "Quick reminder today - I'm choosing you on purpose. No performance, just real care.",
    intensity: 'soft',
    suggestion: "Let me take care of the small errands so you have space to breathe; later we can share something you love.",
  },
  {
    date: '10-07',
    title: 'National Inner Beauty Day',
    subtitle: 'Celebrating who you are inside',
    message:
      "Even when Nairobi gets noisy, your quiet steadiness stands out. Today I'm celebrating the person you are beneath the surface.",
    intensity: 'supportive',
    suggestion: "If you're in the mood: a soft playlist, order in, and an evening to rest without needing to explain anything.",
    noteForDesigner:
      "Designer note - your layouts and microcopy actually make people's days easier. That thoughtfulness matters and it shows.",
  },

  // Romantic & Fun Days
  {
    date: '05-01',
    title: 'Global Love Day',
    subtitle: 'Mid-year appreciation',
    message:
      "Mid-year check-in - thank you for being my person. Ordinary life with you feels steady and good, and I love that.",
    intensity: 'celebratory',
    suggestion: "Low-key date night - I can cook, or we order in and watch something light. Your call.",
  },
  {
    date: '08-01',
    title: 'National Girlfriend Day',
    subtitle: "Your day (do as you please)",
    message:
      "Happy Girlfriend Day, babe. Today is yours - tell me what would make you happy and I'm all in.",
    intensity: 'celebratory',
    suggestion: "We can do brunch, a proper date, or just hang at your favourite spot. Whatever you want.",
  },
  {
    date: '08-18',
    title: 'National Couples Day',
    subtitle: 'Partners in the small things',
    message:
      "Today I'm appreciating the real stuff - the laughs, the hard bits, and the way we keep showing up. Thanks for choosing us.",
    intensity: 'soft',
    suggestion: "How about a silly playlist, takeaway, and no heavy talks - just some peace and goofiness.",
  },
  {
    date: '10-14',
    title: 'National I Love You Day',
    subtitle: 'Say it or show it',
    message:
      "I love you - clear and steady. No theatrics, just truth.",
    intensity: 'celebratory',
    suggestion: "I'll leave you a handwritten note somewhere you'll find it when you least expect it.",
  },
  {
    date: '10-17',
    title: 'Sweetest Day',
    subtitle: 'Little sweetness',
    message:
      "Today is for small sweetness - tiny gestures that mean a lot. I want to make you smile in a quiet way.",
    intensity: 'celebratory',
    suggestion: "I'll hide a small treat somewhere and make you do a tiny treasure hunt for it.",
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
    "No special date today - just a calm note to say I'm here. If you feel heavy, tap 'Send quietly' and I'll reach out gently without pressure.",
  intensity: 'soft' as Intensity,
  suggestion: "You are seen. Take your time.",
};