import { useRef, useState } from "react";
import type { Industry } from "@/data/types";
import { OptimizedImage } from "@/components/shared/OptimizedImage";
import { cn } from "@/lib/utils";

// Desktop gets the hover-expand fan; touch devices don't have hover, so this
// is a swipe-through gallery instead — same "browse the options" feeling,
// translated to a gesture that actually works on a phone.
export function IndustryMobileGallery({ industries }: { industries: Industry[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const handleScroll = () => {
    const node = scrollerRef.current;
    if (!node) return;
    const index = Math.round(node.scrollLeft / node.clientWidth);
    setActive(Math.max(0, Math.min(industries.length - 1, index)));
  };

  const goTo = (index: number) => {
    const node = scrollerRef.current;
    if (!node) return;
    node.scrollTo({ left: index * node.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="lg:hidden">
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        data-lenis-prevent
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {industries.map((industry, index) => (
          <div
            key={industry.id}
            className="relative aspect-[3/4] w-[85%] flex-none snap-center overflow-hidden"
          >
            <OptimizedImage
              src={industry.image.src}
              alt={industry.image.alt}
              fill
              sizes="85vw"
              containerClassName="absolute inset-0"
              className="opacity-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6">
              <span className="font-heading text-xs text-accent-orange">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-heading text-2xl font-medium text-white">{industry.name}</h3>
              <p className="text-sm text-white/75">{industry.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {industries.map((industry, index) => (
          <button
            key={industry.id}
            type="button"
            aria-label={`Show ${industry.name}`}
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
