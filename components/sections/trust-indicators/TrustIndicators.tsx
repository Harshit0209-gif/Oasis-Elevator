import { stats } from "@/data/stats";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { AnimatedCounter } from "./AnimatedCounter";

export function TrustIndicators() {
  return (
    <section className="border-y border-hairline bg-bg-secondary">
      <div className="container-oasis grid grid-cols-2 divide-x divide-y divide-hairline py-14 md:grid-cols-4 md:divide-y-0">
        {stats.map((stat, index) => (
          <RevealOnScroll
            key={stat.id}
            delay={index * 0.08}
            className="flex flex-col items-center gap-3 px-4 py-6 text-center"
          >
            <p className="text-4xl font-medium text-navy md:text-5xl">
              <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            </p>
            <span className="h-0.5 w-8 rounded-full bg-accent-orange" aria-hidden />
            <p className="text-xs uppercase tracking-[0.15em] text-graphite">{stat.label}</p>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
