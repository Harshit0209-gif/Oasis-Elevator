import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!url || !anonKey) {
  throw new Error(
    "Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY — set them in .env (see .env.example).",
  );
}

// Single shared client. Only the anon/publishable key is ever used here —
// every privileged operation is enforced by Postgres Row Level Security via
// the signed-in admin's session, not by holding a more powerful key.
//
// Deliberately untyped (no `<Database>` generic): the admin side's generic
// CRUD utilities (CollectionPage, CollectionItemForm, useSingleton, etc.)
// call `.from(table)` with a runtime `table: string` across 11+ different
// tables, which Supabase's strict per-table Insert/Update generics can't
// resolve — every real row shape is still explicitly typed at the read
// boundary in lib/content.ts (each fetcher casts to its specific *Row type
// from data/supabase-types.ts), which is where type safety actually matters
// for the public site.
export const supabase = createClient(url, anonKey);
