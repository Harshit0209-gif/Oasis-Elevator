"use client";

import type { RefObject } from "react";
import { ArrowUp } from "lucide-react";
import type { ProcessStep } from "@/data/types";

interface ShaftTrackProps {
  steps: ProcessStep[];
  carRef: RefObject<HTMLDivElement | null>;
  fillRef: RefObject<HTMLDivElement | null>;
  floorRef: RefObject<HTMLSpanElement | null>;
  tickRefs: RefObject<Array<HTMLDivElement | null>>;
}

export function ShaftTrack({ steps, carRef, fillRef, floorRef, tickRefs }: ShaftTrackProps) {
  const total = steps.length;

  return (
    <>
      {/* Dual guide rails — static, brushed-metal, purely architectural */}
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-2.5 bg-gradient-to-b from-transparent via-[#c7ccd1] to-transparent opacity-80" />
      <div className="absolute inset-y-0 left-1/2 w-px translate-x-2.5 bg-gradient-to-b from-transparent via-[#c7ccd1] to-transparent opacity-80" />

      {/* Shaft interior — upcoming floors (base) */}
      <div className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 rounded-full bg-[#e5e7eb] shadow-[inset_0_0_2px_rgba(15,23,42,0.18)]" />

      {/* Shaft interior — completed floors, fills in brand blue as the car climbs */}
      <div
        ref={fillRef}
        className="absolute bottom-0 left-1/2 w-[3px] -translate-x-1/2 rounded-full bg-brand-blue shadow-[0_0_10px_rgba(12,101,132,0.45)]"
        style={{ height: "0%" }}
      />

      {/* Precision floor tick marks */}
      {steps.map((step, index) => (
        <div
          key={step.id}
          ref={(el) => {
            tickRefs.current[index] = el;
          }}
          data-passed="false"
          aria-hidden
          className="absolute left-1/2 h-px w-3 -translate-x-1/2 -translate-y-1/2 bg-[#c7ccd1] transition-colors duration-300 data-[passed=true]:bg-brand-blue"
          style={{ top: `${100 - (index / (total - 1)) * 100}%` }}
        />
      ))}

      {/* Elevator unit — digital display + cabin, travels the shaft as one piece */}
      <div
        ref={carRef}
        data-shaft-car
        className="absolute left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
        style={{ top: "100%" }}
      >
        <div className="flex flex-col items-center gap-0.5 rounded-[5px] border border-black/20 bg-[#12161b] px-2 py-1 shadow-[0_3px_8px_rgba(15,23,42,0.35)]">
          <ArrowUp className="size-2.5 text-brand-blue" strokeWidth={3} />
          <span
            ref={floorRef}
            className="font-mono text-[0.65rem] leading-none font-semibold tabular-nums text-white"
          >
            01
          </span>
        </div>

        <div
          className="relative h-14 w-10 overflow-hidden rounded-[7px] border border-white/70 shadow-[0_8px_18px_rgba(15,23,42,0.28)]"
          style={{
            background:
              "linear-gradient(135deg, #f2f3f5 0%, #cdd1d6 42%, #f4f5f7 55%, #babec4 100%)",
          }}
        >
          {/* glass reflection sheen */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-transparent" />
          {/* ceiling accent strip */}
          <div className="absolute inset-x-1.5 top-1 h-[2px] rounded-full bg-brand-blue/80" />
          {/* door seam */}
          <div className="absolute inset-y-1.5 left-1/2 w-px -translate-x-1/2 bg-black/15" />
          {/* base shadow */}
          <div className="absolute inset-x-0 bottom-0 h-2 bg-black/10" />
        </div>
      </div>
    </>
  );
}
