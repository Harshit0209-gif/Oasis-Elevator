import { useState, useEffect } from "react";
import { Loader2, Check, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { AboutSectionRow, AboutMissionItem, AboutSupportingPoint } from "@/data/supabase-types";
import { useSingleton } from "../lib/useSingleton";
import { MediaPicker } from "../components/MediaPicker";

export function AboutEditor() {
  const { data, loading, saving, error, saved, save } = useSingleton<AboutSectionRow>("about_section");
  const [form, setForm] = useState<Partial<AboutSectionRow>>({});

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  if (loading) return <Loader2 className="size-6 animate-spin text-brand-blue" />;

  const supportingPoints = form.supporting_points ?? [];
  const missionItems = form.mission_items ?? [];

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-medium text-navy">About Oasis</h1>
        <p className="text-sm text-graphite">The /about page's hero, intro blocks and mission pillars.</p>
      </div>

      <Field label="Title">
        <Input value={form.title ?? ""} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      </Field>
      <Field label="Subtitle">
        <Input value={form.subtitle ?? ""} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
      </Field>
      <Field label="Description">
        <Textarea rows={3} value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      </Field>
      <MediaPicker label="Engineering diagram image" value={form.image_url} onChange={(url) => setForm({ ...form, image_url: url })} />

      <div className="flex flex-col gap-3">
        <Label>Intro blocks</Label>
        {supportingPoints.map((point, i) => (
          <div key={i} className="flex flex-col gap-2 rounded-lg border border-hairline p-3">
            <Input
              placeholder="Block title"
              value={point.title}
              onChange={(e) => {
                const next = [...supportingPoints];
                next[i] = { ...point, title: e.target.value };
                setForm({ ...form, supporting_points: next });
              }}
            />
            <Textarea
              placeholder="Block description"
              rows={2}
              value={point.description}
              onChange={(e) => {
                const next = [...supportingPoints];
                next[i] = { ...point, description: e.target.value };
                setForm({ ...form, supporting_points: next });
              }}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="w-fit"
              onClick={() =>
                setForm({ ...form, supporting_points: supportingPoints.filter((_, idx) => idx !== i) })
              }
            >
              <Trash2 className="size-3.5" /> Remove
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-fit"
          onClick={() =>
            setForm({
              ...form,
              supporting_points: [...supportingPoints, { title: "", description: "" } as AboutSupportingPoint],
            })
          }
        >
          <Plus className="size-3.5" /> Add block
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        <Label>Mission pillars</Label>
        {missionItems.map((item, i) => (
          <div key={i} className="flex flex-col gap-2 rounded-lg border border-hairline p-3">
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Icon (lucide-react name)"
                value={item.icon}
                onChange={(e) => {
                  const next = [...missionItems];
                  next[i] = { ...item, icon: e.target.value };
                  setForm({ ...form, mission_items: next });
                }}
              />
              <Input
                placeholder="Title"
                value={item.title}
                onChange={(e) => {
                  const next = [...missionItems];
                  next[i] = { ...item, title: e.target.value };
                  setForm({ ...form, mission_items: next });
                }}
              />
            </div>
            <Textarea
              placeholder="Description"
              rows={2}
              value={item.description}
              onChange={(e) => {
                const next = [...missionItems];
                next[i] = { ...item, description: e.target.value };
                setForm({ ...form, mission_items: next });
              }}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="w-fit"
              onClick={() => setForm({ ...form, mission_items: missionItems.filter((_, idx) => idx !== i) })}
            >
              <Trash2 className="size-3.5" /> Remove
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-fit"
          onClick={() =>
            setForm({
              ...form,
              mission_items: [...missionItems, { icon: "", title: "", description: "" } as AboutMissionItem],
            })
          }
        >
          <Plus className="size-3.5" /> Add pillar
        </Button>
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
