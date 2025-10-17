import React from 'react'
import { assets, serviceData } from '../Assets/assets'
import Image from 'next/image'

const Services = () => {
  // Updated service data to match your requirements (Data Analyst, Web Development, SEO, UI UX Design)
  const updatedServiceData = [
    { 
      icon: assets.web_icon, 
      title: 'Data Analyst', 
      description: 'Analyzing and interpreting complex datasets to uncover trends, provide actionable insights, and support data-driven decision making for businesses.', 
      link: '#' 
    },
    { 
      icon: assets.ui_icon, 
      title: 'SEO', 
      description: 'Optimizing websites to rank higher on search engines, driving organic traffic, and improving online visibility.', 
      link: '#' 
    },
        { 
      icon: assets.mobile_icon, 
      title: 'Web Development', 
      description: 'Building responsive, high-performance websites and web applications using modern technologies and best practices.', 
      link: '#' 
    },
    { 
      icon: assets.graphics_icon, 
      title: 'UI/UX Design', 
      description: 'Creating intuitive and engaging user interfaces with a focus on user experience and visual aesthetics.', 
      link: '#' 
    },
  ];

  return (
    <div id='services' className='w-full px-4 sm:px-6 lg:px-[8%] py-16 scroll-mt-20 bg-gray-50 dark:bg-gray-900'>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h4 className='mb-2 text-lg font-ovo text-blue-600'>What I Offer</h4>
          <h2 className='text-4xl md:text-5xl font-bold'>Our Services</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
          
          <p className='text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6'>
            I offer a range of services to help you succeed in the digital world. From data analysis and SEO to web development and UI/UX design, I turn your ideas into impactful results.
          </p>
        </div>

        {/* Services grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {updatedServiceData.map(({icon, title, description, link}, index) => (
            <div 
              key={index} 
              className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group'
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <Image 
                  src={icon} 
                  alt={title} 
                  className='w-6 h-6 group-hover:invert transition-all duration-300'
                  width={24}
                  height={24}
                />
              </div>
              
              {/* Title */}
              <h3 className='text-xl font-bold my-4 text-gray-800 dark:text-white'>{title}</h3>
              
              {/* Description */}
              <p className='text-gray-600 dark:text-gray-400 mb-6'>{description}</p>
              
              {/* Link */}
              <a 
                href={link} 
                className='flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors duration-300'
              >
                Read More 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>
        
        {/* View All Services button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-semibold rounded-full hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-colors duration-300">
            View All Services
          </button>
        </div>
      </div>
    </div>
  )
}

export default Services