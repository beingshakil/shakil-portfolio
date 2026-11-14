"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { assets } from '../Assets/assets'

const Header = ({ content }) => {
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
          <div className="mb-7 flex justify-center">
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-secondary/80 shadow-xl">
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
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white mb-6 min-h-[1.2em]">
            {displayText}
            {!isTypingDone && <span className="typing-cursor"></span>}
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-white/75 mb-10 max-w-2xl mx-auto leading-relaxed">
            {content.subtitle}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={content.ctaPrimary.href}
              className="px-8 py-3.5 rounded-full bg-secondary text-dark text-sm font-semibold hover:bg-light transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
            >
              {content.ctaPrimary.text}
            </Link>

            <Link
              href={content.ctaSecondary.href}
              className="px-8 py-3.5 rounded-full border border-white/40 text-white text-sm font-semibold hover:bg-white hover:text-dark transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
            >
              {content.ctaSecondary.text}
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20 animate-bounce pointer-events-none">
        <a
          href="#focus"
          aria-label="Scroll to the next section"
          onClick={(e) => {
            const target = document.getElementById('focus');
            if (target) {
              e.preventDefault();
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          className="pointer-events-auto p-3 rounded-full text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </div>
  )
}

export default Header
