import { getCertifications } from "@/lib/content";
import { useContent } from "@/hooks/use-content";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

export function CertificationsSection() {
  const { data: certifications, loading } = useContent(getCertifications);

  // Empty-safe: this section simply doesn't render until the admin adds
  // real certifications — no placeholder/fake badges ever shown here.
  if (loading || !certifications || certifications.length === 0) return null;

  return (
    <section className="border-t border-hairline bg-surface py-24">
      <div className="container-oasis mb-12">
        <SectionHeading
          eyebrow="Certifications"
          title="Recognized and accredited."
          align="center"
        />
      </div>
      <div className="container-oasis grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {certifications.map((cert) => {
          const card = (
            <div className="flex h-full flex-col items-center gap-3 rounded-2xl border border-hairline bg-bg-primary p-6 text-center transition-shadow hover:shadow-md">
              {cert.image && <img src={cert.image} alt={cert.name} className="h-16 w-auto object-contain" />}
              <p className="font-heading text-sm font-medium text-navy">{cert.name}</p>
              {cert.issuer && <p className="text-xs text-graphite">{cert.issuer}</p>}
              {cert.year && <p className="text-xs text-graphite/70">{cert.year}</p>}
            </div>
          );
          return (
            <RevealOnScroll key={cert.id}>
              {cert.link ? (
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                  {card}
                </a>
              ) : (
                card
              )}
            </RevealOnScroll>
          );
        })}
      </div>
    </section>
  );
}
