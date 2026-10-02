const fs = require("fs");

let code = fs.readFileSync("src/routes/services.tsx", "utf8");

// Replace the simple string title with JSX for "The Side" and "Quest"
code = code.replace(
  'title: "The Side Quest",',
  'title: "The Side Quest",\n    titleNode: <><span className="block">The Side</span><span className="block">Quest</span></>,',
);

// Update renderer to use titleNode if it exists
code = code.replace("{brand.title}", "{brand.titleNode || brand.title}");

fs.writeFileSync("src/routes/services.tsx", code);
