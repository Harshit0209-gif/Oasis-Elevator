import { cn } from "@/lib/utils";

export function SectionLoader({ className }: { className?: string }) {
  return (
    <div className={cn("flex w-full items-center justify-center py-24", className)}>
      <img src="/oasis_elevators_gear_loader_vector.svg" alt="Loading" className="size-10" />
    </div>
  );
}
