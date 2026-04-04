"use client";
import Blog from "../Components/Blog";
import { useTheme } from "../context/ThemeContext";
import blogContent from "../data/blog.json";

export default function ExplorePage() {
  const { isDarkMode, setIsDarkMode } = useTheme();

  return (
    <div className="pt-20">
      <Blog isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} content={blogContent} />
    </div>
  );
}
