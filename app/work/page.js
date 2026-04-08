"use client";
import Work from "../Components/Work";
import { useTheme } from "../context/ThemeContext";
import workData from "../data/work";

export default function WorkPage() {
  const { isDarkMode, setIsDarkMode } = useTheme();

  return (
    <div className="pt-20">
      <Work isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} content={workData} />
    </div>
  );
}
