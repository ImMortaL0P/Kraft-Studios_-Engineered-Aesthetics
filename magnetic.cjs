const fs = require('fs');

let content = fs.readFileSync('src/components/KraftSite.tsx', 'utf8');

// Insert Magnetic component before exports
const magneticCode = `
export function Magnetic({ children, className = "" }: { children: React.ReactElement, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

`;

content = content.replace(/\n\nexport function PageFrame\(\{/, magneticCode + 'export function PageFrame({');

// Add magnetic to the menu button
content = content.replace(
  /<button\s+type="button"\s+onClick=\{\(\) => setOpen\(\(v\) => !v\)\}/s,
  `<Magnetic><button
              type="button"
              onClick={() => setOpen((v) => !v)}`
);
content = content.replace(
  /<\/span>\n\s*<\/button>/,
  `</span>\n            </button></Magnetic>`
);

// Add magnetic to the back to top button
content = content.replace(
  /<button\s+type="button"\s+onClick=\{\(\) => window\.scrollTo/,
  `<Magnetic><button
            type="button"
            onClick={() => window.scrollTo`
);
content = content.replace(
  /<\/span>\n\s*<\/button>/,
  `</span>\n          </button></Magnetic>`
);


fs.writeFileSync('src/components/KraftSite.tsx', content);
