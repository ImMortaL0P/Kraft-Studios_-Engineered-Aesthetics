const fs = require('fs');
let code = fs.readFileSync('src/routes/services.tsx', 'utf8');

// Replace PageIntro
code = code.replace(
  `        <PageIntro
          number="02"
          label="Services"
          title="One source of truth"
          copy="Separate teams create seams. We bring the designers, engineers and operational thinkers to one table so the idea survives every handoff."
        />`,
  `        <PageIntro
          number="02"
          label="Our Brands"
          title="In-house ecosystems"
          copy="Beyond client work, we independently build, scale, and operate our own proprietary brands spanning verified information systems, curated aesthetics, and print infrastructure."
        />`
);

// Replace capabilities array
const capabilities = `const capabilities = [
  {
    n: "01",
    title: "The Notice Board",
    copy: "A verified government exam and recruitment notification pipeline holding strict provenance rules, preventing students from falling prey to unverified or aggregated misinformation.",
    items: [
      "AI Verification Agents",
      "Provenance tracking",
      "Next.js App Router"
    ],
    href: "/work/notice-board"
  },
  {
    n: "02",
    title: "The Side Quest",
    copy: "A highly curated design and lifestyle publication that explores aesthetics, engineered artifacts, and visual subcultures through editorial framing.",
    items: ["Narnia Typeface", "Editorial Framing", "Visual Curation"],
    href: "https://thesidequest.in"
  },
  {
    n: "03",
    title: "Brush",
    copy: "A print and framing infrastructure platform running a unified ecommerce configuration engine allowing artists to scale their fulfilment effortlessly.",
    items: [
      "Custom fulfilment mapping",
      "Redundant payment gateways",
      "Automated PDF Invoices"
    ],
    href: "/work/brush"
  },
];`;

code = code.replace(/const capabilities = \[\s*\{[\s\S]*?\];/m, capabilities);

// Add external link to the capabilities mapping
const targetLinkStr = `                    <span className="font-display text-reg text-xl">{cap.n} —</span>
                    <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
                      {cap.title}
                    </h2>`;
const replaceLinkStr = `                    <span className="font-display text-reg text-xl">{cap.n} —</span>
                    <a href={cap.href} target={cap.href.startsWith("http") ? "_blank" : "_self"} className="mt-4 block hover:text-reg transition-colors">
                      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight flex items-center gap-3">
                        {cap.title}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-50"><path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </h2>
                    </a>`;

code = code.replace(targetLinkStr, replaceLinkStr);

code = code.replace(
  'title="Services — Kraft Studios"',
  'title="Our Brands — Kraft Studios"'
);

fs.writeFileSync('src/routes/services.tsx', code);
