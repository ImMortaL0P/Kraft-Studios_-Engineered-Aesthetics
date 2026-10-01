const fs = require('fs');

let content = fs.readFileSync('src/routes/index.tsx', 'utf8');

const regex = /(<section ref=\{containerRef\} id="process" className="relative h-\[400vh\] bg-surface">[\s\S]*?<div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">)[\s\S]*?(<motion\.div\s*style=\{\{ x: smoothX \}\})/s;

content = content.replace(regex, `$1
        
        {/* 
          Gradient Mask: This layer sits directly behind the text but above the cards. 
          As cards slide left, they cross into this gradient and softly fade into the background 
          color, preventing messy overlaps with the copy.
        */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-full md:w-[600px] bg-gradient-to-r from-surface from-60% via-surface/80 to-transparent" />

        {/* Fixed Title Header */}
        <div className="absolute top-28 md:top-36 left-4 md:left-14 z-20 w-full md:w-[400px]">
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
        */}
        $2`);

content = content.replace(
  /<div \s*key=\{step\.k\} \s*className="flex w-\[85vw\](.*?)">([\s\S]*?)<\/div>\s*<\/motion\.div>/g,
  `<motion.div 
              key={step.k} 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="group flex w-[85vw]$1 hover:border-reg hover:shadow-md transition-shadow">
$2
            </motion.div>
          </motion.div>`
);

fs.writeFileSync('src/routes/index.tsx', content);
