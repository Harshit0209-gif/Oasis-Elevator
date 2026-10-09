import { supabase } from "./supabase";
import type {
  Industry,
  Product,
  Service,
  ProcessStep,
  WhyOasisFeature,
  Client,
  Faq,
  Stat,
  NavLink,
} from "@/data/types";
import type {
  HeroRow,
  AboutSectionRow,
  FooterSectionRow,
  SiteSettingsRow,
  SeoSettingsRow,
  NavigationItemRow,
  WhyOasisItemRow,
  ProductRow,
  ServiceRow,
  IndustryRow,
  ProcessStepRow,
  ClientRow,
  FaqRow,
  StatisticRow,
  TestimonialRow,
  CertificationRow,
} from "@/data/supabase-types";

async function fetchPublished<T>(table: string, orderBy = "display_order"): Promise<T[]> {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("status", "published")
    .order(orderBy, { ascending: true });
  if (error) throw error;
  return (data as T[]) ?? [];
}

// ============================================================
// Singletons
// ============================================================

export interface HeroContent {
  badge: string;
  heading: string;
  subheading: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  image: { src: string; alt: string };
}

export async function getHero(): Promise<HeroContent> {
  const { data, error } = await supabase.from("hero").select("*").eq("id", 1).single();
  if (error) throw error;
  const row = data as HeroRow;
  return {
    badge: row.badge_text ?? "",
    heading: row.heading,
    subheading: row.subheading ?? "",
    description: row.description ?? "",
    primaryCtaText: row.primary_cta_text ?? "",
    primaryCtaLink: row.primary_cta_link ?? "/services",
    secondaryCtaText: row.secondary_cta_text ?? "",
    secondaryCtaLink: row.secondary_cta_link ?? "/contact",
    image: { src: row.image_url ?? "", alt: row.heading },
  };
}

export interface AboutContent {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  supportingPoints: { title: string; description: string }[];
  missionItems: { icon: string; title: string; description: string }[];
}

export async function getAboutSection(): Promise<AboutContent> {
  const { data, error } = await supabase.from("about_section").select("*").eq("id", 1).single();
  if (error) throw error;
  const row = data as AboutSectionRow;
  return {
    title: row.title,
    subtitle: row.subtitle ?? "",
    description: row.description ?? "",
    image: row.image_url ?? "",
    supportingPoints: row.supporting_points ?? [],
    missionItems: row.mission_items ?? [],
  };
}

export async function getFooterSection(): Promise<FooterSectionRow> {
  const { data, error } = await supabase.from("footer_section").select("*").eq("id", 1).single();
  if (error) throw error;
  return data as FooterSectionRow;
}

export interface CompanyContent {
  legalName: string;
  tagline: string;
  phone: string;
  phoneSecondary: string;
  emergencyPhone: string;
  email: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  geo: { lat: number; lng: number };
  socials: { facebook: string; linkedin: string; instagram: string };
  primaryCtaText: string;
  primaryCtaLink: string;
  copyrightText: string;
}

export async function getSiteSettings(): Promise<CompanyContent> {
  const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).single();
  if (error) throw error;
  const row = data as SiteSettingsRow;
  return {
    legalName: row.company_name,
    tagline: row.primary_cta_text ?? "",
    phone: row.phone ?? "",
    phoneSecondary: row.phone_secondary ?? "",
    emergencyPhone: row.emergency_phone ?? "",
    email: row.email ?? "",
    address: {
      line1: row.address_line1 ?? "",
      line2: row.address_line2 ?? "",
      city: row.city ?? "",
      state: row.state ?? "",
      postalCode: row.postal_code ?? "",
      country: row.country ?? "",
    },
    geo: { lat: row.geo_lat ?? 0, lng: row.geo_lng ?? 0 },
    socials: {
      facebook: row.facebook_url ?? "",
      linkedin: row.linkedin_url ?? "",
      instagram: row.instagram_url ?? "",
    },
    primaryCtaText: row.primary_cta_text ?? "Request Quote",
    primaryCtaLink: row.primary_cta_link ?? "/contact",
    copyrightText: row.copyright_text ?? "",
  };
}

export async function getSeoSettings(pageSlug: string) {
  const { data } = await supabase.from("seo_settings").select("*").eq("page_slug", pageSlug).maybeSingle();
  return data as SeoSettingsRow | null;
}

export async function getNavigation(): Promise<NavLink[]> {
  const { data, error } = await supabase
    .from("navigation_items")
    .select("*")
    .eq("is_visible", true)
    .order("display_order", { ascending: true });
  if (error) throw error;
  return ((data as NavigationItemRow[]) ?? []).map((row) => ({ label: row.menu_name, href: row.link }));
}

// ============================================================
// Collections — mapped to the same shapes components already expect
// ============================================================

export async function getWhyOasisItems(): Promise<WhyOasisFeature[]> {
  const rows = await fetchPublished<WhyOasisItemRow>("why_oasis_items");
  return rows.map((row) => ({
    id: row.id,
    eyebrow: row.eyebrow ?? "",
    title: row.title,
    description: row.description,
    image: { src: row.image_url ?? "", alt: row.image_alt ?? row.title },
    imagePosition: row.image_position,
  }));
}

export async function getProducts(): Promise<Product[]> {
  const rows = await fetchPublished<ProductRow>("products");
  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category ?? "",
    shortDescription: row.short_description ?? "",
    features: row.features ?? [],
    idealFor: row.ideal_for ?? "",
    image: { src: row.image_url ?? "", alt: row.image_alt ?? row.name },
  }));
}

export async function getServices(): Promise<Service[]> {
  const rows = await fetchPublished<ServiceRow>("services");
  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    features: row.features ?? undefined,
    image: { src: row.image_url ?? "", alt: row.image_alt ?? row.title },
    icon: row.icon ?? undefined,
  }));
}

export async function getIndustries(): Promise<Industry[]> {
  const rows = await fetchPublished<IndustryRow>("industries");
  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description ?? "",
    image: { src: row.image_url ?? "", alt: row.image_alt ?? row.name },
    icon: row.icon ?? undefined,
  }));
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  const rows = await fetchPublished<ProcessStepRow>("process_steps");
  return rows.map((row, index) => ({
    id: row.id,
    order: row.floor_number ?? index + 1,
    title: row.title,
    description: row.description,
    icon: row.icon ?? undefined,
  }));
}

export async function getClients(): Promise<Client[]> {
  const rows = await fetchPublished<ClientRow>("clients");
  return rows.map((row) => ({ id: row.id, name: row.name }));
}

export async function getFaqs(): Promise<Faq[]> {
  const rows = await fetchPublished<FaqRow>("faqs");
  return rows.map((row) => ({ id: row.id, question: row.question, answer: row.answer }));
}

export async function getStatistics(): Promise<Stat[]> {
  const rows = await fetchPublished<StatisticRow>("statistics");
  return rows.map((row) => ({
    id: row.id,
    value: row.value,
    prefix: row.prefix ?? undefined,
    suffix: row.suffix ?? undefined,
    label: row.label,
  }));
}

export interface TestimonialContent {
  id: string;
  clientName: string;
  company: string;
  designation: string;
  quote: string;
  photo?: string;
  rating?: number;
}

export async function getTestimonials(): Promise<TestimonialContent[]> {
  const rows = await fetchPublished<TestimonialRow>("testimonials");
  return rows.map((row) => ({
    id: row.id,
    clientName: row.client_name,
    company: row.company ?? "",
    designation: row.designation ?? "",
    quote: row.testimonial,
    photo: row.photo_url ?? undefined,
    rating: row.rating ?? undefined,
  }));
}

export interface CertificationContent {
  id: string;
  name: string;
  issuer: string;
  image?: string;
  description: string;
  year?: number;
  link?: string;
}

export async function getCertifications(): Promise<CertificationContent[]> {
  const rows = await fetchPublished<CertificationRow>("certifications");
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    issuer: row.issuing_organization ?? "",
    image: row.image_url ?? undefined,
    description: row.description ?? "",
    year: row.year ?? undefined,
    link: row.link ?? undefined,
  }));
}
