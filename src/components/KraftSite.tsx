import { Link } from "@tanstack/react-router";
import logoWordmark from "../Logos/Kraft Studios Wordmark T.png";
import logoMonogram from "../Logos/Kraft Studios Monogram T.png";
import { ArrowUp, ArrowUpRight, Moon, Sun } from "lucide-react";
import { AnimatePresence, MotionConfig, motion, useInView, useScroll, useTransform, useSpring, useVelocity, useAnimationFrame, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

const navItems = [
  { label: "Work", to: "/work" as const },
  { label: "Services", to: "/services" as const },
  { label: "About", to: "/about" as const },
  { label: "Contact", to: "/contact" as const },
];

const indexLinks = [
  { label: "Premise", href: "/#premise" },
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "Philosophy", href: "/#philosophy" },
];

/* ------------------------------------------------------------------ */
/* Theme                                                               */
/* ------------------------------------------------------------------ */

export const themeInitScript = `(function(){try{var t=localStorage.getItem('kraft-theme');document.documentElement.setAttribute('data-theme',t==='dark'?'dark':'light')}catch(e){document.documentElement.setAttribute('data-theme','light')}})();`;

function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("kraft-theme", next); } catch { /* storage unavailable */ }
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className="relative flex h-7 w-[52px] items-center rounded-full border border-ink/25 px-[3px] transition-colors hover:border-ink/60"
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 34 }}
        className={`grid size-5 place-items-center rounded-full bg-ink text-paper ${theme === "dark" ? "ml-auto" : ""}`}
      >
        {theme === "dark" ? <Moon size={11} strokeWidth={2.4} /> : <Sun size={11} strokeWidth={2.4} />}
      </motion.span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Header + full-screen menu                                           */
/* ------------------------------------------------------------------ */

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > lastY && y > 160);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className={`site-header ${scrolled && !open ? "is-scrolled" : ""} ${hidden && !open ? "is-hidden" : ""}`}>
        <div className="gutter mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-6">
          <Link to="/" className="group flex items-center relative z-[2] w-[180px] sm:w-[220px]" aria-label="Kraft Studios home" onClick={() => setOpen(false)}>
            <img src={logoWordmark} alt="Kraft Studios Logo" className="w-full h-auto object-contain opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>

          <div className="relative z-[2] flex items-center gap-5 md:gap-7">
            <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
              {navItems.map((item) => (
                <Link key={item.to} to={item.to} className="nav-link">{item.label}</Link>
              ))}
            </nav>
            <ThemeToggle />
            <Link to="/contact" className="pill hidden sm:inline-flex">Start a project</Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="group flex items-center gap-3 font-mono text-[11px] tracking-[0.3em]"
            >
              <span className="hidden sm:inline">{open ? "CLOSE" : "MENU"}</span>
              <span className="relative block h-3 w-6">
                <span className={`absolute left-0 h-px w-full bg-ink transition-all duration-500 ${open ? "top-1/2 rotate-45" : "top-0.5 group-hover:w-2/3"}`} />
                <span className={`absolute left-0 h-px w-full bg-ink transition-all duration-500 ${open ? "top-1/2 -rotate-45" : "bottom-0.5 top-auto"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            className="fixed inset-0 z-[55] flex flex-col bg-paper"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-60" />
            <div className="gutter relative mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-between pb-10 pt-28">
              <nav className="flex flex-col" aria-label="Menu">
                {navItems.map((item, i) => (
                  <div key={item.to} className="overflow-hidden border-b border-line">
                    <motion.div
                      initial={{ y: "105%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "105%" }}
                      transition={{
                        duration: 0.8,
                        ease: EASE,
                        delay: open ? 0.15 + i * 0.06 : (navItems.length - 1 - i) * 0.04
                      }}
                    >
                      <Link
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className="group flex items-baseline gap-5 py-3 md:py-4"
                      >
                        <span className="font-mono text-xs text-ink/40">0{i + 1}</span>
                        <span className="text-[clamp(2.6rem,8vw,6.5rem)] font-semibold leading-none tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-4 group-hover:text-reg">
                          {item.label}
                        </span>
                        <ArrowUpRight className="ml-auto self-center opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </nav>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-10 flex flex-wrap items-end justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50"
              >
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {indexLinks.map((l) => (
                    <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="hover:text-reg">{l.label}</a>
                  ))}
                </div>
                <a href="mailto:hello@kraftstudios.in" className="text-ink hover:text-reg">hello@kraftstudios.in</a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Pixel wordmark (hover trail)                                        */
/* ------------------------------------------------------------------ */

const GLYPHS: Record<string, string[]> = {
  K: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  F: ["11111", "10000", "10000", "11110", "10000", "10000", "10000"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
};

function buildBitmap(word: string) {
  const rows: string[] = Array.from({ length: 7 }, () => "");
  word.split("").forEach((ch, i) => {
    const g = GLYPHS[ch];
    for (let r = 0; r < 7; r++) rows[r] += (i ? "0" : "") + g[r];
  });
  return rows;
}

export function PixelWordmark({ word = "KRAFT" }: { word?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const rows = buildBitmap(word);
  const cols = rows[0].length;

  const heat = (el: EventTarget) => {
    const node = el as HTMLElement;
    if (!node.classList?.contains("pixel")) return;
    node.classList.add("hot");
    window.setTimeout(() => node.classList.remove("hot"), 60);
  };

  return (
    <div
      ref={ref}
      className={`pixel-grid ${inView ? "is-on" : ""}`}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      onPointerOver={(e) => heat(e.target)}
      aria-label={word}
      role="img"
    >
      {rows.flatMap((row, r) =>
        row.split("").map((bit, c) => (
          <span
            key={`${r}-${c}`}
            className={`pixel ${bit === "1" ? "on" : ""}`}
            style={bit === "1" ? { transitionDelay: inView ? `${c * 22 + r * 30}ms` : "0ms" } : undefined}
          />
        )),
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export function SiteFooter() {
  return (
    <footer className="grain relative border-t border-line bg-paper">
      <div className="gutter relative z-[2] mx-auto max-w-[1600px] pt-20 md:pt-28">
        <div className="relative flex items-center gap-12">
          {/* Animated Monogram */}
          <motion.div className="w-28 h-28 md:w-40 md:h-40 group relative perspective-1000">
            <motion.div className="absolute inset-0 bg-reg/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <motion.img 
              src={logoMonogram} 
              alt="Monogram" 
              className="w-full h-full object-contain opacity-40 group-hover:opacity-100 transition-all duration-500 relative z-10"
              whileHover={{ 
                scale: 1.1, 
                rotateY: 15,
                rotateX: -10,
                filter: "brightness(1.3) drop-shadow(0 20px 30px rgba(0,0,0,0.2))" 
              }}
            />
          </motion.div>
          
          <div className="flex-1">
            <PixelWordmark />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.26em] text-ink/40">
          <span>Hover the grid</span>
          <span>Engineered aesthetics</span>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-10 border-t border-line pt-12 md:grid-cols-12">
          <div className="col-span-2 md:col-span-4">
            <p className="max-w-[26ch] text-xl font-semibold leading-snug tracking-[-0.01em]">
              Brand, software and operations — designed as one system.
            </p>
            <Link to="/contact" className="pill-solid mt-8">
              Start a conversation <ArrowUpRight size={16} className="arrow" />
            </Link>
          </div>
          <FooterCol title="Studio" className="md:col-span-2 md:col-start-7">
            {navItems.map((item) => <Link key={item.to} to={item.to} className="hover:text-reg">{item.label}</Link>)}
          </FooterCol>
          <FooterCol title="Index" className="md:col-span-2">
            {indexLinks.map((l) => <a key={l.href} href={l.href} className="hover:text-reg">{l.label}</a>)}
          </FooterCol>
          <FooterCol title="Contact" className="col-span-2 md:col-span-2">
            <a href="mailto:hello@kraftstudios.in" className="hover:text-reg">hello@kraftstudios.in</a>
            <span className="text-ink/50">India · Working globally</span>
          </FooterCol>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line py-6 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45 sm:flex-row sm:items-center">
          <span>© 2026 Kraft Studios <span className="mx-2 text-ink/20">/</span> Sys. v1.1</span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2 hover:text-ink"
          >
            Back to top
            <span className="grid size-7 place-items-center rounded-full border border-line transition-colors group-hover:border-reg group-hover:bg-reg group-hover:text-white">
              <ArrowUp size={12} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="eyebrow mb-5 text-ink/40">{title}</p>
      <div className="flex flex-col gap-2.5 text-sm">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Animation primitives                                                */
/* ------------------------------------------------------------------ */

/** Headline whose lines rise out of a mask. */
export function MaskLines({
  lines,
  className = "",
  delay = 0,
  immediate = false,
  as: Tag = "h2",
}: {
  lines: ReactNode[];
  className?: string;
  delay?: number;
  immediate?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "div";
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as RefObject<Element>, { once: true, margin: "0px 0px -12% 0px" });
  const show = immediate || inView;
  return (
    <Tag ref={ref as never} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className="block will-change-transform"
            initial={{ y: "110%", rotate: 2 }}
            animate={show ? { y: "0%", rotate: 0 } : undefined}
            transition={{ duration: 1.05, ease: EASE, delay: delay + i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** "01 — Label" eyebrow with a hairline that draws itself. */
export function SectionLabel({ n, label, light = false }: { n: string; label: string; light?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={`eyebrow shrink-0 ${light ? "text-white/60" : "text-ink/55"}`}
      >
        {n} — {label}
      </motion.span>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.1 }}
        className="h-px w-full max-w-[18rem] origin-left bg-line"
      />
    </div>
  );
}

/** Fade-up block. */
export function FadeUp({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}


/* ------------------------------------------------------------------ */
/* Sub-page scaffolding                                                */
/* ------------------------------------------------------------------ */

export function PageFrame({ children }: { children: ReactNode }) {
  useReveal();
  return (
    <MotionConfig reducedMotion="user">
      <div className="page-enter min-h-screen bg-paper text-ink">
        <SiteHeader />
        <div className="h-16" />
        {children}
        <SiteFooter />
      </div>
    </MotionConfig>
  );
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <div className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <span className={`eyebrow ${light ? "text-white/60" : "text-ink/50"}`}>{children}</span>;
}

export function PageIntro({ number, label, title, copy }: { number: string; label: string; title: string; copy: string }) {
  return (
    <section className="grain site-shell relative grid grid-cols-12 gap-6 pb-20 pt-20 lg:pb-28 lg:pt-28">
      <div className="relative z-[2] col-span-12 lg:col-span-12">
        <SectionLabel n={number} label={label} />
      </div>
      <div className="relative z-[2] col-span-12 lg:col-span-10">
        <MaskLines
          as="h1"
          immediate
          delay={0.15}
          lines={[<>{title}<span className="text-reg">.</span></>]}
          className="mt-6 max-w-[18ch] text-5xl font-semibold leading-[0.98] tracking-[-0.035em] sm:text-7xl lg:text-[6.5rem]"
        />
        <FadeUp delay={0.4}>
          <p className="mt-10 max-w-[52ch] border-l-2 border-reg pl-5 text-base leading-relaxed text-ink/65 sm:text-lg">{copy}</p>
        </FadeUp>
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
