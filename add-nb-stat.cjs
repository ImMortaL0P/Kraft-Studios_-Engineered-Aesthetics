const fs = require("fs");

let code = fs.readFileSync("src/routes/services.tsx", "utf8");

// Locate the Notice Board chunk
code = code.replace(
  '{ figure: "100%", label: "Human-approved" },',
  '{ figure: "400+", label: "Active sources made ready to scrape" },\n      { figure: "100%", label: "Human-approved" },',
);

fs.writeFileSync("src/routes/services.tsx", code);
