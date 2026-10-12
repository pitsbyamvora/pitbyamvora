import type { Metadata } from "next";
import Link from "next/link";
import { BRAND_INFO, CORE_PROGRAMS } from "@/content/campaign";

export const metadata: Metadata = {
  title: "The 60-Day Proof-of-Work Challenge | PITS 2027",
  description:
    "Don't give us 60 days to promise. Give us 60 days to prove. 60 Days. 5 Tests. Real Results. Power in the Street (PITS) supported by Amvora Light Foundation.",
};

export default function ProofOfWorkPage() {
  return (
    <div className="flex flex-col w-full bg-background text-foreground">
      {/* 1. Header Banner */}
      <section className="bg-[#171A19] text-white py-20 border-b border-border/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold tracking-wider text-[#ff5500] uppercase">
            <span>PITS 2027 • PUBLIC SERVICE PILOT</span>
            <span>•</span>
            <span>THE UNDERMINED IS UNSTOPPABLE</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            “Don’t Give Us 60 Days to Promise. <br className="hidden sm:inline" />
            <span className="text-[#ff5500]">Give Us 60 Days to Prove.”</span>
          </h1>

          <p className="font-body text-lg sm:text-xl text-white/85 max-w-3xl leading-relaxed font-light">
            Welcome, everyone. We are here to launch a new kind of political movement. For decades, people have promised and failed. PITS has not come as a movement to make promises; we are here to test the waters for 60 days.
          </p>

          <div className="pt-4 flex flex-wrap gap-4 text-xs font-medium text-white/80">
            <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-md">
              <span className="text-[#ff5500] font-bold">Action:</span> Versus campaign promises
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-md">
              <span className="text-[#ff5500] font-bold">Proof:</span> Not 60 days of waiting
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-md">
              <span className="text-[#ff5500] font-bold">Foundation:</span> {BRAND_INFO.foundation}
            </div>
          </div>
        </div>
      </section>

      {/* 2. The Five 60-Day Tests (From Page 3 of PDF) */}
      <section className="py-20 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ff5500]">
              Demonstrating Capacity
            </span>
            <h2 className="font-heading text-3xl font-black text-foreground">
              The Five 60-Day Tests
            </h2>
            <p className="font-body text-sm text-muted-foreground">
              Demonstrating capacity across critical survival pillars before asking Nigerians to believe in what a government could do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BRAND_INFO.fiveTests.map((t, i) => (
              <div
                key={t.name}
                className="bg-card rounded-lg p-7 border border-border shadow-sm space-y-3 hover:border-[#ff5500] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#ff5500]">Test 0{i + 1}</span>
                  <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded bg-muted text-muted-foreground">Active Pilot</span>
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">{t.name}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{t.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. The Higher Standard of Evidence (From Page 4 & 5 of PDF) */}
      <section className="py-20 bg-muted/20 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ff5500]">
              Operational Framework
            </span>
            <h2 className="mt-2 font-heading text-3xl font-black text-foreground">
              60-Day Execution Phasing
            </h2>
            <p className="mt-3 font-body text-base text-muted-foreground">
              Every PITS pilot has a strict measurement system: Before, Intervention, 30 Days, 60 Days, and Verdict.
            </p>
          </div>

          <div className="space-y-4">
            {BRAND_INFO.executionPhases.map((phase) => (
              <div
                key={phase.phase}
                className="border border-border rounded-lg p-6 bg-card flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-mono text-[#ff5500] uppercase">{phase.duration}</span>
                    <span className="text-xs font-bold text-foreground">• {phase.phase}</span>
                  </div>
                  <p className="font-body text-sm text-muted-foreground">{phase.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Action CTA */}
      <section className="py-20 bg-[#171A19] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-white">
            “The Undermined Is Unstoppable.”
          </h2>
          <p className="font-body text-base text-white/80 max-w-xl mx-auto">
            Work with me, I want to work with you. Sign up as a foot soldier and volunteer in your community.
          </p>
          <div className="pt-2">
            <Link
              href="/volunteer"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold rounded-md bg-[#ff5500] text-white hover:bg-[#e04b00] transition-colors"
            >
              Join the PITS Movement
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
