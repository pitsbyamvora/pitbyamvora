import Link from "next/link";
import { BRAND_INFO } from "@/content/campaign";
import {
  Newspaper,
  Calendar,
  FileText,
  ArrowRight,
  Download,
  Share2,
  Mail,
  Phone,
  Sparkles,
} from "lucide-react";

export default function NewsroomPage() {
  const articles = [
    {
      id: "news-01",
      date: "April 11, 2026",
      category: "Official Communiqué",
      title: "PITS 2027 Publishes 30-Day Preliminary Audit on Grain Transit Tolls",
      summary: "Interstate haulage data across northern-southern corridors reveals N1.2 Billion in non-statutory road checkpoint extractions over a 30-day monitoring window.",
      readTime: "4 min read",
      author: "PITS Public Evidence Desk",
    },
    {
      id: "news-02",
      date: "April 04, 2026",
      category: "Field Pilot Update",
      title: "The Rice Test: Argungu Paddies Direct Collection Begins in Kebbi State",
      summary: "First 400 metric tons of single-origin stone-free paddy allocated directly to cooperative distribution hubs, cutting market retail price by 42%.",
      readTime: "3 min read",
      author: "Agricultural Operations Unit",
    },
    {
      id: "news-03",
      date: "March 28, 2026",
      category: "Movement Declaration",
      title: "“Don't Give Us 60 Days to Promise. Give Us 60 Days to Prove.”",
      summary: "Adeyinka Honey.A (Dabiraoluwa) addresses national civic leaders on the operational framework of moving from underestimated to unstoppable.",
      readTime: "6 min read",
      author: "Office of the Founder",
    },
    {
      id: "news-04",
      date: "March 15, 2026",
      category: "Citizen Rights",
      title: "PITS Submits Formal Petition on Broken Ward Transformers to NERC",
      summary: "Over 12,000 verified resident signatures delivered demanding complete estimated billing cancellation in dark communities.",
      readTime: "5 min read",
      author: "Legal Defense Desk",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Top Banner */}
      <section className="bg-[#171A19] text-white py-12 sm:py-16 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#ff5500] text-xs font-bold uppercase tracking-wider border border-white/10">
              <Newspaper className="w-3.5 h-3.5 text-[#ff5500]" />
              <span>Official Media Registry</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              PITS Movement Newsroom
            </h1>
            <p className="font-body text-xs sm:text-sm md:text-base text-white/80 leading-relaxed font-normal">
              Official press statements, empirical proof-of-work scorecards, and public declarations from the Power in the Street national leadership.
            </p>
          </div>
        </div>
      </section>

      {/* Main Articles List & Media Contacts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Articles Feed */}
          <div className="lg:col-span-8 space-y-6">
            {articles.map((item) => (
              <article
                key={item.id}
                className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm hover:border-[#ff5500]/50 hover:shadow-lg transition-all space-y-3"
              >
                <div className="flex items-center justify-between text-xs text-muted-foreground flex-wrap gap-2">
                  <span className="font-bold text-[#ff5500] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/20 text-[10px]">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{item.date}</span>
                    </span>
                    <span>•</span>
                    <span>{item.readTime}</span>
                  </div>
                </div>

                <h2 className="font-heading text-lg sm:text-xl font-bold text-foreground hover:text-[#ff5500] transition-colors leading-snug">
                  {item.title}
                </h2>

                <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.summary}
                </p>

                <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                  <span className="text-[11px] text-muted-foreground font-semibold">
                    By: {item.author}
                  </span>

                  <Link
                    href="/campaigns/60-day-proof-of-work"
                    className="text-[#ff5500] font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Read Statement</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Media Enquiries Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#171A19] text-white rounded-3xl p-6 sm:p-7 border border-white/10 space-y-4">
              <h3 className="font-heading font-black text-base text-white">
                Media & Press Contacts
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                For broadcast interviews, documentary access, and raw empirical survey data verification:
              </p>

              <div className="space-y-3 pt-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-white/90">
                  <Phone className="w-4 h-4 text-[#ff5500]" />
                  <span>{BRAND_INFO.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <Mail className="w-4 h-4 text-[#ff5500]" />
                  <span className="truncate">{BRAND_INFO.contact.email}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-[11px] text-white/60">
                Official handles: <strong className="text-white">@MoreMillionVoices</strong> across all platforms.
              </div>
            </div>

            <div className="bg-card border border-border rounded-3xl p-6 space-y-3">
              <h4 className="font-heading font-bold text-sm text-foreground">
                Proof Document Archive
              </h4>
              <p className="text-xs text-muted-foreground">
                Download verified pilot reports, the 60-Day charter, and public audit scorecards.
              </p>
              <Link
                href="/campaigns/60-day-proof-of-work"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#ff5500] hover:underline pt-1"
              >
                <span>Access Public Scorecard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
