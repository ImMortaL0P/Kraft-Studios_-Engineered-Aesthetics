import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Placeholder images
import heroImage from "../assets/kraft-hero.jpg";
import umvadlaImage from "../assets/project-umvadla.jpg";
import hotelImage from "../assets/project-hotel.jpg";
import noticeboardImage from "../assets/project-noticeboard.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Kraft Studios — Engineered Aesthetics" },
    { name: "description", content: "Kraft Studios unites brand design, custom software and operational infrastructure into coherent digital ecosystems." },
  ]}),
  component: DashboardHomePage,
});

const services = [
  ["01", "Systems Architecture", "High-performance websites, tailored platforms and automation systems that remove friction from complex operations."],
  ["02", "Editorial Identity", "Bespoke identities rooted in market intelligence. A strong typographic voice meets considered whitespace."],
  ["03", "Motion & Interface", "Interactions modeled like physics. Smooth transitions and considered kinetic typography that reward users."],
];

const projects = [
  { id: "umvadla", image: umvadlaImage, tag: "Brandworld", title: "Umvadla", desc: "Zero-friction editorial publishing infrastructure." },
  { id: "hotel", image: hotelImage, tag: "System Design", title: "Centralized Hospitality", desc: "A connected system replacing 5 fragmented tools." },
  { id: "noticeboard", image: noticeboardImage, tag: "Intelligence", title: "Notice Board", desc: "Autonomous data pipelines rendering global metrics." },
  { id: "sandbox", image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=1200", tag: "R&D", title: "Kinetic Sandbox", desc: "WebGL experiments exploring fluid simulation." },
];

const timelineSteps = [
  { id: "hero", label: "00 — Core" },
  { id: "blueprint", label: "01 — Blueprint" },
  { id: "work", label: "02 — Case Studies" },
  { id: "clients", label: "03 — Partners" },
  { id: "contact", label: "04 — Contact" }
];

// Utility for staggering text lines smoothly
const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};
const textItemVariants = {
  hidden: { y: 40, opacity: 0, rotateX: 45 },
  visible: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.8 }
  }
};
const blockVariants = {
  hidden: { y: 60, opacity: 0, scale: 0.95 },
  visible: {
    y: 0, opacity: 1, scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

function DashboardHomePage() {
  const [activeSegment, setActiveSegment] = useState("hero");

  // Track continuous reading progress for the top bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Update active segment on scroll via Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the top-most intersecting entry that occupies the viewport
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSegment(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    timelineSteps.forEach((step) => {
      const el = document.getElementById(step.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      // Offset for the sticky top nav
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-paper text-ink font-body w-full relative selection:bg-reg selection:text-paper">

      {/* Top Global Progress Bar (Continuous across the site) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-reg z-[60] origin-left"
        style={{ scaleX }}
      />

      <div className="flex w-full min-h-screen overflow-hidden">

        {/* LEFT SIDEBAR - Navigation & Brand (Dark) */}
        <aside className="fixed top-0 left-0 h-screen w-16 md:w-[260px] bg-ink text-paper z-50 flex flex-col justify-between py-6 md:py-10 px-4 md:px-8 border-r border-[#2A2A2A]">
          <div className="flex flex-col gap-12">
            <Link to="/" className="flex items-center gap-3 font-display font-bold text-xl tracking-tight group">
              <span className="w-3 h-3 bg-reg shrink-0 group-hover:scale-125 transition-transform" />
              <span className="hidden md:block overflow-hidden">
                <motion.span initial={{y:20}} animate={{y:0}} className="inline-block">KRAFT</motion.span>
              </span>
            </Link>

            <nav className="hidden md:flex flex-col gap-6 font-medium text-sm mt-8">
              {["Work", "Services", "About", "Contact"].map((item, i) => (
                <motion.div key={item} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
                  <Link to={`/${item.toLowerCase()}`} className="text-paper/60 hover:text-paper transition-colors flex items-center gap-2 group">
                    <span className="w-0 h-px bg-reg group-hover:w-4 transition-all duration-300" />
                    {item}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>

          <div className="hidden md:block text-[10px] uppercase tracking-widest text-paper/30 pb-4">
             SYS. V.1.0 — © 2026
          </div>
        </aside>

        {/* RIGHT PANEL - Contextual Highlight List */}
        <aside className="hidden xl:flex fixed top-0 right-0 h-screen w-[320px] bg-paper border-l border-line flex-col py-12 px-10 z-40 justify-center">
          <div className="absolute top-10 right-10 text-[10px] font-display uppercase tracking-widest text-ink/40">
            Index Overview
          </div>

          <div className="flex flex-col gap-8 w-full mt-12">
            {timelineSteps.map((step) => {
              const isActive = activeSegment === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => scrollToSection(step.id)}
                  className="relative flex items-center group cursor-pointer w-full text-left p-1 outline-none"
                >
                  {/* The red highlighted pill background for active state */}
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 -ml-4 -mr-4 bg-reg rounded-sm z-0"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className={`relative z-10 font-display font-medium text-sm tracking-wide transition-colors duration-300 ${isActive ? 'text-paper' : 'text-ink/60 group-hover:text-ink'}`}>
                    {step.label}
                  </div>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="relative z-10 ml-auto"
                    >
                      <ArrowRight size={14} className="text-paper" />
                    </motion.div>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* MAIN SCROLLABLE CONTENT */}
        <main className="ml-16 md:ml-[260px] xl:mr-[320px] w-full min-h-screen relative">

          {/* Top Dashed Progress / Nav */}
          <header className="sticky top-0 h-16 border-b border-line bg-paper/90 backdrop-blur-md z-40 flex items-center px-6 md:px-12 w-full">
            <div className="flex gap-2 w-full max-w-4xl mx-auto h-[3px]">
              {[0, 1, 2, 3, 4].map((i) => {
                const step = timelineSteps[i];
                const currentIndex = timelineSteps.findIndex(s => s.id === activeSegment);
                const isPassed = currentIndex > i;
                const isCurrent = currentIndex === i;

                return (
                  <button
                    key={i}
                    onClick={() => scrollToSection(step.id)}
                    className="flex-1 bg-ink/10 rounded-full overflow-hidden relative cursor-pointer"
                    aria-label={`Scroll to ${step.label}`}
                  >
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-ink"
                      initial={{ width: "0%" }}
                      animate={{
                        width: isPassed ? "100%" : isCurrent ? "100%" : "0%"
                      }}
                      transition={{ duration: 0.6, ease: "circOut" }}
                    />
                  </button>
                );
              })}
            </div>
          </header>

          <div className="px-6 md:px-12 lg:px-20 pt-16 pb-32">

            {/* HERO SECTION */}
            <section id="hero" className="min-h-[85vh] flex flex-col justify-center relative py-12 md:py-24">
              <div className="max-w-4xl">
                <motion.div
                  variants={textContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="font-display font-bold uppercase leading-[0.85] tracking-tighter text-[clamp(2.8rem,8vw,8rem)]"
                >
                  <motion.div variants={textItemVariants} className="overflow-hidden">ENGINEERED</motion.div>
                  <motion.div variants={textItemVariants} className="overflow-hidden text-reg">AESTHETICS.</motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 1 }}
                  viewport={{ once: true }}
                  className="mt-12 text-lg md:text-2xl leading-relaxed text-ink/80 font-medium max-w-2xl border-l-[3px] border-reg pl-6 md:pl-8"
                >
                  Connecting craft with evidence, design with engineering, people with systems. A wireframed approach to scalable brandworlds.
                </motion.div>
              </div>

              {/* Dynamic Parallax Image Block */}
              <ParallaxBlock src={heroImage} className="mt-20 h-[45vh] md:h-[60vh] w-full max-w-5xl ml-auto" />
            </section>

            {/* SEPARATOR */}
            <hr className="border-line my-12" />

            {/* SYSTEM BLUEPRINT */}
            <section id="blueprint" className="py-24">
               <motion.div
                  variants={textContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="mb-16"
               >
                 <motion.span variants={textItemVariants} className="uppercase text-xs tracking-widest font-bold text-reg mb-4 block">System Architecture</motion.span>
                 <motion.h2 variants={textItemVariants} className="font-display text-4xl md:text-6xl font-semibold leading-tight max-w-2xl">
                   Frameworks designed for <br/> <i className="text-ink/40 font-serif">exponential scale.</i>
                 </motion.h2>
               </motion.div>

               <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
                 {services.map((svc, i) => (
                   <motion.div
                     key={svc[0]}
                     variants={blockVariants}
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true, margin: "-100px" }}
                     transition={{ delay: i * 0.15 }}
                     className="border-t border-line pt-6 group"
                   >
                     <div className="flex justify-between items-start mb-4">
                       <span className="font-display font-bold text-2xl group-hover:text-reg transition-colors">{svc[1]}</span>
                       <span className="text-xs text-ink/30 font-mono tracking-widest">{svc[0]}</span>
                     </div>
                     <p className="text-ink/70 leading-relaxed pr-8 font-medium">{svc[2]}</p>
                   </motion.div>
                 ))}
               </div>
            </section>

            {/* CASE STUDIES */}
            <section id="work" className="py-24">
              <div className="flex items-end justify-between mb-20 border-b border-line pb-8">
                <div>
                  <span className="uppercase text-xs tracking-widest font-bold text-reg mb-2 block">Selected Work</span>
                  <h2 className="font-display text-4xl md:text-6xl font-semibold leading-none">Playground.</h2>
                </div>
              </div>

              <div className="flex flex-col gap-32">
                {projects.map((proj, i) => (
                  <motion.div
                    key={proj.id}
                    initial={{ opacity: 0, scale: 0.95, y: 50 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                    className={`flex flex-col ${i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16 items-center`}
                  >
                    <div className="w-full md:w-3/5 overflow-hidden bg-ink/5 p-2 border border-line rounded-md">
                       <ParallaxBlock src={proj.image} className="aspect-[4/3] w-full" />
                    </div>

                    <div className="w-full md:w-2/5 flex flex-col items-start px-4 md:px-0">
                       <div className="px-3 py-1 bg-ink text-paper text-[10px] uppercase font-bold tracking-widest mb-6">
                         {proj.tag}
                       </div>
                       <h3 className="font-display text-3xl md:text-5xl font-semibold mb-4">{proj.title}</h3>
                       <p className="text-ink/70 text-lg leading-relaxed mb-8">{proj.desc}</p>
                       <Link to="/work" className="flex items-center gap-2 group font-semibold text-sm uppercase tracking-wide">
                         Explore Project
                         <span className="p-2 border border-line rounded-full group-hover:bg-reg group-hover:text-paper transition-colors group-hover:border-reg">
                           <ArrowUpRight size={16} />
                         </span>
                       </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* PARTNERS / MARQUEE */}
            <section id="clients" className="py-32 border-y border-line my-12 overflow-hidden">
               <div className="text-center mb-16">
                 <span className="uppercase text-xs tracking-widest font-bold text-ink/40">Entities trusting our blueprint</span>
               </div>

               <motion.div
                 className="flex whitespace-nowrap"
                 animate={{ x: ["0%", "-50%"] }}
                 transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
               >
                 {/* Duplicate arrays for seamless loop */}
                 {[1, 2].map((set) => (
                   <div key={set} className="flex gap-16 md:gap-32 shrink-0 px-8 md:px-16 items-center">
                     {["TATA GROUP", "ADOBE", "NIKE", "SPOTIFY", "NOTION", "AIRBNB"].map((logo) => (
                       <span key={logo} className="font-display font-bold text-5xl md:text-7xl tracking-tighter text-ink/10 hover:text-ink transition-colors duration-500 cursor-default">
                         {logo}
                       </span>
                     ))}
                   </div>
                 ))}
               </motion.div>
            </section>

            {/* CONTACT / CALL TO ACTION */}
            <section id="contact" className="py-32 flex flex-col items-center justify-center text-center">
              <motion.div
                 initial={{ scale: 0.95, opacity: 0, y: 40 }}
                 whileInView={{ scale: 1, opacity: 1, y: 0 }}
                 transition={{ type: "spring", stiffness: 50, damping: 20 }}
                 viewport={{ once: true, margin: "-100px" }}
                 className="p-12 md:p-24 bg-ink text-paper w-full rounded-xl relative overflow-hidden group"
              >
                {/* Decorative wireframe lines inside the dark box */}
                <div className="absolute inset-x-0 top-1/2 h-px bg-paper/10 -translate-y-1/2 scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 ease-in-out" />
                <div className="absolute inset-y-0 left-1/2 w-px bg-paper/10 -translate-x-1/2 scale-y-0 group-hover:scale-y-100 transition-transform duration-1000 ease-in-out" />

                <h2 className="font-display text-4xl md:text-7xl font-bold leading-none mb-8 relative z-10">
                  Ready to deploy?
                </h2>
                <Link to="/contact" className="inline-flex items-center gap-3 bg-reg text-paper px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:scale-105 transition-transform hover:shadow-2xl hover:shadow-reg/30 relative z-10">
                  Initialize Protocol <ArrowRight size={18} />
                </Link>
              </motion.div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}

// Reusable component for buttery smooth parallax images
function ParallaxBlock({ src, className }: { src: string, className: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Slower, smoother transform for parallax
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`overflow-hidden rounded-md ${className} relative group bg-ink/5`}>
       {/* Wireframe overlay markings */}
       <div className="absolute top-4 left-4 z-10 w-4 h-4 border-t-2 border-l-2 border-paper/60 mix-blend-difference" />
       <div className="absolute bottom-4 right-4 z-10 w-4 h-4 border-b-2 border-r-2 border-paper/60 mix-blend-difference" />

       <motion.img
         style={{ y }}
         src={src}
         alt=""
         loading="lazy"
         className="w-full h-[120%] object-cover absolute top-0 left-0 grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
       />
    </div>
  );
}
