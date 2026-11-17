"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { assets } from '../Assets/assets'

const Header = ({ content }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const marqueeItems = content.marqueeItems || [];
  const marqueeTrackRef = useRef(null);
  const marqueeOffsetRef = useRef(0);
  const marqueeDragRef = useRef(null);
  const marqueeWasDraggedRef = useRef(false);

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

  useEffect(() => {
    const track = marqueeTrackRef.current;
    if (!track || marqueeItems.length === 0) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frameId;
    let lastTimestamp = performance.now();

    const loopWidth = () => track.firstElementChild?.offsetWidth || 0;
    const normalizeOffset = (offset) => {
      const width = loopWidth();
      if (!width) return 0;
      while (offset <= -width) offset += width;
      while (offset > 0) offset -= width;
      return offset;
    };
    const paint = () => {
      track.style.transform = `translate3d(${marqueeOffsetRef.current}px, 0, 0)`;
    };
    const animate = (timestamp) => {
      const elapsed = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      if (!prefersReducedMotion && !marqueeDragRef.current) {
        marqueeOffsetRef.current = normalizeOffset(marqueeOffsetRef.current - elapsed * 0.025);
        paint();
      }
      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frameId);
  }, [marqueeItems.length]);

  const handleMarqueePointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    marqueeDragRef.current = { x: event.clientX, offset: marqueeOffsetRef.current };
    marqueeWasDraggedRef.current = false;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handleMarqueePointerMove = (event) => {
    const drag = marqueeDragRef.current;
    const track = marqueeTrackRef.current;
    if (!drag || !track) return;

    const delta = event.clientX - drag.x;
    if (Math.abs(delta) > 3) marqueeWasDraggedRef.current = true;
    const width = track.firstElementChild?.offsetWidth || 0;
    let offset = drag.offset + delta;
    while (width && offset <= -width) offset += width;
    while (width && offset > 0) offset -= width;
    marqueeOffsetRef.current = offset;
    track.style.transform = `translate3d(${offset}px, 0, 0)`;
  };

  const handleMarqueePointerUp = (event) => {
    marqueeDragRef.current = null;
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleMarqueeClick = (event) => {
    if (!marqueeWasDraggedRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    marqueeWasDraggedRef.current = false;
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background with dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark to-black">
        <div className={`absolute inset-0 bg-cover bg-center opacity-30`} style={{ backgroundImage: `url("${content.backgroundImage}")` }}></div>
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pb-24 text-center px-4 sm:px-6 lg:px-8">
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

      {marqueeItems.length > 0 && (
        <section
          className="absolute inset-x-0 bottom-0 z-20 overflow-hidden border-y border-white/10 bg-[#050506]/90 backdrop-blur-sm"
          aria-label={content.marqueeLabel || 'Selected teams and products'}
        >
          <p className="py-3 text-center text-xs font-medium text-white/55 sm:text-sm">
            {content.marqueeLabel || 'Selected teams and products'}
          </p>
          <div
            className="cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing"
            onPointerDown={handleMarqueePointerDown}
            onPointerMove={handleMarqueePointerMove}
            onPointerUp={handleMarqueePointerUp}
            onPointerCancel={handleMarqueePointerUp}
            onClickCapture={handleMarqueeClick}
          >
            <div ref={marqueeTrackRef} className="flex w-max will-change-transform">
              {[0, 1, 2].map((group) => (
                <ul
                  key={group}
                  className="flex shrink-0"
                  aria-hidden={group !== 0}
                >
                  {marqueeItems.map((item) => {
                    const name = typeof item === 'string' ? item : item.name;
                    const href = typeof item === 'string' ? null : item.href;
                    const logo = typeof item === 'string' ? null : item.logo;
                    const logoClass = typeof item === 'string' ? '' : item.logoClass;
                    const showName = typeof item === 'string' ? true : item.showName;
                    const showMark = typeof item === 'string' ? true : item.showMark !== false;
                    const isLargeLogo = typeof item !== 'string' && item.logoSize === 'large';
                    const itemContent = (
                      <>
                        {logo ? (
                          <img
                            src={logo}
                            alt={`${name} logo`}
                            onError={(event) => {
                              event.currentTarget.hidden = true;
                              event.currentTarget.nextElementSibling.hidden = false;
                            }}
                            style={{ filter: logoClass === 'invert' ? 'grayscale(1) invert(1)' : 'grayscale(1)' }}
                            className={`${showName ? 'h-9 w-9' : isLargeLogo ? 'h-10 w-40' : 'h-9 w-32'} shrink-0 object-contain ${isLargeLogo ? 'opacity-100' : 'opacity-75'} transition-opacity duration-300 group-hover:opacity-100`}
                          />
                        ) : null}
                        <span hidden={Boolean(logo) && !showName} className="text-base font-semibold tracking-tight text-white/75 sm:text-lg">
                          {name}
                        </span>
                        {!logo && showMark && (
                          <span className="flex h-6 w-6 items-center justify-center rounded-md border border-white/20 text-[10px] font-bold text-secondary">
                            {name.charAt(0)}
                          </span>
                        )}
                      </>
                    );

                    return (
                      <li
                        key={`${group}-${name}`}
                        className="group flex min-w-56 items-center justify-center border-r border-white/10"
                      >
                        {group === 0 && href ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center gap-2.5 px-7 py-6 transition-colors duration-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
                          >
                            {itemContent}
                          </a>
                        ) : (
                          <span className="flex w-full items-center justify-center gap-2.5 px-7 py-6">
                            {itemContent}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Scroll indicator */}
      <div className="absolute bottom-36 left-0 right-0 z-30 flex justify-center animate-bounce pointer-events-none sm:bottom-40">
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
