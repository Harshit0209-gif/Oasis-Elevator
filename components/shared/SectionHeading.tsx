import { cn } from "@/lib/utils";
import { RevealOnScroll } from "./RevealOnScroll";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <RevealOnScroll>
          <span
            className={cn(
              "font-heading text-xs font-medium uppercase tracking-[0.3em]",
              light ? "text-accent-blue" : "text-brand-blue",
            )}
          >
            {eyebrow}
          </span>
        </RevealOnScroll>
      )}
      <RevealOnScroll delay={0.08}>
        <h2
          className={cn(
            "text-balance font-heading text-4xl font-medium leading-[1.1] md:text-5xl lg:text-6xl",
            light && "text-white",
          )}
        >
          {title}
        </h2>
      </RevealOnScroll>
      {description && (
        <RevealOnScroll delay={0.16}>
          <p
            className={cn(
              "max-w-xl text-balance text-base md:text-lg",
              light ? "text-white/70" : "text-graphite",
            )}
          >
            {description}
          </p>
        </RevealOnScroll>
      )}
    </div>
  );
}
