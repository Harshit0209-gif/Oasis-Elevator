import { getNavigation, getSiteSettings, getProducts, getFooterSection } from "@/lib/content";
import { useContent } from "@/hooks/use-content";
import { useContactModal } from "@/lib/contact-modal-context";
import { Logo } from "@/components/shared/Logo";
import { AnimatedUnderlineLink } from "@/components/shared/AnimatedUnderlineLink";
import { Button } from "@/components/ui/button";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "@/components/shared/SocialIcons";

export function Footer() {
  const year = new Date().getFullYear();
  const { data: navLinks } = useContent(getNavigation);
  const { data: settings } = useContent(getSiteSettings);
  const { data: products } = useContent(getProducts);
  const { data: footerSection } = useContent(getFooterSection);
  const { open: openContactModal } = useContactModal();

  return (
    <footer className="bg-navy">
      <div className="container-oasis grid grid-cols-1 gap-12 py-20 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="flex flex-col gap-6">
          <Logo variant="chip" />
          <p className="max-w-xs text-sm leading-relaxed text-white/70">{footerSection?.description}</p>
          {settings && (
            <div className="flex items-center gap-4">
              <a
                href={settings.socials.facebook}
                aria-label="Oasis Elevators on Facebook"
                className="text-accent-blue transition-colors hover:text-accent-orange"
              >
                <FacebookIcon className="size-5" />
              </a>
              <a
                href={settings.socials.linkedin}
                aria-label="Oasis Elevators on LinkedIn"
                className="text-accent-blue transition-colors hover:text-accent-orange"
              >
                <LinkedInIcon className="size-5" />
              </a>
              <a
                href={settings.socials.instagram}
                aria-label="Oasis Elevators on Instagram"
                className="text-accent-blue transition-colors hover:text-accent-orange"
              >
                <InstagramIcon className="size-5" />
              </a>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-heading text-xs font-medium uppercase tracking-[0.25em] text-white/50">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-3">
            {(navLinks ?? []).map((link) => (
              <li key={link.href}>
                <AnimatedUnderlineLink
                  href={link.href}
                  className="text-sm text-white/80 hover:text-white"
                >
                  {link.label}
                </AnimatedUnderlineLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-heading text-xs font-medium uppercase tracking-[0.25em] text-white/50">
            Products
          </h3>
          <ul className="flex flex-col gap-3">
            {(products ?? []).slice(0, 6).map((product) => (
              <li key={product.id}>
                <AnimatedUnderlineLink
                  href={`/products#${product.slug}`}
                  className="text-sm text-white/80 hover:text-white"
                >
                  {product.name}
                </AnimatedUnderlineLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-heading text-xs font-medium uppercase tracking-[0.25em] text-white/50">
            Contact
          </h3>
          {settings && (
            <ul className="flex flex-col gap-3 text-sm text-white/80">
              <li>
                {settings.address.line1}, {settings.address.line2}
                <br />
                {settings.address.city}, {settings.address.state} {settings.address.postalCode}
              </li>
              <li>
                <a href={`tel:${settings.phone}`} className="hover:text-accent-orange">
                  {settings.phone}
                </a>
                {settings.phoneSecondary && (
                  <>
                    {" / "}
                    <a href={`tel:${settings.phoneSecondary}`} className="hover:text-accent-orange">
                      {settings.phoneSecondary}
                    </a>
                  </>
                )}
              </li>
              <li>
                <a href={`mailto:${settings.email}`} className="hover:text-accent-orange">
                  {settings.email}
                </a>
              </li>
            </ul>
          )}
          <Button variant="outline-light" size="sm" onClick={openContactModal} className="w-fit">
            Request a Consultation
          </Button>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-oasis flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/60 md:flex-row">
          <p>
            © {year} {footerSection?.copyright_text ?? settings?.legalName}
          </p>
          <p>Engineered in India.</p>
        </div>
      </div>
    </footer>
  );
}
