"use client"
// Shared building blocks so every section reads as one system:
//   <Section>         consistent padding, width and background tone
//   <Eyebrow>         small spaced-out mono label with a tan rule
//   <SectionHeading>  eyebrow + heading (left), description + link (right)
//   <ArrowLink>       the one text-link style used for "View all" actions
import Link from 'next/link';
import RevealText from './RevealText';

const SECTION_TONES = {
  white: 'bg-white dark:bg-darkTheme',
  paper: 'bg-paper dark:bg-white/[0.03]',
  navy: 'bg-dark dark:bg-deep text-white',
};

export const Section = ({ id, tone = 'white', className = '', children }) => (
  <section
    id={id}
    className={`w-full px-4 sm:px-6 lg:px-[8%] py-20 md:py-28 scroll-mt-20 ${SECTION_TONES[tone] || ''} ${className}`}
  >
    <div className="max-w-7xl mx-auto">{children}</div>
  </section>
);

export const Eyebrow = ({ children, tone = 'light', center = false, className = '' }) => (
  <p
    className={`flex items-center gap-3 font-eyebrow text-[11px] sm:text-xs font-bold uppercase tracking-[0.28em] ${
      tone === 'dark' ? 'text-secondary' : 'text-accent'
    } ${center ? 'justify-center' : ''} ${className}`}
  >
    <span className="h-px w-8 bg-secondary" aria-hidden="true" />
    {children}
    {center && <span className="h-px w-8 bg-secondary" aria-hidden="true" />}
  </p>
);

export const ArrowLink = ({ href, children, tone = 'light', external = false, className = '' }) => {
  const classes = `group inline-flex items-center gap-2 border-b pb-1 text-sm font-semibold transition-colors ${
    tone === 'dark'
      ? 'border-white/30 text-white hover:border-secondary hover:text-secondary'
      : 'border-dark/20 text-dark hover:border-dark dark:border-white/30 dark:text-white dark:hover:border-white'
  } ${className}`;
  const arrow = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {children}
      {arrow}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {children}
      {arrow}
    </Link>
  );
};

export const headingClass =
  'text-[2rem] leading-[1.15] sm:text-4xl lg:text-5xl lg:leading-[1.1] font-semibold tracking-tight';

const SectionHeading = ({
  eyebrow,
  heading,
  description,
  action,
  tone = 'light',
  align = 'split',
  className = '',
}) => {
  if (align === 'center') {
    return (
      <div className={`max-w-3xl mx-auto text-center mb-12 md:mb-16 ${className}`}>
        <Eyebrow tone={tone} center>{eyebrow}</Eyebrow>
        <RevealText text={heading} tone={tone} className={`mt-5 ${headingClass}`} />
        {description && (
          <p className={`mt-6 text-base md:text-lg leading-relaxed ${tone === 'dark' ? 'text-white/70' : 'text-gray-600 dark:text-gray-400'}`}>
            {description}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`grid gap-6 lg:grid-cols-12 lg:items-end mb-12 md:mb-16 ${className}`}>
      <div className={description || action ? 'lg:col-span-7' : 'lg:col-span-10'}>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        <RevealText text={heading} tone={tone} className={`mt-5 ${headingClass}`} />
      </div>
      {(description || action) && (
        <div className="lg:col-span-4 lg:col-start-9 lg:pb-1.5">
          {description && (
            <p className={`text-base leading-relaxed ${tone === 'dark' ? 'text-white/70' : 'text-gray-600 dark:text-gray-400'}`}>
              {description}
            </p>
          )}
          {action && (
            <ArrowLink href={action.href} tone={tone} className={description ? 'mt-5' : ''}>
              {action.label}
            </ArrowLink>
          )}
        </div>
      )}
    </div>
  );
};

export default SectionHeading;
