import { maintenancePlans } from "@/data/maintenance-plans";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PlanCard } from "./PlanCard";

export function MaintenancePlans() {
  return (
    <section id="maintenance-plans" className="bg-bg-primary py-28 md:py-36">
      <div className="container-oasis mb-16">
        <SectionHeading
          eyebrow="Maintenance"
          title="Coverage built around your building."
          description="Three tiers of ongoing care — from essential upkeep to round-the-clock white-glove service."
          align="center"
        />
      </div>

      <div className="container-oasis grid grid-cols-1 gap-6 md:grid-cols-3">
        {maintenancePlans.map((plan, index) => (
          <PlanCard key={plan.id} plan={plan} delay={index * 0.1} />
        ))}
      </div>
    </section>
  );
}
