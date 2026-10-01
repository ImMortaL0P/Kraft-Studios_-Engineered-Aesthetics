import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import {
  Eyebrow,
  FadeUp,
  MaskLines,
  PageFrame,
  SectionLabel,
  StatBand,
} from "../components/KraftSite";
import { bySlug, caseStudies, type CaseStudy } from "../data/caseStudies";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const study = bySlug(params.slug);
    if (!study) throw notFound();
    return study;
  },
  head: ({ loaderData }) => {
    const s = loaderData as CaseStudy | undefined;
    if (!s) return {};
    return {
      meta: [
        { title: `${s.client} — ${s.title} | Kraft Studios` },
        { name: "description", content: s.summary },
        { property: "og:title", content: `${s.client} — ${s.title}` },
        { property: "og:description", content: s.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CaseStudyPage,
});

/* ------------------------------------------------------------------ */

function CaseStudyPage() {
  const study = Route.useLoaderData() as CaseStudy; if(!study) return null;
  const index = caseStudies.findIndex((c) => c.slug === study.slug);
  const next = caseStudies[(index + 1) % caseStudies.length]; if (!next) return null;

  return (
    <PageFrame>
      <Masthead study={study} />
      <Cover study={study} />
      <Brief study={study} />
      <Architecture study={study} />
      <Capabilities study={study} />
      <Gallery study={study} />
      <Outcomes study={study} />
      <NextStudy next={next} />
    </PageFrame>
  );
}

/* ---------- masthead ---------- */

function Masthead({ study }: { study: CaseStudy }) {
  return (
    <section className="grain site-shell relative pb-14 pt-16 lg:pb-20 lg:pt-24">
      <Link
        to="/work"
        className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-ink/45 transition-colors hover:text-reg"
      >
        <ArrowLeft className="size-3.5 transition-transform duration-500 group-hover:-translate-x-1" />
        All work
      </Link>

      <div className="mt-10">
        <SectionLabel n={study.n} label={study.client} />
      </div>

      <MaskLines
        as="h1"
        immediate
        delay={0.12}
        lines={[
          <>
            {study.title.replace(/\.$/, "")}
            <span className="text-reg">.</span>
          </>,
        ]}
        className="mt-6 max-w-[20ch] text-4xl font-bold leading-[1.0] tracking-[-0.035em] sm:text-6xl lg:text-[5.25rem]"
      />

      <FadeUp delay={0.35}>
        <p className="mt-9 max-w-[58ch] border-l-2 border-reg pl-5 text-base leading-relaxed text-ink/70 sm:text-lg">
          {study.summary}
        </p>
      </FadeUp>

      {/* The scope of work, stated plainly, before any picture of it. */}
      <FadeUp delay={0.45}>
        <div className="mt-12 flex flex-wrap items-center gap-2.5">
          {study.services.map((s) => (
            <span
              key={s}
              className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55"
            >
              {s}
            </span>
          ))}
        </div>
      </FadeUp>

      <FadeUp delay={0.55}>
        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-line pt-7 sm:grid-cols-4">
          <Meta term="Client" value={study.client} />
          <Meta term="Year" value={study.year} />
          <Meta term="Disciplines" value={String(study.services.length)} />
          <Meta
            term="Live"
            value={
              study.live ? (
                <a
                  href={study.live.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-start gap-1 text-reg"
                >
                  <span className="break-all">{study.live.label}</span>
                  <ArrowUpRight className="mt-0.5 size-3 shrink-0 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ) : (
                "Private deployment"
              )
            }
          />
        </dl>
      </FadeUp>
    </section>
  );
}

function Meta({ term, value }: { term: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">{term}</dt>
      <dd className="mt-2 text-sm leading-relaxed">{value}</dd>
    </div>
  );
}

/* ---------- cover ---------- */

function Cover({ study }: { study: CaseStudy }) {
  return (
    <FadeUp className="site-shell">
      <div
        className="overflow-hidden rounded-md border border-line"
        style={study.coverBg ? { backgroundColor: study.coverBg } : undefined}
      >
        <img
          src={study.cover}
          alt={study.coverAlt}
          className={`w-full ${study.coverFit === "contain" ? "object-contain" : "aspect-[16/9] object-cover"}`}
        />
      </div>
    </FadeUp>
  );
}

/* ---------- the brief ---------- */

function Brief({ study }: { study: CaseStudy }) {
  return (
    <section className="bg-surface mt-20 py-20 md:py-28 lg:mt-28">
      <div className="site-shell">
        <SectionLabel n="01" label="The brief" />
        <div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-10">
          <FadeUp className="md:col-span-6">
            <Eyebrow>The situation</Eyebrow>
            <p className="mt-5 text-lg leading-relaxed text-ink/75">{study.problem}</p>
          </FadeUp>
          <FadeUp delay={0.12} className="md:col-span-6">
            <Eyebrow>The approach</Eyebrow>
            <p className="mt-5 text-lg leading-relaxed text-ink/75">{study.approach}</p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ---------- architecture ---------- */

function Architecture({ study }: { study: CaseStudy }) {
  return (
    <section className="site-shell py-20 md:py-28">
      <SectionLabel n="02" label="Architecture" />
      <FadeUp>
        <p className="mt-8 max-w-[62ch] text-base leading-relaxed text-ink/60">
          What runs where, and what each layer is responsible for.
        </p>
      </FadeUp>

      {/* Layers stack on a phone and run as a row on a desk; the connector rule
          is a pseudo-free border so it never needs its own element. */}
      <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {study.architecture.map((layer, i) => (
          <FadeUp
            key={layer.name}
            delay={i * 0.07}
            className="group relative bg-paper p-7 transition-colors duration-500 hover:bg-surface md:p-9"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-reg">
              Layer {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-display text-xl font-bold tracking-tight">{layer.name}</h3>
            <p className="mt-3 font-mono text-[11px] leading-[1.75] tracking-[0.04em] text-ink/50">
              {layer.stack}
            </p>
            <p className="mt-5 text-sm leading-relaxed text-ink/70">{layer.role}</p>
          </FadeUp>
        ))}
      </div>

      <FadeUp delay={0.2}>
        <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2.5 border-t border-line pt-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">
            Stack
          </span>
          {study.stack.map((t) => (
            <span key={t} className="font-mono text-[11px] tracking-[0.04em] text-ink/65">
              {t}
              <span className="mx-2 text-reg">·</span>
            </span>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}

/* ---------- capabilities ---------- */

function Capabilities({ study }: { study: CaseStudy }) {
  return (
    <section className="bg-ink py-20 text-paper md:py-28">
      <div className="site-shell">
        <SectionLabel n="03" label="What shipped" light />
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {study.capabilities.map((c, i) => (
            <FadeUp key={c.title} delay={i * 0.1} className="border-t border-paper/20 pt-7">
              <h3 className="font-display text-xl font-bold tracking-tight">{c.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-paper/65">{c.body}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- gallery ---------- */

function Gallery({ study }: { study: CaseStudy }) {
  if (!study.shots.length) return null;
  return (
    <section className="site-shell py-20 md:py-28">
      <SectionLabel n="04" label="The product" />
      <div className="mt-12 flex flex-col gap-16 md:gap-24">
        {study.shots.map((shot, i) => {
          // Editorial alternating layout logic
          const isOdd = i % 2 !== 0;
          const isThird = (i + 1) % 3 === 0;
          
          let containerClass = "w-full";
          let innerClass = "overflow-hidden rounded-md border border-line bg-surface";
          
          if (isOdd) {
            containerClass = "w-full md:w-[85%] md:ml-auto";
          }
          if (isThird) {
            containerClass = "w-full md:w-[75%] md:mr-auto shrink-0";
            innerClass = "overflow-hidden rounded-md border border-line bg-surface p-4 md:p-12";
          }

          return (
          <FadeUp key={shot.src + i} delay={0.05} className={containerClass}>
            <figure>
              <div className={innerClass}>
                <img src={shot.src} alt={shot.caption} loading="lazy" className="w-full shadow-sm" />
              </div>
              <figcaption className="mt-4 flex items-baseline gap-4 font-mono text-[10px] uppercase leading-[1.8] tracking-[0.18em] text-ink/45">
                <span className="text-reg">{String(i + 1).padStart(2, "0")}</span>
                <span>{shot.caption}</span>
              </figcaption>
            </figure>
          </FadeUp>
        )})}
      </div>
    </section>
  );
}

/* ---------- outcomes ---------- */

function Outcomes({ study }: { study: CaseStudy }) {
  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="site-shell">
        <SectionLabel n="05" label="Where it landed" />
        <div className="mt-12 border-y border-line">
          <StatBand stats={study.outcomes.map((o) => ({ figure: o.figure, label: o.label }))} />
        </div>
      </div>
    </section>
  );
}

/* ---------- next ---------- */

function NextStudy({ next }: { next: CaseStudy }) {
  return (
    <section className="site-shell py-20 md:py-28">
      <Link to="/work/$slug" params={{ slug: next.slug }} className="group block border-t border-line pt-10">
        <Eyebrow>Next case study</Eyebrow>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-tight transition-colors duration-500 group-hover:text-reg md:text-5xl">
            {next.client}
          </h2>
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/45">
            {next.n}
            <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
        </div>
        <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-ink/55">{next.summary}</p>
      </Link>
    </section>
  );
}
