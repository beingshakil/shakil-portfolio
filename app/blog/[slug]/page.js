"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import blogContent from '../../data/blog.json';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import homepageContent from '../../data/homepage.json';
import { useEffect, useState } from "react";

const ContentRenderer = ({ block, index }) => {
  switch (block.type) {
    case 'text':
      return (
        <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-justify">
          {block.value}
        </p>
      );
    case 'heading':
      return (
        <h3 key={index} className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
          {block.value}
        </h3>
      );
    case 'image':
      return (
        <div key={index} className="my-8 rounded-xl overflow-hidden shadow-lg">
          <img src={block.src} alt={block.alt || ''} className="w-full h-auto object-cover" />
        </div>
      );
    case 'images':
      return (
        <div key={index} className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {block.items.map((img, i) => (
            <div key={i} className="rounded-xl overflow-hidden shadow-lg">
              <img src={img.src} alt={img.alt || ''} className="w-full h-auto object-cover" />
            </div>
          ))}
        </div>
      );
    case 'keypoints':
      return (
        <div key={index} className="my-8 grid grid-cols-1 lg:grid-cols-1 gap-0">
          <div className="bg-primary/10 dark:bg-primaryDark/20 rounded-2xl p-8">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-5">{block.title}</h4>
            <ul className="space-y-4">
              {block.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default function BlogPost({ params }) {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.theme) {
        return localStorage.theme === "dark";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });
  const slug = params.slug;

  const meta = blogContent.meta;

  // Find post by slug field or by key
  let post = null;
  const posts = Object.entries(blogContent).filter(([key]) => key !== 'meta');

  // First try to find by slug field
  const postEntry = posts.find(([key, value]) => value.slug === slug);
  if (postEntry) {
    post = postEntry[1];
  } else {
    // Fallback to key-based lookup
    post = blogContent[slug];
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "";
    }
  }, [isDarkMode]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <button
            onClick={() => router.push('/#blog')}
            className="text-primary hover:underline"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} content={homepageContent.navbar} />

      <div className="w-full px-4 sm:px-6 lg:px-[8%] py-16 pt-32">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => router.push('/#blog')}
            className="inline-flex items-center gap-2 text-primary font-medium mb-8 hover:gap-3 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {meta.backText}
          </button>

          {/* Blog header with cover image */}
          <div className="mb-8">
            <div className="bg-primary/10 dark:bg-primaryDark/20 rounded-2xl p-8 md:p-12 mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Author info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  by <strong className="text-gray-800 dark:text-gray-200">{post.author}</strong>
                </span>
                <span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {post.date}
                </span>
                <span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Reading Time: {post.readingTime}
                </span>
              </div>
            </div>

            {/* Breadcrumb & tag */}
            <div className="flex items-center gap-2 text-sm mb-8">
              <button onClick={() => router.push('/#blog')} className="text-primary font-semibold hover:underline">BLOG</button>
              <span className="text-gray-400">&gt;</span>
              <span className="text-primary font-semibold uppercase">{post.subtitle}</span>
            </div>
          </div>

          {/* Blog content */}
          <article>
            {post.content.map((block, index) => (
              <ContentRenderer key={index} block={block} index={index} />
            ))}
          </article>

          {/* Bottom back button */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => router.push('/#blog')}
              className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {meta.backText}
            </button>
          </div>
        </div>
      </div>

      <Footer isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} content={homepageContent.footer} />
    </>
  );
}
