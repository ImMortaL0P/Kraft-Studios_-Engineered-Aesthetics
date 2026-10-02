const fs = require("fs");

let code = fs.readFileSync("src/routes/services.tsx", "utf8");

// Revert the wrong one
code = code.replace("alt={brand.titleNode || brand.title}", "alt={brand.title}");

// Fix the right one
code = code.replace(
  "                          {brand.title}\n                        </h2>",
  "                          {brand.titleNode || brand.title}\n                        </h2>",
);

fs.writeFileSync("src/routes/services.tsx", code);
