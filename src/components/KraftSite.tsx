import { Link, useRouter, useNavigate } from "@tanstack/react-router";
import logoWordmark from "../Logos/Kraft Studios Wordmark T.png";
import logoMonogram from "../Logos/Kraft Studios Monogram T.png";
import { ArrowUp, ArrowUpRight, Moon, Sun } from "lucide-react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

const navItems = [
  { label: "Work", to: "/work" as const },
  { label: "Our Brands", to: "/services" as const },
  { label: "About", to: "/about" as const },
  { label: "Contact", to: "/contact" as const },
];

const indexLinks = [
  { label: "Premise", hash: "premise" },
  { label: "Blueprint", hash: "blueprint" },
  { label: "Work", hash: "work" },
  { label: "Process", hash: "process" },
  { label: "Mantra", hash: "philosophy" },
  { label: "Contact", hash: "contact" },
];

/** Smooth-scroll to a section id, using Lenis when it is running. */
export function scrollToId(id: string) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as unknown as { lenis?: { scrollTo: (t: Element, o?: object) => void } })
    .lenis;
  if (lenis?.scrollTo) lenis.scrollTo(el, { offset: -70, duration: 1.2 });
  else
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 70,
      behavior: "smooth",
    });
}

/** Footer / menu index link: scrolls on the homepage, navigates from elsewhere. */
function IndexLink({ hash, label, onDone }: { hash: string; label: string; onDone?: () => void }) {
  const navigate = useNavigate({ from: "/" });

  return (
    <a
      href={`/#${hash}`}
      className="hover:text-reg"
      onClick={(e) => {
        e.preventDefault();
        onDone?.();

        const target = document.getElementById(hash);
        if (target) {
          scrollToId(hash);
        } else {
          navigate({ to: "/", hash: hash });
        }
      }}
    >
      {label}
    </a>
  );
}

/** Infinite marquee strip. */
export function Ticker({
  items,
  className = "",
  fast = false,
}: {
  items: ReactNode[];
  className?: string;
  fast?: boolean;
}) {
  const set = (key: string, hidden = false) => (
    <div key={key} className="marquee-set" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          {item}
          <span className="mx-8 inline-block size-1.5 rotate-45 bg-reg md:mx-12" />
        </span>
      ))}
    </div>
  );
  return (
    <div className={`marquee-mask overflow-hidden ${className}`}>
      <div className={`marquee-track ${fast ? "fast" : ""}`}>
        {set("a")}
        {set("b", true)}
      </div>
    </div>
  );
}

/**
 * The same marquee mechanism as `Ticker`, at display scale.
 *
 * Type is outlined rather than solid so a band of it reads as texture instead
 * of a wall of ink; pointing at the band drops everything to a whisper and
 * brings the one word under the cursor back, filled in the accent. The dimming
 * is a single inherited custom property, so it costs one rule rather than one
 * per item, and the only animated properties are `transform` on the track and
 * `opacity` / `color` on the words — all compositor work.
 *
 * `items` may be plain words or links; a link gets the hover treatment for
 * free and remains reachable by keyboard, which is why the duplicated set is
 * hidden from assistive tech and taken out of the tab order.
 */
export function DisplayTicker({
  items,
  className = "",
  fast = false,
}: {
  items: { label: string; to?: string }[];
  className?: string;
  fast?: boolean;
}) {
  const set = (key: string, hidden = false) => (
    <div key={key} className="marquee-set" aria-hidden={hidden || undefined}>
      {items.map((item, i) => {
        const word = item.to ? (
          <Link
            to={item.to}
            className="display-item outline-type"
            tabIndex={hidden ? -1 : undefined}
          >
            {item.label}
          </Link>
        ) : (
          <span className="display-item outline-type">{item.label}</span>
        );
        return (
          <span key={i} className="flex items-center">
            {word}
            <span className="display-sep mx-5 inline-block size-2 rotate-45 bg-reg md:mx-8" />
          </span>
        );
      })}
    </div>
  );

  return (
    <div className={`display-marquee marquee-mask overflow-hidden ${className}`}>
      <div className={`marquee-track ${fast ? "fast" : ""}`}>
        {set("a")}
        {set("b", true)}
      </div>
    </div>
  );
}

/**
 * Four figures, each one read off the site's own data rather than typed in, so
 * the band cannot drift out of step with the work it is counting.
 */
export function StatBand({
  stats,
  className = "",
}: {
  stats: { figure: string; label: string; note?: string }[];
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-2 gap-px bg-line lg:grid-cols-4 ${className}`}>
      {stats.map((s, i) => (
        <FadeUp
          key={s.label}
          delay={i * 0.08}
          className="bg-paper px-5 py-9 md:px-7 md:py-11 text-center flex flex-col items-center"
        >
          <p className="stat-figure">{s.figure}</p>
          <p className="mt-3 text-sm font-bold leading-tight">{s.label}</p>
          {s.note ? (
            <p className="mt-1.5 font-mono text-[10px] uppercase leading-[1.7] tracking-[0.18em] text-ink/40">
              {s.note}
            </p>
          ) : null}
        </FadeUp>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Theme                                                               */
/* ------------------------------------------------------------------ */

export const themeInitScript = `(function(){try{var t=localStorage.getItem('kraft-theme');if(t==='light'){document.documentElement.setAttribute('data-theme','light')}else{document.documentElement.setAttribute('data-theme','dark')}}catch(e){document.documentElement.setAttribute('data-theme','dark')}})();`;

function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark");
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("kraft-theme", next);
    } catch {
      /* storage unavailable */
    }
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
        {theme === "dark" ? (
          <Moon size={11} strokeWidth={2.4} />
        ) : (
          <Sun size={11} strokeWidth={2.4} />
        )}
      </motion.span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Header + full-screen menu                                           */
/* ------------------------------------------------------------------ */

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);

      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = (window as unknown as { lenis?: { stop?: () => void; start?: () => void } })
      .lenis;
    if (open) {
      if (typeof lenis?.stop === "function") lenis.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      if (typeof lenis?.start === "function") lenis.start();
      document.documentElement.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className={`site-header ${scrolled && !open ? "is-scrolled" : ""} `}>
        <div className="gutter mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-3 sm:gap-6">
          <Link
            to="/"
            className="group relative z-[2] flex w-[130px] items-center sm:w-[180px] lg:w-[220px]"
            aria-label="Kraft Studios home"
            onClick={() => setOpen(false)}
          >
            <img
              src={logoWordmark}
              alt="Kraft Studios Logo"
              decoding="async"
              className="h-auto w-full object-contain opacity-90 transition-opacity duration-300 group-hover:opacity-100"
            />
          </Link>

          <div className="relative z-[2] flex items-center gap-2 sm:gap-5 md:gap-7">
            <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
              {navItems.map((item) => (
                <Link key={item.to} to={item.to} className="nav-link">
                  {item.label}
                </Link>
              ))}
            </nav>
            <ThemeToggle />
            <Link to="/contact" className="pill hidden sm:inline-flex">
              Start a project
            </Link>
            <Magnetic>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-label={open ? "Close menu" : "Open menu"}
                className="group flex items-center gap-2 font-mono text-[10px] tracking-[0.26em] sm:gap-3 sm:text-[11px]"
              >
                <span className="hidden sm:inline">{open ? "CLOSE" : "MENU"}</span>
                <span className="relative block h-3 w-5 sm:w-6">
                  <span
                    className={`absolute left-0 h-px w-full bg-ink transition-all duration-500 ${open ? "top-1/2 rotate-45" : "top-0.5 group-hover:w-2/3"}`}
                  />
                  <span
                    className={`absolute left-0 h-px w-full bg-ink transition-all duration-500 ${open ? "top-1/2 -rotate-45" : "bottom-0.5 top-auto"}`}
                  />
                </span>
              </button>
            </Magnetic>
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
                        delay: open ? 0.15 + i * 0.06 : (navItems.length - 1 - i) * 0.04,
                      }}
                    >
                      <Link
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className="group flex items-baseline gap-3 py-3 md:gap-5 md:py-4"
                      >
                        <span className="font-mono text-[10px] text-ink/40 sm:text-xs">
                          0{i + 1}
                        </span>
                        <span className="text-[clamp(2rem,9vw,6.5rem)] font-bold leading-none tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-4 group-hover:text-reg">
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
                    <IndexLink
                      key={l.hash}
                      hash={l.hash}
                      label={l.label}
                      onDone={() => setOpen(false)}
                    />
                  ))}
                </div>
                <a href="mailto:mangalam@kraftstudios.site" className="text-ink hover:text-reg">
                  mangalam@kraftstudios.site
                </a>
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
    if (!g) return;
    for (let r = 0; r < 7; r++) rows[r] = `${rows[r] ?? ""}${i ? "0" : ""}${g[r] ?? ""}`;
  });
  return rows;
}

export function PixelWordmark({ word = "KRAFT" }: { word?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const rows = buildBitmap(word);
  const cols = rows[0]?.length ?? 0;

  return (
    <div
      ref={ref}
      className={`pixel-grid ${inView ? "is-on" : ""}`}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      aria-label={word}
      role="img"
    >
      {rows.flatMap((row, r) =>
        row
          .split("")
          .map((bit, c) => (
            <span
              key={`${r}-${c}`}
              className={`pixel ${bit === "1" ? "on" : ""}`}
              style={
                bit === "1"
                  ? { transitionDelay: inView ? `${c * 22 + r * 30}ms` : "0ms" }
                  : undefined
              }
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
              decoding="async"
              className="w-full h-full object-contain opacity-40 group-hover:opacity-100 transition-all duration-500 relative z-10"
              whileHover={{
                scale: 1.1,
                rotateY: 15,
                rotateX: -10,
                filter: "brightness(1.3) drop-shadow(0 20px 30px rgba(0,0,0,0.2))",
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
            <p className="max-w-[26ch] text-xl font-bold leading-snug tracking-[-0.01em]">
              Brand, software and operations — designed as one system.
            </p>
            <Link to="/contact" className="pill-solid mt-8">
              Start a conversation <ArrowUpRight size={16} className="arrow" />
            </Link>
          </div>
          <FooterCol title="Studio" className="md:col-span-2 md:col-start-6">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className="hover:text-reg">
                {item.label}
              </Link>
            ))}
          </FooterCol>
          <FooterCol title="Index" className="md:col-span-2">
            {indexLinks.map((l) => (
              <IndexLink key={l.hash} hash={l.hash} label={l.label} />
            ))}
          </FooterCol>
          <FooterCol title="Contact" className="col-span-2 md:col-span-3 md:col-start-10">
            <a href="mailto:mangalam@kraftstudios.site" className="break-words hover:text-reg">
              mangalam@kraftstudios.site
            </a>
            <span className="text-ink/50">India · Working globally</span>
          </FooterCol>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line py-6 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45 sm:flex-row sm:items-center">
          <span>
            © 2026 Kraft Studios <span className="mx-2 text-ink/20">/</span> Sys. v1.1
          </span>
          <Magnetic>
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
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
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

function useSafeInView(ref: React.RefObject<Element | null>, once = true) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    if (ref.current.getBoundingClientRect().top < window.innerHeight + 100) {
      setInView(true);
      if (once) return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setInView(true);
          if (once && ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.05, rootMargin: "50px 0px -5%" },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, once]);
  return inView;
}
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
  const inView = useSafeInView(ref as RefObject<Element>);
  const show = immediate || inView;
  return (
    <Tag ref={ref as never} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className="block will-change-transform transform-gpu"
            initial={{ y: "110%", rotate: 2 }}
            animate={show ? { y: "0%", rotate: 0 } : { y: "110%", rotate: 2 }}
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
export function SectionLabel({
  n,
  label,
  light = false,
}: {
  n: string;
  label: string;
  light?: boolean;
}) {
  return (
    <div className="flex items-center gap-4">
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={`eyebrow shrink-0 ${light ? "opacity-60" : "text-ink/55"}`}
      >
        {n} — {label}
      </motion.span>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.1 }}
        className={`h-px w-full max-w-[18rem] origin-left ${light ? "bg-current opacity-20" : "bg-line"}`}
      />
    </div>
  );
}

/** Fade-up block. */
export function FadeUp({
  children,
  className = "",
  delay = 0,
  immediate = false,
  id,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  immediate?: boolean;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useSafeInView(ref);
  const show = immediate || inView;
  return (
    <motion.div
      id={id}
      ref={ref}
      className={`${className} will-change-transform transform-gpu`}
      initial={{ opacity: 0, y: 26 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Sub-page scaffolding                                                */
/* ------------------------------------------------------------------ */
export function Magnetic({
  children,
  className = "",
}: {
  children: React.ReactElement;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.2);
    y.set(middleY * 0.2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={`transform-gpu will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function PageFrame({ children }: { children: ReactNode }) {
  useReveal();

  useEffect(() => {
    const onContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    const onDragStart = (event: DragEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.closest("img") || target.closest("video") || target.closest("canvas"))
      ) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("dragstart", onDragStart);

    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("dragstart", onDragStart);
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div
        className="min-h-screen bg-paper text-ink"
        onContextMenu={(event) => event.preventDefault()}
        onDragStart={(event) => {
          const target = event.target as HTMLElement | null;
          if (
            target &&
            (target.closest("img") || target.closest("video") || target.closest("canvas"))
          ) {
            event.preventDefault();
          }
        }}
      >
        <SiteHeader />

        {children}
        <SiteFooter />
      </div>
    </MotionConfig>
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  id,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}) {
  return (
    <div id={id} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  light = false,
  className = "",
}: {
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <span className={`eyebrow ${light ? "opacity-60" : "text-ink/50"} ${className}`}>
      {children}
    </span>
  );
}

export function PageIntro({
  number,
  label,
  title,
  copy,
}: {
  number: string;
  label: string;
  title: string;
  copy: string;
}) {
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
          lines={[
            <>
              {title.replace(/\.$/, "")}
              <span className="text-reg">.</span>
            </>,
          ]}
          className="mt-6 max-w-[18ch] text-5xl font-bold leading-[0.98] tracking-[-0.035em] sm:text-7xl lg:text-[6.5rem]"
        />
        <FadeUp delay={0.4} immediate>
          <p className="mt-10 max-w-[52ch] border-l-2 border-reg pl-5 text-base leading-relaxed text-ink/65 sm:text-lg">
            {copy}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

function useReveal() {
  useEffect(() => {
    const t = setTimeout(() => {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)"));
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.05, rootMargin: "50px 0px -5%" },
      );

      nodes.forEach((node) => {
        if (node.getBoundingClientRect().top < window.innerHeight + 100) {
          node.classList.add("is-visible");
        } else {
          observer.observe(node);
        }
      });

      // Force framer motion's whileInView bindings to resync via global resize/scroll
      window.dispatchEvent(new Event("scroll"));
      window.dispatchEvent(new Event("resize"));
    }, 50);

    return () => clearTimeout(t);
  }, []);
}
