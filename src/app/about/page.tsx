"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Wheat,
  Wifi,
  Bus,
  ShoppingBasket,
  Users,
  Search,
  FlaskConical,
  Flag,
  CheckCheck,
  FileText,
  X,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  Heart,
  Handshake,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import { BRAND_INFO } from "@/content/campaign";

/* =========================================================================
   IMAGES Ã¢â‚¬â€ Unsplash + local logo
   ========================================================================= */
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1800&q=80&auto=format&fit=crop",
  founder: "/founder.jpg",
  street: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&auto=format&fit=crop",
  rice: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=900&q=80&auto=format&fit=crop",
  connect: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80&auto=format&fit=crop",
  move: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=900&q=80&auto=format&fit=crop",
  food: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=80&auto=format&fit=crop",
  community: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=900&q=80&auto=format&fit=crop",
  launch: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80&auto=format&fit=crop",
  candidateWide: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=900&q=80&auto=format&fit=crop",
  cta: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1800&q=80&auto=format&fit=crop",
};

const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80&auto=format&fit=crop",
    alt: "Community team gathering",
    caption: "Meeting people where they are",
  },
  {
    src: "https://images.unsplash.com/photo-1524069290683-0457abfe42c3?w=900&q=80&auto=format&fit=crop",
    alt: "Digital access drive",
    caption: "Bringing digital access to communities",
  },
  {
    src: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=80&auto=format&fit=crop",
    alt: "Local market traders",
    caption: "Supporting local traders",
  },
  {
    src: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=900&q=80&auto=format&fit=crop",
    alt: "Agricultural programme",
    caption: "Agricultural empowerment",
  },
  {
    src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=900&q=80&auto=format&fit=crop",
    alt: "Youth volunteers",
    caption: "Volunteers on the ground",
  },
  {
    src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900&q=80&auto=format&fit=crop",
    alt: "Grassroots leadership",
    caption: "Leadership from within",
  },
  {
    src: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80&auto=format&fit=crop",
    alt: "Community rally",
    caption: "The people united",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&auto=format&fit=crop",
    alt: "Streets of Nigeria",
    caption: "Power in the Street",
  },
];

/* =========================================================================
   CONTENT
   ========================================================================= */
const TESTS = [
  {
    icon: Wheat,
    name: "The Rice Test",
    text: "A transparent production-to-consumer tracking system that eliminates the middleman markup.",
    img: "rice",
  },
  {
    icon: Wifi,
    name: "PITS Connect",
    text: "Affordable digital access delivered through community hubs Ã¢â‚¬â€ not political handouts.",
    img: "connect",
  },
  {
    icon: Bus,
    name: "PITS Move",
    text: "Controlled, verifiable transit subsidies that reduce daily commuter costs.",
    img: "move",
  },
  {
    icon: ShoppingBasket,
    name: "PITS Food",
    text: "Bulk distribution partnerships with farmers and traders to drive real price savings.",
    img: "food",
  },
  {
    icon: Users,
    name: "Community Labs",
    text: "Community-led problem-solving teams that surface and address local needs from the inside.",
    img: "community",
  },
];

const EVIDENCE = [
  { icon: Search, title: "Baseline", text: "Establish exact costs before any intervention." },
  { icon: FlaskConical, title: "Intervention", text: "Define test parameters clearly and publicly." },
  { icon: Flag, title: "30 Days", text: "Publish the first milestone data report." },
  { icon: CheckCheck, title: "60 Days", text: "Document measurable final results openly." },
  { icon: FileText, title: "Verdict", text: "Release the public scorecard Ã¢â‚¬â€ wins and failures alike.", final: true },
];

const PHASES = [
  { name: "The Promise", from: 1, to: 7, text: "Launch the challenge; publish parameters publicly." },
  { name: "The Build", from: 8, to: 20, text: "Activate partners and operational pilots." },
  { name: "First Results", from: 21, to: 30, text: "Publish the 30-day public scorecard." },
  { name: "The Scale", from: 31, to: 55, text: "Expand credible models under real pressure." },
  { name: "The Verdict", from: 56, to: 60, text: "Compile and release the Final 60-Day Proof Report." },
];

const SPRINT = [
  { name: "Launch Digital Infrastructure", from: 0, to: 3, text: "App, identity and member onboarding." },
  { name: "Deploy Content", from: 2, to: 8, text: "Primary launch videos across all channels." },
  { name: "Paid Campaigns", from: 6, to: 42, text: "Targeted advertising in key communities." },
  { name: "Community Conversations", from: 8, to: 42, text: "People's Voice and social activations." },
  { name: "Street Mobilisation", from: 8, to: 42, text: "Foot soldiers, referral codes and local drives." },
];

const BEYOND = [
  "Security",
  "Affordable education",
  "Civil service reform",
  "Healthcare access",
  "Living wages",
  "Industrialisation & jobs",
];

const PILLARS = [
  { icon: Heart, label: "Cooperative Support" },
  { icon: GraduationCap, label: "Scholarships & Education" },
  { icon: ShieldCheck, label: "Legal Aid & Civil Rights" },
  { icon: Handshake, label: "Health & Community Care" },
];

/* =========================================================================
   HELPERS
   ========================================================================= */
function useInView(threshold = 0.3) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { setInView(true); return; }
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

function AnimatedStat({ value, label }: { value: number; label: string }) {
  const [ref, inView] = useInView(0.5);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1400, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <div ref={ref as RefObject<HTMLDivElement>} className="border-l-2 border-[#E85D04] pl-4">
      <p className="text-4xl font-black tracking-tight text-white sm:text-5xl">{n}</p>
      <p className="mt-1 text-sm text-slate-400">{label}</p>
    </div>
  );
}

/* =========================================================================
   PAGE
   ========================================================================= */
export default function AboutPage() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [rulerRef, rulerIn] = useInView(0.4);

  const photos = GALLERY;

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((c) => ((c ?? 0) + 1) % photos.length);
      if (e.key === "ArrowLeft") setLightbox((c) => ((c ?? 0) - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, photos.length]);

  return (
    <div className="flex flex-col w-full text-foreground">

      {/* ================================================================
          HERO
      ================================================================ */}
      <section className="relative isolate overflow-hidden bg-[#171A19] pt-20 pb-0 text-white">
        <img
          src={IMAGES.hero}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-15"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#171A19] via-[#171A19]/90 to-[#171A19]/40" />

        <div className="mx-auto grid max-w-7xl items-end gap-12 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:px-8">
          <div className="pb-14 lg:pb-20">
            <span className="inline-block rounded-full bg-[#E85D04]/20 px-3 py-1 text-xs font-bold tracking-wider text-[#E85D04] uppercase">
              PITS Ã¢â‚¬â€ Amvora Light Foundation
            </span>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl leading-none">
              Power in the Street
            </h1>
            <p className="mt-3 text-xl font-bold text-[#E85D04] sm:text-2xl">
              The 60-Day Proof-of-Work Challenge
            </p>

            <div className="mt-6 grid max-w-lg grid-cols-2 gap-6 border-t border-white/10 pt-6">
              <div>
                <p className="text-lg font-bold text-white">Action</p>
                <p className="mt-0.5 text-xs text-slate-400">versus empty campaign promises.</p>
              </div>
              <div className="border-l border-white/10 pl-6">
                <p className="text-lg font-bold text-white">Proof</p>
                <p className="mt-0.5 text-xs text-slate-400">Not 60 days of waiting.</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/volunteer"
                className="rounded-lg bg-[#E85D04] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2a5538]"
              >
                Join the movement
              </Link>
              <Link
                href="/campaigns/60-day-proof-of-work"
                className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
              >
                See the five tests
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-3 text-xs text-slate-400">
              <div className="relative h-9 w-9 rounded-full bg-white p-1 border border-[#E85D04]/40 shrink-0 overflow-hidden shadow-sm">
                <Image
                  src="/logo.jpg"
                  alt="Amvora Light Foundation Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <span>
                Supported by{" "}
                <strong className="text-slate-200">Amvora Light Foundation</strong>
              </span>
            </div>
          </div>

          {/* Pillar cards stack */}
          <div className="grid grid-cols-2 gap-3 pb-12 lg:pb-20">
            {PILLARS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E85D04]/40 text-[#E85D04]">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="text-xs font-semibold text-slate-200 leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slogan band */}
      <div className="bg-[#171A19] border-t border-[#E85D04]/30 py-3 text-center text-xs font-black uppercase tracking-widest text-[#E85D04]">
        THE UNDERMINED IS UNSTOPPABLE
      </div>

      {/* ================================================================
          FOUNDER SECTION
      ================================================================ */}
      <section className="py-16 lg:py-24 border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#E85D04]/30 bg-[#E85D04]/5 p-8 lg:p-12">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8">
                <span className="inline-block rounded-full bg-[#E85D04]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#E85D04]">
                  Visionary Founder
                </span>
                <h2 className="mt-4 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                  {BRAND_INFO.founder.name} &amp; the PITS Vision
                </h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
                  <p>
                    Behind the structural foundation of Power In The Streets is{" "}
                    <strong className="text-foreground">{BRAND_INFO.founder.name}</strong>, whose visionary
                    leadership and unwavering commitment to grassroots empowerment laid the groundwork for
                    this movement.
                  </p>
                  <p>
                    Recognising that ordinary Nigerians need immediate relief and sustainable systems Ã¢â‚¬â€ not
                    distant political rhetoric Ã¢â‚¬â€ she championed an agenda centred on direct community
                    intervention, transparency, and economic resilience.
                  </p>
                  <p className="italic text-[#E85D04] font-semibold border-l-4 border-[#E85D04] pl-4">
                    "{BRAND_INFO.founder.epithet}"
                  </p>
                </div>
              </div>
              <div className="lg:col-span-4 flex justify-center">
                <div className="relative w-full max-w-sm rounded-2xl border-2 border-[#E85D04]/30 bg-[#171A19] p-3 shadow-xl">
                  <div className="overflow-hidden rounded-xl bg-neutral-900">
                    <img
                      src={IMAGES.founder}
                      alt={BRAND_INFO.founder.name}
                      className="aspect-[3/4] w-full rounded-xl object-cover object-top"
                    />
                  </div>
                  <div className="mt-3 pb-2 text-center">
                    <p className="text-base font-bold text-white">{BRAND_INFO.founder.name}</p>
                    <p className="text-xs font-semibold text-[#E85D04] mt-0.5">{BRAND_INFO.founder.title}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          STATS
      ================================================================ */}
      <section className="bg-[#171A19] py-12 border-t border-white/5">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          <AnimatedStat value={60} label="Days to prove it" />
          <AnimatedStat value={5} label="Survival tests" />
          <AnimatedStat value={16} label="Community programmes" />
          <AnimatedStat value={200} label="Micro-mobilisers on the ground" />
        </div>
      </section>

      {/* ================================================================
          THE MESSAGE
      ================================================================ */}
      <section className="py-16 lg:py-24 border-b border-border/40">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#E85D04]">Our mandate</span>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl leading-tight">
              Don't give us 60 days to promise.{" "}
              <span className="text-[#E85D04]">Give us 60 days to prove.</span>
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                We are here to launch a new kind of movement. For decades, people have promised and
                failed. PITS has not come to make promises Ã¢â‚¬â€ we are here to test the waters for 60 days.
              </p>
              <p>
                Our team will test the realities of discounting daily amenities every Nigerian needs to
                survive. We will be the bridge between the people and manufacturers, farmers, local
                traders, and non-governmental organisations.
              </p>
            </div>
          </div>

          <div className="relative">
            <img
              src={IMAGES.street}
              alt="A Nigerian street scene"
              className="aspect-[4/3] w-full rounded-xl shadow-sm object-cover"
            />
            <p className="absolute -bottom-5 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-xs rounded-lg bg-[#171A19] p-4 text-sm font-semibold text-white shadow-lg">
              Show Nigerians what leadership can already begin to do.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            ["Transparent", "A 60-day public-service pilot with open data."],
            ["Focused", "Five core survival amenities measured rigorously."],
            ["Genuine", "A real public-policy experiment Ã¢â‚¬â€ not a photo op."],
          ].map(([t, d]) => (
            <div
              key={t}
              className="border-t-2 border-[#E85D04] bg-card/60 backdrop-blur-sm p-6 rounded-xl shadow-sm"
            >
              <p className="text-lg font-bold text-foreground">{t}</p>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-card/60 backdrop-blur-sm border border-border p-6 lg:p-8">
            <p className="text-base leading-relaxed text-muted-foreground">
              Politics is a trade and buy. People want what they can get now, because they are surviving
              extreme poverty and what we can accurately call collective emotional damage. We cannot
              capitalise on empty promises Ã¢â‚¬â€ we must meet everyone at their level by addressing what they
              can feel immediately in their daily lives.
            </p>
            <p className="mt-6 text-sm font-bold uppercase tracking-wide text-foreground">
              Our country's issues go well beyond these five areas:
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {BEYOND.map((b, i) => (
                <li
                  key={b}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium ${
                    i === 0
                      ? "bg-[#171A19] text-[#E85D04]"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              Security tops it all. The objective is simple: demonstrate capacity first.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          FIVE TESTS
      ================================================================ */}
      <section className="py-16 lg:py-24 border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E85D04]">Proof of work</span>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            The Five 60-Day Tests
          </h2>
          <p className="mt-2 max-w-xl text-base text-muted-foreground">
            Demonstrating capacity across the pillars Nigerians need most: Food, Mobility, Connectivity,
            Affordability, and Community.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TESTS.map((t, index) => (
              <article
                key={t.name}
                className={`overflow-hidden rounded-2xl border border-border bg-card/60 shadow-sm transition hover:shadow-md ${
                  index === 4 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <img
                  src={IMAGES[t.img as keyof typeof IMAGES]}
                  alt={t.name}
                  className="aspect-[16/9] w-full object-cover"
                  loading="lazy"
                />
                <div className="p-5 border-t border-border">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E85D04]/10 text-[#E85D04]">
                      <t.icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <h3 className="text-base font-bold text-foreground">{t.name}</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{t.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          NOT A BAG OF RICE Ã¢â‚¬â€ THE CHAIN
      ================================================================ */}
      <section className="bg-[#171A19] py-16 text-white lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#E85D04]">
              Our philosophy
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl leading-tight">
              Not a bag of rice. A system.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-300">
              <p>
                Instead of giving a family a one-time bag of rice and calling it empowerment, we are
                building the chain. We don't want to feed Nigerians for one day Ã¢â‚¬â€ we want to demonstrate
                how Nigerians can produce, access, and afford food consistently.
              </p>
              <p>
                Before asking anyone to believe in what governance could do, let us demonstrate what
                organised community leadership can already do.
              </p>
            </div>

            <ol className="mt-6 grid grid-cols-3 gap-3">
              {["Produce", "Access", "Afford"].map((s, i) => (
                <li
                  key={s}
                  className="rounded-xl border border-white/10 bg-white/5 p-3 text-center"
                >
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                    Step {i + 1}
                  </span>
                  <p className="font-bold text-[#E85D04] mt-1">{s}</p>
                </li>
              ))}
            </ol>

            <p className="mt-6 text-sm font-semibold text-slate-200">
              The bridge connects communities to:
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {["Manufacturers", "Farmers", "Local traders", "Non-governmental organisations"].map(
                (p) => (
                  <li
                    key={p}
                    className="rounded-md bg-white/10 px-3 py-1.5 text-xs text-slate-300"
                  >
                    {p}
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <img
              src={IMAGES.candidateWide}
              alt="Community partnership"
              className="aspect-[4/3] w-full rounded-xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* ================================================================
          EVIDENCE STANDARD
      ================================================================ */}
      <section className="py-16 lg:py-24 border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E85D04]">
            How we measure
          </span>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            The Higher Standard of Evidence
          </h2>
          <p className="mt-2 max-w-xl text-base text-muted-foreground">
            We don't attack others Ã¢â‚¬â€ we make the standard of evidence higher. Every pilot has a strict
            measurement system. We publish the quantities, costs, and actual savings.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {EVIDENCE.map((e, index) => (
              <div
                key={e.title}
                className="relative flex flex-col justify-between rounded-2xl border border-border bg-card/60 p-5 shadow-sm"
              >
                <div>
                  <span
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-white mb-3 ${
                      e.final ? "bg-[#E85D04]" : "bg-[#171A19]"
                    }`}
                  >
                    <e.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <p className="font-bold text-foreground">{e.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{e.text}</p>
                </div>
                <span className="mt-4 text-[10px] font-bold uppercase tracking-wider text-[#E85D04]">
                  Step {index + 1}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <p className="rounded-xl bg-card/60 border border-border p-6 text-sm leading-relaxed text-muted-foreground shadow-sm">
              Every PITS pilot will have a strict measurement system. We publish the quantities, the
              costs, and the actual consumer savings.{" "}
              <strong className="text-foreground">
                If something fails, we publish the failure.
              </strong>{" "}
              That makes the 60-day challenge a genuine public-policy experiment.
            </p>
            <p className="rounded-xl bg-[#E85D04] p-6 text-lg font-black leading-snug text-white flex items-center">
              Did we deliver? What did it cost? How much did the average community member save?
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          60-DAY RULER
      ================================================================ */}
      <section className="py-16 lg:py-24 border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E85D04]">
            Execution plan
          </span>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            The 60-Day Execution Structure
          </h2>
          <p className="mt-2 max-w-xl text-base text-muted-foreground">
            From underestimated to unstoppable Ã¢â‚¬â€ a phased public intervention in real time.
          </p>

          <div
            ref={rulerRef as RefObject<HTMLDivElement>}
            className="mt-10"
          >
            {/* Ruler */}
            <div
              className="flex h-10 gap-0.5 sm:h-12"
              role="img"
              aria-label="60-day ruler divided into five phases"
            >
              {Array.from({ length: 60 }, (_, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm transition-colors duration-300"
                  style={{
                    backgroundColor: rulerIn ? "#E85D04" : "#CBD5E1",
                    opacity: i % 9 === 0 || i === 0 ? 1 : 0.6,
                    transitionDelay: `${i * 14}ms`,
                  }}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-xs font-medium text-muted-foreground">
              <span>Day 1</span>
              <span>Day 30</span>
              <span>Day 60</span>
            </div>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {PHASES.map((p) => (
                <li
                  key={p.name}
                  className="rounded-2xl border border-border bg-card/60 p-5 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <p className="font-bold text-foreground">{p.name}</p>
                    <p className="text-xs font-semibold text-[#E85D04] mt-0.5">
                      Days {p.from}Ã¢â‚¬â€œ{p.to}
                    </p>
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">{p.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================================================================
          42-HOUR SPRINT
      ================================================================ */}
      <section className="py-16 lg:py-24 border-b border-border/40">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#E85D04]">
              Launch sequence
            </span>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              The 42-Hour Launch Sprint
            </h2>

            <div className="mt-6 hidden justify-between pl-44 text-xs font-medium text-muted-foreground sm:flex">
              {[0, 12, 24, 36, 42].map((h) => (
                <span key={h}>{h}h</span>
              ))}
            </div>

            <ul className="mt-3 space-y-4">
              {SPRINT.map((s) => (
                <li
                  key={s.name}
                  className="sm:grid sm:grid-cols-[11rem_1fr] sm:items-center sm:gap-4"
                >
                  <div>
                    <p className="text-xs font-bold leading-tight text-foreground">{s.name}</p>
                    <p className="text-[10px] text-muted-foreground">
                      Hours {s.from}Ã¢â‚¬â€œ{s.to}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <div className="relative h-6 rounded-lg bg-muted">
                      <div
                        className="absolute inset-y-0 rounded-lg bg-[#E85D04]"
                        style={{
                          left: `${(s.from / 42) * 100}%`,
                          width: `${((s.to - s.from) / 42) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{s.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <img
              src={IMAGES.launch}
              alt="Street mobilisers and community teams"
              className="aspect-[4/3] w-full rounded-xl object-cover"
            />
            <p className="text-sm leading-relaxed text-muted-foreground">
              The 42-hour sprint builds the digital foundation, but the real power is in the streets.
              We deploy{" "}
              <strong className="text-foreground">200 micro-mobilisers</strong> who distribute
              referral codes and help communities connect to the PITS platform.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          GALLERY Ã¢â‚¬â€ Bento grid
      ================================================================ */}
      <section className="py-16 lg:py-24 border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#E85D04]">
                Visual impact
              </span>
              <h2 className="mt-1 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                Power in the Street, in pictures
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              A glimpse into our community engagements, grassroots drives, and local market operations.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[140px] sm:auto-rows-[180px]">
            {photos.map((g, index) => {
              let bentoClass = "col-span-1 row-span-1";
              if (index === 0) bentoClass = "col-span-2 row-span-2";
              else if (index === 3) bentoClass = "col-span-1 sm:col-span-2 row-span-1";
              else if (index === 5) bentoClass = "col-span-2 row-span-1";

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setLightbox(index)}
                  className={`group relative overflow-hidden rounded-2xl bg-muted text-left shadow-sm transition hover:shadow-md ${bentoClass}`}
                  aria-label={`Open photo: ${g.caption}`}
                >
                  <img
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171A19]/80 via-[#171A19]/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100 flex items-end p-4">
                    <span className="text-xs font-semibold text-white tracking-wide">
                      {g.caption}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          FINAL CTA
      ================================================================ */}
      <section className="relative isolate overflow-hidden bg-[#171A19] py-16 text-center text-white lg:py-24">
        <img
          src={IMAGES.cta}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-15"
        />
        <div className="absolute inset-0 -z-10 bg-[#171A19]/80" />
        <div className="mx-auto max-w-4xl px-4">
          <p className="text-xs font-bold tracking-widest text-[#E85D04] uppercase">
            Don't give us 60 days to promise.
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">
            GIVE US 60 DAYS TO PROVE.
          </h2>
          <p className="mt-3 font-bold text-[#E85D04] text-lg">
            60 DAYS. 5 TESTS. REAL RESULTS.
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm text-slate-300">
            This is our offer to the nation: work with us Ã¢â‚¬â€ we want to work with you.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/volunteer"
              className="rounded-lg bg-[#E85D04] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2a5538]"
            >
              Join the movement
            </Link>
            <Link
              href="/donate"
              className="rounded-lg border border-white/20 px-6 py-2.5 text-sm font-semibold transition hover:bg-white/10"
            >
              Support the mission
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-slate-400">
            <a
              href={`tel:${BRAND_INFO.contact.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 hover:text-white"
            >
              <Phone className="h-3.5 w-3.5 text-[#E85D04]" aria-hidden="true" />
              {BRAND_INFO.contact.phone}
            </a>
            <a
              href={`mailto:${BRAND_INFO.contact.email}`}
              className="flex items-center gap-2 hover:text-white"
            >
              <Mail className="h-3.5 w-3.5 text-[#E85D04]" aria-hidden="true" />
              {BRAND_INFO.contact.email}
            </a>
          </div>
        </div>
      </section>

      {/* ================================================================
          LIGHTBOX
      ================================================================ */}
      {lightbox !== null && photos[lightbox] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Close photo"
          >
            <X className="h-5 w-5" />
          </button>
          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox((lightbox - 1 + photos.length) % photos.length);
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox((lightbox + 1) % photos.length);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                aria-label="Next photo"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
          <figure
            className="max-h-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[lightbox].src}
              alt={photos[lightbox].alt}
              className="max-h-[80vh] w-auto rounded-lg object-contain"
            />
            <figcaption className="mt-2 text-center text-xs text-white">
              {photos[lightbox].caption}
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}


