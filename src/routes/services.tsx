import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow, PageFrame, PageIntro, Reveal } from "../components/KraftSite";

export const Route = createFileRoute("/services")({
  head: () => ({ meta: [
    { title: "Services — Kraft Studios" }, { name: "description", content: "Brand architecture, custom software engineering and connected fulfilment infrastructure from Kraft Studios." },
    { property: "og:title", content: "Services — Kraft Studios" }, { property: "og:description", content: "One studio for the brand, software engine and operational layer." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: ServicesPage,
});

const capabilities = [
  { n: "01", title: "Digital Identity & Brand Architecture", copy: "Bespoke visual systems shaped by market context and cultural intelligence. We translate identity from expressive assets into durable rules that work everywhere.", items: ["Brand strategy", "Visual identity", "Cultural pattern systems", "Digital design systems"] },
  { n: "02", title: "Custom Web & System Engineering", copy: "High-performance digital tools engineered around how people actually work. We remove technical bottlenecks without compromising the visual experience.", items: ["Web platforms", "Tailored CMS", "Internal tools & CRM", "APIs & automation"] },
  { n: "03", title: "Supply Chain & Fulfillment Infrastructure", copy: "Through the Brush.in ecosystem, we connect custom physical production with logistics, tracking and decision-ready operational views.", items: ["Corporate fulfilment", "Logistics integrations", "Operational dashboards", "Distribution systems"] },
];
function ServicesPage() { return <PageFrame><main><PageIntro number="02" label="Services" title="One source of truth" copy="Separate teams create seams. We bring the designers, engineers and operational thinkers to one table so the idea survives every handoff." /><section className="border-t border-ink/10"><div className="site-shell py-16 lg:py-24">{capabilities.map((cap, index) => <Reveal key={cap.n} className="capability-row" delay={index * 80}><span className="font-display text-reg">{cap.n}</span><div><h2>{cap.title}</h2><p>{cap.copy}</p></div><ul>{cap.items.map((item) => <li key={item}>{item}</li>)}</ul></Reveal>)}</div></section><section className="bg-reg text-paper"><div className="site-shell grid grid-cols-12 gap-6 py-20"><div className="col-span-12 lg:col-span-3"><Eyebrow light>The integrated advantage</Eyebrow></div><div className="col-span-12 lg:col-span-8"><p className="max-w-[26ch] font-display text-3xl font-semibold leading-tight lg:text-5xl">The engineers understand the identity. The designers understand the system.</p></div></div></section></main></PageFrame> }
