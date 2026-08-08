import type { WhyOasisFeature } from "@/data/types";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { fadeUp } from "@/lib/motion";

interface WhyOasisMobileCardProps {
  feature: WhyOasisFeature;
  index: number;
  total: number;
}

// A normal-flow content card — full-bleed image with an overlaid title and
// description, same premium language as the desktop split, just scaled to
// sit naturally in a scrolling list instead of taking the whole viewport.
export function WhyOasisMobileCard({ feature, index, total }: WhyOasisMobileCardProps) {
  return (
    <RevealOnScroll
      variants={fadeUp}
      className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl"
    >
      <img
        src={feature.image.src}
        alt={feature.image.alt}
        loading={index === 0 ? "eager" : "lazy"}
        fetchPriority={index === 0 ? "high" : undefined}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/10" />

      <span className="absolute top-5 left-5 font-mono text-xs font-medium tracking-[0.2em] text-white/70">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6">
        <h3 className="text-balance font-heading text-2xl font-semibold text-white">
          {feature.title}
        </h3>
        <p className="line-clamp-3 max-w-sm text-sm leading-relaxed text-white/80">
          {feature.description}
        </p>
      </div>
    </RevealOnScroll>
  );
}
