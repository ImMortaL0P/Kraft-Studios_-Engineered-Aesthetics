import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow, PageFrame, PageIntro, Reveal } from "../components/KraftSite";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact — Kraft Studios" }, { name: "description", content: "Start a brand, web, software or operational infrastructure project with Kraft Studios." },
    { property: "og:title", content: "Contact — Kraft Studios" }, { property: "og:description", content: "Bring Kraft Studios a difficult brief." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: ContactPage,
});
function ContactPage() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };
  return <PageFrame><main><PageIntro number="04" label="Contact" title="Bring us the difficult brief" copy="Tell us what needs to be built, changed or connected. We will look at the visual, technical and operational problem together." /><section className="border-t border-ink/10"><div className="site-shell grid grid-cols-12 gap-10 py-20 lg:py-28"><Reveal className="col-span-12 lg:col-span-4"><Eyebrow>Direct</Eyebrow><a href="mailto:hello@kraftstudios.in" className="contact-direct mt-5">hello@kraftstudios.in <ArrowUpRight size={18} /></a><p className="mt-8 max-w-[30ch] text-sm leading-relaxed text-ink/60">Based in India. Collaborating with ambitious teams across time zones.</p></Reveal><Reveal delay={100} className="col-span-12 lg:col-span-7 lg:col-start-6">{sent ? <div className="border-t border-ink pt-8"><Eyebrow>Brief received</Eyebrow><h2 className="mt-5 font-display text-4xl font-semibold">Thank you. We’ll be in touch.</h2></div> : <form className="contact-form" onSubmit={submit}><label>Name<input name="name" required placeholder="Your name" /></label><label>Email<input name="email" required type="email" placeholder="you@company.com" /></label><label>What are we building?<textarea name="brief" required rows={5} placeholder="A concise project brief" /></label><button type="submit">Send project brief <ArrowUpRight size={17} /></button></form>}</Reveal></div></section></main></PageFrame>;
}
