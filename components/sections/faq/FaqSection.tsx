import { getFaqs } from "@/lib/content";
import { useContent } from "@/hooks/use-content";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionLoader } from "@/components/shared/SectionLoader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
  const { data: faqs, loading } = useContent(getFaqs);

  return (
    <section className="bg-bg-primary py-28 md:py-36">
      <div className="container-oasis grid grid-cols-1 gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered."
          description="Everything you need to know before your first consultation."
        />

        {loading || !faqs ? (
          <SectionLoader />
        ) : (
          <Accordion type="single" collapsible className="flex flex-col">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-hairline py-2">
                <AccordionTrigger className="py-5 font-heading text-base font-medium hover:no-underline md:text-lg [&_svg]:text-brand-blue">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-relaxed text-graphite">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </section>
  );
}
