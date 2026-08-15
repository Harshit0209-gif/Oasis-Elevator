import { useState, useEffect } from "react";
import { Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SiteSettingsRow } from "@/data/supabase-types";
import { useSingleton } from "../lib/useSingleton";

export function SettingsEditor() {
  const { data, loading, saving, error, saved, save } = useSingleton<SiteSettingsRow>("site_settings");
  const [form, setForm] = useState<Partial<SiteSettingsRow>>({});

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  if (loading) return <Loader2 className="size-6 animate-spin text-brand-blue" />;

  function set<K extends keyof SiteSettingsRow>(key: K, value: SiteSettingsRow[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <div>
        <h1 className="font-heading text-2xl font-medium text-navy">Settings</h1>
        <p className="text-sm text-graphite">Company-wide details used across the whole site.</p>
      </div>

      <Section title="Company">
        <Field label="Company name">
          <Input value={form.company_name ?? ""} onChange={(e) => set("company_name", e.target.value)} />
        </Field>
        <Field label="Primary CTA text">
          <Input value={form.primary_cta_text ?? ""} onChange={(e) => set("primary_cta_text", e.target.value)} />
        </Field>
        <Field label="Primary CTA link">
          <Input value={form.primary_cta_link ?? ""} onChange={(e) => set("primary_cta_link", e.target.value)} />
        </Field>
        <Field label="Copyright text">
          <Input value={form.copyright_text ?? ""} onChange={(e) => set("copyright_text", e.target.value)} />
        </Field>
        <Field label="Google Analytics ID" helpText="Stored for reference — not yet wired to inject a tracking script.">
          <Input value={form.google_analytics_id ?? ""} onChange={(e) => set("google_analytics_id", e.target.value)} />
        </Field>
      </Section>

      <Section title="Contact">
        <Field label="Phone">
          <Input value={form.phone ?? ""} onChange={(e) => set("phone", e.target.value)} />
        </Field>
        <Field label="Second phone" helpText="Shown alongside the first phone number wherever it appears.">
          <Input value={form.phone_secondary ?? ""} onChange={(e) => set("phone_secondary", e.target.value)} />
        </Field>
        <Field label="Emergency / alternate phone">
          <Input value={form.emergency_phone ?? ""} onChange={(e) => set("emergency_phone", e.target.value)} />
        </Field>
        <Field label="Email">
          <Input type="email" value={form.email ?? ""} onChange={(e) => set("email", e.target.value)} />
        </Field>
      </Section>

      <Section title="Address">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Address line 1">
            <Input value={form.address_line1 ?? ""} onChange={(e) => set("address_line1", e.target.value)} />
          </Field>
          <Field label="Address line 2">
            <Input value={form.address_line2 ?? ""} onChange={(e) => set("address_line2", e.target.value)} />
          </Field>
          <Field label="City">
            <Input value={form.city ?? ""} onChange={(e) => set("city", e.target.value)} />
          </Field>
          <Field label="State">
            <Input value={form.state ?? ""} onChange={(e) => set("state", e.target.value)} />
          </Field>
          <Field label="Postal code">
            <Input value={form.postal_code ?? ""} onChange={(e) => set("postal_code", e.target.value)} />
          </Field>
          <Field label="Country">
            <Input value={form.country ?? ""} onChange={(e) => set("country", e.target.value)} />
          </Field>
          <Field label="Map latitude">
            <Input
              type="number"
              step="any"
              value={form.geo_lat ?? ""}
              onChange={(e) => set("geo_lat", e.target.value === "" ? null : Number(e.target.value))}
            />
          </Field>
          <Field label="Map longitude">
            <Input
              type="number"
              step="any"
              value={form.geo_lng ?? ""}
              onChange={(e) => set("geo_lng", e.target.value === "" ? null : Number(e.target.value))}
            />
          </Field>
        </div>
      </Section>

      <Section title="Social links">
        <Field label="Facebook">
          <Input value={form.facebook_url ?? ""} onChange={(e) => set("facebook_url", e.target.value)} />
        </Field>
        <Field label="LinkedIn">
          <Input value={form.linkedin_url ?? ""} onChange={(e) => set("linkedin_url", e.target.value)} />
        </Field>
        <Field label="Instagram">
          <Input value={form.instagram_url ?? ""} onChange={(e) => set("instagram_url", e.target.value)} />
        </Field>
      </Section>

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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-hairline bg-white p-6">
      <h2 className="font-heading text-sm font-medium uppercase tracking-[0.1em] text-graphite">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, children, helpText }: { label: string; children: React.ReactNode; helpText?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      {children}
      {helpText && <p className="text-xs text-graphite">{helpText}</p>}
    </div>
  );
}
