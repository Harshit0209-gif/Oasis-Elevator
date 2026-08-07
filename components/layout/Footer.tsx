import { navLinks } from "@/data/nav";
import { companyInfo } from "@/data/company";
import { products } from "@/data/products";
import { Logo } from "@/components/shared/Logo";
import { AnimatedUnderlineLink } from "@/components/shared/AnimatedUnderlineLink";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "@/components/shared/SocialIcons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy">
      <div className="container-oasis grid grid-cols-1 gap-12 py-20 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="flex flex-col gap-6">
          <Logo variant="chip" />
          <p className="max-w-xs text-sm leading-relaxed text-white/70">
            {companyInfo.tagline} — premium vertical mobility engineered for architecture that
            demands more.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={companyInfo.socials.facebook}
              aria-label="Oasis Elevators on Facebook"
              className="text-accent-blue transition-colors hover:text-accent-orange"
            >
              <FacebookIcon className="size-5" />
            </a>
            <a
              href={companyInfo.socials.linkedin}
              aria-label="Oasis Elevators on LinkedIn"
              className="text-accent-blue transition-colors hover:text-accent-orange"
            >
              <LinkedInIcon className="size-5" />
            </a>
            <a
              href={companyInfo.socials.instagram}
              aria-label="Oasis Elevators on Instagram"
              className="text-accent-blue transition-colors hover:text-accent-orange"
            >
              <InstagramIcon className="size-5" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-heading text-xs font-medium uppercase tracking-[0.25em] text-white/50">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
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
            {products.slice(0, 6).map((product) => (
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
          <ul className="flex flex-col gap-3 text-sm text-white/80">
            <li>
              {companyInfo.address.line1}, {companyInfo.address.line2}
              <br />
              {companyInfo.address.city}, {companyInfo.address.state} {companyInfo.address.postalCode}
            </li>
            <li>
              <a href={`tel:${companyInfo.phone}`} className="hover:text-accent-orange">
                {companyInfo.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${companyInfo.email}`} className="hover:text-accent-orange">
                {companyInfo.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-oasis flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/60 md:flex-row">
          <p>
            © {year} {companyInfo.legalName}. All rights reserved.
          </p>
          <p>Engineered in India.</p>
        </div>
      </div>
    </footer>
  );
}
