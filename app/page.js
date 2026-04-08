"use client";

import Header from "./Components/Header";
import About from "./Components/About";
import Experience from "./Components/Experience";
import Services from "./Components/Services";
import Work from "./Components/Work";
import Contact from "./Components/Contact";
import Carousel from "./Components/Carousel";
import Blog from "./Components/Blog";
import CallToAction from "./Components/CallToAction";
import { useTheme } from "./context/ThemeContext";
import content from "./data/homepage.json";
import blogData from "./data/blog";
import workData from "./data/work";

export default function Home() {
  const { isDarkMode, setIsDarkMode } = useTheme();

  return (
    <>
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} content={content.hero} />
      <About isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} content={content.about} />
      <Experience isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} content={content.experience} />
      <Services isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} content={content.services} />
      <Carousel isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} content={content.carousel} />
      <Work isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} content={workData} />
      <Blog isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} content={blogData} />
      <CallToAction isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} content={content.callToAction} />
      <Contact isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} content={content.contact} />
    </>
  );
}
