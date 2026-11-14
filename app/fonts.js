// Display fonts used by the editorial section headings. Each exposes a CSS
// variable (set on <body> in layout.js); globals.css maps them to the
// .font-eyebrow and .font-display-serif classes.
import { Anton, Instrument_Serif, Space_Mono } from 'next/font/google';

export const eyebrowMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-eyebrow',
  display: 'swap',
});

export const displaySerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['italic'],
  variable: '--font-display-serif',
  display: 'swap',
});

// Tall condensed face, used only for the outlined name in the footer.
export const displayCondensed = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display-condensed',
  display: 'swap',
});

export const fontVariables = `${eyebrowMono.variable} ${displaySerif.variable} ${displayCondensed.variable}`;
