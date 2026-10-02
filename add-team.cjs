const fs = require("fs");
let code = fs.readFileSync("src/routes/about.tsx", "utf8");

const teamSectionJSX = `
        <section className="bg-surface relative border-t border-line py-24 lg:py-40">
          <div className="site-shell">
            <Reveal>
              <Eyebrow>The Infrastructure</Eyebrow>
              <h2 className="mt-6 font-display text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tight">
                The team behind it all
              </h2>
            </Reveal>

            {/* Tetris-inspired interlocking grid architecture */}
            <div className="mt-16 lg:mt-24 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 auto-rows-min gap-px bg-line border border-line rounded-md overflow-hidden">
              
              {/* Block 1: The Long Bar (Tetris I piece vibe) */}
              <div className="bg-paper p-8 lg:p-12 md:col-span-4 lg:col-span-5 lg:row-span-2 flex flex-col justify-between relative group hover:bg-surface transition-colors duration-500">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-reg mb-8">
                    Founder / Designer
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ink">
                    Kumar Mangalam
                  </h3>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {["Mechanical Eng.", "CS Engineering", "Operations"].map(tag => (
                      <span key={tag} className="border border-line rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-ink/60">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-16 lg:mt-32">
                  <p className="text-sm lg:text-base leading-relaxed text-ink/75 max-w-[40ch]">
                    BIT Mesra graduate bringing hard engineering rigor into visual spaces.
                    Former Operations Engineer at Jindal Steel turned the central in-house designer 
                    and operational brains behind Kraft Studios’ unified ecosystem.
                  </p>
                </div>
              </div>

              {/* Block 2: The Square (Tetris O/T piece vibe) */}
              <div className="bg-paper p-8 lg:p-12 md:col-span-2 lg:col-span-7 lg:row-span-1 flex flex-col justify-between group hover:bg-surface transition-colors duration-500">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                   <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40 mb-6">
                        Engineering / Architecture
                      </div>
                      <h3 className="font-display text-3xl font-bold tracking-tight text-ink/40 group-hover:text-ink transition-colors">
                        T. Placeholder
                      </h3>
                   </div>
                   <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <span className="block w-3 h-3 bg-reg/40 rounded-sm" />
                      <span className="block w-3 h-3 bg-reg/40 rounded-sm" />
                      <span className="block w-3 h-3 bg-reg/40 rounded-sm" />
                   </div>
                </div>
                <div className="mt-12 lg:mt-16">
                  <p className="text-sm leading-relaxed text-ink/50 max-w-[45ch] italic">
                    Recruiting strictly for discipline and architectural thinking. 
                    Responsibilities include maintaining stateful logic across Next.js and React trees,
                    ensuring no pipeline leaks inside the notification infrastructure.
                  </p>
                </div>
              </div>

              {/* Block 3: The Short Bar */}
              <div className="bg-paper p-8 lg:p-12 md:col-span-2 lg:col-span-4 lg:row-span-1 flex flex-col justify-between group hover:bg-surface transition-colors duration-500">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40 mb-6">
                    Backend / Data
                  </div>
                  <h3 className="font-display text-3xl font-bold tracking-tight text-ink/40 group-hover:text-ink transition-colors">
                    D. Placeholder
                  </h3>
                </div>
                <div className="mt-12 lg:mt-16">
                  <p className="text-sm leading-relaxed text-ink/50 italic">
                    Scaling MongoDB clusters and Express deployment logic to handle high-throughput edge transactions for Brush.
                  </p>
                </div>
              </div>

              {/* Block 4: The T-Block Extender */}
              <div className="bg-paper p-8 lg:p-12 md:col-span-4 lg:col-span-3 lg:row-span-1 flex flex-col justify-between group hover:bg-surface transition-colors duration-500">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40 mb-6">
                    Design / Editorial
                  </div>
                  <h3 className="font-display text-3xl font-bold tracking-tight text-ink/40 group-hover:text-ink transition-colors">
                    S. Placeholder
                  </h3>
                </div>
                <div className="mt-12 lg:mt-16">
                  <p className="text-sm leading-relaxed text-ink/50 italic">
                    Typography alignment, visual pacing, and maintaining the structural integrity of the studio's editorial voice.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>`;

// Insert teamSectionJSX before the "The ecosystem" section
code = code.replace(
  '<section className="bg-ink text-paper py-24 lg:py-40 selection:bg-reg selection:text-paper relative overflow-hidden">',
  !code.includes("The team behind it all")
    ? teamSectionJSX +
        '\n\n        <section className="bg-ink text-paper py-24 lg:py-40 selection:bg-reg selection:text-paper relative overflow-hidden">'
    : '<section className="bg-ink text-paper py-24 lg:py-40 selection:bg-reg selection:text-paper relative overflow-hidden">',
);

fs.writeFileSync("src/routes/about.tsx", code);
