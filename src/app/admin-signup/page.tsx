"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NIGERIAN_STATES } from "@/types/auth";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  UserCheck,
  Lock,
} from "lucide-react";

export default function AdminSignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("Lagos");
  const [ward, setWard] = useState("");
  const [experience, setExperience] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-[85vh] bg-[#121413] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-lg w-full space-y-7 bg-[#1b1f1d] p-8 sm:p-10 rounded-3xl shadow-2xl border border-white/10">
        
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#ff5500] bg-white p-1 shadow-lg mb-2">
            <Image
              src="/logo.jpg"
              alt="PITS Logo"
              fill
              className="object-contain"
            />
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#ff5500]/15 text-[#ff5500] border border-[#ff5500]/30 text-[10px] font-bold font-mono uppercase tracking-widest">
            <UserCheck className="w-3 h-3" />
            <span>Coordinator Vetting Desk</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-white">
            Apply as Ward Coordinator
          </h2>
          <p className="text-xs text-white/60">
            PITS 2027 Grassroots State Leadership Registry
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-heading font-black text-xl text-white">
              Application Dispatched for Vetting
            </h3>
            <p className="text-xs text-white/70 max-w-sm mx-auto leading-relaxed">
              Thank you, <strong>{fullName}</strong>. The PITS National Mobilization Directorate will review your ward credential and issue a security access PIN.
            </p>
            <div className="pt-2">
              <Link
                href="/admin-login"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#ff5500] text-white font-bold text-xs"
              >
                <span>Proceed to Admin Sign In</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold uppercase tracking-wider text-[11px] mb-1">
                Full Legal Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Comrade Kalu Nnamdi"
                className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-black/40 text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold uppercase tracking-wider text-[11px] mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-black/40 text-white"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-[11px] mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+234 800 000 0000"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-black/40 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold uppercase tracking-wider text-[11px] mb-1">
                  State of Mobilization <span className="text-red-500">*</span>
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-black/40 text-white"
                >
                  {NIGERIAN_STATES.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-[11px] mb-1">
                  Ward & Local Community <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  placeholder="e.g. Ward 04, Ikeja LGA"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-black/40 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-[11px] mb-1">
                Brief Community Organizing Experience <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Mention past student union, youth association, market cooperative, or community leadership roles..."
                className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-black/40 text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#ff5500] hover:bg-[#e04b00] text-white font-bold text-xs tracking-wider shadow-lg transition-all"
            >
              Submit Coordinator Credentials
            </button>

            <div className="text-center pt-2 text-white/50">
              Already have security clearance?{" "}
              <Link href="/admin-login" className="text-[#ff5500] hover:underline font-bold">
                Log in here
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
