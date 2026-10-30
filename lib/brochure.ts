// Served from /public, so it's a plain static file — not a router route.
export const BROCHURE_URL = "/Oasis.pdf";
export const BROCHURE_FILENAME = "Oasis-Elevators-Brochure.pdf";
export const BROCHURE_LABEL = "Brochure";

/** The brochure link is built in, so drop any CMS nav item with the same label
    (e.g. a "Brochure" entry added in /admin/navigation) to avoid a duplicate. */
export const isBrochureLabel = (label: string) =>
  label.trim().toLowerCase() === BROCHURE_LABEL.toLowerCase();
