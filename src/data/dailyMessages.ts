// Messages shown on days that aren't one of the fixed dates in specialDates.ts.
// Two pools, picked deterministically per calendar day (see utils/dailyRotation.ts):
//   - regularDayMessages: the everyday, low-key notes shown most days.
//   - surpriseDayMessages: a warmer, unannounced note shown on ~3-4 days a month,
//     paired with a nudge email so Ray knows to come check the app.
import type { Intensity } from './specialDates';

export interface DailyNote {
  title: string;
  subtitle?: string;
  message: string;
  intensity: Intensity;
  suggestion?: string;
}

export const regularDayMessages: DailyNote[] = [
  {
    title: 'Hello, Ray',
    message:
      "No special date today - just a calm note to say I'm here. If you feel heavy, tap 'Send quietly' and I'll reach out gently, no pressure.",
    intensity: 'soft',
    suggestion: 'You are seen. Take your time.',
  },
  {
    title: 'Still here',
    message:
      "Nothing's marked on the calendar today, but I wanted you to know I'm still thinking of you in the background, even on the quiet ordinary ones.",
    intensity: 'soft',
    suggestion: "No response needed - this one's just a small wave hello.",
  },
  {
    title: 'Just checking in',
    message:
      "Today doesn't need to be anything special for me to check on you. However you're doing right now is completely fine by me.",
    intensity: 'soft',
    suggestion: "If today's heavy, send a code-word instead of explaining - I'll understand.",
  },
  {
    title: 'No agenda today',
    message:
      "Ray - today's just an ordinary kind of day, and that's exactly why I wanted to leave you something here. You don't need an occasion to be appreciated.",
    intensity: 'soft',
    suggestion: "Rate today however you want on the check-in - even 'fine' counts.",
  },
  {
    title: 'A small hello',
    message:
      "Some days don't come with a reason, they're just days I'm glad you're in. Today's one of those.",
    intensity: 'soft',
    suggestion: "No pressure to reply - this one's just for you to read.",
  },
  {
    title: 'Nothing urgent',
    message:
      "This isn't a special day, just me making sure you know this app - and I - are here whenever you need either.",
    intensity: 'soft',
    suggestion: 'Take your time with the check-in, or skip it. Both are okay.',
  },
];

export const surpriseDayMessages: DailyNote[] = [
  {
    title: 'A little surprise for you',
    subtitle: 'No occasion, just because',
    message:
      "Ray - there's no anniversary or reason for this one. I just felt like today deserved something extra, so here it is: I'm ridiculously lucky to have you, and I don't only say that on the marked dates.",
    intensity: 'celebratory',
    suggestion: 'Consider this a free pass to do absolutely nothing productive today.',
  },
  {
    title: 'Just because',
    subtitle: 'A random-day love note',
    message:
      "Nothing's being celebrated today except the fact that I randomly thought of you and smiled like an idiot mid-afternoon. So, hi.",
    intensity: 'celebratory',
    suggestion: "Send me your most ridiculous meme today - I'll drop everything to laugh at it.",
  },
  {
    title: 'Unscheduled appreciation',
    subtitle: 'This one snuck up on both of us',
    message:
      "Ray - I didn't plan this one, it's not on any calendar. I just wanted you to open the app to something unexpectedly kind for once.",
    intensity: 'supportive',
    suggestion: 'Treat yourself to something small today, on me - just tell me what.',
  },
  {
    title: 'A note that found its way to you',
    subtitle: 'Purely coincidental, entirely sincere',
    message:
      "No special reason today, other than wanting you to have proof, in writing, that you're loved on the days nobody's counting too.",
    intensity: 'celebratory',
    suggestion: 'Zero suggestions today - just soak this one in.',
  },
];
