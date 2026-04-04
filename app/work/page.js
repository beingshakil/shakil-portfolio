"use client";
import Work from "../Components/Work";
import { useTheme } from "../context/ThemeContext";
import content from "../data/homepage.json";

export default function WorkPage() {
  const { isDarkMode, setIsDarkMode } = useTheme();

  return (
    <div className="pt-20">
      <Work isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} content={content.work} />
    </div>
  );
}
