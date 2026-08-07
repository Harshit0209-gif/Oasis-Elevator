import { useRef, type TouchEvent } from "react";
import type { WhyOasisFeature } from "@/data/types";
import { getActiveLenis } from "@/lib/lenis";
import { cn } from "@/lib/utils";
import { WhyOasisStoryCard } from "./WhyOasisStoryCard";

interface WhyOasisMobileScrollerProps {
  features: WhyOasisFeature[];
  className?: string;
}

// A firm/fast flick reads as "get me out of here" rather than "next card" —
// below this speed, swipes behave as normal per-card snapping.
const FLING_VELOCITY_PX_PER_MS = 0.6;

// A native scroll-snap deck — one full-viewport story card per brand value.
// This is its own short scroll container (not the page scroll itself), so it
// behaves like a stack of app onboarding screens: swipe/scroll snaps cleanly
// from one to the next, then hands scrolling back to the page once exhausted.
// A fast swipe, though, skips the whole deck in that direction instead of
// forcing the user to step through every remaining card first.
export function WhyOasisMobileScroller({ features, className }: WhyOasisMobileScrollerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ y: number; time: number } | null>(null);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStart.current = { y: event.touches[0].clientY, time: performance.now() };
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;

    const deltaY = start.y - event.changedTouches[0].clientY; // positive = swiped up (forward)
    const deltaTime = performance.now() - start.time;
    const velocity = Math.abs(deltaY) / Math.max(deltaTime, 1);
    if (velocity < FLING_VELOCITY_PX_PER_MS) return;

    const section = rootRef.current?.closest("section");
    const target = (deltaY > 0 ? section?.nextElementSibling : section?.previousElementSibling) as
      | HTMLElement
      | null;
    if (!target) return;

    // Kill native momentum scrolling on the deck for one frame so it doesn't
    // fight the hand-off animation to the next/previous section.
    const root = rootRef.current;
    if (root) {
      root.style.overflowY = "hidden";
      requestAnimationFrame(() => {
        root.style.overflowY = "";
      });
    }

    const lenis = getActiveLenis();
    if (lenis) {
      lenis.scrollTo(target, { offset: 0, duration: 1 });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      ref={rootRef}
      data-lenis-prevent
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={cn(
        "h-[100svh] snap-y snap-mandatory overflow-y-auto overscroll-y-contain",
        className,
      )}
    >
      {features.map((feature, index) => (
        <WhyOasisStoryCard
          key={feature.id}
          feature={feature}
          index={index}
          total={features.length}
        />
      ))}
    </div>
  );
}
