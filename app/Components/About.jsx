"use client"
import Image from 'next/image'
import React from 'react'
import { assets, toolsData } from '../Assets/assets'
import { useScrollReveal, useScrollRevealMultiple } from '../hooks/useScrollReveal'

const About = ({content}) => {
  const headerRef = useScrollReveal();
  const contentRef = useScrollReveal();
  const toolsRef = useScrollReveal();
  const setCardRef = useScrollRevealMultiple(content.cards.length);

  return (
    <div id='about' className='w-full px-4 sm:px-6 lg:px-[8%] py-16 scroll-mt-20'>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-16">
          <h4 className='mb-2 text-lg font-ovo text-primary'>{content.subtitle}</h4>
          <h2 className='text-4xl md:text-5xl font-bold'>{content.title}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
        </div>

        {/* Main content */}
        <div ref={contentRef} className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text content - Left side */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-6">{content.storyTitle}</h3>
            {content.content.map((paragraph, index) => (
              <p key={index} className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}

            <div className="text-center lg:text-left">
              <button className="px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors duration-300 transform hover:-translate-y-1">
                {content.ctaText}
              </button>
            </div>
          </div>

          {/* Image - Right side */}
          <div className="w-full lg:w-2/5 flex justify-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={assets.user_image}
                alt={content.sectionTitle}
                className='w-full h-auto object-cover'
                width={500}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Info cards */}
        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.cards.map((card, index) => (
              <div
                key={index}
                ref={setCardRef(index)}
                className='border border-gray-200 dark:border-gray-700 rounded-xl p-6 cursor-pointer hover:bg-light dark:hover:bg-darkHover hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-lg'
              >
                <div className="w-12 h-12 rounded-full bg-secondary/20 dark:bg-primaryDark/30 flex items-center justify-center mb-4">
                  <Image
                    src={assets[card.iconKey]}
                    alt={card.title}
                    className='w-6 h-6'
                    width={24}
                    height={24}
                  />
                </div>
                <h3 className='my-4 font-bold text-xl text-gray-800 dark:text-white'>{card.title}</h3>
                <p className='text-gray-600 dark:text-gray-400 whitespace-pre-line'>{card.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tools section */}
        <div ref={toolsRef} className="mt-16">
          <h4 className='my-6 text-xl font-semibold text-gray-800 dark:text-white text-center'>{content.toolsSectionTitle}</h4>
          <div className="flex flex-wrap justify-center gap-6">
            {toolsData.map((tool, index) => (
              <div
                className='flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-md bg-white dark:bg-darkHover'
                key={index}
              >
                <Image
                  src={tool}
                  alt='Tool'
                  className='w-8 h-8 sm:w-10 sm:h-10 object-contain'
                  width={40}
                  height={40}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
