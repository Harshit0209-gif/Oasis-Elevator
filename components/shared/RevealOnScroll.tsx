"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface RevealOnScrollProps {
  children: ReactNode;
  variants?: Variants;
  delay?: number;
  className?: string;
  as?: "div" | "span";
  id?: string;
}

export function RevealOnScroll({
  children,
  variants = fadeUp,
  delay = 0,
  className,
  as = "div",
  id,
}: RevealOnScrollProps) {
  const MotionTag = as === "span" ? motion.span : motion.div;

  const delayedVariants: Variants = delay
    ? {
        hidden: variants.hidden,
        visible: {
          ...variants.visible,
          transition: {
            // @ts-expect-error -- visible is always a TargetAndTransition here
            ...variants.visible?.transition,
            delay,
          },
        },
      }
    : variants;

  return (
    <MotionTag
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={delayedVariants}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  );
}
