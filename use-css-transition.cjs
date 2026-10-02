const fs = require("fs");
let code = fs.readFileSync("src/routes/__root.tsx", "utf8");

const oldStr = `        <AnimatePresence mode="wait">
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(2px)", scale: 0.99 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="transform-gpu will-change-transform min-h-screen"
            onAnimationComplete={() => {
              window.dispatchEvent(new Event("scroll"));
              window.dispatchEvent(new Event("resize"));
            }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>`;

const newStr = `        <div key={key} className="page-enter transform-gpu will-change-transform min-h-screen">
          <Outlet />
        </div>`;

code = code.replace(oldStr, newStr);

fs.writeFileSync("src/routes/__root.tsx", code);
