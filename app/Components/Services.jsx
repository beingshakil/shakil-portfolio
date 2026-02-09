"use client"
import React from 'react'
import { assets } from '../Assets/assets'
import Image from 'next/image'
import { useScrollReveal, useScrollRevealMultiple } from '../hooks/useScrollReveal'

const Services = ({content}) => {
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

          <p className='text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6'>
            {content.content}
          </p>
        </div>

        {/* Services grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {content.cards.map((item, index) => (
            <div
              key={index}
              ref={setCardRef(index)}
              className='bg-white dark:bg-darkHover border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group'
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-full bg-secondary/20 dark:bg-primaryDark/30 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <Image
                  src={assets[item.iconKey]}
                  alt={item.title}
                  className='w-6 h-6 group-hover:invert transition-all duration-300'
                  width={24}
                  height={24}
                />
              </div>

              {/* Title */}
              <h3 className='text-xl font-bold my-4 text-gray-800 dark:text-white'>{item.title}</h3>

              {/* Description */}
              <p className='text-gray-600 dark:text-gray-400 mb-6'>{item.content}</p>

              {/* Link */}
              <a
                href={item.link}
                className='flex items-center gap-2 text-primary font-medium group-hover:text-primaryDark dark:group-hover:text-secondary transition-colors duration-300'
              >
                {content.readMoreText}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
