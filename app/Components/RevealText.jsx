"use client"
// Heading text whose words fade from a muted tint to full color as the reader
// scrolls. Wrap words in *asterisks* to set them in the italic serif accent
// (e.g. "What I can *do for you*").
import { useWordReveal } from '../hooks/useWordReveal';

const TONES = {
  light: {
    lit: 'text-dark dark:text-white',
    dim: 'text-dark/25 dark:text-white/25',
    accentLit: 'text-primary dark:text-secondary',
  },
  dark: {
    lit: 'text-white',
    dim: 'text-white/25',
    accentLit: 'text-secondary',
  },
};

// "Insights from *real projects*" -> [{ word, accent }]
function toWords(text = '') {
  return text.split('*').flatMap((part, i) =>
    part
      .split(' ')
      .filter(Boolean)
      .map((word) => ({ word, accent: i % 2 === 1 }))
  );
}

const RevealText = ({ text, as: Tag = 'h2', className = '', tone = 'light', start, span }) => {
  const { ref, progress } = useWordReveal({ start, span });
  const colors = TONES[tone] || TONES.light;
  const words = toWords(text);
  const litCount = Math.round(progress * words.length);

  return (
    <Tag ref={ref} className={className}>
      {words.map(({ word, accent }, i) => {
        const lit = i < litCount;
        const color = lit ? (accent ? colors.accentLit : colors.lit) : colors.dim;
        return (
          <span
            key={i}
            className={`transition-colors duration-300 ${accent ? 'font-display-serif tracking-normal' : ''} ${color}`}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </Tag>
  );
};

export default RevealText;
