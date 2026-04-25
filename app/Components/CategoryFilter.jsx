"use client"
import React from 'react';

/**
 * Responsive category filter.
 * - Mobile (<md): native <select> dropdown — compact and ergonomic on touch.
 * - Desktop (>=md): pill-button row with active state.
 */
const CategoryFilter = ({ categories, activeCategory, onChange, label = 'Filter by category' }) => {
  const options = ['All', ...categories];

  return (
    <div className="mb-12">
      {/* Mobile dropdown */}
      <div className="md:hidden flex justify-center">
        <label htmlFor="category-filter" className="sr-only">{label}</label>
        <div className="relative w-full max-w-xs">
          <select
            id="category-filter"
            value={activeCategory}
            onChange={(e) => onChange(e.target.value)}
            aria-label={label}
            className="w-full appearance-none px-5 py-3 pr-10 rounded-full text-sm font-semibold border border-primary/40 bg-white dark:bg-darkHover text-gray-800 dark:text-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {options.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Desktop pills */}
      <div className="hidden md:flex flex-wrap items-center justify-center gap-4">
        {options.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onChange(cat)}
              aria-pressed={isActive}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 focus:outline-none ${
                isActive
                  ? 'bg-primary text-white shadow-[0_4px_14px_0_rgba(0,118,255,0.39)]'
                  : 'bg-white dark:bg-darkHover text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-dark/60 hover:shadow-md'
              }`}
            >
              {/* Category Icons */}
              {cat === 'All' ? null : (
                <svg className={`w-4 h-4 ${isActive ? 'text-white' : 'text-primary'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {cat.toLowerCase().includes('web') ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  ) : cat.toLowerCase().includes('search') || cat.toLowerCase().includes('seo') ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  ) : cat.toLowerCase().includes('neural') || cat.toLowerCase().includes('deep') ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  ) : cat.toLowerCase().includes('data') || cat.toLowerCase().includes('visual') ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  )}
                </svg>
              )}
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
