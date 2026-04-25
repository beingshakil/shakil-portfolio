"use client";

import Header from "./Components/Header";
import About from "./Components/About";
import Experience from "./Components/Experience";
import Services from "./Components/Services";
import Work from "./Components/Work";
import Contact from "./Components/Contact";
import Blog from "./Components/Blog";
import CallToAction from "./Components/CallToAction";
import content from "./data/homepage.json";
import blogData from "./data/blog";
import workData from "./data/work";

export default function Home() {
  return (
    <>
      <Header content={content.hero} />
      <About content={content.about} />
      <Experience content={content.experience} hideTabs={true} />
      <Services content={content.services} />
      <Work content={workData} />
      <Blog content={blogData} />
      <CallToAction content={content.callToAction} />
      <Contact content={content.contact} />
    </>
  );
}
