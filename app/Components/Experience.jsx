"use client"
import { useState, useEffect } from 'react';
import SectionHeading, { Section } from './SectionHeading';

const INITIAL_BULLETS = 3;

const TABS = [
  { key: 'professional', label: 'Professional' },
  { key: 'extraCurricular', label: 'Extra Curricular' },
];

const Experience = ({ content, hideTabs }) => {
  const [activeTab, setActiveTab] = useState('professional');
  const [expandedCards, setExpandedCards] = useState({});

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash;
      if (hash === '#extra-curricular') setActiveTab('extraCurricular');
      else if (hash === '#professional') setActiveTab('professional');
    };
    const handleTabChange = (e) => {
      if (e.detail) setActiveTab(e.detail);
    };

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    window.addEventListener('setExperienceTab', handleTabChange);
    return () => {
      window.removeEventListener('setExperienceTab', handleTabChange);
      window.removeEventListener('hashchange', syncFromHash);
    };
  }, []);

  // Collapse any expanded entries when switching tabs.
  useEffect(() => setExpandedCards({}), [activeTab]);

  const currentCards = content[activeTab] || [];
  const toggleCard = (index) => setExpandedCards((prev) => ({ ...prev, [index]: !prev[index] }));

  return (
    <Section id="experience" tone="white">
      <SectionHeading eyebrow={content.eyebrow} heading={content.heading} />

      {!hideTabs && (
        <div className="mb-10 inline-flex rounded-full border border-gray-200 bg-paper p-1 dark:border-white/10 dark:bg-white/[0.04]" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300 ${
                activeTab === tab.key
                  ? 'bg-dark text-white dark:bg-secondary dark:text-dark'
                  : 'text-gray-600 hover:text-dark dark:text-gray-300 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      <ol className="border-t border-gray-200 dark:border-white/10">
        {currentCards.map((entry, index) => {
          const expanded = expandedCards[index];
          const bullets = expanded ? entry.content : entry.content.slice(0, INITIAL_BULLETS);
          return (
            <li
              key={`${entry.title}-${entry.company}`}
              className="grid gap-4 border-b border-gray-200 py-10 dark:border-white/10 lg:grid-cols-12 lg:gap-8"
            >
              <div className="lg:col-span-3">
                <p className="font-eyebrow text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  {entry.duration}
                </p>
              </div>

              <div className="lg:col-span-9">
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-dark dark:text-white">
                  {entry.title}
                </h3>
                <p className="mt-1 font-medium text-primary dark:text-secondary">
                  {entry.companyLink ? (
                    <a href={entry.companyLink} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">
                      {entry.company} <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    entry.company
                  )}
                </p>

                <ul className="mt-5 space-y-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                  {bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 bg-secondary" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {entry.content.length > INITIAL_BULLETS && (
                  <button
                    onClick={() => toggleCard(index)}
                    className="mt-5 inline-flex items-center gap-2 border-b border-dark/20 pb-1 text-sm font-semibold text-dark transition-colors hover:border-dark dark:border-white/30 dark:text-white dark:hover:border-white"
                    aria-expanded={!!expanded}
                  >
                    {expanded ? 'Show less' : `Show ${entry.content.length - INITIAL_BULLETS} more`}
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
};

export default Experience;
