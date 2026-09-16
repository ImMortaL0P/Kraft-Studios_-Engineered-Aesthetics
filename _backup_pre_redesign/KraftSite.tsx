import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

const navItems = [
  { label: "Work", to: "/work" as const },
  { label: "Services", to: "/services" as const },
  { label: "About", to: "/about" as const },
  { label: "Contact", to: "/contact" as const },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const nextY = window.scrollY;
      setHidden(nextY > lastY && nextY > 120);
      lastY = nextY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${hidden && !open ? "site-header-hidden" : ""}`}>
      <div className="site-shell flex h-16 items-center justify-between">
        <Link to="/" className="brand-mark" aria-label="Kraft Studios home">
          <span className="size-2.5 bg-reg" />
          <span>Kraft Studios</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} className="nav-link" activeProps={{ className: "nav-link nav-link-active" }}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link to="/contact" className="outline-cta hidden sm:inline-flex">Start a project</Link>
        <button className="menu-button md:hidden" type="button" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open ? (
        <nav className="mobile-menu" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} className="mobile-nav-link" onClick={() => setOpen(false)}>{item.label}</Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className="site-shell grid grid-cols-12 gap-6 py-20 lg:py-28">
        <div className="col-span-12 lg:col-span-7">
          <Eyebrow light>05 — Contact</Eyebrow>
          <h2 className="mt-6 max-w-[12ch] font-display text-5xl font-semibold leading-[0.95] lg:text-7xl">Build something that holds.</h2>
          <Link to="/contact" className="contact-link mt-10">Start a conversation <ArrowUpRight size={18} /></Link>
        </div>
        <div className="col-span-12 self-end lg:col-span-4 lg:col-start-9">
          <div className="border-t border-paper/15 pt-6 text-sm text-paper/60">
            <p className="mb-3 text-[11px] uppercase text-paper/40">Studio</p>
            <p>Kraft Studios — Engineered Aesthetics</p>
            <p className="mt-1">India · Working globally</p>
          </div>
        </div>
      </div>
      <div className="border-t border-paper/10">
        <div className="site-shell flex flex-col items-start justify-between gap-4 py-6 text-xs text-paper/40 sm:flex-row sm:items-center">
          <span>© 2026 Kraft Studios</span>
          <div className="flex gap-6">
            {navItems.map((item) => <Link key={item.to} to={item.to} className="transition-colors hover:text-paper">{item.label}</Link>)}
          </div>
        </div>
      </div>
    </footer>
  );
}

export function PageFrame({ children }: { children: ReactNode }) {
  useReveal();
  return <div className="page-enter min-h-screen bg-paper text-ink"><SiteHeader />{children}<SiteFooter /></div>;
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <div className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <span className={`eyebrow ${light ? "text-paper/50" : "text-ink/50"}`}>{children}</span>;
}

export function PageIntro({ number, label, title, copy }: { number: string; label: string; title: string; copy: string }) {
  return (
    <section className="site-shell grid grid-cols-12 gap-6 pb-20 pt-16 lg:pb-28 lg:pt-24">
      <div className="col-span-12 lg:col-span-2"><Eyebrow>{number} — {label}</Eyebrow></div>
      <div className="col-span-12 lg:col-span-9">
        <Reveal><h1 className="max-w-[15ch] font-display text-5xl font-semibold leading-[0.94] sm:text-7xl lg:text-8xl">{title}<span className="text-reg">.</span></h1></Reveal>
        <Reveal delay={100}><p className="mt-8 max-w-[52ch] text-base leading-relaxed text-ink/65 sm:text-lg">{copy}</p></Reveal>
      </div>
    </section>
  );
}

function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.12, rootMargin: "0px 0px -6%" });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}
