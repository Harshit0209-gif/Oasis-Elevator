import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends Omit<ImageProps, "className"> {
  containerClassName?: string;
  className?: string;
  zoom?: boolean;
}

// Standard image treatment used across sections: a clipped container with a
// slow zoom on hover — no per-section reimplementation of the same effect.
export function OptimizedImage({
  containerClassName,
  className,
  zoom = true,
  alt,
  ...props
}: OptimizedImageProps) {
  return (
    <div className={cn("group relative overflow-hidden", containerClassName)}>
      <Image
        alt={alt}
        className={cn(
          "h-full w-full object-cover",
          zoom && "transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]",
          className,
        )}
        {...props}
      />
    </div>
  );
}
