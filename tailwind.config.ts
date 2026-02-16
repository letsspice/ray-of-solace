// tailwind.config.ts
// Tailwind design system for "ray-of-solace" – keeps tokens small, named, and intentional.
// Stone & Light palette emphasizes calm, breathable surfaces across light/dark modes.
// Colors are grouped under `solace` so utilities like `bg-solace-bg` carry product meaning, not just hex values.

import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          lg: '2rem',
        },
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      fontFamily: {
        // Serif headings feel intimate and literary; body stays utilitarian with Inter.
        serifHeading: ['Instrument Serif', 'Merriweather', 'Georgia', 'serif'],
        ui: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // `solace` scopes app-specific colors so semantic utilities remain coherent.
        solace: {
          // Primary page background – soft and warm to keep the canvas calm.
          bg: '#F9F8F6',

          // Grounding neutral scale. 500–900 for text, 100–300 for borders and subtle fills.
          stone: {
            100: '#F5F5F4',
            300: '#D6D3D1',
            500: '#78716C', // mid reference for most body text on light backgrounds
            700: '#44403C',
            900: '#1C1917',
          },

          // "Ray" is the gentle highlight/accent. Use 100–300 for fills, 500 for key accents,
          // and 700+ very sparingly for strong emphasis or critical focus states.
          ray: {
            100: '#FEF9C3',
            300: '#FDE68A',
            500: '#EAB308',
            700: '#A16207',
            900: '#713F12',
          },

          // Rocher is a deep, earthy neutral for grounded elements (cards, headers, rails)
          // when you need more weight than stone but still want warmth.
          rocher: {
            100: '#F5F1EB',
            300: '#D3BCA7',
            500: '#A47A5E',
            700: '#6C4A3C',
            900: '#3E2723',
          },

          // Supportive hues for subtle states, tags, or mood hints.
          // Keep them as accents so the primary Stone & Ray relationship stays dominant.
          softTeal: '#5FB3B3',
          mutedViolet: '#8B7AAE',
        },
      },
    },
  },
  plugins: [
    // Forms + Typography keep defaults sane and consistent for inputs and prose.
    forms,
    typography,
  ],
};

export default config;
