import { Star } from "lucide-react";
import { getTestimonials } from "@/lib/content";
import { useContent } from "@/hooks/use-content";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

export function Testimonials() {
  const { data: testimonials, loading } = useContent(getTestimonials);

  // Empty-safe: this section simply doesn't render until the admin adds
  // real testimonials — no placeholder/fake content ever shown here.
  if (loading || !testimonials || testimonials.length === 0) return null;

  return (
    <section className="bg-bg-primary py-28 md:py-36">
      <div className="container-oasis mb-14">
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted by builders of ambition."
          description="What architects, developers and facility teams say after working with Oasis."
          align="center"
        />
      </div>

      <div className="container-oasis grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <RevealOnScroll
            key={t.id}
            className="flex flex-col gap-4 rounded-2xl border border-hairline bg-bg-secondary p-8"
          >
            {t.rating && (
              <div className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={
                      "size-4 " + (i < t.rating! ? "fill-accent-orange text-accent-orange" : "text-hairline")
                    }
                  />
                ))}
              </div>
            )}
            <p className="text-graphite leading-relaxed">"{t.quote}"</p>
            <div className="mt-auto flex items-center gap-3 pt-2">
              {t.photo && (
                <img src={t.photo} alt={t.clientName} className="size-10 shrink-0 rounded-full object-cover" />
              )}
              <div>
                <p className="font-heading text-sm font-medium text-navy">{t.clientName}</p>
                {(t.designation || t.company) && (
                  <p className="text-xs text-graphite">
                    {t.designation}
                    {t.designation && t.company ? ", " : ""}
                    {t.company}
                  </p>
                )}
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
