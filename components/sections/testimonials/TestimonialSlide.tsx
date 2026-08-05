import Image from "next/image";
import type { Testimonial } from "@/data/types";

export function TestimonialSlide({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="w-full flex-none snap-center px-1 md:w-[70%] lg:w-[55%]">
      <div className="flex h-full flex-col gap-8 border border-hairline bg-bg-secondary p-8 md:p-12">
        <span className="font-heading text-6xl leading-none text-gold/40">&ldquo;</span>
        <p className="text-balance font-heading text-xl font-medium leading-snug text-bg-light md:text-2xl">
          {testimonial.quote}
        </p>
        <div className="mt-auto flex items-center gap-4">
          <div className="relative size-14 shrink-0 overflow-hidden rounded-full">
            <Image
              src={testimonial.photo.src}
              alt={testimonial.photo.alt}
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-heading text-sm font-medium text-bg-light">
              {testimonial.clientName}
            </p>
            <p className="text-sm text-graphite">
              {testimonial.clientTitle}, {testimonial.company}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
