import Header from "./Components/Header";
import FocusStatement from "./Components/FocusStatement";
import About from "./Components/About";
import HowIWork from "./Components/HowIWork";
import Experience from "./Components/Experience";
import Services from "./Components/Services";
import FeaturedProjects from "./Components/FeaturedProjects";
import Contact from "./Components/Contact";
import HomeBlog from "./Components/HomeBlog";
import WorkProcess from "./Components/WorkProcess";
import content from "./data/homepage.json";
import { featuredProjects } from "./data/work";
import { siteUrl } from "./data/site";
import { getBlogData } from "../sanity/lib/posts";

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

export default async function Home() {
  const blogData = await getBlogData();

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
      <FocusStatement content={content.focus} />
      <About content={content.about} />
      <Services content={content.services} />
      <HowIWork content={content.howIWork} />
      <FeaturedProjects projects={featuredProjects} exploreHref="/work" heading={content.featuredWork} />
      <Experience content={content.experience} hideTabs={true} />
      <WorkProcess content={content.process} />
      <HomeBlog content={content.blogSection} posts={blogData.posts} />
      <Contact content={content.contact} />
    </>
  );
}
