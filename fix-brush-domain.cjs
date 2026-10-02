const fs = require("fs");

let code = fs.readFileSync("src/routes/services.tsx", "utf8");

// Update the Brush domain and href
code = code.replace('domain: "brush.in",', 'domain: "brush-art.in",');

code = code.replace('href: "https://brush.in",', 'href: "https://brush-art.in",');

fs.writeFileSync("src/routes/services.tsx", code);
