import { useEffect, useRef, useState } from "react";
import { Loader2, Trash2, Upload } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { MediaRow } from "@/data/supabase-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { uploadMedia, deleteMedia } from "../lib/media";
import { logActivity } from "../lib/activityLog";

export function MediaLibraryPage() {
  const [items, setItems] = useState<MediaRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<MediaRow | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("media").select("*").order("created_at", { ascending: false });
    setItems((data as MediaRow[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  async function handleUpload(file: File) {
    setError(null);
    setUploading(true);
    try {
      const media = await uploadMedia(file);
      setItems((prev) => [media, ...prev]);
      await logActivity({ action: "uploaded", table: "media", recordLabel: media.filename });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function handleAltChange(item: MediaRow, alt: string) {
    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, alt_text: alt } : i)));
    await supabase.from("media").update({ alt_text: alt }).eq("id", item.id);
  }

  async function handleDelete(item: MediaRow) {
    await deleteMedia(item);
    await logActivity({ action: "deleted", table: "media", recordLabel: item.filename });
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  }

  const filtered = items.filter((i) => i.filename.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="font-heading text-2xl font-medium text-navy">Media Library</h1>
          <p className="text-sm text-graphite">JPG, PNG or WEBP, up to 8MB.</p>
        </div>
        <div className="flex items-center gap-3">
          <Input placeholder="Search…" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full sm:w-56" />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleUpload(file);
              e.target.value = "";
            }}
          />
          <Button onClick={() => fileInputRef.current?.click()} disabled={uploading}>
            {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
            Upload
          </Button>
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="size-6 animate-spin text-brand-blue" />
        </div>
      ) : filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-hairline p-10 text-center text-sm text-graphite">
          No media yet — upload your first image.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item) => (
            <div key={item.id} className="flex flex-col gap-2 rounded-xl border border-hairline bg-white p-3">
              <div className="aspect-square overflow-hidden rounded-lg bg-surface">
                <img src={item.public_url} alt={item.alt_text ?? ""} className="size-full object-cover" />
              </div>
              <p className="truncate text-xs text-graphite" title={item.filename}>
                {item.filename}
              </p>
              <Input
                placeholder="Alt text"
                value={item.alt_text ?? ""}
                onChange={(e) => void handleAltChange(item, e.target.value)}
                className="h-7 text-xs"
              />
              <div className="flex items-center justify-between text-[0.65rem] text-graphite/70">
                <span>
                  {item.width && item.height ? `${item.width}×${item.height}` : ""}
                </span>
                <Button variant="ghost" size="icon-sm" onClick={() => setDeleting(item)} aria-label="Delete">
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={deleting !== null}
        onOpenChange={(open) => !open && setDeleting(null)}
        title={`Delete "${deleting?.filename}"?`}
        description="This permanently removes the file from storage. If it's used elsewhere on the site, that image will break — check first."
        confirmLabel="Delete"
        onConfirm={() => {
          if (deleting) void handleDelete(deleting);
        }}
      />
    </div>
  );
}
