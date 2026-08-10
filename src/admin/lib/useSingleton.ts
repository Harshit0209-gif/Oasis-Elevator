import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { logActivity } from "./activityLog";

export function useSingleton<T>(table: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from(table)
      .select("*")
      .eq("id", 1)
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled) {
          setData((data as T | null) ?? null);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [table]);

  async function save(next: Partial<T>) {
    setSaving(true);
    setError(null);
    setSaved(false);
    const { error } = await supabase
      .from(table)
      .update(next as Record<string, unknown>)
      .eq("id", 1);
    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }
    await logActivity({ action: "updated", table, recordLabel: table.replace(/_/g, " ") });
    setData((prev) => (prev ? { ...prev, ...next } : prev));
    setSaving(false);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  }

  return { data, loading, saving, error, saved, save };
}
