-- Updates the stats numbers and swaps the hero / first three "Why Oasis"
-- images to the local files in public/images. Run once via the Supabase SQL
-- Editor, same as 001-005.

update statistics set value = 50 where label = 'Staff Members';
update statistics set value = 5 where label = 'Awards Won';

update hero set image_url = '/images/Hero%20bg.png' where id = 1;

update why_oasis_items set image_url = '/images/why%20oasis%20-1.png' where display_order = 1;
update why_oasis_items set image_url = '/images/why%20oasis%20-2.png' where display_order = 2;
update why_oasis_items set image_url = '/images/why%20oasis%20-3.png' where display_order = 3;
