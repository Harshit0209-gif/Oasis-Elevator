"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { navLinks } from "@/data/nav";
import { Logo } from "@/components/shared/Logo";
import { AnimatedUnderlineLink } from "@/components/shared/AnimatedUnderlineLink";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled
          ? "border-b border-hairline bg-bg-primary/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-oasis flex h-20 items-center justify-between">
        <Logo priority />

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <AnimatedUnderlineLink
              key={link.href}
              href={link.href}
              className="font-heading text-[0.8rem] font-medium uppercase tracking-[0.12em] text-bg-light/85 hover:text-bg-light"
            >
              {link.label}
            </AnimatedUnderlineLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button variant="gold" size="xl" asChild>
            <a href="/contact">Request Quote</a>
          </Button>
        </div>

        <MobileMenu />
      </div>
    </motion.header>
  );
}
