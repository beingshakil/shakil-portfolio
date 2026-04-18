"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const isActiveLink = (pathname, href) => {
  if (!pathname) return false;
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href + '/');
};

const Navbar = ({isDarkMode, setIsDarkMode, content}) => {
  const pathname = usePathname();
  const [isScroll, setIsScroll] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Main Navigation */}
      <nav className={`w-full fixed px-4 sm:px-6 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 transition-all duration-300
        ${isScroll ? "bg-white/90 dark:bg-dark/90 backdrop-blur-md shadow-lg" : "bg-transparent"}`}>

        {/* Brand Logo - Left side */}
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold md:text-2xl bg-gradient-to-r from-primaryDark to-primary bg-clip-text text-transparent">{content.brandName}</span>
        </Link>

        {/* Desktop Navigation Links - Center */}
        <ul className="hidden md:flex items-center gap-8 lg:gap-10">
          {content.navLinks.map((link, index) => {
            const active = isActiveLink(pathname, link.href);
            
            if (link.label === "Experience") {
              return (
                <li key={index} className="relative group">
                  <Link href={link.href} className={`font-medium transition-colors duration-300 relative block py-2 ${
                    active ? 'text-primary' : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
                  }`}>
                    {link.label}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 w-0 group-hover:w-full`}></span>
                  </Link>
                  <div className="absolute left-0 mt-0 w-48 bg-white dark:bg-dark border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 flex flex-col z-50 overflow-hidden">
                    <Link href="/experience#professional" onClick={() => window.dispatchEvent(new CustomEvent('setExperienceTab', { detail: 'professional' }))} className="px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-darkHover text-gray-700 dark:text-gray-300 transition-colors">Professional</Link>
                    <Link href="/experience#extra-curricular" onClick={() => window.dispatchEvent(new CustomEvent('setExperienceTab', { detail: 'extraCurricular' }))} className="px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-darkHover text-gray-700 dark:text-gray-300 transition-colors border-t border-gray-100 dark:border-gray-700">Extra Curricular</Link>
                  </div>
                </li>
              );
            }

            return (
              <li key={index}>
                <Link
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`font-medium transition-colors duration-300 relative group ${
                    active
                      ? 'text-primary'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  ></span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          {/* Dark/Light Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(prev => !prev)}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-darkHover transition-colors duration-300"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Contact Button - Hidden on mobile */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-primaryDark to-primary text-white font-medium rounded-lg hover:from-primaryDark-dark hover:to-primary-dark transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            {content.ctaButtonText}
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="block md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-darkHover transition-colors duration-300"
            onClick={openMenu}
            aria-label="Open menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={closeMenu}
        >
          {/* Mobile Menu Panel */}
          <div
            className={`absolute right-0 top-0 bottom-0 w-64 bg-white dark:bg-dark h-full p-6 shadow-2xl z-[101] overflow-y-auto transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-bold bg-gradient-to-r from-primaryDark to-primary bg-clip-text text-transparent">{content.mobileMenuTitle}</span>
              <button
                className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-darkHover transition-colors duration-300"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <ul className="space-y-6">
              {content.navLinks.map((link, index) => {
                const active = isActiveLink(pathname, link.href);

                if (link.label === "Experience") {
                  return (
                    <li key={index} className="border-b border-gray-200 dark:border-gray-700 py-3">
                      <Link href={link.href} onClick={closeMenu} className="font-medium text-gray-700 dark:text-gray-300 mb-2 block hover:text-primary transition-colors">{link.label}</Link>
                      <div className="flex flex-col pl-4 space-y-3">
                        <Link href="/experience#professional" onClick={() => {
                          closeMenu();
                          window.dispatchEvent(new CustomEvent('setExperienceTab', { detail: 'professional' }));
                        }} className="text-left text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Professional</Link>
                        <Link href="/experience#extra-curricular" onClick={() => {
                          closeMenu();
                          window.dispatchEvent(new CustomEvent('setExperienceTab', { detail: 'extraCurricular' }));
                        }} className="text-left text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Extra Curricular</Link>
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={index}>
                    <Link
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      onClick={closeMenu}
                      className={`block py-3 font-medium transition-colors duration-300 border-b border-gray-200 dark:border-gray-700 ${
                        active
                          ? 'text-primary border-primary'
                          : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  setIsDarkMode(prev => !prev);
                  closeMenu();
                }}
                className="flex items-center gap-3 w-full py-3 font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-300"
              >
                {isDarkMode ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    {content.lightModeLabel}
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                    {content.darkModeLabel}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
