import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { SeoSettingsRow } from "@/data/supabase-types";
import { logActivity } from "../lib/activityLog";

export function SeoEditor() {
  const [pages, setPages] = useState<SeoSettingsRow[]>([]);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<SeoSettingsRow>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase
      .from("seo_settings")
      .select("*")
      .order("page_slug")
      .then(({ data }) => {
        const rows = (data as SeoSettingsRow[]) ?? [];
        setPages(rows);
        if (rows[0]) {
          setActiveSlug(rows[0].page_slug);
          setForm(rows[0]);
        }
        setLoading(false);
      });
  }, []);

  function selectPage(slug: string) {
    setActiveSlug(slug);
    setForm(pages.find((p) => p.page_slug === slug) ?? {});
    setSaved(false);
  }

  async function save() {
    if (!activeSlug) return;
    setSaving(true);
    const { error } = await supabase.from("seo_settings").update(form).eq("page_slug", activeSlug);
    setSaving(false);
    if (!error) {
      await logActivity({ action: "updated", table: "seo_settings", recordLabel: `SEO — ${activeSlug}` });
      setPages((prev) => prev.map((p) => (p.page_slug === activeSlug ? { ...p, ...form } as SeoSettingsRow : p)));
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2500);
    }
  }

  if (loading) return <Loader2 className="size-6 animate-spin text-brand-blue" />;

  return (
    <div className="flex gap-8">
      <div className="w-48 shrink-0">
        <h1 className="mb-4 font-heading text-2xl font-medium text-navy">SEO</h1>
        <ul className="flex flex-col gap-1">
          {pages.map((p) => (
            <li key={p.page_slug}>
              <button
                type="button"
                onClick={() => selectPage(p.page_slug)}
                className={
                  "w-full rounded-lg px-3 py-2 text-left text-sm capitalize transition-colors " +
                  (activeSlug === p.page_slug
                    ? "bg-brand-blue text-white"
                    : "text-graphite hover:bg-surface hover:text-navy")
                }
              >
                {p.page_slug}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex max-w-xl flex-1 flex-col gap-4">
        <Field label="Page title">
          <Input value={form.page_title ?? ""} onChange={(e) => setForm({ ...form, page_title: e.target.value })} />
        </Field>
        <Field label="Meta description">
          <Textarea rows={2} value={form.meta_description ?? ""} onChange={(e) => setForm({ ...form, meta_description: e.target.value })} />
        </Field>
        <Field label="Keywords">
          <Input value={form.keywords ?? ""} onChange={(e) => setForm({ ...form, keywords: e.target.value })} />
        </Field>
        <Field label="Open Graph title">
          <Input value={form.og_title ?? ""} onChange={(e) => setForm({ ...form, og_title: e.target.value })} />
        </Field>
        <Field label="Open Graph description">
          <Textarea rows={2} value={form.og_description ?? ""} onChange={(e) => setForm({ ...form, og_description: e.target.value })} />
        </Field>
        <Field label="Canonical URL">
          <Input value={form.canonical_url ?? ""} onChange={(e) => setForm({ ...form, canonical_url: e.target.value })} />
        </Field>
        <Field label="Robots">
          <Input value={form.robots ?? ""} onChange={(e) => setForm({ ...form, robots: e.target.value })} />
        </Field>

        <div className="flex items-center gap-3">
          <Button onClick={() => void save()} disabled={saving}>
            {saving ? <Loader2 className="size-4 animate-spin" /> : "Save changes"}
          </Button>
          {saved && (
            <span className="flex items-center gap-1 text-sm text-emerald-700">
              <Check className="size-4" /> Saved
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
