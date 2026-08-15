// Hand-written to match supabase/migrations/*.sql exactly (no Supabase CLI
// available in this environment to auto-generate). Keep in sync with schema
// changes.

export type ContentStatus = "draft" | "published" | "archived";

interface OrderedRow {
  display_order: number;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
}

export interface SiteSettingsRow {
  id: 1;
  company_name: string;
  logo_url: string | null;
  favicon_url: string | null;
  phone: string | null;
  phone_secondary: string | null;
  emergency_phone: string | null;
  email: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
  geo_lat: number | null;
  geo_lng: number | null;
  facebook_url: string | null;
  linkedin_url: string | null;
  instagram_url: string | null;
  primary_cta_text: string | null;
  primary_cta_link: string | null;
  copyright_text: string | null;
  google_analytics_id: string | null;
  updated_at: string;
}

export interface HeroRow {
  id: 1;
  heading: string;
  subheading: string | null;
  description: string | null;
  badge_text: string | null;
  supporting_text: string | null;
  primary_cta_text: string | null;
  primary_cta_link: string | null;
  secondary_cta_text: string | null;
  secondary_cta_link: string | null;
  image_url: string | null;
  video_url: string | null;
  updated_at: string;
}

export interface AboutSupportingPoint {
  title: string;
  description: string;
}

export interface AboutMissionItem {
  icon: string;
  title: string;
  description: string;
}

export interface AboutSectionRow {
  id: 1;
  title: string;
  subtitle: string | null;
  description: string | null;
  image_url: string | null;
  supporting_points: AboutSupportingPoint[];
  mission_items: AboutMissionItem[];
  cta_text: string | null;
  cta_link: string | null;
  updated_at: string;
}

export interface FooterSectionRow {
  id: 1;
  description: string | null;
  business_hours: string | null;
  copyright_text: string | null;
  updated_at: string;
}

export interface WhyOasisItemRow extends OrderedRow {
  id: string;
  eyebrow: string | null;
  title: string;
  description: string;
  image_url: string | null;
  image_alt: string | null;
  image_position: "left" | "right";
}

export interface ProductRow extends OrderedRow {
  id: string;
  slug: string;
  name: string;
  category: string | null;
  short_description: string | null;
  full_description: string | null;
  image_url: string | null;
  image_alt: string | null;
  features: string[];
  applications: string[];
  ideal_for: string | null;
  specifications: Record<string, string>;
  featured: boolean;
}

export interface ProductGalleryRow {
  id: string;
  product_id: string;
  image_url: string;
  alt_text: string | null;
  display_order: number;
}

export interface ServiceRow extends OrderedRow {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  image_alt: string | null;
  icon: string | null;
  features: string[];
  cta_text: string | null;
  cta_link: string | null;
}

export interface IndustryRow extends OrderedRow {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  image_url: string | null;
  image_alt: string | null;
  icon: string | null;
}

export interface ProcessStepRow extends OrderedRow {
  id: string;
  floor_number: number | null;
  title: string;
  description: string;
  short_label: string | null;
  icon: string | null;
  image_url: string | null;
}

export interface ProjectRow extends OrderedRow {
  id: string;
  slug: string;
  name: string;
  location: string | null;
  client: string | null;
  project_type: string | null;
  description: string | null;
  image_url: string | null;
  image_alt: string | null;
  products_used: string[];
  completion_date: string | null;
  featured: boolean;
}

export interface ProjectGalleryRow {
  id: string;
  project_id: string;
  image_url: string;
  alt_text: string | null;
  display_order: number;
}

export interface TestimonialRow extends OrderedRow {
  id: string;
  client_name: string;
  company: string | null;
  designation: string | null;
  testimonial: string;
  photo_url: string | null;
  rating: number | null;
}

export interface StatisticRow extends OrderedRow {
  id: string;
  label: string;
  value: number;
  prefix: string | null;
  suffix: string | null;
}

export interface CertificationRow extends OrderedRow {
  id: string;
  name: string;
  issuing_organization: string | null;
  image_url: string | null;
  description: string | null;
  year: number | null;
  link: string | null;
}

export interface FaqRow extends OrderedRow {
  id: string;
  question: string;
  answer: string;
  category: string | null;
}

export interface ClientRow extends OrderedRow {
  id: string;
  name: string;
  logo_url: string | null;
}

export interface NavigationItemRow {
  id: string;
  menu_name: string;
  link: string;
  is_external: boolean;
  display_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface SeoSettingsRow {
  id: string;
  page_slug: string;
  page_title: string | null;
  meta_description: string | null;
  keywords: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image_url: string | null;
  canonical_url: string | null;
  robots: string;
  updated_at: string;
}

export interface MediaRow {
  id: string;
  filename: string;
  storage_path: string;
  bucket_id: string;
  public_url: string;
  alt_text: string | null;
  mime_type: string | null;
  file_size: number | null;
  width: number | null;
  height: number | null;
  created_at: string;
  created_by: string | null;
}

export interface ActivityLogRow {
  id: string;
  admin_id: string | null;
  admin_name: string | null;
  action: string;
  table_name: string;
  record_id: string | null;
  record_label: string | null;
  details: Record<string, unknown> | null;
  created_at: string;
}

export interface AdminProfileRow {
  id: string;
  user_id: string;
  name: string;
  role: "admin" | "editor";
  is_active: boolean;
  created_at: string;
}

// Minimal Database shape — enough for supabase-js's generic typing without
// hand-maintaining the full Insert/Update/Relationships variants per table.
export interface Database {
  public: {
    Tables: {
      site_settings: { Row: SiteSettingsRow; Insert: Partial<SiteSettingsRow>; Update: Partial<SiteSettingsRow> };
      hero: { Row: HeroRow; Insert: Partial<HeroRow>; Update: Partial<HeroRow> };
      about_section: { Row: AboutSectionRow; Insert: Partial<AboutSectionRow>; Update: Partial<AboutSectionRow> };
      footer_section: { Row: FooterSectionRow; Insert: Partial<FooterSectionRow>; Update: Partial<FooterSectionRow> };
      why_oasis_items: { Row: WhyOasisItemRow; Insert: Partial<WhyOasisItemRow>; Update: Partial<WhyOasisItemRow> };
      products: { Row: ProductRow; Insert: Partial<ProductRow>; Update: Partial<ProductRow> };
      product_gallery: { Row: ProductGalleryRow; Insert: Partial<ProductGalleryRow>; Update: Partial<ProductGalleryRow> };
      services: { Row: ServiceRow; Insert: Partial<ServiceRow>; Update: Partial<ServiceRow> };
      industries: { Row: IndustryRow; Insert: Partial<IndustryRow>; Update: Partial<IndustryRow> };
      process_steps: { Row: ProcessStepRow; Insert: Partial<ProcessStepRow>; Update: Partial<ProcessStepRow> };
      projects: { Row: ProjectRow; Insert: Partial<ProjectRow>; Update: Partial<ProjectRow> };
      project_gallery: { Row: ProjectGalleryRow; Insert: Partial<ProjectGalleryRow>; Update: Partial<ProjectGalleryRow> };
      testimonials: { Row: TestimonialRow; Insert: Partial<TestimonialRow>; Update: Partial<TestimonialRow> };
      statistics: { Row: StatisticRow; Insert: Partial<StatisticRow>; Update: Partial<StatisticRow> };
      certifications: { Row: CertificationRow; Insert: Partial<CertificationRow>; Update: Partial<CertificationRow> };
      faqs: { Row: FaqRow; Insert: Partial<FaqRow>; Update: Partial<FaqRow> };
      clients: { Row: ClientRow; Insert: Partial<ClientRow>; Update: Partial<ClientRow> };
      navigation_items: { Row: NavigationItemRow; Insert: Partial<NavigationItemRow>; Update: Partial<NavigationItemRow> };
      seo_settings: { Row: SeoSettingsRow; Insert: Partial<SeoSettingsRow>; Update: Partial<SeoSettingsRow> };
      media: { Row: MediaRow; Insert: Partial<MediaRow>; Update: Partial<MediaRow> };
      activity_logs: { Row: ActivityLogRow; Insert: Partial<ActivityLogRow>; Update: Partial<ActivityLogRow> };
      admin_profiles: { Row: AdminProfileRow; Insert: Partial<AdminProfileRow>; Update: Partial<AdminProfileRow> };
    };
  };
}
