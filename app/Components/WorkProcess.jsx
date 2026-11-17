"use client"
// "Working process": a phone mockup on the left whose screen follows the
// step you are reading on the right. On desktop the phone stays pinned while
// the steps scroll past; on smaller screens it sits above the steps and
// cycles through its screens on its own.
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import SectionHeading, { Section } from './SectionHeading';
import { assets } from '../Assets/assets';

// Heroicons (outline, 24px) paths for the step markers.
const STEP_ICON_PATHS = {
  phone:
    'M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z',
  map: 'M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z',
  code: 'M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5',
  trend: 'M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941',
  chat: 'M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z',
};

const StepIcon = ({ name }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d={STEP_ICON_PATHS[name] || STEP_ICON_PATHS.chat} />
  </svg>
);

const Check = ({ className = 'h-3 w-3' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className={className} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

// Staggered entrance for items inside the visible screen.
const enter = (active, i, base = 200, step = 380) => ({
  opacity: active ? 1 : 0,
  transform: active ? 'none' : 'translateY(10px)',
  transitionDelay: active ? `${base + i * step}ms` : '0ms',
});

/* ───────────────────────── Phone screens ───────────────────────── */

const CHAT_DISCOVERY = [
  { from: 'client', text: 'Hi Shakil! Our team spends hours every week copying data between tools.' },
  { from: 'me', text: "That's exactly what I automate. Can we hop on a quick call so I can see your workflow?" },
  { from: 'client', text: 'Sure, when are you free?' },
  { from: 'me', text: 'Pick any slot that works for you:', link: 'calendly.com/being-shakill' },
  { from: 'client', text: 'Booked for Tuesday!' },
];

const CHAT_SUPPORT = [
  { from: 'client', text: 'Quick one: can we add a weekly summary email to the dashboard?' },
  { from: 'me', text: 'Done. It goes out every Monday at 9 AM.' },
  { from: 'client', text: 'Perfect, thank you!' },
  { from: 'me', text: "Anytime. I'm here whenever you need me." },
];

function ChatScreen({ messages, active, day }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-dark/5 px-4 pb-3 pt-3">
        <Image src={assets.profile_img} alt="" width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
        <div className="min-w-0 leading-tight">
          <p className="text-[13px] font-semibold text-dark">Md Shakil Hossen</p>
          <p className="text-[11px] text-primary">Replies within an hour</p>
        </div>
      </div>

      <div className="flex-1 space-y-2 overflow-hidden px-3.5 py-3">
        <p className="pb-1 text-center text-[10px] text-gray-400">{day}</p>
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex transition-all duration-500 ease-out ${m.from === 'client' ? 'justify-end' : 'justify-start'}`}
            style={enter(active, i, 250, 450)}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-3 py-2 text-[12.5px] leading-snug ${
                m.from === 'client' ? 'rounded-br-md bg-dark text-white' : 'rounded-bl-md bg-white text-dark shadow-sm'
              }`}
            >
              {m.text}
              {m.link && <span className="mt-1 block font-semibold text-primaryDark underline underline-offset-2">{m.link}</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="px-3.5 pb-7">
        <div className="flex items-center rounded-full border border-dark/10 bg-white py-1.5 pl-4 pr-1.5 text-[12px] text-gray-400">
          Message
          <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-dark text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-3 w-3" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m-6 6 6-6 6 6" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

const PLAN_ITEMS = [
  { label: 'Workflow audit', done: true },
  { label: 'Data sources mapped', done: true },
  { label: 'Success metrics agreed', done: true },
  { label: 'Build & test', done: false },
  { label: 'Launch & handover', done: false },
];

function PlanScreen({ active }) {
  return (
    <div className="flex h-full flex-col px-5 pt-4">
      <p className="font-eyebrow text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Project plan</p>
      <p className="mt-1 text-lg font-semibold leading-tight text-dark">Workflow automation</p>

      <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex justify-between text-[11px] text-gray-500">
          <span>Week 1 of 4</span>
          <span>25%</span>
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-dark/10">
          <div className="h-full rounded-full bg-secondary transition-all duration-1000 ease-out" style={{ width: active ? '25%' : '0%', transitionDelay: active ? '300ms' : '0ms' }} />
        </div>
      </div>

      <ul className="mt-3 space-y-2">
        {PLAN_ITEMS.map((item, i) => (
          <li key={item.label} className="flex items-center gap-3 rounded-xl bg-white px-3.5 py-2.5 shadow-sm transition-all duration-500 ease-out" style={enter(active, i, 350, 220)}>
            <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${item.done ? 'bg-dark text-secondary' : 'border border-dark/20'}`}>
              {item.done && <Check />}
            </span>
            <span className={`text-[12.5px] ${item.done ? 'text-dark' : 'text-gray-400'}`}>{item.label}</span>
          </li>
        ))}
      </ul>

      <div className="mt-3 rounded-xl border border-dashed border-dark/15 px-3.5 py-2.5 text-[11px] text-gray-500 transition-all duration-500" style={enter(active, PLAN_ITEMS.length, 350, 220)}>
        Next: build sprint starts Monday
      </div>
    </div>
  );
}

const PIPELINE = [
  { label: 'Google Sheets', note: 'Source data' },
  { label: 'Python + Pandas', note: 'Clean and dedupe' },
  { label: 'AI enrichment', note: 'Prompted LLM' },
  { label: 'Dashboard + Slack', note: 'Daily report' },
];

function BuildScreen({ active }) {
  return (
    <div className="flex h-full flex-col px-5 pt-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-eyebrow text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Automation</p>
          <p className="mt-1 text-lg font-semibold leading-tight text-dark">Lead pipeline</p>
        </div>
        <span className="mt-1 flex items-center gap-1.5 rounded-full bg-dark px-2.5 py-1 text-[10px] font-semibold text-secondary">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" />
          Running
        </span>
      </div>

      <div className="relative mt-4 space-y-2.5">
        <span className="absolute bottom-5 left-[22px] top-5 w-px bg-dark/15" aria-hidden="true" />
        <span className="process-flow-dot absolute left-[19px] h-[7px] w-[7px] rounded-full bg-secondary ring-2 ring-paper" aria-hidden="true" />
        {PIPELINE.map((node, i) => (
          <div key={node.label} className="relative flex items-center gap-3 rounded-xl bg-white p-2.5 shadow-sm transition-all duration-500 ease-out" style={enter(active, i, 250, 260)}>
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-eyebrow text-[10px] font-bold text-primaryDark">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="leading-tight">
              <p className="text-[12.5px] font-semibold text-dark">{node.label}</p>
              <p className="text-[10.5px] text-gray-500">{node.note}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 space-y-0.5 rounded-xl bg-dark p-3 font-eyebrow text-[10px] leading-relaxed text-white/80 transition-all duration-500" style={enter(active, PIPELINE.length, 250, 260)}>
        <p><span className="text-secondary">✓</span> 1,240 rows cleaned</p>
        <p><span className="text-secondary">✓</span> 312 leads enriched</p>
        <p><span className="text-secondary">✓</span> Report sent to Slack</p>
      </div>
    </div>
  );
}

const BARS = [18, 22, 21, 28, 34, 39, 46, 55, 63, 72, 84, 96];

function ResultsScreen({ active }) {
  return (
    <div className="flex h-full flex-col px-5 pt-4">
      <p className="font-eyebrow text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Results</p>
      <p className="mt-1 text-lg font-semibold leading-tight text-dark">After launch</p>

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <div className="rounded-2xl bg-dark p-3.5 text-white transition-all duration-500" style={enter(active, 0, 200, 200)}>
          <p className="text-[10px] text-white/60">Organic traffic</p>
          <p className="mt-1 text-2xl font-semibold text-secondary">5×</p>
        </div>
        <div className="rounded-2xl bg-white p-3.5 shadow-sm transition-all duration-500" style={enter(active, 1, 200, 200)}>
          <p className="text-[10px] text-gray-500">Manual work</p>
          <p className="mt-1 text-2xl font-semibold text-dark">−60%</p>
        </div>
      </div>

      <div className="mt-2.5 rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex justify-between text-[10px] text-gray-500">
          <span>Weekly organic sessions</span>
          <span>12 weeks</span>
        </div>
        <div className="mt-3 flex h-28 items-end gap-1.5">
          {BARS.map((h, i) => (
            <span
              key={i}
              className={`flex-1 rounded-t-[3px] transition-all duration-700 ease-out ${i >= BARS.length - 3 ? 'bg-dark' : 'bg-primary/35'}`}
              style={{ height: active ? `${h}%` : '6%', transitionDelay: active ? `${400 + i * 60}ms` : '0ms' }}
            />
          ))}
        </div>
      </div>

      <p className="mt-3 text-[10.5px] leading-snug text-gray-500">Figures from past client projects.</p>
    </div>
  );
}

const SCREENS = [
  ({ active }) => <ChatScreen messages={CHAT_DISCOVERY} active={active} day="Today 9:41" />,
  PlanScreen,
  BuildScreen,
  ResultsScreen,
  ({ active }) => <ChatScreen messages={CHAT_SUPPORT} active={active} day="3 weeks after launch" />,
];

function Phone({ screen }) {
  return (
    <div className="relative mx-auto h-[600px] w-[296px] rounded-[3rem] bg-[#101011] p-[10px] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.65)] ring-1 ring-white/15">
      {/* Side buttons */}
      <span className="absolute -left-[3px] top-28 h-10 w-[3px] rounded-l bg-white/20" aria-hidden="true" />
      <span className="absolute -left-[3px] top-44 h-14 w-[3px] rounded-l bg-white/20" aria-hidden="true" />
      <span className="absolute -right-[3px] top-36 h-20 w-[3px] rounded-r bg-white/20" aria-hidden="true" />

      <div className="relative h-full w-full overflow-hidden rounded-[2.4rem] bg-paper">
        {/* Dynamic island + status bar */}
        <span className="absolute left-1/2 top-2.5 z-30 h-[26px] w-[90px] -translate-x-1/2 rounded-full bg-black" aria-hidden="true" />
        <div className="flex items-center justify-between px-7 pt-[13px] text-[11px] font-semibold text-dark" aria-hidden="true">
          <span>9:41</span>
          <span className="flex items-center gap-1.5">
            <span className="flex items-end gap-[2px]">
              {[4, 6, 8, 10].map((h) => (
                <span key={h} className="w-[3px] rounded-sm bg-dark" style={{ height: h }} />
              ))}
            </span>
            <span className="flex h-[10px] w-[20px] items-center rounded-[3px] border border-dark/60 p-[1px]">
              <span className="h-full w-[70%] rounded-[1px] bg-dark" />
            </span>
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 top-9">
          {SCREENS.map((Screen, i) => {
            const isOn = i === screen;
            return (
              <div
                key={i}
                className="absolute inset-0 transition-all duration-500 ease-out"
                style={{
                  opacity: isOn ? 1 : 0,
                  transform: isOn ? 'none' : 'translateY(12px) scale(0.98)',
                  pointerEvents: isOn ? 'auto' : 'none',
                }}
                aria-hidden={!isOn}
              >
                <Screen active={isOn} />
              </div>
            );
          })}
        </div>

        {/* Home indicator */}
        <span className="absolute bottom-2 left-1/2 h-1 w-28 -translate-x-1/2 rounded-full bg-dark/25" aria-hidden="true" />
      </div>
    </div>
  );
}

/* ───────────────────────── Section ───────────────────────── */

const WorkProcess = ({ content }) => {
  const steps = content.steps || [];
  const listRef = useRef(null);
  const stepRefs = useRef([]);
  const phoneRef = useRef(null);
  const [active, setActive] = useState(0);
  const [fill, setFill] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [autoScreen, setAutoScreen] = useState(0);

  // Active step = the last step whose top has passed the middle of the
  // viewport. The timeline line fills to that same point.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const mid = window.innerHeight * 0.5;
      let idx = 0;
      stepRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= mid) idx = i;
      });
      setActive(idx);
      const box = listRef.current?.getBoundingClientRect();
      if (box) setFill(Math.min(1, Math.max(0, (mid - box.top) / box.height)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // Below lg the phone is not pinned, so it cycles its screens while visible.
  useEffect(() => {
    if (isDesktop || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = phoneRef.current;
    if (!el) return;
    let timer = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !timer) {
          timer = setInterval(() => setAutoScreen((s) => (s + 1) % SCREENS.length), 4200);
        } else if (!entry.isIntersecting && timer) {
          clearInterval(timer);
          timer = null;
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [isDesktop]);

  const screen = isDesktop ? Math.min(active, SCREENS.length - 1) : autoScreen;

  return (
    <Section id="process" tone="navy">
      <SectionHeading
        eyebrow={content.eyebrow}
        heading={content.heading}
        description={content.description}
        tone="dark"
        align="center"
      />

      <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
        {/* Phone */}
        <div>
          <div ref={phoneRef} className="lg:sticky lg:top-[max(6rem,calc(50vh_-_300px))]">
            <Phone screen={screen} />
            <div className="mt-6 flex justify-center gap-2 lg:hidden" aria-hidden="true">
              {SCREENS.map((_, i) => (
                <span key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === screen ? 'w-6 bg-secondary' : 'w-1.5 bg-white/25'}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Steps */}
        <ol ref={listRef} className="relative lg:pt-6">
          <span className="absolute bottom-2 left-[27px] top-2 w-px bg-white/10" aria-hidden="true" />
          <span
            className="absolute left-[27px] top-2 w-px bg-secondary transition-[height] duration-200 ease-out"
            style={{ height: `calc((100% - 1rem) * ${fill})` }}
            aria-hidden="true"
          />
          {steps.map((step, i) => {
            const reached = i <= active;
            const current = i === active;
            return (
              <li
                key={step.title}
                ref={(el) => (stepRefs.current[i] = el)}
                className="relative pb-14 pl-20 last:pb-0 lg:min-h-[44vh] lg:last:min-h-[56vh]"
              >
                <span
                  className={`absolute left-0 top-0 z-10 flex h-14 w-14 items-center justify-center rounded-full border transition-colors duration-500 ${
                    reached ? 'border-secondary bg-secondary text-dark' : 'border-white/15 bg-dark text-white/60 dark:bg-deep'
                  }`}
                >
                  <StepIcon name={step.icon} />
                </span>
                <p className="pt-1 font-eyebrow text-[11px] font-bold uppercase tracking-[0.28em] text-secondary/80">
                  Step {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className={`mt-2 text-2xl md:text-3xl font-semibold tracking-tight transition-colors duration-500 ${current ? 'text-white' : 'text-white/40'}`}>
                  {step.title}
                </h3>
                <p className={`mt-3 max-w-md text-base leading-relaxed transition-colors duration-500 ${current ? 'text-white/75' : 'text-white/35'}`}>
                  {step.text}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
};

export default WorkProcess;
