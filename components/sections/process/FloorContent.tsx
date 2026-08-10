import { forwardRef, type CSSProperties } from "react";
import type { ProcessStep } from "@/data/types";
import { resolveProcessIcon } from "./process-icons";

interface FloorContentProps {
  step: ProcessStep;
  style?: CSSProperties;
}

// One floor's copy. In the scroll-track context, `style` pins its share of
// the track's total height (a percentage of the track, not of itself — see
// ProcessShaft) so 100%-height children don't each try to fill the whole,
// already-expanded track. In the reduced-motion static list, no `style` is
// passed and it just sizes to its own content.
// data-state (set imperatively from the scrub loop) controls emphasis: the
// active floor reads at full strength, passed floors dim, upcoming floors
// stay subtle — same hierarchy at every viewport width.
export const FloorContent = forwardRef<HTMLDivElement, FloorContentProps>(({ step, style }, ref) => {
  const Icon = resolveProcessIcon(step.icon);

  return (
    <div
      ref={ref}
      data-state="upcoming"
      style={style}
      className="group flex w-full shrink-0 scale-[0.97] flex-col justify-center gap-3 px-6 opacity-30 transition-[opacity,transform] duration-300 ease-out sm:px-10 md:px-14 data-[state=active]:scale-100 data-[state=active]:opacity-100 data-[state=passed]:opacity-30"
    >
      {Icon && (
        <div className="flex size-10 items-center justify-center rounded-full bg-brand-blue/8 transition-colors duration-300 group-data-[state=active]:bg-brand-blue/15 sm:size-11">
          <Icon className="size-4.5 text-brand-blue sm:size-5" strokeWidth={1.75} />
        </div>
      )}
      <span className="font-heading text-xs font-medium tracking-[0.25em] text-brand-blue uppercase">
        Floor {String(step.order).padStart(2, "0")}
      </span>
      <h3 className="font-heading text-2xl font-semibold text-navy sm:text-3xl md:text-[2rem]">
        {step.title}
      </h3>
      <p className="max-w-sm text-sm leading-relaxed text-graphite sm:text-base">
        {step.description}
      </p>
    </div>
  );
});
FloorContent.displayName = "FloorContent";
