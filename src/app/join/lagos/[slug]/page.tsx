"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MapPin, Phone, Mail, CheckCircle, ArrowLeft, ChevronDown, AlertCircle } from "lucide-react";
import { getLGABySlug, PRIMARY_NEEDS } from "@/lib/lga";
import { submitLGARegistration } from "@/lib/db";

export const dynamic = "force-dynamic";

export default function LGARegisterPage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const lga = getLGABySlug(slug);

  // All hooks must be declared before any conditional renders
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    ward: "",
    primaryNeed: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lga) return;
    if (!form.fullName.trim()) { setErrorMsg("Please enter your full name."); return; }
    if (!form.phone.trim()) { setErrorMsg("Phone number is required."); return; }
    if (!form.primaryNeed) { setErrorMsg("Please select what matters most to you."); return; }

    setStatus("submitting");
    setErrorMsg("");

    const result = await submitLGARegistration({
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || undefined,
      lga: lga.name,
      ward: form.ward.trim() || undefined,
      primaryNeed: form.primaryNeed,
    });

    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMsg(result.error ?? "Something went wrong. Please try again.");
    }
  };

  // Invalid LGA slug — show friendly 404
  if (!lga) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center gap-5">
        <AlertCircle className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
        <h1 className="text-2xl font-black text-foreground">LGA not found</h1>
        <p className="text-muted-foreground text-sm max-w-sm">
          We couldn't find a Lagos LGA matching this URL. Please select your LGA from the list.
        </p>
        <Link
          href="/join/lagos"
          className="rounded-lg bg-[#E85D04] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#d44f00] transition"
        >
          View all LGAs
        </Link>
      </div>
    );
  }

  // Success state
  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="max-w-md w-full space-y-6">
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-[#E85D04]" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-black text-foreground">You're registered!</h1>
          <p className="text-muted-foreground leading-relaxed">
            Welcome to PITS —{" "}
            <strong className="text-foreground">{lga.name} LGA</strong>. You are now part of the
            growing community driving change from the street up.
          </p>
          <div className="rounded-xl border border-border bg-card/60 p-5 text-left text-sm space-y-2">
            <p className="font-bold text-foreground">What happens next?</p>
            <ul className="space-y-1 text-muted-foreground list-disc list-inside">
              <li>Your LGA member count updates immediately</li>
              <li>You may be contacted for community meetings</li>
              <li>Share with others in {lga.name} to grow the movement</li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/join/lagos/results"
              className="rounded-lg bg-[#E85D04] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#d44f00] transition"
            >
              See live results
            </Link>
            <Link
              href="/#lagos-registration"
              className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition"
            >
              Back to LGA list
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full text-foreground">

      {/* ── Header ── */}
      <section className="py-12 sm:py-16 border-b border-border/40">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-4">
          <Link
            href="/#lagos-registration"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            All LGAs
          </Link>

          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E85D04]/10">
              <MapPin className="h-4 w-4 text-[#E85D04]" aria-hidden="true" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#E85D04]">
              {lga.region} · Lagos State
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Register in <br />
            <span className="text-[#E85D04]">{lga.name}</span>
          </h1>

          <p className="text-base text-muted-foreground max-w-lg leading-relaxed">
            Join the PITS community in {lga.name}. Your phone number is required so we can connect
            you to activities in your area.
          </p>
        </div>
      </section>

      {/* ── Form ── */}
      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-foreground mb-1.5">
                Full Name <span className="text-[#E85D04]">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                value={form.fullName}
                onChange={handleChange}
                placeholder="e.g. Adaeze Okafor"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#E85D04] focus:outline-none focus:ring-2 focus:ring-[#E85D04]/20"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-[#E85D04]" aria-hidden="true" />
                  Phone Number <span className="text-[#E85D04]">*</span>
                </span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="e.g. 0816 885 0257"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#E85D04] focus:outline-none focus:ring-2 focus:ring-[#E85D04]/20"
                required
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Required — we use this to connect you to local PITS activities.
              </p>
            </div>

            {/* Email (optional) */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                  Email Address{" "}
                  <span className="text-xs font-normal text-muted-foreground">(optional)</span>
                </span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="e.g. adaeze@example.com"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#E85D04] focus:outline-none focus:ring-2 focus:ring-[#E85D04]/20"
              />
            </div>

            {/* Ward (optional) */}
            <div>
              <label htmlFor="ward" className="block text-sm font-semibold text-foreground mb-1.5">
                Ward / Area{" "}
                <span className="text-xs font-normal text-muted-foreground">(optional)</span>
              </label>
              <input
                id="ward"
                name="ward"
                type="text"
                value={form.ward}
                onChange={handleChange}
                placeholder={`e.g. Ward 3, ${lga.name}`}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#E85D04] focus:outline-none focus:ring-2 focus:ring-[#E85D04]/20"
              />
            </div>

            {/* Primary Need */}
            <div>
              <label htmlFor="primaryNeed" className="block text-sm font-semibold text-foreground mb-1.5">
                What matters most to you? <span className="text-[#E85D04]">*</span>
              </label>
              <div className="relative">
                <select
                  id="primaryNeed"
                  name="primaryNeed"
                  value={form.primaryNeed}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-lg border border-border bg-background px-4 py-3 pr-10 text-sm text-foreground focus:border-[#E85D04] focus:outline-none focus:ring-2 focus:ring-[#E85D04]/20"
                  required
                >
                  <option value="">Select one…</option>
                  {PRIMARY_NEEDS.map((need) => (
                    <option key={need} value={need}>{need}</option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                This helps PITS prioritise programmes in {lga.name}.
              </p>
            </div>

            {/* Error */}
            {(status === "error" || errorMsg) && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {errorMsg || "Registration failed. Please try again."}
              </div>
            )}

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full rounded-lg bg-[#E85D04] py-3.5 text-sm font-bold text-white transition hover:bg-[#d44f00] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? "Registering…" : `Register in ${lga.name}`}
              </button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Your information is kept private and used only for PITS community purposes.
              </p>
            </div>

          </form>
        </div>
      </section>
    </div>
  );
}
