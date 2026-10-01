const fs = require('fs');

let content = fs.readFileSync('src/components/KraftSite.tsx', 'utf8');

// Fix the unbalanced </Magnetic></Magnetic>
content = content.replace(/<\/button><\/Magnetic><\/Magnetic>/g, '</button></Magnetic>');

// Remove any other </Magnetic> that isn't matched
// Let's ensure the Back to top button is wrapped correctly.
// Let's just find and replace the block for Back to Top.
fs.writeFileSync('src/components/KraftSite.tsx', content);
