"use client"

import { assets } from '../Assets/assets'
import Image from 'next/image'
import { useScrollReveal, useScrollRevealMultiple } from '../hooks/useScrollReveal'

const Services = ({ content }) => {
  const headerRef = useScrollReveal();
  const setCardRef = useScrollRevealMultiple(content.cards.length);

  return (
    <div id='services' className='w-full px-4 sm:px-6 lg:px-[8%] py-16 scroll-mt-20 bg-light dark:bg-dark'>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-16">
          <h4 className='mb-2 text-lg font-ovo text-primary'>{content.subtitle}</h4>
          <h2 className='text-4xl md:text-5xl font-bold'>{content.title}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>

          <p className='text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6 text-justify'>
            {content.content}
          </p>
        </div>

        {/* Services grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch'>
          {content.cards.map((item, index) => (
            <div
              key={index}
              ref={setCardRef(index)}
              className='flex flex-col bg-white dark:bg-darkHover border border-gray-200 dark:border-gray-700 rounded-[1.5rem] p-6 hover:shadow-xl transition-all duration-500 group h-full'
            >
              <div className='flex items-start justify-between mb-5'>
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primaryDark/30 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                  <Image
                    src={assets[item.iconKey]}
                    alt={item.title}
                    className='w-6 h-6 group-hover:invert transition-all duration-300'
                    width={24}
                    height={24}
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className='text-lg font-bold mb-4 text-gray-800 dark:text-white'>{item.title}</h3>

              {/* Description / Bullets */}
              {item.bullets ? (
                <ul className='space-y-2 mb-6'>
                  {item.bullets.map((bullet, i) => (
                    <li key={i} className='flex items-center gap-2 text-gray-600 dark:text-gray-400'>
                      <span className='w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0'></span>
                      <span className='text-[14px] font-medium whitespace-nowrap'>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className='text-gray-600 dark:text-gray-400 mb-6 leading-relaxed text-xs'>{item.content}</p>
              )}

              {/* Link — pinned to bottom */}
              <a
                href={item.link}
                className='mt-auto inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all duration-300'
              >
                {content.readMoreText}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* View All Services button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 border-2 border-primary text-primary dark:text-primary font-semibold rounded-full hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors duration-300">
            {content.viewAllText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Services
