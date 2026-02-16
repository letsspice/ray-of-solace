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
  noteForDesigner?: string; // small extra copy that references Rachael as a designer (optional)
}

/**
 * The list below is intentionally small and hand-crafted.
 * Keep messages short, human, and emotionally supportive.
 */
export const specialDates: SpecialDate[] = [
  // Deep Support Days
  {
    date: '03-08',
    title: "International Women's Day",
    subtitle: 'Acknowledging strength',
    message:
      "Ray — today feels like a quiet standing ovation for all the invisible work you do. Take the day gentle; I'll be here for the small things.",
    intensity: 'supportive',
    suggestion: "If you want, let's pick a cozy corner (your call — cafe, backyard, or a slow walk).",
    noteForDesigner:
      "Hey Rach — a little nod to your designer brain: your steady craft inspires me every day.",
  },
  {
    date: '09-30',
    title: 'National Love People Day',
    subtitle: 'Unconditional kindness',
    message:
      "A very small reminder: you are loved on purpose, not by accident. No expectations today — only presence.",
    intensity: 'soft',
    suggestion: "I'll handle the small chores today. Maybe we'll celebrate later with a favourite snack.",
  },
  {
    date: '10-07',
    title: 'National Inner Beauty Day',
    subtitle: 'Celebrating who you are inside',
    message:
      "Your light is the one I look for when the room feels noisy. Today I see the person behind the pixels and prototypes.",
    intensity: 'supportive',
    suggestion: "If you like, we can make a slow playlist and just be nearby.",
    noteForDesigner:
      "If a tiny product design anecdote comforts you: your simplest microcopy choices have changed more user flows than you probably realize — me included.",
  },

  // Romantic & Fun Days
  {
    date: '05-01',
    title: 'Global Love Day',
    subtitle: 'Mid-year appreciation',
    message:
      "Mid-year pause: you're my teammate. Small dinner tonight? I’ll cook — or we order your favourite.",
    intensity: 'celebratory',
    suggestion: "Low-key date night: wine/tea, candles, no screens.",
  },
  {
    date: '08-01',
    title: 'National Girlfriend Day',
    subtitle: "Your day (do as you please)",
    message:
      "Happy Girlfriend Day. Today is yours to spend as you please — pick anything and I’ll make it happen.",
    intensity: 'celebratory',
    suggestion: "Want a proper date? Or quiet company at a local spot? Your pick.",
  },
  {
    date: '08-18',
    title: 'National Couples Day',
    subtitle: 'Partners in the small things',
    message:
      "A gentle note: today I notice how we do life together — messy, hopeful, imperfect, and real. Thanks for being my person.",
    intensity: 'soft',
    suggestion: "A goofy playlist and cheap takeout?",
  },
  {
    date: '10-14',
    title: 'National I Love You Day',
    subtitle: 'Say it or show it',
    message:
      "I love you. Three words, same meaning every time. No tasks, no expectations — just this.",
    intensity: 'celebratory',
    suggestion: "A handwritten note tucked somewhere you’ll find it.",
  },
  {
    date: '10-17',
    title: 'Sweetest Day',
    subtitle: 'Little sweetness',
    message:
      "Little acts, small candies, tiny surprises. Today is a reminder that small sweetness goes a long way.",
    intensity: 'celebratory',
    suggestion: "I'll hide a small treat for you somewhere silly.",
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
    "No special date today — just a calm space. If you feel heavy, tap 'Send quietly' and I'll get the note without pressuring a conversation.",
  intensity: 'soft' as Intensity,
  suggestion: "You're seen. Take your time.",
};
