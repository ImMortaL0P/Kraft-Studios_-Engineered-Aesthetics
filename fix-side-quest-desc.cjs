const fs = require("fs");

let code = fs.readFileSync("src/routes/services.tsx", "utf8");

// Replace the copy text
code = code.replace(
  'copy: "A highly curated design and lifestyle publication that explores aesthetics, engineered artifacts, and visual subcultures through meticulous editorial framing.",',
  'copy: "A highly curated design and lifestyle publication in a newspaper format filled with fun games, design inspirations, and visual subcultures explored through meticulous editorial framing.",',
);

fs.writeFileSync("src/routes/services.tsx", code);
