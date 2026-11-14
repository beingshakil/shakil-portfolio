import { notFound } from 'next/navigation';
import BlogPostClient from './BlogPostClient';
import { siteUrl } from '../../data/site';
import { getAllPosts, getPostBySlug, pickRelatedPosts } from '../../../sanity/lib/posts';

// Pre-render every published post at build time. Posts published later are
// rendered on their first visit (dynamicParams defaults to true).
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | Md Shakil Hossen',
      description: 'The requested blog post could not be found.',
    };
  }

  const title = post.metadata.title;
  const description = post.metadata.description;
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const imageUrl = post.ogImage || `${siteUrl}/og-image.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      type: 'article',
      url: postUrl,
      title,
      description,
      siteName: 'Md Shakil Hossen — Portfolio',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.imageAlt }],
      publishedTime: post.isoDate,
      authors: [post.author],
      section: post.category,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@beingshakil',
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getPostBySlug(slug), getAllPosts()]);

  if (!post) {
    notFound();
  }

  const relatedPosts = pickRelatedPosts(post, allPosts);
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.metadata.title,
    description: post.metadata.description,
    ...(post.ogImage && { image: post.ogImage }),
    author: {
      '@type': 'Person',
      name: post.author,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Person',
      name: 'Md Shakil Hossen',
      url: siteUrl,
      image: `${siteUrl}/og-image.jpg`,
    },
    datePublished: post.isoDate,
    dateModified: post.isoDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    url: postUrl,
    articleSection: post.category,
    inLanguage: 'en-US',
    timeRequired: `PT${post.readingMinutes}M`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/explore` },
      { '@type': 'ListItem', position: 3, name: post.heading, item: postUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogPostClient post={post} relatedPosts={relatedPosts} />
    </>
  );
}
