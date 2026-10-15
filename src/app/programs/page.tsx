import Link from "next/link";
import Image from "next/image";
import {
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Sprout,
  HeartHandshake,
  Music,
  HeartPulse,
  Home,
  Scale,
  Crown,
  ShoppingBag,
  Award,
  Store,
  UserCheck,
  BookOpen,
  Activity,
  LifeBuoy,
  ShieldCheck,
  Users,
} from "lucide-react";

interface ProgramItem {
  number: string;
  title: string;
  summary: string;
  tag: string;
  icon: typeof Briefcase;
  image?: string;
  featured?: boolean;
}

export default function ProgramsPage() {
  const programs: ProgramItem[] = [
    {
      number: "01",
      title: "Cooperative & Entrepreneur Support",
      summary:
        "Mentorship, cooperative formation, micro-grant referrals, and peer accountability networks for entrepreneurs seeking sustainable business growth.",
      tag: "Enterprise",
      icon: Briefcase,
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
      featured: true,
    },
    {
      number: "02",
      title: "Education, Scholarships & Conferences",
      summary:
        "Scholarship applications, business workshops, conference travel grant support, and mentorship from seasoned leaders across industries.",
      tag: "Academic",
      icon: GraduationCap,
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    },
    {
      number: "03",
      title: "Agricultural Education & Internships",
      summary:
        "Hands-on farming placements, fish farming, animal husbandry, landowner partnerships, agribusiness training, and direct food-production cooperatives.",
      tag: "Agri-Food",
      icon: Sprout,
      image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80",
      featured: true,
    },
    {
      number: "04",
      title: "Sponsorships & Support",
      summary:
        "Individual sponsorships, organization grants, international partner referrals, and grassroots project funding support.",
      tag: "Grants",
      icon: HeartHandshake,
    },
    {
      number: "05",
      title: "Entertainment & Talent Discovery",
      summary:
        "Talent showcases, creative industry connections, career coaching, media production, and nationwide visibility campaigns for rising stars.",
      tag: "Creative",
      icon: Music,
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    },
    {
      number: "06",
      title: "Medical Health & Fundraising",
      summary:
        "Health fund management, medical cost subsidies, community health outreaches, emergency care funds, and environmental health education.",
      tag: "Healthcare",
      icon: HeartPulse,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
      featured: true,
    },
    {
      number: "07",
      title: "Homes for the Elderly & Disabled",
      summary:
        "Safe home-placement support, therapy access, assistive equipment, professional caregiver training, and compassionate community integration.",
      tag: "Social Welfare",
      icon: Home,
    },
    {
      number: "08",
      title: "Legal Intervention & Civil Rights",
      summary:
        "Civil legal aid referrals, citizen rights education, pro-bono consultation matching, and grassroots civil advocacy against unlawful extortion.",
      tag: "Justice",
      icon: Scale,
    },
    {
      number: "09",
      title: "Premium Membership",
      summary:
        "Advanced executive workshops, one-on-one coaching, premium learning content, and priority placement in national economic opportunities.",
      tag: "Mastery",
      icon: Crown,
    },
    {
      number: "10",
      title: "Marketplace & Job Board",
      summary:
        "Direct product and service listings, local job postings, CV & verified credentials uploads, and vetted employer-member trust profiles.",
      tag: "Commerce",
      icon: ShoppingBag,
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    },
    {
      number: "11",
      title: "Paid Workshops & Quarterly Summits",
      summary:
        "High-impact leadership workshops, entrepreneurship bootcamps, industrialization summits, and seamless digital registration.",
      tag: "Summits",
      icon: Award,
    },
    {
      number: "12",
      title: "Community Branding & Local Services",
      summary:
        "Local enterprise directories, indigenous restaurants, neighborhood hospitality, verified transport routes, and community consumables.",
      tag: "Local Economy",
      icon: Store,
    },
    {
      number: "13",
      title: "Corporate & Domestic Staffing",
      summary:
        "Corporate personnel recruitment, domestic staff matching, background-verified member profiles, and reliable employer-member trust systems.",
      tag: "Workforce",
      icon: UserCheck,
    },
    {
      number: "14",
      title: "AMVORALIGHT Students Programme",
      summary:
        "Specialized program for students from age 15+: educational materials, girl-child self-development, sanitary relief packages, sports, and skill acquisition.",
      tag: "Youth Network",
      icon: BookOpen,
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      featured: true,
    },
    {
      number: "15",
      title: "Health & Wellness Centre",
      summary:
        "Weekly health education, physical community walk-outs, online fitness classes, nutritional guidance, and community health challenges.",
      tag: "Wellness",
      icon: Activity,
    },
    {
      number: "16",
      title: "Student Support & Intervention Centre",
      summary:
        "Academic mentorship, scholarship access, career pathway guidance, examination prep support, and student psychosocial crisis intervention.",
      tag: "Mentorship",
      icon: LifeBuoy,
    },
  ];

  return (
    <div className="min-h-screen bg-transparent text-foreground pb-24">
      {/* 1. Hero Section */}
      <section className="py-16 sm:py-20 border-b border-border/40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-muted/60 text-[#E85D04] text-xs font-bold uppercase tracking-wider border border-border">
              <Layers className="w-3.5 h-3.5 text-[#E85D04]" />
              <span>AMVORALIGHT • OPPORTUNITY & EMPOWERMENT ECOSYSTEM</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.12]">
              Built to Grow, Empower & Sustain Every Nigerian.
            </h1>

            <p className="font-body text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-normal">
              From cooperative businesses to scholarships, healthcare, legal aid, talent discovery, and premium coaching — AMVORALIGHT is a complete ecosystem for opportunity and impact.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs sm:text-sm font-bold rounded-full bg-[#E85D04] hover:bg-[#D04D00] text-white shadow-md hover:shadow-lg transition-all"
              >
                <span>Join & Apply</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/donate"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs sm:text-sm font-semibold rounded-full border border-border bg-card/60 backdrop-blur-md hover:bg-muted text-foreground transition-all"
              >
                <span>Support the Mission</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Bento Grid of All 16 Programs & Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/40 pb-6">
          <div className="space-y-1 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E85D04]">
              Comprehensive Roster
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-foreground">
              Empowerment & Service Categories
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Every initiative is structured to lift barriers, build capacity, and link Nigerian citizens directly to real-world opportunities.
            </p>
          </div>
          <div className="text-xs font-mono font-bold text-muted-foreground">
            16 Active Tracks
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((prog) => {
            const Icon = prog.icon;
            return (
              <div
                key={prog.number}
                className={`group relative rounded-3xl border border-border/70 bg-card/75 backdrop-blur-sm p-6 sm:p-7 transition-all duration-300 hover:border-[#E85D04]/50 hover:shadow-xl flex flex-col justify-between overflow-hidden ${
                  prog.featured ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                {/* Background Accent Image for featured cards */}
                {prog.image && (
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-5 -mt-1 border border-border/50">
                    <Image
                      src={prog.image}
                      alt={prog.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-2.5 left-3 text-[10px] font-mono font-bold text-white uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20">
                      {prog.tag}
                    </span>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-[#E85D04] px-2.5 py-1 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/20">
                      {prog.number}
                    </span>
                    {!prog.image && (
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                        {prog.tag}
                      </span>
                    )}
                    <div className="w-9 h-9 rounded-xl bg-muted/60 border border-border/60 flex items-center justify-center text-foreground group-hover:text-[#E85D04] group-hover:border-[#E85D04]/30 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-heading text-lg sm:text-xl font-black text-foreground group-hover:text-[#E85D04] transition-colors leading-snug">
                    {prog.title}
                  </h3>

                  <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {prog.summary}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-border/50 flex items-center justify-between">
                  <Link
                    href="/register"
                    className="text-xs font-bold text-[#E85D04] hover:underline inline-flex items-center gap-1.5"
                  >
                    <span>Apply / Inquire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    PITS Ecosystem
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. The Promise Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="rounded-3xl border border-border/70 bg-gradient-to-br from-card via-card/90 to-muted/40 p-8 sm:p-12 lg:p-16 text-center space-y-6 shadow-sm relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/25 text-[#E85D04] text-xs font-bold uppercase tracking-wider mx-auto">
            <ShieldCheck className="w-4 h-4 text-[#E85D04]" />
            <span>The Amvora Promise</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-foreground max-w-3xl mx-auto leading-tight">
            “We are not waiting for leaders. <br />
            <span className="text-[#E85D04]">We are becoming them.”</span>
          </h2>

          <p className="font-body text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Every program under AMVORALIGHT is practical, verifiable, and open to all Nigerians regardless of background. Join our grassroots movement and take ownership of your future.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/register"
              className="px-8 py-3.5 rounded-full bg-[#E85D04] hover:bg-[#D04D00] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
            >
              Get Started with AMVORALIGHT
            </Link>
            <Link
              href="/movement"
              className="px-8 py-3.5 rounded-full border border-border hover:bg-muted text-foreground font-semibold text-xs sm:text-sm transition-all"
            >
              Read Movement Charter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
