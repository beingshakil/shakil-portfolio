"use client"


/**
 * Responsive category filter.
 * - Mobile (<md): native <select> dropdown - compact and ergonomic on touch.
 * - Desktop (>=md): pill-button row with active state.
 */
const CategoryFilter = ({ categories, activeCategory, onChange, label = 'Filter by category' }) => {
  const options = ['All', ...categories];

  return (
    <div className="mb-12">
      {/* Mobile dropdown */}
      <div className="md:hidden flex">
        <label htmlFor="category-filter" className="sr-only">{label}</label>
        <div className="relative w-full max-w-xs">
          <select
            id="category-filter"
            value={activeCategory}
            onChange={(e) => onChange(e.target.value)}
            aria-label={label}
            className="w-full appearance-none px-5 py-3 pr-10 rounded-full text-sm font-semibold border border-gray-300 bg-white dark:bg-white/[0.04] dark:border-white/15 text-dark dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
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
      <div className="hidden md:flex flex-wrap items-center gap-2">
        {options.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onChange(cat)}
              aria-pressed={isActive}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isActive
                  ? 'bg-dark border-dark text-white dark:bg-secondary dark:border-secondary dark:text-dark'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-dark hover:text-dark dark:bg-white/[0.04] dark:border-white/15 dark:text-gray-300 dark:hover:border-white dark:hover:text-white'
              }`}
            >
              {/* Category Icons */}
              {cat === 'All' ? null : (
                <svg className={`w-4 h-4 ${isActive ? 'text-current' : 'text-primary dark:text-secondary'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
