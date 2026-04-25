"use client";
import Image from "next/image";
import React from "react";
import { assets, toolsData } from "../Assets/assets";
import {
  useScrollReveal,
  useScrollRevealMultiple,
} from "../hooks/useScrollReveal";

const stats = [
  { value: "3.87", label: "CGPA", suffix: "" },
  { value: "2", label: "Years Professional Experience", suffix: "+" },
  { value: "03", label: "Research Publication", suffix: "" },
];

const About = ({ content }) => {
  const headerRef = useScrollReveal();
  const contentRef = useScrollReveal();
  const toolsRef = useScrollReveal();
  const setCardRef = useScrollRevealMultiple(content.cards.length);

  return (
    <div
      id="about"
      className="w-full px-4 sm:px-6 lg:px-[8%] py-16 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-16">
          <h4 className="mb-2 text-lg font-ovo text-primary">
            {content.subtitle}
          </h4>
          <h2 className="text-4xl md:text-5xl font-bold">{content.title}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
        </div>

        {/* Main content */}
        <div
          ref={contentRef}
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
        >
          {/* Text content - Left side */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-6">{content.storyTitle}</h3>
            {content.content.map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-justify"
              >
                {paragraph}
              </p>
            ))}

            {/* Stats bar */}
            <div className="grid grid-cols-3 gap-4 my-8 py-6 border-t border-b border-gray-200 dark:border-gray-700 w-full">
              {stats.map((stat, i) => (
                <div key={i} className="text-left flex flex-col justify-center">
                  <p className="text-2xl md:text-4xl font-bold text-primary leading-none">
                    {stat.value}
                    <span className="text-xl">{stat.suffix}</span>
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400 mt-2 font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Social Links Row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-8">
              <span className="text-gray-600 dark:text-gray-400 font-bold text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2">
                Find me at:
                <span className="w-8 h-[1px] bg-gray-300 dark:bg-gray-600"></span>
              </span>
              <div className="flex items-center gap-4">
                {/* LinkedIn */}
                <a 
                  href="https://www.linkedin.com/in/md-shakil-hossen/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#0077b5]/10 text-[#0077b5] hover:bg-[#0077b5] hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
                  title="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                {/* GitHub */}
                <a 
                  href="https://github.com/beingshakil" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#333]/10 text-[#333] dark:text-gray-200 hover:bg-[#333] hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
                  title="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                {/* Facebook */}
                <a 
                  href="https://www.facebook.com/shakiil.hossen" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#1877f2]/10 text-[#1877f2] hover:bg-[#1877f2] hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
                  title="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a 
                  href="https://www.instagram.com/feel._.shakeel" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#e4405f]/10 text-[#e4405f] hover:bg-[#e4405f] hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
                  title="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                {/* ResearchGate */}
                <a 
                  href="https://www.researchgate.net/profile/Md-Hossen-139" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#00ccbb]/10 text-[#00ccbb] hover:bg-[#00ccbb] hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
                  title="ResearchGate"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.587 12.194c.305-.224.581-.462.83-.715.249-.253.468-.521.657-.803.189-.283.336-.582.441-.897.105-.315.158-.646.158-.992 0-.441-.07-.852-.211-1.233-.141-.381-.351-.715-.631-1.002-.279-.288-.631-.519-1.056-.694-.424-.174-.919-.261-1.485-.261H3.644v5.597h2.646c.491 0 .923-.075 1.297-.224.374-.149.704-.341.988-.577l-.988.577zm2.413-4.102c0 .647-.116 1.246-.348 1.797-.231.551-.571 1.033-1.02 1.446a6.388 6.388 0 0 1-1.637 1.033c-.636.262-1.373.393-2.211.393H3.644v5.336H1.366V4.144h4.945c.801 0 1.517.126 2.148.378.631.252 1.168.611 1.611 1.077.443.466.782 1.031 1.018 1.696.236.665.354 1.414.354 2.247zm1.189 6.81l5.485-5.542h2.909l-4.223 4.267 4.223 6.47h-2.613l-3.328-5.09-2.453 2.477v2.613h-2.278v-5.195l2.278-2.302v2.302z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Image - Right side */}
          <div className="w-full lg:w-2/5 flex justify-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={assets.user_image}
                alt={content.title || "Md Shakil Hossen"}
                className="w-full h-auto object-cover"
                width={500}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Info cards */}
        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {content.cards.map((card, index) => {
              const isProjects = card.title === "Projects";
              return (
                <div
                  key={index}
                  ref={setCardRef(index)}
                  onClick={
                    isProjects
                      ? () => {
                          const el = document.getElementById("work");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }
                      : undefined
                   }
                   className="group border border-gray-200 dark:border-gray-700 rounded-[2rem] p-10 cursor-pointer hover:-translate-y-2 hover:scale-[1.01] transition-all duration-300 shadow-sm hover:shadow-2xl h-full"
                 >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 dark:bg-primaryDark/30 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                    <Image
                      src={assets[card.iconKey]}
                      alt={card.title}
                      className="w-8 h-8 icon-mono"
                      width={32}
                      height={32}
                    />
                  </div>
                  <h3 className="my-6 font-bold text-xl text-gray-800 dark:text-white">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed whitespace-pre-line text-justify">
                    {card.content.split(/(\*\*.*?\*\*)/).map((part, i) => 
                      part.startsWith('**') && part.endsWith('**') 
                        ? <strong key={i} className="text-gray-900 dark:text-white font-bold">{part.slice(2, -2)}</strong> 
                        : part
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tools section */}
        <div ref={toolsRef} className="mt-16">
          <h4 className="my-6 text-xl font-semibold text-gray-800 dark:text-white text-center">
            {content.toolsSectionTitle}
          </h4>
          <div className="flex flex-wrap justify-center gap-6">
            {toolsData.map((tool, index) => (
              <div
                className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-md bg-white dark:bg-darkHover"
                key={index}
              >
                <Image
                  src={tool}
                  alt="Tool"
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                  width={40}
                  height={40}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
