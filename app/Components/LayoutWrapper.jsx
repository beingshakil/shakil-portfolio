"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useTheme } from "../context/ThemeContext";
import content from "../data/homepage.json";

export default function LayoutWrapper({ children }) {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const pathname = usePathname();

  // The Sanity Studio at /studio is a full-screen app: no site navbar or footer.
  if (pathname?.startsWith("/studio")) {
    return children;
  }

  return (
    <>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} content={content.navbar} />
      {children}
      <Footer content={content.footer} />
    </>
  );
}
