import { certifications } from "@/data/certifications";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AutoScrollMarquee } from "@/components/shared/AutoScrollMarquee";

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

      <AutoScrollMarquee gapClassName="gap-16" fadeFromClassName="from-bg-secondary">
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
      </AutoScrollMarquee>
    </section>
  );
}
