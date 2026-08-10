import { useEffect, useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { NavigationItemRow } from "@/data/supabase-types";
import { DragList } from "../components/DragList";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { logActivity } from "../lib/activityLog";

export function NavigationEditor() {
  const [items, setItems] = useState<NavigationItemRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<NavigationItemRow | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("navigation_items").select("*").order("display_order");
    setItems((data as NavigationItemRow[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  async function updateItem(id: string, patch: Partial<NavigationItemRow>) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
    await supabase.from("navigation_items").update(patch).eq("id", id);
  }

  async function handleReorder(next: NavigationItemRow[]) {
    setItems(next);
    await Promise.all(
      next.map((item, index) => supabase.from("navigation_items").update({ display_order: index }).eq("id", item.id)),
    );
  }

  async function addItem() {
    const { data } = await supabase
      .from("navigation_items")
      .insert({ menu_name: "New Link", link: "/", display_order: items.length, is_visible: true })
      .select()
      .single();
    if (data) setItems((prev) => [...prev, data as NavigationItemRow]);
  }

  async function removeItem(item: NavigationItemRow) {
    await supabase.from("navigation_items").delete().eq("id", item.id);
    await logActivity({ action: "deleted", table: "navigation_items", recordLabel: item.menu_name });
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  }

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-medium text-navy">Navigation</h1>
          <p className="text-sm text-graphite">Drag to reorder the main menu.</p>
        </div>
        <Button onClick={() => void addItem()}>
          <Plus className="size-4" /> Add link
        </Button>
      </div>

      {loading ? (
        <Loader2 className="size-6 animate-spin text-brand-blue" />
      ) : (
        <DragList
          items={items}
          onReorder={(next) => void handleReorder(next)}
          renderItem={(item) => (
            <div className="flex flex-wrap items-center gap-2">
              <Input
                value={item.menu_name}
                onChange={(e) => void updateItem(item.id, { menu_name: e.target.value })}
                className="w-36"
                placeholder="Label"
              />
              <Input
                value={item.link}
                onChange={(e) => void updateItem(item.id, { link: e.target.value })}
                className="w-40"
                placeholder="/path"
              />
              <label className="flex items-center gap-1.5 text-xs text-graphite">
                <input
                  type="checkbox"
                  checked={item.is_external}
                  onChange={(e) => void updateItem(item.id, { is_external: e.target.checked })}
                  className="size-3.5 accent-brand-blue"
                />
                External
              </label>
              <label className="flex items-center gap-1.5 text-xs text-graphite">
                <input
                  type="checkbox"
                  checked={item.is_visible}
                  onChange={(e) => void updateItem(item.id, { is_visible: e.target.checked })}
                  className="size-3.5 accent-brand-blue"
                />
                Visible
              </label>
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto"
                onClick={() => setDeleting(item)}
                aria-label="Remove"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          )}
        />
      )}

      <ConfirmDialog
        open={deleting !== null}
        onOpenChange={(open) => !open && setDeleting(null)}
        title={`Remove "${deleting?.menu_name}"?`}
        description="This removes the link from the navigation menu."
        confirmLabel="Remove"
        onConfirm={() => {
          if (deleting) void removeItem(deleting);
        }}
      />
    </div>
  );
}
