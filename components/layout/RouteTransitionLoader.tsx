import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const VISIBLE_MS = 500;

// Brief full-screen gear flash on every internal navigation, distinct from
// LoadingScreen (which only ever plays once, on first load this session).
export function RouteTransitionLoader() {
  const { pathname } = useLocation();
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (reducedMotion) return;

    setVisible(true);
    const timeout = window.setTimeout(() => setVisible(false), VISIBLE_MS);
    return () => window.clearTimeout(timeout);
  }, [pathname, reducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-bg-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src="/oasis_elevators_gear_loader_vector.svg"
            alt="Loading"
            className="size-24"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
