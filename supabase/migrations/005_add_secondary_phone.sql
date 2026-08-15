-- Adds a second general contact number alongside the existing `phone` and
-- `emergency_phone` fields on site_settings. Run once via the Supabase SQL
-- Editor, same as 001-004.

alter table site_settings add column if not exists phone_secondary text;
