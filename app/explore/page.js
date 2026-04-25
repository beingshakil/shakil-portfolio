"use client";
import Blog from "../Components/Blog";
import blogData from "../data/blog";

export default function ExplorePage() {
  return (
    <div className="pt-20">
      <Blog content={blogData} />
    </div>
  );
}
