import { cn } from "@/lib/utils";

export function GoldDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn("h-px w-16 bg-gradient-to-r from-gold to-transparent", className)}
      aria-hidden
    />
  );
}
