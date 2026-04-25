"use client";
import About from "../Components/About";
import content from "../data/homepage.json";

export default function AboutPage() {
  return (
    <div className="pt-20">
      <About content={content.about} />
    </div>
  );
}
