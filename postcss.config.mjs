// postcss.config.mjs
// Tailwind CSS v4 uses the dedicated `@tailwindcss/postcss` plugin instead of `tailwindcss` directly.
// This keeps the setup compatible with Turbopack while still handling necessary PostCSS work under the hood.

const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
