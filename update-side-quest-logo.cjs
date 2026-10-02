const fs = require("fs");

let code = fs.readFileSync("src/routes/services.tsx", "utf8");

code = code.replace(
  /logo: null,[\s]*copy: "A highly curated/,
  `logo: null,
    wordmarkClass: "font-quest text-[4.5rem] md:text-[6rem] lg:text-[7rem] leading-none mb-12",
    copy: "A highly curated`,
);

code = code.replace(
  /h2 className="font-display italic text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight"/g,
  `h2 className={brand.wordmarkClass || "font-display italic text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight"}`,
);

fs.writeFileSync("src/routes/services.tsx", code);
