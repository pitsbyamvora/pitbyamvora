import Link from "next/link";
import { HeroCarousel } from "@/components/HeroCarousel";
import { LeadershipMindsetSection } from "@/components/LeadershipMindsetSection";
import { HomeMarketplaceSection } from "@/components/HomeMarketplaceSection";
import { HomeGallerySection } from "@/components/HomeGallerySection";
import { JoinMovementSection } from "@/components/JoinMovementSection";
import {
  BRAND_INFO,
  CORE_PROGRAMS,
} from "@/content/campaign";
import { ArrowRight, Sparkles, CheckCircle2, Shield, HeartHandshake, AlertCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-background text-foreground overflow-x-hidden">
      {/* 1. Multi-Frame Hero Carousel */}
      <HeroCarousel />

      {/* 2. Core Operational Philosophy from PDF */}
      <section className="py-14 sm:py-20 bg-card border-b border-border relative overflow-hidden">
        {/* Subtle background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ff5500]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 sm:space-y-5 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff5500]/10 text-[#ff5500] text-xs font-bold uppercase tracking-widest border border-[#ff5500]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The PITS Philosophy</span>
          </div>

          <blockquote className="font-heading text-lg sm:text-2xl md:text-3xl text-foreground font-bold leading-relaxed px-2 sm:px-4">
            “Politics is a trade and buy. People want what they can get now because they are surviving extreme poverty and collective emotional damage. We cannot capitalize on empty promises. Demonstrate capacity first.”
          </blockquote>

          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground pt-2 flex items-center justify-center gap-2 flex-wrap">
            <span className="text-[#ff5500] font-bold">PITS 2027</span>
            <span>•</span>
            <span className="italic">{BRAND_INFO.motto}</span>
            <span>•</span>
            <span>{BRAND_INFO.foundation}</span>
          </p>
        </div>
      </section>

      {/* 3. The Five 60-Day Tests from PDF */}
      <section className="py-16 sm:py-24 bg-muted/30 border-b border-border relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#ff5500] flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                <span>Demonstrating Capacity</span>
              </span>
              <h2 className="mt-2 font-heading text-2xl sm:text-4xl font-black text-foreground tracking-tight">
                The Five 60-Day Tests
              </h2>
            </div>
            <p className="font-body text-xs sm:text-sm text-muted-foreground max-w-md leading-relaxed">
              Targeting the five core survival amenities: Food, Mobility, Connectivity, Affordability, and Community Problem-Solving.
            </p>
          </div>

          {/* The Five 60-Day Tests — 2x2 on Mobile */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {CORE_PROGRAMS.map((program) => (
              <div
                key={program.id}
                className="bg-card rounded-xl sm:rounded-2xl p-3.5 sm:p-7 border border-border shadow-sm flex flex-col justify-between hover:border-[#ff5500]/60 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="space-y-2 sm:space-y-3.5">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[9px] sm:text-[11px] font-extrabold uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-[#ff5500]/10 text-[#ff5500] border border-[#ff5500]/20 truncate">
                      {program.category}
                    </span>
                    <span className="text-[10px] sm:text-xs font-semibold text-muted-foreground flex items-center gap-1 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span className="hidden sm:inline">{program.status}</span>
                    </span>
                  </div>

                  <h3 className="font-heading text-xs sm:text-lg font-bold text-card-foreground group-hover:text-[#ff5500] transition-colors line-clamp-2">
                    {program.title}
                  </h3>

                  <p className="font-body text-[11px] sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {program.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 60-Day Execution Structure & Measurement Phasing */}
      {/* 4. 60-Day Execution Structure & Measurement Phasing with Beautiful Motion Background */}
      <section className="py-16 sm:py-24 bg-[#111413] border-b border-white/10 relative overflow-hidden text-white">
        {/* Beautiful Ambient Motion Background with Glowing Orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#E85D04]/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute top-1/2 -right-32 w-96 h-96 bg-[#356B45]/25 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: "6s" }} />
          <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-orange-500/15 rounded-full blur-[90px] animate-pulse" style={{ animationDuration: "8s" }} />
          {/* Subtle grid mesh overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mb-10 sm:mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E85D04]">
              Operational Phasing
            </span>
            <h2 className="mt-2 font-heading text-2xl sm:text-4xl font-black text-white tracking-tight">
              60-Day Execution Structure
            </h2>
            <p className="mt-3 font-body text-sm sm:text-base text-white/70 leading-relaxed">
              Moving from underestimated to unstoppable by proving what structured public intervention looks like.
            </p>
          </div>

          {/* Operational Phasing — 2x2x1 on mobile, 5 cols on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6">
            {BRAND_INFO.executionPhases.map((phase, idx) => (
              <div
                key={phase.phase}
                className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 bg-white/[0.04] backdrop-blur-md flex flex-col justify-between hover:border-[#E85D04]/60 hover:bg-white/[0.07] transition-all duration-300 relative group shadow-lg ${
                  idx === 4 ? "col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] sm:text-[11px] font-bold font-mono text-[#E85D04] uppercase">
                      {phase.duration}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/10 text-white/70">
                      Step 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-white text-xs sm:text-base mb-1.5 line-clamp-1">
                    {phase.phase}
                  </h3>

                  <p className="font-body text-[11px] sm:text-xs text-white/70 leading-relaxed line-clamp-3">
                    {phase.focus}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. The Higher Standard of Evidence (From PDF) with Editorial Dark Texture */}
      <section className="py-16 sm:py-24 bg-[#171A19] text-white border-b border-white/10 relative overflow-hidden">
        {/* Subtle background image overlay with deep dark gradient */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171A19] via-[#171A19]/80 to-[#171A19] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#ff5500] text-xs font-bold uppercase tracking-widest border border-white/10">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#ff5500]" />
            <span>The Higher Standard of Evidence</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            “If something fails, we publish the failure.”
          </h2>

          <p className="font-body text-sm sm:text-base md:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
            How do we beat competing plans? Not by attacking others, but by making the standard of evidence higher. Every PITS pilot has a strict measurement system: baseline costs, clear parameters, 30-day initial data, 60-day final results, and an open public scorecard.
          </p>

          <div className="pt-2">
            <Link
              href="/campaigns/60-day-proof-of-work"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#E85D04] to-[#d44f00] text-white font-bold text-xs sm:text-sm transition-all duration-200 shadow-[0_4px_20px_rgba(232,93,4,0.35)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Inspect Proof-of-Work Architecture</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Youth Leadership, National Mindset & Recommended Books */}
      <LeadershipMindsetSection />

      {/* 6. Community Marketplace — Direct Farm-Gate Products */}
      <HomeMarketplaceSection />

      {/* 7. Live Field Photo Gallery */}
      <HomeGallerySection />

      {/* 8. Join The Movement (Grassroots Civic Solidarity Network) */}
      <JoinMovementSection />

      {/* 9. Citizen Empowerment & Marketplace Community CTA */}
      <section className="py-16 sm:py-20 bg-neutral-100 border-t border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-neutral-900">
            Wholesale Essentials for Every Nigerian
          </h2>
          <p className="text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed">
            Create a free account to browse directly or join our member discount club to unlock up to 50% off your food staples.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/register"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#E85D04] text-white text-xs sm:text-sm font-bold hover:bg-[#d14e00] transition shadow-sm"
            >
              Create Free Account
            </Link>
            <Link
              href="/marketplace"
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-neutral-300 bg-white text-neutral-800 text-xs sm:text-sm font-semibold hover:bg-neutral-50 transition"
            >
              Browse Marketplace
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
