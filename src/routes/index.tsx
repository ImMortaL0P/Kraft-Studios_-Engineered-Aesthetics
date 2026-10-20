import { createFileRoute, Link } from "@tanstack/react-router";
import { Kixi } from "../components/Kixi";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from "lucide-react";
import {
  Eyebrow,
  FadeUp,
  MaskLines,
  PageFrame,
  SectionLabel,
  DisplayTicker,
  StatBand,
  Ticker,
  Magnetic,
  scrollToId,
  CornerMarks,
  SpotlightCard,
  useTactileAudio,
  tactileAudio,
} from "../components/KraftSite";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  useReducedMotion,
} from "framer-motion";
import {
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type RefObject,
} from "react";

import heroImage from "../assets/kraft-craft-system.webp";
import umvadlaImage from "../assets/showcase/umvadla-02-about.jpg";
import umvadlaHome from "../assets/showcase/umvadla-01-home.jpg";
import shardaImage from "../assets/showcase-sharda.jpg";
import noticeboardImage from "../assets/project-noticeboard.jpg";

import { caseStudies, type CaseStudy } from "../data/caseStudies";

const LazyProcessSection = lazy(() =>
  import("../components/home-visual-sections").then((module) => ({
    default: module.ProcessSection,
  })),
);
const LazyMantraSection = lazy(() =>
  import("../components/home-visual-sections").then((module) => ({
    default: module.MantraSection,
  })),
);

import clientUmvadla from "../assets/clients/umvadla.png";
import clientSharda from "../assets/clients/sharda.png";
import clientNoticeboard from "../assets/clients/noticeboard.png";
import clientSp from "../assets/clients/spservices.png";
import clientBrush from "../assets/clients/brush.png";

import logoMonogram from "../Logos/Kraft Studios Monogram T.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kraft Studios — Engineered Aesthetics" },
      {
        name: "description",
        content:
          "Kraft Studios unites brand design, custom software and operational infrastructure into coherent digital ecosystems.",
      },
      { property: "og:title", content: "Kraft Studios — Engineered Aesthetics" },
      {
        property: "og:description",
        content: "The visual soul and software engine, designed as one.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://kraftstudios.site" },
      { property: "og:image", content: "https://kraftstudios.site/og-image.png" },
      { property: "og:image:secure_url", content: "https://kraftstudios.site/og-image.png" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Kraft Studios — Engineered Aesthetics" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Kraft Studios — Engineered Aesthetics" },
      {
        name: "twitter:description",
        content: "The visual soul and software engine, designed as one.",
      },
      { name: "twitter:image", content: "https://kraftstudios.site/og-image.png" },
    ],
  }),
  component: HomePage,
});

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const heroMeta = [
  ["Brand systems", "Identity that survives contact with production", "OKLCH // TOKENS AAA"],
  ["Custom software", "Platforms, CMS and internal tools", "STRICT SSR // <6MS"],
  ["Operational layer", "Automation, data and dashboards", "EVENT BUS // REALTIME"],
];

const premise = [
  [
    "The brand stops at the homepage",
    "Identity lives in a PDF while the product, dashboards and documents drift their own way.",
  ],
  [
    "Tools multiply, clarity doesn't",
    "Five disconnected tools each hold a piece of the truth, and nobody sees the whole operation.",
  ],
  [
    "Design and code decide apart",
    "Every handoff reopens the same debate, and the interface quietly loses its original intent.",
  ],
  [
    "Nothing compounds after launch",
    "When the engagement ends, the knowledge walks out of the door with the agency.",
  ],
];

const services = [
  {
    n: "01",
    title: "Systems Architecture",
    copy: "High-performance websites, tailored platforms and automation systems that remove friction from complex operations. We don't just build websites; we design the systems that effect change.",
    chips: ["Web platforms", "Tailored CMS", "Internal tools & CRM", "APIs & automation"],
  },
  {
    n: "02",
    title: "Editorial Identity",
    copy: "Bespoke identities rooted in market intelligence. A strong typographic voice meets considered whitespace, bringing the soul of editorial design into digital spaces.",
    chips: ["Brand strategy", "Visual identity", "Design systems", "Art direction"],
  },
  {
    n: "03",
    title: "Motion & Interface",
    copy: "Interactions modeled like physics. Smooth transitions and considered kinetic typography that reward users and build narrative momentum.",
    chips: ["Interface design", "Prototyping", "Kinetic typography", "Micro-interactions"],
  },
];

const steps = [
  {
    k: "Frame",
    title: "Find the real problem",
    copy: "Audits, workshops and data reviews until we agree what should change — and how we'll know it did.",
    out: "Problem brief",
  },
  {
    k: "Blueprint",
    title: "Design the system, not the screen",
    copy: "Identity rules, information architecture and technical architecture drafted at the same table.",
    out: "System blueprint",
  },
  {
    k: "Build",
    title: "Ship in small, working slices",
    copy: "Design and engineering pair on every release, so nothing is lost between a mockup and production.",
    out: "Working releases",
  },
  {
    k: "Compound",
    title: "Keep what we learn",
    copy: "Design systems, documentation and dashboards stay with your team long after launch.",
    out: "Playbook & metrics",
  },
];

const clients = [
  {
    name: "U.M.V. Adla",
    logo: clientUmvadla,
    note: "School · CMS",
    h: "h-16 md:h-20",
    light: false,
  },
  {
    name: "Sharda Palace",
    logo: clientSharda,
    note: "Hotel · Hospitality CRM",
    h: "h-20 md:h-24",
    light: false,
  },
  {
    name: "SP Services",
    logo: clientSp,
    note: "Operations · Brand identity",
    h: "h-20 md:h-24",
    light: false,
  },
  {
    name: "The Notice Board",
    logo: clientNoticeboard,
    note: "Scraper · Summariser platform",
    h: "h-8 md:h-10",
    light: false,
  },
  // Brush ships a white wordmark only — invert it on the paper theme.
  {
    name: "Brush",
    logo: clientBrush,
    note: "E-commerce B2B & B2C design marketplace",
    h: "h-6 md:h-7",
    light: true,
  },
  // No logo file — the wordmark is set in the brand's own face (Narnia).
  {
    name: "The Side Quest",
    logo: null,
    note: "Editorial print spread",
    h: "",
    light: false,
  },
];

const sectionIndex = [
  { id: "top", label: "Studio", n: "01" },
  { id: "premise", label: "Premise", n: "02" },
  { id: "blueprint", label: "Blueprint", n: "03" },
  { id: "work", label: "Work", n: "04" },
  { id: "process", label: "Process", n: "05" },
  { id: "philosophy", label: "Mantra", n: "06" },
  { id: "contact", label: "Contact", n: "07" },
];

/* ------------------------------------------------------------------ */
/* Text animation primitives                                           */
/* ------------------------------------------------------------------ */

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.02, delayChildren: 0.1 },
  },
};

const textItemVariants = {
  hidden: { y: "110%", rotateZ: 5, opacity: 0 },
  visible: {
    y: "0%",
    rotateZ: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function StaggeredText({ text, className = "" }: { text: string; className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {text.split(" ").map((word, wIdx) => (
        <span key={wIdx} className="relative mr-[0.3em] mb-[-0.06em] inline-flex pb-[0.06em]">
          {word.split("").map((char, index) => (
            <motion.span
              key={index}
              variants={textItemVariants}
              {...(!reduceMotion
                ? {
                    whileHover: {
                      y: -6,
                      rotateZ: index % 2 === 0 ? -3 : 3,
                      color: "var(--reg)",
                      transition: { type: "spring", stiffness: 450, damping: 15 },
                    },
                  }
                : {})}
              onMouseEnter={() => tactileAudio.play("tick")}
              className="inline-block origin-bottom-left will-change-transform cursor-pointer transition-colors duration-200"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
}

function ScrollRevealChar({
  char,
  progress,
  range,
  className = "",
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={`relative inline-block will-change-transform ${className}`}
    >
      {char}
    </motion.span>
  );
}

function ScrollRevealText({
  text,
  progress,
  className = "",
  windowStart = 0.12,
  windowEnd = 0.47,
  by = "char",
}: {
  text: string;
  progress: MotionValue<number>;
  className?: string;
  windowStart?: number;
  windowEnd?: number;
  /**
   * "char" splits every letter into its own inline-block, which breaks kerning —
   * fine for upright faces, but italics overlap their neighbours. Use "word" there.
   */
  by?: "char" | "word";
}) {
  const words = text.split(" ");

  if (by === "word") {
    return (
      <span className={`inline-flex flex-wrap ${className}`}>
        {words.map((word, wIdx) => {
          const localStart = windowStart + (wIdx / words.length) * (windowEnd - windowStart);
          const localEnd = Math.min(1, localStart + 0.06);
          return (
            <ScrollRevealChar
              key={wIdx}
              char={word}
              progress={progress}
              range={[localStart, localEnd] as [number, number]}
              className="mr-[0.28em]"
            />
          );
        })}
      </span>
    );
  }

  let charCount = 0;
  const totalChars = text.replace(/\s/g, "").length;

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, wIdx) => (
        <span key={wIdx} className="relative mr-[0.3em] inline-flex">
          {word.split("").map((char, index) => {
            const start = charCount / totalChars;
            charCount++;
            const localStart = windowStart + start * (windowEnd - windowStart);
            const localEnd = Math.min(1, localStart + 0.06);
            return (
              <ScrollRevealChar
                key={index}
                char={char}
                progress={progress}
                range={[localStart, localEnd] as [number, number]}
              />
            );
          })}
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function StaggeredParagraph({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <motion.p
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.015, delayChildren: 0.1 } },
      }}
      className={className}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.1em] mr-[0.25em] -mb-[0.1em]">
          <motion.span
            variants={{
              hidden: { opacity: 0, y: "100%", rotate: 2 },
              visible: {
                opacity: 1,
                y: "0%",
                rotate: 0,
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="inline-block will-change-transform"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.p>
  );
}

function HomePage() {
  return (
    <PageFrame>
      <SectionCounter />
      <main className="relative">
        <div className="relative md:sticky md:bottom-0 md:z-0">
          <Hero />
          <HeroImage />
        </div>

        <div className="relative z-10 bg-paper shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
          <Partners />
          <Premise />
          <Blueprint />
          <Work />
          <Suspense fallback={<div className="h-[28rem] bg-surface" />}>
            <LazyProcessSection />
          </Suspense>
          <Suspense fallback={<div className="h-[28rem] bg-ink/[0.04]" />}>
            <LazyMantraSection />
          </Suspense>
          <ContactBand />
        </div>
      </main>
    </PageFrame>
  );
}

/* ---------- fixed section counter ---------- */

function SectionCounter() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = sectionIndex.findIndex((s) => s.id === e.target.id);
            if (i >= 0) setActive(i);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sectionIndex.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.7;
      const nearBottom =
        window.innerHeight + window.scrollY > document.body.scrollHeight - window.innerHeight * 0.9;
      setVisible(past && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const fallback = { id: "top", label: "Studio", n: "01" };
  const current = sectionIndex[active] ?? fallback;
  const last = sectionIndex[sectionIndex.length - 1] ?? fallback;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed bottom-6 right-[clamp(1.25rem,4vw,4rem)] z-50 hidden items-center gap-3 rounded-full border border-line bg-paper/90 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] backdrop-blur-md shadow-lg transition-all duration-500 lg:flex ${
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <span className="size-1.5 rounded-full bg-reg animate-pulse" />
      <span className="tabular-nums text-ink">{current.n}</span>
      <span className="text-ink/30">/ {last.n}</span>

      <AnimatePresence mode="wait">
        {isHovered ? (
          <motion.div
            key="scrubber"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            className="flex items-center gap-1.5 overflow-hidden pl-1"
          >
            {sectionIndex.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  scrollToId(s.id);
                  tactileAudio.play("thock");
                }}
                className={`flex size-4 items-center justify-center rounded-full transition-colors ${
                  active === idx ? "bg-reg text-white" : "hover:bg-ink/10 text-ink/40"
                }`}
                title={`Jump to ${s.label}`}
              >
                <span className="text-[8px] font-bold">{idx + 1}</span>
              </button>
            ))}
          </motion.div>
        ) : (
          <span className="relative block h-3 w-20 overflow-hidden text-ink/60">
            <motion.span
              key={current.id}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              {current.label}
            </motion.span>
          </span>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- 01 hero ---------- */

function Hero() {
  const coords = useRef<HTMLSpanElement>(null);
  const [clock, setClock] = useState("");
  const { enabled: audioEnabled, toggle: toggleAudio, play: playAudio } = useTactileAudio();

  useEffect(() => {
    const tick = () =>
      setClock(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Kolkata",
        }).format(new Date()),
      );
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (!coords.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = String(Math.round(e.clientX - r.left)).padStart(4, "0");
    const y = String(Math.round(e.clientY - r.top)).padStart(4, "0");
    coords.current.textContent = `X ${x} · Y ${y}`;
  };

  return (
    <section
      id="top"
      onMouseMove={onMove}
      className="grain relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden"
    >
      <div className="blueprint-grid pointer-events-none absolute inset-0" />

      <div className="site-shell relative z-[2] flex flex-1 flex-col">
        <FadeUp
          immediate
          className="flex flex-col gap-4 pt-10 font-mono text-[10px] uppercase leading-relaxed tracking-[0.26em] text-ink/50 sm:flex-row sm:items-start sm:justify-between"
        >
          <div className="flex items-start gap-3">
            <img
              src={logoMonogram}
              alt=""
              decoding="async"
              className="mt-0.5 h-8 w-8 object-contain opacity-70"
            />
            <span>
              01 — Studio
              <br />
              Established in 2026 · Patna, India
              <br />
              <span className="text-[9px] tracking-[0.18em] text-ink/40">
                Registered creative agency under MSME &amp; GST Act
              </span>
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 sm:justify-end sm:text-right">
            <button
              type="button"
              onClick={toggleAudio}
              data-cursor-text="AUDIO"
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.22em] transition-all duration-300 ${
                audioEnabled
                  ? "border-reg bg-reg/10 text-reg"
                  : "border-line bg-surface/40 text-ink/45 hover:border-ink/30 hover:text-ink"
              }`}
              title="Toggle MK·78 tactile audio feedback"
            >
              <span
                className={`size-1.5 rounded-full ${audioEnabled ? "animate-pulse bg-reg shadow-[0_0_6px_var(--reg)]" : "bg-ink/30"}`}
              />
              <span>MK·AUDIO {audioEnabled ? "ON" : "OFF"}</span>
            </button>
            <p>
              Working globally
              <br />
              <span className="tabular-nums text-ink/35">IST {clock}</span>
              <br />
              <span ref={coords} className="hidden tabular-nums text-ink/25 md:inline">
                X 0000 · Y 0000
              </span>
            </p>
          </div>
        </FadeUp>

        <div className="flex flex-1 flex-col justify-center py-10 sm:py-12 md:py-16">
          <div className="grid gap-8 md:gap-10 lg:grid-cols-12 lg:items-end">
            <motion.div
              variants={textContainerVariants}
              initial="hidden"
              animate="visible"
              data-cursor-text="ENGINEERED"
              className="flex flex-col font-display text-[clamp(2.6rem,9vw,8.5rem)] font-bold uppercase leading-[0.88] tracking-[-0.04em] lg:col-span-8 cursor-default"
            >
              <StaggeredText text="Engineered" />
              <StaggeredText text="Aesthetics." className="text-reg" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-4"
            >
              {/* Kixi sits inside the column and the copy flows around its
                  actual silhouette via shape-outside, rather than hovering in a
                  gap of its own making. */}
              <Kixi
                pose="hero"
                wrap="right"
                lean={-4}
                pointerParallax
                reveal
                delay={0.35}
                title="Kixi, mid-leap"
                className="-mr-[6%] ml-3 w-[clamp(118px,17vw,210px)] lg:-mr-[14%] lg:w-[clamp(150px,13vw,230px)]"
              />
              <StaggeredParagraph
                text="Connecting craft with evidence, design with engineering, people with systems. We don't just design digital shells; we build the brandworlds and operational engines that power them."
                className="border-l-2 border-reg pl-5 text-[15px] leading-relaxed text-ink/70 md:text-base"
              />
              {/* clear-both matters: a flex row beside a float gets placed
                  alongside it and squashed, rather than below it. */}
              <div className="clear-both mt-8 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
                <Magnetic>
                  <Link to="/contact" className="pill-solid" data-cursor-text="START">
                    Start a project <ArrowRight size={16} className="arrow" />
                  </Link>
                </Magnetic>
                <Link to="/about" className="link-line">
                  Read the manifesto <ArrowUpRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="grid border-t border-line gap-y-2 md:grid-cols-3">
          {heroMeta.map(([k, v, tag], i) => (
            <FadeUp
              immediate
              key={k}
              delay={0.2 + i * 0.1}
              className="group flex flex-col justify-between border-line py-5 md:border-r md:py-6 md:pr-8 md:last:border-r-0 md:[&:not(:first-child)]:pl-8 transition-colors duration-300 hover:bg-surface/30 cursor-pointer"
              onClick={() => playAudio("tick")}
            >
              <div className="flex items-start gap-4">
                <span className="mt-1 size-1.5 shrink-0 rotate-45 bg-reg transition-transform duration-500 group-hover:rotate-[135deg]" />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="block text-sm font-bold">{k}</span>
                    <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-reg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {tag}
                    </span>
                  </div>
                  <span className="mt-1 block text-[13px] leading-relaxed text-ink/55">{v}</span>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      <div className="relative z-[2] border-y border-line py-4">
        <Ticker
          className="text-[14px] font-bold text-ink/70"
          items={[
            "Connecting craft with evidence, design with engineering, people with systems",
            "Building the engine · Designing the soul",
            "One source of truth for brand, software and operations",
          ]}
        />
      </div>

      <Magnetic>
        <button
          type="button"
          onClick={() => scrollToId("premise")}
          aria-label="Scroll to the next section"
          data-cursor-text="EXPLORE"
          className="group absolute bottom-28 right-[clamp(1.25rem,4vw,4rem)] z-[3] hidden flex-col items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-ink/60 hover:text-ink lg:flex"
        >
          <span className="[writing-mode:vertical-rl]">Scroll</span>
          <span className="relative block h-12 w-px overflow-hidden bg-line">
            <span className="scroll-hint absolute inset-x-0 top-0 h-4 bg-reg" />
          </span>
          <ArrowDown
            size={12}
            className="transition-transform duration-500 group-hover:translate-y-1"
          />
        </button>
      </Magnetic>
    </section>
  );
}

function HeroImage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const clip = useTransform(
    scrollYProgress,
    [0, 0.42],
    ["inset(0% 12% 0% 12%)", "inset(0% 0% 0% 0%)"],
  );
  const scale = useTransform(scrollYProgress, [0, 1], [1.22, 1]);
  const captionY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} className="relative h-[60vh] md:h-[88vh]" data-cursor-text="CRAFT ⟶ SYSTEM">
      <motion.div
        className="absolute inset-0 overflow-hidden bg-surface"
        style={{ clipPath: reduceMotion ? "inset(0% 0% 0% 0%)" : clip }}
      >
        <motion.img
          src={heroImage}
          alt="A digital systems architect calibrating modular design system component hierarchies, Swiss layout grids, and wireframe schemas on an illuminated studio display"
          className="h-full w-full object-cover grayscale-[0.2] contrast-[1.05] brightness-95 transform-gpu will-change-transform transition-all duration-700 hover:grayscale-0"
          decoding="async"
          fetchPriority="high"
          style={{ scale: reduceMotion ? 1 : scale }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/15" />
        <motion.div
          style={{ y: reduceMotion ? 0 : captionY }}
          className="site-shell absolute inset-x-0 bottom-6 flex flex-col items-start justify-between gap-3 text-white sm:bottom-10 sm:flex-row sm:items-end sm:gap-6"
        >
          <p className="max-w-[16ch] font-display text-[clamp(1.5rem,3.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]">
            Hand-aligned. Machine-checked.
          </p>
          <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-white/70 sm:block">
            Fig. 01 — Craft ⟶ System
          </span>
        </motion.div>
        <CornerMarks
          size={24}
          stroke={1.5}
          className="pointer-events-none absolute inset-5 sm:inset-8 text-white/70"
        />
      </motion.div>
    </div>
  );
}

/* ---------- partners ---------- */

function Partners() {
  return (
    <section
      id="partners"
      className="border-b border-line bg-paper py-16 md:py-20"
      aria-label="Clients and ecosystem"
    >
      <div className="site-shell mb-10 flex flex-wrap items-end justify-between gap-4">
        <Eyebrow>Trusted by / built with</Eyebrow>
        <p className="max-w-[46ch] text-sm text-ink/50">
          Schools, hospitality groups and independent platforms working on ambitious technical and
          brand problems.
        </p>
      </div>
      <div className="site-shell grid grid-cols-2 gap-px overflow-hidden border-y border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
        {clients.map((c, i) => (
          <FadeUp
            key={c.name}
            delay={i * 0.07}
            className="group relative flex min-h-[8.5rem] flex-col items-center justify-center gap-3 bg-paper px-4 py-8 transition-colors duration-500 hover:bg-surface cursor-pointer select-none"
            id={`partner-${i}`}
            onClick={() => tactileAudio.play("tick")}
          >
            <CornerMarks
              size={8}
              stroke={1}
              className="pointer-events-none absolute inset-2 text-reg/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            <div
              data-cursor-text="CLIENT"
              className="flex flex-col items-center justify-center gap-3 w-full transition-transform duration-300 group-hover:-translate-y-1"
            >
              {c.logo === null ? (
                <span className="font-quest text-center text-[1.9rem] leading-none text-ink/70 transition-colors duration-500 group-hover:text-ink md:text-[2.2rem]">
                  {c.name}
                </span>
              ) : (
                <img
                  src={c.logo}
                  alt={c.name}
                  loading="lazy"
                  decoding="async"
                  className={`${c.h} w-auto max-w-[75%] object-contain opacity-70 transition-all duration-700 group-hover:opacity-100 ${
                    c.light
                      ? // white artwork: invert it on paper, leave it alone in the dark theme
                        "grayscale invert dark:grayscale-0 dark:invert-0"
                      : // dark artwork: true colour on paper, inverted (and kept neutral) in the dark theme
                        "grayscale group-hover:grayscale-0 dark:invert dark:grayscale dark:group-hover:grayscale"
                  }`}
                />
              )}
              <span className="max-w-[24ch] text-balance text-center font-mono text-[9px] uppercase leading-[1.7] tracking-[0.18em] text-ink/35 transition-colors duration-500 group-hover:text-reg">
                {c.note}
              </span>
            </div>
          </FadeUp>
        ))}
      </div>

      {/* Counted off the arrays above, not typed in, so the band cannot claim
          work that is not on the page. */}
      <div className="site-shell mt-14 border-y border-line">
        <StatBand
          stats={[
            {
              figure: String(caseStudies.filter((c) => !c.inPipeline).length),
              label: "Case studies shipped",
              note: "Identity, platform and product",
            },
            {
              figure: String(clients.length),
              label: "Clients and partners",
              note: "Schools, hospitality, platforms",
            },
            {
              figure: "3",
              label: "Disciplines, one table",
              note: "Brand \u00b7 Software \u00b7 Operations",
            },
            { figure: "2026", label: "Studio established", note: "Patna, India" },
          ]}
        />
      </div>

      <div className="mt-14 border-y border-line py-7 md:py-9">
        <DisplayTicker
          items={[
            { label: "Identity systems" },
            { label: "Custom platforms" },
            { label: "Operational tooling" },
            { label: "Editorial design" },
            { label: "Motion & interface" },
          ]}
        />
      </div>
    </section>
  );
}

/* ---------- 02 premise ---------- */

function Premise() {
  return (
    <section id="premise" className="bg-surface py-24 md:py-36">
      <div className="site-shell grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <SectionLabel n="02" label="Kixi's Premise" mark />
            <MaskLines
              className="mt-8 font-display text-[clamp(2rem,3.6vw,3.1rem)] font-bold leading-[1.1] tracking-[-0.025em]"
              lines={[
                "Most brands don't fail",
                "on the surface.",
                <span key="l" className="text-ink/35">
                  They break at the seams.
                </span>,
              ]}
            />
            <FadeUp delay={0.25}>
              <StaggeredParagraph
                text="Identity is designed in one room, software is built in another, and operations live in spreadsheets. Every handoff loses a little of the original intent."
                className="mt-8 max-w-[40ch] text-[15px] leading-relaxed text-ink/60"
              />
            </FadeUp>
          </div>
        </div>

        <ol className="md:col-span-7 lg:col-span-6 lg:col-start-7">
          {premise.map(([title, copy], i) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
              data-cursor-text={`SEAM 0${i + 1}`}
              className="group relative flex gap-6 border-t border-line py-8 last:border-b md:gap-10 cursor-default"
            >
              <span className="absolute left-0 top-[-1px] h-px w-full origin-left scale-x-0 bg-reg transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />
              <span className="w-10 shrink-0 font-display text-3xl font-light tabular-nums text-ink/25 transition-colors duration-500 group-hover:text-reg">
                0{i + 1}
              </span>
              <div className="flex-1 transition-transform duration-500 group-hover:translate-x-1">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl font-bold tracking-[-0.01em] md:text-2xl">
                    {title}
                  </h3>
                  <span className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-reg opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:inline">
                    CALIPER Δ 0.{i + 1}mm // SPEC
                  </span>
                </div>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/55">{copy}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- 03 blueprint ---------- */

const serviceTelemetry = [
  "SYS_CORE // 100% TYPED",
  "IDENTITY // OKLCH SYSTEM",
  "KINEMATICS // 60FPS SPRING",
];

function BlueprintLine() {
  const ref = useRef<SVGSVGElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref as unknown as RefObject<HTMLElement>,
    offset: ["start end", "end center"],
  });
  const pathLength = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const reduceMotion = useReducedMotion();

  const d =
    "M 0 100 C 200 100, 200 170, 400 170 C 600 170, 600 30, 800 30 C 1000 30, 1000 100, 1200 100";

  return (
    <motion.svg
      ref={ref}
      viewBox="0 0 1200 200"
      fill="none"
      className="pointer-events-none absolute inset-x-0 top-0 hidden h-40 w-full text-reg/25 md:block"
      preserveAspectRatio="none"
      style={{ opacity: reduceMotion ? 0.35 : opacity }}
      aria-hidden="true"
    >
      <motion.path
        d={d}
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="6 8"
        style={{ pathLength: reduceMotion ? 1 : pathLength }}
      />
      {/* Kinetic Signal Transmission Pulse (MK·78 Inspired) */}
      {!reduceMotion && (
        <motion.path
          d={d}
          stroke="var(--reg)"
          strokeWidth="3"
          strokeDasharray="24 360"
          animate={{ strokeDashoffset: [384, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="opacity-75 drop-shadow-[0_0_8px_var(--reg)]"
        />
      )}
    </motion.svg>
  );
}

function ServiceCard({ service, index }: { service: (typeof services)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["0 1", "0.75 1"] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [40, 0]), {
    stiffness: 70,
    damping: 20,
  });
  const reduceMotion = useReducedMotion();
  const [activeTelemetry, setActiveTelemetry] = useState(false);

  return (
    <motion.article
      ref={ref}
      data-cursor-text="SYSTEM"
      style={{ opacity: reduceMotion ? 1 : opacity, y: reduceMotion ? 0 : y }}
      className="group relative flex h-full flex-col cursor-pointer"
      onClick={() => {
        setActiveTelemetry(!activeTelemetry);
        tactileAudio.play("thock");
      }}
    >
      <SpotlightCard className="relative flex h-full flex-col rounded border border-paper/12 bg-paper/[0.04] transition-colors duration-500 group-hover:border-reg/50 group-hover:bg-paper/[0.07]">
        <CornerMarks
          size={14}
          stroke={1.5}
          className="pointer-events-none absolute inset-2 text-paper/20 transition-colors duration-500 group-hover:text-reg/60"
        />
        <div className="relative z-10 flex h-full flex-col p-8 md:p-9">
          <div className="flex items-center justify-between font-mono text-xs tracking-[0.2em] text-reg">
            <span>{service.n} —</span>
            <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-paper/35 transition-colors duration-500 group-hover:text-reg">
              <span
                className={`size-1.5 rounded-full transition-all ${
                  activeTelemetry
                    ? "bg-reg shadow-[0_0_6px_var(--reg)]"
                    : "bg-paper/20 group-hover:bg-reg/60"
                }`}
              />
              {activeTelemetry ? "STATE: TELEMETRY ACTIVE // 0ms" : serviceTelemetry[index]}
            </span>
            <span className="text-paper/25 transition-colors duration-500 group-hover:text-paper/60">
              0{index + 1}/03
            </span>
          </div>
          <h3 className="mt-5 font-display text-2xl font-bold tracking-[-0.02em] lg:text-[1.75rem]">
            {service.title}
          </h3>
          <p className="mt-4 text-[15px] leading-relaxed text-paper/60">{service.copy}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {service.chips.map((c) => (
              <span
                key={c}
                onClick={(e) => {
                  e.stopPropagation();
                  tactileAudio.play("tick");
                }}
                className="chip border-paper/15 text-paper/60 group-hover:border-paper/30 transition-all duration-300 hover:scale-105 hover:border-reg hover:text-paper"
              >
                {c}
              </span>
            ))}
          </div>
          <Link
            to="/services"
            className="link-line mt-auto pt-8 text-paper/80"
            onClick={(e) => {
              e.stopPropagation();
              tactileAudio.play("snap");
            }}
          >
            About this service <ArrowUpRight size={14} />
          </Link>
        </div>
      </SpotlightCard>
    </motion.article>
  );
}

function Blueprint() {
  return (
    <section id="blueprint" className="relative overflow-hidden bg-ink py-24 text-paper lg:py-36">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 0.04, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="pointer-events-none absolute -right-24 top-0 h-[36rem] w-[36rem] rounded-full bg-paper blur-[110px]"
      />

      <div className="site-shell relative z-10">
        <SectionLabel n="03" label="Kixi's Blueprint" light mark />
        <div className="mt-8 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <MaskLines
            className="max-w-[20ch] font-display text-[clamp(1.9rem,3.8vw,3.4rem)] font-bold leading-[1.06] tracking-[-0.03em]"
            lines={[
              "Our operating loop compounds value.",
              "Everything flows from strategy to code.",
            ]}
          />
          <FadeUp delay={0.2}>
            <StaggeredParagraph
              text="We remove the translation layer between creative studios and engineering firms by putting both disciplines at the exact same table."
              className="max-w-[46ch] text-[15px] leading-relaxed text-paper/60 lg:text-base"
            />
          </FadeUp>
        </div>

        <div className="relative mt-20 border-t border-paper/15 pt-28 lg:mt-24 lg:pt-32">
          <BlueprintLine />
          <div className="relative z-10 grid gap-8 md:grid-cols-3 lg:gap-10">
            {services.map((service, index) => (
              <div
                key={service.n}
                className={`h-full transition-transform duration-500 hover:-translate-y-1.5 ${
                  index === 1 ? "md:translate-y-10" : ""
                }`}
              >
                <ServiceCard service={service} index={index} />
              </div>
            ))}
          </div>
        </div>

        <FadeUp
          delay={0.2}
          className="mt-24 flex flex-wrap items-center justify-between gap-6 border-t border-paper/15 pt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-paper/45 md:mt-32"
        >
          <span>Input: intent</span>
          <span className="hidden h-px flex-1 bg-paper/15 md:block" />
          <span className="text-reg">⟶</span>
          <span className="hidden h-px flex-1 bg-paper/15 md:block" />
          <span>Output: a system that holds</span>
        </FadeUp>
      </div>
    </section>
  );
}

/* ---------- 04 work ---------- */

function Work() {
  const spans = [
    "lg:col-span-7",
    "lg:col-span-5",
    "lg:col-span-5",
    "lg:col-span-7",
    "lg:col-span-7",
    "lg:col-span-5",
    "lg:col-span-6 lg:col-start-4",
  ];
  const ratios = ["aspect-[4/3] lg:aspect-[16/10]"];

  return (
    <section id="work" className="site-shell relative py-24 lg:py-36">
      <SectionLabel n="04" label="Kixi's Casebook" mark />
      <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-b border-line pb-10">
        <MaskLines
          className="font-display text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.035em]"
          lines={[
            "Case studies,",
            <> </>,
            <span key="d" className="text-reg">
              .
            </span>,
          ]}
        />
        <FadeUp>
          <Link to="/work" className="link-line">
            Explore the playground <ArrowUpRight size={14} />
          </Link>
        </FadeUp>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-x-4 gap-y-12 sm:gap-y-16 lg:mt-16 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-24">
        {caseStudies.map((study, i) => (
          <ProjectCard
            key={study.slug}
            study={study}
            cls={spans[i % spans.length]!}
            ratio={ratios[i % ratios.length]!}
          />
        ))}
      </div>
    </section>
  );
}

function ParallaxImg({
  src,
  alt,
  ratio,
  fit,
  bg,
}: {
  src: string;
  alt: string;
  ratio: string;
  fit?: "cover" | "contain";
  bg?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Continuous Scroll Parallax & Scaling for Portfolio Thumbnails
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const reduceMotion = useReducedMotion();

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden w-full ${ratio}`}
      style={{ backgroundColor: bg }}
    >
      <motion.img
        src={src}
        alt={alt}
        className={`h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"}`}
        style={{ scale: reduceMotion ? 1 : scale }}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

function ProjectCard({ study, cls, ratio }: { study: CaseStudy; cls: string; ratio: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["0 1.05", "0.5 1"] });
  const opacity = useSpring(useTransform(scrollYProgress, [0, 1], [0.25, 1]), {
    stiffness: 60,
    damping: 20,
  });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [70, 0]), {
    stiffness: 60,
    damping: 20,
  });
  const reduceMotion = useReducedMotion();
  const cursor = useRef<HTMLSpanElement>(null);

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    cursor.current?.style.setProperty(
      "transform",
      "translate(" +
        (e.clientX - r.left) +
        "px, " +
        (e.clientY - r.top) +
        "px) translate(-50%, -50%)",
    );
  };

  return (
    <motion.div
      ref={ref}
      style={{ opacity: reduceMotion ? 1 : opacity, y: reduceMotion ? 0 : y }}
      className={"group flex flex-col " + cls}
    >
      {study.inPipeline && !study.isMvp ? (
        <div
          className="relative block w-full cursor-default overflow-hidden rounded-sm text-left select-none"
          aria-label={study.title + " (In Pipeline)"}
        >
          {study.logo ? (
            <div
              className={`relative overflow-hidden w-full ${ratio} flex flex-col items-center justify-between p-6 sm:p-8 select-none transition-colors duration-500 border border-line bg-surface bg-[radial-gradient(var(--line)_1px,transparent_1px)] [background-size:20px_20px]`}
            >
              <div className="flex w-full items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45 z-10">
                <span>SYS // {study.n}</span>
                <span className="text-amber-600 dark:text-amber-400 font-medium">
                  IN THE PIPELINE
                </span>
              </div>
              <div className="flex flex-1 items-center justify-center w-full py-4 z-10">
                <img
                  src={study.logo}
                  alt={study.client}
                  className={`${study.logoClass || "max-h-24 w-auto max-w-[70%]"} object-contain ${study.logoDark ? "dark:hidden" : ""}`}
                  loading="lazy"
                  decoding="async"
                />
                {study.logoDark && (
                  <img
                    src={study.logoDark}
                    alt={study.client}
                    className={`${study.logoClass || "max-h-24 w-auto max-w-[70%]"} object-contain hidden dark:block`}
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </div>
              <div className="flex w-full items-center justify-between font-mono text-[9px] uppercase tracking-[0.22em] text-ink/45 z-10">
                <span className="truncate">{study.client}</span>
                <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-medium">
                  <span className="inline-block size-1.5 rounded-full bg-amber-500 animate-pulse" />
                  PIPELINE · SPEC
                </span>
              </div>
            </div>
          ) : null}
          <CornerMarks
            size={16}
            stroke={1.5}
            className="pointer-events-none absolute inset-3 z-10 text-amber-500/30"
          />
          <span className="absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] backdrop-blur-sm transition-colors duration-300 border border-amber-500/30 bg-amber-500/15 text-amber-600 dark:text-amber-400 shadow-sm">
            <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
            Under Pipeline
          </span>
        </div>
      ) : (
        <Link
          to="/work/$slug"
          params={{ slug: study.slug }}
          onMouseMove={onMove}
          className="relative block w-full cursor-none overflow-hidden rounded-sm text-left"
          aria-label={"Read the " + study.title + (study.isMvp ? " MVP" : " case study")}
        >
          {study.logo ? (
            <div
              className={`relative overflow-hidden w-full ${ratio} flex flex-col items-center justify-between p-6 sm:p-8 select-none transition-colors duration-500 border border-line bg-surface bg-[radial-gradient(var(--line)_1px,transparent_1px)] [background-size:20px_20px]`}
            >
              <div className="flex w-full items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45 z-10">
                <span>SYS // {study.n}</span>
                {study.isMvp && (
                  <span className="text-amber-600 dark:text-amber-400 font-medium">ACTIVE MVP</span>
                )}
              </div>
              <div className="flex flex-1 items-center justify-center w-full py-4 z-10">
                <img
                  src={study.logo}
                  alt={study.client}
                  className={`${study.logoClass || "max-h-24 w-auto max-w-[70%]"} object-contain transition-transform duration-500 group-hover:scale-105 ${study.logoDark ? "dark:hidden" : ""}`}
                  loading="lazy"
                  decoding="async"
                />
                {study.logoDark && (
                  <img
                    src={study.logoDark}
                    alt={study.client}
                    className={`${study.logoClass || "max-h-24 w-auto max-w-[70%]"} object-contain transition-transform duration-500 group-hover:scale-105 hidden dark:block`}
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </div>
              <div className="flex w-full items-center justify-between font-mono text-[9px] uppercase tracking-[0.22em] text-ink/45 z-10">
                <span className="truncate">{study.client}</span>
                {study.isMvp ? (
                  <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-medium">
                    <span className="inline-block size-1.5 rounded-full bg-amber-500 animate-pulse" />
                    {study.year} · PIPELINE · MVP
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-reg font-medium">
                    <span className="inline-block size-1.5 rounded-full bg-reg animate-pulse" />
                    {study.year} · CASE STUDY
                  </span>
                )}
              </div>
            </div>
          ) : (
            <ParallaxImg
              src={study.cover}
              alt={study.coverAlt}
              ratio={ratio}
              {...(study.coverFit ? { fit: study.coverFit } : {})}
              {...(study.coverBg ? { bg: study.coverBg } : {})}
            />
          )}
          <CornerMarks
            size={16}
            stroke={1.5}
            className={`pointer-events-none absolute inset-3 z-10 transition-colors duration-500 ${
              study.isMvp
                ? "text-amber-500/30 group-hover:text-amber-500"
                : study.logo
                  ? "text-ink/25 group-hover:text-reg"
                  : "text-white/35 group-hover:text-white/80"
            }`}
          />
          {study.isMvp ? (
            <span className="absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] backdrop-blur-sm transition-colors duration-300 border border-amber-500/30 bg-amber-500/20 text-amber-600 dark:text-amber-400 shadow-sm">
              <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
              Under Pipeline · MVP
            </span>
          ) : (
            <span className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] backdrop-blur-sm transition-colors duration-300 bg-ink/75 text-paper">
              <ArrowUpRight size={11} />
              View Case Study
            </span>
          )}
          <span
            ref={cursor}
            className={`view-bubble pointer-events-none absolute left-0 top-0 grid size-24 place-items-center rounded-full font-mono text-[10px] uppercase tracking-[0.2em] ${study.isMvp ? "bg-amber-500 text-black font-semibold" : "bg-reg text-white"}`}
            style={{ transform: "translate(-300px,-300px)" }}
          >
            {study.isMvp ? "MVP" : "Read"}
          </span>
        </Link>
      )}

      <div className="mt-5 flex flex-col gap-5 border-t border-line pt-5 sm:mt-6 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Eyebrow>{study.client}</Eyebrow>
            {study.inPipeline && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-amber-600 dark:text-amber-400">
                <span className="size-1 rounded-full bg-amber-500 animate-pulse" />
                {study.isMvp ? "Under Pipeline — MVP" : "Under Pipeline"}
              </span>
            )}
          </div>
          <h2
            className={`mt-2 font-display text-2xl font-bold tracking-[-0.025em] transition-colors duration-300 ${study.isMvp ? "group-hover:text-amber-500" : !study.inPipeline ? "group-hover:text-reg" : ""} lg:text-[2.1rem]`}
          >
            {study.title}
          </h2>
          <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-ink/60">
            {study.summary}
          </p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/40">
            {study.services.slice(0, 3).join(" · ")}
          </p>
        </div>
        <div className="flex shrink-0 flex-row items-center justify-between gap-4 sm:flex-col sm:items-end">
          <span className="font-mono text-xs text-reg">{study.n}</span>
          <span className="font-mono text-[10px] text-ink/30">{study.year}</span>
          {study.inPipeline && !study.isMvp ? (
            <div
              className="grid size-10 place-items-center rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 cursor-default"
              title="Under Pipeline"
            >
              <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
            </div>
          ) : (
            <Link
              to="/work/$slug"
              params={{ slug: study.slug }}
              aria-label={"Read the " + study.title + (study.isMvp ? " MVP" : " case study")}
              className={`grid size-10 place-items-center rounded-full border border-line transition-all duration-500 ${study.isMvp ? "group-hover:rotate-45 group-hover:border-amber-500 group-hover:bg-amber-500 group-hover:text-black" : "group-hover:rotate-45 group-hover:border-reg group-hover:bg-reg group-hover:text-white"}`}
            >
              <ArrowUpRight size={15} />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- 07 contact ---------- */

function ContactBand() {
  return (
    <section id="contact" className="site-shell py-24 md:py-32">
      <FadeUp>
        <div className="group relative overflow-hidden rounded-2xl border border-line bg-ink px-6 py-16 text-paper md:px-14 md:py-24">
          <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-30 [--line:rgb(240_238_234/10%)]" />
          <div className="absolute inset-x-0 top-1/2 h-px origin-left scale-x-0 bg-paper/15 transition-transform duration-1000 ease-in-out group-hover:scale-x-100" />
          <div className="absolute inset-y-0 left-1/2 w-px origin-top scale-y-0 bg-paper/15 transition-transform duration-1000 ease-in-out group-hover:scale-y-100" />

          <div className="relative">
            <SectionLabel n="07" label="Kixi's Desk" light mark />
            <MaskLines
              className="mt-8 font-display text-[clamp(2.4rem,6vw,5.5rem)] font-bold leading-[1] tracking-[-0.04em]"
              lines={[
                "Bring us the",
                <>
                  difficult brief
                  <span key="d" className="text-reg">
                    .
                  </span>
                </>,
              ]}
            />
            <div className="mt-12 flex flex-wrap items-center justify-between gap-8 border-t border-paper/15 pt-8">
              <StaggeredParagraph
                text="Tell us what needs to be built, changed or connected. We'll look at the visual, technical and operational problem together."
                className="max-w-[44ch] text-[15px] leading-relaxed text-paper/60"
              />
              <div className="flex flex-wrap items-center gap-6">
                <a
                  href="mailto:mangalam@kraftstudios.site"
                  className="link-line text-paper/80"
                  data-cursor-text="EMAIL"
                >
                  mangalam@kraftstudios.site
                </a>
                <Magnetic>
                  <Link
                    to="/contact"
                    className="pill-solid pill-invert"
                    data-cursor-text="PROTOCOL"
                  >
                    Initialize protocol <ArrowRight size={16} className="arrow" />
                  </Link>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
