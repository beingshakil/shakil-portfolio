"use client";
import Contact from "../Components/Contact";
import content from "../data/homepage.json";

export default function ContactPage() {
  return (
    <div className="pt-20">
      <Contact content={content.contact} />
    </div>
  );
}
