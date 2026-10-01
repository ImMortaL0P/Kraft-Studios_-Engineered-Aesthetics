import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { Eyebrow, FadeUp, PageFrame, PageIntro, Magnetic } from "../components/KraftSite";
import { caseStudies, type CaseStudy } from "../data/caseStudies";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Selected Work — Kraft Studios" },
      {
        name: "description",
        content:
          "Case studies in digital identity, software engineering and data infrastructure — the problem, the architecture and what shipped.",
      },
      { property: "og:title", content: "Selected Work — Kraft Studios" },
      {
        property: "og:description",
        content: "Case studies where design, software and operations work as one.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WorkIndex,
});

function WorkIndex() {
  return (
    <PageFrame>
      <PageIntro
        number="04"
        label="Selected Work"
        title="Every project, opened up."
        copy="Not a gallery. Each study carries the situation it was built for, the architecture underneath it, what shipped, and where it landed — so you can judge the engineering, not just the picture."
      />

      <section className="site-shell pb-24 lg:pb-36">
        <div className="relative mt-12 flex flex-col gap-8 md:gap-12 pb-24">
          {caseStudies.map((study, i) => (
            <CaseStudyCard 
              key={study.slug} 
              study={study} 
              index={i} 
              total={caseStudies.length} 
            />
          ))}
        </div>

        <FadeUp delay={0.1}>
          <div className="mt-14 flex flex-wrap items-end justify-between gap-6 border-t border-line pt-10">
            <Eyebrow>Something like these?</Eyebrow>
            <Magnetic><Link to="/contact" className="pill">Start a project</Link></Magnetic>
          </div>
        </FadeUp>
      </section>
    </PageFrame>
  );
}

function CaseStudyCard({ study, index, total }: { study: CaseStudy; index: number; total: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // We track the scroll progress of THIS card in the viewport.
  // When it hits the top (start start), it sticks down up to index * 40px offsets.
  // The 'end start' means when the bottom of this container hits the top of the viewport.
  // But because they are stacked, we want to track when the *next* card covers it.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Calculate dynamic sticky top position so they stack beautifully like Tetrix
  // For mobile, maybe less offset.
  const stickyTop = `calc(90px + ${index * 35}px)`;
  
  // As the user scrolls past the sticky point, scale it down subtly and dim it.
  // It gives the 3D depth effect as new cards slide over it.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  // bg-paper vs bg-surface alternation to differentiate standard overlapping cards
  const isOdd = index % 2 !== 0;

  return (
    <div ref={containerRef} className="h-auto w-full md:h-[600px] lg:h-[700px] mb-8 lg:mb-16">
      <motion.div
        style={{ top: stickyTop, scale, opacity }}
        className={`sticky origin-top overflow-hidden rounded-xl border border-line p-6 md:p-10 shadow-lg will-change-transform transform-gpu ${
          isOdd ? "bg-surface" : "bg-paper"
        }`}
      >
        <Link
          to="/work/$slug"
          params={{ slug: study.slug }}
          className="group grid h-full grid-cols-12 gap-8 lg:gap-14"
        >
          {/* Content Column */}
          <div className="col-span-12 flex h-full flex-col justify-between md:col-span-6 lg:col-span-5">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-reg">
                {study.n} — {study.client}
              </span>
              <h2 className="mt-4 font-display text-[2.5rem] font-bold leading-[1.05] tracking-tight transition-colors duration-500 group-hover:text-reg md:text-5xl lg:text-[4rem]">
                {study.title}
              </h2>
              <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-ink/70">
                {study.summary}
              </p>
              
              <div className="mt-8 flex flex-wrap gap-2">
                {study.services.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-line/70 bg-background/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/65"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-12 flex items-center justify-between border-t border-line/60 pt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">
                {study.architecture.length} layers · {study.stack.length} technologies · {study.year}
              </p>
              <div className="flex size-10 items-center justify-center rounded-full border border-line transition-transform duration-500 group-hover:bg-reg group-hover:border-reg group-hover:text-paper group-hover:-translate-y-1 group-hover:translate-x-1">
                <ArrowUpRight className="size-4" />
              </div>
            </div>
          </div>

          {/* Image Column */}
          <div className="col-span-12 overflow-hidden rounded-lg border border-line md:col-span-6 lg:col-span-7 h-64 md:h-full relative">
            <div className="absolute inset-0 bg-ink/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
            <motion.img
              // Adding internal subtle motion inside the sticky container is a nice touch, but simple scale handles it!
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              src={study.cover}
              alt={study.coverAlt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
              style={study.coverBg ? { backgroundColor: study.coverBg } : undefined}
            />
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
