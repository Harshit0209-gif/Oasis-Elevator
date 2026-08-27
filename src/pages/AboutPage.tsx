import {
  Compass,
  Award,
  ShieldCheck,
  RefreshCw,
  Handshake,
} from 'lucide-react';
import { Seo, LocalBusinessJsonLd } from '@/lib/seo';
import { getAboutSection } from '@/lib/content';
import { useContent } from '@/hooks/use-content';
import { useSeo } from '@/hooks/use-seo';
import { resolveIcon } from '@/lib/resolve-icon';
import { OptimizedImage } from '@/components/shared/OptimizedImage';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { TrustIndicators } from '@/components/sections/trust-indicators/TrustIndicators';
import { CertificationsSection } from '@/components/sections/certifications/CertificationsSection';
import { CtaBand } from '@/components/shared/CtaBand';
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import { SectionLoader } from '@/components/shared/SectionLoader';
import { fadeUp, slideInRight } from '@/lib/motion';

// Static, non-CMS accents that dress up the CMS-driven copy below — kept
// intentionally small in number and grounded in claims made elsewhere on the
// site (licensing, 24x7 maintenance, the certifications section) rather than
// invented ones.
const HERO_BADGES = [
  { icon: ShieldCheck, label: 'Licensed & Certified' },
  { icon: RefreshCw, label: '24×7 Maintenance' },
  { icon: Handshake, label: 'Client-First Approach' },
];

const SUPPORTING_ICONS = [Compass, Award];

export function AboutPage() {
  const { data: about, loading } = useContent(getAboutSection);
  const seo = useSeo(
    'about',
    'About',
    "Since 2015, Oasis Elevators has engineered premium vertical mobility for Kolkata's most ambitious buildings.",
  );

  const title = about?.title || 'Possibilities unlimited.';
  const titleWords = title.split(' ');
  const titleLead = titleWords.slice(0, -1).join(' ');
  const titleAccent = titleWords.slice(-1).join(' ');

  return (
    <>
      <Seo title={seo.title} description={seo.description} path='/about' />
      <LocalBusinessJsonLd />

      {/* Split hero — text left, real lobby photography right */}
      <section className='relative overflow-hidden bg-gradient-to-br from-bg-secondary via-bg-primary to-brand-blue/5 pt-40 pb-16 md:pt-48 md:pb-20'>
        <div className='container-oasis grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16'>
          <div className='flex flex-col gap-6'>
            <RevealOnScroll>
              <span className='font-heading text-xs font-medium uppercase tracking-[0.3em] text-brand-blue'>
                About Oasis
              </span>
            </RevealOnScroll>
            <RevealOnScroll variants={fadeUp} delay={0.08}>
              <h1 className='text-balance font-heading text-5xl leading-[1.05] font-medium md:text-6xl lg:text-7xl'>
                <span className='block text-navy'>{titleLead}</span>
                <span className='block text-brand-blue'>{titleAccent}</span>
              </h1>
            </RevealOnScroll>
            {about?.description && (
              <RevealOnScroll delay={0.16}>
                <p className='max-w-lg text-balance text-base text-graphite md:text-lg'>
                  {about.description}
                </p>
              </RevealOnScroll>
            )}
            <RevealOnScroll delay={0.24} className='flex flex-wrap gap-3'>
              {HERO_BADGES.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className='flex items-center gap-2 rounded-full border border-hairline bg-bg-secondary/80 px-4 py-2 text-xs font-medium text-navy shadow-sm'
                >
                  <Icon className='size-4 text-brand-blue' strokeWidth={1.75} />
                  {label}
                </span>
              ))}
            </RevealOnScroll>
          </div>

          <RevealOnScroll variants={slideInRight} delay={0.1}>
            <OptimizedImage
              src='/Hero.png'
              alt='Premium glass-walled elevator lobby with a stainless steel cabin'
              fill
              priority
              sizes='(min-width: 1024px) 27vw, 50vw'
              containerClassName='aspect-[4/3] w-full rounded-2xl border border-hairline shadow-xl lg:aspect-[3/4]'
            />
          </RevealOnScroll>
        </div>
      </section>

      <section className='bg-bg-primary py-24'>
        {loading || !about ? (
          <SectionLoader />
        ) : (
          <>
            <div className='container-oasis grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-20'>
              {about.supportingPoints.map((point, i) => {
                const Icon = SUPPORTING_ICONS[i] ?? Compass;
                return (
                  <RevealOnScroll
                    key={point.title}
                    delay={i * 0.1}
                    className='flex flex-col gap-5'
                  >
                    <div className='flex size-11 items-center justify-center rounded-full bg-brand-blue/8'>
                      <Icon
                        className='size-5 text-brand-blue'
                        strokeWidth={1.75}
                      />
                    </div>
                    <h2 className='font-heading text-2xl font-medium md:text-3xl'>
                      {point.title}
                    </h2>
                    <p className='text-graphite leading-relaxed'>
                      {point.description}
                    </p>
                  </RevealOnScroll>
                );
              })}
            </div>

            {/* {about.image && (
              <RevealOnScroll delay={0.15} className='container-oasis mt-16'>
                <div className='mx-auto max-w-3xl overflow-hidden rounded-2xl border border-hairline bg-bg-secondary p-6 shadow-sm md:p-10'>
                  <img
                    src={about.image}
                    alt='Exploded-view diagram of an elevator system — machine, guide rails, cabin, buffer and counterweight — alongside plan view, hoistway elevation and specification table'
                    className='w-full'
                    loading='lazy'
                  />
                </div>
              </RevealOnScroll>
            )} */}

            {/* Full-bleed mood photo with an overlaid tagline card */}
            <RevealOnScroll delay={0.1} className='container-oasis mt-16'>
              <div className='relative aspect-[16/9] w-full overflow-hidden rounded-2xl md:aspect-[21/9]'>
                <OptimizedImage
                  src='sketch.png'
                  alt='Glass-walled elevator shaft in a modern stairwell'
                  fill
                  sizes='100vw'
                  containerClassName='absolute inset-0'
                />
                <div className='absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/40 to-transparent' />
                <div className='absolute inset-y-0 left-0 flex max-w-sm flex-col justify-center gap-3 p-8 md:p-12'>
                  <h3 className='font-heading text-3xl font-medium leading-tight text-white md:text-4xl'>
                    Precise.
                    <br />
                    Reliable.
                    <br />
                    Enduring.
                  </h3>
                  <p className='text-white/70'>
                    Engineering vertical mobility built on trust.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </>
        )}
      </section>

      {!loading && about && about.missionItems.length > 0 && (
        <section className='border-t border-hairline bg-surface py-24'>
          <div className='container-oasis mb-12'>
            <SectionHeading
              eyebrow='Our Approach'
              title='Principles behind every project.'
            />
          </div>
          <div className='container-oasis grid grid-cols-1 gap-6 sm:grid-cols-3'>
            {about.missionItems.map((item, i) => {
              const Icon = resolveIcon(item.icon);
              return (
                <RevealOnScroll
                  key={item.title}
                  delay={i * 0.1}
                  className='flex flex-col gap-4 rounded-2xl border border-hairline bg-bg-primary p-8'
                >
                  <div className='flex items-center gap-3'>
                    <div className='flex size-11 items-center justify-center rounded-full bg-brand-blue/8'>
                      <Icon
                        className='size-5 text-brand-blue'
                        strokeWidth={1.75}
                      />
                    </div>
                    <span className='font-heading text-sm font-medium text-hairline'>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className='font-heading text-lg font-medium'>
                    {item.title}
                  </h3>
                  <p className='text-sm leading-relaxed text-graphite'>
                    {item.description}
                  </p>
                </RevealOnScroll>
              );
            })}
          </div>
        </section>
      )}

      <TrustIndicators />
      <CertificationsSection />

      <CtaBand
        title="Let's build something worth engineering."
        description="Tell us about your next project — we'd love to be part of it."
      />
    </>
  );
}
