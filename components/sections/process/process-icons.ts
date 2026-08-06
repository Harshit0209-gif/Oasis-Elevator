import {
  Users,
  Ruler,
  Compass,
  Factory,
  Wrench,
  ShieldCheck,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";

// Keyed by data/process-steps.ts id — presentation-only, kept out of the
// content layer so icon choices never touch step copy.
export const processStepIcons: Record<string, LucideIcon> = {
  consultation: Users,
  "site-survey": Ruler,
  engineering: Compass,
  manufacturing: Factory,
  installation: Wrench,
  testing: ShieldCheck,
  maintenance: RefreshCw,
};
