import { certifications } from "@/data/certifications";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function CertificationMarquee() {
  const track = [...certifications, ...certifications];

  return (
    <section className="border-y border-hairline bg-bg-secondary py-24">
      <div className="container-oasis mb-12">
        <SectionHeading
          eyebrow="Certifications"
          title="Engineering you can verify."
          align="center"
        />
      </div>

      <div className="group relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg-secondary to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg-secondary to-transparent" />

        <div className="flex w-max animate-marquee gap-16 group-hover:[animation-play-state:paused]">
          {track.map((cert, index) => (
            <div
              key={`${cert.id}-${index}`}
              className="flex w-56 flex-none flex-col items-center gap-2 rounded-2xl border border-hairline px-6 py-8 text-center shadow-sm"
            >
              <span className="font-heading text-lg font-medium tracking-[0.05em]">
                {cert.abbreviation}
              </span>
              <span className="text-xs uppercase tracking-[0.1em] text-graphite">
                {cert.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
