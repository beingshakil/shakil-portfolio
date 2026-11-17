"use client"

import SectionHeading, { Section } from './SectionHeading'

// Card icons, keyed by `iconKey` in homepage.json. Rendered in the brand color.
const ICONS = {
  ui_icon: <path d="M13 10V3L4 14h7v7l9-11h-7z" />,
  mobile_icon: (
    <>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </>
  ),
  web_icon: (
    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  ),
  graphics_icon: (
    <>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </>
  ),
}

const Services = ({ content }) => {
  return (
    <Section id="services" tone="white">
      <SectionHeading eyebrow={content.eyebrow} heading={content.heading} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {content.cards.map((item, index) => (
          <div
            key={item.title}
            className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_40px_-24px_rgba(26,48,64,0.35)] dark:border-white/10 dark:bg-white/[0.04]"
          >
            <div className="flex items-start justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primaryDark transition-colors duration-300 group-hover:bg-dark group-hover:text-secondary dark:bg-white/10 dark:text-secondary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
                  {ICONS[item.iconKey] || ICONS.ui_icon}
                </svg>
              </span>
              <span className="font-eyebrow text-xs text-gray-400 dark:text-gray-500">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            <h3 className="mt-8 text-xl font-semibold tracking-tight text-dark dark:text-white">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {item.content}
            </p>
            <div className="mt-auto pt-7">
              <p className="border-t border-gray-200 pt-4 font-eyebrow text-[10px] font-bold uppercase tracking-[0.18em] text-primary dark:border-white/10 dark:text-secondary">
                <span className="text-gray-500 dark:text-gray-400">Deliverable</span>
                <span className="mx-2 text-gray-300 dark:text-white/20">/</span>
                {item.deliverable}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default Services
