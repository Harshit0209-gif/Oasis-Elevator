import { useEffect, useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

interface AutoScrollMarqueeProps {
  /** Pre-duplicated (2x) track items — duplication is the caller's job so it
   * can key them uniquely; this component only owns the scroll mechanics. */
  children: ReactNode;
  gapClassName?: string;
  /** px/sec of the auto-scroll drift. */
  speed?: number;
  /** Edge fade gradient color — should match the section's own background. */
  fadeFromClassName?: string;
  className?: string;
}

// A marquee that drifts on its own but is also a real, natively scrollable
// element — drag it, swipe it, wheel it, and it just responds like any other
// horizontal scroller. Auto-drift pauses the moment the user touches it and
// picks back up a beat after they let go, so manual control always wins.
export function AutoScrollMarquee({
  children,
  gapClassName = "gap-6",
  speed = 45,
  fadeFromClassName = "from-bg-secondary",
  className,
}: AutoScrollMarqueeProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimeoutRef = useRef<number | undefined>(undefined);
  // Native overflow-x scrolling already handles touch swipe and
  // wheel/trackpad input for free — but a mouse can't pan a scroll
  // container by click-dragging on it without help, so we track that
  // ourselves and only for mouse pointers (touch keeps using native panning).
  const dragRef = useRef<{ startX: number; startScrollLeft: number } | null>(null);
  const reducedMotion = useReducedMotion();
  // Touch devices synthesize a "mouseenter" on tap with no matching
  // "mouseleave" — wiring pause-on-hover unconditionally would let the very
  // first tap pause the drift forever with nothing to ever resume it. Only
  // real pointer devices get the hover-to-pause nicety; touch already gets
  // pause-while-touching from the pointer handlers below.
  const canHover = useMediaQuery("(hover: hover)");

  useEffect(() => {
    // Reduced motion: skip the imposed auto-drift entirely, but the element
    // is still a normal scroll container — manual scrolling keeps working,
    // which is strictly more usable than a fully frozen strip.
    if (reducedMotion) return;

    const scroller = scrollerRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return;

    let rafId: number;
    let last = performance.now();

    function step(now: number) {
      const dt = (now - last) / 1000;
      last = now;
      if (!pausedRef.current && scroller) {
        scroller.scrollLeft += speed * dt;
        const halfWidth = track!.scrollWidth / 2;
        if (scroller.scrollLeft >= halfWidth) {
          scroller.scrollLeft -= halfWidth;
        }
      }
      rafId = requestAnimationFrame(step);
    }
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [reducedMotion, speed]);

  const pause = () => {
    pausedRef.current = true;
    window.clearTimeout(resumeTimeoutRef.current);
  };
  const scheduleResume = () => {
    window.clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = window.setTimeout(() => {
      pausedRef.current = false;
    }, 1500);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    pause();
    if (event.pointerType === "mouse") {
      dragRef.current = { startX: event.clientX, startScrollLeft: scrollerRef.current?.scrollLeft ?? 0 };
      scrollerRef.current?.setPointerCapture(event.pointerId);
    }
  };
  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || !scrollerRef.current) return;
    scrollerRef.current.scrollLeft = drag.startScrollLeft - (event.clientX - drag.startX);
  };
  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragRef.current = null;
    scheduleResume();
    if (scrollerRef.current?.hasPointerCapture(event.pointerId)) {
      scrollerRef.current.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div className={cn("relative", className)}>
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

      <div
        ref={scrollerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onMouseEnter={canHover ? pause : undefined}
        onMouseLeave={canHover ? scheduleResume : undefined}
        onWheel={() => {
          pause();
          scheduleResume();
        }}
        className="flex cursor-grab overflow-x-auto overscroll-x-contain active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div ref={trackRef} className={cn("flex w-max", gapClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
}
