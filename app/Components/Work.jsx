"use client"
import React from "react";
import { useScrollReveal, useScrollRevealMultiple } from '../hooks/useScrollReveal';

const Work = ({content}) => {
  const headerRef = useScrollReveal();
  const setCardRef = useScrollRevealMultiple(content.cards.length);

  return (
    <div id="work" className="w-full px-4 sm:px-6 lg:px-[8%] py-16 scroll-mt-20 bg-light dark:bg-dark">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-16">
          <h4 className="text-center mb-2 text-lg font-ovo text-primary">{content.subtitle}</h4>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{content.title}</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>

          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
            {content.content}
          </p>
        </div>

        {/* Work grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {content.cards.map((project, index) => (
            <div
              key={index}
              ref={setCardRef(index)}
              className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              {/* Project image */}
              <div
                className="h-80 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url("${project.bgImage}")` }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
              </div>

              {/* Project content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <div className="transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-300">
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary rounded-full mb-3">
                    {project.badge}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-200 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.content}
                  </p>

                  {/* Action button */}
                  <a href={project.link || '#'} className="flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {content.viewProjectText}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primaryDark/80 to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Show more button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-gradient-to-r from-primaryDark to-primary text-white font-semibold rounded-full hover:from-primaryDark-dark hover:to-primary-dark transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
            {content.showMoreText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Work;
