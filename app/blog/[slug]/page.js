"use client"
import React from 'react';
import Link from 'next/link';
import { blogMeta, getPostBySlug } from '../../data/blog';

/**
 * ContentRenderer
 * Handles two JSON content-block schemas:
 *
 * SCHEMA A (old — used by professional blog posts):
 *   { type: "text"|"heading"|"image"|"images"|"keypoints", value/src/items/points/title }
 *
 * SCHEMA B (new — used by life/travel posts):
 *   { type: "text"|"image"|"keypoints", title?, content: "<html string>" }
 */
const ContentRenderer = ({ block, index }) => {
  // ── Schema B: block already has a pre-built HTML string in `content` ──
  if (typeof block.content === 'string') {
    const html = { __html: block.content };

    switch (block.type) {
      case 'keypoints':
        return (
          <div key={index} className="my-8">
            <div className="bg-primary/10 dark:bg-primaryDark/20 rounded-2xl p-8">
              {block.title && (
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-5">
                  {block.title}
                </h4>
              )}
              <div
                className="blog-rich text-gray-700 dark:text-gray-300"
                dangerouslySetInnerHTML={html}
              />
            </div>
          </div>
        );

      case 'image':
        return (
          <div
            key={index}
            className="my-8 rounded-xl overflow-hidden shadow-lg blog-rich"
            dangerouslySetInnerHTML={html}
          />
        );

      case 'text':
      default:
        return (
          <div key={index} className="mb-8">
            {block.title && (
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
                {block.title}
              </h3>
            )}
            <div
              className="blog-rich text-gray-700 dark:text-gray-300 leading-relaxed text-justify"
              dangerouslySetInnerHTML={html}
            />
          </div>
        );
    }
  }

  // ── Schema A: structured object with value / src / points fields ──
  switch (block.type) {
    case 'keypoints':
      return (
        <div key={index} className="my-8">
          <div className="bg-primary/10 dark:bg-primaryDark/20 rounded-2xl p-8">
            {block.title && (
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-5">
                {block.title}
              </h4>
            )}
            {block.points && (
              <ul className="space-y-3">
                {block.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <span className="mt-1 w-2 h-2 rounded-full bg-primary shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
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
        <div key={index} className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {(block.items || []).map((img, i) => (
            <div key={i} className="rounded-xl overflow-hidden shadow-lg">
              <img src={img.src} alt={img.alt || ''} className="w-full h-auto object-cover" />
            </div>
          ))}
        </div>
      );

    case 'text':
    default:
      return (
        <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-justify">
          {block.value}
        </p>
      );
  }
};

export default function BlogPost({ params }) {
  const slug = params.slug;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <Link href="/explore" className="text-primary hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Support both `post.contents` (new) and `post.content` array (old schema A)
  const contentBlocks = post.contents || post.content || [];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-[8%] py-16 pt-32">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-primary font-medium mb-8 hover:gap-3 transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {blogMeta.backText}
        </Link>

        {/* Cover image */}
        {post.image && (
          <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
            <img src={post.image} alt={post.heading || post.title} className="w-full h-64 md:h-96 object-cover" />
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="bg-primary/10 dark:bg-primaryDark/20 rounded-2xl p-8 md:p-12 mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {post.heading || post.title}
            </h1>

            {post.metadata?.description && (
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                {post.metadata.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-2">
                by <strong className="text-gray-800 dark:text-gray-200">{post.author}</strong>
              </span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>Reading Time: {post.readingTime}</span>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-8">
            <Link href="/explore" className="text-primary font-semibold hover:underline">BLOG</Link>
            <span className="text-gray-400">&gt;</span>
            <span className="text-primary font-semibold uppercase">{post.category || post.subtitle}</span>
          </div>
        </div>

        {/* Content */}
        <article>
          {contentBlocks.map((block, index) => (
            <ContentRenderer key={index} block={block} index={index} />
          ))}
        </article>

        {/* Bottom back */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {blogMeta.backText}
          </Link>
        </div>
      </div>
    </div>
  );
}
