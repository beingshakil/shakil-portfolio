"use client";
import Blog from "../Components/Blog";
import { useTheme } from "../context/ThemeContext";
import blogData from "../data/blog";

export default function ExplorePage() {
  const { isDarkMode, setIsDarkMode } = useTheme();

  return (
    <div className="pt-20">
      <Blog isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} content={blogData} />
    </div>
  );
}
