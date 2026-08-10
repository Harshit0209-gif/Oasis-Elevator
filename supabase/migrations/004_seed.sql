-- Seeds the CMS with the site's current REAL content (ported from the
-- data/*.ts files this codebase already had verified against
-- oasiselevators.co.in / provided directly by the client). Testimonials and
-- Certifications are intentionally left empty — neither has real backing
-- content; the admin adds real ones through the CMS. Safe to re-run: uses
-- upserts / ON CONFLICT DO NOTHING keyed by natural unique columns.

-- ============================================================
-- Singletons
-- ============================================================
update site_settings set
  company_name = 'Oasis Elevators Pvt. Ltd.',
  phone = '+91 90023 43706',
  emergency_phone = '+91 94311 86893',
  email = 'info@oasiselevators.co.in',
  address_line1 = 'Uttaran Regency',
  address_line2 = '19 No. Nabadiganta',
  city = 'Kolkata',
  state = 'West Bengal',
  postal_code = '700094',
  country = 'India',
  geo_lat = 22.484556,
  geo_lng = 88.399667,
  facebook_url = 'https://www.facebook.com/oasiselevators18/?ti=as',
  linkedin_url = 'https://www.linkedin.com/in/oasis-elevators-06362b157/',
  instagram_url = 'https://www.instagram.com/oasiselevators/',
  primary_cta_text = 'Request Quote',
  primary_cta_link = '/contact',
  copyright_text = 'Oasis Elevators Pvt. Ltd. All rights reserved.'
where id = 1;

update hero set
  heading = 'Elevating Architecture.',
  subheading = 'Engineering Vertical Mobility.',
  description = 'Premium elevators engineered for residential, commercial, healthcare, hospitality and industrial projects.',
  badge_text = 'Building Up Vision, Leading Future',
  primary_cta_text = 'Explore Services',
  primary_cta_link = '/services',
  secondary_cta_text = 'Get Consultation',
  secondary_cta_link = '/contact',
  image_url = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=85&w=2400&auto=format&fit=crop'
where id = 1;

update about_section set
  title = 'Possibilities unlimited.',
  subtitle = 'About Oasis',
  description = 'Since 2015, we''ve been Kolkata''s trusted name in vertical mobility — a privately owned, licensed lift company engineering journeys, not just installing elevators.',
  image_url = '/images/oasis.png',
  supporting_points = '[
    {"title": "Engineering, not just installation.", "description": "Oasis Elevators Pvt. Ltd. is a registered and licensed company for the erection and maintenance of elevators, delivering the full journey end to end — design, manufacture and installation, through to ongoing maintenance and modernization. Every project starts with the building, not a catalogue."},
    {"title": "Quality over quantity.", "description": "We extend hassle-free service, 24×7. \"Quality and not the quantity\" has been the motto of our work culture since day one — when you think of safety and security in vertical mobility, that''s the standard we hold ourselves to."}
  ]'::jsonb,
  mission_items = '[
    {"icon": "ShieldCheck", "title": "Quality", "description": "Quality products that make every journey safe, smoother and reliable."},
    {"icon": "Handshake", "title": "Commitment", "description": "Committed to what we can genuinely deliver, matched to our real ability."},
    {"icon": "Timer", "title": "Execution", "description": "Every project executed on time, or ahead of the agreed time frame."}
  ]'::jsonb
where id = 1;

update footer_section set
  description = 'Building Up Vision, Leading Future — premium vertical mobility engineered for architecture that demands more.',
  copyright_text = 'Oasis Elevators Pvt. Ltd. All rights reserved.'
where id = 1;

-- ============================================================
-- Why Oasis
-- ============================================================
insert into why_oasis_items (eyebrow, title, description, image_url, image_alt, image_position, display_order, status) values
('01 — Engineering', 'Precision, by design.', 'Every cabin is engineered to millimeter tolerances — from shaft alignment to door timing — because true luxury is invisible engineering.', 'https://images.unsplash.com/photo-1524230572899-a752b3835840?q=80&w=1600&auto=format&fit=crop', 'Precisely repeating white architectural archways', 'right', 1, 'published'),
('02 — Safety', 'Trust, engineered in.', 'Redundant safety systems, certified components and continuous monitoring — built to protect every passenger, every ride.', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop', 'Secure modern glass-walled office corridor', 'left', 2, 'published'),
('03 — Innovation', 'Ahead of the curve.', 'From machine room-less drives to smart destination control, we bring next-generation vertical mobility to every project.', 'https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=1600&auto=format&fit=crop', 'Sculptural modern architecture with sweeping curves', 'right', 3, 'published'),
('04 — Premium Materials', 'Materials that endure.', 'Brushed steel, walnut veneer, tempered glass — every finish is selected for beauty that lasts decades, not seasons.', 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1600&auto=format&fit=crop', 'Interior showcasing rich natural wood and steel materials', 'left', 4, 'published'),
('05 — Certified Installation', 'Certified from day one.', 'Our installation teams are factory-trained and certified, ensuring every deployment meets the same exacting standard.', 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1600&auto=format&fit=crop', 'Certified engineers reviewing a construction site', 'right', 5, 'published'),
('06 — 24×7 Maintenance', 'Always in motion.', 'Round-the-clock monitoring and rapid-response servicing mean your elevators are never far from expert care.', 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=1600&auto=format&fit=crop', 'Team working late in a modern office, always on', 'left', 6, 'published')
on conflict do nothing;

-- ============================================================
-- Products (real Oasis catalog — Capsule/Freight deliberately excluded,
-- confirmed not real product lines)
-- ============================================================
insert into products (slug, name, category, short_description, features, ideal_for, image_url, image_alt, display_order, status) values
('passenger-elevator', 'Passenger Elevator', 'Vertical Mobility', 'Refined, high-speed passenger transit engineered for everyday elegance.', array['Ultra-smooth ride','Whisper-quiet operation','Custom cabin finishes'], 'Mid to high-rise buildings', '/images/products/passenger-3.jpg', 'Brushed-steel passenger elevator interior with control panel', 1, 'published'),
('hospital-elevator', 'Hospital Elevator', 'Critical Care Mobility', 'Stretcher-and-bed-friendly cabins engineered for speed, hygiene, and silence.', array['Antimicrobial surfaces','Emergency power override','Wide-clearance doors'], 'Hospitals & healthcare facilities', '/images/products/hospital-1.jpg', 'Hospital attendant wheeling a bed into a stainless steel hospital elevator', 2, 'published'),
('home-elevator', 'Home Elevator', 'Residential Luxury', 'Compact, quiet, and beautifully finished mobility for the modern private residence.', array['Space-saving footprint','Bespoke interior finishes','Whisper-quiet hydraulics'], 'Private residences & villas', '/images/products/home-1.jpg', 'Compact glass-cabin home elevator installed beside a wooden staircase', 3, 'published'),
('machine-room-less-elevator', 'Machine Room-Less Elevator', 'Space-Efficient Engineering', 'Compact drive engineering that reclaims valuable building space without compromise.', array['No dedicated machine room','Reduced energy footprint','Compact shaft design'], 'Space-constrained buildings', '/images/products/mrl-1.jpg', 'Compact machine-room-less gearless traction machine mounted in the shaft head', 4, 'published'),
('hydraulic-elevator', 'Hydraulic Elevator', 'Low-Rise Precision', 'Robust hydraulic systems engineered for smooth, precise low-rise performance.', array['Precision leveling','Low maintenance design','Reliable for low-rise buildings'], 'Low-rise buildings up to 6 floors', '/images/products/hydraulic-1.jpg', 'Cylindrical glass hydraulic elevator cabin on a steel frame', 5, 'published')
on conflict (slug) do nothing;

-- ============================================================
-- Services
-- ============================================================
insert into services (title, description, features, image_url, image_alt, icon, display_order, status) values
('Erection & New Installation', 'Precision installation backed by premium-grade material and engineers dedicated to a smooth, safe and comfortable ride — every project executed to safety code from first fix through commissioning.', '{}', 'https://images.unsplash.com/photo-1743662490169-342a322f98b4?q=80&w=1600&auto=format&fit=crop', 'Interior view of an elevator shaft during installation', 'HardHat', 1, 'published'),
('Maintenance, Repair & Service', 'Genuine, reliable servicing across OTIS, ADAMS, Mitsubishi and other major elevator brands, led by engineers with hands-on OTIS experience — for safe, trouble-free operation year-round.', '{}', 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1600&auto=format&fit=crop', 'Technician servicing wiring and controls on site', 'Wrench', 2, 'published'),
('Modernization & Renovation', 'Transform an ageing elevator into a modern system — upgraded controls, drives, display and cabin finish — at a fraction of full replacement cost.', array['Relay logic upgraded to microprocessor controller','Single-speed drive converted to variable-speed','7-segment display upgraded to LCD','Cabin refinished in M.S. / S.S. in place of wood','Round cable replaced with lift-duty cable','ARD (Automatic Rescue Device) and overload protection added','Non-stop function clock with temperature display'], 'https://images.unsplash.com/photo-1592256410394-51c948ec13d5?q=80&w=1600&auto=format&fit=crop', 'Modern stainless steel elevator panel with buttons', 'RefreshCw', 3, 'published')
on conflict do nothing;

-- ============================================================
-- Industries
-- ============================================================
insert into industries (slug, name, description, image_url, image_alt, display_order, status) values
('residential', 'Residential', 'Elevators engineered for the rhythm of home — quiet, refined, and built to last generations.', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1600&auto=format&fit=crop', 'Modern luxury residential villa with a private pool', 1, 'published'),
('commercial', 'Commercial', 'High-throughput vertical transportation engineered for the pace of modern business.', 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1600&auto=format&fit=crop', 'Low-angle view of a modern glass commercial office tower', 2, 'published'),
('healthcare', 'Healthcare', 'Precision-critical mobility for hospitals — stretcher-friendly, silent, and always dependable.', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1600&auto=format&fit=crop', 'Clean, modern hospital reception and corridor', 3, 'published'),
('hospitality', 'Hospitality', 'Cabins designed to feel like an extension of the lobby — the first and last impression of luxury.', 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1600&auto=format&fit=crop', 'Luxury hotel suite bedroom with floor-to-ceiling glass', 4, 'published'),
('industrial', 'Industrial', 'Heavy-duty engineering built for continuous load, harsh environments, and zero downtime.', 'https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=1600&auto=format&fit=crop', 'Clean, modern industrial machinery and steel piping', 5, 'published'),
('retail', 'Retail', 'Elevators and escalators that move footfall effortlessly through premium retail environments.', 'https://images.unsplash.com/photo-1567958451986-2de427a4a0be?q=80&w=1600&auto=format&fit=crop', 'Bright, modern retail store interior', 6, 'published'),
('corporate-offices', 'Corporate Offices', 'Vertical mobility that matches the ambition of a headquarters — fast, quiet, and effortless.', 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1600&auto=format&fit=crop', 'Bright modern corporate office with skyline views', 7, 'published'),
('educational', 'Educational Institutions', 'Safe, accessible mobility engineered for high foot-traffic campuses and academic landmarks.', 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600&auto=format&fit=crop', 'Graduating students celebrating on a university campus', 8, 'published')
on conflict (slug) do nothing;

-- ============================================================
-- Process Steps (icon = lucide-react export name)
-- ============================================================
insert into process_steps (floor_number, title, description, icon, display_order, status) values
(1, 'Consultation', 'We study your building, traffic patterns and vision before proposing a solution.', 'Users', 1, 'published'),
(2, 'Site Survey', 'Precise measurements and structural assessment to engineer the exact fit.', 'Ruler', 2, 'published'),
(3, 'Engineering', 'Custom shaft, cabin and drive specifications drafted by our engineering team.', 'Compass', 3, 'published'),
(4, 'Manufacturing', 'Precision components manufactured under strict quality control.', 'Factory', 4, 'published'),
(5, 'Installation', 'Certified technicians install with minimal disruption to your site.', 'Wrench', 5, 'published'),
(6, 'Testing', 'Rigorous safety and performance testing before handover.', 'ShieldCheck', 6, 'published'),
(7, 'Maintenance', 'Ongoing 24/7 monitoring and servicing to keep every ride effortless.', 'RefreshCw', 7, 'published')
on conflict do nothing;

-- ============================================================
-- Statistics (real, verified against oasiselevators.co.in)
-- ============================================================
insert into statistics (label, value, suffix, display_order, status) values
('Staff Members', 250, '+', 1, 'published'),
('Awards Won', 125, '+', 2, 'published'),
('Satisfied Customers', 100, '%', 3, 'published')
on conflict do nothing;

-- ============================================================
-- FAQs
-- ============================================================
insert into faqs (question, answer, display_order, status) values
('How long does a typical elevator installation take?', 'Timelines vary by project scope, but most installations complete within 8–14 weeks from site survey to handover, including manufacturing and testing.', 1, 'published'),
('Is maintenance included after installation?', 'Every installation includes a warranty period, after which we offer ongoing maintenance and servicing to keep your elevator running reliably.', 2, 'published'),
('Can cabin interiors be fully customized?', 'Yes. Panel materials, lighting, flooring, and control panel finishes can all be tailored to match your building''s architecture and brand.', 3, 'published'),
('Do you retrofit elevators in existing buildings?', 'Yes, we specialize in modernizing existing shafts with minimal structural disruption, including upgrading legacy systems to machine room-less drives.', 4, 'published'),
('What happens if an elevator breaks down outside business hours?', 'Our team provides 24×7 emergency response, so a breakdown outside business hours is never left unattended.', 5, 'published')
on conflict do nothing;

-- ============================================================
-- Clients (real names, provided directly by the client — no logos on file)
-- ============================================================
insert into clients (name, display_order, status) values
('R.R Construction', 1, 'published'),
('Oas Realtor Pvt. Ltd', 2, 'published'),
('PRNJ Enterprise', 3, 'published'),
('Krishna Enterprise', 4, 'published'),
('Moon Enterprise', 5, 'published'),
('DRH Constructions', 6, 'published'),
('Sarkar & Co.', 7, 'published'),
('B.B Builder', 8, 'published'),
('City Construction', 9, 'published'),
('Nirman', 10, 'published')
on conflict do nothing;

-- ============================================================
-- Navigation
-- ============================================================
insert into navigation_items (menu_name, link, is_external, display_order, is_visible) values
('Home', '/', false, 1, true),
('About', '/about', false, 2, true),
('Services', '/services', false, 3, true),
('Products', '/products', false, 4, true),
('Industries', '/industries', false, 5, true),
('Clients', '/clients', false, 6, true),
('Contact', '/contact', false, 7, true)
on conflict do nothing;

-- ============================================================
-- SEO per page
-- ============================================================
insert into seo_settings (page_slug, page_title, meta_description) values
('home', 'Premium Elevators Engineered for Architectural Excellence', 'Premium elevators engineered for residential, commercial, healthcare, hospitality and industrial projects across India.'),
('about', 'About', 'Since 2015, Oasis Elevators has engineered premium vertical mobility for Kolkata''s most ambitious buildings.'),
('services', 'Services', 'End-to-end elevator services — erection & new installation, maintenance & repair, and modernization & renovation.'),
('products', 'Products', 'Five engineered elevator systems, each built for the space it will serve.'),
('industries', 'Industries', 'Engineered mobility for residential, commercial, healthcare and industrial buildings.'),
('clients', 'Clients', 'Developers and contractors who bring Oasis in to engineer their vertical mobility.'),
('contact', 'Contact', 'Get in touch with Oasis Elevators for a consultation on your next project.')
on conflict (page_slug) do nothing;

-- Testimonials and certifications: intentionally NOT seeded. No fake data —
-- the admin adds real ones through the CMS once available.
