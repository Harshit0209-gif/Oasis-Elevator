"use client";

import { forwardRef } from "react";

export const ShaftTrack = forwardRef<HTMLDivElement>((_props, carRef) => {
  return (
    <>
      <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-hairline" />
      <div
        ref={carRef}
        data-shaft-car
        className="absolute left-1/2 z-10 flex h-14 w-11 -translate-x-1/2 items-center justify-center border border-gold bg-bg-secondary shadow-[0_0_28px_rgba(200,169,106,0.35)]"
        style={{ top: "100%" }}
      >
        <div className="h-8 w-6 border border-gold/50" />
      </div>
    </>
  );
});
ShaftTrack.displayName = "ShaftTrack";
