import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring, useVelocity } from "framer-motion";
import { useState, useRef } from "react";
import { Eyebrow, PageFrame, PageIntro, Reveal } from "../components/KraftSite";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Kraft Studios" },
      {
        name: "description",
        content:
          "Brand architecture, custom software engineering and connected fulfilment infrastructure from Kraft Studios.",
      },
      { property: "og:title", content: "Services — Kraft Studios" },
      {
        property: "og:description",
        content: "One studio for the brand, software engine and operational layer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

const capabilities = [
  {
    n: "01",
    title: "Digital Identity & Brand Architecture",
    copy: "Bespoke visual systems shaped by market context and cultural intelligence. We translate identity from expressive assets into durable rules that work everywhere.",
    items: [
      "Brand strategy",
      "Visual identity",
      "Cultural pattern systems",
      "Digital design systems",
    ],
  },
  {
    n: "02",
    title: "Custom Web & System Engineering",
    copy: "High-performance digital tools engineered around how people actually work. We remove technical bottlenecks without compromising the visual experience.",
    items: ["Web platforms", "Tailored CMS", "Internal tools & CRM", "APIs & automation"],
  },
  {
    n: "03",
    title: "Supply Chain & Fulfillment Infrastructure",
    copy: "Through the Brush.in ecosystem, we connect custom physical production with logistics, tracking and decision-ready operational views.",
    items: [
      "Corporate fulfilment",
      "Logistics integrations",
      "Operational dashboards",
      "Distribution systems",
    ],
  },
];

function BandwidthBars() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Use scroll velocity to drive the animation height smoothly
  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityY = useTransform(smoothVelocity, [-0.5, 0.5], ["-80%", "80%"]);

  return (
    <div
      ref={ref}
      className="hidden lg:flex mt-12 overflow-hidden w-full max-w-[200px] gap-1 opacity-20 relative h-20 items-end"
    >
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          style={{ y: velocityY }}
          initial={{ height: `${20 + Math.random() * 80}%` }}
          animate={{
            height: [`${20 + Math.random() * 80}%`, `${20 + Math.random() * 80}%`],
          }}
          transition={{
            duration: 1.5 + Math.random(),
            delay: i * 0.05,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="w-full bg-paper"
        />
      ))}
    </div>
  );
}

function ServicesPage() {
  const [activeSegment, setActiveSegment] = useState(0);

  return (
    <PageFrame>
      <main>
        <PageIntro
          number="02"
          label="Services"
          title="One source of truth"
          copy="Separate teams create seams. We bring the designers, engineers and operational thinkers to one table so the idea survives every handoff."
        />

        <section className="border-t border-line">
          <div className="site-shell py-16 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            <div className="lg:col-span-4 relative">
              <div className="lg:sticky top-32">
                <Eyebrow className="block mb-6 lg:mb-8">Capabilities</Eyebrow>
                <div className="flex flex-col gap-4 relative">
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-line" />

                  <motion.div
                    layout
                    className="absolute left-0 w-[2px] bg-reg origin-top transition-all duration-500 ease-out"
                    style={{
                      top: `${(activeSegment * 100) / capabilities.length}%`,
                      height: `${100 / capabilities.length}%`,
                    }}
                  />

                  {capabilities.map((cap, i) => (
                    <button
                      key={cap.n}
                      onClick={() => {
                        setActiveSegment(i);
                        document
                          .getElementById(`cap-${i}`)
                          ?.scrollIntoView({ behavior: "smooth", block: "center" });
                      }}
                      className={`flex items-start gap-4 p-4 pl-6 text-left transition-colors duration-300 ${activeSegment === i ? "text-ink" : "text-ink/40 hover:text-ink/70"}`}
                    >
                      <span className="font-mono text-xs mt-1">{cap.n}</span>
                      <span className="font-display text-xl lg:text-3xl font-medium tracking-tight leading-none">
                        {cap.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1" />

            <div className="lg:col-span-7 flex flex-col gap-32 pb-32">
              {capabilities.map((cap, index) => (
                <Reveal key={cap.n} id={`cap-${index}`} className="scroll-mt-32">
                  <motion.div
                    onViewportEnter={() => setActiveSegment(index)}
                    viewport={{ margin: "-40% 0px -40% 0px" }}
                  >
                    <span className="font-display text-reg text-xl">{cap.n} —</span>
                    <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
                      {cap.title}
                    </h2>
                    <p className="mt-6 text-lg lg:text-xl text-ink/70 leading-relaxed max-w-[45ch]">
                      {cap.copy}
                    </p>

                    <div className="mt-12 pt-12 border-t border-line grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                      {cap.items.map((item) => (
                        <div
                          key={item}
                          className="flex flex-col gap-3 pb-3 border-b border-line group"
                        >
                          <span className="text-base font-medium text-ink/90 group-hover:text-reg transition-colors">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-ink text-paper selection:bg-reg selection:text-paper relative overflow-hidden">
          {/* Aesthetic filler background shape */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.05, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] lg:w-[60rem] h-[30rem] lg:h-[60rem] bg-paper/20 rounded-full blur-[120px] pointer-events-none"
          />

          <div className="site-shell grid grid-cols-12 gap-6 py-24 lg:py-40 relative z-10">
            <div className="col-span-12 lg:col-span-3">
              <Eyebrow light>The integrated advantage</Eyebrow>

              <BandwidthBars />

              <div className="hidden lg:block font-mono text-[10px] text-paper/30 mt-4 uppercase">
                Bandwidth / Sys
              </div>
            </div>
            <Reveal className="col-span-12 lg:col-span-8 mt-8 lg:mt-0">
              <p className="max-w-[26ch] font-display text-3xl sm:text-4xl md:text-5xl leading-tight lg:text-7xl font-semibold tracking-tighter">
                The engineers understand the identity.
                <br />
                <span className="text-paper/40 italic font-serif">
                  The designers understand the system.
                </span>
              </p>
            </Reveal>
          </div>
        </section>
      </main>
    </PageFrame>
  );
}
