"use client"
// Intro manifesto right after the hero: a large focus statement that lights
// up word by word on scroll, with floating skill tags around it.
import { useEffect, useRef, useState } from 'react';
import RevealText from './RevealText';

// Desktop (xl+) placement for the six tags: three on each side.
const TAG_LAYOUT = [
  { side: 'left', top: '4%', inset: '1%', rotate: -4, duration: 6.5, delay: 0 },
  { side: 'left', top: '42%', inset: '5%', rotate: 3, duration: 7.5, delay: 1.2 },
  { side: 'left', top: '80%', inset: '0%', rotate: -2, duration: 6, delay: 0.6 },
  { side: 'right', top: '4%', inset: '1%', rotate: 4, duration: 7, delay: 0.9 },
  { side: 'right', top: '42%', inset: '5%', rotate: -3, duration: 6.2, delay: 0.3 },
  { side: 'right', top: '80%', inset: '0%', rotate: 2, duration: 7.8, delay: 1.5 },
];

const MOBILE_ROTATIONS = [-2, 2, -1, 2, -2, 1];

// Brand tones cycle across the tag icons: black, charcoal, tan.
const CHIP_TONES = [
  'bg-dark text-secondary',
  'bg-primary text-white',
  'bg-secondary text-dark',
];

// Heroicons (outline, 24px) paths.
const ICON_PATHS = {
  sparkles:
    'M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z',
  search: 'm21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z',
  code: 'M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5',
  chart:
    'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z',
  chat:
    'M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z',
  terminal:
    'm6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z',
};

function TagIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d={ICON_PATHS[name] || ICON_PATHS.sparkles} />
    </svg>
  );
}

function Tag({ label, icon, index }) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full bg-white dark:bg-darkHover pl-1.5 pr-4 py-1.5 text-sm font-medium text-dark dark:text-gray-100 whitespace-nowrap border border-gray-200/80 dark:border-white/10 shadow-[0_10px_30px_-14px_rgba(0,0,0,0.35)]">
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${CHIP_TONES[index % CHIP_TONES.length]}`}>
        <TagIcon name={icon} />
      </span>
      {label}
    </span>
  );
}

const FocusStatement = ({ content }) => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const tags = content.tags || [];

  // Tags slide in once the section enters the viewport (immediately for
  // visitors who prefer reduced motion).
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="focus"
      ref={sectionRef}
      className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-[8%] py-24 md:py-32 bg-white dark:bg-darkTheme scroll-mt-20"
    >
      <div className="relative max-w-7xl mx-auto xl:min-h-[420px] flex flex-col items-center justify-center">
        {/* Floating tags, desktop */}
        {tags.slice(0, TAG_LAYOUT.length).map((tag, i) => {
          const pos = TAG_LAYOUT[i];
          const fromX = pos.side === 'left' ? -40 : 40;
          return (
            <div
              key={tag.label}
              className="hidden xl:block absolute z-0 transition-all duration-700 ease-out"
              style={{
                top: pos.top,
                [pos.side]: pos.inset,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateX(0)' : `translateX(${fromX}px)`,
                transitionDelay: `${i * 90}ms`,
              }}
            >
              <div
                className="focus-tag-float"
                style={{ animationDuration: `${pos.duration}s`, animationDelay: `${pos.delay}s` }}
              >
                <div
                  className="transition-transform duration-300 ease-out hover:!rotate-0 hover:scale-105"
                  style={{ transform: `rotate(${pos.rotate}deg)` }}
                >
                  <Tag {...tag} index={i} />
                </div>
              </div>
            </div>
          );
        })}

        {/* Statement */}
        <div className="relative z-10 max-w-3xl xl:max-w-[620px] 2xl:max-w-[700px] text-center">
          <RevealText
            text={content.statement}
            className="text-[1.85rem] leading-[1.2] sm:text-4xl md:text-[2.5rem] md:leading-[1.18] font-semibold tracking-tight"
          />
        </div>

        {/* Tags, mobile and tablet */}
        <ul className="xl:hidden mt-12 flex flex-wrap justify-center gap-x-3 gap-y-4 max-w-2xl" aria-label="Focus areas">
          {tags.map((tag, i) => (
            <li
              key={tag.label}
              className="transition-all duration-700 ease-out"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView
                  ? `rotate(${MOBILE_ROTATIONS[i % MOBILE_ROTATIONS.length]}deg)`
                  : 'translateY(16px)',
                transitionDelay: `${i * 70}ms`,
              }}
            >
              <Tag {...tag} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FocusStatement;
