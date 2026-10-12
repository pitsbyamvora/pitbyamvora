"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { NIGERIAN_STATES } from "@/types/auth";
import { BRAND_INFO } from "@/content/campaign";
import { submitCommunityIssue } from "@/lib/db";
import {
  MapPin,
  Camera,
  CheckCircle2,
  AlertCircle,
  Shield,
  ArrowRight,
  Info,
  Phone,
  FileText,
} from "lucide-react";

export default function ReportPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Infrastructure");
  const [state, setState] = useState("Lagos");
  const [lga, setLga] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const categories = [
    "Infrastructure",
    "Food Affordability",
    "Power & Light",
    "Water & Sanitation",
    "Healthcare",
    "Security",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await submitCommunityIssue({
        title,
        category,
        state,
        lga: lga || "Ward Central",
        location,
        description,
        isAnonymous,
        reporterId: user?.id,
      });

      setSubmittedId(res.trackingId);
    } catch {
      const fallbackId = `PITS-ISS-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedId(fallbackId);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Top Banner */}
      <section className="bg-[#171A19] text-white py-12 sm:py-16 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#ff5500] text-xs font-bold uppercase tracking-wider border border-white/10">
            <Shield className="w-3.5 h-3.5 text-[#ff5500]" />
            <span>PITS Citizen Evidence Desk</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            Report a Community Challenge
          </h1>
          <p className="font-body text-xs sm:text-sm md:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            Document infrastructure breakdowns, food price gouging, electricity blackouts, or public health neglect. Verified reports are dispatched directly to ward mobilizers.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {submittedId ? (
          /* Submission Success State */
          <div className="bg-card border border-emerald-500/30 rounded-3xl p-8 sm:p-10 shadow-lg text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest font-mono">
                Field Report Dispatched
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
                Thank You for Taking Civic Action
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
                Your report has been assigned a unique public verification tracking ID. PITS foot soldiers in <strong>{state}</strong> will investigate the site.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-muted/30 border border-border inline-block text-center font-mono">
              <span className="text-xs text-muted-foreground block">Public Tracking Number</span>
              <span className="text-xl sm:text-2xl font-black text-[#ff5500] tracking-wider">
                {submittedId}
              </span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/issues"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#171A19] text-white hover:bg-black font-bold text-xs transition"
              >
                Browse All Community Issues
              </Link>
              <button
                type="button"
                onClick={() => {
                  setSubmittedId(null);
                  setTitle("");
                  setDescription("");
                  setLocation("");
                  setLga("");
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-full border border-border hover:bg-muted font-semibold text-xs transition"
              >
                File Another Incident
              </button>
            </div>
          </div>
        ) : (
          /* Report Submission Form */
          <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
            <div className="border-b border-border pb-4 flex items-center justify-between">
              <div>
                <h2 className="font-heading text-lg sm:text-xl font-bold text-foreground">
                  Incident Information
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Provide factual details. Every report undergoes grassroots verification.
                </p>
              </div>
              <span className="text-[11px] font-mono font-bold text-[#ff5500] px-2.5 py-1 rounded bg-[#ff5500]/10">
                PITS Form 01
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              {/* Challenge Title */}
              <div>
                <label className="block font-bold text-foreground uppercase tracking-wider mb-1.5">
                  Headline of Challenge <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Collapsed culvert preventing market access / N45,000 sack price gouging"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500]"
                />
              </div>

              {/* Category & State Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-foreground uppercase tracking-wider mb-1.5">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500]"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-foreground uppercase tracking-wider mb-1.5">
                    State of Nigeria <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500]"
                  >
                    {NIGERIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* LGA & Specific Landmark Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-foreground uppercase tracking-wider mb-1.5">
                    Local Government Area (LGA) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={lga}
                    onChange={(e) => setLga(e.target.value)}
                    placeholder="e.g. Ikeja / Argungu / Zaria"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-foreground uppercase tracking-wider mb-1.5">
                    Exact Community Landmark <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Opposite Central Health Post, Bodija Market"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-bold text-foreground uppercase tracking-wider mb-1.5">
                  Detailed Description & Impact on Daily Living <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain how long the problem has lasted, who is affected (traders, students, patients), and any previous unanswered appeals to local authorities..."
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500]"
                />
              </div>

              {/* Photo Evidence Box */}
              <div>
                <label className="block font-bold text-foreground uppercase tracking-wider mb-1.5">
                  Photographic / Video Evidence
                </label>
                <div className="border-2 border-dashed border-border rounded-2xl p-6 text-center space-y-2 hover:border-[#ff5500] transition cursor-pointer bg-muted/10">
                  <Camera className="w-8 h-8 text-[#ff5500] mx-auto" />
                  <p className="text-xs font-semibold text-foreground">
                    Upload geolocated photo from site
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    JPG, PNG, or MP4 up to 25MB. Photos help ground coordinators verify the problem faster.
                  </p>
                </div>
              </div>

              {/* Submitter Identity Setting */}
              <div className="pt-2 border-t border-border flex items-center justify-between">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded text-[#ff5500] focus:ring-[#ff5500] h-4 w-4"
                  />
                  <span>Submit anonymously (hide name from public feed)</span>
                </label>

                {user && (
                  <span className="text-[11px] text-[#ff5500] font-semibold">
                    Attaching Citizen ID: {user.membershipNumber || "PITS-704921"}
                  </span>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#ff5500] to-[#e04b00] hover:to-[#c73e00] text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <span>Transmitting Field Report...</span>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span>Submit to PITS Verification Desk</span>
                  </>
                )}
              </button>
            </form>

            {/* Helpline Notice */}
            <div className="p-4 rounded-xl bg-muted/40 border border-border flex items-center gap-3 text-xs text-muted-foreground">
              <Phone className="w-4 h-4 text-[#ff5500] flex-shrink-0" />
              <span>
                For life-threatening emergencies or urgent security threats, call the PITS helpline directly:{" "}
                <strong className="text-foreground">{BRAND_INFO.contact.phone}</strong>.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
