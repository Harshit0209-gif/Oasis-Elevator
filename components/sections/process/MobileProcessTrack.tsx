"use client";

import { useRef, useState } from "react";
import { ArrowRight, ArrowUp } from "lucide-react";
import type { ProcessStep } from "@/data/types";
import { cn } from "@/lib/utils";
import { processStepIcons } from "./process-icons";

interface MobileProcessTrackProps {
  steps: ProcessStep[];
  className?: string;
}

// A dedicated mobile interaction, not a stacked timeline: one floor fills the
// screen at a time, with a persistent digital "elevator display" above it —
// swiping between cards is meant to feel like travelling between floors.
export function MobileProcessTrack({ steps, className }: MobileProcessTrackProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const total = steps.length;

  const handleScroll = () => {
    const node = scrollerRef.current;
    if (!node) return;
    const index = Math.round(node.scrollLeft / node.clientWidth);
    setActive(Math.max(0, Math.min(total - 1, index)));
  };

  const goTo = (index: number) => {
    const node = scrollerRef.current;
    if (!node) return;
    node.scrollTo({ left: index * node.clientWidth, behavior: "smooth" });
  };

  return (
    <div className={cn("py-16", className)}>
      {/* Persistent digital floor display */}
      <div className="container-oasis mb-8 flex items-center justify-center gap-4">
        <div className="flex items-center gap-2 rounded-md border border-black/20 bg-[#12161b] px-3 py-2 shadow-[0_3px_8px_rgba(15,23,42,0.35)]">
          <ArrowUp className="size-3 text-brand-blue" strokeWidth={3} />
          <span className="font-mono text-base leading-none font-semibold tabular-nums text-white">
            {String(active + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-xs leading-none text-white/40">/ {total}</span>
        </div>
        <div className="h-1 flex-1 max-w-[120px] overflow-hidden rounded-full bg-[#e5e7eb]">
          <div
            className="h-full rounded-full bg-brand-blue transition-[width] duration-500 ease-out"
            style={{ width: `${((active + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      {/* One floor per slide */}
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {steps.map((step, index) => {
          const Icon = processStepIcons[step.id];
          return (
            <div
              key={step.id}
              className="w-full flex-none snap-center px-1"
              style={{ scrollSnapStop: "always" }}
            >
              <div className="flex min-h-[46vh] flex-col items-center justify-center gap-4 rounded-2xl border border-hairline px-8 py-10 text-center">
                {Icon && (
                  <div className="mb-1 flex size-12 items-center justify-center rounded-full bg-brand-blue/8">
                    <Icon className="size-5 text-brand-blue" strokeWidth={1.75} />
                  </div>
                )}
                <span className="font-heading text-xs font-medium tracking-[0.25em] text-brand-blue uppercase">
                  Floor {String(step.order).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-2xl font-semibold text-navy">{step.title}</h3>
                <p className="max-w-xs text-sm text-graphite">{step.description}</p>

                {index < total - 1 && (
                  <button
                    type="button"
                    onClick={() => goTo(index + 1)}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium tracking-[0.1em] text-brand-blue uppercase transition-colors hover:text-navy"
                  >
                    Next Floor
                    <ArrowRight className="size-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {steps.map((step, index) => (
          <button
            key={step.id}
            type="button"
            aria-label={`Show Floor ${index + 1}`}
            onClick={() => goTo(index)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              index === active ? "w-6 bg-brand-blue" : "w-1.5 bg-hairline",
            )}
          />
        ))}
      </div>
    </div>
  );
}
