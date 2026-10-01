const fs = require('fs');

let content = fs.readFileSync('src/components/KraftSite.tsx', 'utf8');
content = content.replace(
  /Back to top[\s\S]*?<ArrowUp size=\{12\} \/>\n\s*<\/span>\n\s*<\/button>\n\s*<\/div>/,
  `Back to top
            <span className="grid size-7 place-items-center rounded-full border border-line transition-colors group-hover:border-reg group-hover:bg-reg group-hover:text-white">
              <ArrowUp size={12} />
            </span>
          </button></Magnetic>
        </div>`
);
fs.writeFileSync('src/components/KraftSite.tsx', content);
