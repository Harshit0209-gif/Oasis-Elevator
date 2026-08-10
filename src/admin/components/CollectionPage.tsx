import { useEffect, useState } from "react";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import type { CollectionConfig } from "../config/collections";
import { DragList } from "./DragList";
import { Modal } from "./Modal";
import { ConfirmDialog } from "./ConfirmDialog";
import { CollectionItemForm } from "./CollectionItemForm";
import { StatusBadge } from "./StatusBadge";
import { logActivity } from "../lib/activityLog";
import type { ContentStatus } from "@/data/supabase-types";

type Row = Record<string, unknown> & { id: string; display_order: number; status: ContentStatus };

export function CollectionPage({ config }: { config: CollectionConfig }) {
  const [items, setItems] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Row | null | "new">(null);
  const [deleting, setDeleting] = useState<Row | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from(config.table)
      .select("*")
      .neq("status", "archived")
      .order("display_order", { ascending: true });
    setItems((data as Row[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, [config.table]);

  async function handleReorder(next: Row[]) {
    setItems(next);
    await Promise.all(
      next.map((item, index) =>
        supabase.from(config.table).update({ display_order: index }).eq("id", item.id),
      ),
    );
  }

  async function handleArchive(item: Row) {
    await supabase.from(config.table).update({ status: "archived" }).eq("id", item.id);
    await logActivity({
      action: "archived",
      table: config.table,
      recordId: item.id,
      recordLabel: String(item[config.titleField] ?? ""),
    });
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-medium text-navy">{config.plural}</h1>
          <p className="text-sm text-graphite">Drag to reorder. Order here matches the live site.</p>
        </div>
        <Button onClick={() => setEditing("new")}>
          <Plus className="size-4" /> Add {config.singular}
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="size-6 animate-spin text-brand-blue" />
        </div>
      ) : items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-hairline p-10 text-center text-sm text-graphite">
          No {config.plural.toLowerCase()} yet. Add the first one.
        </p>
      ) : (
        <DragList
          items={items}
          onReorder={(next) => void handleReorder(next)}
          renderItem={(item) => (
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                {config.imageField && Boolean(item[config.imageField]) && (
                  <img
                    src={item[config.imageField] as string}
                    alt=""
                    className="size-10 shrink-0 rounded-md object-cover"
                  />
                )}
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-navy">
                    {String(item[config.titleField] ?? "Untitled")}
                  </p>
                  {config.subtitleField && Boolean(item[config.subtitleField]) && (
                    <p className="truncate text-xs text-graphite">{String(item[config.subtitleField])}</p>
                  )}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <StatusBadge status={item.status} />
                <Button variant="ghost" size="icon" onClick={() => setEditing(item)} aria-label="Edit">
                  <Pencil className="size-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setDeleting(item)} aria-label="Delete">
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          )}
        />
      )}

      <Modal
        open={editing !== null}
        onOpenChange={(open) => !open && setEditing(null)}
        title={editing === "new" ? `Add ${config.singular}` : `Edit ${config.singular}`}
      >
        {editing !== null && (
          <CollectionItemForm
            config={config}
            item={editing === "new" ? null : editing}
            onClose={() => setEditing(null)}
            onSaved={() => {
              setEditing(null);
              void load();
            }}
          />
        )}
      </Modal>

      <ConfirmDialog
        open={deleting !== null}
        onOpenChange={(open) => !open && setDeleting(null)}
        title={`Remove ${deleting ? String(deleting[config.titleField] ?? "") : ""}?`}
        description="This archives the item — it's removed from the live site immediately but not permanently deleted, and can be restored from the database if needed."
        confirmLabel="Archive"
        onConfirm={() => {
          if (deleting) void handleArchive(deleting);
        }}
      />
    </div>
  );
}
