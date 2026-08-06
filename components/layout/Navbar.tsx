"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { navLinks } from "@/data/nav";
import { Logo } from "@/components/shared/Logo";
import { AnimatedUnderlineLink } from "@/components/shared/AnimatedUnderlineLink";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  // Only the homepage opens on a dark, full-bleed photo hero — everywhere
  // else (PageHero) starts on a light background, so the nav needs its
  // "scrolled" light styling from the very first frame, not just after
  // scrolling.
  const isHome = pathname === "/";
  const overDark = isHome && !scrolled;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        overDark
          ? "border-b border-transparent bg-transparent"
          : "border-b border-hairline bg-white/90 backdrop-blur-md",
      )}
    >
      <div className="container-oasis flex h-20 items-center justify-between">
        {/* Over the dark hero photo the mark needs its white backing; on
            every light-background page (including scrolled-homepage) it can
            sit directly on it. */}
        <Logo priority variant={overDark ? "chip" : "plain"} />

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <AnimatedUnderlineLink
              key={link.href}
              href={link.href}
              className={cn(
                "font-heading text-[0.8rem] font-medium uppercase tracking-[0.12em] transition-colors",
                overDark
                  ? "text-white/90 hover:text-white"
                  : "text-navy/80 hover:text-brand-blue",
              )}
            >
              {link.label}
            </AnimatedUnderlineLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button size="xl" asChild>
            <a href="/contact">Request Quote</a>
          </Button>
        </div>

        <MobileMenu scrolled={!overDark} />
      </div>
    </motion.header>
  );
}
