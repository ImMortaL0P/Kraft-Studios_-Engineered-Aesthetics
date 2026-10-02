const fs = require("fs");
let code = fs.readFileSync("src/routes/services.tsx", "utf8");

// Add the stat
code = code.replace(
  '{ figure: "1", label: "Pricing engine, two runtimes" },',
  '{ figure: "300+", label: "Curated designs and still adding" },\n      { figure: "1", label: "Pricing engine, two runtimes" },',
);

// Add logoClass to Brush
code = code.replace(
  "logo: brushLogo,",
  'logo: brushLogo,\n    logoClass: "max-w-full h-auto md:h-48 lg:h-64 object-contain object-left block",',
);

// Update img tag rendering to use brand.logoClass
code = code.replace(
  'className="h-16 md:h-20 lg:h-24 w-auto object-contain object-left block"',
  'className={brand.logoClass || "h-16 md:h-20 lg:h-24 w-auto object-contain object-left block"}',
);

fs.writeFileSync("src/routes/services.tsx", code);
