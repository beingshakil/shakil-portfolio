"use client"
import React from 'react';
import { useScrollReveal, useScrollRevealMultiple } from '../hooks/useScrollReveal';

const Experience = ({content}) => {
  const headerRef = useScrollReveal();
  const setEntryRef = useScrollRevealMultiple(content.cards.length);

  return (
    <div id='experience' className='w-full px-4 sm:px-6 lg:px-[8%] py-16 scroll-mt-20 bg-light dark:bg-dark'>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-16">
          <h4 className='mb-2 text-lg font-ovo text-primary'>{content.subtitle}</h4>
          <h2 className='text-4xl md:text-5xl font-bold'>{content.title}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
        </div>

        {/* Experience timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-secondary dark:bg-gray-700 transform md:translate-x-1"></div>

          {/* Experience items */}
          <div className="space-y-12">
            {content.cards.map((entry, index) => (
              <div key={index} ref={setEntryRef(index)} className="relative pl-8 md:pl-0">
                <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-white dark:border-dark z-10"></div>
                <div className={`${entry.side === 'right' ? 'md:ml-[55%]' : 'md:mr-[55%] md:ml-0'} bg-white dark:bg-darkHover rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{entry.title}</h3>
                    <span className="inline-block px-3 py-1 text-sm font-semibold bg-secondary/20 dark:bg-primaryDark/30 text-primaryDark dark:text-secondary rounded-full mt-2 md:mt-0">
                      {entry.duration}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-primary mb-4">
                    {entry.companyLink ? (
                      <a href={entry.companyLink} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {entry.company}
                      </a>
                    ) : (
                      entry.company
                    )}
                  </h4>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    {entry.content.map((bullet, i) => (
                      <li key={i} className="flex items-start">
                        <span className="inline-block w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
