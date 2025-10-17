import React from 'react';

const CallToAction = () => {
  return (
    <div className='w-full px-4 sm:px-6 lg:px-[8%] py-16 scroll-mt-20 bg-gradient-to-r from-blue-600 to-purple-600'>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>
          Ready to Transform Your Data Into Actionable Insights?
        </h2>
        
        <p className='text-xl text-blue-100 mb-10 max-w-2xl mx-auto'>
          Let's collaborate to turn your data challenges into opportunities. 
          Get in touch today to discuss how my expertise in SEO and Data Analysis can drive your business forward.
        </p>
        
        <a 
          href='#contact' 
          className='inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1'
        >
          Get In Touch
        </a>
      </div>
    </div>
  );
};

export default CallToAction;