import type { WhyOasisFeature } from "@/data/types";
import { cn } from "@/lib/utils";
import { WhyOasisMobileCard } from "./WhyOasisMobileCard";

interface WhyOasisMobileListProps {
  features: WhyOasisFeature[];
  className?: string;
}

// Normal document flow — no pinning, no scroll-trapping. Cards stack and
// scroll like the rest of the page; each one reveals with a fade + translate
// as it enters view, and the user can always scroll back up to a previous
// one without fighting any captured-scroll mechanism.
export function WhyOasisMobileList({ features, className }: WhyOasisMobileListProps) {
  return (
    <div className={cn("container-oasis flex flex-col gap-8", className)}>
      {features.map((feature, index) => (
        <WhyOasisMobileCard
          key={feature.id}
          feature={feature}
          index={index}
          total={features.length}
        />
      ))}
    </div>
  );
}
