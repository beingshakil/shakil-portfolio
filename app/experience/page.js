"use client";
import Experience from "../Components/Experience";
import content from "../data/homepage.json";

export default function ExperiencePage() {
  return (
    <div className="pt-20">
      <Experience content={content.experience} />
    </div>
  );
}
