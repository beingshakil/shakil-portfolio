"use client"
// One blog card, shared by the homepage Blog section and /explore.
import Link from 'next/link';
import { ArrowLink } from './SectionHeading';

const Dot = () => <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" aria-hidden="true" />;

export default function PostCard({ post, readMoreText = 'Read more' }) {
  const href = `/blog/${post.slug}`;
  const image = post.cardImage || post.image;

  return (
    <article className="group flex flex-col">
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className="block aspect-[16/10] overflow-hidden rounded-2xl bg-primary/10"
      >
        {image ? (
          <img
            src={image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center font-eyebrow text-xs uppercase tracking-[0.25em] text-primary">
            {post.category}
          </span>
        )}
      </Link>

      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-eyebrow text-[11px] uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
        <span className="font-bold text-accent">{post.category}</span>
        <Dot />
        <time dateTime={post.isoDate}>{post.date}</time>
        <Dot />
        <span>{post.readingMinutes} min read</span>
      </div>

      <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-dark dark:text-white">
        <Link href={href} className="transition-colors hover:text-primary dark:hover:text-secondary">
          {post.heading}
        </Link>
      </h3>

      {post.metadata?.description && (
        <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400 line-clamp-2">
          {post.metadata.description}
        </p>
      )}

      <div className="mt-auto pt-5">
        <ArrowLink href={href}>
          {readMoreText}
          <span className="sr-only">: {post.heading}</span>
        </ArrowLink>
      </div>
    </article>
  );
}
