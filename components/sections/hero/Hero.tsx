"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { premiumEase } from "@/lib/motion";
import { HeroBackground } from "./HeroBackground";
import { ScrollIndicator } from "./ScrollIndicator";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end bg-navy">
      <HeroBackground />

      {/* pt-28 guarantees clearance under the fixed nav even when the
          content block is taller than the viewport on short/wide screens —
          min-h-[100svh] (not h-[100svh]) then lets the section grow instead
          of clipping the heading. */}
      <div className="container-oasis relative z-10 w-full pt-28 pb-16 md:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: premiumEase, delay: 0.2 }}
          className="mb-6 font-heading text-xs font-medium uppercase tracking-[0.35em] text-accent-orange"
        >
          Possibilities Unlimited
        </motion.p>

        <h1 className="max-w-4xl text-balance font-heading text-4xl font-medium leading-[1.08] text-white sm:text-5xl md:text-6xl lg:text-7xl">
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
            className="block text-white/60"
          >
            Engineering Vertical Mobility.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: premiumEase, delay: 0.7 }}
          className="mt-6 max-w-lg text-balance text-base text-white/70 md:text-lg"
        >
          Premium elevators engineered for residential, commercial, healthcare, hospitality and
          industrial projects.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: premiumEase, delay: 0.85 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <Button size="xl" asChild>
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
