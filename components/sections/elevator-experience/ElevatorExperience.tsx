"use client";

import { useState } from "react";
import { cabinTypes } from "@/data/cabin-config";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CabinIllustration } from "./CabinIllustration";
import { CabinSelector } from "./CabinSelector";

export function ElevatorExperience() {
  const [activeId, setActiveId] = useState(cabinTypes[0].id);
  const activeType = cabinTypes.find((type) => type.id === activeId) ?? cabinTypes[0];

  return (
    <section className="bg-bg-secondary py-28 md:py-36">
      <div className="container-oasis mb-14">
        <SectionHeading
          eyebrow="Configure"
          title="Step inside, before you decide."
          description="Select a cabin type to see how materials, lighting and doors change."
        />
      </div>

      <div className="container-oasis grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col gap-8">
          <CabinSelector types={cabinTypes} activeId={activeId} onSelect={setActiveId} />

          <div className="border-t border-hairline pt-6">
            <h3 className="font-heading text-2xl font-medium text-bg-light">{activeType.name}</h3>
            <p className="mt-2 max-w-sm text-graphite">{activeType.description}</p>
          </div>
        </div>

        <CabinIllustration type={activeType} />
      </div>
    </section>
  );
}
