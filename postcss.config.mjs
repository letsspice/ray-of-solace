// postcss.config.mjs
// Minimal PostCSS pipeline: Tailwind for utilities and Autoprefixer for cross-browser safety.
// Kept intentionally small so it's easy to reason about and extend later.

const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
