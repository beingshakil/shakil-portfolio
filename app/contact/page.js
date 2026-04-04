"use client";
import Contact from "../Components/Contact";
import { useTheme } from "../context/ThemeContext";
import content from "../data/homepage.json";

export default function ContactPage() {
  const { isDarkMode, setIsDarkMode } = useTheme();

  return (
    <div className="pt-20">
      <Contact isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} content={content.contact} />
    </div>
  );
}
