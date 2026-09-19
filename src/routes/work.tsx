import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import umvadlaImage from "../assets/showcase/umvadla-02-about.jpg";
import hotelImage from "../assets/showcase-sharda.jpg";
import noticeboardImage from "../assets/project-noticeboard.jpg";
import brushImage from "../assets/showcase/brush-01-store.jpg";
import { Eyebrow, PageFrame, PageIntro } from "../components/KraftSite";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Selected Work — Kraft Studios" },
      {
        name: "description",
        content:
          "Selected digital identity, software engineering and data infrastructure work from Kraft Studios.",
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
  component: WorkPage,
});

const studies = [
  {
    n: "01",
    title: "Zero-friction content management",
    client: "Umvadla",
    image: umvadlaImage,
    alt: "Custom editorial CMS interface",
    scope: "Identity · Website · Bespoke CMS",
    result:
      "A tailored publishing system that lets the internal team control the platform without code dependencies.",
  },
  {
    n: "02",
    title: "Identity and centralised operations",
    client: "Sharda Palace",
    image: hotelImage,
    alt: "Sharda Palace identity system — folders, cards and stationery",
    scope: "Identity · CRM · Automation",
    result:
      "A hospitality identity carried into one operational ledger connecting booking channels, income, expenditure and archival.",
  },
  {
    n: "03",
    title: "Automated data and intelligence",
    client: "The Notice Board",
    image: noticeboardImage,
    alt: "Autonomous data pipeline represented as a node network",
    scope: "Data · AI agents · Platform",
    result:
      "A resilient queue that scans hundreds of recruitment sources, parses documents and keeps information flowing.",
  },
  {
    n: "04",
    title: "Commerce with fulfilment built in",
    client: "Brush",
    image: brushImage,
    alt: "Brush storefront — custom wall art commerce",
    scope: "Storefront · Catalogue · Fulfilment",
    result:
      "A custom print storefront where catalogue, checkout, inventory and order operations run on one spine instead of four tools.",
  },
];

function StickyProject({
  study,
  index,
  total,
}: {
  study: (typeof studies)[0];
  index: number;
  total: number;
}) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  // Keep the stacked cards opaque — fading them lets the card underneath bleed through.
  const opacity = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  return (
    <div
      ref={targetRef}
      className="sticky min-h-[70vh] mb-[15vh]"
      style={{ top: `calc(${index * 2.5 + 6}rem)` }}
    >
      <motion.div
        style={{ scale, opacity }}
        className="w-full bg-paper border border-line rounded-md overflow-hidden flex flex-col lg:flex-row shadow-sm"
      >
        <div className="w-full lg:w-3/5 h-[30vh] sm:h-[40vh] lg:h-auto overflow-hidden relative group">
          <img
            src={study.image}
            alt={study.alt}
            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
          />
        </div>
        <div className="w-full lg:w-2/5 p-6 sm:p-8 lg:p-16 flex flex-col justify-center">
          <Eyebrow>{study.client}</Eyebrow>
          <h2 className="mt-4 md:mt-6 font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.05] tracking-tight text-ink">
            {study.title}
          </h2>
          <p className="mt-8 text-base lg:text-lg text-ink/70 leading-relaxed max-w-sm">
            {study.result}
          </p>

          <div className="mt-auto pt-12 sm:pt-16 flex items-center justify-between">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-ink/40 shrink pr-4 truncate">
              {study.scope}
            </span>
            <span className="font-display font-medium text-reg lg:text-xl">{study.n}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function WorkPage() {
  return (
    <PageFrame>
      <main>
        <PageIntro
          number="01"
          label="Work"
          title="Systems with a visual soul"
          copy="Selected engagements that show what happens when identity, interface and operational architecture are designed around the same intent."
        />
        <section className="bg-ink/5 border-t border-line">
          <div className="site-shell py-24 lg:py-40">
            {studies.map((study, index) => (
              <StickyProject key={study.n} study={study} index={index} total={studies.length} />
            ))}
          </div>
        </section>
      </main>
    </PageFrame>
  );
}
