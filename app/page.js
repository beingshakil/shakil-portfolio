import Header from "./Components/Header";
import About from "./Components/About";
import Experience from "./Components/Experience";
import Services from "./Components/Services";
import StickyProjects from "./Components/StickyProjects";
import Contact from "./Components/Contact";
import Blog from "./Components/Blog";
import CallToAction from "./Components/CallToAction";
import content from "./data/homepage.json";
import blogData from "./data/blog/index";
import { featuredProjects } from "./data/work";
import { siteUrl } from "./data/site";

export const metadata = {
  title: content.meta.title,
  description: content.meta.description,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: content.meta.title,
    description: content.meta.description,
    siteName: 'Md Shakil Hossen — Portfolio',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Md Shakil Hossen — AI Automation and SEO Expert in Bangladesh' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: content.meta.title,
    description: content.meta.description,
    creator: '@beingshakil',
    images: ['/og-image.jpg'],
  },
};

const homePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${siteUrl}/#webpage`,
  url: siteUrl,
  name: content.meta.title,
  description: content.meta.description,
  isPartOf: { '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: siteUrl },
  about: { '@type': 'Person', '@id': `${siteUrl}/#person`, name: 'Md Shakil Hossen' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    ],
  },
  inLanguage: 'en-US',
};

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Md Shakil Hossen — AI Automation & SEO Services',
  url: siteUrl,
  description: content.meta.description,
  provider: { '@type': 'Person', name: 'Md Shakil Hossen', url: siteUrl },
  areaServed: { '@type': 'Country', name: 'Bangladesh' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services',
    itemListElement: content.services.cards.map(card => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: card.title,
        description: card.content,
      },
    })),
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <Header content={content.hero} />
      <About content={content.about} />
      <Experience content={content.experience} hideTabs={true} />
      <Services content={content.services} />
      <StickyProjects projects={featuredProjects} exploreHref="/work" />
      <Blog content={blogData} />
      <CallToAction content={content.callToAction} />
      <Contact content={content.contact} />
    </>
  );
}
