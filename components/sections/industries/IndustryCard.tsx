import type { Industry } from "@/data/types";
import { OptimizedImage } from "@/components/shared/OptimizedImage";
import { cn } from "@/lib/utils";

export function IndustryCard({ industry, index }: { industry: Industry; index: number }) {
  return (
    <div
      tabIndex={0}
      className={cn(
        "group/card relative h-72 w-full flex-none overflow-hidden border-b border-hairline outline-none",
        "lg:h-[560px] lg:w-auto lg:flex-1 lg:border-r lg:border-b-0",
        "lg:transition-[flex-grow] lg:duration-700 lg:ease-[cubic-bezier(0.16,1,0.3,1)]",
        "lg:hover:flex-[3] lg:focus-visible:flex-[3]",
        index === 7 && "lg:border-r-0",
      )}
    >
      <OptimizedImage
        src={industry.image.src}
        alt={industry.image.alt}
        fill
        sizes="(min-width: 1024px) 40vw, 100vw"
        containerClassName="absolute inset-0"
        className="opacity-70 transition-opacity duration-700 lg:opacity-50 lg:group-hover/card:opacity-90 lg:group-focus-visible/card:opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-bg-primary/10" />

      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <span className="mb-2 font-heading text-xs text-gold opacity-100 transition-opacity duration-500 lg:opacity-0 lg:delay-150 lg:group-hover/card:opacity-100 lg:group-focus-visible/card:opacity-100">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3
          className={cn(
            "font-heading text-lg font-medium text-bg-light transition-all duration-500 lg:text-xl",
            "[writing-mode:horizontal-tb] lg:[writing-mode:vertical-rl] lg:group-hover/card:[writing-mode:horizontal-tb] lg:group-focus-visible/card:[writing-mode:horizontal-tb]",
          )}
        >
          {industry.name}
        </h3>
        <p className="mt-2 max-h-24 overflow-hidden text-sm text-bg-light/70 opacity-100 transition-all duration-500 lg:max-h-0 lg:opacity-0 lg:delay-150 lg:group-hover/card:max-h-24 lg:group-hover/card:opacity-100 lg:group-focus-visible/card:max-h-24 lg:group-focus-visible/card:opacity-100">
          {industry.description}
        </p>
      </div>
    </div>
  );
}
