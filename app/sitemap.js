import { siteUrl } from './data/site';
import { getAllPosts } from '../sanity/lib/posts';

function parseDate(isoDate) {
  const d = new Date(`${isoDate}T00:00:00Z`);
  return isNaN(d.getTime()) ? new Date('2026-01-01') : d;
}

export default async function sitemap() {
  const blogPosts = await getAllPosts();

  const staticRoutes = [
    { url: siteUrl,                 lastModified: new Date('2026-06-12') },
    { url: `${siteUrl}/about`,      lastModified: new Date('2026-06-12') },
    { url: `${siteUrl}/experience`, lastModified: new Date('2026-06-12') },
    { url: `${siteUrl}/services`,   lastModified: new Date('2026-06-12') },
    { url: `${siteUrl}/work`,       lastModified: new Date('2026-06-12') },
    { url: `${siteUrl}/explore`,    lastModified: new Date('2026-06-12') },
    { url: `${siteUrl}/contact`,    lastModified: new Date('2026-06-12') },
  ];

  const blogRoutes = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: parseDate(post.isoDate),
  }));

  return [...staticRoutes, ...blogRoutes];
}
