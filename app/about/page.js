import About from "../Components/About";
import content from "../data/homepage.json";
import { siteUrl } from "../data/site";

// The story paragraphs carry **bold** markers for on-page rendering.
// Structured data must be plain text, so strip them here.
const plainText = (s) => s.replace(/\*\*(.*?)\*\*/g, '$1');

export const metadata = {
  title: 'About — Md Shakil Hossen | AI Automation & SEO Expert',
  description: 'Md Shakil Hossen is an AI Automation and SEO Expert based in Dhaka, Bangladesh. Specialized in Python automation, technical SEO, data analysis, and web development.',
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    type: 'profile',
    url: `${siteUrl}/about`,
    title: 'About — Md Shakil Hossen | AI Automation & SEO Expert',
    description: 'Md Shakil Hossen is an AI Automation and SEO Expert based in Dhaka, Bangladesh. Specialized in Python automation, technical SEO, data analysis, and web development.',
    siteName: 'Md Shakil Hossen — Portfolio',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Md Shakil Hossen — AI Automation and SEO Expert' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About — Md Shakil Hossen | AI Automation & SEO Expert',
    description: 'Md Shakil Hossen is an AI Automation and SEO Expert based in Dhaka, Bangladesh. Specialized in Python automation, technical SEO, data analysis, and web development.',
    creator: '@beingshakil',
    images: ['/og-image.jpg'],
  },
};

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${siteUrl}/about#webpage`,
  url: `${siteUrl}/about`,
  name: 'About — Md Shakil Hossen',
  description: 'Md Shakil Hossen is an AI Automation and SEO Expert based in Dhaka, Bangladesh.',
  isPartOf: { '@type': 'WebSite', url: siteUrl },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'About', item: `${siteUrl}/about` },
    ],
  },
  mainEntity: {
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: 'Md Shakil Hossen',
    url: siteUrl,
    image: `${siteUrl}/og-image.jpg`,
    jobTitle: 'AI Automation and SEO Expert',
    description: plainText(content.about.content.join(' ')),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dhaka',
      addressCountry: 'BD',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Daffodil International University',
    },
    knowsAbout: [
      'AI Automation', 'SEO', 'Data Analysis', 'Python',
      'Machine Learning', 'Web Development', 'Chrome Extension Development', 'Web Scraping',
    ],
    sameAs: [
      'https://www.linkedin.com/in/md-shakil-hossen/',
      'https://github.com/beingshakil',
      'https://www.facebook.com/shakiil.hossen',
      'https://www.instagram.com/feel._.shakeel',
      'https://www.researchgate.net/profile/Md-Hossen-139',
    ],
  },
  inLanguage: 'en-US',
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <div className="pt-20">
        <About content={content.about} />
      </div>
    </>
  );
}
