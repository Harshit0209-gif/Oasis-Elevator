"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=85&w=2400&auto=format&fit=crop";

export function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-bg-primary">
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
          />
        </motion.div>
      </motion.div>

      {/* Contrast + mood layers */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/50 to-bg-primary/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/70 via-transparent to-bg-primary/40" />

      {/* Slow-drifting gold light streak */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0.15, x: "-10%" }}
        animate={{ opacity: [0.1, 0.22, 0.1], x: ["-10%", "6%", "-10%"] }}
        transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
        className="absolute -top-1/4 left-1/3 h-[140%] w-[40%] rotate-12 bg-gradient-to-b from-gold/25 via-champagne/10 to-transparent blur-3xl"
      />
    </div>
  );
}
