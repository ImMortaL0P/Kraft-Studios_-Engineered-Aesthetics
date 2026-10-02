const fs = require("fs");

let code = fs.readFileSync("src/routes/services.tsx", "utf8");

// Locate the Side Quest chunk
code = code.replace(
  '{ figure: "1.2k", label: "Curated Artifacts" },',
  '{ figure: "12", label: "Pages of pure inspiration" },\n      { figure: "1.2k", label: "Curated Artifacts" },',
);

fs.writeFileSync("src/routes/services.tsx", code);
