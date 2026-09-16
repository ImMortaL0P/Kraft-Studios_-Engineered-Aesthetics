import { createFileRoute } from "@tanstack/react-router";
import umvadlaImage from "../assets/project-umvadla.jpg";
import hotelImage from "../assets/project-hotel.jpg";
import noticeboardImage from "../assets/project-noticeboard.jpg";
import { Eyebrow, PageFrame, PageIntro, Reveal } from "../components/KraftSite";

export const Route = createFileRoute("/work")({
  head: () => ({ meta: [
    { title: "Selected Work — Kraft Studios" }, { name: "description", content: "Selected digital identity, software engineering and data infrastructure work from Kraft Studios." },
    { property: "og:title", content: "Selected Work — Kraft Studios" }, { property: "og:description", content: "Case studies where design, software and operations work as one." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: WorkPage,
});

const studies = [
  { n: "01", title: "Zero-friction content management", client: "Umvadla", image: umvadlaImage, alt: "Custom editorial CMS interface", scope: "Identity · Website · Bespoke CMS", result: "A tailored publishing system that lets the internal team control the platform without code dependencies." },
  { n: "02", title: "Centralised revenue and operations", client: "Hospitality platform", image: hotelImage, alt: "Hotel bookings and operations dashboard", scope: "Product · CRM · Automation", result: "One operational ledger connecting major booking channels, income, expenditure and active cloud archival." },
  { n: "03", title: "Automated data and intelligence", client: "The Notice Board", image: noticeboardImage, alt: "Autonomous data pipeline represented as a node network", scope: "Data · AI agents · Platform", result: "A resilient queue that scans hundreds of recruitment sources, parses documents and keeps information flowing." },
];

function WorkPage() { return <PageFrame><main><PageIntro number="01" label="Work" title="Systems with a visual soul" copy="Selected engagements that show what happens when identity, interface and operational architecture are designed around the same intent." /><section className="border-t border-ink/10"><div className="site-shell py-20 lg:py-28">{studies.map((study, index) => <Reveal key={study.n} className="case-row" delay={index * 80}><div className="case-number">{study.n}</div><div className="case-image"><img src={study.image} alt={study.alt} loading="lazy" width={index === 0 ? 1440 : 1024} height={1024} /></div><div className="case-copy"><Eyebrow>{study.client}</Eyebrow><h2>{study.title}</h2><p>{study.result}</p><span>{study.scope}</span></div></Reveal>)}</div></section></main></PageFrame> }
