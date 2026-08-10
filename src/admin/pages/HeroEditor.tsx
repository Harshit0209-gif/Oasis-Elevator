import { useState, useEffect } from "react";
import { Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { HeroRow } from "@/data/supabase-types";
import { useSingleton } from "../lib/useSingleton";
import { MediaPicker } from "../components/MediaPicker";

export function HeroEditor() {
  const { data, loading, saving, error, saved, save } = useSingleton<HeroRow>("hero");
  const [form, setForm] = useState<Partial<HeroRow>>({});

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  if (loading) return <Loader2 className="size-6 animate-spin text-brand-blue" />;

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-medium text-navy">Hero</h1>
        <p className="text-sm text-graphite">The homepage's opening section.</p>
      </div>

      <Field label="Badge text">
        <Input value={form.badge_text ?? ""} onChange={(e) => setForm({ ...form, badge_text: e.target.value })} />
      </Field>
      <Field label="Heading (line 1)">
        <Input value={form.heading ?? ""} onChange={(e) => setForm({ ...form, heading: e.target.value })} />
      </Field>
      <Field label="Heading (line 2)">
        <Input value={form.subheading ?? ""} onChange={(e) => setForm({ ...form, subheading: e.target.value })} />
      </Field>
      <Field label="Description">
        <Textarea rows={3} value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      </Field>
      <MediaPicker label="Background image" value={form.image_url} onChange={(url) => setForm({ ...form, image_url: url })} />

      <div className="grid grid-cols-2 gap-4">
        <Field label="Primary CTA text">
          <Input value={form.primary_cta_text ?? ""} onChange={(e) => setForm({ ...form, primary_cta_text: e.target.value })} />
        </Field>
        <Field label="Primary CTA link">
          <Input value={form.primary_cta_link ?? ""} onChange={(e) => setForm({ ...form, primary_cta_link: e.target.value })} />
        </Field>
        <Field label="Secondary CTA text">
          <Input value={form.secondary_cta_text ?? ""} onChange={(e) => setForm({ ...form, secondary_cta_text: e.target.value })} />
        </Field>
        <Field label="Secondary CTA link">
          <Input value={form.secondary_cta_link ?? ""} onChange={(e) => setForm({ ...form, secondary_cta_link: e.target.value })} />
        </Field>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex items-center gap-3">
        <Button onClick={() => void save(form)} disabled={saving}>
          {saving ? <Loader2 className="size-4 animate-spin" /> : "Save changes"}
        </Button>
        {saved && (
          <span className="flex items-center gap-1 text-sm text-emerald-700">
            <Check className="size-4" /> Saved
          </span>
        )}
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
