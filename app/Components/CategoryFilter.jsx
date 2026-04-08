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
      <div className="hidden md:flex flex-wrap items-center justify-center gap-3">
        {options.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onChange(cat)}
              aria-pressed={isActive}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-dark ${
                isActive
                  ? 'bg-primary text-white border-primary shadow-md'
                  : 'bg-white dark:bg-darkHover text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-primary hover:text-primary hover:-translate-y-0.5'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
