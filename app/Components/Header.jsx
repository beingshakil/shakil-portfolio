import Image from 'next/image'
import React from 'react'
import { assets } from '../Assets/assets'

const Header = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background with dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
        {/* You can replace this with an actual background image or video */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-30"></div>
      </div>
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Profile image */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <Image 
                src={assets.profile_img} 
                alt="Md Shakil Hossen" 
                className="w-full h-full object-cover"
                width={128}
                height={128}
              />
            </div>
          </div>
          
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
            Step into the World of Data
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
            Striving for Excellence!!
            <span className="block mt-2 font-medium">I don't just follow trends. I set insights and strategy.</span>
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#about" 
              className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1"
            >
              Discover My Story
            </a>
            
            <a 
              href="#contact" 
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:-translate-y-1"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="block text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </div>
  )
}

export default Header