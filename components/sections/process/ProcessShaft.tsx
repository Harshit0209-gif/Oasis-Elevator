"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { processSteps } from "@/data/process-steps";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { scaleIn } from "@/lib/motion";
import { ensureGsapRegistered, gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";
import { FloorMarker } from "./FloorMarker";
import { ShaftTrack } from "./ShaftTrack";
import { MobileProcessTrack } from "./MobileProcessTrack";

const steps = [...processSteps].sort((a, b) => a.order - b.order);
const total = steps.length;

export function ProcessShaft() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const floorRef = useRef<HTMLSpanElement>(null);
  const markerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const tickRefs = useRef<Array<HTMLDivElement | null>>([]);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      // Scroll-jacked pin/scrub is a motion-heavy effect — skip it entirely
      // when the user prefers reduced motion, falling back to the same
      // static stacked list mobile gets.
      if (reducedMotion) return;

      ensureGsapRegistered();
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const car = carRef.current;
        const pinWrap = pinWrapRef.current;
        if (!car || !pinWrap) return;

        const trigger = ScrollTrigger.create({
          trigger: pinWrap,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          onUpdate: (self) => {
            const progress = self.progress;
            car.style.top = `${100 - progress * 100}%`;
            if (fillRef.current) fillRef.current.style.height = `${progress * 100}%`;

            const activeIndex = Math.min(total - 1, Math.round(progress * (total - 1)));
            if (floorRef.current) {
              floorRef.current.textContent = String(activeIndex + 1).padStart(2, "0");
            }
            markerRefs.current.forEach((marker, i) => {
              if (!marker) return;
              marker.dataset.active = String(i === activeIndex);
            });
            tickRefs.current.forEach((tick, i) => {
              if (!tick) return;
              tick.dataset.passed = String(i <= activeIndex);
            });
          },
        });

        return () => trigger.kill();
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [reducedMotion] },
  );

  return (
    <section ref={rootRef} className="relative bg-bg-primary">
      {/* Near-invisible architectural blueprint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0C6584 1px, transparent 1px), linear-gradient(to bottom, #0C6584 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="container-oasis relative pt-28 md:pt-36">
        <SectionHeading
          eyebrow="Our Process"
          title="Seven floors to every project."
          description="Scroll to follow a project's journey from first consultation to lifetime maintenance."
          align="center"
        />
      </div>

      {/* Desktop — pinned, scroll-scrubbed shaft (skipped under reduced motion).
          The entrance animation lives on a descendant of `.sticky`, never an
          ancestor — a `transform` on any ancestor of a sticky element breaks
          its positioning relative to the viewport. */}
      <div
        ref={pinWrapRef}
        className={cn("relative hidden md:block", reducedMotion && "md:hidden")}
        style={{ height: `${total * 90}vh` }}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <RevealOnScroll
            variants={scaleIn}
            className="container-oasis relative h-[68vh] w-full"
          >
            <ShaftTrack
              steps={steps}
              carRef={carRef}
              fillRef={fillRef}
              floorRef={floorRef}
              tickRefs={tickRefs}
            />
            {steps.map((step, index) => (
              <FloorMarker
                key={step.id}
                ref={(el) => {
                  markerRefs.current[index] = el;
                }}
                step={step}
                side={index % 2 === 0 ? "left" : "right"}
                topPercent={100 - (index / (total - 1)) * 100}
              />
            ))}
          </RevealOnScroll>
        </div>
      </div>

      {/* Mobile — and desktop-under-reduced-motion — one floor at a time */}
      <MobileProcessTrack
        steps={steps}
        className={cn("relative md:hidden", reducedMotion && "md:block")}
      />
    </section>
  );
}
