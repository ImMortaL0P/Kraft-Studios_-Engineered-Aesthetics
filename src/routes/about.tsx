import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import heroImage from "../assets/kraft-hero.jpg";
import { Eyebrow, PageFrame, PageIntro, Reveal } from "../components/KraftSite";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About — Kraft Studios" }, { name: "description", content: "Kraft Studios is a hybrid design and engineering agency building culturally resonant, operationally sound digital ecosystems." },
    { property: "og:title", content: "About — Kraft Studios" }, { property: "og:description", content: "Building the engine. Designing the soul." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: AboutPage,
});

// Reusable individual parallax component for images
function ParallaxImg({ src, alt, ratio, className = "" }: { src: string; alt: string; ratio: string; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const smoothY = useSpring(scrollYProgress, { stiffness: 60, damping: 15, restDelta: 0.001 });
  const y = useTransform(smoothY, [0, 1], ["-12%", "12%"]);

  return (
    <div ref={ref} className={`overflow-hidden bg-ink/5 ${ratio} w-full relative ${className}`}>
      <motion.img
        style={{ y }}
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-[124%] object-cover absolute top-0 left-0"
      />
    </div>
  );
}

function AnimatedNodeFiller() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  return (
    <div ref={ref} className="hidden md:flex flex-col items-center justify-center opacity-60 w-32 h-32 relative shrink-0">
      <motion.div
        style={{ rotate: rotate1 }}
        className="absolute inset-0 border border-dashed border-paper/30 rounded-full"
      />
      <motion.div
        style={{ rotate: rotate2, scale }}
        className="absolute inset-4 border border-paper/20 rounded-full"
      />
      <div className="w-2 h-2 bg-reg rounded-full z-10 relative" />
      <motion.div
        animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
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
    offset: ["start end", "end start"]
  });

  const pathLength1 = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const pathLength2 = useTransform(scrollYProgress, [0.2, 1], [0, 1]);

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none hidden lg:block overflow-hidden">
      <motion.div
        style={{ scaleY: pathLength1, opacity: 0.1 }}
        className="absolute top-0 right-[20%] w-[1px] h-full bg-paper origin-top"
      />
      <motion.div
        style={{ scaleY: pathLength2, opacity: 0.05 }}
        className="absolute top-0 right-[40%] w-[1px] h-full bg-paper origin-top"
      />
    </div>
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
            <Reveal className="col-span-12 lg:col-span-5 relative z-10">
              <ParallaxImg 
                src={heroImage} 
                alt="A designer aligning marks by hand" 
                ratio="aspect-[4/5]" 
                className="rounded-md shadow-sm"
              />
            </Reveal>
            
            <div className="col-span-12 lg:col-span-7 flex flex-col justify-center mt-12 lg:mt-0 relative z-0">
              <Reveal>
                <Eyebrow>Our point of view</Eyebrow>
                <p className="mt-8 font-display text-3xl sm:text-4xl md:text-5xl leading-tight lg:text-6xl font-medium tracking-tight">
                  A brand is not a surface placed over a system. It is the system people can feel.
                </p>
              </Reveal>
              
              <div className="mt-16 grid gap-12 border-t border-line pt-12 sm:grid-cols-2">
                <Reveal delay={100}>
                  <h2 className="font-display text-2xl lg:text-3xl font-semibold">Culturally resonant</h2>
                  <p className="mt-4 text-base lg:text-lg leading-relaxed text-ink/70 max-w-[28ch]">
                    We draw from living visual traditions without reducing them to decoration, creating identities with actual gravity.
                  </p>
                </Reveal>
                <Reveal delay={200}>
                  <h2 className="font-display text-2xl lg:text-3xl font-semibold">Operationally exact</h2>
                  <p className="mt-4 text-base lg:text-lg leading-relaxed text-ink/70 max-w-[28ch]">
                    Every interface is backed by architecture designed to remain useful, fast and reliable under real-world pressure.
                  </p>
                </Reveal>
              </div>
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
                  Three interconnected groups,<br className="hidden md:block" />one unified standard.
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
                  The hub for high-value creative engineering, visual branding and custom software. Solving problems through architecture.
                </p>
              </Reveal>
              
              <Reveal delay={100} className="flex flex-col group">
                <div className="h-[2px] w-12 bg-reg mb-8 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                <h2 className="font-display text-3xl font-semibold">Brush.in</h2>
                <p className="mt-4 text-[17px] leading-relaxed text-paper/70 pr-4">
                  The product and fulfilment spoke connecting creative assets with physical deployment and logistics APIs.
                </p>
              </Reveal>
              
              <Reveal delay={200} className="flex flex-col group">
                <div className="h-[2px] w-12 bg-reg mb-8 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                <h2 className="font-display text-3xl font-semibold">The Notice Board</h2>
                <p className="mt-4 text-[17px] leading-relaxed text-paper/70 pr-4">
                  The innovation sandbox proving autonomous data architecture, scraping and agentic processing at real-world scale.
                </p>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
    </PageFrame>
  ); 
}
