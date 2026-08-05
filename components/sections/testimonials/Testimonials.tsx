"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { TestimonialSlide } from "./TestimonialSlide";

export function Testimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const node = scrollerRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * node.clientWidth * 0.7, behavior: "smooth" });
  };

  return (
    <section className="bg-bg-primary py-28 md:py-36">
      <div className="container-oasis mb-14 flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted by builders of ambition."
          description="What architects, developers and facility teams say after working with Oasis."
        />
        <div className="flex gap-3">
          <Button
            variant="outline-light"
            size="icon-lg"
            aria-label="Previous testimonial"
            onClick={() => scrollByCard(-1)}
          >
            <ArrowLeft className="size-4" />
          </Button>
          <Button
            variant="outline-light"
            size="icon-lg"
            aria-label="Next testimonial"
            onClick={() => scrollByCard(1)}
          >
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="container-oasis flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((testimonial) => (
          <TestimonialSlide key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
}
