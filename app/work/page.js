import Work from "../Components/Work";
import workData from "../data/work";
import { siteUrl } from "../data/site";

export const metadata = {
  title: 'My Work — Portfolio & Projects | Md Shakil Hossen',
  description: '50+ projects by Md Shakil Hossen in AI Automation, SEO campaigns, Data Analysis dashboards, and Web Development. Real results, real impact.',
  alternates: {
    canonical: `${siteUrl}/work`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/work`,
    title: 'My Work — Portfolio & Projects | Md Shakil Hossen',
    description: '50+ projects by Md Shakil Hossen in AI Automation, SEO campaigns, Data Analysis dashboards, and Web Development. Real results, real impact.',
    siteName: 'Md Shakil Hossen — Portfolio',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Md Shakil Hossen — Portfolio Projects' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Work — Portfolio & Projects | Md Shakil Hossen',
    description: '50+ projects by Md Shakil Hossen in AI Automation, SEO campaigns, Data Analysis dashboards, and Web Development. Real results, real impact.',
    creator: '@beingshakil',
    images: ['/og-image.jpg'],
  },
};

const workPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${siteUrl}/work#webpage`,
  url: `${siteUrl}/work`,
  name: 'Portfolio & Projects — Md Shakil Hossen',
  description: 'A curated portfolio of projects across AI Automation, SEO, Data Analysis, and Web Development.',
  isPartOf: { '@type': 'WebSite', url: siteUrl },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'My Work', item: `${siteUrl}/work` },
    ],
  },
  author: {
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: 'Md Shakil Hossen',
    url: siteUrl,
  },
  inLanguage: 'en-US',
};

export default function WorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workPageSchema) }}
      />
      <div className="pt-20">
        <Work content={workData} />
      </div>
    </>
  );
}
