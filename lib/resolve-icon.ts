import {
  HardHat,
  Wrench,
  RefreshCw,
  Users,
  Ruler,
  Compass,
  Factory,
  ShieldCheck,
  Home,
  Building2,
  HeartPulse,
  Hotel,
  Store,
  GraduationCap,
  Handshake,
  Timer,
  Settings,
  type LucideIcon,
} from "lucide-react";

// Curated allow-list (not a dynamic `(LucideIcons as any)[name]` lookup) so a
// CMS-supplied icon name string can never resolve to something unintended —
// used by Services, Industries and Process Steps, all of which store the
// icon as a plain string name.
const registry: Record<string, LucideIcon> = {
  HardHat,
  Wrench,
  RefreshCw,
  Users,
  Ruler,
  Compass,
  Factory,
  ShieldCheck,
  Home,
  Building2,
  HeartPulse,
  Hotel,
  Store,
  GraduationCap,
  Handshake,
  Timer,
};

export function resolveIcon(name: string | undefined | null): LucideIcon {
  if (name && registry[name]) return registry[name];
  return Settings;
}
