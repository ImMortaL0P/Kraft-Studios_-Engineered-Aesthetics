import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import heroImage from "../assets/kraft-craft-system.webp";
import kumarArtwork from "../assets/team/kumar.webp";
import architArtwork from "../assets/team/archit.webp";
import chiragArtwork from "../assets/team/chirag.webp";
import aryanArtwork from "../assets/team/aryan.webp";
import piyushArtwork from "../assets/team/piyush.webp";
import { Eyebrow, PageFrame, PageIntro, Reveal, CornerMarks } from "../components/KraftSite";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Kraft Studios" },
      {
        name: "description",
        content:
          "Kraft Studios is a hybrid design and engineering agency building culturally resonant, operationally sound digital ecosystems.",
      },
      { property: "og:title", content: "About — Kraft Studios" },
      { property: "og:description", content: "Building the engine. Designing the soul." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

// Reusable individual parallax component for images
function ParallaxImg({
  src,
  alt,
  ratio,
  className = "",
}: {
  src: string;
  alt: string;
  ratio: string;
  className?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothY = useSpring(scrollYProgress, { stiffness: 60, damping: 15, restDelta: 0.001 });
  const y = useTransform(smoothY, [0, 1], ["-12%", "12%"]);
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} className={`overflow-hidden bg-ink/5 ${ratio} w-full relative ${className}`}>
      <motion.img
        style={{ y: reduceMotion ? 0 : y }}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        className="w-full h-[124%] object-cover absolute top-0 left-0"
      />
    </div>
  );
}

function AnimatedNodeFiller() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const reduceMotion = useReducedMotion();

  return (
    <div
      ref={ref}
      className="hidden md:flex flex-col items-center justify-center opacity-60 w-32 h-32 relative shrink-0"
    >
      <motion.div
        style={{ rotate: reduceMotion ? 0 : rotate1 }}
        className="absolute inset-0 border border-dashed border-paper/30 rounded-full"
      />
      <motion.div
        style={{ rotate: reduceMotion ? 0 : rotate2, scale: reduceMotion ? 1 : scale }}
        className="absolute inset-4 border border-paper/20 rounded-full"
      />
      <div className="w-2 h-2 bg-reg rounded-full z-10 relative" />
      <motion.div
        animate={reduceMotion ? false : { scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        className="absolute w-2 h-2 bg-reg rounded-full z-0"
      />
    </div>
  );
}

function AnimatedLinesBackground() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const pathLength1 = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const pathLength2 = useTransform(scrollYProgress, [0.2, 1], [0, 1]);
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none hidden lg:block overflow-hidden">
      <motion.div
        style={{ scaleY: reduceMotion ? 1 : pathLength1, opacity: 0.1 }}
        className="absolute top-0 right-[20%] w-[1px] h-full bg-paper origin-top"
      />
      <motion.div
        style={{ scaleY: reduceMotion ? 1 : pathLength2, opacity: 0.05 }}
        className="absolute top-0 right-[40%] w-[1px] h-full bg-paper origin-top"
      />
    </div>
  );
}

function TeamPhoto({
  src,
  alt,
  firstName,
}: {
  src: string;
  alt: string;
  firstName: string;
}) {
  const photoRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0.5, y: 0.5, active: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;
    if (!photoRef.current) return;
    const rect = photoRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setCoords({ x, y, active: true });
  };

  const handleMouseLeave = () => {
    setCoords((prev) => ({ ...prev, active: false }));
  };

  return (
    <div
      ref={photoRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-text={firstName.toUpperCase()}
      className="relative aspect-[1.15/1] overflow-hidden rounded-sm bg-surface transition-transform duration-500 ease-out"
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        animate={{
          scale: coords.active ? 1.05 : 1,
          x: coords.active ? (coords.x - 0.5) * 10 : 0,
          y: coords.active ? (coords.y - 0.5) * 10 : 0,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        className="h-full w-full object-cover object-center"
      />
      {coords.active && (
        <div
          className="pointer-events-none absolute inset-0 mix-blend-soft-light transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 160px at ${coords.x * 100}% ${coords.y * 100}%, rgba(255,255,255,0.45), transparent 80%)`,
          }}
        />
      )}
      <CornerMarks
        size={12}
        stroke={1.5}
        className="pointer-events-none absolute inset-2 text-paper/30 transition-colors duration-500 group-hover:text-reg/70"
      />
      <span className="absolute bottom-3 left-3 border border-paper/25 bg-ink/75 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-paper backdrop-blur-md">
        Kraft / People
      </span>
    </div>
  );
}

function TeamCard({
  name,
  role,
  href,
  image,
  bio,
  tags = [],
  className = "",
  children,
}: {
  name: string;
  role: string;
  href: string;
  image: string;
  bio: string;
  tags?: string[];
  className?: string;
  children?: ReactNode;
}) {
  const firstName = name.split(" ")[0] ?? name;

  return (
    <article
      data-cursor="explore"
      className={`group flex h-full flex-col bg-paper p-5 transition-colors duration-500 hover:bg-surface md:p-6 lg:p-7 ${className}`}
    >
      <TeamPhoto src={image} alt={`${name} — ${role}`} firstName={firstName} />

      <div className="flex flex-1 flex-col pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-reg">{role}</p>
        <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink md:text-[1.7rem]">
          {name}
        </h3>

        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                data-cursor="link"
                className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-ink/65 transition-colors hover:border-reg hover:text-reg"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {children}

        <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-ink/70">{bio}</p>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="visit"
          aria-label={`View ${name} on LinkedIn (opens in a new tab)`}
          className="mt-auto inline-flex min-h-11 w-fit items-center gap-2 border-b border-line pt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/65 transition-colors hover:border-reg hover:text-reg"
        >
          LinkedIn profile <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

function AboutPage() {
  return (
    <PageFrame>
      <main>
        <PageIntro
          number="03"
          label="About"
          title="Building the engine. Designing the soul."
          copy="Kraft Studios is a premium hybrid agency for organisations that refuse to choose between expressive design and robust technology."
        />

        <section className="border-t border-line">
          <div className="site-shell grid grid-cols-12 gap-8 lg:gap-16 py-24 lg:py-40">
            <Reveal className="col-span-12 lg:col-span-5 relative z-10" id="studio-pov">
              <div data-cursor-text="PRECISION">
                <ParallaxImg
                  src={heroImage}
                  alt="Digital systems architecture schematics, design tokens, and modular UI component trees calibrated on a studio display"
                  ratio="aspect-[4/3] sm:aspect-[4/5]"
                  className="rounded-md shadow-sm"
                />
              </div>
            </Reveal>

            <div className="relative z-0 col-span-12 mt-10 flex flex-col justify-center lg:col-span-7 lg:mt-0">
              <Reveal>
                <Eyebrow>Our point of view</Eyebrow>
                <p className="mt-8 font-display text-3xl sm:text-4xl md:text-5xl leading-tight lg:text-6xl font-medium tracking-tight">
                  A brand is not a surface placed over a system. It is the system people can feel.
                </p>
              </Reveal>

              <div className="mt-16 grid gap-12 border-t border-line pt-12 sm:grid-cols-2">
                <Reveal delay={100}>
                  <h2 className="font-display text-2xl lg:text-3xl font-semibold">
                    Culturally resonant
                  </h2>
                  <p className="mt-4 text-base lg:text-lg leading-relaxed text-ink/70 max-w-[28ch]">
                    We draw from living visual traditions without reducing them to decoration,
                    creating identities with actual gravity.
                  </p>
                </Reveal>
                <Reveal delay={200}>
                  <h2 className="font-display text-2xl lg:text-3xl font-semibold">
                    Operationally exact
                  </h2>
                  <p className="mt-4 text-base lg:text-lg leading-relaxed text-ink/70 max-w-[28ch]">
                    Every interface is backed by architecture designed to remain useful, fast and
                    reliable under real-world pressure.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface relative border-t border-line py-24 lg:py-40">
          <div className="site-shell">
            <Reveal>
              <Eyebrow>The Infrastructure</Eyebrow>
              <h2 className="mt-6 font-display text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tight">
                The team behind it all
              </h2>
              <p className="mt-5 max-w-[54ch] text-base leading-relaxed text-ink/60">
                A close-knit team bringing design, engineering and operational thinking to the same
                table.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-3 lg:mt-20">
              <Reveal className="h-full">
                <TeamCard
                  name="Archit Raj"
                  role="Software Engineer"
                  href="https://www.linkedin.com/in/archit-raj-5779b51b9/"
                  image={architArtwork}
                  tags={["Computer Science", "Full-Stack", "Web Systems", "BIT Mesra"]}
                  bio="Computer Science & Engineering graduate from BIT Mesra. Focused on architecting resilient web platforms, end-to-end data pipelines, and bridging performant backend services with seamless frontend UI."
                />
              </Reveal>
              <Reveal delay={80} className="h-full">
                <TeamCard
                  name="Aryan Singh"
                  role="AI & Full-Stack Engineer"
                  href="https://www.linkedin.com/in/aryan-singh-pk009/"
                  image={aryanArtwork}
                  tags={["AI Tooling / MCP", "Spring Boot", "React", "Distributed Systems"]}
                  bio="BIT Mesra CSE alumnus and AI Software Engineer at Amdocs. Experienced in scalable Spring Boot microservices, Kafka pipelines, Kubernetes, and developer tooling—including custom MCP servers and Cursor agent workflows."
                />
              </Reveal>
              <Reveal delay={160} className="h-full">
                <TeamCard
                  name="Chirag Kapil"
                  role="Frontend Engineer"
                  href="https://www.linkedin.com/in/chirag-kapil-93810a22a/"
                  image={chiragArtwork}
                  tags={["React", "JavaScript", "Frontend Architecture", "Spinny"]}
                  bio="Frontend engineer with engineering roots at BIT Mesra and industry experience at Spinny. Specializes in building modern React component architectures, stateful application flows, and responsive user experiences."
                />
              </Reveal>
              <Reveal delay={240} className="h-full">
                <TeamCard
                  name="Kumar Mangalam"
                  role="Founder / Creative Head"
                  href="https://www.linkedin.com/in/kumar-mangalam-362a77176/"
                  image={kumarArtwork}
                  tags={["Mechanical Eng.", "CS Minor", "Operations Lead", "Design Systems"]}
                  bio="BIT Mesra graduate bringing hard engineering rigor into visual identity and digital ecosystems. Former Operations Engineer at Jindal Steel & Power turned lead designer and architectural brain behind Kraft Studios."
                />
              </Reveal>
              <Reveal delay={320} className="h-full">
                <TeamCard
                  name="Piyush Raj"
                  role="Frontend Developer"
                  href="https://www.linkedin.com/in/piyush-raj-158970212/"
                  image={piyushArtwork}
                  tags={["React", "TypeScript", "Tailwind CSS", "Startups"]}
                  bio="Frontend developer with one year of experience building in fast-paced startup environments. Specialized in crafting responsive, accessible user interfaces using TypeScript, React, and Tailwind CSS."
                />
              </Reveal>
            </div>
          </div>
        </section>

        <section className="bg-ink text-paper py-24 lg:py-40 selection:bg-reg selection:text-paper relative overflow-hidden">
          {/* Subtle line animations tied to scroll */}
          <AnimatedLinesBackground />

          <div className="site-shell relative z-10">
            <Reveal className="flex flex-col md:flex-row md:items-end justify-between border-b border-paper/15 pb-8 mb-16 lg:mb-24 gap-8">
              <div>
                <Eyebrow light>The ecosystem</Eyebrow>
                <h2 className="mt-6 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
                  Three interconnected groups,
                  <br className="hidden md:block" />
                  one unified standard.
                </h2>
              </div>

              {/* Animated node diagram filler */}
              <AnimatedNodeFiller />
            </Reveal>

            <div className="grid lg:grid-cols-3 gap-y-16 gap-x-8 lg:gap-x-12">
              <Reveal delay={0} className="flex flex-col group">
                <div className="h-[2px] w-12 bg-reg mb-8 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                <h2 className="font-display text-3xl font-semibold">Kraft Studios</h2>
                <p className="mt-4 text-[17px] leading-relaxed text-paper/70 pr-4">
                  The hub for high-value creative engineering, visual branding and custom software.
                  Solving problems through architecture.
                </p>
              </Reveal>

              <Reveal delay={100} className="flex flex-col group">
                <div className="h-[2px] w-12 bg-reg mb-8 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                <h2 className="font-display text-3xl font-semibold">Brush.in</h2>
                <p className="mt-4 text-[17px] leading-relaxed text-paper/70 pr-4">
                  The product and fulfilment spoke connecting creative assets with physical
                  deployment and logistics APIs.
                </p>
              </Reveal>

              <Reveal delay={200} className="flex flex-col group">
                <div className="h-[2px] w-12 bg-reg mb-8 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                <h2 className="font-display text-3xl font-semibold">The Notice Board</h2>
                <p className="mt-4 text-[17px] leading-relaxed text-paper/70 pr-4">
                  The innovation sandbox proving autonomous data architecture, scraping and agentic
                  processing at real-world scale.
                </p>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
    </PageFrame>
  );
}
