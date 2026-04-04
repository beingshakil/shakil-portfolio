"use client";
import Services from "../Components/Services";
import { useTheme } from "../context/ThemeContext";
import content from "../data/homepage.json";

export default function ServicesPage() {
  const { isDarkMode, setIsDarkMode } = useTheme();

  return (
    <div className="pt-20">
      <Services isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} content={content.services} />
    </div>
  );
}
