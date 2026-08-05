import { Check } from "lucide-react";
import type { MaintenancePlan } from "@/data/types";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PlanCard({ plan, delay }: { plan: MaintenancePlan; delay?: number }) {
  return (
    <RevealOnScroll
      delay={delay}
      className={cn(
        "relative flex h-full flex-col gap-8 border p-8 md:p-10",
        plan.recommended
          ? "border-gold bg-bg-secondary md:-translate-y-4"
          : "border-hairline bg-bg-primary",
      )}
    >
      {plan.recommended && (
        <span className="absolute -top-3 left-8 bg-gold px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[#111111]">
          Most Chosen
        </span>
      )}

      <div className="flex flex-col gap-2">
        <h3 className="font-heading text-2xl font-medium text-bg-light">{plan.tier}</h3>
        <p className="text-sm text-graphite">{plan.tagline}</p>
      </div>

      <div className="border-y border-hairline py-4">
        <p className="text-xs uppercase tracking-[0.2em] text-gold">{plan.responseTime}</p>
      </div>

      <ul className="flex flex-1 flex-col gap-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-bg-light/80">
            <Check className="mt-0.5 size-4 shrink-0 text-gold" />
            {feature}
          </li>
        ))}
      </ul>

      <Button variant={plan.recommended ? "gold" : "outline-light"} size="xl" asChild>
        <a href="/contact">Get Started</a>
      </Button>
    </RevealOnScroll>
  );
}
