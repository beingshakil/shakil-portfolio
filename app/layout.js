import { Plus_Jakarta_Sans } from 'next/font/google';
import "./globals.css";
import content from './data/homepage.json';
import { ThemeProvider } from './context/ThemeContext';
import LayoutWrapper from './Components/LayoutWrapper';
import { siteUrl } from './data/site';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: content.meta.title,
  description: content.meta.description,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  keywords: [
    'AI Automation Expert Bangladesh',
    'SEO Expert Bangladesh',
    'Data Analyst Bangladesh',
    'AI Agent Developer',
    'Python Automation',
    'Technical SEO',
    'Machine Learning Bangladesh',
    'Web Scraping',
    'Chrome Extension Development',
    'Md Shakil Hossen',
  ],
  authors: [{ name: 'Md Shakil Hossen', url: siteUrl }],
  creator: 'Md Shakil Hossen',
  // Favicon / touch icons are auto-detected from app/favicon.ico, app/icon.png,
  // and app/apple-icon.png (generated from the hero profile photo).
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: content.meta.title,
    description: content.meta.description,
    siteName: 'Md Shakil Hossen — Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Md Shakil Hossen — AI Automation and SEO Expert in Bangladesh',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: content.meta.title,
    description: content.meta.description,
    creator: '@beingshakil',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'QaAxnJn3CC3FIktiXOSIkdploAsdJwoQwlZXhkW-M1M',
  },
};

// JSON-LD Structured Data
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Md Shakil Hossen',
  url: siteUrl,
  image: '/og-image.jpg',
  sameAs: [
    'https://www.linkedin.com/in/md-shakil-hossen/',
    'https://github.com/beingshakil',
    'https://www.facebook.com/shakiil.hossen',
    'https://www.instagram.com/feel._.shakeel',
    'https://www.researchgate.net/profile/Md-Hossen-139',
  ],
  jobTitle: 'AI Automation and SEO Expert',
  worksFor: {
    '@type': 'Organization',
    name: 'Freelance',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Daffodil International University',
  },
  knowsAbout: [
    'AI Automation',
    'SEO',
    'Data Analysis',
    'Python',
    'Machine Learning',
    'Web Development',
    'Chrome Extension Development',
    'Web Scraping',
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'BD',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Md Shakil Hossen Portfolio',
  url: siteUrl,
  description: content.meta.description,
  author: {
    '@type': 'Person',
    name: 'Md Shakil Hossen',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: '/?s={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='scroll-smooth' suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);}catch(e){}})();`,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${plusJakartaSans.className} antialiased leading-8
         dark:bg-darkTheme dark:text-white`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <ThemeProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
