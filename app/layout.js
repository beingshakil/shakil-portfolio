import { Outfit, Ovo } from 'next/font/google';
import "./globals.css";

const outfit  = Outfit({
  subsets: ["latin"], weight: ["400", "500", "600", "500"]
});

const ovo  = Ovo({
  subsets: ["latin"], weight: ["400"]
});


export const metadata = {
  title: "Md Shakil Hossen - Striving for Excellence",
  description: "Result driven SEO & Data Analyst with experience in AI automation, analytics and reporting. Skilled in implementing SEO strategies to enhance online presence",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='scroll-smooth dark'>
      <body
        className={`${outfit.className} ${ovo.className} antialiased leading-8 overflow-x-hidden
         dark:bg-darkTheme dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}