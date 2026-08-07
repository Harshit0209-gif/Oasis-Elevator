import type { Accessory } from "@/data/types";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { accessoryIcons } from "./accessory-icons";

export function AccessoryCard({ accessory }: { accessory: Accessory }) {
  const Icon = accessoryIcons[accessory.id];

  return (
    <RevealOnScroll className="flex flex-col gap-4 rounded-2xl border border-hairline bg-bg-primary p-8">
      {Icon && (
        <div className="flex size-11 items-center justify-center rounded-full bg-brand-blue/8">
          <Icon className="size-5 text-brand-blue" strokeWidth={1.75} />
        </div>
      )}
      <h3 className="font-heading text-lg font-medium">{accessory.name}</h3>
      <p className="text-sm leading-relaxed text-graphite">{accessory.description}</p>
    </RevealOnScroll>
  );
}
