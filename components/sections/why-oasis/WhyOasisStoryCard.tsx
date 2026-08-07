import { ChevronDown } from "lucide-react";
import type { WhyOasisFeature } from "@/data/types";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface WhyOasisStoryCardProps {
  feature: WhyOasisFeature;
  index: number;
  total: number;
}

// One full-viewport "story" screen per brand value — the mobile-native
// counterpart to the desktop alternating split, not a stacked version of it.
export function WhyOasisStoryCard({ feature, index, total }: WhyOasisStoryCardProps) {
  const isLast = index === total - 1;

  return (
    <div className="relative h-full w-full flex-none snap-start overflow-hidden">
      <img
        src={feature.image.src}
        alt={feature.image.alt}
        loading={index === 0 ? "eager" : "lazy"}
        fetchPriority={index === 0 ? "high" : undefined}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/10" />

      <span className="absolute top-6 left-6 font-mono text-xs font-medium tracking-[0.2em] text-white/70">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>

      <RevealOnScroll
        variants={fadeUp}
        className="absolute inset-x-0 bottom-0 flex flex-col gap-3 px-6 pb-10"
      >
        <h3 className="text-balance font-heading text-3xl font-semibold text-white">
          {feature.title}
        </h3>
        <p className="line-clamp-4 max-w-sm text-sm leading-relaxed text-white/80">
          {feature.description}
        </p>

        <div className="mt-1 flex gap-1.5">
          {Array.from({ length: total }).map((_, dot) => (
            <span
              key={dot}
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                dot === index ? "w-5 bg-accent-orange" : "w-1 bg-white/30",
              )}
            />
          ))}
        </div>

        {!isLast && (
          <div className="mt-1 flex items-center gap-1.5 text-[0.65rem] font-medium tracking-[0.2em] text-white/50 uppercase">
            <ChevronDown className="size-3 animate-bounce" aria-hidden />
            Scroll
          </div>
        )}
      </RevealOnScroll>
    </div>
  );
}
