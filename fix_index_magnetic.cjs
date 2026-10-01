const fs = require('fs');
let content = fs.readFileSync('src/routes/index.tsx', 'utf8');

// Import Magnetic
if(!content.includes('Magnetic')) {
  // It pulls from KraftSite
  content = content.replace(/import \{([\s\S]*?)MacWindow,([\s\S]*?)\} from "\.\.\/components\/KraftSite";/, 'import {$1MacWindow,$2 Magnetic,} from "../components/KraftSite";');
}

content = content.replace(
  /<Link to="\/work" className="pill">\s*See the work\s*<\/Link>/s,
  `<Magnetic><Link to="/work" className="pill">See the work</Link></Magnetic>`
);
content = content.replace(
  /<Link to="\/contact" className="pill inline-flex">\s*Work with us.*?\s*<\/Link>/s,
  `<Link to="/contact" className="pill inline-flex">Work with us</Link>` // just clean it up if needed, or wrap Magnetic. Since it's block, I'll wrap it. Let's do it via regex just on className="pill"
);

fs.writeFileSync('src/routes/index.tsx', content.replace(/<Link ([^>]*?className="pill"[^>]*?)>([\s\S]*?)<\/Link>/g, `<Magnetic><Link $1>$2</Link></Magnetic>`));
