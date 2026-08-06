"use client";

import { forwardRef } from "react";
import type { ProcessStep } from "@/data/types";
import { cn } from "@/lib/utils";
import { processStepIcons } from "./process-icons";

interface FloorMarkerProps {
  step: ProcessStep;
  side: "left" | "right";
  topPercent: number;
}

export const FloorMarker = forwardRef<HTMLDivElement, FloorMarkerProps>(
  ({ step, side, topPercent }, ref) => {
    const Icon = processStepIcons[step.id];

    return (
      <div
        ref={ref}
        data-floor-marker
        data-active="false"
        className={cn(
          "group absolute flex w-[44%] flex-col gap-1.5 opacity-40 transition-[opacity,transform] duration-300 ease-out",
          "data-[active=true]:opacity-100 data-[active=true]:scale-[1.03]",
          side === "left" ? "left-0 items-end pr-10 text-right" : "right-0 items-start pl-10 text-left",
        )}
        style={{ top: `${topPercent}%`, transform: "translateY(-50%)" }}
      >
        {/* Connector reaching from the card toward the shaft */}
        <span
          aria-hidden
          className={cn(
            "absolute top-1/2 h-px w-8 -translate-y-1/2 bg-[#c7ccd1] transition-colors duration-300 group-data-[active=true]:bg-brand-blue",
            side === "left" ? "right-0" : "left-0",
          )}
        />
        <span
          aria-hidden
          className={cn(
            "absolute top-1/2 size-2 -translate-y-1/2 rounded-full bg-[#c7ccd1] transition-[background-color,box-shadow] duration-300",
            "group-data-[active=true]:bg-brand-blue group-data-[active=true]:shadow-[0_0_0_4px_rgba(12,101,132,0.18)] group-data-[active=true]:animate-pulse",
            side === "left" ? "-right-1" : "-left-1",
          )}
        />

        <span className="font-heading text-xs font-medium tracking-[0.25em] text-brand-blue/60 uppercase transition-colors duration-300 group-data-[active=true]:text-brand-blue">
          Floor {String(step.order).padStart(2, "0")}
        </span>
        <h3 className="font-heading text-xl font-medium transition-all duration-300 md:text-2xl group-data-[active=true]:text-navy group-data-[active=true]:font-semibold group-data-[active=true]:md:text-[1.75rem]">
          {step.title}
        </h3>
        <p className="max-w-[240px] text-sm text-graphite">{step.description}</p>
        {Icon && (
          <Icon
            aria-hidden
            className="mt-1 size-4 text-graphite/45 transition-colors duration-300 group-data-[active=true]:text-brand-blue/70"
            strokeWidth={1.75}
          />
        )}
      </div>
    );
  },
);
FloorMarker.displayName = "FloorMarker";
