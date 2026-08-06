import { cabinTypes } from "@/data/cabin-config";
import {
  LIGHTING_GLOW,
  MATERIAL_FLOOR,
  MATERIAL_WALL,
} from "@/components/sections/elevator-experience/cabin-styles";
import { cn } from "@/lib/utils";

interface CabinPreviewProps {
  /** Matches a Product id / CabinType id (they share the same 7 ids by design). */
  cabinId: string;
  containerClassName?: string;
}

// Every "product photo" on the site is actually this — a static swatch of the
// same illustrated-cabin system used in the interactive configurator, rather
// than a stock photo standing in for hardware we don't have on hand yet.
export function CabinPreview({ cabinId, containerClassName }: CabinPreviewProps) {
  const type = cabinTypes.find((cabin) => cabin.id === cabinId) ?? cabinTypes[0];
  const wall = MATERIAL_WALL[type.panelMaterial];
  const floor = MATERIAL_FLOOR[type.panelMaterial];
  const glow = LIGHTING_GLOW[type.lightingTone];

  return (
    <div className={cn("group/preview relative overflow-hidden", containerClassName)}>
      <div className="absolute inset-0 transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/preview:scale-[1.06]">
        <div className="absolute inset-0" style={{ background: wall }} />
        <div
          className="absolute inset-x-[10%] top-[6%] h-[3px] rounded-full"
          style={{ background: glow, boxShadow: `0 0 20px 3px ${glow}55` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-black/45" />
        <div className="absolute inset-x-0 bottom-0 h-[16%]" style={{ background: floor }} />
        {/* Door seam — static here; this is the same mark that animates open in the configurator. */}
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-black/30" />
        <div
          className="absolute right-[6%] bottom-[20%] flex flex-col gap-1 border p-1.5"
          style={{ borderColor: `${type.accentColor}70`, background: "rgba(0,0,0,0.3)" }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-1 rounded-full"
              style={{ background: type.accentColor }}
            />
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
    </div>
  );
}
