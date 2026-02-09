"use client"
import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const CallToAction = ({content}) => {
  const sectionRef = useScrollReveal();

  return (
    <div className='w-full px-4 sm:px-6 lg:px-[8%] py-16 scroll-mt-20 bg-gradient-to-r from-primaryDark to-primary'>
      <div ref={sectionRef} className="max-w-4xl mx-auto text-center">
        <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>
          {content.title}
        </h2>

        <p className='text-xl text-secondary/80 mb-10 max-w-2xl mx-auto'>
          {content.content}
        </p>

        <a
          href={content.buttonHref}
          className='inline-block px-8 py-4 bg-light text-primaryDark font-bold rounded-full shadow-lg hover:bg-secondary transition-all duration-300 transform hover:-translate-y-1'
        >
          {content.buttonText}
        </a>
      </div>
    </div>
  );
};

export default CallToAction;
