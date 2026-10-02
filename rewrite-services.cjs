const fs = require("fs");

const code = `import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring, useVelocity } from "framer-motion";
import { useRef } from "react";
import { Eyebrow, PageFrame, PageIntro, Reveal, FadeUp } from "../components/KraftSite";
import { ArrowUpRight } from "lucide-react";

import brushLogo from "../assets/clients/brush.png";
import noticeboardLogo from "../assets/clients/noticeboard.png";

import noticeboardShot from "../assets/project-noticeboard.jpg";
import sidequestShot from "../assets/showcase/case-tools-01-cover-tight.jpg";
import brushShot from "../assets/showcase/brush-01-store.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Brands — Kraft Studios" },
      {
        name: "description",
        content:
          "In-house ecosystems spanning verified information systems, curated aesthetics, and print infrastructure.",
      },
    ],
  }),
  component: BrandsPage,
});

const brands = [
  {
    n: "01",
    title: "The Notice Board",
    domain: "thenoticeboard.in",
    logo: noticeboardLogo,
    copy: "A verified government exam and recruitment notification pipeline holding strict provenance rules, preventing students from falling prey to unverified or aggregated misinformation.",
    items: ["AI Verification Agents", "Provenance Tracking", "Next.js App Router"],
    href: "https://thenoticeboard.in",
    image: noticeboardShot,
    bg: "bg-surface"
  },
  {
    n: "02",
    title: "The Side Quest",
    domain: "thesidequest.in",
    logo: null, // We'll use typography for Side Quest
    copy: "A highly curated design and lifestyle publication that explores aesthetics, engineered artifacts, and visual subcultures through editorial framing.",
    items: ["Narnia Typeface", "Editorial Framing", "Visual Curation"],
    href: "https://thesidequest.in",
    image: sidequestShot,
    bg: "bg-paper"
  },
  {
    n: "03",
    title: "Brush",
    domain: "brush.in",
    logo: brushLogo,
    copy: "A print and framing infrastructure platform running a unified ecommerce configuration engine allowing artists to scale their fulfilment effortlessly.",
    items: ["Custom Fulfilment Mapping", "Redundant Payment Gateways", "Automated PDF Invoices"],
    href: "https://brush.in",
    image: brushShot,
    bg: "bg-surface"
  },
];

function BandwidthBars() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityY = useTransform(smoothVelocity, [-0.5, 0.5], ["-80%", "80%"]);

  return (
    <div ref={ref} className="hidden lg:flex mt-12 overflow-hidden w-full max-w-[200px] gap-1 opacity-20 relative h-20 items-end">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          style={{ y: velocityY }}
          initial={{ height: \`\${20 + Math.random() * 80}%\` }}
          animate={{ height: [\`\${20 + Math.random() * 80}%\`, \`\${20 + Math.random() * 80}%\`] }}
          transition={{ duration: 1.5 + Math.random(), delay: i * 0.05, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          className="w-full bg-paper"
        />
      ))}
    </div>
  );
}

function BrandsPage() {
  return (
    <PageFrame>
      <main>
        <PageIntro
          number="02"
          label="Our Brands"
          title="In-house ecosystems"
          copy="Beyond client work, we independently build, scale, and operate our own proprietary brands spanning verified information systems, curated aesthetics, and print infrastructure."
        />

        <div className="flex flex-col">
          {brands.map((brand, i) => (
            <section key={brand.n} className={\`py-20 md:py-32 border-t border-line \${brand.bg}\`}>
              <div className="site-shell grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div className={\`lg:col-span-5 \${i % 2 !== 0 ? "lg:order-2" : ""}\`}>
                  <Reveal>
                    <div className="flex items-center justify-between mb-10">
                      <Eyebrow>{brand.n} — Internal Brand</Eyebrow>
                    </div>
                    
                    <div className="mb-8">
                      {brand.logo ? (
                        <img src={brand.logo} alt={brand.title} className="h-10 md:h-12 w-auto object-contain object-left mix-blend-difference invert brightness-0" />
                      ) : (
                        <h2 className="font-display italic text-4xl md:text-5xl font-medium tracking-tight h-10 md:h-12 flex items-center">
                          {brand.title}
                        </h2>
                      )}
                    </div>
                    
                    <p className="mt-8 text-lg lg:text-xl text-ink/75 leading-relaxed">
                      {brand.copy}
                    </p>

                    <div className="mt-10 flex flex-wrap items-center gap-3">
                      {brand.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-line bg-paper px-3.5 py-1.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-ink/70"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="mt-12 pt-8 border-t border-line inline-flex">
                      <a href={brand.href} target="_blank" rel="noreferrer noopener" className="group flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-300 group-hover:scale-110">
                          <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                        <div>
                          <span className="block font-medium text-ink transition-colors group-hover:text-reg">Visit Platform</span>
                          <span className="block font-mono text-[11px] uppercase tracking-widest text-ink/40 mt-1">{brand.domain}</span>
                        </div>
                      </a>
                    </div>
                  </Reveal>
                </div>

                <div className={\`lg:col-span-7 \${i % 2 !== 0 ? "lg:order-1" : ""}\`}>
                  <FadeUp delay={0.2}>
                    <a href={brand.href} target="_blank" rel="noreferrer noopener" className="block relative group overflow-hidden rounded-md border border-line bg-paper">
                      <img 
                        src={brand.image} 
                        alt={brand.title} 
                        className="w-full aspect-[4/3] md:aspect-[16/10] object-cover transition-transform duration-1000 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-ink/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </a>
                  </FadeUp>
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className="bg-ink text-paper selection:bg-reg selection:text-paper relative overflow-hidden">
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
`;

fs.writeFileSync("src/routes/services.tsx", code);
