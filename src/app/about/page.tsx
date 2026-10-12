import type { Metadata } from "next";
import Link from "next/link";
import { BRAND_INFO } from "@/content/campaign";

export const metadata: Metadata = {
  title: "About PITS | Power in the Street",
  description:
    "Learn about Power in the Street (PITS) supported by Amvora Light Foundation. A 60-Day public proof-of-work challenge demonstrating capacity across Nigeria.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full bg-background text-foreground">
      {/* Banner */}
      <section className="bg-[#171A19] text-white py-20 border-b border-border/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold tracking-wider text-[#ff5500] uppercase">
            <span>ABOUT THE MOVEMENT</span>
            <span>•</span>
            <span>PITS 2027</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            PITS: Power in the Street. <br className="hidden sm:inline" />
            <span className="text-[#ff5500]">The Undermined Is Unstoppable.</span>
          </h1>

          <p className="font-body text-lg sm:text-xl text-white/85 max-w-3xl leading-relaxed font-light">
            Supported by Amvora Light Foundation. We are a direct give-back to the community campaign designed as a 60-Day Public Proof-of-Work Challenge. We are the bridge between the people and manufacturers, farmers, local traders, and non-governmental organizations.
          </p>
        </div>
      </section>

      {/* Leadership & Charter */}
      <section className="py-16 bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-muted/20 border border-border rounded-xl p-8 sm:p-10 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#ff5500]">
                Movement Leadership & Vision
              </span>
              <h2 className="font-heading text-3xl font-black text-foreground">
                {BRAND_INFO.founder.name}
              </h2>
              <p className="font-body text-sm font-semibold text-[#ff5500]">
                {BRAND_INFO.founder.title} — <em>“{BRAND_INFO.founder.epithet}”</em>
              </p>
            </div>

            <p className="font-body text-base text-muted-foreground leading-relaxed">
              We would make the entire campaign architecture revolve around one sentence: <strong>“Don’t give us 60 days to promise. Give us 60 days to prove.”</strong> That is much more distinctive than another campaign saying “We will make Nigeria better.” At the end of these 60 days, we will answer the public with hard evidence: Did we deliver? What did it cost? And how much did the average consumer save?
            </p>

            <div className="pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-muted-foreground">
              <p><strong>Hotline:</strong> {BRAND_INFO.contact.phone}</p>
              <p><strong>Support:</strong> {BRAND_INFO.contact.email}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Phasing Highlights */}
      <section className="py-20 bg-background border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#ff5500]">
              The 60-Day Architecture
            </span>
            <h2 className="mt-2 font-heading text-3xl font-black text-foreground">
              60 Days. 5 Tests. Real Results.
            </h2>
            <p className="mt-4 font-body text-base text-muted-foreground leading-relaxed">
              We are moving campaign communication from what candidates say they will do, to what leadership can demonstrate, measure, and improve. This is our offer to the nation: <em>Work with me, I want to work with you.</em>
            </p>
          </div>

          <div className="text-center pt-4">
            <Link
              href="/volunteer"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold rounded-md bg-[#ff5500] text-white hover:bg-[#e04b00] transition-colors"
            >
              Enlist as a PITS Volunteer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
