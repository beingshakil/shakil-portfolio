import { blogPosts } from './data/blog/index';
import { siteUrl } from './data/site';

function parseDate(dateStr) {
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? new Date('2026-01-01') : d;
}

export default function sitemap() {
  const staticRoutes = [
    { url: siteUrl,                       lastModified: new Date('2026-06-12'), changeFrequency: 'monthly',  priority: 1.0 },
    { url: `${siteUrl}/about`,            lastModified: new Date('2026-06-12'), changeFrequency: 'monthly',  priority: 0.8 },
    { url: `${siteUrl}/experience`,       lastModified: new Date('2026-06-12'), changeFrequency: 'monthly',  priority: 0.8 },
    { url: `${siteUrl}/services`,         lastModified: new Date('2026-06-12'), changeFrequency: 'monthly',  priority: 0.8 },
    { url: `${siteUrl}/work`,             lastModified: new Date('2026-06-12'), changeFrequency: 'monthly',  priority: 0.8 },
    { url: `${siteUrl}/explore`,          lastModified: new Date('2026-06-12'), changeFrequency: 'weekly',   priority: 0.9 },
    { url: `${siteUrl}/contact`,          lastModified: new Date('2026-06-12'), changeFrequency: 'yearly',   priority: 0.5 },
  ];

  const blogRoutes = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: parseDate(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
