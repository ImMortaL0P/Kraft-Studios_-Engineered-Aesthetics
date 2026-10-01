const fs = require('fs');
let content = fs.readFileSync('src/routes/work.index.tsx', 'utf8');

// Ensure Magnetic is imported
content = content.replace(/Eyebrow, FadeUp, PageFrame, PageIntro \}/, 'Eyebrow, FadeUp, PageFrame, PageIntro, Magnetic }');

content = content.replace(
  /<Link to="\/contact" className="pill">\s*Start a project\s*<\/Link>/s,
  `<Magnetic><Link to="/contact" className="pill">Start a project</Link></Magnetic>`
);

fs.writeFileSync('src/routes/work.index.tsx', content);
