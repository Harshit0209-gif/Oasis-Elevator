"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=85&w=2400&auto=format&fit=crop";

export function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const [imageFailed, setImageFailed] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-navy">
      {/* Designed fallback — always present underneath, so a slow/blocked
          third-party image load (ad-blockers, offline, CDN hiccups) never
          leaves a flat void. The photo, when it loads, sits on top of this. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,rgba(31,170,226,0.18),transparent_60%),linear-gradient(180deg,#16295e_0%,#11215c_55%,#0c1a4a_100%)]" />

      {!imageFailed && (
        <motion.div style={{ y, opacity }} className="absolute inset-0">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.12 }}
            transition={{ duration: 22, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_IMAGE}
              alt="Low-angle view of premium glass skyscrapers reaching into the sky"
              fill
              priority
              sizes="100vw"
              className="object-cover"
              onError={() => setImageFailed(true)}
            />
          </motion.div>
        </motion.div>
      )}

      {/* Contrast + mood layers */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-navy/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-transparent to-navy/40" />

      {/* Slow-drifting light streak */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0.15, x: "-10%" }}
        animate={{ opacity: [0.1, 0.22, 0.1], x: ["-10%", "6%", "-10%"] }}
        transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
        className="absolute -top-1/4 left-1/3 h-[140%] w-[40%] rotate-12 bg-gradient-to-b from-accent-blue/25 via-brand-blue/10 to-transparent blur-3xl"
      />
    </div>
  );
}
