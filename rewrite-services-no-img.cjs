const fs = require('fs');

const code = `import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring, useVelocity } from "framer-motion";
import { useRef } from "react";
import { Eyebrow, PageFrame, PageIntro, Reveal, FadeUp } from "../components/KraftSite";
import { ArrowUpRight } from "lucide-react";

import brushLogo from "../assets/clients/brush.png";
import noticeboardLogo from "../assets/clients/noticeboard.png";

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
    stats: [
      { figure: "100%", label: "Human-approved" },
      { figure: "11", label: "Schema models behind provenance" },
      { figure: "12h", label: "Discovery cadence" }
    ],
    href: "https://thenoticeboard.in",
    bg: "bg-surface"
  },
  {
    n: "02",
    title: "The Side Quest",
    domain: "thesidequest.in",
    logo: null,
    copy: "A highly curated design and lifestyle publication that explores aesthetics, engineered artifacts, and visual subcultures through meticulous editorial framing.",
    items: ["Narnia Typeface", "Editorial Framing", "Visual Curation"],
    stats: [
      { figure: "4+", label: "Design Subcultures" },
      { figure: "1.2k", label: "Curated Artifacts" },
      { figure: "100%", label: "In-house Publishing" }
    ],
    href: "https://thesidequest.in",
    bg: "bg-paper"
  },
  {
    n: "03",
    title: "Brush",
    domain: "brush.in",
    logo: brushLogo,
    copy: "A print and framing infrastructure platform running a unified ecommerce configuration engine allowing artists to scale their fulfilment effortlessly.",
    items: ["Custom Fulfilment", "Redundant Gateways", "Automated PDF Invoicing"],
    stats: [
      { figure: "1", label: "Pricing engine, two runtimes" },
      { figure: "16", label: "Cart shapes under parity test" },
      { figure: "3", label: "Redundant payment gateways" }
    ],
    href: "https://brush.in",
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
          {brands.map((brand) => (
            <section key={brand.n} className={\`py-20 md:py-32 lg:py-40 border-t border-line \${brand.bg}\`}>
              <div className="site-shell">
                <Reveal>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 lg:mb-24">
                    <div>
                      <Eyebrow className="mb-8 block">{brand.n} — Internal Brand</Eyebrow>
                      {brand.logo ? (
                        <img 
                          src={brand.logo} 
                          alt={brand.title} 
                          className="h-16 md:h-20 lg:h-24 w-auto object-contain object-left block" 
                        />
                      ) : (
                        <h2 className="font-display italic text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight">
                          {brand.title}
                        </h2>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-4 justify-end md:text-right">
                       <div className="flex flex-wrap md:justify-end items-center gap-3">
                          {brand.items.map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-line bg-transparent px-4 py-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-ink/65"
                            >
                              {item}
                            </span>
                          ))}
                       </div>
                    </div>
                  </div>
                </Reveal>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mt-12 lg:mt-24">
                  <div className="lg:col-span-6">
                    <FadeUp delay={0.1}>
                      <p className="font-display text-3xl lg:text-[2.75rem] leading-[1.15] tracking-tight text-ink/90 md:pr-12">
                        {brand.copy}
                      </p>
                    </FadeUp>
                  </div>
                  
                  <div className="lg:col-span-1" />
                  
                  <div className="lg:col-span-5 flex flex-col justify-between">
                    <FadeUp delay={0.2}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 border-t border-line pt-10">
                        {brand.stats.map(s => (
                          <div key={s.label}>
                            <div className="font-display text-4xl lg:text-5xl font-medium tracking-tight text-ink">{s.figure}</div>
                            <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] leading-relaxed text-ink/50 mt-4 max-w-[15ch]">{s.label}</div>
                          </div>
                        ))}
                      </div>
                    </FadeUp>

                    <FadeUp delay={0.3} className="mt-16 lg:mt-24 pt-8 border-t border-line">
                      <a href={brand.href} target="_blank" rel="noreferrer noopener" className="group flex items-center justify-between">
                        <div>
                          <span className="block font-medium text-ink transition-colors group-hover:text-reg text-xl">Visit Platform</span>
                          <span className="block font-mono text-[11px] uppercase tracking-[0.22em] text-ink/45 mt-2">{brand.domain}</span>
                        </div>
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-500 group-hover:scale-110">
                          <ArrowUpRight className="size-6 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </a>
                    </FadeUp>
                  </div>
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

fs.writeFileSync('src/routes/services.tsx', code);
