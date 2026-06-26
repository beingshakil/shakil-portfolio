import { getPostBySlug } from '../../data/blog/index';
import BlogPostClient from './BlogPostClient';

const siteUrl = 'https://beingshakil.xyz';

function toISODate(dateStr) {
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? dateStr : d.toISOString().split('T')[0];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found — Md Shakil Hossen',
      description: 'The requested blog post could not be found.',
    };
  }

  const title = post.metadata?.title || post.heading || post.title;
  const description = post.metadata?.description || '';
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const imageUrl = post.image ? `${siteUrl}${post.image}` : `${siteUrl}/og-image.jpg`;
  const imageAlt = post.imageAlt || post.heading || post.title || '';
  const publishedDate = toISODate(post.date);

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
      images: [{ url: imageUrl, width: 1200, height: 630, alt: imageAlt }],
      publishedTime: publishedDate,
      authors: [post.author || 'Md Shakil Hossen'],
      section: post.category || post.subtitle,
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
  const post = getPostBySlug(slug);

  if (!post) {
    return <BlogPostClient slug={slug} />;
  }

  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const imageUrl = post.image ? `${siteUrl}${post.image}` : undefined;
  const publishedDate = toISODate(post.date);
  const title = post.metadata?.title || post.heading || post.title;
  const description = post.metadata?.description || '';

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    ...(imageUrl && { image: imageUrl }),
    author: {
      '@type': 'Person',
      name: post.author || 'Md Shakil Hossen',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Person',
      name: 'Md Shakil Hossen',
      url: siteUrl,
      image: `${siteUrl}/og-image.jpg`,
    },
    datePublished: publishedDate,
    dateModified: publishedDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    url: postUrl,
    articleSection: post.category || post.subtitle,
    inLanguage: 'en-US',
    ...(post.readingTime && {
      timeRequired: `PT${post.readingTime.replace(/[^0-9]/g, '')}M`,
    }),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/explore` },
      { '@type': 'ListItem', position: 3, name: post.heading || post.title, item: postUrl },
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
      <BlogPostClient slug={slug} />
    </>
  );
}
