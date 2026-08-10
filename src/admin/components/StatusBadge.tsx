import { cn } from "@/lib/utils";
import type { ContentStatus } from "@/data/supabase-types";

const styles: Record<ContentStatus, string> = {
  published: "bg-emerald-50 text-emerald-700",
  draft: "bg-amber-50 text-amber-700",
  archived: "bg-graphite/10 text-graphite",
};

export function StatusBadge({ status }: { status: ContentStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize",
        styles[status],
      )}
    >
      {status}
    </span>
  );
}
