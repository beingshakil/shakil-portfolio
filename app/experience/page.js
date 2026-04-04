"use client";
import Experience from "../Components/Experience";
import { useTheme } from "../context/ThemeContext";
import content from "../data/homepage.json";

export default function ExperiencePage() {
  const { isDarkMode, setIsDarkMode } = useTheme();

  return (
    <div className="pt-20">
      <Experience isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} content={content.experience} />
    </div>
  );
}
