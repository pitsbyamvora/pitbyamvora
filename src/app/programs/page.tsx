import Link from "next/link";
import Image from "next/image";
import { CORE_PROGRAMS, BRAND_INFO } from "@/content/campaign";
import {
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Wheat,
  Wifi,
  Bus,
  ShoppingBag,
  Wrench,
  Users,
  Shield,
  HeartHandshake,
} from "lucide-react";

export default function ProgramsPage() {
  const pillarIcons = [Wheat, Wifi, Bus, ShoppingBag, Wrench];

  const extendedPrograms = [
    {
      id: "prog-vetting",
      title: "2027 Candidate & Leadership Vetting Registry",
      category: "Governance",
      summary: "Citizen-driven scorecard grading political candidates on track records, public asset declarations, and commitment to the 60-Day Proof standard before elections.",
      status: "Citizen Vetting",
      link: "/movement",
      icon: Shield,
    },
    {
      id: "prog-students",
      title: "Amvora / PITS Students & Youth Network",
      category: "Youth Empowerment",
      summary: "Organizing across tertiary institutions and vocational institutes in Nigeria to provide subsidized academic data, leadership mentorship, and non-violent civic advocacy training.",
      status: "Nationwide Chapters",
      link: "/volunteer",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Top Banner */}
      <section className="bg-[#171A19] text-white py-12 sm:py-16 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#ff5500] text-xs font-bold uppercase tracking-wider border border-white/10">
              <Layers className="w-3.5 h-3.5 text-[#ff5500]" />
              <span>PITS Strategic Interventions</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              Core Civic Programs & Initiatives
            </h1>
            <p className="font-body text-xs sm:text-sm md:text-base text-white/80 leading-relaxed font-normal">
              Direct give-back interventions addressing the five daily survival amenities needed for every Nigerian: Food, Mobility, Connectivity, Affordability, and Opportunity.
            </p>
          </div>
        </div>
      </section>

      {/* Main 5 Survival Pillars Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ff5500]">
            The 60-Day Proof Architecture
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-foreground">
            The Five Critical Survival Pillars
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Tested, measured, and verified against empirical cost data. We demonstrate capability first before asking citizens to believe in promises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CORE_PROGRAMS.map((program, idx) => {
            const Icon = pillarIcons[idx % pillarIcons.length];
            return (
              <div
                key={program.id}
                className="bg-card border border-border rounded-3xl p-6 sm:p-7 shadow-sm hover:border-[#ff5500]/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-[#ff5500]/10 text-[#ff5500] flex items-center justify-center group-hover:bg-[#ff5500] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-[#ff5500] px-2.5 py-0.5 rounded-full bg-[#ff5500]/10">
                      {program.status}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground block mb-1">
                      {program.category}
                    </span>
                    <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-[#ff5500] transition-colors leading-snug">
                      {program.title}
                    </h3>
                  </div>

                  <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {program.summary}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-border flex items-center justify-between text-xs font-bold">
                  <Link
                    href={program.actionLink}
                    className="text-[#ff5500] hover:underline flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Inspect Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional National Initiatives */}
        <div className="pt-8 border-t border-border space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#ff5500]">
              Broader Governance & Youth Outreach
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-black text-foreground mt-1">
              Complementary Civic Frameworks
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {extendedPrograms.map((prog) => {
              const Icon = prog.icon;
              return (
                <div
                  key={prog.id}
                  className="bg-card border border-border rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col justify-between hover:border-[#ff5500]/50 transition"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-muted text-[#ff5500] flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold text-muted-foreground font-mono">
                        {prog.status}
                      </span>
                    </div>

                    <h3 className="font-heading text-base sm:text-lg font-bold text-foreground">
                      {prog.title}
                    </h3>

                    <p className="font-body text-xs text-muted-foreground leading-relaxed">
                      {prog.summary}
                    </p>
                  </div>

                  <div className="pt-5 mt-4 border-t border-border">
                    <Link
                      href={prog.link}
                      className="text-[#ff5500] font-bold text-xs hover:underline flex items-center gap-1.5"
                    >
                      <span>Get Involved</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Mobilization Banner */}
        <div className="bg-[#171A19] text-white rounded-3xl p-8 sm:p-12 text-center space-y-5 border border-white/10 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <h3 className="font-heading text-2xl sm:text-3xl font-black text-white">
              “Work With Me, I Want To Work With You.”
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-body">
              Every program is powered by volunteer foot soldiers, cooperative farmers, and everyday working citizens. Choose how you participate today.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/volunteer"
                className="px-6 py-3 rounded-full bg-[#ff5500] hover:bg-[#e04b00] text-white font-bold text-xs shadow-md transition"
              >
                Join as Volunteer
              </Link>
              <Link
                href="/marketplace"
                className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 text-white font-semibold text-xs transition"
              >
                Access Subsidized Food Hub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
