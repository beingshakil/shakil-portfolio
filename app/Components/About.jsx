import Image from 'next/image'
import React from 'react'
import { assets, infoList, toolsData } from '../Assets/assets'

const About = () => {
  return (
    <div id='about' className='w-full px-4 sm:px-6 lg:px-[8%] py-16 scroll-mt-20'>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h4 className='mb-2 text-lg font-ovo text-blue-600'>Introduction</h4>
          <h2 className='text-4xl md:text-5xl font-bold'>Who I AM</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
        </div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text content - Left side */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-6">My Story & Mission</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              I am an experienced Data Analyst and SEO Specialist with expertise in transforming complex data into actionable insights. 
              Throughout my career, I have had the privilege of collaborating with prestigious organizations, contributing to their 
              success and growth through data-driven strategies.
            </p>
            
            <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              My mission is to bridge the gap between data and business strategy, helping organizations make informed decisions 
              that drive growth and competitive advantage. With a strong foundation in both technical analysis and strategic thinking, 
              I aim to contribute to workflow improvements while continuing to grow professionally.
            </p>
            
            <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-300 transform hover:-translate-y-1">
              Learn More
            </button>
          </div>
          
          {/* Image - Right side */}
          <div className="w-full lg:w-2/5 flex justify-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src={assets.user_image} 
                alt='Md Shakil Hossen' 
                className='w-full h-auto object-cover'
                width={500}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
          </div>
        </div>
        
        {/* Info cards - Updated with education */}
        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Education */}
            <div className='border border-gray-200 dark:border-gray-700 rounded-xl p-6 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-800 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-lg'>
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <Image 
                  src={assets.edu_icon} 
                  alt="Education" 
                  className='w-6 h-6'
                  width={24}
                  height={24}
                />
              </div>
              <h3 className='my-4 font-bold text-xl text-gray-800 dark:text-white'>Education</h3>
              <p className='text-gray-600 dark:text-gray-400'>
                BSc. in Computer Science and Engineering<br/>
                Daffodil International University<br/>
                Sep 2020 – Sep 2024
              </p>
            </div>
            
            {/* Projects */}
            <div className='border border-gray-200 dark:border-gray-700 rounded-xl p-6 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-800 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-lg'>
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <Image 
                  src={assets.project_icon} 
                  alt="Projects" 
                  className='w-6 h-6'
                  width={24}
                  height={24}
                />
              </div>
              <h3 className='my-4 font-bold text-xl text-gray-800 dark:text-white'>Projects</h3>
              <p className='text-gray-600 dark:text-gray-400'>Built more than 5 projects in Data Analysis, SEO, and Web Development</p>
            </div>
            
            {/* Languages */}
            <div className='border border-gray-200 dark:border-gray-700 rounded-xl p-6 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-800 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-lg'>
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <Image 
                  src={assets.code_icon} 
                  alt="Languages" 
                  className='w-6 h-6'
                  width={24}
                  height={24}
                />
              </div>
              <h3 className='my-4 font-bold text-xl text-gray-800 dark:text-white'>Languages</h3>
              <p className='text-gray-600 dark:text-gray-400'>Python, Flask, React Js, Next Js, JavaScript, HTML, CSS</p>
            </div>
          </div>
        </div>
        
        {/* Tools section */}
        <div className="mt-16">
          <h4 className='my-6 text-xl font-semibold text-gray-800 dark:text-white'>Tools I Use</h4>
          <div className="flex flex-wrap justify-center gap-6">
            {toolsData.map((tool, index) => (
              <div 
                className='flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-md bg-white dark:bg-gray-800' 
                key={index}
              >
                <Image 
                  src={tool} 
                  alt='Tool' 
                  className='w-8 h-8 sm:w-10 sm:h-10 object-contain'
                  width={40}
                  height={40}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default About