import { MaskLines, SectionLabel, FadeUp } from "./KraftSite";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    k: "Frame",
    title: "Find the real problem",
    copy: "Audits, workshops and data reviews until we agree what should change — and how we'll know it did.",
    out: "Problem brief",
  },
  {
    k: "Blueprint",
    title: "Design the system, not the screen",
    copy: "Identity rules, information architecture and technical architecture drafted at the same table.",
    out: "System blueprint",
  },
  {
    k: "Build",
    title: "Ship in small, working slices",
    copy: "Design and engineering pair on every release, so nothing is lost between a mockup and production.",
    out: "Working releases",
  },
  {
    k: "Compound",
    title: "Keep what we learn",
    copy: "Design systems, documentation and dashboards stay with your team long after launch.",
    out: "Playbook & metrics",
  },
];

function ScrollRevealChar({
  char,
  progress,
  range,
  className = "",
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={`relative inline-block will-change-transform ${className}`}
    >
      {char}
    </motion.span>
  );
}

function ScrollRevealText({
  text,
  progress,
  className = "",
  windowStart = 0.12,
  windowEnd = 0.47,
  by = "char",
}: {
  text: string;
  progress: MotionValue<number>;
  className?: string;
  windowStart?: number;
  windowEnd?: number;
  by?: "char" | "word";
}) {
  const words = text.split(" ");

  if (by === "word") {
    return (
      <span className={`inline-flex flex-wrap ${className}`}>
        {words.map((word, wIdx) => {
          const localStart = windowStart + (wIdx / words.length) * (windowEnd - windowStart);
          const localEnd = Math.min(1, localStart + 0.06);
          return (
            <ScrollRevealChar
              key={wIdx}
              char={word}
              progress={progress}
              range={[localStart, localEnd] as [number, number]}
              className="mr-[0.28em]"
            />
          );
        })}
      </span>
    );
  }

  let charCount = 0;
  const totalChars = text.replace(/\s/g, "").length;

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, wIdx) => (
        <span key={wIdx} className="relative mr-[0.3em] inline-flex">
          {word.split("").map((char, index) => {
            const start = charCount / totalChars;
            charCount++;
            const localStart = windowStart + start * (windowEnd - windowStart);
            const localEnd = Math.min(1, localStart + 0.06);
            return (
              <ScrollRevealChar
                key={index}
                char={char}
                progress={progress}
                range={[localStart, localEnd] as [number, number]}
              />
            );
          })}
        </span>
      ))}
    </span>
  );
}

export function ProcessSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  const smoothX = useSpring(x, { stiffness: 60, damping: 22, mass: 0.8 });

  return (
    <section ref={containerRef} id="process" className="relative h-[400vh] bg-surface">
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-full md:w-[600px] bg-gradient-to-r from-surface from-60% via-surface/80 to-transparent" />

        <div className="absolute left-4 top-28 z-20 w-full md:left-14 md:top-36 md:w-[400px]">
          <SectionLabel n="05" label="Process" />
          <MaskLines
            className="mt-6 font-display text-[clamp(2.5rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em] md:mt-8"
            lines={["From blueprint", <span key="l" className="text-ink/35">to running system.</span>]}
          />
          <FadeUp delay={0.2}>
            <p className="mt-8 max-w-[34ch] text-[15px] leading-relaxed text-ink/70">
              Four stages, short loops. Design, engineering and the business stay in the same
              conversation from the first audit to the handover.
            </p>
          </FadeUp>
        </div>

        <motion.div
          style={{ x: smoothX }}
          className="flex h-max w-max gap-8 px-4 md:gap-14 md:pl-[500px] lg:pl-[600px] will-change-transform transform-gpu"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.k}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="group flex w-[85vw] shrink-0 flex-col justify-between rounded-2xl border border-line/75 bg-paper p-10 shadow-[0_0_0_1px_transparent] transition-all duration-300 hover:border-reg hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:w-[50vw] md:p-14 lg:w-[40vw]"
            >
              <div>
                <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.24em]">
                  <span className="text-reg">Step 0{i + 1}</span>
                  <span className="text-ink/25">/</span>
                  <span className="text-ink/60">{step.k}</span>
                </div>
                <h3 className="mt-8 max-w-[14ch] font-display text-4xl font-bold tracking-tight text-ink md:mt-12 md:text-5xl">
                  {step.title}
                </h3>
              </div>

              <div className="mt-16 border-t border-line/50 pt-8 md:mt-24">
                <p className="text-[17px] leading-relaxed text-ink/70">{step.copy}</p>
                <div className="mt-8">
                  <span className="chip !px-4 !py-2 text-[11px] font-mono tracking-[0.1em]">
                    Output — {step.out}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function MantraSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const y = useTransform(scrollYProgress, [0, 1], ["-18%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 1]);
  const blobOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 0.5]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const ringOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 0.12]);
  const drift = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const italicX = useTransform(scrollYProgress, [0, 1], [0, 26]);

  return (
    <section
      id="philosophy"
      ref={ref}
      className="group relative overflow-hidden border-y border-line bg-ink/[0.04] py-24 lg:py-36"
    >
      <motion.div
        style={{ y, scale, opacity: blobOpacity }}
        className="pointer-events-none absolute -right-24 -top-24 h-[22rem] w-[22rem] rounded-full bg-reg/40 blur-[90px] lg:-right-40 lg:h-[34rem] lg:w-[34rem] transform-gpu will-change-transform"
      />
      <motion.div
        style={{ rotate, opacity: ringOpacity }}
        className="pointer-events-none absolute -bottom-40 left-10 hidden h-[30rem] w-[30rem] rounded-full border border-dashed border-ink lg:block transform-gpu will-change-transform"
      />

      <div className="site-shell relative z-10 grid grid-cols-12 gap-8 lg:gap-6">
        <div className="col-span-12 flex flex-col justify-between lg:col-span-3">
          <SectionLabel n="06" label="The Mantra" />
          <motion.div
            style={{ y: drift }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.45 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-auto hidden flex-col gap-2 pb-4 lg:flex"
          >
            <div className="flex h-12 items-end gap-1">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 bg-ink"
                  animate={{ height: ["20%", "80%", "40%", "100%", "30%", "20%"] }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "mirror",
                  }}
                />
              ))}
            </div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em]">
              Sys. output // {new Date().getFullYear()}
            </div>
          </motion.div>
        </div>

        <div className="col-span-12 flex flex-col justify-center lg:col-span-9">
          <h2 className="font-display text-4xl font-bold leading-[0.95] tracking-[-0.035em] sm:text-5xl md:text-7xl lg:text-[7.5rem]">
            <span className="block">
              <ScrollRevealText
                text="Why build ordinary?"
                progress={scrollYProgress}
                windowStart={0.18}
                windowEnd={0.4}
              />
            </span>
            <motion.span style={{ x: italicX }} className="mt-4 block lg:mt-8">
              <span className="font-serif italic text-ink/55">
                <ScrollRevealText
                  text="We design frameworks that leave a legacy."
                  progress={scrollYProgress}
                  windowStart={0.4}
                  windowEnd={0.62}
                  by="word"
                />
              </span>
            </motion.span>
          </h2>

          <FadeUp delay={0.2} className="mt-14 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
            {[
              [
                "Culturally resonant",
                "We draw from living visual traditions without reducing them to decoration.",
              ],
              [
                "Operationally exact",
                "Every interface is backed by architecture that holds under real pressure.",
              ],
              [
                "Built to be inherited",
                "Systems, documentation and rules your team can run without us.",
              ],
            ].map(([k, v]) => (
              <div key={k}>
                <h3 className="font-display text-base font-bold">{k}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/55">{v}</p>
              </div>
            ))}
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
