import type { RefObject } from "react";
import { ArrowUp } from "lucide-react";
import type { ProcessStep } from "@/data/types";

interface ShaftColumnProps {
  steps: ProcessStep[];
  carRef: RefObject<HTMLDivElement | null>;
  fillRef: RefObject<HTMLDivElement | null>;
  floorRef: RefObject<HTMLSpanElement | null>;
  tickRefs: RefObject<Array<HTMLDivElement | null>>;
  total: number;
}

// The signature elevator shaft — one fixed-size visual identity reused at
// every viewport width. Its column narrows/widens around it (25–30% of the
// section), but the shaft itself never redesigns down to a lesser "mobile"
// version; only the breathing room around it changes.
export function ShaftColumn({ steps, carRef, fillRef, floorRef, tickRefs, total }: ShaftColumnProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-2">
      {/* Digital floor display — always visible above the shaft */}
      <div className="flex items-center gap-1.5 rounded-md border border-black/20 bg-[#12161b] px-2 py-1.5 shadow-[0_3px_8px_rgba(15,23,42,0.35)]">
        <ArrowUp className="size-3 text-brand-blue" strokeWidth={3} />
        <span
          ref={floorRef}
          className="font-mono text-sm leading-none font-semibold tabular-nums text-white"
        >
          01
        </span>
        <span className="font-mono text-[0.6rem] leading-none text-white/40">
          /{String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Shaft track — dual rails, fill, tick marks, cabin */}
      <div className="relative w-9 flex-1">
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-3 bg-gradient-to-b from-transparent via-[#c7ccd1] to-transparent opacity-80" />
        <div className="absolute inset-y-0 left-1/2 w-px translate-x-3 bg-gradient-to-b from-transparent via-[#c7ccd1] to-transparent opacity-80" />

        <div className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 rounded-full bg-[#e5e7eb] shadow-[inset_0_0_2px_rgba(15,23,42,0.18)]" />

        <div
          ref={fillRef}
          className="absolute bottom-0 left-1/2 w-[3px] -translate-x-1/2 rounded-full bg-brand-blue shadow-[0_0_10px_rgba(12,101,132,0.45)]"
          style={{ height: "0%" }}
        />

        {steps.map((step, index) => (
          <div
            key={step.id}
            ref={(el) => {
              tickRefs.current[index] = el;
            }}
            data-passed="false"
            aria-hidden
            className="absolute left-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-[#c7ccd1] transition-colors duration-300 data-[passed=true]:bg-brand-blue"
            style={{ top: `${100 - (index / (total - 1)) * 100}%` }}
          />
        ))}

        {/* Elevator cabin — brushed steel, glass sheen */}
        <div ref={carRef} className="absolute left-1/2 z-10 -translate-x-1/2 -translate-y-1/2" style={{ top: "100%" }}>
          <div
            className="relative h-12 w-9 overflow-hidden rounded-[6px] border border-white/70 shadow-[0_8px_18px_rgba(15,23,42,0.28)]"
            style={{
              background: "linear-gradient(135deg, #f2f3f5 0%, #cdd1d6 42%, #f4f5f7 55%, #babec4 100%)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-transparent" />
            <div className="absolute inset-x-1 top-0.5 h-[2px] rounded-full bg-brand-blue/80" />
            <div className="absolute inset-y-1 left-1/2 w-px -translate-x-1/2 bg-black/15" />
            <div className="absolute inset-x-0 bottom-0 h-1.5 bg-black/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
