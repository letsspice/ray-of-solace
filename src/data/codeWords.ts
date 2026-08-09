// Central source of truth for code-words, shared by both server and client components.
// Keeping this out of a 'use client' file lets server components (e.g. the home page)
// read the list without crossing the RSC boundary.

export type CodeWord = {
  key: string;
  label: string;
  weight: number; // 1 - 10
  description?: string;
};

export const CODE_WORDS: CodeWord[] = [
  { key: 'moss', label: 'Moss', weight: 2, description: 'soft, resting' },
  { key: 'velvet', label: 'Velvet', weight: 4, description: 'soft and quiet' },
  { key: 'turtle', label: 'Turtle', weight: 7, description: 'pulling into shell' },
  { key: 'nebula', label: 'Nebula', weight: 9, description: 'clouded, distant' },
];
