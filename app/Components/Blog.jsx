"use client"
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useScrollReveal, useScrollRevealMultiple } from '../hooks/useScrollReveal';
import CategoryFilter from './CategoryFilter';

const ITEMS_PER_PAGE = 3;

const Blog = ({ content }) => {
  const router = useRouter();
  const headerRef = useScrollReveal();

  const meta = content.meta;
  const allPosts = content.posts || [];
  const categories = content.categories || [];

  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const posts = useMemo(() => {
    if (activeCategory === 'All') return allPosts;
    return allPosts.filter((p) => p.category === activeCategory);
  }, [allPosts, activeCategory]);

  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const currentPosts = posts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const setCardRef = useScrollRevealMultiple(currentPosts.length);

  return (
    <div id="blog" className="w-full px-4 sm:px-6 lg:px-[8%] py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-10">
          <h4 className="mb-2 text-lg font-ovo text-primary">{meta.subtitle}</h4>
          <h2 className="text-4xl md:text-5xl font-bold">{meta.title}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>

          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
            {meta.description}
          </p>
        </div>

        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onChange={handleCategoryChange}
          label="Filter blog posts by category"
        />

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post, index) => (
            <div
              key={post.slug}
              ref={setCardRef(index)}
              onClick={() => router.push(`/blog/${post.slug}`)}
              className="group flex flex-col bg-white dark:bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-200 cursor-pointer animate-fade-in"
            >
              {/* Blog image */}
              <div className="h-48 overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url("${post.image}")` }}
                ></div>
              </div>

              {/* Blog content */}
              <div className="p-6 flex flex-col flex-1">
                {/* Tag & Date */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full">
                    Category: {post.category || post.subtitle}
                  </span>
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {post.heading || post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.metadata?.description || ''}
                </p>

                {/* Read More — pinned to bottom */}
                <span className="mt-auto inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all duration-300">
                  {meta.readMoreText}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
            No posts in this category yet.
          </p>
        )}

        {/* Pagination UI */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  currentPage === page
                    ? "bg-primary text-white shadow-md"
                    : "bg-white dark:bg-darkHover text-gray-600 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primaryDark/30"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                currentPage === totalPages
                  ? "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                  : "bg-white dark:bg-darkHover text-primary hover:bg-primary/10 dark:hover:bg-primaryDark/30 shadow-sm cursor-pointer"
              }`}
            >
              Next
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Blog;
