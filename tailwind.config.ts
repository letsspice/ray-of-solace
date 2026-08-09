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
          bg: '#FDF9F2',

          // Grounding neutral scale. 500–900 for text, 100–300 for borders and subtle fills.
          stone: {
            100: '#F6F3EE',
            300: '#DDD4C8',
            500: '#8A7D6D',
            700: '#4A3F34',
            900: '#241D16',
          },

          // "Ray" is the gentle golden-hour highlight/accent. Use 100–300 for fills, 500 for
          // key accents, and 700+ very sparingly for strong emphasis or critical focus states.
          ray: {
            100: '#FDF0CC',
            300: '#F9D986',
            500: '#E3A021',
            700: '#A3620F',
            900: '#6B3D09',
          },

          // Rocher is a deep, earthy neutral for grounded elements (cards, headers, rails)
          // when you need more weight than stone but still want warmth.
          rocher: {
            100: '#F7EFE6',
            300: '#DCBFA4',
            500: '#A97A56',
            700: '#6F4A34',
            900: '#3B271C',
          },

          // Ember carries the weight of heavier moments while staying inside the warm
          // family — a resting, held feeling rather than an alarming one.
          ember: {
            300: '#E3B3A0',
            500: '#BD6F56',
            700: '#834938',
          },

          // Supportive accent used sparingly for quiet contrast.
          softTeal: '#5FB3B3',
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
