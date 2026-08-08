import { clients } from "@/data/clients";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AutoScrollMarquee } from "@/components/shared/AutoScrollMarquee";

export function ClientsMarquee() {
  const track = [...clients, ...clients];

  return (
    <section className="bg-bg-secondary py-28 md:py-36">
      <div className="container-oasis mb-14">
        <SectionHeading
          eyebrow="Clients"
          title="Builders who trust us."
          description="Developers and contractors who bring Oasis in to engineer their vertical mobility."
          align="center"
        />
      </div>

      <AutoScrollMarquee gapClassName="gap-6" fadeFromClassName="from-bg-secondary">
        {track.map((client, index) => (
          <div
            key={`${client.id}-${index}`}
            className="flex w-64 flex-none items-center justify-center rounded-2xl border border-hairline px-6 py-8 text-center shadow-sm"
          >
            <span className="font-heading text-lg font-medium tracking-[0.02em] text-navy">
              {client.name}
            </span>
          </div>
        ))}
      </AutoScrollMarquee>
    </section>
  );
}
