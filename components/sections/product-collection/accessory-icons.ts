import { DoorOpen, Cpu, LayoutPanelLeft, Gauge, Cog, type LucideIcon } from "lucide-react";

// Keyed by data/accessories.ts id — presentation-only, kept out of the
// content layer so icon choices never touch the copy.
export const accessoryIcons: Record<string, LucideIcon> = {
  "cabin-cage": LayoutPanelLeft,
  "gate-door": DoorOpen,
  "cop-lop": Cpu,
  controller: Gauge,
  machine: Cog,
};
