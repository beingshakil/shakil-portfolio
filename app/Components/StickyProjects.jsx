"use client"

import { useState } from 'react';
import Link from 'next/link';

// Solid, fully-opaque dark slate/navy shades — every card covers the one
// beneath it completely. Slight progression keeps stacked edges distinct.
const CARD_BG = [
  '#13212E', // darkest — first card
  '#1A3040', // dark
  '#21384A', // dark slate
  '#284455', // slate
  '#2C4A5A', // primaryDark — last card
];

// Fixed header height; cards pin just below it.
const PIN_TOP = 84;
// Each card pins a few px lower than the last, leaving a visible sliver of
// the card beneath so the stack reads as a deck.
const STAGGER = 14;

/**
 * Sticky-stacking project showcase.
 *
 * The cards are direct sticky siblings (no per-card spacer wrappers). Each card
 * has its own min-height, which is what supplies the scroll distance: while an
 * earlier card stays pinned at the top, you scroll through the next card's
 * min-height before it reaches the pin point and slides up to *cover* the
 * pinned card. Incrementing z-index guarantees later cards paint on top.
 */
const StickyProjects = ({ projects = [], exploreHref = '/work' }) => {
  const cards = projects.slice(0, 5);
  const total = cards.length;

  // Tracks which card images failed to load, so we can show a branded
  // placeholder instead of the browser's broken-image icon.
  const [failed, setFailed] = useState({});

  return (
    <section id="sticky-work" className="bg-light dark:bg-dark">

      {/* ── Section header ─────────────────────────────── */}
      <div className="px-4 sm:px-6 lg:px-[8%] pt-20 pb-12 text-center">
        <p className="text-lg font-ovo text-primary mb-2">Featured Work</p>
        <h2 className="text-4xl md:text-5xl font-bold text-dark dark:text-light mb-4">
          Projects That Stand Out
        </h2>
        <div className="w-20 h-1 bg-primary mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
          Scroll through a curated selection of my best work — each card stacks over the last.
        </p>
      </div>

      {/* ── Sticky card stack ──────────────────────────── */}
      <div className="px-4 sm:px-6 lg:px-[8%]">
        <div className="max-w-7xl mx-auto">
          {cards.map((project, index) => {
            const bg = CARD_BG[index % CARD_BG.length];
            const counter = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

            return (
              /* The card itself is the sticky element. min-height gives the
                 scroll room; pb spaces cards while scrolling between them. */
              <div
                key={project.slug || index}
                className="sticky pb-6 lg:pb-8"
                style={{ top: `${PIN_TOP + index * STAGGER}px`, zIndex: 10 + index }}
              >
                <div
                  className="rounded-[2rem] overflow-hidden shadow-2xl"
                  style={{ backgroundColor: bg }}
                >
                  {/* 2-column body */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[60vh]">

                    {/* Left — text content */}
                    <div className="p-8 sm:p-10 lg:p-14 flex flex-col justify-center gap-5 order-2 lg:order-1">

                      {/* Top-left counter */}
                      <span className="text-xs font-bold tracking-[0.25em] text-secondary/70">
                        {counter}
                      </span>

                      {/* Category label */}
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary">
                        {project.featuredLabel || project.category || project.badge}
                      </span>

                      {/* Project title */}
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-light leading-[1.1]">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-light/65 text-sm sm:text-base leading-relaxed max-w-md">
                        {project.content}
                      </p>

                      {/* Feature pill tags */}
                      <div className="flex flex-wrap gap-2">
                        {(project.features || []).map((feat, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full text-[11px] font-semibold border border-secondary/35 text-secondary"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>

                      {/* View Project CTA */}
                      <div className="pt-1">
                        <a
                          href={project.link || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-secondary/50 text-secondary text-sm font-semibold transition-all duration-300 hover:bg-secondary hover:text-dark hover:border-secondary group"
                        >
                          View Project
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      </div>
                    </div>

                    {/* Right — project image */}
                    {/* h-64/sm:h-72 gives explicit height on mobile (single-col);
                        lg:h-auto lets the grid row height take over so the
                        absolute image fills the positioned parent. */}
                    <div className="relative order-1 lg:order-2 h-64 sm:h-72 lg:h-auto overflow-hidden">
                      {failed[index] ? (
                        /* Branded placeholder shown when the image is missing/broken */
                        <div
                          className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6"
                          style={{ background: `linear-gradient(135deg, ${bg} 0%, #2C4A5A 100%)` }}
                        >
                          <span className="flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/15 border border-secondary/30 text-secondary text-2xl font-bold">
                            {(project.title || '?').trim().charAt(0).toUpperCase()}
                          </span>
                          <span className="text-light/80 text-sm font-semibold">{project.title}</span>
                          <span className="text-light/35 text-[11px] uppercase tracking-[0.2em]">Preview coming soon</span>
                        </div>
                      ) : (
                        <>
                          <img
                            src={project.bgImage}
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                            onError={() => setFailed((f) => ({ ...f, [index]: true }))}
                          />
                          {/* Subtle inner gradient to blend image into the card on desktop */}
                          <div
                            className="absolute inset-0 hidden lg:block"
                            style={{ background: `linear-gradient(to right, ${bg}cc 0%, transparent 30%)` }}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>{/* /max-w-7xl */}
      </div>

      {/* ── Bottom CTA ─────────────────────────────────── */}
      <div className="py-20 text-center">
        <Link
          href={exploreHref}
          className="inline-flex items-center gap-3 text-dark dark:text-light font-bold text-lg transition-all duration-300 group hover:text-primary dark:hover:text-primary"
        >
          Explore All Projects
          <span
            className="text-xl text-primary transition-transform duration-300 group-hover:translate-x-2"
            aria-hidden="true"
          >
            →
          </span>
        </Link>
      </div>

    </section>
  );
};

export default StickyProjects;
