import Contact from "../Components/Contact";
import content from "../data/homepage.json";

const siteUrl = 'https://beingshakil.xyz';

export const metadata = {
  title: 'Contact Md Shakil Hossen — Get In Touch',
  description: 'Contact Md Shakil Hossen for AI Automation, SEO, and Data Analysis services. Based in Dhaka, Bangladesh. Reach out via the contact form or email.',
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/contact`,
    title: 'Contact Md Shakil Hossen — Get In Touch',
    description: 'Contact Md Shakil Hossen for AI Automation, SEO, and Data Analysis services. Based in Dhaka, Bangladesh. Reach out via the contact form or email.',
    siteName: 'Md Shakil Hossen — Portfolio',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Contact Md Shakil Hossen' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Md Shakil Hossen — Get In Touch',
    description: 'Contact Md Shakil Hossen for AI Automation, SEO, and Data Analysis services. Based in Dhaka, Bangladesh. Reach out via the contact form or email.',
    creator: '@beingshakil',
    images: ['/og-image.png'],
  },
};

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${siteUrl}/contact#webpage`,
  url: `${siteUrl}/contact`,
  name: 'Contact — Md Shakil Hossen',
  description: content.contact.content,
  isPartOf: { '@type': 'WebSite', url: siteUrl },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: `${siteUrl}/contact` },
    ],
  },
  about: {
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: 'Md Shakil Hossen',
    url: siteUrl,
    email: content.footer.email,
    telephone: content.footer.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: content.footer.location,
      addressCountry: 'BD',
    },
  },
  inLanguage: 'en-US',
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <div className="pt-20">
        <Contact content={content.contact} />
      </div>
    </>
  );
}
