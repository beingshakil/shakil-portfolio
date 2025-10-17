import React from "react";
import { assets, workData } from "../Assets/assets";
import Image from "next/image";

const Work = () => {
  // Updated work data with more descriptive content
  const updatedWorkData = [
    {
      title: 'Frontend Project',
      description: 'Web Development',
      details: 'Modern responsive website built with React and Next.js, featuring interactive UI components and smooth animations.',
      bgImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
    {
      title: 'Bahari Site',
      description: 'E-commerce Website',
      details: 'Full-featured online shopping platform with product catalog, cart functionality, and secure payment integration.',
      bgImage: 'https://images.unsplash.com/photo-1591369822091-8b8285d1000e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
    {
      title: 'SEO Optimization',
      description: 'Search Engine Optimization',
      details: 'Comprehensive SEO strategy implementation including keyword research, on-page optimization, and performance tracking.',
      bgImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
    {
      title: 'Deep Learning',
      description: 'Neural Networks Implementation',
      details: 'Advanced machine learning models for data analysis and pattern recognition using TensorFlow and Python.',
      bgImage: 'https://images.unsplash.com/photo-1677442135722-5f11e06a4e6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
  ];

  return (
    <div id="work" className="w-full px-4 sm:px-6 lg:px-[8%] py-16 scroll-mt-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h4 className="text-center mb-2 text-lg font-ovo text-blue-600">My Portfolio</h4>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">My Latest Work</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
            Explore my recent projects showcasing expertise in web development, SEO, and data analysis. 
            Each project reflects my commitment to quality and innovation.
          </p>
        </div>

        {/* Work grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {updatedWorkData.map((project, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              {/* Project image */}
              <div 
                className="h-80 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url("${project.bgImage}")` }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              
              {/* Project content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <div className="transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-300">
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-600 rounded-full mb-3">
                    {project.description}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-200 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.details}
                  </p>
                  
                  {/* Action button */}
                  <button className="flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Project
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-purple-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Show more button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
            Show More Projects
          </button>
        </div>
      </div>
    </div>
  );
};

export default Work;