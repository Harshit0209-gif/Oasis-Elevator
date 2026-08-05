"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { processSteps } from "@/data/process-steps";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { ensureGsapRegistered, gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";
import { FloorMarker } from "./FloorMarker";
import { ShaftTrack } from "./ShaftTrack";

const steps = [...processSteps].sort((a, b) => a.order - b.order);
const total = steps.length;

export function ProcessShaft() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<Array<HTMLDivElement | null>>([]);
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

            const activeIndex = Math.min(total - 1, Math.round(progress * (total - 1)));
            markerRefs.current.forEach((marker, i) => {
              if (!marker) return;
              marker.style.opacity = i === activeIndex ? "1" : "0.35";
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
      <div className="container-oasis pt-28 md:pt-36">
        <SectionHeading
          eyebrow="Our Process"
          title="Seven floors to every project."
          description="Scroll to follow a project's journey from first consultation to lifetime maintenance."
          align="center"
        />
      </div>

      {/* Desktop — pinned, scroll-scrubbed shaft (skipped under reduced motion) */}
      <div
        ref={pinWrapRef}
        className={cn("relative hidden md:block", reducedMotion && "md:hidden")}
        style={{ height: `${total * 90}vh` }}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="container-oasis relative h-[68vh] w-full">
            <ShaftTrack ref={carRef} />
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
          </div>
        </div>
      </div>

      {/* Mobile — and desktop-under-reduced-motion — simple stacked reveal */}
      <div
        className={cn(
          "container-oasis flex flex-col gap-10 py-20 md:hidden",
          reducedMotion && "md:flex",
        )}
      >
        {steps.map((step) => (
          <RevealOnScroll key={step.id} className="border-l-2 border-gold pl-5">
            <span className="font-heading text-xs uppercase tracking-[0.25em] text-gold">
              {String(step.order).padStart(2, "0")}
            </span>
            <h3 className="mt-1 font-heading text-xl font-medium text-bg-light">{step.title}</h3>
            <p className="mt-2 text-sm text-graphite">{step.description}</p>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
