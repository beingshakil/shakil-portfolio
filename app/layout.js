import { Outfit, Ovo } from 'next/font/google';
import "./globals.css";
import content from './data/homepage.json';
import { ThemeProvider } from './context/ThemeContext';
import LayoutWrapper from './Components/LayoutWrapper';

const outfit  = Outfit({
  subsets: ["latin"], weight: ["400", "500", "600"]
});

const ovo  = Ovo({
  subsets: ["latin"], weight: ["400"]
});

export const metadata = {
  title: content.meta.title,
  description: content.meta.description,
  alternates: {
    canonical: 'https://beingshakil.xyz',
  },
  verification: {
    google: 'QaAxnJn3CC3FIktiXOSIkdploAsdJwoQwlZXhkW-M1M',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='scroll-smooth dark' suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${outfit.className} ${ovo.className} antialiased leading-8 overflow-x-hidden
         dark:bg-darkTheme dark:text-white`}
      >
        <ThemeProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
