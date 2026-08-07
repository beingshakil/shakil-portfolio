import Services from "../Components/Services";
import content from "../data/homepage.json";
import { siteUrl } from "../data/site";

export const metadata = {
  title: 'Services — AI Automation, SEO & Data Analysis | Md Shakil Hossen',
  description: 'Professional services by Md Shakil Hossen: AI Automation workflows, Technical SEO, Data Analysis & visualization, and Frontend Web Development in Bangladesh.',
  alternates: {
    canonical: `${siteUrl}/services`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/services`,
    title: 'Services — AI Automation, SEO & Data Analysis | Md Shakil Hossen',
    description: 'Professional services by Md Shakil Hossen: AI Automation workflows, Technical SEO, Data Analysis & visualization, and Frontend Web Development in Bangladesh.',
    siteName: 'Md Shakil Hossen — Portfolio',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Md Shakil Hossen — Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services — AI Automation, SEO & Data Analysis | Md Shakil Hossen',
    description: 'Professional services by Md Shakil Hossen: AI Automation workflows, Technical SEO, Data Analysis & visualization, and Frontend Web Development in Bangladesh.',
    creator: '@beingshakil',
    images: ['/og-image.jpg'],
  },
};

const servicesPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${siteUrl}/services#webpage`,
  url: `${siteUrl}/services`,
  name: 'Services — Md Shakil Hossen',
  description: content.services.content,
  isPartOf: { '@type': 'WebSite', url: siteUrl },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteUrl}/services` },
    ],
  },
  inLanguage: 'en-US',
};

const serviceItemSchemas = content.services.cards.map(card => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: card.title,
  description: card.content,
  provider: {
    '@type': 'Person',
    name: 'Md Shakil Hossen',
    url: siteUrl,
  },
  areaServed: { '@type': 'Country', name: 'Bangladesh' },
  serviceType: card.title,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: `${card.title} Offerings`,
    itemListElement: card.bullets.map((bullet, i) => ({
      '@type': 'Offer',
      position: i + 1,
      itemOffered: { '@type': 'Service', name: bullet },
    })),
  },
}));

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesPageSchema) }}
      />
      {serviceItemSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <div className="pt-20">
        <Services content={content.services} />
      </div>
    </>
  );
}
