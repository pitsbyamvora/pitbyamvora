-- ==============================================================================
-- PITS 2027 / AMVORA LIGHT FOUNDATION — COMPLETE PRODUCTION DATABASE SCHEMA
-- Supported by Amvora Light Foundation
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PROFILES (Citizen Members, Ward Coordinators & Administrators)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  state_of_residence TEXT NOT NULL,
  lga TEXT,
  ward TEXT,
  polling_unit TEXT,
  role TEXT NOT NULL DEFAULT 'citizen' CHECK (role IN ('citizen', 'coordinator', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Trigger to sync auth.users with public.profiles on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, phone, state_of_residence, lga, ward, polling_unit, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'Citizen Member'),
    new.email,
    new.raw_user_meta_data->>'phone',
    COALESCE(new.raw_user_meta_data->>'state_of_residence', 'Lagos'),
    new.raw_user_meta_data->>'lga',
    new.raw_user_meta_data->>'ward',
    new.raw_user_meta_data->>'polling_unit',
    COALESCE(new.raw_user_meta_data->>'role', 'citizen')
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    email = EXCLUDED.email,
    updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- 3. COMMUNITY ISSUES (Field Challenges, Price Gouging & Infrastructure Reports)
CREATE TABLE IF NOT EXISTS public.issues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tracking_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'Infrastructure', 'Food Affordability', 'Power & Light', 'Water & Sanitation', 'Healthcare', 'Security'
  )),
  state TEXT NOT NULL,
  lga TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Investigating' CHECK (status IN (
    'Investigating', 'Field Verified', 'In Progress', 'Resolved'
  )),
  confirmations INTEGER NOT NULL DEFAULT 1,
  image_url TEXT,
  reporter_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  is_anonymous BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Issue Confirmations (Prevent duplicate citizen upvotes)
CREATE TABLE IF NOT EXISTS public.issue_confirmations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  issue_id UUID NOT NULL REFERENCES public.issues(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  user_ip_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT unique_issue_confirmation UNIQUE (issue_id, user_id)
);


-- 4. VERIFIED PETITIONS & CITIZEN SIGNATURES
CREATE TABLE IF NOT EXISTS public.petitions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tracking_number TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'Economic Justice', 'Food Security', 'Infrastructure', 'Public Governance'
  )),
  target_authority TEXT NOT NULL,
  summary TEXT NOT NULL,
  full_text TEXT NOT NULL,
  signatures_count INTEGER NOT NULL DEFAULT 0,
  goal_count INTEGER NOT NULL DEFAULT 10000,
  deadline TEXT NOT NULL,
  is_urgent BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Under Review', 'Delivered')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.petition_signatures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  petition_id UUID NOT NULL REFERENCES public.petitions(id) ON DELETE CASCADE,
  signer_name TEXT NOT NULL,
  signer_email TEXT NOT NULL,
  signer_state TEXT NOT NULL,
  signer_comment TEXT,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT unique_petition_signature UNIQUE (petition_id, signer_email)
);


-- 5. MARKETPLACE PRODUCTS & FOOD HUB CATALOGUE
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'Grains & Rice', 'Tubers & Staples', 'Cooking Oils', 'Civic Connectivity'
  )),
  open_market_price NUMERIC(12, 2) NOT NULL,
  cooperative_price NUMERIC(12, 2) NOT NULL,
  unit TEXT NOT NULL,
  origin TEXT NOT NULL,
  image_url TEXT NOT NULL,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  stock_count INTEGER NOT NULL DEFAULT 100,
  description TEXT NOT NULL,
  pickup_hubs TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);


-- 6. CITIZEN PROMO & SUBSIDY CODES
CREATE TABLE IF NOT EXISTS public.promo_codes (
  code TEXT PRIMARY KEY,
  discount_percentage INTEGER NOT NULL CHECK (discount_percentage BETWEEN 1 AND 100),
  description TEXT NOT NULL,
  applicable_category TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);


-- 7. MARKETPLACE ORDERS & COOPERATIVE PICKUPS
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_code TEXT UNIQUE NOT NULL,
  buyer_name TEXT NOT NULL,
  buyer_phone TEXT NOT NULL,
  buyer_email TEXT,
  pickup_hub TEXT NOT NULL,
  items JSONB NOT NULL,
  applied_promo TEXT REFERENCES public.promo_codes(code) ON DELETE SET NULL,
  discount_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  total_price NUMERIC(12, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending Pickup' CHECK (status IN (
    'Pending Pickup', 'Dispatched', 'Fulfilled', 'Cancelled'
  )),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);


-- 8. VOLUNTEER & FOOT SOLDIER ROSTER
CREATE TABLE IF NOT EXISTS public.volunteers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  state TEXT NOT NULL,
  role TEXT NOT NULL,
  hours_per_week TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Enrolled' CHECK (status IN ('Enrolled', 'Assigned', 'Active')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);


-- 9. PRODUCER & HAULAGE PARTNERS
CREATE TABLE IF NOT EXISTS public.partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  partner_type TEXT NOT NULL,
  business_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  state TEXT NOT NULL,
  commodity TEXT NOT NULL,
  capacity TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Vetting' CHECK (status IN ('Vetting', 'Verified', 'Active Partner')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);


-- 10. PEOPLE'S VOICE: COMMUNITY POSTS (Ideas, Stories, Issues, Solutions, Campaigns)
CREATE TABLE IF NOT EXISTS public.peoples_voice_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_name TEXT NOT NULL,
  author_state TEXT NOT NULL,
  author_role TEXT NOT NULL DEFAULT 'Citizen Voice',
  category TEXT NOT NULL CHECK (category IN ('Idea', 'Story', 'Issue', 'Solution', 'Campaign')),
  content TEXT NOT NULL,
  likes_count INTEGER NOT NULL DEFAULT 0,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);


-- 11. PEOPLE'S VOICE: THREADED COMMENTS
CREATE TABLE IF NOT EXISTS public.peoples_voice_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES public.peoples_voice_posts(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);


-- 12. PEOPLE'S VOICE: CITIZEN LIKES (Prevent duplicate likes)
CREATE TABLE IF NOT EXISTS public.peoples_voice_likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES public.peoples_voice_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT unique_post_like UNIQUE (post_id, user_id)
);


-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.issue_confirmations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.petitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.petition_signatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.peoples_voice_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.peoples_voice_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.peoples_voice_likes ENABLE ROW LEVEL SECURITY;

-- 0. People's Voice Policies
CREATE POLICY "Voice posts viewable by everyone"
  ON public.peoples_voice_posts FOR SELECT
  USING (true);

CREATE POLICY "Anyone can publish a voice post"
  ON public.peoples_voice_posts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Comments viewable by everyone"
  ON public.peoples_voice_comments FOR SELECT
  USING (true);

CREATE POLICY "Anyone can post a comment"
  ON public.peoples_voice_comments FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Likes viewable by everyone"
  ON public.peoples_voice_likes FOR SELECT
  USING (true);

CREATE POLICY "Anyone can like a post"
  ON public.peoples_voice_likes FOR INSERT
  WITH CHECK (true);

-- 1. Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- 2. Issues Policies
CREATE POLICY "Issues are viewable by everyone"
  ON public.issues FOR SELECT
  USING (true);

CREATE POLICY "Anyone can report an issue"
  ON public.issues FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins and coordinators can update issues"
  ON public.issues FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'coordinator')
    )
  );

-- 3. Petitions Policies
CREATE POLICY "Petitions are viewable by everyone"
  ON public.petitions FOR SELECT
  USING (true);

CREATE POLICY "Anyone can sign a petition"
  ON public.petition_signatures FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Signatures count is visible to public"
  ON public.petition_signatures FOR SELECT
  USING (true);

-- 4. Marketplace Products & Promo Codes Policies
CREATE POLICY "Products are viewable by everyone"
  ON public.products FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage products"
  ON public.products FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Promo codes are viewable by everyone"
  ON public.promo_codes FOR SELECT
  USING (true);

-- 5. Orders Policies
CREATE POLICY "Anyone can create an order"
  ON public.orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view their own orders"
  ON public.orders FOR SELECT
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'coordinator')
    )
  );

-- 6. Volunteer & Partner Form Policies
CREATE POLICY "Anyone can submit volunteer application"
  ON public.volunteers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view volunteer roster"
  ON public.volunteers FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'coordinator')
    )
  );

CREATE POLICY "Anyone can submit partner application"
  ON public.partners FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view partner applications"
  ON public.partners FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'coordinator')
    )
  );


-- ==============================================================================
-- INITIAL SEED DATA (AUTHENTIC PITS COMMUNITY & FOOD HUB DATA)
-- ==============================================================================

-- Seed Promo Codes
INSERT INTO public.promo_codes (code, discount_percentage, description, applicable_category)
VALUES
  ('PITS2027', 45, 'Citizen Solidarity Voucher (45% off cooperative price)', NULL),
  ('RICETEST', 50, '60-Day Rice Test Direct Subsidy (50% off all grains)', 'Grains & Rice'),
  ('CITIZEN60', 35, 'Proof-of-Work Community Pass (35% off any order)', NULL),
  ('WARDFOOD', 40, 'Ward Mobilizer Food Security Subsidy (40% off)', NULL)
ON CONFLICT (code) DO NOTHING;

-- Seed Marketplace Products
INSERT INTO public.products (slug, title, category, open_market_price, cooperative_price, unit, origin, image_url, in_stock, stock_count, description, pickup_hubs)
VALUES
  (
    'prod-rice-50kg',
    '50kg Premium Stone-Free Locally Milled Rice',
    'Grains & Rice',
    88000.00,
    52000.00,
    '50kg Bag',
    'Argungu Rice Paddies, Kebbi State',
    'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    true,
    420,
    'Direct-from-farm single-origin polished rice. Clean, stone-free, zero middleman cartels markup. Directly tracked through The Rice Test pilot ledger.',
    ARRAY['Lagos (Ojodu)', 'Abuja (Wuse)', 'Kano (Dawanau)', 'Ibadan (Bodija)', 'Kebbi (Argungu)']
  ),
  (
    'prod-garri-25kg',
    '25kg White Cassava Garri (Ijebu Special)',
    'Tubers & Staples',
    38000.00,
    22000.00,
    '25kg Bag',
    'Ijebu Farmers Cooperative, Ogun State',
    'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80',
    true,
    650,
    'Crispy, dry, well-fermented white garri processed by local cassava farmer clusters. Direct packaging without open market inflation.',
    ARRAY['Lagos (Ojodu)', 'Ibadan (Bodija)', 'Abeokuta (Kuto)', 'Benin (Ring Road)']
  ),
  (
    'prod-yam-bundle',
    'Bundle of 5 Jumbo Benue Yam Tubers',
    'Tubers & Staples',
    24000.00,
    13500.00,
    'Bundle (5 Large Tubers)',
    'Zaki Biam Yam Market, Benue State',
    'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    true,
    310,
    'Freshly harvested premium Benue yams sourced directly from Zaki Biam farmers with zero illegal road haulage tolls added.',
    ARRAY['Lagos (Ojodu)', 'Abuja (Wuse)', 'Makurdi (North Bank)', 'Enugu (Ogbete)']
  ),
  (
    'prod-oil-25l',
    '25 Litres Pure Refined Vegetable Cooking Oil',
    'Cooking Oils',
    62000.00,
    38500.00,
    '25L Keg',
    'Direct Manufacturer Cluster, Edo State',
    'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
    true,
    190,
    'Cholesterol-free, factory-sealed pure vegetable cooking oil distributed directly through PITS Food community wholesale networks.',
    ARRAY['Lagos (Ojodu)', 'Abuja (Wuse)', 'Ibadan (Bodija)', 'Port Harcourt (Mile 1)']
  ),
  (
    'prod-data-connect',
    'PITS Connect 25GB Monthly Community Data Voucher',
    'Civic Connectivity',
    14000.00,
    7500.00,
    'Digital Code / eSIM',
    'PITS Civic Mesh Infrastructure',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    true,
    1200,
    'Subsidized broadband data voucher enabling students, jobseekers, and small shop owners to stay connected at wholesale network pricing.',
    ARRAY['Instant Digital SMS / Email Dispatch (Nationwide)']
  ),
  (
    'prod-beans-50kg',
    '50kg White Honey Beans (Oloyin)',
    'Grains & Rice',
    95000.00,
    58000.00,
    '50kg Bag',
    'Maiduguri & Gombe Agricultural Hubs',
    'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80',
    true,
    280,
    'Weevil-free, naturally dried sweet honey beans sourced straight from northern farm clusters to beat artificial scarcity markups.',
    ARRAY['Lagos (Ojodu)', 'Abuja (Wuse)', 'Kano (Dawanau)', 'Jos (Terminus)']
  )
ON CONFLICT (slug) DO NOTHING;

-- Seed Petitions
INSERT INTO public.petitions (tracking_number, title, category, target_authority, summary, full_text, signatures_count, goal_count, deadline, is_urgent, status)
VALUES
  (
    'PITS-PET-2027-01',
    'Emergency Elimination of Illegal State Tolls on Interstate Food Haulage',
    'Food Security',
    'Federal Ministry of Agriculture & Nigeria Police Force',
    'Dismantle illegal revenue checkpoints that inflate food commodity costs between northern agricultural states and urban retail centers by over 30%.',
    'We, the undersigned citizens and community traders of Nigeria, demand the immediate enforcement of the Presidential Executive Order prohibiting non-statutory road blocks and extortion points on interstate food freight. Every truck of yam, grains, and perishables delayed on transit adds direct hunger penalties to struggling working families.',
    16420,
    20000,
    'May 30, 2026',
    true,
    'Active'
  ),
  (
    'PITS-PET-2027-02',
    'Public Audit of Inactive Neighborhood Electrical Transformers',
    'Infrastructure',
    'Nigerian Electricity Regulatory Commission (NERC)',
    'Mandate power distribution companies to replace broken community transformers within 14 working days or waive estimated billing for affected wards.',
    'Communities across Nigeria are subjected to extortionate community self-taxation to purchase and repair public distribution transformers that Disco operators own and profit from. We petition NERC to enforce strict service-level agreements and criminalize billing in darkened neighborhoods.',
    12150,
    15000,
    'June 15, 2026',
    true,
    'Active'
  ),
  (
    'PITS-PET-2027-03',
    'Direct Allocation of Paddy Rice from National Grain Reserves to Local Cooperatives',
    'Economic Justice',
    'Strategic Grain Reserve Department',
    'Bypass speculative wholesale cartels by delivering reserve grain directly to vetted grassroots market women cooperatives at subsidized baseline cost.',
    'Food palliative schemes have repeatedly failed because grains are handed to political brokers who repackage and resell at exorbitant black market rates. This petition demands direct ward-level cooperative distribution verified by grassroots civil society oversight.',
    21840,
    25000,
    'April 30, 2026',
    false,
    'Active'
  )
ON CONFLICT (tracking_number) DO NOTHING;

-- Seed Community Issues
INSERT INTO public.issues (tracking_id, title, category, state, lga, location, description, status, confirmations, image_url)
VALUES
  (
    'PITS-ISS-9041',
    'Collapsed Culvert & Flooded Access Road in Ojodu Berger',
    'Infrastructure',
    'Lagos',
    'Ikeja',
    'Ojodu Berger Underpass Corridor',
    'Heavy rains destroyed the main culvert connecting local market stalls to the transit bus stop. Commuters are stranded and local traders are suffering daily stock losses.',
    'Field Verified',
    142,
    'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80'
  ),
  (
    'PITS-ISS-9042',
    'Excessive Middleman Price Gouging on Local Rice Paddy',
    'Food Affordability',
    'Kebbi',
    'Argungu',
    'Central Grain Market, Argungu',
    'Grain cartels are hoarding newly harvested rice paddy and inflating sack prices by 65% above farm gate. Need PITS direct producer-to-consumer linkage pilot intervention.',
    'In Progress',
    289,
    'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80'
  ),
  (
    'PITS-ISS-9043',
    'Abandoned Transformer Leaving 4 Communities in Total Blackout',
    'Power & Light',
    'Oyo',
    'Ibadan North',
    'Bodija / Agbowo Border Settlement',
    'Distribution company disconnected the 500kVA transformer 8 months ago without replacement. Welders, barbers, and cold-room operators have lost livelihoods.',
    'Investigating',
    198,
    NULL
  ),
  (
    'PITS-ISS-9044',
    'Dry Season Borehole Contamination at Primary Health Center',
    'Water & Sanitation',
    'Kaduna',
    'Zaria',
    'Tudun Wada Health Post',
    'The sole public motorized borehole serving maternity ward and adjacent primary school broke down, forcing patients to fetch untreated stream water.',
    'Field Verified',
    167,
    'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80'
  ),
  (
    'PITS-ISS-9045',
    'Illegal Toll Checkpoints Imposed on Food Transit Trucks',
    'Food Affordability',
    'Benue',
    'Makurdi',
    'Katsina-Ala Transit Bridge',
    'Non-state extortionists demanding illegal N40,000 levies per food haulage lorry, driving up yam and cassava retail prices across southern distribution hubs.',
    'In Progress',
    312,
    NULL
  ),
  (
    'PITS-ISS-9046',
    'Primary Health Center Lacks Emergency Antivenom & Antibiotics',
    'Healthcare',
    'Plateau',
    'Barkin Ladi',
    'Heipang Health Dispensary',
    'Rural farmers traveling 35km to Jos for basic snakebite treatment and malaria diagnostics due to zero medical supply replenishment since January.',
    'Investigating',
    85,
    NULL
  )
ON CONFLICT (tracking_id) DO NOTHING;


-- Seed People's Voice Posts
INSERT INTO public.peoples_voice_posts (author_name, author_state, author_role, category, content, likes_count)
VALUES
  (
    'Dabiraoluwa Honey.A',
    'Lagos',
    'National Coordinator',
    'Campaign',
    'We are not here to talk about what could happen in 2027. We are proving what is possible right now with The Rice Test and community food hubs. If you have an idea for a direct farmer-to-consumer route in your ward, write it below.',
    142
  ),
  (
    'Dr. Kemi Adeyemi',
    'Oyo',
    'Health Volunteer',
    'Solution',
    'Recommendation: Let every ward set up a community medical emergency kitty. When a neighbor needs urgent antivenom or malaria drips at night, we should not wait for state bureaucracy. We can fund it collectively through our cooperative hubs.',
    89
  ),
  (
    'Ibrahim Mohammed',
    'Kaduna',
    'Youth Vanguard',
    'Story',
    'Yesterday at Zaria market, grain cartels tried to intimidate local women buying subsidized cooperative bags. Our youth monitors stood peacefully with them and made sure every mother left with her grain at farm-gate cost. Power is truly in the street.',
    215
  ),
  (
    'Blessing Nwachukwu',
    'Enugu',
    'Citizen Voice',
    'Idea',
    'Can we introduce student data pooling for public university students preparing for semester exams? High data costs are blocking hundreds of smart students from accessing online academic journals.',
    64
  );


-- ============================================================
-- 13. LGA REGISTRATIONS & COMMUNITY BALLOTING
-- ============================================================
CREATE TABLE IF NOT EXISTS lga_registrations (
  id            uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name     text        NOT NULL,
  phone         text        NOT NULL,
  email         text,
  lga           text        NOT NULL,
  ward          text,
  primary_need  text        NOT NULL DEFAULT 'Other',
  registered_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_lga_reg_lga  ON lga_registrations(lga);
CREATE INDEX IF NOT EXISTS idx_lga_reg_date ON lga_registrations(registered_at);

ALTER TABLE lga_registrations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_can_insert_lga" ON lga_registrations;
CREATE POLICY "public_can_insert_lga"
  ON lga_registrations FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_can_read_lga" ON lga_registrations;
CREATE POLICY "authenticated_can_read_lga"
  ON lga_registrations FOR SELECT
  TO authenticated
  USING (true);

CREATE OR REPLACE FUNCTION get_lga_counts()
RETURNS TABLE (lga text, count bigint)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT lga, COUNT(*) AS count
  FROM lga_registrations
  GROUP BY lga
  ORDER BY count DESC;
$$;

CREATE OR REPLACE FUNCTION get_lga_growth()
RETURNS TABLE (date date, count bigint)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT DATE(registered_at) AS date, COUNT(*) AS count
  FROM lga_registrations
  WHERE registered_at >= NOW() - INTERVAL '30 days'
  GROUP BY DATE(registered_at)
  ORDER BY date ASC;
$$;

GRANT EXECUTE ON FUNCTION get_lga_counts() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_lga_growth() TO anon, authenticated;


-- ============================================================
-- 14. MULTI-VENDOR MARKETPLACE & PAID MEMBERSHIP CLUB
-- ============================================================

-- Vendors / Merchant Stores
CREATE TABLE IF NOT EXISTS vendors (
  id              uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  store_name      text        NOT NULL,
  owner_name      text        NOT NULL,
  whatsapp        text        NOT NULL,
  email           text,
  state           text        DEFAULT 'Lagos',
  lga             text,
  address         text,
  category        text        DEFAULT 'General Store',
  is_verified     boolean     DEFAULT true,
  created_at      timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_vendors_whatsapp ON vendors(whatsapp);
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_can_read_vendors" ON vendors;
CREATE POLICY "public_can_read_vendors"
  ON vendors FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "public_can_insert_vendors" ON vendors;
CREATE POLICY "public_can_insert_vendors"
  ON vendors FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "vendors_can_update_own" ON vendors;
CREATE POLICY "vendors_can_update_own"
  ON vendors FOR UPDATE
  USING (true);

-- Vendor Products (extends marketplace)
CREATE TABLE IF NOT EXISTS vendor_products (
  id                uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_id         uuid        REFERENCES vendors(id) ON DELETE CASCADE,
  title             text        NOT NULL,
  category          text        NOT NULL,
  retail_price      numeric     NOT NULL, -- Normal visitor price
  member_price      numeric     NOT NULL, -- Discounted member price (e.g. 35-50% off)
  unit              text        DEFAULT 'Piece',
  image_url         text        NOT NULL,
  description       text,
  in_stock          boolean     DEFAULT true,
  stock_count       integer     DEFAULT 50,
  pickup_hubs       text[]      DEFAULT ARRAY['Pickup Available'],
  created_at        timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_vendor_products_vendor ON vendor_products(vendor_id);
ALTER TABLE vendor_products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_can_read_vendor_products" ON vendor_products;
CREATE POLICY "public_can_read_vendor_products"
  ON vendor_products FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "public_can_insert_vendor_products" ON vendor_products;
CREATE POLICY "public_can_insert_vendor_products"
  ON vendor_products FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "public_can_update_vendor_products" ON vendor_products;
CREATE POLICY "public_can_update_vendor_products"
  ON vendor_products FOR UPDATE
  USING (true);

-- Paid Memberships (₦3,200 Registration + Phone-bound Promo Code)
CREATE TABLE IF NOT EXISTS paid_memberships (
  id                uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name         text        NOT NULL,
  phone             text        NOT NULL UNIQUE, -- Promo code is tied directly to this phone
  email             text,
  state             text        DEFAULT 'Lagos',
  lga               text,
  promo_code        text        UNIQUE, -- e.g. PITS-7829-MEMBER
  payment_status    text        DEFAULT 'pending' CHECK (payment_status IN ('pending', 'verified', 'rejected')),
  amount_paid       numeric     DEFAULT 3200 NOT NULL,
  proof_reference   text,       -- Bank transfer reference or payer bank name
  proof_image_url   text,       -- Uploaded receipt / screenshot if available
  verified_at       timestamptz,
  created_at        timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_memberships_phone ON paid_memberships(phone);
CREATE INDEX IF NOT EXISTS idx_memberships_code  ON paid_memberships(promo_code);

ALTER TABLE paid_memberships ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_can_insert_memberships" ON paid_memberships;
CREATE POLICY "public_can_insert_memberships"
  ON paid_memberships FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "public_can_check_own_membership" ON paid_memberships;
CREATE POLICY "public_can_check_own_membership"
  ON paid_memberships FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "admin_can_update_memberships" ON paid_memberships;
CREATE POLICY "admin_can_update_memberships"
  ON paid_memberships FOR UPDATE
  USING (true);

-- Seed initial default vendor (Amvora Central Food Hub)
INSERT INTO vendors (id, store_name, owner_name, whatsapp, email, state, lga, category, is_verified)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'Amvora Central Hub & Cooperative Millers',
  'Amvora Light Foundation',
  '2348168850257',
  'moremillionvoices@gmail.com',
  'Lagos',
  'Ikeja',
  'Grains & Staples',
  true
) ON CONFLICT DO NOTHING;


-- ============================================================
-- 15. REFER & EARN POINT REWARD & BANK WITHDRAWAL ENGINE
-- ============================================================

-- Referrals table
CREATE TABLE IF NOT EXISTS member_referrals (
  id              uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_phone  text        NOT NULL, -- Referrer's phone (which is their referral code)
  referred_name   text        NOT NULL,
  referred_phone  text        NOT NULL UNIQUE,
  points_awarded  integer     DEFAULT 15 NOT NULL,
  status          text        DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed')),
  created_at      timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON member_referrals(referrer_phone);
ALTER TABLE member_referrals ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_can_insert_referrals" ON member_referrals;
CREATE POLICY "public_can_insert_referrals"
  ON member_referrals FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "public_can_read_referrals" ON member_referrals;
CREATE POLICY "public_can_read_referrals"
  ON member_referrals FOR SELECT
  USING (true);

-- Bank Cashout & Withdrawal Requests (Minimum 3,000 pts / ₦3,000 threshold)
CREATE TABLE IF NOT EXISTS withdrawal_requests (
  id              uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  member_phone    text        NOT NULL,
  member_name     text        NOT NULL,
  bank_name       text        NOT NULL,
  account_number  text        NOT NULL,
  account_name    text        NOT NULL,
  points_redeemed integer     NOT NULL,
  naira_amount    numeric     NOT NULL,
  status          text        DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'declined')),
  admin_notes     text,
  paid_at         timestamptz,
  created_at      timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_withdrawals_phone ON withdrawal_requests(member_phone);
ALTER TABLE withdrawal_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_can_insert_withdrawals" ON withdrawal_requests;
CREATE POLICY "public_can_insert_withdrawals"
  ON withdrawal_requests FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "public_can_read_withdrawals" ON withdrawal_requests;
CREATE POLICY "public_can_read_withdrawals"
  ON withdrawal_requests FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "admin_can_update_withdrawals" ON withdrawal_requests;
CREATE POLICY "admin_can_update_withdrawals"
  ON withdrawal_requests FOR UPDATE
  USING (true);

-- Helper RPC: get user referral points summary
CREATE OR REPLACE FUNCTION get_member_wallet_summary(phone_param text)
RETURNS TABLE (
  total_referrals bigint,
  total_points bigint,
  withdrawn_amount numeric,
  pending_withdrawal numeric
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT
    (SELECT COUNT(*) FROM member_referrals WHERE referrer_phone = phone_param) AS total_referrals,
    (SELECT COALESCE(SUM(points_awarded), 0) FROM member_referrals WHERE referrer_phone = phone_param AND status = 'confirmed') AS total_points,
    (SELECT COALESCE(SUM(naira_amount), 0) FROM withdrawal_requests WHERE member_phone = phone_param AND status = 'paid') AS withdrawn_amount,
    (SELECT COALESCE(SUM(naira_amount), 0) FROM withdrawal_requests WHERE member_phone = phone_param AND status = 'pending') AS pending_withdrawal;
$$;

GRANT EXECUTE ON FUNCTION get_member_wallet_summary(text) TO anon, authenticated;


-- ============================================================
-- 16. MOVEMENT SUPPORTERS & CITIZEN NETWORK (JOIN THE MOVEMENT)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.movement_members (
  id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name   text        NOT NULL,
  phone       text        NOT NULL,
  email       text,
  state       text        DEFAULT 'Lagos',
  joined_at   timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_movement_phone ON public.movement_members(phone);
CREATE INDEX IF NOT EXISTS idx_movement_date  ON public.movement_members(joined_at);

ALTER TABLE public.movement_members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_can_insert_movement" ON public.movement_members;
CREATE POLICY "public_can_insert_movement"
  ON public.movement_members FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "public_can_read_movement" ON public.movement_members;
CREATE POLICY "public_can_read_movement"
  ON public.movement_members FOR SELECT
  USING (true);

CREATE OR REPLACE FUNCTION get_movement_member_count()
RETURNS bigint
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT COUNT(*) FROM public.movement_members;
$$;

GRANT EXECUTE ON FUNCTION get_movement_member_count() TO anon, authenticated;
