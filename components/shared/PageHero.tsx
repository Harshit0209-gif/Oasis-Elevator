import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { fadeUp } from "@/lib/motion";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="border-b border-hairline bg-bg-primary pt-40 pb-20 md:pt-48 md:pb-28">
      <div className="container-oasis flex flex-col gap-5">
        <RevealOnScroll>
          <span className="font-heading text-xs font-medium uppercase tracking-[0.3em] text-gold">
            {eyebrow}
          </span>
        </RevealOnScroll>
        <RevealOnScroll variants={fadeUp} delay={0.08}>
          <h1 className="text-balance font-heading text-5xl font-medium leading-[1.05] text-foreground md:text-6xl lg:text-7xl">
            {title}
          </h1>
        </RevealOnScroll>
        {description && (
          <RevealOnScroll delay={0.16}>
            <p className="max-w-xl text-balance text-base text-graphite md:text-lg">
              {description}
            </p>
          </RevealOnScroll>
        )}
      </div>
    </section>
  );
}
