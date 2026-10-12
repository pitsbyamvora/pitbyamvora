import Link from "next/link";
import { HeroCarousel } from "@/components/HeroCarousel";
import {
  BRAND_INFO,
  CORE_PROGRAMS,
} from "@/content/campaign";
import { ArrowRight, Sparkles, CheckCircle2, Shield, HeartHandshake, AlertCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-background text-foreground overflow-x-hidden">
      {/* 1. Multi-Frame Hero Carousel with GSAP Animations & Stock Photography */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {CORE_PROGRAMS.map((program) => (
              <div
                key={program.id}
                className="bg-card rounded-2xl p-6 sm:p-7 border border-border shadow-sm flex flex-col justify-between hover:border-[#ff5500]/60 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-md bg-[#ff5500]/10 text-[#ff5500] border border-[#ff5500]/20">
                      {program.category}
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>{program.status}</span>
                    </span>
                  </div>

                  <h3 className="font-heading text-lg sm:text-xl font-bold text-card-foreground group-hover:text-[#ff5500] transition-colors">
                    {program.title}
                  </h3>

                  <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {program.summary}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-border flex items-center justify-between text-xs font-bold">
                  <Link
                    href={program.actionLink}
                    className="text-[#ff5500] hover:underline flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                  >
                    <span>View Test Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 60-Day Execution Structure & Measurement Phasing */}
      <section className="py-16 sm:py-24 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10 sm:mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ff5500]">
              Operational Phasing
            </span>
            <h2 className="mt-2 font-heading text-2xl sm:text-4xl font-black text-foreground tracking-tight">
              60-Day Execution Structure
            </h2>
            <p className="mt-3 font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
              Moving from underestimated to unstoppable by proving what structured public intervention looks like.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {BRAND_INFO.executionPhases.map((phase, idx) => (
              <div
                key={phase.phase}
                className="rounded-2xl p-5 sm:p-6 border border-border bg-muted/20 flex flex-col justify-between hover:border-[#ff5500]/50 transition-all duration-300 relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold font-mono text-[#ff5500] uppercase">
                      {phase.duration}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-muted-foreground">
                      Step 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-foreground text-base sm:text-lg mb-2">
                    {phase.phase}
                  </h3>

                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
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
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#e04b00] hover:to-[#c73e00] text-white font-bold text-xs sm:text-sm transition-all duration-200 shadow-[0_4px_20px_rgba(255,85,0,0.35)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Inspect Proof-of-Work Architecture</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Citizen Mobilization Strip */}
      <section className="py-16 sm:py-24 bg-muted/40 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-heading text-2xl sm:text-4xl font-black text-foreground">
            The Real Power Is In The Streets
          </h2>
          <p className="font-body text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We are deploying foot soldiers and community organizers to connect residents directly with food, mobility, connectivity, and opportunity.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5">
            <Link
              href="/volunteer"
              className="flex items-center justify-center gap-2 px-8 py-3.5 text-xs sm:text-sm font-bold rounded-xl bg-gradient-to-r from-[#ff5500] to-[#e04b00] text-white hover:to-[#c73e00] transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Volunteer as a Foot Soldier</span>
            </Link>
            <Link
              href="/report"
              className="flex items-center justify-center gap-2 px-8 py-3.5 text-xs sm:text-sm font-semibold rounded-xl border border-border text-foreground hover:bg-card transition-all"
            >
              <AlertCircle className="w-4 h-4 text-[#ff5500]" />
              <span>Report a Community Issue</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
