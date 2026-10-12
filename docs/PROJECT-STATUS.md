# Project Status — Amvora / PITS

## 1. Project Overview
- **Project Name:** Amvora
- **Associated Civic Movement:** PITS — Power in the Street
- **Website Target:** https://amvora.com.ng
- **Core Technology Baseline:** Next.js (App Router), React 19, TypeScript, Tailwind CSS v4, Lucide React, GSAP, Supabase.

---

## 2. Platform Route Registry & Implementation Status

| Route | Purpose | Status |
|---|---|---|
| `/` | Homepage with 3s full-bleed Hero Carousel, PITS Philosophy, 5 Tests, and Higher Standard of Evidence | Complete |
| `/about` | Leadership, Founder (Adeyinka Honey.A), 60-Day Architecture | Complete |
| `/movement` | PITS Movement Declaration & 5 Pillars | Complete |
| `/campaigns/60-day-proof-of-work` | Full Strategy Document copy, 5 Tests, Execution Phasing | Complete |
| `/issues` | Community Issues Hub with 36-state filter, search, and upvote confirmations | Complete |
| `/report` | Incident Reporting workflow with category, landmark, and tracking ID dispatch | Complete |
| `/petitions` | Active Verified Petitions with real-time signature goal tracker and modal signing | Complete |
| `/marketplace` | Direct Farm-Gate Food Hub with live Citizen Promo Code price slasher & basket drawer | Complete |
| `/become-partner` | Producer & Hauler Alliance onboarding | Complete |
| `/volunteer` | Foot Soldier & Community Organizer enrollment across 4 units | Complete |
| `/newsroom` | Press statements, official communiqués, media contacts | Complete |
| `/privacy-policy` | NDPA 2023 / NDPR Data Privacy Charter protecting anonymous whistleblowers | Complete |
| `/login` | Citizen Member Login with 1-click test credentials | Complete |
| `/register` | Citizen Registration with 36 Nigerian states dropdown and code of conduct | Complete |
| `/forgot-password` | Password recovery workflow | Complete |
| `/portal` | Member Portal with Citizen ID Pass, 60-Day task checklist, and activity feed | Complete |
| `/admin-login` | Administrative Command Desk login with PIN authorization | Complete |
| `/admin-signup` | Ward Coordinator vetting application | Complete |
| `/admin-dashboard` | Command Center: Incident Moderation Desk, Petitions Oversight, Food Hub controls, RBAC | Complete |
| `/error.tsx` | Global error boundary with auto-recovery and helpline | Complete |
| `/not-found.tsx` | Custom 404 page with navigation shortcuts | Complete |
| `/loading.tsx` | Global loading state with civic indicator | Complete |
| `/sitemap.ts` | Complete SEO XML sitemap with static date strings | Complete |

---

## 3. Brand & Architecture Compliance Check
- **Branding**: Pure **PITS (Power in the Street)** supported by **Amvora Light Foundation** — all "Hope in Action" references removed.
- **Icons**: 100% `lucide-react` vector icons (no casual emojis).
- **Navbar**: Floating pill navigation matching user's exact uploaded reference image.
- **Hero**: Full-bleed responsive background photography with lighter overlays and 3-second GSAP transitions.
- **Marketplace**: Dual price ledger with active citizen promo code discount engine (`PITS2027`, `RICETEST`, `CITIZEN60`, `WARDFOOD`).
- **Prerender Guards**: Zero dynamic `new Date()` calls in Server Components.

---

## 4. Production Database Architecture & Data Setup (`supabase/schema.sql`)
1. **PostgreSQL Tables Configured**:
   - `profiles`: Synced directly with Supabase Auth via trigger `on_auth_user_created`. Holds citizen membership, LGA, ward, polling unit, and role ('citizen', 'coordinator', 'admin').
   - `issues`: Community incident reports with tracking IDs (`PITS-ISS-XXXX`), 36 Nigerian states, status pipeline, and confirmation count.
   - `issue_confirmations`: Unique constraint on `(issue_id, user_id)` preventing duplicate upvotes.
   - `petitions`: Civic petitions with tracking numbers (`PITS-PET-2027-XX`), target authorities, deadline, and live signature milestones.
   - `petition_signatures`: Citizen signature ledger with duplicate-prevention index on `(petition_id, signer_email)`.
   - `products`: Food hub catalogue with open-market vs cooperative farm-gate prices, stock counts, and pickup hubs across Nigerian cities (Lagos, Abuja, Kano, Ibadan, Kebbi, Benue).
   - `promo_codes`: Citizen subsidy codes (`PITS2027`, `RICETEST`, `CITIZEN60`, `WARDFOOD`).
   - `orders`: Marketplace checkout records with pickup vouchers (`PITS-HUB-XXXXX`), promo application, items breakdown, and status workflow.
   - `volunteers`: Roster of civic foot soldiers categorized by 4 operational tracks.
   - `partners`: Farm clusters, freight haulers, and warehouse aggregators onboarding data.
2. **Security & Access Control (RLS)**:
   - Row Level Security (RLS) enabled on all 10 tables.
   - Public read access for published products, active petitions, and verified issues.
   - Granular write policies allowing authenticated users to manage their profiles and orders, while admins have oversight capabilities.
3. **Data Access Layer (`src/lib/db.ts`)**:
   - Bridges UI components (`/issues`, `/petitions`, `/marketplace`, `/report`, `/volunteer`, `/become-partner`, `/admin-dashboard`) directly to Supabase when environment keys are configured in `.env.local`.
   - Automatically provides seamless zero-downtime static seed fallbacks when running locally or before connecting Supabase credentials.
