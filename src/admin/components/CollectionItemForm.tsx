import { useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { CollectionConfig, FieldConfig } from "../config/collections";
import { MediaPicker } from "./MediaPicker";
import { RichTextField } from "./RichTextField";
import { logActivity } from "../lib/activityLog";

type Row = Record<string, unknown>;

interface CollectionItemFormProps {
  config: CollectionConfig;
  item: Row | null;
  onClose: () => void;
  onSaved: () => void;
}

function defaultValue(field: FieldConfig): unknown {
  switch (field.type) {
    case "boolean":
      return false;
    case "stringList":
      return [];
    case "number":
      return null;
    default:
      return "";
  }
}

export function CollectionItemForm({ config, item, onClose, onSaved }: CollectionItemFormProps) {
  const isNew = !item;
  const [values, setValues] = useState<Row>(() => {
    const initial: Row = {};
    for (const field of config.fields) {
      initial[field.key] = item?.[field.key] ?? defaultValue(field);
      if (field.altKey) initial[field.altKey] = item?.[field.altKey] ?? "";
    }
    return initial;
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set(key: string, value: unknown) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): string | null {
    for (const field of config.fields) {
      if (field.required) {
        const v = values[field.key];
        if (v === null || v === undefined || v === "") {
          return `${field.label} is required.`;
        }
      }
    }
    return null;
  }

  async function save(status: "draft" | "published") {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setSaving(true);

    const payload: Row = { ...values, status };
    // Numbers can arrive as "" from an empty input — normalize to null.
    for (const field of config.fields) {
      if (field.type === "number" && payload[field.key] === "") payload[field.key] = null;
    }

    let recordId = item?.id as string | undefined;

    if (isNew) {
      const { data, error: insertError } = await supabase
        .from(config.table)
        .insert({ ...payload, display_order: 9999 })
        .select()
        .single();
      if (insertError) {
        setError(insertError.message);
        setSaving(false);
        return;
      }
      recordId = (data as Row).id as string;
    } else {
      const { error: updateError } = await supabase.from(config.table).update(payload).eq("id", recordId);
      if (updateError) {
        setError(updateError.message);
        setSaving(false);
        return;
      }
    }

    await logActivity({
      action: isNew ? `created` : status === "published" ? "published" : "updated",
      table: config.table,
      recordId,
      recordLabel: String(values[config.titleField] ?? ""),
    });

    setSaving(false);
    onSaved();
  }

  return (
    <div className="flex flex-col gap-4">
      {config.helpText && (
        <p className="rounded-lg bg-surface px-3 py-2 text-xs text-graphite">{config.helpText}</p>
      )}

      {config.fields.map((field) => (
        <FieldInput key={field.key} field={field} values={values} set={set} />
      ))}

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="mt-2 flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onClose} disabled={saving}>
          Cancel
        </Button>
        <Button type="button" variant="secondary" onClick={() => void save("draft")} disabled={saving}>
          Save draft
        </Button>
        <Button type="button" onClick={() => void save("published")} disabled={saving}>
          {saving ? <Loader2 className="size-4 animate-spin" /> : "Publish"}
        </Button>
      </div>
    </div>
  );
}

function FieldInput({
  field,
  values,
  set,
}: {
  field: FieldConfig;
  values: Row;
  set: (key: string, value: unknown) => void;
}) {
  const value = values[field.key];

  switch (field.type) {
    case "text":
    case "slug":
      return (
        <LabeledField label={field.label} required={field.required}>
          <Input value={(value as string) ?? ""} onChange={(e) => set(field.key, e.target.value)} />
        </LabeledField>
      );

    case "textarea":
      return (
        <LabeledField label={field.label} required={field.required}>
          <Textarea
            rows={4}
            value={(value as string) ?? ""}
            onChange={(e) => set(field.key, e.target.value)}
          />
        </LabeledField>
      );

    case "richtext":
      return (
        <RichTextField
          label={field.label}
          value={(value as string) ?? ""}
          onChange={(html) => set(field.key, html)}
        />
      );

    case "number":
      return (
        <LabeledField label={field.label} required={field.required}>
          <Input
            type="number"
            value={value === null || value === undefined ? "" : String(value)}
            onChange={(e) => set(field.key, e.target.value === "" ? "" : Number(e.target.value))}
          />
        </LabeledField>
      );

    case "boolean":
      return (
        <label className="flex items-center gap-2 text-sm text-navy">
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => set(field.key, e.target.checked)}
            className="size-4 rounded border-hairline accent-brand-blue"
          />
          {field.label}
        </label>
      );

    case "select":
      return (
        <LabeledField label={field.label} required={field.required}>
          <select
            value={(value as string) ?? field.options?.[0] ?? ""}
            onChange={(e) => set(field.key, e.target.value)}
            className="h-9 w-full rounded-md border border-hairline bg-white px-3 text-sm"
          >
            {field.options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </LabeledField>
      );

    case "image":
      return (
        <div className="flex flex-col gap-2">
          <MediaPicker
            label={field.label}
            value={value as string | null}
            onChange={(url) => set(field.key, url)}
          />
          {field.altKey && (
            <Input
              placeholder="Alt text (describes the image for accessibility)"
              value={(values[field.altKey] as string) ?? ""}
              onChange={(e) => set(field.altKey!, e.target.value)}
            />
          )}
        </div>
      );

    case "stringList":
      return <StringListField field={field} values={(value as string[]) ?? []} set={set} />;

    default:
      return null;
  }
}

function LabeledField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>
      {children}
    </div>
  );
}

function StringListField({
  field,
  values,
  set,
}: {
  field: FieldConfig;
  values: string[];
  set: (key: string, value: unknown) => void;
}) {
  function updateAt(index: number, next: string) {
    const copy = [...values];
    copy[index] = next;
    set(field.key, copy);
  }
  function removeAt(index: number) {
    set(field.key, values.filter((_, i) => i !== index));
  }
  function add() {
    set(field.key, [...values, ""]);
  }

  return (
    <div className="flex flex-col gap-1.5">
      <Label>{field.label}</Label>
      <div className="flex flex-col gap-2">
        {values.map((v, i) => (
          <div key={i} className="flex gap-2">
            <Input value={v} onChange={(e) => updateAt(i, e.target.value)} />
            <Button type="button" variant="ghost" size="icon" onClick={() => removeAt(i)} aria-label="Remove">
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={add} className="w-fit">
          <Plus className="size-3.5" /> Add
        </Button>
      </div>
    </div>
  );
}
