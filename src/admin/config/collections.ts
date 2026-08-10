export type FieldType =
  | "text"
  | "slug"
  | "textarea"
  | "richtext"
  | "number"
  | "boolean"
  | "select"
  | "image"
  | "stringList";

export interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  /** For type "image" only — the paired alt-text column, if the table has one. */
  altKey?: string;
  helpText?: string;
}

export interface CollectionConfig {
  key: string;
  table: string;
  singular: string;
  plural: string;
  titleField: string;
  subtitleField?: string;
  imageField?: string;
  fields: FieldConfig[];
  helpText?: string;
}

export const collections: Record<string, CollectionConfig> = {
  whyOasis: {
    key: "whyOasis",
    table: "why_oasis_items",
    singular: "Why Oasis item",
    plural: "Why Oasis",
    titleField: "title",
    subtitleField: "eyebrow",
    imageField: "image_url",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Title", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea", required: true },
      { key: "image_url", label: "Image", type: "image", altKey: "image_alt" },
      {
        key: "image_position",
        label: "Image position",
        type: "select",
        options: ["left", "right"],
      },
    ],
  },
  products: {
    key: "products",
    table: "products",
    singular: "Product",
    plural: "Products",
    titleField: "name",
    subtitleField: "category",
    imageField: "image_url",
    fields: [
      { key: "slug", label: "Slug", type: "slug", required: true },
      { key: "name", label: "Name", type: "text", required: true },
      { key: "category", label: "Category", type: "text" },
      { key: "short_description", label: "Short description", type: "textarea", required: true },
      { key: "full_description", label: "Full description", type: "richtext" },
      { key: "image_url", label: "Image", type: "image", altKey: "image_alt" },
      { key: "features", label: "Features", type: "stringList" },
      { key: "applications", label: "Applications", type: "stringList" },
      { key: "ideal_for", label: "Ideal for", type: "text" },
      { key: "featured", label: "Featured", type: "boolean" },
    ],
  },
  services: {
    key: "services",
    table: "services",
    singular: "Service",
    plural: "Services",
    titleField: "title",
    imageField: "image_url",
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea", required: true },
      { key: "image_url", label: "Image", type: "image", altKey: "image_alt" },
      { key: "icon", label: "Icon (lucide-react name)", type: "text" },
      { key: "features", label: "Features", type: "stringList" },
      { key: "cta_text", label: "CTA text", type: "text" },
      { key: "cta_link", label: "CTA link", type: "text" },
    ],
  },
  industries: {
    key: "industries",
    table: "industries",
    singular: "Industry",
    plural: "Industries",
    titleField: "name",
    imageField: "image_url",
    fields: [
      { key: "slug", label: "Slug", type: "slug", required: true },
      { key: "name", label: "Name", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea" },
      { key: "image_url", label: "Image", type: "image", altKey: "image_alt" },
      { key: "icon", label: "Icon (lucide-react name)", type: "text" },
    ],
  },
  process: {
    key: "process",
    table: "process_steps",
    singular: "Process step",
    plural: "Our Process",
    titleField: "title",
    subtitleField: "short_label",
    imageField: "image_url",
    fields: [
      { key: "floor_number", label: "Floor number", type: "number" },
      { key: "title", label: "Title", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea", required: true },
      { key: "short_label", label: "Short label", type: "text" },
      { key: "icon", label: "Icon (lucide-react name)", type: "text" },
      { key: "image_url", label: "Image", type: "image" },
    ],
    helpText: "The elevator animation reads floor count directly from the number of published steps here.",
  },
  projects: {
    key: "projects",
    table: "projects",
    singular: "Project",
    plural: "Projects",
    titleField: "name",
    subtitleField: "location",
    imageField: "image_url",
    fields: [
      { key: "slug", label: "Slug", type: "slug", required: true },
      { key: "name", label: "Name", type: "text", required: true },
      { key: "location", label: "Location", type: "text" },
      { key: "client", label: "Client", type: "text" },
      { key: "project_type", label: "Project type", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "image_url", label: "Image", type: "image", altKey: "image_alt" },
      { key: "products_used", label: "Products used", type: "stringList" },
      { key: "completion_date", label: "Completion date (YYYY-MM-DD)", type: "text" },
      { key: "featured", label: "Featured", type: "boolean" },
    ],
  },
  testimonials: {
    key: "testimonials",
    table: "testimonials",
    singular: "Testimonial",
    plural: "Testimonials",
    titleField: "client_name",
    subtitleField: "company",
    imageField: "photo_url",
    fields: [
      { key: "client_name", label: "Client name", type: "text", required: true },
      { key: "company", label: "Company", type: "text" },
      { key: "designation", label: "Designation", type: "text" },
      { key: "testimonial", label: "Testimonial", type: "textarea", required: true },
      { key: "photo_url", label: "Photo", type: "image" },
      { key: "rating", label: "Rating (1–5)", type: "number" },
    ],
  },
  statistics: {
    key: "statistics",
    table: "statistics",
    singular: "Statistic",
    plural: "Statistics",
    titleField: "label",
    fields: [
      { key: "label", label: "Label", type: "text", required: true },
      { key: "value", label: "Value", type: "number", required: true },
      { key: "prefix", label: "Prefix", type: "text" },
      { key: "suffix", label: "Suffix", type: "text" },
    ],
  },
  certifications: {
    key: "certifications",
    table: "certifications",
    singular: "Certification",
    plural: "Certifications",
    titleField: "name",
    subtitleField: "issuing_organization",
    imageField: "image_url",
    fields: [
      { key: "name", label: "Certification name", type: "text", required: true },
      { key: "issuing_organization", label: "Issuing organization", type: "text" },
      { key: "image_url", label: "Certificate image", type: "image" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "year", label: "Year", type: "number" },
      { key: "link", label: "Link", type: "text" },
    ],
  },
  faqs: {
    key: "faqs",
    table: "faqs",
    singular: "FAQ",
    plural: "FAQ",
    titleField: "question",
    fields: [
      { key: "question", label: "Question", type: "text", required: true },
      { key: "answer", label: "Answer", type: "richtext", required: true },
      { key: "category", label: "Category", type: "text" },
    ],
  },
  clients: {
    key: "clients",
    table: "clients",
    singular: "Client",
    plural: "Clients",
    titleField: "name",
    imageField: "logo_url",
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "logo_url", label: "Logo", type: "image" },
    ],
  },
};
