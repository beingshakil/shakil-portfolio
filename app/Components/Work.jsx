"use client"
import React, { useMemo, useState } from "react";
import { useScrollReveal, useScrollRevealMultiple } from '../hooks/useScrollReveal';
import CategoryFilter from './CategoryFilter';

const ITEMS_PER_PAGE = 4;

const Work = ({content}) => {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {currentCards.map((project, index) => (
            <div
              key={project.slug || index}
              ref={setCardRef(index)}
              className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 animate-fade-in"
            >
              <div
                className="h-80 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url("${project.bgImage}")` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <div className="transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-300">
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary rounded-full mb-3">
                    Category: {project.badge || project.category}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-200 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.content}
                  </p>

                  <a href={project.link || '#'} className="flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {content.viewProjectText}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-primaryDark/80 to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
