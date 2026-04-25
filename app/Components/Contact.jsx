"use client"

import Image from 'next/image'
import { useState } from 'react'
import { assets } from '../Assets/assets'
import { useScrollReveal } from '../hooks/useScrollReveal'

const Contact = ({ content }) => {
    const sectionRef = useScrollReveal();
    const [result, setResult] = useState("");

    const onSubmit = async (event) => {
      event.preventDefault();
      setResult(content.sendingText);
      const formData = new FormData(event.target);

      formData.append("access_key", content.web3formsKey);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult(content.successText);
        event.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    };

  return (
    <div id="contact" className='w-full px-[12%] py-10 scroll-mt-20'>
      <div ref={sectionRef}>
        <h2 className="text-center text-5xl font-ovo">{content.title}</h2>

        <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo">
          {content.content}
        </p>

        <form onSubmit={onSubmit} className='max-w-2xl mx-auto'>

            <div className='grid grid-cols-auto gap-6 mt-10 mb-6'>
                <div>
                  <label htmlFor="contact-name" className="sr-only">{content.namePlaceholder}</label>
                  <input id="contact-name" type="text" placeholder={content.namePlaceholder} required
                    aria-label={content.namePlaceholder}
                    className='w-full flex-1 p-3 outline-none border-[0.5px] border-primary/40
                    rounded-md bg-white dark:bg-darkHover dark:text-light dark:border-primaryDark/50
                    focus:ring-2 focus:ring-primary focus:border-primary transition-all' name='name'/>
                </div>

                <div>
                  <label htmlFor="contact-email" className="sr-only">{content.emailPlaceholder}</label>
                  <input id="contact-email" type="email" placeholder={content.emailPlaceholder} required
                    aria-label={content.emailPlaceholder}
                    className='w-full flex-1 p-3 outline-none border-[0.5px] border-primary/40
                    rounded-md bg-white dark:bg-darkHover dark:text-light dark:border-primaryDark/50
                    focus:ring-2 focus:ring-primary focus:border-primary transition-all' name='email'/>
                </div>
            </div>
            <label htmlFor="contact-message" className="sr-only">{content.messagePlaceholder}</label>
            <textarea id="contact-message" rows='6' placeholder={content.messagePlaceholder} required
              aria-label={content.messagePlaceholder}
              className='w-full p-4 outline-none border-[0.5px] border-primary/40
              rounded-md bg-white dark:bg-darkHover dark:text-light dark:border-primaryDark/50 mb-6
              focus:ring-2 focus:ring-primary focus:border-primary transition-all' name='message'></textarea>

            <button type='submit' aria-label={content.submitText}
            className='py-3 px-8 w-max flex items-center justify-between gap-2 bg-primaryDark
            text-white rounded-full mx-auto hover:bg-dark hover:scale-105 hover:shadow-xl duration-500
            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-dark'>
              {content.submitText} <Image src={assets.right_arrow_white} alt='Submit' className='w-4'/>
            </button>

            <p className='mt-4 text-center'>{result}</p>

        </form>
      </div>
    </div>
  )
}

export default Contact
