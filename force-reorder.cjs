const fs = require("fs");

let code = fs.readFileSync("src/routes/services.tsx", "utf8");

const regex = /const brands = \[[\s\S]*?\];/m;

const replacement = `const brands = [
  {
    n: "01",
    title: "Brush",
    domain: "brush.in",
    logo: brushLogo,
    logoClass: "h-20 md:h-28 lg:h-32 w-auto object-contain object-left block",
    copy: "A print and framing infrastructure platform running a unified ecommerce configuration engine allowing artists to scale their fulfilment effortlessly.",
    items: ["Custom Fulfilment", "Redundant Gateways", "Automated PDF Invoicing"],
    stats: [
      { figure: "300+", label: "Curated designs and still adding" },
      { figure: "1", label: "Pricing engine, two runtimes" },
      { figure: "16", label: "Cart shapes under parity test" },
      { figure: "3", label: "Redundant payment gateways" }
    ],
    href: "https://brush.in",
    bg: "bg-surface"
  },
  {
    n: "02",
    title: "The Notice Board",
    domain: "thenoticeboard.in",
    logo: noticeboardLogo,
    copy: "A verified government exam and recruitment notification pipeline holding strict provenance rules, preventing students from falling prey to unverified or aggregated misinformation.",
    items: ["AI Verification Agents", "Provenance Tracking", "Next.js App Router"],
    stats: [
      { figure: "100%", label: "Human-approved" },
      { figure: "11", label: "Schema models behind provenance" },
      { figure: "12h", label: "Discovery cadence" }
    ],
    href: "https://thenoticeboard.in",
    bg: "bg-paper"
  },
  {
    n: "03",
    title: "The Side Quest",
    titleNode: <><span className="block">The Side</span><span className="block">Quest</span></>,
    domain: "thesidequest.in",
    logo: null,
    wordmarkClass: "font-quest text-[4.5rem] md:text-[6rem] lg:text-[7rem] leading-none mb-12",
    copy: "A highly curated design and lifestyle publication in a newspaper format filled with fun games, design inspirations, and visual subcultures explored through meticulous editorial framing.",
    items: ["Narnia Typeface", "Editorial Framing", "Visual Curation"],
    stats: [
      { figure: "4+", label: "Design Subcultures" },
      { figure: "1.2k", label: "Curated Artifacts" },
      { figure: "100%", label: "In-house Publishing" }
    ],
    href: "https://thesidequest.in",
    bg: "bg-surface"
  }
];`;

code = code.replace(regex, replacement);

fs.writeFileSync("src/routes/services.tsx", code);
