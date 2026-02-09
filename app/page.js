"use client";

import Navbar from "./Components/Navbar";
import Header from "./Components/Header";
import About from "./Components/About";
import Experience from "./Components/Experience";
import Services from "./Components/Services";
import Work from "./Components/Work";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Carousel from "./Components/Carousel";
import Blog from "./Components/Blog";
import CallToAction from "./Components/CallToAction";
import { useEffect, useState } from "react";
import content from "./data/homepage.json";
import blogContent from "./data/blog.json";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.theme) {
        return localStorage.theme === "dark";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "";
    }
  }, [isDarkMode]);

  return (
    <>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} content={content.navbar} />
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} content={content.hero} />
      <About isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} content={content.about} />
      <Experience isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} content={content.experience} />
      <Services isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} content={content.services} />
      <Carousel isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} content={content.carousel} />
      <Work isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} content={content.work} />
      <Blog isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} content={blogContent} />
      <CallToAction isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} content={content.callToAction} />
      <Contact isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} content={content.contact} />
      <Footer isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} content={content.footer} />
    </>
  );
}
