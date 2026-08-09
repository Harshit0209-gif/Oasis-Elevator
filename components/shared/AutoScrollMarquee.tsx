import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AutoScrollMarqueeProps {
  /** Pre-duplicated (2x) track items — duplication is the caller's job so it
   * can key them uniquely and so the CSS loop (translateX 0 → -50%) has a
   * seamless second copy to land on. */
  children: ReactNode;
  gapClassName?: string;
  /** Edge fade gradient color — should match the section's own background. */
  fadeFromClassName?: string;
  className?: string;
}

// A simple, non-interactive marquee — pure CSS animation, no scroll
// container, no drag/touch handling of any kind. It just slides on its own.
// `prefers-reduced-motion` is already handled globally (see index.css),
// which freezes this like every other animation on the site.
export function AutoScrollMarquee({
  children,
  gapClassName = "gap-6",
  fadeFromClassName = "from-bg-secondary",
  className,
}: AutoScrollMarqueeProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r to-transparent sm:w-24",
          fadeFromClassName,
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l to-transparent sm:w-24",
          fadeFromClassName,
        )}
      />

      <div className={cn("flex w-max animate-marquee", gapClassName)}>{children}</div>
    </div>
  );
}
