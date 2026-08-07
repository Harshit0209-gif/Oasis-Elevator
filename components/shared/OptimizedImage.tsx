import type { ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "className"> {
  containerClassName?: string;
  className?: string;
  zoom?: boolean;
  /** Kept for call-site compatibility; every usage fills its container. */
  fill?: boolean;
  priority?: boolean;
}

// Standard image treatment used across sections: a clipped container with a
// slow zoom on hover — no per-section reimplementation of the same effect.
export function OptimizedImage({
  containerClassName,
  className,
  zoom = true,
  alt,
  fill: _fill,
  priority,
  loading,
  ...props
}: OptimizedImageProps) {
  return (
    <div className={cn("group relative overflow-hidden", containerClassName)}>
      <img
        alt={alt}
        loading={loading ?? (priority ? "eager" : "lazy")}
        fetchPriority={priority ? "high" : undefined}
        className={cn(
          "absolute inset-0 h-full w-full object-cover",
          zoom && "transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]",
          className,
        )}
        {...props}
      />
    </div>
  );
}
