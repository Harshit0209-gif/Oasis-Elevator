import { useEffect, useRef, useState } from "react";
import { ImageOff, Loader2, Upload } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { MediaRow } from "@/data/supabase-types";
import { uploadMedia } from "../lib/media";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "./Modal";

interface MediaPickerProps {
  value: string | null | undefined;
  onChange: (url: string) => void;
  label?: string;
}

export function MediaPicker({ value, onChange, label = "Image" }: MediaPickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-navy">{label}</span>
      <div className="flex items-center gap-3">
        <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-hairline bg-surface">
          {value ? (
            <img src={value} alt="" className="size-full object-cover" />
          ) : (
            <ImageOff className="size-5 text-graphite/50" />
          )}
        </div>
        <Button type="button" variant="outline" onClick={() => setOpen(true)}>
          {value ? "Change" : "Choose image"}
        </Button>
      </div>

      <Modal open={open} onOpenChange={setOpen} title="Choose an image" className="max-w-2xl">
        <MediaBrowser
          onSelect={(url) => {
            onChange(url);
            setOpen(false);
          }}
        />
      </Modal>
    </div>
  );
}

function MediaBrowser({ onSelect }: { onSelect: (url: string) => void }) {
  const [items, setItems] = useState<MediaRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
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
      onSelect(media.public_url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  const filtered = items.filter((i) => i.filename.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
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
        <Button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
          {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
          Upload new
        </Button>
        <Input
          placeholder="Search media…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="size-5 animate-spin text-brand-blue" />
        </div>
      ) : filtered.length === 0 ? (
        <p className="py-10 text-center text-sm text-graphite">No media yet — upload your first image.</p>
      ) : (
        <div className="grid max-h-80 grid-cols-4 gap-3 overflow-y-auto">
          {filtered.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => onSelect(item.public_url)}
              className="group relative aspect-square overflow-hidden rounded-lg border border-hairline"
              title={item.filename}
            >
              <img src={item.public_url} alt={item.alt_text ?? ""} className="size-full object-cover transition-transform group-hover:scale-105" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
