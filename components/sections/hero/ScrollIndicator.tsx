"use client";

import { motion } from "framer-motion";

export function ScrollIndicator() {
  return (
    <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
      <span className="font-heading text-[0.65rem] font-medium uppercase tracking-[0.3em] text-bg-light/60">
        Scroll
      </span>
      <div className="h-10 w-px overflow-hidden bg-bg-light/20">
        <motion.div
          className="h-4 w-px bg-gold"
          animate={{ y: [-16, 40] }}
          transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
        />
      </div>
    </div>
  );
}
