"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const SESSION_KEY = "oasis-loaded";
const MAX_DURATION_MS = 2000;
const LINE_DURATION_MS = 1200;

function noopSubscribe() {
  return () => {};
}

function getAlreadySeenSnapshot() {
  return sessionStorage.getItem(SESSION_KEY) === "1";
}

function getServerSnapshot() {
  return false;
}

export function LoadingScreen() {
  const reducedMotion = useReducedMotion();
  // useSyncExternalStore (not useState+useEffect) so the server/first-client
  // render agree — sessionStorage can't be read during SSR, and reading it
  // via an effect would flash the loader before correcting itself.
  const alreadySeen = useSyncExternalStore(noopSubscribe, getAlreadySeenSnapshot, getServerSnapshot);
  const [visible, setVisible] = useState(true);
  const skip = alreadySeen || reducedMotion;

  useEffect(() => {
    if (skip) return;
    sessionStorage.setItem(SESSION_KEY, "1");

    const dismiss = window.setTimeout(() => setVisible(false), LINE_DURATION_MS + 300);
    const hardCap = window.setTimeout(() => setVisible(false), MAX_DURATION_MS);

    return () => {
      window.clearTimeout(dismiss);
      window.clearTimeout(hardCap);
    };
  }, [skip]);

  if (skip) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-bg-primary"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/logo/oasis-logo.png"
              alt="Oasis Elevators"
              width={821}
              height={250}
              priority
              className="h-10 w-auto"
            />
          </motion.div>
          <div className="h-px w-40 overflow-hidden bg-hairline">
            <motion.div
              className="h-full bg-brand-blue"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: LINE_DURATION_MS / 1000, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
