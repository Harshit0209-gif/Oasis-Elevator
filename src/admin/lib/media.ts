import { supabase } from "@/lib/supabase";
import type { MediaRow } from "@/data/supabase-types";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 8 * 1024 * 1024;

function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      resolve({ width: 0, height: 0 });
      URL.revokeObjectURL(url);
    };
    img.src = url;
  });
}

export async function uploadMedia(file: File, altText = ""): Promise<MediaRow> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Only JPG, PNG, or WEBP images are allowed.");
  }
  if (file.size > MAX_SIZE) {
    throw new Error("Images must be 8MB or smaller.");
  }

  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("media")
    .upload(path, file, { cacheControl: "3600" });
  if (uploadError) throw uploadError;

  const { data: publicUrlData } = supabase.storage.from("media").getPublicUrl(path);
  const dims = await getImageDimensions(file);

  const { data, error } = await supabase
    .from("media")
    .insert({
      filename: file.name,
      storage_path: path,
      bucket_id: "media",
      public_url: publicUrlData.publicUrl,
      alt_text: altText,
      mime_type: file.type,
      file_size: file.size,
      width: dims.width || null,
      height: dims.height || null,
    })
    .select()
    .single();
  if (error) throw error;
  return data as MediaRow;
}

export async function deleteMedia(item: MediaRow) {
  await supabase.storage.from(item.bucket_id).remove([item.storage_path]);
  await supabase.from("media").delete().eq("id", item.id);
}
