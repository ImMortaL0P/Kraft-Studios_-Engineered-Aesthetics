import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Eyebrow, PageFrame, Reveal } from "../components/KraftSite";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

// Placeholder images
import heroImage from "../assets/kraft-hero.jpg";
import umvadlaImage from "../assets/project-umvadla.jpg";
import hotelImage from "../assets/project-hotel.jpg";
import noticeboardImage from "../assets/project-noticeboard.jpg";

import logoWordmark from "../Logos/Kraft Studios Wordmark T.png";
import logoMonogram from "../Logos/Kraft Studios Monogram T.png";
import logoFull from "../Logos/Kraft Studios T.png";

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
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const services = [
  [
    "01",
    "Systems Architecture",
    "High-performance websites, tailored platforms and automation systems that remove friction from complex operations. We don't just build websites; we design the systems that effect change.",
  ],
  [
    "02",
    "Editorial Identity",
    "Bespoke identities rooted in market intelligence. A strong typographic voice meets considered whitespace, bringing the soul of editorial design into digital spaces.",
  ],
  [
    "03",
    "Motion & Interface",
    "Interactions modeled like physics. Smooth transitions and considered kinetic typography that reward users and build narrative momentum.",
  ],
];

const projects = [
  {
    id: "umvadla",
    image: umvadlaImage,
    alt: "Detailed typography shot",
    tag: "Brandworld",
    title: "Umvadla",
    desc: "Zero-friction editorial publishing infrastructure designed to get out of the writer's way.",
    n: "01",
    cls: "lg:col-span-8",
    ratio: "aspect-[4/3] lg:aspect-[16/9]",
  },
  {
    id: "hotel",
    image: hotelImage,
    alt: "Operations panel",
    tag: "System Design",
    title: "Centralized Hospitality",
    desc: "A connected system replacing 5 fragmented tools for a boutique hotel chain.",
    n: "02",
    cls: "lg:col-span-4",
    ratio: "aspect-square lg:aspect-[3/4]",
  },
  {
    id: "noticeboard",
    image: noticeboardImage,
    alt: "Data visualization",
    tag: "Intelligence",
    title: "Notice Board",
    desc: "Autonomous data pipelines rendering global real-estate metrics in true time.",
    n: "03",
    cls: "lg:col-span-4",
    ratio: "aspect-square lg:aspect-[4/5]",
  },
  {
    id: "sandbox",
    image:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=1200",
    alt: "Abstract generative art",
    tag: "R&D",
    title: "Kinetic Sandbox",
    desc: "WebGL experiments exploring fluid simulation for interactive brand moments.",
    n: "04",
    cls: "lg:col-span-8",
    ratio: "aspect-[4/3] lg:aspect-[16/9]",
  },
];

const clients = [
  "TATA GROUP",
  "ADOBE",
  "NIKE",
  "SPOTIFY",
  "NOTION",
  "AIRBNB",
  "POLestar",
  "LINEAR",
];

// Utility for staggering text lines smoothly (we keep the cool animations!)
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
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

function StaggeredText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {text.split(" ").map((word, wIdx) => (
        <span key={wIdx} className="inline-flex pb-[0.06em] mr-[0.3em] mb-[-0.06em] relative">
          {word.split("").map((char, index) => (
            <motion.span
              key={index}
              variants={textItemVariants}
              className="inline-block origin-bottom-left will-change-transform"
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
}: {
  char: string;
  progress: any;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.1, 1]);
  const y = useTransform(progress, range, [20, 0]);
  const filter = useTransform(progress, range, ["blur(4px)", "blur(0px)"]);
  return (
    <motion.span
      style={{ opacity, y, filter }}
      className="inline-block relative will-change-transform"
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
  windowEnd = 0.47
}: {
  text: string;
  progress: any;
  className?: string;
  windowStart?: number;
  windowEnd?: number;
}) {
  const words = text.split(" ");
  let charCount = 0;
  const totalChars = text.replace(/\s/g, "").length;

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, wIdx) => {
        const chars = word.split("");
        return (
          <span key={wIdx} className="inline-flex mr-[0.3em] relative">
            {chars.map((char, index) => {
              const start = charCount / totalChars;
              const end = start + 1 / totalChars;
              charCount++;

              // Map the character's relative position (0-1) into the provided global scroll window
              const localStart = windowStart + start * (windowEnd - windowStart);
              // give the character a small duration (e.g. 0.05 global progress) to animate its opacity/y
              const localEnd = Math.min(1, localStart + 0.06);
              const range = [localStart, localEnd] as [number, number];

              return <ScrollRevealChar key={index} char={char} progress={progress} range={range} />
            })}
          </span>
        );
      })}
    </span>
  );
}

function ServiceBox({ n, title, copy, index }: any) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1.1", "0.6 1"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const smoothScaleY = useSpring(scaleY, { stiffness: 60, damping: 20 });
  const clipPath = useTransform(scrollYProgress, [0, 1], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);

  return (
    <motion.div
      ref={ref}
      style={{ scaleY: smoothScaleY, opacity }}
      className="relative flex flex-col group h-full"
    >
      <motion.div
        style={{ clipPath }}
        className="absolute inset-0 border border-paper/10 bg-paper/5 rounded pointer-events-none z-0 transition-colors duration-500 group-hover:bg-paper/10"
      />
      <div className="relative z-10 flex flex-col h-full p-8 md:p-10">
        <span className="font-display font-medium text-reg text-xl transition-colors group-hover:text-white">
          {n} —
        </span>
        <h3 className="mt-4 font-display text-2xl lg:text-3xl font-semibold tracking-tight">
          {title}
        </h3>
        <p className="mt-4 text-paper/60 leading-relaxed text-[15px]">{copy}</p>
      </div>
    </motion.div>
  );
}

// Animation primitives for the page
function BlueprintLine() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <motion.svg
      ref={ref}
      viewBox="0 0 1200 300"
      fill="none"
      className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-[600px] text-reg/30 hidden md:block pointer-events-none z-0"
      preserveAspectRatio="none"
      style={{ opacity }}
    >
      <motion.path
        d="M 0 150 C 200 150, 200 250, 400 250 C 600 250, 600 50, 800 50 C 1000 50, 1000 150, 1200 150"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="6 6"
        style={{ pathLength }}
      />
    </motion.svg>
  );
}

function MantraSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const rotateScroll = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const textX = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section
      ref={ref}
      className="bg-ink/5 border-t border-line py-20 lg:py-32 overflow-hidden relative group"
    >
      {/* Aesthetic filler background elements */}
      <motion.div
        style={{ y, scale, opacity }}
        className="absolute -right-20 lg:-right-40 -top-20 lg:-top-40 w-[20rem] lg:w-[40rem] h-[20rem] lg:h-[40rem] rounded-full filter blur-[80px] bg-reg mix-blend-multiply pointer-events-none"
      />

      {/* Scroll-driven rotating mark */}
      <motion.div
        style={{ rotate: rotateScroll, opacity: useTransform(opacity, [0, 1], [0, 0.15]) }}
        className="absolute left-10 -bottom-20 w-[30rem] h-[30rem] border border-ink rounded-full border-dashed pointer-events-none hidden lg:block"
      />

      <div className="site-shell grid grid-cols-12 gap-8 lg:gap-6 relative z-10">
        <div className="col-span-12 lg:col-span-3 flex flex-col justify-between">
          <Reveal>
            <Eyebrow>04 — The Mantra</Eyebrow>
          </Reveal>

          {/* Engineering Filler Animation */}
          <motion.div
            style={{ y: textX }}
            className="hidden lg:flex flex-col gap-2 mt-auto pb-4 opacity-40"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="flex items-end gap-1 h-12">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 bg-ink"
                  animate={{
                    height: ["20%", "80%", "40%", "100%", "30%", "20%"],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeIn",
                    repeatType: "mirror",
                  }}
                />
              ))}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest mt-2">
              Sys. Output // {new Date().getFullYear()}
            </div>
          </motion.div>
        </div>

        <div className="col-span-12 lg:col-span-9 flex flex-col justify-center">
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-[8rem] font-semibold leading-[0.95] tracking-tight">
            <div className="w-full relative">
              {/* Animates during 20% to 42% of section scroll (as it enters the viewport) */}
              <ScrollRevealText
                text="Why build ordinary?"
                progress={scrollYProgress}
                className="pr-4"
                windowStart={0.20}
                windowEnd={0.42}
              />
            </div>
            <motion.div
              style={{ x: useTransform(scrollYProgress, [0, 1], [0, 30]) }}
              className="w-full mt-4 lg:mt-8"
            >
              <span className="text-ink/60 font-serif italic pr-4">
                {/* Sequences right after the first sentence finishes: 42% to 65% */}
                <ScrollRevealText
                  text="We design frameworks that leave a legacy."
                  progress={scrollYProgress}
                  windowStart={0.42}
                  windowEnd={0.65}
                />
              </span>
            </motion.div>
          </h2>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  const containerRef = useRef(null);

  // Global scroll for the overall page hero parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const lineScaleX = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const lineScaleY = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <PageFrame>
      <main ref={containerRef}>
        {/* HERO SECTION */}
        <section className="relative overflow-hidden py-16 md:py-32 hidden-print">
          {/* Aesthetic filler marks */}
          <motion.div
            style={{ scaleX: lineScaleX, opacity: 0.2 }}
            className="absolute top-10 md:top-20 left-4 md:left-[clamp(1.25rem,4vw,4rem)] w-16 md:w-32 h-[1px] bg-ink origin-left pointer-events-none"
          />
          <motion.div
            style={{ scaleY: lineScaleY, opacity: 0.2 }}
            className="absolute top-10 md:top-20 left-4 md:left-[clamp(1.25rem,4vw,4rem)] w-[1px] h-16 md:h-32 bg-ink origin-top pointer-events-none"
          />

          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="site-shell relative z-10"
          >
            <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10 xl:gap-24">
              <div className="w-full xl:w-2/3">
                <Eyebrow>01 — Studio</Eyebrow>

                {/* Kraft Studios Logo (Enlarged & cropped without tagline) */}
                <div className="w-[240px] sm:w-[320px] lg:w-[460px] h-[170px] sm:h-[230px] lg:h-[320px] mt-6 mb-8 flex items-start justify-start relative overflow-hidden shrink-0">
                  <img
                    src={logoFull}
                    alt="Kraft Studios Logo"
                    className="w-full h-[auto] origin-top object-contain opacity-95"
                  />
                </div>

                <motion.div
                  variants={textContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="mt-6 flex flex-col uppercase font-display font-bold leading-[0.95] text-[clamp(2.5rem,8vw,8rem)] md:text-[clamp(3rem,8vw,9rem)] tracking-tight break-words"
                >
                  <StaggeredText text="Engineered" />
                  <StaggeredText text="Aesthetics." className="text-reg" />
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="w-full xl:w-[28%] xl:ml-auto xl:max-w-[400px] mt-10 xl:mt-4 text-lg lg:text-xl leading-relaxed opacity-80 font-medium pb-2 xl:pb-8"
              >
                <p>
                  Connecting craft with evidence, design with engineering, people with systems. We
                  don’t just design digital shells; we build the brandworlds and operational engines
                  that power them.
                </p>
                <Link
                  to="/about"
                  className="link-line mt-8 text-base font-semibold uppercase tracking-wider"
                >
                  Read the manifesto <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <div className="site-shell mt-16 md:mt-24 grid grid-cols-12 gap-6 relative z-0">
            <div className="col-span-12 hero-image-wrap rounded-sm overflow-hidden h-[45vh] lg:h-[75vh]">
              <motion.img
                style={{ y: heroY }}
                src={heroImage}
                alt="Studio process"
                className="w-full h-[140%] -mt-[20%] object-cover grayscale opacity-90"
              />
            </div>
          </div>
        </section>

        {/* LOGO WALL - Trusted By */}
        <section
          className="border-y border-line bg-paper py-16 overflow-hidden select-none"
          aria-label="Trusted by clients"
        >
          <div className="site-shell pb-12 flex flex-col items-center text-center">
            <Eyebrow>Trusted By</Eyebrow>
            <p className="mt-4 text-ink/50 max-w-sm text-sm">
              Teams working on ambitious technical and brand problems.
            </p>
          </div>
          <div className="site-shell grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 items-center justify-items-center opacity-80">
            {clients.map((logo, i) => (
              <Reveal key={logo} delay={i * 50}>
                <span className="font-display font-medium text-2xl md:text-3xl lg:text-4xl tracking-tighter text-ink/40 hover:text-ink transition-colors duration-500 cursor-default">
                  {logo}
                </span>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SYSTEM BLUEPRINT SECTION */}
        <section className="bg-ink text-paper py-24 lg:py-40 relative overflow-hidden group">
          {/* Aesthetic filler background elements */}
          <motion.div
            initial={{ opacity: 0, rotate: -15, scale: 0.9 }}
            whileInView={{ opacity: 0.03, rotate: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute top-0 right-0 lg:-right-20 w-[40rem] h-[40rem] bg-paper/20 rounded-full blur-[100px] pointer-events-none"
          />

          {/* Animated structural blueprint line tied to scroll */}
          <BlueprintLine />

          <div className="site-shell relative z-10">
            <Reveal className="mb-16 lg:mb-24 flex flex-col md:flex-row items-end justify-between gap-8">
              <div className="max-w-2xl">
                <Eyebrow light>02 — System Blueprint</Eyebrow>
                <h2 className="mt-8 font-display text-3xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
                  Our operating loop compounds value. Everything flows from strategy to code.
                </h2>
              </div>
              <p className="max-w-[60ch] text-paper/60 text-lg lg:text-xl leading-relaxed">
                We remove the translation layer between creative studios and engineering firms by
                putting both disciplines at the exact same table.
              </p>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-y-12 gap-x-8 lg:gap-x-12 border-t border-paper/15 pt-20 lg:pt-32 pb-20 relative min-h-[400px]">
              <BlueprintLine />
              {services.map(([n, title, copy], index) => {
                const offsets = ["md:-translate-y-12", "md:translate-y-16", "md:-translate-y-12"];
                return (
                  <div
                    key={n}
                    className={`relative z-10 h-full ${offsets[index]} transition-transform duration-500 hover:-translate-y-1`}
                  >
                    <ServiceBox n={n} title={title} copy={copy} index={index} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SELECTED WORK SECTION */}
        <section className="site-shell py-24 lg:py-40 relative">
          {/* Subtle grid animation in the background */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="absolute top-40 right-10 w-24 h-24 pointer-events-none hidden lg:grid grid-cols-3 gap-2"
          >
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * i, ease: "easeOut" }}
                className="bg-reg rounded-full w-full h-full"
              />
            ))}
          </motion.div>

          <Reveal className="flex items-end justify-between border-b border-line pb-8 mb-16 lg:mb-24 relative z-10">
            <div>
              <Eyebrow>03 — Selected Work</Eyebrow>
              <h2 className="mt-6 lg:mt-8 font-display text-3xl md:text-5xl lg:text-7xl font-semibold leading-[1.05] tracking-tight">
                Case studies, <br className="hidden md:block" />
                engineered for scale.
              </h2>
            </div>
            <Link to="/work" className="text-link hidden lg:flex hover:text-reg transition-colors">
              Explore the Playground <ArrowRight size={16} />
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-16">
            {projects.map((project) => (
              <ScrubbedProjectCard key={project.title} project={project} />
            ))}
          </div>

          <div className="mt-20 sm:hidden flex justify-center">
            <Link to="/work" className="text-link hover:text-reg transition-colors">
              Explore the Playground <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* MANIFESTO / MANTRA SECTION */}
        <MantraSection />
      </main>
    </PageFrame>
  );
}

function ScrubbedProjectCard({ project }: { project: any }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1.1", "0.5 1"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.93, 1]);

  const smoothOpacity = useSpring(opacity, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 60, damping: 20 });
  const smoothScale = useSpring(scale, { stiffness: 60, damping: 20 });

  return (
    <motion.div
      ref={ref}
      style={{ opacity: smoothOpacity, y: smoothY, scale: smoothScale }}
      className={`group ${project.cls}`}
    >
      <ParallaxImg src={project.image} alt={project.alt} ratio={project.ratio} />
      <div className="mt-6 flex items-start justify-between gap-6">
        <div>
          <Eyebrow>{project.tag}</Eyebrow>
          <h3 className="mt-2 font-display text-2xl lg:text-4xl font-semibold tracking-tight transition-colors group-hover:text-reg">
            {project.title}
          </h3>
          <p className="mt-3 max-w-[40ch] text-base text-ink/70 leading-relaxed">{project.desc}</p>
        </div>
        <span className="font-display font-medium text-reg lg:text-lg">{project.n}</span>
      </div>
    </motion.div>
  );
}

// Reusable individual parallax component for grid images
function ParallaxImg({ src, alt, ratio }: { src: string; alt: string; ratio: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothY = useSpring(scrollYProgress, { stiffness: 60, damping: 15, restDelta: 0.001 });
  const y = useTransform(smoothY, [0, 1], ["-12%", "12%"]);

  return (
    <div ref={ref} className={`overflow-hidden bg-ink/5 ${ratio} w-full rounded-sm relative group`}>
      <motion.img
        style={{ y }}
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-[124%] object-cover absolute top-0 left-0 transition-transform duration-[1.2s] cubic-bezier(0.2, 0.7, 0.2, 1) group-hover:scale-[1.04]"
      />
    </div>
  );
}
