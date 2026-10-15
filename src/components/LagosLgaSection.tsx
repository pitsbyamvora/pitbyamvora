import Link from "next/link";
import { MapPin, Users, TrendingUp, ArrowRight } from "lucide-react";
import { LAGOS_LGAS } from "@/lib/lga";

export function LagosLgaSection() {
  const mainlands = LAGOS_LGAS.filter((l) => l.region === "Mainland");
  const islands = LAGOS_LGAS.filter((l) => l.region === "Island");
  const suburbans = LAGOS_LGAS.filter((l) => l.region === "Suburban");

  return (
    <section id="lagos-registration" className="py-16 sm:py-24 bg-card/60 border-b border-border relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E85D04]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#356B45]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/20 text-xs font-bold uppercase tracking-widest text-[#E85D04]">
              <MapPin className="w-3.5 h-3.5" />
              <span>Grassroots Mobilisation • Lagos State</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight">
              Select Your Local <span className="text-[#E85D04]">Government Area</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              PITS is growing ward-by-ward, street-by-street. Tap on your LGA below to register directly, make your voice count, and view what your local community needs most.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground bg-muted/50 px-3.5 py-2 rounded-lg border border-border">
              <Users className="w-4 h-4 text-[#E85D04]" />
              <span>20 Local Governments</span>
            </div>
            <Link
              href="/join/lagos/results"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E85D04] text-white hover:bg-[#d44f00] text-xs font-bold transition-all shadow-sm"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Check Live Results</span>
              <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
            </Link>
          </div>
        </div>

        {/* LGA Ballot Grids by Region */}
        <div className="space-y-10">
          {/* Mainland */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E85D04]" />
              <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                Lagos Mainland ({mainlands.length} LGAs)
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {mainlands.map((lga) => (
                <LgaCard key={lga.slug} lga={lga} />
              ))}
            </div>
          </div>

          {/* Island */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                Lagos Island & Coastal ({islands.length} LGAs)
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {islands.map((lga) => (
                <LgaCard key={lga.slug} lga={lga} />
              ))}
            </div>
          </div>

          {/* Suburban / Growth Corridors */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                Suburban & Emerging Corridors ({suburbans.length} LGAs)
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {suburbans.map((lga) => (
                <LgaCard key={lga.slug} lga={lga} />
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Results Banner */}
        <div className="rounded-2xl border border-border bg-gradient-to-r from-card to-muted/40 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-xs font-bold uppercase tracking-wider text-[#E85D04]">
              Public Community Scorecard
            </p>
            <h4 className="text-xl sm:text-2xl font-black text-foreground">
              Wondering which LGA has the highest registered members?
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Monitor transparent, live member registrations and 14-day growth statistics across Lagos.
            </p>
          </div>
          <Link
            href="/join/lagos/results"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background hover:bg-foreground/90 font-bold text-xs sm:text-sm transition-all shrink-0"
          >
            <TrendingUp className="w-4 h-4 text-[#E85D04]" />
            <span>Open LGA Leaderboard & Results</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function LgaCard({ lga }: { lga: (typeof LAGOS_LGAS)[number] }) {
  return (
    <Link
      href={`/join/lagos/${lga.slug}`}
      className="group flex flex-col justify-between p-3.5 sm:p-4 rounded-xl border border-border bg-card hover:bg-card/90 hover:border-[#E85D04] transition-all hover:shadow-md hover:-translate-y-0.5"
    >
      <div className="flex items-center justify-between gap-1 mb-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">
          {lga.region}
        </span>
        <MapPin className="w-3.5 h-3.5 text-muted-foreground group-hover:text-[#E85D04] transition-colors" />
      </div>

      <p className="font-bold text-foreground text-sm group-hover:text-[#E85D04] transition-colors line-clamp-1">
        {lga.name}
      </p>

      <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-[11px] text-[#E85D04] font-semibold opacity-80 group-hover:opacity-100">
        <span>Register</span>
        <span className="group-hover:translate-x-0.5 transition-transform">→</span>
      </div>
    </Link>
  );
}
