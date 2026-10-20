import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import {
  Eyebrow,
  FadeUp,
  PageFrame,
  PageIntro,
  Magnetic,
  CornerMarks,
} from "../components/KraftSite";
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
      { property: "og:url", content: "https://kraftstudios.site/work" },
      { property: "og:image", content: "https://kraftstudios.site/og-image.png" },
      { property: "og:image:secure_url", content: "https://kraftstudios.site/og-image.png" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Selected Work — Kraft Studios" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Selected Work — Kraft Studios" },
      {
        name: "twitter:description",
        content: "Case studies where design, software and operations work as one.",
      },
      { name: "twitter:image", content: "https://kraftstudios.site/og-image.png" },
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
            <CaseStudyCard key={study.slug} study={study} index={i} total={caseStudies.length} />
          ))}
        </div>

        <FadeUp delay={0.1}>
          <div className="mt-14 flex flex-wrap items-end justify-between gap-6 border-t border-line pt-10">
            <Eyebrow>Something like these?</Eyebrow>
            <Magnetic>
              <Link to="/contact" className="pill">
                Start a project
              </Link>
            </Magnetic>
          </div>
        </FadeUp>
      </section>
    </PageFrame>
  );
}

function CaseStudyCard({
  study,
  index,
  total,
}: {
  study: CaseStudy;
  index: number;
  total: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // We track the scroll progress of THIS card in the viewport.
  // When it hits the top (start start), it sticks down up to index * 40px offsets.
  // The 'end start' means when the bottom of this container hits the top of the viewport.
  // But because they are stacked, we want to track when the *next* card covers it.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
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
    <div ref={containerRef} className="mb-8 h-auto w-full md:mb-16 md:h-[600px] lg:h-[700px]">
      <motion.div
        style={{ top: stickyTop, scale, opacity }}
        className={`origin-top overflow-hidden rounded-xl border border-line p-5 shadow-lg md:sticky md:p-10 ${
          isOdd ? "bg-surface" : "bg-paper"
        }`}
      >
        {study.inPipeline ? (
          <div className="group grid h-full grid-cols-1 gap-6 md:grid-cols-12 md:gap-8 lg:gap-14 cursor-default select-none">
            {/* Content Column */}
            <div className="col-span-12 flex h-full flex-col justify-between md:col-span-6 lg:col-span-5">
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-reg">
                    {study.n} — {study.client}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400">
                    <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
                    Under Pipeline
                  </span>
                </div>
                <h2 className="mt-4 font-display text-[2.5rem] font-bold leading-[1.05] tracking-tight text-ink md:text-5xl lg:text-[4rem]">
                  {study.title}
                </h2>
                <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-ink/70">
                  {study.summary}
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {study.services.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-line/70 bg-surface/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/65"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-12 flex items-center justify-between border-t border-line/60 pt-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">
                  {study.architecture.length} layers · {study.stack.length} technologies ·{" "}
                  {study.year}
                </p>
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
                  <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
                  In Pipeline
                </div>
              </div>
            </div>

            {/* Cover Media Column */}
            <div className="relative col-span-12 h-80 sm:h-96 md:h-full min-h-[360px] md:min-h-[450px] overflow-hidden rounded-lg border border-line bg-surface transition-colors duration-500 md:col-span-6 lg:col-span-7">
              <CornerMarks
                size={16}
                stroke={1.5}
                className="pointer-events-none absolute inset-3 z-20 text-amber-500/30"
              />
              {study.logo ? (
                <div className="relative flex h-full w-full flex-col items-center justify-between p-6 sm:p-8 md:p-10 select-none bg-[radial-gradient(var(--line)_1px,transparent_1px)] [background-size:20px_20px]">
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
                      UNDER PIPELINE
                    </span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <Link
            data-cursor-text="VIEW STUDY"
            to="/work/$slug"
            params={{ slug: study.slug }}
            className="group grid h-full grid-cols-1 gap-6 md:grid-cols-12 md:gap-8 lg:gap-14"
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
                      data-cursor="link"
                      className="rounded-full border border-line/70 bg-surface/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/65 hover:border-reg/50 transition-colors duration-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-12 flex items-center justify-between border-t border-line/60 pt-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">
                  {study.architecture.length} layers · {study.stack.length} technologies ·{" "}
                  {study.year}
                </p>
                <Magnetic>
                  <div className="flex size-10 items-center justify-center rounded-full border border-line transition-transform duration-500 group-hover:bg-reg group-hover:border-reg group-hover:text-paper group-hover:-translate-y-1 group-hover:translate-x-1">
                    <ArrowUpRight className="size-4" />
                  </div>
                </Magnetic>
              </div>
            </div>

            {/* Cover Media Column */}
            <div className="relative col-span-12 h-80 sm:h-96 md:h-full min-h-[360px] md:min-h-[450px] overflow-hidden rounded-lg border border-line bg-surface transition-colors duration-500 md:col-span-6 lg:col-span-7">
              <CornerMarks
                size={16}
                stroke={1.5}
                className="pointer-events-none absolute inset-3 z-20 text-ink/25 transition-colors duration-500 group-hover:text-reg"
              />
              {study.logo ? (
                <div className="relative flex h-full w-full flex-col items-center justify-between p-6 sm:p-8 md:p-10 select-none bg-[radial-gradient(var(--line)_1px,transparent_1px)] [background-size:20px_20px]">
                  <div className="flex w-full items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45 z-10">
                    <span>SYS // {study.n}</span>
                    <span>{study.year} · SPEC</span>
                  </div>
                  <div className="flex flex-1 items-center justify-center w-full py-4 z-10">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      src={study.logo}
                      alt={study.client}
                      className={`${study.logoClass || "max-h-24 w-auto max-w-[70%]"} object-contain transition-transform duration-500 ${study.logoDark ? "dark:hidden" : ""}`}
                    />
                    {study.logoDark && (
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        src={study.logoDark}
                        alt={study.client}
                        className={`${study.logoClass || "max-h-24 w-auto max-w-[70%]"} object-contain transition-transform duration-500 hidden dark:block`}
                      />
                    )}
                  </div>
                  <div className="flex w-full items-center justify-between font-mono text-[9px] uppercase tracking-[0.22em] text-ink/45 z-10">
                    <span className="truncate">{study.client}</span>
                    <span className="flex items-center gap-1.5 text-reg font-medium">
                      <span className="inline-block size-1.5 rounded-full bg-reg animate-pulse" />
                      CASE STUDY
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="absolute inset-0 z-10 bg-ink/5 transition-colors duration-500 group-hover:bg-transparent" />
                  <motion.img
                    // Adding internal subtle motion inside the sticky container is a nice touch, but simple scale handles it!
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    src={study.cover}
                    alt={study.coverAlt}
                    loading="lazy"
                    decoding="async"
                    className={`absolute inset-0 h-full w-full ${study.coverFit === "contain" ? "object-contain p-8 md:p-12" : "object-cover"}`}
                    style={study.coverBg ? { backgroundColor: study.coverBg } : {}}
                  />
                </>
              )}
            </div>
          </Link>
        )}
      </motion.div>
    </div>
  );
}
