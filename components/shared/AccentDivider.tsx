import { cn } from "@/lib/utils";

export function AccentDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn("h-px w-16 bg-gradient-to-r from-accent-orange to-transparent", className)}
      aria-hidden
    />
  );
}
