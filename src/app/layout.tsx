import './globals.css';
import React from 'react';
import Header from '../components/Header';

export const metadata = {
  title: 'Ray of Solace',
  description: 'A calm place for two — Ray & Rocher',
};

/**
 * Root layout: includes the header and a main area that centers content using .app-container.
 * Keep this minimal: allows all pages to share the same shell and styles.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="app-container">{children}</main>
      </body>
    </html>
  );
}
