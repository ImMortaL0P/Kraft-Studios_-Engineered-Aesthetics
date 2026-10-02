const fs = require("fs");
let code = fs.readFileSync("src/routes/services.tsx", "utf8");

// 1. Fix the Brush logo size
code = code.replace(
  'logoClass: "max-w-full h-auto md:h-48 lg:h-64 object-contain object-left block",',
  'logoClass: "h-20 md:h-28 lg:h-32 w-auto object-contain object-left block",',
);

// 2. Reduce the huge whitespace between logo row and the copy grid
// Reduce mb-16 lg:mb-24 -> mb-8 lg:mb-12
code = code.replace(
  'div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 lg:mb-24"',
  'div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-8 lg:mb-12"',
);

// Reduce mt-12 lg:mt-24 -> mt-8 lg:mt-12
code = code.replace(
  'div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mt-12 lg:mt-24"',
  'div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mt-8 lg:mt-12"',
);

fs.writeFileSync("src/routes/services.tsx", code);
