import { ArrowLink, Eyebrow, Section } from "./SectionHeading";

const HowIWork = ({ content }) => {
  return (
    <Section id="how-i-work" tone="paper" className="pt-0">
      <div className="grid overflow-hidden rounded-2xl border border-gray-200 bg-white lg:grid-cols-12 dark:border-white/10 dark:bg-white/[0.04]">
        <div className="bg-dark p-8 text-white sm:p-10 lg:col-span-7">
          <Eyebrow tone="dark">{content.eyebrow}</Eyebrow>
          <h2 className="mt-5 max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl">
            {content.heading}
          </h2>

          <ol className="mt-8 grid gap-3 sm:grid-cols-3">
            {content.steps.map((step, index) => (
              <li key={step.title} className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
                <span className="font-eyebrow text-[10px] font-bold tracking-[0.2em] text-secondary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col justify-between p-8 sm:p-10 lg:col-span-5">
          <div>
            <Eyebrow>{content.outcomeEyebrow}</Eyebrow>
            <p className="mt-5 text-4xl font-semibold tracking-tight text-dark dark:text-white">
              {content.outcomeValue}
            </p>
            <p className="mt-2 max-w-sm text-base leading-relaxed text-gray-600 dark:text-gray-400">
              {content.outcomeDescription}
            </p>
          </div>
          <ArrowLink href={content.action.href} className="mt-10 self-start">
            {content.action.label}
          </ArrowLink>
        </div>
      </div>
    </Section>
  );
};

export default HowIWork;
