"use client"

import { useScrollReveal, useScrollRevealMultiple } from '../hooks/useScrollReveal'

const ICONS = {
  ui_icon: {
    color: '#3B82F6',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  mobile_icon: {
    color: '#10B981',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  web_icon: {
    color: '#F59E0B',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  graphics_icon: {
    color: '#8B5CF6',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
}

const Services = ({ content }) => {
  const headerRef = useScrollReveal()
  const setCardRef = useScrollRevealMultiple(content.cards.length)

  return (
    <div id='services' className='w-full px-4 sm:px-6 lg:px-[8%] py-16 scroll-mt-20 bg-light dark:bg-dark'>
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div ref={headerRef} className="text-center mb-16">
          <h4 className='mb-2 text-lg font-ovo text-primary'>{content.subtitle}</h4>
          <h2 className='text-4xl md:text-5xl font-bold'>{content.title}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4" />
          <p className='text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6'>
            {content.content}
          </p>
        </div>

        {/* Services grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {content.cards.map((item, index) => {
            const icon = ICONS[item.iconKey] || ICONS.ui_icon
            return (
              <div
                key={index}
                ref={setCardRef(index)}
                className='flex flex-col items-center text-center bg-white dark:bg-darkHover border border-gray-100 dark:border-gray-700 rounded-2xl p-8 hover:shadow-xl transition-all duration-500'
              >
                {/* Icon */}
                <div className="mb-6" style={{ color: icon.color }}>
                  {icon.svg}
                </div>

                {/* Title */}
                <h3 className='text-lg font-bold mb-3 text-gray-800 dark:text-white'>
                  {item.title}
                </h3>

                {/* Description */}
                <p className='text-gray-500 dark:text-gray-400 text-sm leading-relaxed'>
                  {item.content}
                </p>
              </div>
            )
          })}
        </div>

        {/* View All button */}
        <div className="text-center mt-12">
          <a
            href="/services"
            className="px-8 py-3 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors duration-300 inline-block"
          >
            {content.viewAllText}
          </a>
        </div>

      </div>
    </div>
  )
}

export default Services
