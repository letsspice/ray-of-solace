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
    date: '02-13',
    title: "Galentine's Day",
    subtitle: 'A day for the women who hold you up',
    message:
      "Ray - before tomorrow gets loud, I wanted today to be just about you: not as my girlfriend, but as the whole person who was already doing great things before I showed up in the story.",
    intensity: 'supportive',
    suggestion: 'Text one of your girls something appreciative today - coffee is on me if you two link up.',
  },
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
    date: '05-01',
    title: 'Global Love Day',
    subtitle: 'Mid-year appreciation',
    message:
      "Mid-year check-in - thank you for being my person. Ordinary life with you feels steady and good, and I love that.",
    intensity: 'celebratory',
    suggestion: "Low-key date night - I can cook, or we order in and watch something light. Your call.",
  },
  {
    date: '05-28',
    title: 'Menstrual Hygiene Day',
    subtitle: 'A quieter kind of care',
    message:
      "Ray - today's less about a big gesture and more about the small ones. If you're sore, tired, or just want to be left alone for a bit, that's completely fine with me - dinner and the errands are handled, no questions asked.",
    intensity: 'soft',
    suggestion: "Hot water bottle's charged and your comfort snacks are already in the house. Just say the word.",
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
      "Ray - today's for the unglamorous parts of us: reheated dinners, tired check-ins, the arguments we actually finish instead of leaving hanging. I'd pick all of it again.",
    intensity: 'soft',
    suggestion: "Takeaway, a dumb movie, zero deep conversations required - just us being normal together.",
  },
  {
    date: '08-26',
    title: "Women's Equality Day",
    subtitle: 'The independence you never apologize for',
    message:
      "Ray - I don't say this enough: I love that you have your own opinions, your own money, your own plans, and you don't shrink any of it for me. That's not something I take for granted.",
    intensity: 'supportive',
    suggestion: "Whatever you already had planned today, I'm not changing it - just tell me if you want company or space.",
  },
  {
    date: '09-25',
    title: 'Wangari Maathai Day',
    subtitle: 'Kenyan women who plant things that outlast them',
    message:
      "Ray - today Kenya remembers Wangari Maathai, and it got me thinking about the kind of steady, patient work you do too - the stuff that doesn't get applause but changes things anyway. I notice it.",
    intensity: 'supportive',
    suggestion: "Maybe we plant something today, literally - even a small pot on the balcony counts.",
  },
  {
    date: '09-30',
    title: 'National Love People Day',
    subtitle: 'Unconditional kindness',
    message:
      "Ray - no occasion needed for this one, but since today's asking: I'd still pick you on a random Tuesday, with zero reason left to impress you. That's the part I like best.",
    intensity: 'soft',
    suggestion: "I've got the errands today - just tell me what's on the list and consider it handled.",
  },
  {
    date: '10-07',
    title: 'National Inner Beauty Day',
    subtitle: 'Celebrating who you are inside',
    message:
      "Ray - you're patient with people who don't deserve it, honest even when it costs you something, and kind in ways nobody's tracking but me. That's the version of you I'm celebrating today.",
    intensity: 'supportive',
    suggestion: "No plans required tonight - a soft playlist, food that isn't yours to cook, and permission to just exist.",
    noteForDesigner:
      "Designer note - the way you think through the tiny details in your work is the same way you think through people. It's rare, and it shows.",
  },
  {
    date: '10-11',
    title: 'International Day of the Girl Child',
    subtitle: 'The girl who became exactly who she wanted to be',
    message:
      "Ray - I think about the little girl you used to be sometimes, the one who had no idea she'd turn into someone this capable and this loved. I hope she'd be proud of where you ended up.",
    intensity: 'celebratory',
    suggestion: 'Show me an old photo of you as a kid tonight - I want to hear the story behind it.',
  },

  // Romantic & Fun Days
  {
    date: '10-14',
    title: 'National I Love You Day',
    subtitle: 'Say it or show it',
    message:
      "I love you. Not as a performance for today, just as a fact that's still true on the ordinary days too.",
    intensity: 'celebratory',
    suggestion: "I'll hide a handwritten note somewhere you'll find it when you're not expecting it.",
  },
  {
    date: '10-17',
    title: 'Sweetest Day',
    subtitle: 'Little sweetness',
    message:
      "Ray - no big theme today, just an excuse to do something small and slightly ridiculous to make you smile before you've even had coffee.",
    intensity: 'celebratory',
    suggestion: "There's a small treat hidden somewhere in the house - consider this your one clue.",
  },
];
