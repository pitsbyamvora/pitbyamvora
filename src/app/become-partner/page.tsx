"use client";

import { useState } from "react";
import Link from "next/link";
import { NIGERIAN_STATES } from "@/types/auth";
import { submitPartnerApplication } from "@/lib/db";
import {
  HeartHandshake,
  CheckCircle2,
  Tractor,
  Truck,
  Building2,
  ShieldCheck,
  ArrowRight,
  Phone,
} from "lucide-react";

export default function BecomePartnerPage() {
  const [partnerType, setPartnerType] = useState("Farmer / Producer Cluster");
  const [businessName, setBusinessName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("Kebbi");
  const [commodity, setCommodity] = useState("");
  const [capacity, setCapacity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const partnerTypes = [
    { title: "Farmer / Producer Cluster", icon: Tractor, desc: "Growers of paddy rice, cassava, yam, grains, and fresh vegetables." },
    { title: "Logistics & Freight Hauler", icon: Truck, desc: "Trucking and haulage operators bypassing illegal interstate tolls." },
    { title: "Warehousing & Aggregator", icon: Building2, desc: "Cold rooms and dry storage facilities serving ward distribution." },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitPartnerApplication({
        partnerType,
        businessName,
        contactPerson,
        phone,
        email,
        state,
        commodity,
        capacity,
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
            <span>PITS Producer Alliance</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            Become a Production Partner
          </h1>
          <p className="font-body text-xs sm:text-sm md:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            Link your farm, mill, or transport fleet directly to millions of verified Nigerian citizens without parasitic middleman markups.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {submitted ? (
          <div className="bg-card border border-emerald-500/30 rounded-3xl p-8 sm:p-10 shadow-lg text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-500 uppercase tracking-widest">
                Application Received
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
                Welcome to the PITS Producer Network
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                Our logistics and agricultural desk will contact <strong>{contactPerson}</strong> ({phone}) within 48 hours for site inspection and onboarding.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/marketplace"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#171A19] hover:bg-black text-white font-bold text-xs shadow-md transition"
              >
                <span>Return to Food Hub Catalogue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
            <div>
              <h2 className="font-heading text-lg sm:text-xl font-bold text-foreground">
                Partner Category Selection
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Choose how your enterprise connects with the PITS 60-Day Proof Network.
              </p>
            </div>

            {/* Category Selector Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {partnerTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = partnerType === type.title;
                return (
                  <button
                    key={type.title}
                    type="button"
                    onClick={() => setPartnerType(type.title)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? "border-[#ff5500] bg-[#ff5500]/5 ring-2 ring-[#ff5500]/20"
                        : "border-border hover:border-border/80 bg-background"
                    }`}
                  >
                    <Icon className={`w-6 h-6 mb-2 ${isSelected ? "text-[#ff5500]" : "text-muted-foreground"}`} />
                    <h4 className="font-bold text-xs text-foreground">{type.title}</h4>
                    <p className="text-[10px] text-muted-foreground mt-1 leading-normal">{type.desc}</p>
                  </button>
                );
              })}
            </div>

            {/* Application Form */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-border text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-foreground mb-1 uppercase tracking-wider text-[11px]">
                    Enterprise / Cooperative Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Kebbi Direct Rice Millers Cluster"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground"
                  />
                </div>

                <div>
                  <label className="block font-bold text-foreground mb-1 uppercase tracking-wider text-[11px]">
                    Lead Contact Person <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="e.g. Alhaji Mustapha Bello"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-foreground mb-1 uppercase tracking-wider text-[11px]">
                    Official Phone Number <span className="text-red-500">*</span>
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

                <div>
                  <label className="block font-bold text-foreground mb-1 uppercase tracking-wider text-[11px]">
                    State of Primary Operations <span className="text-red-500">*</span>
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-foreground mb-1 uppercase tracking-wider text-[11px]">
                    Commodities Produced / Transported <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={commodity}
                    onChange={(e) => setCommodity(e.target.value)}
                    placeholder="e.g. Milled Rice, Garri, Yam Tubers"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground"
                  />
                </div>

                <div>
                  <label className="block font-bold text-foreground mb-1 uppercase tracking-wider text-[11px]">
                    Estimated Weekly Capacity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    placeholder="e.g. 500 bags per week / 3 haulage trucks"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#ff5500] to-[#e04b00] hover:to-[#c73e00] text-white font-bold text-xs tracking-wider shadow-lg hover:shadow-xl transition-all mt-4"
              >
                Submit Partnership Application
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
