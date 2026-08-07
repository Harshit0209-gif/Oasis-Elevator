import type { Testimonial } from "@/data/types";

export function TestimonialSlide({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="w-full flex-none snap-center px-1 md:w-[70%] lg:w-[55%]">
      <div className="flex h-full flex-col gap-8 rounded-2xl border border-hairline bg-white p-8 shadow-sm md:p-12">
        <span className="font-heading text-6xl leading-none text-brand-blue/25">&ldquo;</span>
        <p className="text-balance font-heading text-xl font-medium leading-snug text-navy md:text-2xl">
          {testimonial.quote}
        </p>
        <div className="mt-auto flex items-center gap-4">
          <div className="relative size-14 shrink-0 overflow-hidden rounded-full">
            <img
              src={testimonial.photo.src}
              alt={testimonial.photo.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="font-heading text-sm font-medium text-navy">
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
