const fs = require("fs");
let code = fs.readFileSync("src/components/KraftSite.tsx", "utf8");

code = code.replace(
  '{ label: "Services", to: "/services" as const }',
  '{ label: "Our Brands", to: "/services" as const }',
);

fs.writeFileSync("src/components/KraftSite.tsx", code);
