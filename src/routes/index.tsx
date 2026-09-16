import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroImage from "../assets/kraft-hero.jpg";
import umvadlaImage from "../assets/project-umvadla.jpg";
import hotelImage from "../assets/project-hotel.jpg";
import noticeboardImage from "../assets/project-noticeboard.jpg";
import { Eyebrow, PageFrame, Reveal } from "../components/KraftSite";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Kraft Studios — Engineered Aesthetics" },
    { name: "description", content: "Kraft Studios unites brand design, custom software and operational infrastructure into coherent digital ecosystems." },
    { property: "og:title", content: "Kraft Studios — Engineered Aesthetics" },
    { property: "og:description", content: "The visual soul and software engine, designed as one." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: HomePage,
});

const services = [
  ["01", "Digital Identity & Brand Architecture", "Bespoke identities rooted in market intelligence and cultural resonance, translated across physical and digital surfaces."],
  ["02", "Custom Web & System Engineering", "High-performance websites, tailored platforms and automation systems that remove friction from complex operations."],
  ["03", "Supply Chain & Fulfillment", "Connected logistics and fulfilment infrastructure that keeps digital intent and physical delivery in lockstep."],
];

const projects = [
  { image: umvadlaImage, alt: "Editorial content management interface", tag: "Web · CMS", title: "Umvadla — zero-friction publishing", n: "01", cls: "lg:col-span-7", ratio: "aspect-[3/2]" },
  { image: hotelImage, alt: "Hotel operations dashboard at a front desk", tag: "System · CRM", title: "Centralised hotel operations", n: "02", cls: "md:col-span-6 lg:col-span-5", ratio: "aspect-square" },
  { image: noticeboardImage, alt: "Abstract autonomous data pipeline network", tag: "Data · Intelligence", title: "The Notice Board — autonomous data", n: "03", cls: "md:col-span-6 lg:col-span-5 lg:col-start-2", ratio: "aspect-square" },
];

function HomePage() {
  return (
    <PageFrame>
      <main>
        <section className="site-shell grid grid-cols-12 items-end gap-6 pb-20 pt-14 lg:pb-28 lg:pt-20">
          <div className="col-span-12 lg:col-span-7">
            <div className="mb-8 flex items-center gap-3"><Eyebrow>01 — Studio</Eyebrow><span className="h-px flex-1 bg-ink/15" /><Eyebrow>India · Global</Eyebrow></div>
            <h1 className="font-display text-[clamp(3.6rem,9vw,8.5rem)] font-semibold leading-[0.88]">
              <span className="hero-line">Engineered</span><span className="hero-line hero-line-delay">Aesthetics<span className="text-reg">.</span></span>
            </h1>
            <p className="hero-copy mt-8 max-w-[43ch] text-lg leading-relaxed text-ink/70">A hybrid studio where the visual soul meets the software engine — brand architecture, custom systems, and infrastructure built as one.</p>
          </div>
          <div className="col-span-12 mt-8 lg:col-span-5 lg:mt-0">
            <div className="hero-image-wrap"><img src={heroImage} alt="Printmaker aligning a graphic system on a studio table" width={1024} height={1280} className="aspect-[4/5] w-full object-cover" /></div>
            <div className="mt-4 flex justify-between"><Eyebrow>Fig. 01</Eyebrow><span className="eyebrow text-reg">● Registration</span></div>
          </div>
        </section>

        <section className="border-t border-ink/10"><div className="site-shell py-20 lg:py-28">
          <Reveal className="mb-14 flex items-end justify-between"><div><Eyebrow>02 — Capabilities</Eyebrow><h2 className="section-title">Three disciplines, one table.</h2></div><Eyebrow>Brand / Code / Flow</Eyebrow></Reveal>
          <div className="grid border border-ink/10 bg-ink/10 md:grid-cols-3 md:gap-px">
            {services.map(([n, title, copy], index) => <Reveal key={n} delay={index * 90} className="service-panel"><span className="font-display text-sm text-reg">{n}</span><h3 className="mt-6 max-w-[15ch] font-display text-2xl font-semibold">{title}</h3><p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-ink/60">{copy}</p></Reveal>)}
          </div>
          <Link to="/services" className="text-link mt-8">Explore capabilities <ArrowRight size={16} /></Link>
        </div></section>

        <section className="border-t border-ink/10"><div className="site-shell py-20 lg:py-28">
          <Reveal className="mb-14 flex items-end justify-between"><div><Eyebrow>03 — Selected Work</Eyebrow><h2 className="section-title">Case studies, measured.</h2></div><Link to="/work" className="text-link hidden lg:flex">View all work <ArrowRight size={16} /></Link></Reveal>
          <div className="grid grid-cols-12 gap-x-6 gap-y-14">
            {projects.map((project, index) => <Reveal key={project.title} delay={index * 80} className={`project-tile col-span-12 ${project.cls}`}><div className="overflow-hidden"><img src={project.image} alt={project.alt} loading="lazy" width={project.n === "01" ? 1440 : 1024} height={1024} className={`${project.ratio} w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]`} /></div><div className="mt-5 flex items-start justify-between gap-6"><div><Eyebrow>{project.tag}</Eyebrow><h3 className="mt-2 max-w-[20ch] font-display text-2xl font-semibold">{project.title}</h3></div><span className="font-display text-sm text-reg">{project.n}</span></div></Reveal>)}
          </div>
        </div></section>

        <section className="overflow-hidden bg-ink py-4 text-paper" aria-label="Trusted by clients"><p className="site-shell mb-4 pt-4 text-[10px] uppercase text-paper/40">Trusted by · Placeholder client marks</p><div className="marquee-track"><div className="marquee-set">{["TATA", "Adobe", "NIKE", "Spotify", "Notion", "AIRBNB"].map((logo) => <span key={logo} className="client-mark">{logo}</span>)}</div><div className="marquee-set" aria-hidden="true">{["TATA", "Adobe", "NIKE", "Spotify", "Notion", "AIRBNB"].map((logo) => <span key={logo} className="client-mark">{logo}</span>)}</div></div></section>

        <section className="site-shell grid grid-cols-12 gap-6 py-24 lg:py-32"><div className="col-span-12 lg:col-span-2"><Eyebrow>04 — Manifesto</Eyebrow></div><Reveal className="col-span-12 lg:col-span-10"><p className="max-w-[22ch] font-display text-3xl font-medium leading-[1.08] lg:text-5xl">We treat design and engineering as one material — measured, deliberate, and finished by hand.</p></Reveal></section>
      </main>
    </PageFrame>
  );
}
