import { motion } from "framer-motion";
import type { CabinType } from "@/data/types";
import { LIGHTING_GLOW, MATERIAL_FLOOR, MATERIAL_WALL } from "./cabin-styles";

const doorTransition = { duration: 0.42, ease: [0.65, 0, 0.35, 1] as const, delay: 0.08 };

export function CabinIllustration({ type }: { type: CabinType }) {
  const isVerticalDoor = type.doorStyle === "vertical-lift";
  const wall = MATERIAL_WALL[type.panelMaterial];
  const floor = MATERIAL_FLOOR[type.panelMaterial];
  const glow = LIGHTING_GLOW[type.lightingTone];

  return (
    <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden border border-hairline">
      <div
        className="absolute inset-0 transition-[background] duration-500 ease-out"
        style={{ background: wall }}
      />

      <div
        className="absolute inset-x-6 top-3 h-1.5 rounded-full transition-[background,box-shadow] duration-500"
        style={{ background: glow, boxShadow: `0 0 24px 4px ${glow}66` }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

      <div
        className="absolute inset-x-0 bottom-0 h-[18%] transition-[background] duration-500"
        style={{ background: floor }}
      />

      <div
        className="absolute right-4 bottom-[20%] z-10 flex flex-col gap-1.5 border p-2"
        style={{ borderColor: `${type.accentColor}80`, background: "rgba(0,0,0,0.35)" }}
      >
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-1.5 rounded-full" style={{ background: type.accentColor }} />
        ))}
      </div>

      {/* Doors remount on every cabin switch (key={type.id}), so each selection
          replays a closed → open reveal — no manual timers to get out of sync. */}
      {isVerticalDoor ? (
        <motion.div
          key={`${type.id}-door`}
          className="absolute inset-x-0 top-0 z-20 bg-[#111111]"
          style={{ height: "55%" }}
          initial={{ y: "0%" }}
          animate={{ y: "-100%" }}
          transition={doorTransition}
        />
      ) : (
        <div key={`${type.id}-doors`}>
          <motion.div
            className="absolute inset-y-0 left-0 z-20 w-1/2 border-r border-black/40 bg-[#161616]"
            initial={{ x: "0%" }}
            animate={{ x: "-100%" }}
            transition={doorTransition}
          />
          <motion.div
            className="absolute inset-y-0 right-0 z-20 w-1/2 border-l border-black/40 bg-[#161616]"
            initial={{ x: "0%" }}
            animate={{ x: "100%" }}
            transition={doorTransition}
          />
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 z-30 border-t-8 border-b-4 border-black/40" />
    </div>
  );
}
