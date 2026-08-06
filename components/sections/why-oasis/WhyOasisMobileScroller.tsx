"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { WhyOasisFeature } from "@/data/types";
import { AccentDivider } from "@/components/shared/AccentDivider";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

interface WhyOasisMobileScrollerProps {
  features: WhyOasisFeature[];
  className?: string;
}

// A pinned image that crossfades between features as the matching text block
// scrolls through the center of the viewport — the "living" mobile
// counterpart to the desktop alternating split (which relies on side-by-side
// space a phone doesn't have).
export function WhyOasisMobileScroller({ features, className }: WhyOasisMobileScrollerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const blockRefs = useRef<Array<HTMLDivElement | null>>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = blockRefs.current.findIndex((el) => el === entry.target);
          if (index !== -1) setActiveIndex(index);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    blockRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [features.length]);

  return (
    <div className={cn("relative", className)}>
      <div className="sticky top-24 z-0 mx-6 overflow-hidden rounded-2xl border border-hairline">
        <div className="relative aspect-[4/3] w-full bg-bg-secondary">
          {features.map((feature, index) => (
            <Image
              key={feature.id}
              src={feature.image.src}
              alt={feature.image.alt}
              fill
              sizes="100vw"
              className={cn(
                "object-cover",
                reducedMotion ? "" : "transition-opacity duration-700 ease-out",
                index === activeIndex ? "opacity-90" : "opacity-0",
              )}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/15 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
            <span className="font-heading text-4xl font-medium text-accent-orange/90">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <div className="flex gap-1.5 pb-1.5">
              {features.map((feature, index) => (
                <span
                  key={feature.id}
                  className={cn(
                    "h-1 rounded-full transition-all duration-300",
                    index === activeIndex ? "w-5 bg-accent-orange" : "w-1 bg-white/30",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-6 flex flex-col">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            ref={(el) => {
              blockRefs.current[index] = el;
            }}
            className="relative flex min-h-[62vh] flex-col justify-center gap-4 border-t border-hairline bg-bg-primary px-6 py-14 shadow-[0_-24px_24px_-24px_rgba(0,0,0,0.15)] first:border-t-0"
          >
            <span className="font-heading text-xs font-medium uppercase tracking-[0.3em] text-brand-blue">
              {feature.eyebrow}
            </span>
            <AccentDivider />
            <h3 className="text-balance font-heading text-3xl font-medium leading-tight">
              {feature.title}
            </h3>
            <p className="text-balance leading-relaxed text-graphite">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
