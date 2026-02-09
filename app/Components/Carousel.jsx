"use client"
import React, { useState } from 'react';

const Carousel = ({content}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? content.cards.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === content.cards.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div id='carousel' className='w-full px-4 sm:px-6 lg:px-[8%] py-16 scroll-mt-20'>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h4 className='mb-2 text-lg font-ovo text-primary'>{content.subtitle}</h4>
          <h2 className='text-4xl md:text-5xl font-bold'>{content.title}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
        </div>

        {/* Carousel container */}
        <div className='relative group'>
          {/* Carousel wrapper */}
          <div className='relative h-96 md:h-[500px] overflow-hidden rounded-2xl shadow-2xl'>
            {content.cards.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {/* Background image */}
                <div
                  className='w-full h-full bg-cover bg-center'
                  style={{ backgroundImage: `url("${slide.image}")` }}
                >
                  {/* Overlay */}
                  <div className='absolute inset-0 bg-gradient-to-r from-dark/70 to-dark/30'></div>

                  {/* Content */}
                  <div className='absolute inset-0 flex flex-col items-start justify-center text-left text-white px-8 md:px-16'>
                    <h3 className='text-3xl md:text-4xl font-bold mb-4 max-w-2xl'>{slide.title}</h3>
                    <p className='text-xl max-w-2xl mb-8'>{slide.content}</p>
                    <button className='px-6 py-3 bg-gradient-to-r from-primaryDark to-primary text-white font-semibold rounded-lg hover:from-primaryDark-dark hover:to-primary-dark transition-all duration-300 transform hover:-translate-y-1 shadow-lg'>
                      {content.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={goToPrev}
            className='absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm'
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className='absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm'
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots indicator */}
          <div className='absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3'>
            {content.cards.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-secondary w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
