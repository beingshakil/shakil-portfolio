import Blog from "../Components/Blog";
import blogData from "../data/blog/index";
import { siteUrl } from "../data/site";

export const metadata = {
  title: 'Blog & Insights — Data, SEO & AI | Md Shakil Hossen',
  description: 'Tutorials and insights on Data Analysis, SEO strategies, AI Automation, and Web Development by Md Shakil Hossen. Real-world guides backed by hands-on experience.',
  alternates: {
    canonical: `${siteUrl}/explore`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/explore`,
    title: 'Blog & Insights — Data, SEO & AI | Md Shakil Hossen',
    description: 'Tutorials and insights on Data Analysis, SEO strategies, AI Automation, and Web Development by Md Shakil Hossen. Real-world guides backed by hands-on experience.',
    siteName: 'Md Shakil Hossen — Portfolio',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Blog & Insights — Md Shakil Hossen' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog & Insights — Data, SEO & AI | Md Shakil Hossen',
    description: 'Tutorials and insights on Data Analysis, SEO strategies, AI Automation, and Web Development by Md Shakil Hossen. Real-world guides backed by hands-on experience.',
    creator: '@beingshakil',
    images: ['/og-image.jpg'],
  },
};

const blogListingSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${siteUrl}/explore#webpage`,
  url: `${siteUrl}/explore`,
  name: 'Blog & Insights — Md Shakil Hossen',
  description: blogData.meta.description,
  isPartOf: { '@type': 'WebSite', url: siteUrl },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/explore` },
    ],
  },
  mainEntity: {
    '@type': 'ItemList',
    name: 'Blog Posts',
    numberOfItems: blogData.posts.length,
    itemListElement: blogData.posts.map((post, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${siteUrl}/blog/${post.slug}`,
      name: post.heading || post.title,
      description: post.metadata?.description || '',
    })),
  },
  inLanguage: 'en-US',
};

export default function ExplorePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListingSchema) }}
      />
      <div className="pt-20">
        <Blog content={blogData} />
      </div>
    </>
  );
}
