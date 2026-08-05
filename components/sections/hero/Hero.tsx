"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { premiumEase } from "@/lib/motion";
import { HeroBackground } from "./HeroBackground";
import { ScrollIndicator } from "./ScrollIndicator";

export function Hero() {
  return (
    <section className="relative flex h-[100svh] min-h-[640px] items-end overflow-hidden bg-bg-primary">
      <HeroBackground />

      <div className="container-oasis relative z-10 pb-28 md:pb-32">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: premiumEase, delay: 0.2 }}
          className="mb-6 font-heading text-xs font-medium uppercase tracking-[0.35em] text-gold"
        >
          Possibilities Unlimited
        </motion.p>

        <h1 className="max-w-4xl text-balance font-heading text-5xl font-medium leading-[1.05] text-bg-light sm:text-6xl md:text-7xl lg:text-8xl">
          <motion.span
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: premiumEase, delay: 0.35 }}
            className="block"
          >
            Elevating Architecture.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: premiumEase, delay: 0.5 }}
            className="block text-bg-light/60"
          >
            Engineering Vertical Mobility.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: premiumEase, delay: 0.7 }}
          className="mt-8 max-w-lg text-balance text-base text-bg-light/70 md:text-lg"
        >
          Premium elevators engineered for residential, commercial, healthcare, hospitality and
          industrial projects.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: premiumEase, delay: 0.85 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button variant="gold" size="xl" asChild>
            <a href="/solutions">Explore Solutions</a>
          </Button>
          <Button variant="outline-light" size="xl" asChild>
            <a href="/contact">Get Consultation</a>
          </Button>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
