import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Plus, ScanLine, GripHorizontal } from "lucide-react";

export function CustomCursor() {
  const [flavor, setFlavor] = useState<"default" | "link" | "text" | "view" | "visit" | "drag" | "expand" | "explore">("default");
  
  // Start off-screen
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springX = useSpring(cursorX, { damping: 30, stiffness: 400, mass: 0.1 });
  const springY = useSpring(cursorY, { damping: 30, stiffness: 400, mass: 0.1 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const customCursor = target.closest("[data-cursor]");
      const isView = target.closest(".case-row, .case-image");
      const isLink = target.closest("a, button, [role='button'], .pill, .contact-direct, .nav-link, .display-item");
      const isInput = target.closest("input, textarea");
      
      if (customCursor) {
        const type = customCursor.getAttribute("data-cursor") as any;
        setFlavor(type || "view");
      } else if (isInput) {
        setFlavor("text");
      } else if (isView && !isLink) {
        setFlavor("view");
      } else if (isLink) {
        // If it's an external link, show 'visit'
        const isExternal = target.closest("a[target='_blank'], a[href^='http']");
        if (isExternal) {
            setFlavor("visit");
        } else {
            setFlavor("link");
        }
      } else {
        const sel = window.getSelection();
        if (sel && sel.toString().length > 0) {
          setFlavor("text");
        } else if (target.tagName.toLowerCase() === 'p' || target.tagName.toLowerCase() === 'h1' || target.tagName.toLowerCase() === 'h2' || target.tagName.toLowerCase() === 'h3') {
          setFlavor("text");
        } else {
          setFlavor("default");
        }
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const variants = {
    default: { height: 16, width: 16, opacity: 1, backgroundColor: "#fff", mixBlendMode: "difference" as any },
    link: { height: 60, width: 60, opacity: 1, backgroundColor: "#fff", mixBlendMode: "difference" as any },
    text: { height: 32, width: 3, opacity: 1, borderRadius: "2px", backgroundColor: "#fff", mixBlendMode: "difference" as any },
    view: { height: 80, width: 80, opacity: 1, backgroundColor: "var(--ink)", mixBlendMode: "normal" as any, border: "0px solid transparent" },
    visit: { height: 80, width: 80, opacity: 1, backgroundColor: "var(--ink)", mixBlendMode: "normal" as any, border: "0px solid transparent" },
    drag: { height: 60, width: 60, opacity: 1, backgroundColor: "var(--surface)", mixBlendMode: "normal" as any, border: "1px solid var(--line)" },
    expand: { height: 70, width: 70, opacity: 1, backgroundColor: "var(--ink)", mixBlendMode: "normal" as any, border: "0px solid transparent" },
    explore: { height: 90, width: 90, opacity: 1, backgroundColor: "rgba(255, 255, 255, 0.1)", mixBlendMode: "normal" as any, border: "1px solid var(--ink)", backdropFilter: "blur(4px)" },
  };

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          body, a, button, input, textarea, select, .cursor-pointer {
            cursor: none !important;
          }
        }
      `}</style>
      
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99999] hidden flex-col items-center justify-center transform-gpu will-change-transform md:flex"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          borderRadius: 9999
        }}
        animate={flavor}
        variants={variants}
        initial="default"
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <AnimatePresence mode="wait">
          {flavor === "view" && (
            <motion.span
              key="view-text"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="font-mono text-[11px] font-bold tracking-[0.2em] text-[var(--paper)] ml-[0.2em]"
            >
              VIEW
            </motion.span>
          )}
          {flavor === "visit" && (
            <motion.div
              key="visit-icon"
              initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
              transition={{ duration: 0.2 }}
              className="text-[var(--paper)]"
            >
              <ArrowUpRight className="w-7 h-7" />
            </motion.div>
          )}
          {flavor === "expand" && (
            <motion.div
              key="expand-icon"
              initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
              transition={{ duration: 0.2 }}
              className="text-[var(--paper)]"
            >
              <Plus className="w-6 h-6" />
            </motion.div>
          )}
          {flavor === "explore" && (
             <motion.div
             key="explore-icon"
             initial={{ opacity: 0, scale: 0.5 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.5 }}
             transition={{ duration: 0.2 }}
             className="text-[var(--ink)]"
           >
             <ScanLine className="w-6 h-6" />
           </motion.div>
          )}
          {flavor === "drag" && (
             <motion.div
             key="drag-icon"
             initial={{ opacity: 0, scale: 0.5 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.5 }}
             transition={{ duration: 0.2 }}
             className="text-[var(--ink)]"
           >
             <GripHorizontal className="w-6 h-6" />
           </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
