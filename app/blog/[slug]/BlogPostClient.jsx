"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { blogMeta, getPostBySlug, blogPosts } from '../../data/blog/index';

function toId(str) {
  return str.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().replace(/\s+/g, '-');
}

const AI_TOOLS = [
  {
    name: 'ChatGPT',
    href: 'https://chatgpt.com',
    defaultColor: '#374151',
    hoverColor: '#10a37f',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0L4.154 13.65A4.496 4.496 0 0 1 2.34 7.896zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.664 2.692a4.505 4.505 0 0 1-.676 8.123v-5.678a.79.79 0 0 0-.381-.686zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.664-2.687a4.505 4.505 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
      </svg>
    ),
  },
  {
    name: 'Claude',
    href: 'https://claude.ai',
    defaultColor: '#374151',
    hoverColor: '#CC785C',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M11 2h2v20h-2zM3.05 7.27l1-1.73 17.32 10-1 1.73zM3.05 16.73l17.32-10 1 1.73-17.32 10z" />
      </svg>
    ),
  },
  {
    name: 'Perplexity',
    href: 'https://www.perplexity.ai',
    defaultColor: '#374151',
    hoverColor: '#20808D',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2v4.5l-3.18-3.18-1.41 1.41L10.59 7.8 6 9.46v2l4.59 1.66-3.18 3.18 1.41 1.41L12 14.53V19h2v-4.47l3.18 3.18 1.41-1.41-3.18-3.18L20 11.46v-2l-4.59-1.66 3.18-3.18-1.41-1.41L14 6.53V2h-2z" />
      </svg>
    ),
  },
  {
    name: 'Grok',
    href: 'https://x.com/grok',
    defaultColor: '#374151',
    hoverColor: '#111827',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.65 14.19L7.81 7.35A8 8 0 0 1 16.65 16.19zm-9.3-.38L16.19 6.81A8 8 0 0 0 7.35 15.81z" />
      </svg>
    ),
  },
  {
    name: 'Gemini',
    href: 'https://gemini.google.com',
    defaultColor: '#4285F4',
    hoverColor: '#1a73e8',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2L13.8 10.2L22 12L13.8 13.8L12 22L10.2 13.8L2 12L10.2 10.2Z" />
      </svg>
    ),
  },
];

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
  if (typeof block.content === 'string') {
    const html = { __html: block.content };
    const id = block.title ? toId(block.title) : undefined;

    switch (block.type) {
      case 'keypoints':
        return (
          <div id={id} key={index} className="my-8 scroll-mt-28">
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
              <h3 id={id} className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4 scroll-mt-28">
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

function BlogSidebar({ blocks, title }) {
  const headings = blocks.filter(b => b.title && b.title.trim() !== '');
  const [hoveredAI, setHoveredAI] = useState(null);
  const [hoveredShare, setHoveredShare] = useState(null);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (headings.length === 0) return;
    const ids = headings.map(b => toId(b.title));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-10% 0% -70% 0%', threshold: 0 }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings.length]);

  const share = (platform) => {
    if (typeof window === 'undefined') return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title || '');
    const targets = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
    };
    window.open(targets[platform], '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  const SHARE = [
    {
      key: 'facebook',
      color: '#1877F2',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      ),
    },
    {
      key: 'twitter',
      color: '#000000',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      key: 'linkedin',
      color: '#0A66C2',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
      ),
    },
    {
      key: 'whatsapp',
      color: '#25D366',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {headings.length > 0 && (
        <div className="bg-white dark:bg-darkHover rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
            <h4 className="font-bold text-gray-900 dark:text-white text-sm">Table Of Contents</h4>
          </div>
          <nav className="px-5 py-1">
            {headings.map((block, i) => {
              const id = toId(block.title);
              const isActive = activeId === id;
              return (
                <div key={i}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className={`block py-2.5 text-sm font-medium transition-all duration-200 leading-snug ${
                      isActive
                        ? 'text-primary dark:text-primaryDark pl-3 border-l-2 border-primary dark:border-primaryDark -ml-px'
                        : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primaryDark'
                    }`}
                  >
                    {block.title}
                  </a>
                  {i < headings.length - 1 && (
                    <div className="border-b border-gray-100 dark:border-gray-800" />
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      )}

      <div className="bg-white dark:bg-darkHover rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-gray-900 dark:text-white">Share</span>
          <div className="flex items-center gap-3">
            {SHARE.map((s, i) => (
              <button
                key={s.key}
                onClick={() => share(s.key)}
                onMouseEnter={() => setHoveredShare(i)}
                onMouseLeave={() => setHoveredShare(null)}
                aria-label={`Share on ${s.key}`}
                style={{
                  color: hoveredShare === i ? s.color : '#4B5563',
                  transition: 'color 0.2s ease',
                }}
              >
                {s.icon}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          {AI_TOOLS.map((tool, i) => (
            <a
              key={tool.name}
              href={tool.href}
              target="_blank"
              rel="noopener noreferrer"
              title={tool.name}
              onMouseEnter={() => setHoveredAI(i)}
              onMouseLeave={() => setHoveredAI(null)}
              style={{
                color: hoveredAI === i ? tool.hoverColor : tool.defaultColor,
                transition: 'color 0.2s ease',
              }}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800"
            >
              {tool.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BlogPostClient({ slug }) {
  const post = getPostBySlug(slug);

  useEffect(() => {
    const tables = document.querySelectorAll('.blog-rich table');
    tables.forEach(table => {
      const parent = table.parentElement;
      if (parent && parent.tagName === 'DIV') {
        parent.classList.add('blog-table-scroll');
        parent.removeAttribute('style');
      } else if (parent && !parent.classList.contains('blog-table-scroll')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'blog-table-scroll';
        parent.insertBefore(wrapper, table);
        wrapper.appendChild(table);
      }
    });
  }, [slug]);

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

  const contentBlocks = post.contents || post.content || [];
  const postImageAlt = post.imageAlt || post.heading || post.title || '';

  const relatedPosts = blogPosts
    .filter(p => p.slug !== slug)
    .sort((a, b) => {
      const currentCat = post.category || post.subtitle;
      const aMatch = (a.category || a.subtitle) === currentCat ? 1 : 0;
      const bMatch = (b.category || b.subtitle) === currentCat ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, 3);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-[8%] py-16 pt-32">
      <div className="max-w-[1400px] mx-auto mb-6">
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

      <div className="max-w-[1400px] mx-auto flex flex-col xl:flex-row gap-8 items-start">

        <aside className="hidden xl:block w-72 shrink-0 sticky top-28 self-start">
          <BlogSidebar
            blocks={contentBlocks}
            title={post.heading || post.title || ''}
          />
        </aside>

        <div className="flex-1 min-w-0">
          {post.image && (
            <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
              <img src={post.image} alt={postImageAlt} className="w-full h-64 md:h-96 object-cover" />
            </div>
          )}

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

            <div className="flex items-center gap-2 text-sm mb-8">
              <Link href="/explore" className="text-primary font-semibold hover:underline">BLOG</Link>
              <span className="text-gray-400">&gt;</span>
              <span className="text-primary font-semibold uppercase">{post.category || post.subtitle}</span>
            </div>
          </div>

          <article>
            {contentBlocks.map((block, index) => (
              <ContentRenderer key={index} block={block} index={index} />
            ))}
          </article>

          <div className="xl:hidden mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
            <BlogSidebar
              blocks={contentBlocks}
              title={post.heading || post.title || ''}
            />
          </div>

          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Related Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group flex flex-col bg-white dark:bg-darkHover rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-800"
                  >
                    {related.image && (
                      <div className="h-40 overflow-hidden">
                        <img
                          src={related.image}
                          alt={related.imageAlt || related.heading || related.title || ''}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    )}
                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 text-xs font-semibold bg-primary/10 text-primary rounded-full">
                          {related.category || related.subtitle}
                        </span>
                        <span className="text-xs text-gray-500">{related.date}</span>
                      </div>
                      <h3 className="text-sm font-bold text-gray-800 dark:text-white mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {related.heading || related.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                        {related.metadata?.description || ''}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1 text-primary font-medium text-xs group-hover:gap-2 transition-all duration-300">
                        Read More
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

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
    </div>
  );
}
