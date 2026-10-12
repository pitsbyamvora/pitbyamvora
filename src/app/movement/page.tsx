import type { Metadata } from "next";
import Link from "next/link";
import { BRAND_INFO, CORE_PROGRAMS } from "@/content/campaign";

export const metadata: Metadata = {
  title: "The Movement | PITS 2027 (Power in the Street)",
  description:
    "Power in the Street (PITS) — Supported by Amvora Light Foundation. Action versus campaign promises. The undermined is unstoppable.",
};

export default function MovementPage() {
  return (
    <div className="flex flex-col w-full bg-background text-foreground">
      {/* Header Banner */}
      <section className="bg-[#171A19] text-white py-20 border-b border-border/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold tracking-wider text-[#ff5500] uppercase">
            <span>PITS 2027 • POWER IN THE STREET</span>
            <span>•</span>
            <span>{BRAND_INFO.motto.toUpperCase()}</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            “Action Versus Campaign Promises. <br className="hidden sm:inline" />
            <span className="text-[#ff5500]">Proof, Not 60 Days of Waiting.”</span>
          </h1>

          <p className="font-body text-lg sm:text-xl text-white/85 max-w-3xl leading-relaxed font-light">
            {BRAND_INFO.declaration}
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ff5500]">
            The Core Concept
          </span>
          <p className="font-heading text-2xl text-foreground leading-relaxed font-bold">
            “Everybody can say ‘We will create jobs’ or ‘We will reduce poverty.’ Our concept says we will prove it.”
          </p>
          <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between text-xs text-muted-foreground gap-2">
            <span>Supported by: <strong>{BRAND_INFO.foundation}</strong></span>
            <span>Helpline: <strong>{BRAND_INFO.contact.phone}</strong></span>
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-20 bg-muted/30 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-black text-foreground mb-8">
            The Five Critical Survival Pillars
          </h2>

          <div className="space-y-6">
            {CORE_PROGRAMS.map((prog) => (
              <div
                key={prog.id}
                className="bg-card p-7 rounded-lg border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#ff5500] transition-colors"
              >
                <div className="space-y-1.5 max-w-2xl">
                  <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded bg-[#ff5500]/10 text-[#ff5500] border border-[#ff5500]/20">
                    {prog.category}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    {prog.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    {prog.summary}
                  </p>
                </div>
                <div className="shrink-0">
                  <Link
                    href={prog.actionLink}
                    className="inline-flex items-center px-4 py-2 rounded-md bg-[#ff5500] text-white text-xs font-bold hover:bg-[#e04b00] transition-colors"
                  >
                    View Test
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/volunteer"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold rounded-md bg-[#ff5500] text-white hover:bg-[#e04b00] transition-colors"
            >
              Enlist as Foot Soldier
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
