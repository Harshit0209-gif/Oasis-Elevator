import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface CollectionCount {
  label: string;
  table: string;
  total: number;
  published: number;
  draft: number;
}

const TRACKED = [
  { label: "Products", table: "products" },
  { label: "Services", table: "services" },
  { label: "Why Oasis", table: "why_oasis_items" },
  { label: "Industries", table: "industries" },
  { label: "Process Steps", table: "process_steps" },
  { label: "Projects", table: "projects" },
  { label: "Testimonials", table: "testimonials" },
  { label: "Statistics", table: "statistics" },
  { label: "Certifications", table: "certifications" },
  { label: "FAQs", table: "faqs" },
  { label: "Clients", table: "clients" },
] as const;

interface ActivityRow {
  id: string;
  action: string;
  table_name: string;
  record_label: string | null;
  admin_name: string | null;
  created_at: string;
}

export function DashboardPage() {
  const [counts, setCounts] = useState<CollectionCount[]>([]);
  const [recent, setRecent] = useState<ActivityRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const results = await Promise.all(
        TRACKED.map(async ({ label, table }) => {
          const [{ count: total }, { count: published }, { count: draft }] = await Promise.all([
            supabase.from(table).select("*", { count: "exact", head: true }),
            supabase.from(table).select("*", { count: "exact", head: true }).eq("status", "published"),
            supabase.from(table).select("*", { count: "exact", head: true }).eq("status", "draft"),
          ]);
          return { label, table, total: total ?? 0, published: published ?? 0, draft: draft ?? 0 };
        }),
      );

      const { data: activity } = await supabase
        .from("activity_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      if (!cancelled) {
        setCounts(results);
        setRecent((activity as ActivityRow[]) ?? []);
        setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const totalPublished = counts.reduce((sum, c) => sum + c.published, 0);
  const totalDraft = counts.reduce((sum, c) => sum + c.draft, 0);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-heading text-2xl font-medium text-navy">Dashboard</h1>
        <p className="text-sm text-graphite">Overview of everything managed through this CMS.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <SummaryCard label="Published Content" value={totalPublished} loading={loading} />
        <SummaryCard label="Draft Content" value={totalDraft} loading={loading} />
        {counts.map((c) => (
          <SummaryCard key={c.table} label={c.label} value={c.total} loading={loading} />
        ))}
      </div>

      <div className="rounded-2xl border border-hairline bg-white p-6">
        <h2 className="mb-4 font-heading text-base font-medium text-navy">Recent changes</h2>
        {recent.length === 0 ? (
          <p className="text-sm text-graphite">No activity yet.</p>
        ) : (
          <ul className="flex flex-col divide-y divide-hairline">
            {recent.map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-4 py-3 text-sm">
                <span className="text-foreground">
                  <span className="font-medium">{r.admin_name ?? "Admin"}</span> {r.action}{" "}
                  {r.record_label ? `"${r.record_label}"` : r.table_name}
                </span>
                <span className="shrink-0 text-xs text-graphite">
                  {new Date(r.created_at).toLocaleDateString(undefined, {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function SummaryCard({ label, value, loading }: { label: string; value: number; loading: boolean }) {
  return (
    <div className="rounded-2xl border border-hairline bg-white p-5">
      <p className="text-2xl font-medium text-navy">{loading ? "—" : value}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.1em] text-graphite">{label}</p>
    </div>
  );
}
