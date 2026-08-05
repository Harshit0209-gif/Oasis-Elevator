"use client";

import type { CabinType } from "@/data/types";
import { cn } from "@/lib/utils";

interface CabinSelectorProps {
  types: CabinType[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function CabinSelector({ types, activeId, onSelect }: CabinSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Elevator cabin types">
      {types.map((type) => {
        const active = type.id === activeId;
        return (
          <button
            key={type.id}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(type.id)}
            className={cn(
              "border px-4 py-2.5 text-left font-heading text-sm font-medium transition-colors duration-300",
              active
                ? "border-gold bg-gold text-[#111111]"
                : "border-hairline text-bg-light/70 hover:border-bg-light/40 hover:text-bg-light",
            )}
          >
            {type.name}
          </button>
        );
      })}
    </div>
  );
}
