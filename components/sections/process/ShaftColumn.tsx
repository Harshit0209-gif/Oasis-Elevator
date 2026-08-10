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
// version; only the breathing room around it changes. The cabin is the
// section's focal point — everything else (rails, ticks, display) is sized
// to frame it, not compete with it.
export function ShaftColumn({ steps, carRef, fillRef, floorRef, tickRefs, total }: ShaftColumnProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 px-2">
      {/* Digital floor display — always visible above the shaft, sized to
          read at a glance */}
      <div className="flex items-center gap-2 rounded-md border border-black/20 bg-[#12161b] px-3 py-2 shadow-[0_3px_10px_rgba(15,23,42,0.4)]">
        <ArrowUp className="size-3.5 text-brand-blue" strokeWidth={3} />
        <span
          ref={floorRef}
          className="font-mono text-lg leading-none font-semibold tabular-nums text-white"
        >
          01
        </span>
        <span className="font-mono text-xs leading-none text-white/40">
          /{String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Shaft track — dual rails, fill, tick marks, cabin */}
      <div className="relative w-11 flex-1">
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-8 bg-gradient-to-b from-transparent via-[#c7ccd1] to-transparent opacity-80" />
        <div className="absolute inset-y-0 left-1/2 w-px translate-x-8 bg-gradient-to-b from-transparent via-[#c7ccd1] to-transparent opacity-80" />

        <div className="absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 rounded-full bg-[#e5e7eb] shadow-[inset_0_0_2px_rgba(15,23,42,0.18)]" />

        <div
          ref={fillRef}
          className="absolute bottom-0 left-1/2 w-1 -translate-x-1/2 rounded-full bg-brand-blue shadow-[0_0_10px_rgba(12,101,132,0.45)]"
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
            className="absolute left-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 bg-[#c7ccd1] transition-colors duration-300 data-[passed=true]:bg-brand-blue"
            style={{ top: `${total > 1 ? 100 - (index / (total - 1)) * 100 : 100}%` }}
          />
        ))}

        {/* Elevator cabin — the section's focal point: brushed stainless
            steel, a diagonal glass reflection, and a deep layered shadow so
            it reads as the thing to look at, not just a marker on the shaft. */}
        <div ref={carRef} className="absolute left-1/2 z-10 -translate-x-1/2 -translate-y-1/2" style={{ top: "100%" }}>
          <div
            className="relative h-[72px] w-[54px] overflow-hidden rounded-lg border border-white/80 shadow-[0_14px_32px_rgba(15,23,42,0.35),0_3px_8px_rgba(15,23,42,0.22)]"
            style={{
              background:
                "linear-gradient(135deg, #f5f6f8 0%, #d3d8dd 28%, #f0f1f3 46%, #c0c5cb 64%, #f2f3f5 82%, #b6bbc1 100%)",
            }}
          >
            {/* brushed-metal micro texture */}
            <div
              className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(255,255,255,0.9) 0px, rgba(255,255,255,0.9) 1px, transparent 1px, transparent 3px)",
              }}
            />
            {/* diagonal glass reflection streak */}
            <div className="absolute -inset-y-6 left-[18%] w-[30%] -rotate-[18deg] bg-gradient-to-b from-white/0 via-white/70 to-white/0" />
            {/* ceiling accent strip */}
            <div className="absolute inset-x-2 top-1.5 h-[2px] rounded-full bg-brand-blue/80" />
            {/* door seam */}
            <div className="absolute inset-y-2 left-1/2 w-px -translate-x-1/2 bg-black/15" />
            {/* base shadow */}
            <div className="absolute inset-x-0 bottom-0 h-2.5 bg-black/12" />
          </div>
        </div>
      </div>
    </div>
  );
}
