"use client";

import { forwardRef } from "react";
import type { ProcessStep } from "@/data/types";
import { cn } from "@/lib/utils";

interface FloorMarkerProps {
  step: ProcessStep;
  side: "left" | "right";
  topPercent: number;
}

export const FloorMarker = forwardRef<HTMLDivElement, FloorMarkerProps>(
  ({ step, side, topPercent }, ref) => {
    return (
      <div
        ref={ref}
        data-floor-marker
        className={cn(
          "absolute flex w-[44%] flex-col gap-1 opacity-35 transition-opacity duration-200",
          side === "left" ? "left-0 items-end pr-10 text-right" : "right-0 items-start pl-10 text-left",
        )}
        style={{ top: `${topPercent}%`, transform: "translateY(-50%)" }}
      >
        <span className="font-heading text-xs uppercase tracking-[0.25em] text-gold">
          {String(step.order).padStart(2, "0")}
        </span>
        <h3 className="font-heading text-xl font-medium text-bg-light md:text-2xl">
          {step.title}
        </h3>
        <p className="max-w-[240px] text-sm text-graphite">{step.description}</p>
      </div>
    );
  },
);
FloorMarker.displayName = "FloorMarker";
