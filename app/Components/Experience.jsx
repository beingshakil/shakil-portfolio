import React from 'react';

const Experience = () => {
  return (
    <div id='experience' className='w-full px-4 sm:px-6 lg:px-[8%] py-16 scroll-mt-20 bg-gray-50 dark:bg-gray-900'>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h4 className='mb-2 text-lg font-ovo text-blue-600'>Career Path</h4>
          <h2 className='text-4xl md:text-5xl font-bold'>Work Experience</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
        </div>

        {/* Experience timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-gray-700 transform md:translate-x-1"></div>
          
          {/* Experience items */}
          <div className="space-y-12">
            {/* Experience 1 */}
            <div className="relative pl-8 md:pl-0">
              <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 w-6 h-6 rounded-full bg-blue-600 border-4 border-white dark:border-gray-900 z-10"></div>
              <div className="md:ml-[55%] bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">SEO and Data Analyst</h3>
                  <span className="inline-block px-3 py-1 text-sm font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full mt-2 md:mt-0">
                    Jan 2025 – Sep 2025
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4">
                  <a href="https://irdfoundation.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    IRD Foundation
                  </a>
                </h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mt-2 mr-3 flex-shrink-0"></span>
                    <span>Automated workflow processes with Python and JavaScript. Streamlined data processing and reduced manual tasks by developing custom automation scripts, improving team efficiency, and accelerating data-driven decisions.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mt-2 mr-3 flex-shrink-0"></span>
                    <span>Increased website traffic and search rankings by 5x through targeted keyword and competitor research, implementation of Technical SEO strategies, and data optimization using Ahrefs, SEMrush, and Google Search Console.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mt-2 mr-3 flex-shrink-0"></span>
                    <span>Transformed raw data into actionable insights by building automated ETL workflows with Pandas and NumPy, improving data accuracy and usability.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mt-2 mr-3 flex-shrink-0"></span>
                    <span>Collaborated with Web and Database teams to ensure data compliance and optimize website structure, enhancing SEO performance and user experience based on analytical insights.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mt-2 mr-3 flex-shrink-0"></span>
                    <span>Developed interactive Power BI and Excel dashboards to visualize key trends, improving data accessibility and decision-making speed across teams.</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Experience 2 - Replaced with new experience */}
            <div className="relative pl-8 md:pl-0">
              <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 w-6 h-6 rounded-full bg-blue-600 border-4 border-white dark:border-gray-900 z-10"></div>
              <div className="md:mr-[55%] md:ml-0 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">Web Developer</h3>
                  <span className="inline-block px-3 py-1 text-sm font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full mt-2 md:mt-0">
                    Jun 2024 – Dec 2024
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4">Searchaly Agency</h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mt-2 mr-3 flex-shrink-0"></span>
                    <span>Developed responsive web applications using React JS and CSS to enhance user experience, improving performance and scalability through reusable components.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mt-2 mr-3 flex-shrink-0"></span>
                    <span>Designed modular, reusable automation tools that improved team productivity by enabling non-technical stakeholders to generate insights through simple UI triggers.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;