import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { getProcessSteps } from "@/lib/content";
import { useContent } from "@/hooks/use-content";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionLoader } from "@/components/shared/SectionLoader";
import { ensureGsapRegistered, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { ShaftColumn } from "./ShaftColumn";
import { FloorContent } from "./FloorContent";

// Scroll distance per floor, as a percentage of one viewport height. 100
// would mean "scroll a full screen to advance one floor" — dropping to 65
// tightens the gap between floors by ~35% so the ride reads as continuous
// rather than a series of separate screens (each floor's own content still
// gets a full viewport-height "slot" to sit in — this only shortens the
// scroll distance, not the content layout).
const SCROLL_PER_FLOOR = 65;

// One elevator-shaft interaction, reused at every viewport width — the
// shaft sits sticky on the left, the content track slides past it on the
// right, both driven by the same scroll-progress value. No separate mobile
// concept: only the shaft column's share of the width changes.
//
// Floor count is entirely CMS-driven (via getProcessSteps) — every
// measurement below (`total`, scroll distance, translateY math, active-floor
// detection) is computed from `steps.length`, not a fixed number, so adding
// or removing a step in the admin needs zero changes here.
export function ProcessShaft() {
  const { data: processSteps, loading } = useContent(getProcessSteps);
  const steps = [...(processSteps ?? [])].sort((a, b) => a.order - b.order);
  const total = steps.length;

  const rootRef = useRef<HTMLDivElement>(null);
  const driverRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const floorRef = useRef<HTMLSpanElement>(null);
  const floorRefs = useRef<Array<HTMLDivElement | null>>([]);
  const tickRefs = useRef<Array<HTMLDivElement | null>>([]);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || total === 0) return;

      ensureGsapRegistered();
      const driver = driverRef.current;
      const car = carRef.current;
      const track = trackRef.current;
      if (!driver || !car || !track) return;

      const trigger = ScrollTrigger.create({
        trigger: driver,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          car.style.top = `${100 - progress * 100}%`;
          if (fillRef.current) fillRef.current.style.height = `${progress * 100}%`;
          // translateY's % resolves against the track's OWN height (which is
          // total*100% tall), not one floor's slice — so the shift has to be
          // scaled down by /total to land on floor boundaries correctly.
          track.style.transform = `translateY(-${(progress * (total - 1) * 100) / total}%)`;

          const activeIndex = Math.min(total - 1, Math.round(progress * (total - 1)));
          if (floorRef.current) {
            floorRef.current.textContent = String(activeIndex + 1).padStart(2, "0");
          }
          tickRefs.current.forEach((tick, i) => {
            if (!tick) return;
            tick.dataset.passed = String(i <= activeIndex);
          });
          floorRefs.current.forEach((floor, i) => {
            if (!floor) return;
            floor.dataset.state = i === activeIndex ? "active" : i < activeIndex ? "passed" : "upcoming";
          });
        },
      });

      return () => trigger.kill();
    },
    { scope: rootRef, dependencies: [reducedMotion, total] },
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

      <div className="container-oasis relative pt-24 md:pt-32">
        <SectionHeading
          eyebrow="Our Process"
          title="Every floor of the journey."
          description="Scroll to follow a project's journey from first consultation to lifetime maintenance."
          align="center"
        />
      </div>

      {loading ? (
        <SectionLoader />
      ) : total === 0 ? null : reducedMotion ? (
        <div className="container-oasis flex flex-col gap-10 py-16 md:flex-row md:gap-16">
          <div className="sticky top-20 flex h-[55svh] w-full max-w-[220px] self-start md:top-24 md:h-[60svh] md:w-[26%]">
            <ShaftColumn
              steps={steps}
              carRef={carRef}
              fillRef={fillRef}
              floorRef={floorRef}
              tickRefs={tickRefs}
              total={total}
            />
          </div>
          <div className="flex flex-1 flex-col gap-9">
            {steps.map((step) => (
              <FloorContent key={step.id} step={step} />
            ))}
          </div>
        </div>
      ) : (
        <div ref={driverRef} className="relative" style={{ height: `${total * SCROLL_PER_FLOOR}svh` }}>
          <div className="sticky top-0 flex h-[100svh]">
            <div className="container-oasis flex h-full w-full">
              <div className="h-full w-[30%] min-w-[84px] max-w-[220px] shrink-0 border-r border-hairline/60 sm:w-[28%] md:w-[26%] lg:w-[25%]">
                <ShaftColumn
                  steps={steps}
                  carRef={carRef}
                  fillRef={fillRef}
                  floorRef={floorRef}
                  tickRefs={tickRefs}
                  total={total}
                />
              </div>
              <div className="relative h-full flex-1 overflow-hidden">
                <div ref={trackRef} className="flex flex-col" style={{ height: `${total * 100}%` }}>
                  {steps.map((step, index) => (
                    <FloorContent
                      key={step.id}
                      ref={(el) => {
                        floorRefs.current[index] = el;
                      }}
                      step={step}
                      style={{ height: `${100 / total}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
