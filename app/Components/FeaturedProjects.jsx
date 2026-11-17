"use client"
// Featured projects carousel: snap-scrolling cards that bleed off the right
// edge so the next project peeks in. Arrows + counter in the header, a
// progress line underneath, swipe on touch and arrow keys on the track.
import { useCallback, useEffect, useRef, useState } from 'react';
import SectionHeading, { ArrowLink } from './SectionHeading';

const DEFAULT_HEADING = {
  eyebrow: 'Featured work',
  heading: 'Selected systems that made SEO and reporting work *faster*',
  actionText: 'View all projects',
};

const Arrow = ({ dir }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d={dir === 'prev' ? 'M19 12H5m6 6-6-6 6-6' : 'M5 12h14m-6-6 6 6-6 6'} />
  </svg>
);

const pad2 = (n) => String(n).padStart(2, '0');

// Neutral gradients rising from the bottom of each cover: charcoal, tan, black.
const COVER_GRADIENTS = [
  'from-[#171719] via-[#171719]/55',
  'from-[#A8977A] via-secondary/55',
  'from-[#050506] via-[#050506]/55',
];

// "https://www.example.com/path" -> "example.com"
const hostOf = (href = '') => {
  try {
    return new URL(href).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
};

const FeaturedProjects = ({ projects = [], exploreHref = '/work', heading = DEFAULT_HEADING }) => {
  const cards = projects.slice(0, 6);
  const total = cards.length;
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [atEnd, setAtEnd] = useState(false);
  // Cards whose image failed to load get a branded placeholder instead.
  const [failed, setFailed] = useState({});

  const slideEls = () => Array.from(trackRef.current?.querySelectorAll('[data-slide]') || []);
  const trackPad = () => parseFloat(getComputedStyle(trackRef.current).paddingLeft) || 0;

  const goTo = useCallback((i) => {
    const track = trackRef.current;
    const el = slideEls()[Math.max(0, Math.min(total - 1, i))];
    if (!track || !el) return;
    track.scrollTo({ left: el.offsetLeft - trackPad(), behavior: 'smooth' });
  }, [total]);

  // Active slide = the one whose left edge is closest to the track's start.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = track.scrollWidth - track.clientWidth;
      setAtEnd(track.scrollLeft >= max - 4);
      // Leftmost slide in view. Targets are clamped to the max scroll, so near
      // the end several slides share a target and the first of them wins.
      const pad = trackPad();
      let best = 0;
      let bestDist = Infinity;
      slideEls().forEach((el, i) => {
        const target = Math.min(el.offsetLeft - pad, max);
        const d = Math.abs(target - track.scrollLeft);
        if (d < bestDist - 1) {
          bestDist = d;
          best = i;
        }
      });
      setIndex(best);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [total]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(index + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(index - 1);
    }
  };

  const navBtn =
    'flex h-12 w-12 items-center justify-center rounded-full border border-dark/20 text-dark transition-colors duration-300 hover:border-dark hover:bg-dark hover:text-white disabled:pointer-events-none disabled:opacity-30 dark:border-white/25 dark:text-white dark:hover:border-secondary dark:hover:bg-secondary dark:hover:text-dark';

  return (
    <section id="featured-work" className="w-full overflow-hidden bg-paper px-4 py-20 sm:px-6 md:py-28 lg:px-[8%] scroll-mt-20 dark:bg-white/[0.03]">
      <div className="mx-auto max-w-7xl">
        {/* Header: heading left, counter + arrows right */}
        <div className="mb-12 flex flex-col gap-8 md:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={heading.eyebrow} heading={heading.heading} className="!mb-0 flex-1" />
          <div className="flex items-center gap-5 lg:pb-1.5">
            <span className="font-eyebrow text-sm tracking-[0.2em] text-gray-500 dark:text-gray-400" aria-live="polite">
              <span className="font-bold text-dark dark:text-white">{pad2(atEnd ? total : index + 1)}</span> / {pad2(total)}
            </span>
            <div className="flex gap-3">
              <button type="button" onClick={() => goTo(index - 1)} disabled={index === 0} aria-label="Previous project" className={navBtn}>
                <Arrow dir="prev" />
              </button>
              <button type="button" onClick={() => goTo(index + 1)} disabled={atEnd || index === total - 1} aria-label="Next project" className={navBtn}>
                <Arrow dir="next" />
              </button>
            </div>
          </div>
        </div>

        {/* Track: bleeds to the right edge of the viewport */}
        <div className="-mr-4 sm:-mr-6 lg:mr-[calc((100%_-_100vw)/2)]">
          <div
            ref={trackRef}
            tabIndex={0}
            onKeyDown={onKeyDown}
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured projects"
            className="relative flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 outline-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:ring-2 focus-visible:ring-primary/40 rounded-[1.75rem]"
          >
            {cards.map((project, i) => {
              const href = project.link || '#';
              return (
                <article
                  key={project.slug || project.title}
                  data-slide
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${total}: ${project.title}`}
                  className="group w-[85%] shrink-0 snap-start sm:w-[58%] lg:w-[42%] xl:w-[38%]"
                >
                  {/* Cover: screenshot + brand gradient + website name */}
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View project: ${project.title}`}
                    className="relative block aspect-[16/11] overflow-hidden rounded-2xl bg-dark shadow-[0_24px_48px_-30px_rgba(19,33,46,0.55)]"
                  >
                    {failed[i] ? (
                      <span className="absolute inset-0 bg-gradient-to-br from-dark to-primaryDark" />
                    ) : (
                      <img
                        src={project.bgImage}
                        alt=""
                        loading={i < 2 ? 'eager' : 'lazy'}
                        onError={() => setFailed((f) => ({ ...f, [i]: true }))}
                        className="absolute inset-0 h-full w-full scale-105 object-cover object-top blur-[3px] transition-all duration-700 ease-out group-hover:scale-100 group-hover:blur-0"
                      />
                    )}
                    {/* tint for legibility + brand gradient rising from the bottom */}
                    <span className="absolute inset-0 bg-dark/40 transition-colors duration-700 group-hover:bg-dark/20" aria-hidden="true" />
                    <span className={`absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t to-transparent ${COVER_GRADIENTS[i % COVER_GRADIENTS.length]}`} aria-hidden="true" />

                    <span className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                      <span className="text-3xl font-bold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)] sm:text-4xl">
                        {project.title}
                      </span>
                      {hostOf(href) && (
                        <span className="mt-2 font-eyebrow text-[11px] uppercase tracking-[0.25em] text-white/80">{hostOf(href)}</span>
                      )}
                    </span>

                    <span className="absolute right-4 top-4 inline-flex -translate-y-1 items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-dark opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      View project <span aria-hidden="true">↗</span>
                    </span>
                  </a>

                  {/* Meta */}
                  <div className="mt-6 flex items-center justify-between font-eyebrow text-[11px] font-bold uppercase tracking-[0.22em]">
                    <span className="text-accent">{project.featuredLabel || project.category || project.badge}</span>
                    <span className="text-gray-400 dark:text-gray-500">{pad2(i + 1)}</span>
                  </div>
                  <h3 className="sr-only">{project.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-gray-600 line-clamp-2 dark:text-gray-400">{project.content}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(project.features || []).slice(0, 3).map((feat) => (
                      <span key={feat} className="rounded-full border border-dark/10 px-3 py-1 text-xs font-medium text-gray-600 dark:border-white/15 dark:text-gray-300">
                        {feat}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
            {/* End spacer so the last card can reach the start position */}
            <div aria-hidden="true" className="w-px shrink-0" />
          </div>
        </div>

        {/* Progress + link */}
        <div className="mt-10 flex items-center gap-8">
          <div className="relative h-px flex-1 bg-dark/10 dark:bg-white/15">
            <span
              className="absolute inset-y-0 left-0 bg-dark transition-[width] duration-500 ease-out dark:bg-secondary"
              style={{ width: `${((atEnd ? total : index + 1) / Math.max(total, 1)) * 100}%` }}
            />
          </div>
          <ArrowLink href={exploreHref}>{heading.actionText}</ArrowLink>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
