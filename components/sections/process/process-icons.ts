import {
  Users,
  Ruler,
  Compass,
  Factory,
  Wrench,
  ShieldCheck,
  RefreshCw,
  Settings,
  type LucideIcon,
} from "lucide-react";

// Keyed by icon NAME (a plain string stored in the CMS, e.g. "Users") rather
// than by step id — the admin can add/remove/rename steps freely, so the
// icon can't be tied to a fixed set of known ids anymore. Curated allow-list
// (not a dynamic `(LucideIcons as any)[name]` lookup) so an unexpected
// string can never resolve to something unintended.
const iconByName: Record<string, LucideIcon> = {
  Users,
  Ruler,
  Compass,
  Factory,
  Wrench,
  ShieldCheck,
  RefreshCw,
};

export function resolveProcessIcon(name: string | undefined | null): LucideIcon {
  if (name && iconByName[name]) return iconByName[name];
  return Settings;
}
