"use client"
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { assets } from '../Assets/assets'

const Header = ({content}) => {
  const [displayText, setDisplayText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    const fullText = content.title;
    let i = 0;
    const timer = setInterval(() => {
      setDisplayText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) {
        clearInterval(timer);
        setIsTypingDone(true);
      }
    }, 80);
    return () => clearInterval(timer);
  }, [content.title]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background with dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark to-black">
        <div className={`absolute inset-0 bg-cover bg-center opacity-30`} style={{ backgroundImage: `url("${content.backgroundImage}")` }}></div>
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Profile image */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-secondary shadow-xl">
              <Image
                src={assets.profile_img}
                alt={content.profileAlt}
                className="w-full h-full object-cover"
                width={128}
                height={128}
              />
            </div>
          </div>

          {/* Headline with typing effect */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 min-h-[1.2em]">
            {displayText}
            {!isTypingDone && <span className="typing-cursor"></span>}
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
            {content.subtitle}
            <span className="block mt-2 font-medium">{content.content}</span>
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={content.ctaPrimary.href}
              className="px-8 py-4 bg-light text-dark font-semibold rounded-full shadow-lg hover:bg-secondary transition-all duration-300 transform hover:-translate-y-1"
            >
              {content.ctaPrimary.text}
            </a>

            <a
              href={content.ctaSecondary.href}
              className="px-8 py-4 border-2 border-light text-light font-semibold rounded-full hover:bg-light hover:text-dark transition-all duration-300 transform hover:-translate-y-1"
            >
              {content.ctaSecondary.text}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
        <a href={content.ctaPrimary.href} className="block text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </div>
  )
}

export default Header
