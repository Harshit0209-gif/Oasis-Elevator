import { useState, useEffect } from "react";
import { Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { FooterSectionRow } from "@/data/supabase-types";
import { useSingleton } from "../lib/useSingleton";

export function FooterEditor() {
  const { data, loading, saving, error, saved, save } = useSingleton<FooterSectionRow>("footer_section");
  const [form, setForm] = useState<Partial<FooterSectionRow>>({});

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  if (loading) return <Loader2 className="size-6 animate-spin text-brand-blue" />;

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-medium text-navy">Footer</h1>
        <p className="text-sm text-graphite">
          Phone, email, address and socials are shared with Settings — edit those there. This page covers the
          footer's own copy.
        </p>
      </div>

      <Field label="Description">
        <Textarea rows={3} value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      </Field>
      <Field label="Business hours">
        <Input
          placeholder="e.g. Mon – Sat, 9:00 AM – 7:00 PM"
          value={form.business_hours ?? ""}
          onChange={(e) => setForm({ ...form, business_hours: e.target.value })}
        />
      </Field>
      <Field label="Copyright text">
        <Input value={form.copyright_text ?? ""} onChange={(e) => setForm({ ...form, copyright_text: e.target.value })} />
      </Field>

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
