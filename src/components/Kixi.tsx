import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";

/**
 * Kixi — the studio mascot.
 *
 * The art is traced vector, so the figure is largely one fused silhouette: the
 * arms live inside the hoodie path and the eyes are holes punched through the
 * black, not shapes that can be selected. Two things did come apart cleanly in
 * every pose — the antenna beads and the loose ink droplets — and those are the
 * ones carrying secondary motion here. Everything else moves as one body.
 *
 * That is not a compromise so much as the right reading of the artwork: six
 * drawn poses swapped by context beats one rigged sprite pretending to act.
 *
 * The SVGs are imported as raw strings rather than <img> so the inner groups
 * stay addressable. Ids repeat when two Kixis share a page, so every rule below
 * selects by attribute inside a scoped container instead of by id.
 */

import heroSvg from "../assets/kixi/kixi-01-hero.svg?raw";
import preloaderSvg from "../assets/kixi/kixi-02-preloader.svg?raw";
import footerSvg from "../assets/kixi/kixi-03-footer.svg?raw";
import faqSvg from "../assets/kixi/kixi-04-faq.svg?raw";
import shrugSvg from "../assets/kixi/kixi-05-404-shrug.svg?raw";
import slumpedSvg from "../assets/kixi/kixi-05b-404-slumped.svg?raw";
import markSvg from "../assets/kixi/kixi-06-mark.svg?raw";

import heroUrl from "../assets/kixi/kixi-01-hero.svg?url";
import preloaderUrl from "../assets/kixi/kixi-02-preloader.svg?url";
import footerUrl from "../assets/kixi/kixi-03-footer.svg?url";
import faqUrl from "../assets/kixi/kixi-04-faq.svg?url";
import shrugUrl from "../assets/kixi/kixi-05-404-shrug.svg?url";
import slumpedUrl from "../assets/kixi/kixi-05b-404-slumped.svg?url";
import markUrl from "../assets/kixi/kixi-06-mark.svg?url";

export type KixiPose =
  | "hero"
  | "preloader"
  | "footer"
  | "faq"
  | "shrug"
  | "slumped"
  | "mark";

const ART: Record<KixiPose, string> = {
  hero: heroSvg,
  preloader: preloaderSvg,
  footer: footerSvg,
  faq: faqSvg,
  shrug: shrugSvg,
  slumped: slumpedSvg,
  mark: markSvg,
};

/** The same art again as plain URLs. `shape-outside` needs a resource it can
 *  read alpha from, which inline markup cannot provide — so text wrapping uses
 *  the file while the visible figure stays inline and animatable. */
const ART_URL: Record<KixiPose, string> = {
  hero: heroUrl,
  preloader: preloaderUrl,
  footer: footerUrl,
  faq: faqUrl,
  shrug: shrugUrl,
  slumped: slumpedUrl,
  mark: markUrl,
};

/** Poses whose droplets should fall rather than sit still. */
const DRIPPY: KixiPose[] = ["hero", "preloader", "footer"];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

export function Kixi({
  pose = "hero",
  className = "",
  /** Idle bob. Off for the mark, which usually sits inline with type. */
  float = true,
  /** Leans a degree or two into the scroll, the way a held balloon would. */
  scrollTilt = false,
  /** Perks up when pointed at. */
  interactive = true,
  /** Seconds, so two Kixis on one page never breathe in sync. */
  delay = 0,
  /** Leans a little toward the cursor, like something watching the room. */
  pointerParallax = false,
  /** Floats out of the text so a paragraph flows around the drawing itself. */
  wrap,
  /** Rises into place the first time it is scrolled past. */
  reveal = false,
  /** A fixed lean, in degrees — the mascot is rarely upright. */
  lean = 0,
  title,
}: {
  pose?: KixiPose;
  className?: string;
  float?: boolean;
  scrollTilt?: boolean;
  interactive?: boolean;
  delay?: number;
  pointerParallax?: boolean;
  wrap?: "left" | "right";
  reveal?: boolean;
  lean?: number;
  title?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Scroll velocity, damped — raw velocity is far too twitchy to drive a tilt.
  const { scrollY } = useScroll();
  const raw = useVelocity(scrollY);
  const smoothed = useSpring(raw, { stiffness: 90, damping: 26, mass: 0.6 });
  const tilt = useTransform(smoothed, [-2200, 0, 2200], [5, 0, -5], { clamp: true });
  const idle = useMotionValue(0);

  const markup = useMemo(() => ART[pose], [pose]);

  // Pointer parallax. Tracked on the window rather than per-element so a Kixi
  // reacts to the cursor crossing the page, not only to being hovered — the
  // difference between a sticker and something that notices you.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 20 });
  const sy = useSpring(py, { stiffness: 60, damping: 20 });
  useEffect(() => {
    if (!pointerParallax || reduced) return;
    if (window.matchMedia("(hover: none)").matches) return;
    const on = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
      px.set(Math.max(-1, Math.min(1, dx)) * 14);
      py.set(Math.max(-1, Math.min(1, dy)) * 10);
    };
    window.addEventListener("pointermove", on, { passive: true });
    return () => window.removeEventListener("pointermove", on);
  }, [pointerParallax, reduced, px, py]);

  const classes = [
    "kixi",
    `kixi--${pose}`,
    float && !reduced ? "kixi--float" : "",
    DRIPPY.includes(pose) && !reduced ? "kixi--drippy" : "",
    reduced ? "kixi--still" : "",
    interactive ? "kixi--interactive" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const wrapStyle = wrap
    ? {
        float: wrap,
        shapeOutside: `url(${ART_URL[pose]})`,
        shapeImageThreshold: 0.1,
        shapeMargin: "1.25rem",
      }
    : {};

  return (
    <motion.div
      ref={ref}
      className={classes}
      style={{
        rotate: scrollTilt && !reduced ? tilt : idle,
        x: pointerParallax && !reduced ? sx : 0,
        y: pointerParallax && !reduced ? sy : 0,
        ["--kixi-delay" as string]: `${delay}s`,
        ["--kixi-lean" as string]: `${lean}deg`,
        ...wrapStyle,
      }}
      {...(reveal && !reduced
        ? {
            initial: { opacity: 0, y: 70, rotate: lean - 6, scale: 0.94 },
            whileInView: { opacity: 1, y: 0, rotate: lean, scale: 1 },
            viewport: { once: true, margin: "0px 0px -12% 0px" },
            transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay },
          }
        : {})}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}

/**
 * The first-load curtain.
 *
 * Shown once per session, on the first paint only — not on route changes. The
 * site already has a page transition for those, and a full-screen mascot every
 * time you click a link stops being charming by the third click.
 *
 * Three rules keep it from being a nuisance:
 *   · it waits for fonts and the load event, so it covers real work rather than
 *     a made-up delay;
 *   · it holds for a short minimum so a fast connection gets a beat rather than
 *     a flicker;
 *   · it clears on a hard cap regardless, so a stalled font or image can never
 *     trap anyone behind it.
 *
 * It renders on the server too, so it is painted with the first byte instead of
 * appearing after hydration — which is the whole point of a loading state.
 */
export function KixiBoot() {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const MIN_MS = 650;
    const MAX_MS = 3000;

    const seen = (() => {
      try {
        return sessionStorage.getItem("kixi-boot") === "1";
      } catch {
        return false;
      }
    })();
    if (seen) {
      setBooting(false);
      return;
    }

    const started = performance.now();
    let settled = false;
    const finish = () => {
      if (cancelled || settled) return;
      settled = true;
      const held = performance.now() - started;
      window.setTimeout(
        () => {
          if (cancelled) return;
          setBooting(false);
          try {
            sessionStorage.setItem("kixi-boot", "1");
          } catch {
            /* private mode — showing it again next navigation is harmless */
          }
        },
        Math.max(0, MIN_MS - held),
      );
    };

    const loaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((r) => window.addEventListener("load", () => r(), { once: true }));
    const fonts = (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts?.ready;

    void Promise.all([loaded, fonts ?? Promise.resolve()]).then(finish);
    const cap = window.setTimeout(finish, MAX_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(cap);
    };
  }, []);

  // Hold the page still underneath, and hand scrolling back the moment it goes.
  useEffect(() => {
    const lenis = (window as unknown as { lenis?: { stop?: () => void; start?: () => void } }).lenis;
    if (booting) {
      document.documentElement.style.overflow = "hidden";
      lenis?.stop?.();
    } else {
      document.documentElement.style.overflow = "";
      lenis?.start?.();
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [booting]);

  return (
    <div className={`kixi-preloader ${booting ? "" : "is-done"}`} aria-hidden="true">
      <Kixi pose="preloader" float={false} interactive={false} />
      <span className="kixi-preloader__label">Kraft Studios</span>
    </div>
  );
}
