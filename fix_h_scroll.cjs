const fs = require('fs');

let content = fs.readFileSync('src/routes/index.tsx', 'utf8');

// Notice Board is done. Now for the horizontal scroll hijack!
const newProcessCode = `function Process() {
  const containerRef = useRef<HTMLElement>(null);
  
  // By omitting offset, it defaults to ["start start", "end end"]
  // meaning 0 is when the top of the container hits the top of the viewport,
  // and 1 is when its bottom hits the bottom of the viewport.
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // We have 4 cards, let's map scroll 0->1 to translate the track 0% -> -75% 
  // so the last card comes clearly into view.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  // A spring makes the dragging feeling physically weighty and premium
  const smoothX = useSpring(x, { stiffness: 60, damping: 22, mass: 0.8 });

  return (
    <section ref={containerRef} id="process" className="relative h-[400vh] bg-surface">
      {/* Sticky boundary that captures the viewport while the section scrolls through */}
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        
        {/* Fixed Title Header */}
        <div className="absolute top-28 md:top-36 left-4 md:left-14 z-10 w-full md:w-[400px]">
          <SectionLabel n="05" label="Process" />
          <MaskLines
            className="mt-6 md:mt-8 font-display text-[clamp(2.5rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em]"
            lines={["From blueprint", <span key="l" className="text-ink/35">to running system.</span>]}
          />
          <FadeUp delay={0.2}>
            <p className="mt-8 max-w-[34ch] text-[15px] leading-relaxed text-ink/70">
              Four stages, short loops. Design, engineering and the business stay in the same
              conversation from the first audit to the handover.
            </p>
          </FadeUp>
        </div>

        {/* 
          The horizontal track sliding left across the screen. 
          By adding left-padding (or margin), we push the first card past the fixed title text.
        */}
        <motion.div 
          style={{ x: smoothX }} 
          className="flex h-max w-max gap-8 md:gap-14 px-4 md:pl-[500px] lg:pl-[600px] will-change-transform transform-gpu"
        >
          {steps.map((step, i) => (
            <div 
              key={step.k} 
              className="flex w-[85vw] md:w-[50vw] lg:w-[40vw] shrink-0 flex-col justify-between bg-paper p-10 md:p-14 border border-line/75 rounded-2xl shadow-sm"
            >
              <div>
                <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.24em]">
                  <span className="text-reg">Step 0{i + 1}</span>
                  <span className="text-ink/25">/</span>
                  <span className="text-ink/60">{step.k}</span>
                </div>
                <h3 className="mt-8 md:mt-12 max-w-[14ch] font-display text-4xl md:text-5xl font-bold tracking-tight text-ink">
                  {step.title}
                </h3>
              </div>
              
              <div className="mt-16 md:mt-24 border-t border-line/50 pt-8">
                <p className="text-[17px] leading-relaxed text-ink/70">
                  {step.copy}
                </p>
                <div className="mt-8">
                  <span className="chip text-[11px] font-mono tracking-[0.1em] !px-4 !py-2">Output — {step.out}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}`;

content = content.replace(/function Process\(\) \{[\s\S]*?(?=\/\* ---------- 06 mantra ---------- \*\/)/, newProcessCode + '\n\n');

fs.writeFileSync('src/routes/index.tsx', content);
