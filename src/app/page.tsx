// src/app/page.tsx
// Minimal App Router entry: wraps the TestScreen in the shared app-container shell.
// This keeps layout concerns (max-width, side padding) centralized and re-usable.

import TestScreen from '@/components/TestScreen';

export default function Home() {
  return (
    <div className="app-container">
      <TestScreen />
    </div>
  );
}

