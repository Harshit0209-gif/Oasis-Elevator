import { getSeoSettings } from "@/lib/content";
import { useContent } from "./use-content";

/** CMS-managed page title/description, falling back to the given defaults
 * until the fetch resolves (or if the admin hasn't set anything yet). */
export function useSeo(pageSlug: string, fallbackTitle: string, fallbackDescription: string) {
  const { data } = useContent(() => getSeoSettings(pageSlug), [pageSlug]);
  return {
    title: data?.page_title || fallbackTitle,
    description: data?.meta_description || fallbackDescription,
  };
}
