import { supabase } from "@/lib/supabase";

export async function logActivity(params: {
  action: string;
  table: string;
  recordId?: string;
  recordLabel?: string;
}) {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) return;

  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("name")
    .eq("user_id", user.id)
    .maybeSingle();

  await supabase.from("activity_logs").insert({
    admin_id: user.id,
    admin_name: profile?.name ?? user.email ?? "Admin",
    action: params.action,
    table_name: params.table,
    record_id: params.recordId ?? null,
    record_label: params.recordLabel ?? null,
  });
}
