import Experience from "../Components/Experience";
import content from "../data/homepage.json";
import { siteUrl } from "../data/site";

export const metadata = {
  title: 'Experience — Md Shakil Hossen | SEO & AI Automation',
  description: 'Professional journey of Md Shakil Hossen: SEO & AI Automation at Musemind and IRD Foundation, plus leadership at DIU Computer and Programming Club.',
  alternates: {
    canonical: `${siteUrl}/experience`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/experience`,
    title: 'Experience — Md Shakil Hossen | SEO & AI Automation',
    description: 'Professional journey of Md Shakil Hossen: SEO & AI Automation at Musemind and IRD Foundation, plus leadership at DIU Computer and Programming Club.',
    siteName: 'Md Shakil Hossen — Portfolio',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Md Shakil Hossen — Experience' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Experience — Md Shakil Hossen | SEO & AI Automation',
    description: 'Professional journey of Md Shakil Hossen: SEO & AI Automation at Musemind and IRD Foundation, plus leadership at DIU Computer and Programming Club.',
    creator: '@beingshakil',
    images: ['/og-image.jpg'],
  },
};

const experiencePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${siteUrl}/experience#webpage`,
  url: `${siteUrl}/experience`,
  name: 'Experience — Md Shakil Hossen',
  description: 'Professional experience and career timeline of Md Shakil Hossen.',
  isPartOf: { '@type': 'WebSite', url: siteUrl },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Experience', item: `${siteUrl}/experience` },
    ],
  },
  mainEntity: {
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: 'Md Shakil Hossen',
    url: siteUrl,
    hasOccupation: content.experience.professional.map(job => ({
      '@type': 'Role',
      roleName: job.title,
      startDate: job.duration.split('–')[0]?.trim(),
      endDate: job.duration.includes('Present') ? undefined : job.duration.split('–')[1]?.trim(),
      worksFor: {
        '@type': 'Organization',
        name: job.company,
        ...(job.companyLink && { url: job.companyLink }),
      },
      description: job.content.join(' '),
    })),
  },
  inLanguage: 'en-US',
};

export default function ExperiencePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(experiencePageSchema) }}
      />
      <div className="pt-20">
        <Experience content={content.experience} />
      </div>
    </>
  );
}
