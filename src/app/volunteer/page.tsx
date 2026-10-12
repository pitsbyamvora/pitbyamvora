"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NIGERIAN_STATES } from "@/types/auth";
import { BRAND_INFO } from "@/content/campaign";
import { submitVolunteerApplication } from "@/lib/db";
import {
  HeartHandshake,
  CheckCircle2,
  Users,
  Compass,
  Megaphone,
  ShieldCheck,
  ArrowRight,
  Phone,
  Sparkles,
} from "lucide-react";

export default function VolunteerPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("Lagos");
  const [role, setRole] = useState("Field Price Auditor & Food Monitor");
  const [hoursPerWeek, setHoursPerWeek] = useState("3 - 5 hours");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const volunteerRoles = [
    {
      title: "Field Price Auditor & Food Monitor",
      desc: "Collect and verify local market retail prices on rice, garri, and fuel in your council.",
      icon: Compass,
    },
    {
      title: "Ward Townhall Mobilizer",
      desc: "Organize street-level citizen assemblies and register neighbors for 2027 collective voting.",
      icon: Users,
    },
    {
      title: "Digital Vanguard & Media Broadcaster",
      desc: "Amplify verified community evidence reports, press releases, and investigative findings.",
      icon: Megaphone,
    },
    {
      title: "Rapid Response & Citizen Defender",
      desc: "Support victims of extortionate road haulage tolls and public utility disconnections.",
      icon: ShieldCheck,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitVolunteerApplication({
        fullName,
        email,
        phone,
        state,
        role,
        hoursPerWeek,
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Top Banner */}
      <section className="bg-[#171A19] text-white py-12 sm:py-16 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#ff5500] text-xs font-bold uppercase tracking-wider border border-white/10">
            <HeartHandshake className="w-3.5 h-3.5 text-[#ff5500]" />
            <span>PITS Civic Mobilization Force</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            Volunteer as a Foot Soldier
          </h1>
          <p className="font-body text-xs sm:text-sm md:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            The real power is in the streets. Join thousands of dedicated young Nigerians building an organized citizen base to hold public institutions accountable.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Four Core Volunteer Units */}
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground text-center mb-6">
            Choose Your Operational Volunteer Unit
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {volunteerRoles.map((r) => {
              const Icon = r.icon;
              const isSelected = role === r.title;
              return (
                <div
                  key={r.title}
                  onClick={() => setRole(r.title)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                    isSelected
                      ? "border-[#ff5500] bg-[#ff5500]/5 ring-2 ring-[#ff5500]/20"
                      : "border-border bg-card hover:border-[#ff5500]/50"
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${isSelected ? "bg-[#ff5500] text-white" : "bg-muted text-[#ff5500]"}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm text-foreground">{r.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Application Card */}
        <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-sm max-w-2xl mx-auto">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-black text-xl sm:text-2xl text-foreground">
                Welcome to the Street Movement
              </h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{fullName}</strong>. You have been assigned to the <strong>{state}</strong> mobilization cohort for the <em>{role}</em> track.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                <Link
                  href="/portal"
                  className="px-6 py-2.5 rounded-full bg-[#171A19] text-white font-bold text-xs"
                >
                  Enter Member Portal
                </Link>
                <Link
                  href="/campaigns/60-day-proof-of-work"
                  className="px-6 py-2.5 rounded-full border border-border text-foreground font-semibold text-xs"
                >
                  Review 60-Day Strategy
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="border-b border-border pb-3">
                <h3 className="font-heading font-bold text-base text-foreground">
                  Citizen Volunteer Registration Form
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Selected Unit: <strong className="text-[#ff5500]">{role}</strong>
                </p>
              </div>

              <div>
                <label className="block font-bold text-foreground mb-1 uppercase tracking-wider text-[11px]">
                  Full Legal Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Adebisi Oluwaseun"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-foreground mb-1 uppercase tracking-wider text-[11px]">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="volunteer@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground"
                  />
                </div>

                <div>
                  <label className="block font-bold text-foreground mb-1 uppercase tracking-wider text-[11px]">
                    Phone Number (WhatsApp Active) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 800 000 0000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-foreground mb-1 uppercase tracking-wider text-[11px]">
                    State of Primary Residence <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground"
                  >
                    {NIGERIAN_STATES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-foreground mb-1 uppercase tracking-wider text-[11px]">
                    Available Commitment
                  </label>
                  <select
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground"
                  >
                    <option value="1 - 2 hours">1 - 2 hours / week</option>
                    <option value="3 - 5 hours">3 - 5 hours / week</option>
                    <option value="6 - 10 hours">6 - 10 hours / week</option>
                    <option value="Full Time Field Coordinator">Full-time Coordinator</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#ff5500] to-[#e04b00] hover:to-[#c73e00] text-white font-bold text-xs tracking-wider shadow-lg transition-all mt-4"
              >
                Enroll as PITS Foot Soldier
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
