"use client";
import About from "../Components/About";
import { useTheme } from "../context/ThemeContext";
import content from "../data/homepage.json";

export default function AboutPage() {
  const { isDarkMode, setIsDarkMode } = useTheme();

  return (
    <div className="pt-20">
      <About isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} content={content.about} />
    </div>
  );
}
