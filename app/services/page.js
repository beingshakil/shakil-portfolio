"use client";
import Services from "../Components/Services";
import content from "../data/homepage.json";

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <Services content={content.services} />
    </div>
  );
}
