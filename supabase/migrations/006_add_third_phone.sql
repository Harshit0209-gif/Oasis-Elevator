-- Adds a third general contact number alongside `phone` and `phone_secondary`
-- on site_settings. Run once via the Supabase SQL Editor, same as 001-005.

alter table site_settings add column if not exists phone_tertiary text;
