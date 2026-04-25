"use client"
import { useMemo, useState } from "react";
import { useScrollReveal, useScrollRevealMultiple } from '../hooks/useScrollReveal';
import CategoryFilter from './CategoryFilter';

const ITEMS_PER_PAGE = 6;

const Work = ({ content }) => {
  const headerRef = useScrollReveal();

  const allCards = content.cards || [];
  const categories = content.categories || Array.from(new Set(allCards.map(c => c.category || c.badge)));

  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const cards = useMemo(() => {
    if (activeCategory === 'All') return allCards;
    return allCards.filter((c) => (c.category || c.badge) === activeCategory);
  }, [allCards, activeCategory]);

  const totalPages = Math.ceil(cards.length / ITEMS_PER_PAGE);
  const currentCards = cards.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const setCardRef = useScrollRevealMultiple(currentCards.length);

  return (
    <div id="work" className="w-full px-4 sm:px-6 lg:px-[8%] py-16 scroll-mt-20 bg-light dark:bg-dark">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-10">
          <h4 className="text-center mb-2 text-lg font-ovo text-primary">{content.subtitle}</h4>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{content.title}</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>

          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
            {content.content}
          </p>
        </div>

        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onChange={handleCategoryChange}
          label="Filter projects by category"
        />

        {/* Work grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {currentCards.map((project, index) => (
            <div
              key={project.slug || index}
              ref={setCardRef(index)}
              className="group bg-white dark:bg-darkHover rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-800 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative h-64 sm:h-72 overflow-hidden rounded-t-[2rem]">
                <img 
                  src={project.bgImage} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                {/* Category Badge */}
                <div className="absolute bottom-4 left-4 bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                  <span className="text-white text-xs font-semibold">
                    Category: {project.badge || project.category}
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="px-6 py-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  {project.title}
                </h3>

                {/* Features List + View Project Action */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    {(project.features || ["Responsive Design", "Performance Optimized", "Clean Code"]).map((feature, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                        <div className="p-1 rounded-md bg-gray-50 dark:bg-dark/40 border border-gray-100 dark:border-gray-700">
                          <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {feature.toLowerCase().includes('seo') || feature.toLowerCase().includes('search') ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            ) : feature.toLowerCase().includes('perf') || feature.toLowerCase().includes('speed') ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            ) : feature.toLowerCase().includes('mobile') || feature.toLowerCase().includes('resp') ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            ) : feature.toLowerCase().includes('data') || feature.toLowerCase().includes('visual') ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            )}
                          </svg>
                        </div>
                        <span className="text-[11px] sm:text-xs font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <a 
                    href={project.link || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 ml-auto flex-shrink-0 font-bold text-xs"
                  >
                    <span>{content.viewProjectText || 'View Project'}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cards.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
            No projects in this category yet.
          </p>
        )}

        {/* Pagination UI */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  currentPage === page
                    ? "bg-primary text-white shadow-md"
                    : "bg-white dark:bg-darkHover text-gray-600 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primaryDark/30"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                currentPage === totalPages
                  ? "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                  : "bg-white dark:bg-darkHover text-primary hover:bg-primary/10 dark:hover:bg-primaryDark/30 shadow-sm cursor-pointer"
              }`}
            >
              Next
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Work;
