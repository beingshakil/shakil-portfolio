"use client";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useTheme } from "../context/ThemeContext";
import content from "../data/homepage.json";

export default function LayoutWrapper({ children }) {
  const { isDarkMode, setIsDarkMode } = useTheme();

  return (
    <>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} content={content.navbar} />
      {children}
      <Footer isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} content={content.footer} />
    </>
  );
}
