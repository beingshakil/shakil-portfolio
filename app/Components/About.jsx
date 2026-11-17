"use client";
import Image from "next/image";
import { assets, toolsData } from "../Assets/assets";
import SectionHeading, { ArrowLink, Eyebrow, Section } from "./SectionHeading";

const stats = [
  { value: "3.87", label: "CGPA", suffix: "" },
  { value: "3", label: "Years experience", suffix: "+" },
  { value: "03", label: "Research publications", suffix: "" },
];

const SOCIAL = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/md-shakil-hossen/",
    path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
  },
  {
    label: "GitHub",
    href: "https://github.com/beingshakil",
    path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/shakiil.hossen",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/feel._.shakeel",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    label: "ResearchGate",
    href: "https://www.researchgate.net/profile/Md-Hossen-139",
    path: "M7.587 12.194c.305-.224.581-.462.83-.715.249-.253.468-.521.657-.803.189-.283.336-.582.441-.897.105-.315.158-.646.158-.992 0-.441-.07-.852-.211-1.233-.141-.381-.351-.715-.631-1.002-.279-.288-.631-.519-1.056-.694-.424-.174-.919-.261-1.485-.261H3.644v5.597h2.646c.491 0 .923-.075 1.297-.224.374-.149.704-.341.988-.577l-.988.577zm2.413-4.102c0 .647-.116 1.246-.348 1.797-.231.551-.571 1.033-1.02 1.446a6.388 6.388 0 0 1-1.637 1.033c-.636.262-1.373.393-2.211.393H3.644v5.336H1.366V4.144h4.945c.801 0 1.517.126 2.148.378.631.252 1.168.611 1.611 1.077.443.466.782 1.031 1.018 1.696.236.665.354 1.414.354 2.247zm1.189 6.81l5.485-5.542h2.909l-4.223 4.267 4.223 6.47h-2.613l-3.328-5.09-2.453 2.477v2.613h-2.278v-5.195l2.278-2.302v2.302z",
  },
];

// "**bold** rest" -> strong + text
function withBold(text) {
  return text.split(/(\*\*.*?\*\*)/).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-dark dark:text-white">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  );
}

// "**Label:** values" lines -> label / value rows
function SkillRows({ text }) {
  return (
    <dl className="divide-y divide-gray-200 dark:divide-white/10">
      {text.split("\n").map((line) => {
        const match = line.match(/^\*\*(.+?):?\*\*:?\s*(.*)$/);
        const label = match ? match[1].replace(/:$/, "") : "";
        const value = match ? match[2] : line;
        return (
          <div key={line} className="grid gap-1 py-3 sm:grid-cols-[11rem_1fr] sm:gap-4">
            <dt className="font-semibold text-dark dark:text-white">{label}</dt>
            <dd className="text-gray-600 dark:text-gray-400">{value}</dd>
          </div>
        );
      })}
    </dl>
  );
}

// imagePriority: set where the portrait is above the fold (the /about page).
const About = ({ content, action, imagePriority = false }) => {
  return (
    <Section id="about" tone="paper">
      <SectionHeading
        eyebrow={content.eyebrow}
        heading={content.heading}
        description={content.description}
        action={action}
      />

      {/* Portrait + story */}
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-primary/10 shadow-xl">
            <Image
              src={assets.user_image}
              alt={content.title || "Md Shakil Hossen"}
              fill
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover object-top"
              priority={imagePriority}
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <h3 className="text-2xl font-semibold tracking-tight text-dark dark:text-white">
            {content.storyTitle}
          </h3>
          <div className="mt-6 space-y-5 text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            {content.content.map((paragraph, index) => (
              <p key={index}>{withBold(paragraph)}</p>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-6 border-y border-gray-200 dark:border-white/10 py-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-semibold tracking-tight text-dark dark:text-white">
                  {stat.value}
                  <span className="text-primary dark:text-secondary">{stat.suffix}</span>
                </p>
                <p className="mt-2 font-eyebrow text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Social */}
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Eyebrow>Find me on</Eyebrow>
            <div className="flex flex-wrap gap-2">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-dark transition-colors duration-300 hover:border-dark hover:bg-dark hover:text-white dark:border-white/20 dark:text-white dark:hover:border-secondary dark:hover:bg-secondary dark:hover:text-dark"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Highlight cards */}
      <div className="mt-16 md:mt-20 grid gap-6 md:grid-cols-2">
        {content.cards.map((card) => {
          const isProjects = card.title === "Projects";
          return (
            <div
              key={card.title}
              className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-8 md:p-10 transition-colors duration-300 hover:border-primary/40 dark:border-white/10 dark:bg-white/[0.04]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary dark:bg-white/10">
                <Image src={assets[card.iconKey]} alt="" className="h-6 w-6 icon-mono" width={24} height={24} />
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight text-dark dark:text-white">{card.title}</h3>
              <div className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                {card.content.includes("\n") ? <SkillRows text={card.content} /> : <p>{withBold(card.content)}</p>}
              </div>
              {isProjects && (
                <div className="mt-auto pt-6">
                  <ArrowLink href="/work">See my work</ArrowLink>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Tools: centered rows of fixed-size tiles */}
      <div className="mt-16 md:mt-20">
        <Eyebrow center>{content.toolsSectionTitle}</Eyebrow>
        <ul className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-6">
          {toolsData.map((tool) => (
            <li
              key={tool.name}
              className="group relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-md dark:border-white/10 dark:bg-darkHover"
            >
              <Image
                src={tool.src}
                alt={tool.name}
                title={tool.name}
                className={`h-8 w-8 object-contain sm:h-10 sm:w-10 ${tool.name === 'Sanity' ? 'dark:invert' : ''}`}
                width={40}
                height={40}
              />
              <span
                role="tooltip"
                className="pointer-events-none absolute -top-9 left-1/2 z-20 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-dark px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-white dark:text-dark"
              >
                {tool.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default About;
