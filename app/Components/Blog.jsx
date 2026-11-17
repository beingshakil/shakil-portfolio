"use client"
import { useMemo, useState } from 'react';
import CategoryFilter from './CategoryFilter';
import SectionHeading, { Section } from './SectionHeading';
import PostCard from './PostCard';

const ITEMS_PER_PAGE = 6;

const Blog = ({ content }) => {

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


  return (
    <Section id="blog" tone="white">
        <SectionHeading eyebrow={meta.eyebrow} heading={meta.heading} description={meta.description} />

        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onChange={handleCategoryChange}
          label="Filter blog posts by category"
        />

        {/* Blog grid */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {currentPosts.map((post) => (
            <PostCard key={post.slug} post={post} readMoreText={meta.readMoreText} />
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
                    ? "bg-dark text-white dark:bg-secondary dark:text-dark"
                    : "bg-white dark:bg-darkHover text-gray-600 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-white/[0.08]"
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
                  : "bg-white dark:bg-darkHover text-primary hover:bg-primary/10 dark:hover:bg-white/[0.08] shadow-sm cursor-pointer"
              }`}
            >
              Next
            </button>
          </div>
        )}

    </Section>
  );
};

export default Blog;
