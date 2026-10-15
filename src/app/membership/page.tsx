"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Copy,
  Building2,
  Sparkles,
  ArrowRight,
  Clock,
  Phone,
  Tag,
  ShoppingBag,
  Zap,
  HelpCircle,
  AlertCircle,
} from "lucide-react";
import { submitPaidMembership, recordReferralSignup } from "@/lib/db";

export default function MembershipPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    state: "Lagos",
    lga: "",
    proofReference: "",
    referrerPhone: "",
  });

  const [copiedAccount, setCopiedAccount] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const bankDetails = {
    accountName: "AMVORA LIGHT FOUNDATION",
    bankName: "Access Bank PLC",
    accountNumber: "1849204812",
    amount: "₦3,200",
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(bankDetails.accountNumber);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.proofReference.trim()) {
      setErrorMsg("Please provide your Full Name, Phone Number, and Payment Reference / Sender Name.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    const res = await submitPaidMembership({
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      state: formData.state,
      lga: formData.lga,
      proofReference: formData.proofReference,
    });

    setSubmitting(false);
    if (res.success) {
      if (formData.referrerPhone.trim()) {
        recordReferralSignup({
          referrerPhone: formData.referrerPhone,
          referredName: formData.fullName,
          referredPhone: formData.phone,
        });
      }
      setSubmitted(true);
    } else {
      setErrorMsg(res.error || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen text-foreground pb-20">
      {/* 1. Header Banner */}
      <section className="py-14 sm:py-20 border-b border-border/40 relative overflow-hidden bg-card/40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#E85D04]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/20 text-[#E85D04] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PITS Civic Empowerment Club</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
            Unlock Lifetime Subsidies <br />
            <span className="text-[#E85D04]">On The Entire Marketplace</span>
          </h1>

          <p className="font-body text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Pay a one-time <strong>₦3,200</strong> registration fee to receive your verified Member Promo Code.
            Your code is <strong>strictly tied to your phone number</strong>, giving you up to 50% off food staples, airtime, meals, and mobility vouchers.
          </p>
        </div>
      </section>

      {/* 2. Perks Comparison Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E85D04]/10 text-[#E85D04] flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-black text-lg text-foreground">
              Farm-Gate Food Prices
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              50kg stone-free rice drops from ₦88,000 to ₦52,000. 25kg garri drops from ₦38,000 to ₦22,000 with your code.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-black text-lg text-foreground">
              Subsidized Airtime &amp; Data
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              PITS Connect wholesale internet vouchers and instant airtime discounts every time you recharge.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-black text-lg text-foreground">
              Phone-Bound Security
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Your member code works exclusively with your registered phone number, ensuring your benefits cannot be hijacked.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Main Payment & Registration Card */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Bank Transfer Details */}
          <div className="lg:col-span-5 bg-card border-2 border-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-wider text-[#E85D04]">
                Step 1: Make Payment
              </span>
              <h2 className="text-xl font-black text-foreground">
                Official Amvora Bank Details
              </h2>
              <p className="text-xs text-muted-foreground">
                Transfer exactly ₦3,200 to the dedicated civic cooperative account below:
              </p>
            </div>

            <div className="bg-muted/50 rounded-2xl p-5 border border-border space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                  Bank Name
                </span>
                <span className="text-sm font-black text-foreground flex items-center gap-1.5 mt-0.5">
                  <Building2 className="w-4 h-4 text-[#E85D04]" />
                  {bankDetails.bankName}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                  Account Name
                </span>
                <span className="text-sm font-black text-foreground">
                  {bankDetails.accountName}
                </span>
              </div>

              <div className="pt-2 border-t border-border/60">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                  Account Number
                </span>
                <div className="flex items-center justify-between gap-2 mt-1">
                  <span className="font-mono text-xl sm:text-2xl font-black text-[#E85D04] tracking-wider">
                    {bankDetails.accountNumber}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="p-2 rounded-xl bg-card border border-border hover:border-[#E85D04] text-xs font-bold flex items-center gap-1 text-foreground transition shadow-sm"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedAccount ? "Copied!" : "Copy"}</span>
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-border/60 flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-semibold">
                  Required Fee:
                </span>
                <span className="text-base font-black text-emerald-600">
                  {bankDetails.amount}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <Clock className="w-4 h-4 text-[#E85D04] shrink-0 mt-0.5" />
              <span>
                After payment, complete Step 2 on the right with your transaction reference or payer name.
              </span>
            </div>
          </div>

          {/* Right: Registration & Confirmation Form */}
          <div className="lg:col-span-7 bg-card border-2 border-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-foreground">
                  Payment Submitted for Verification!
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.fullName}</strong>. Your payment reference (<strong>{formData.proofReference}</strong>) has been queued.
                  Our admin team will confirm your ₦3,200 transfer shortly.
                </p>

                <div className="p-4 rounded-xl bg-muted/60 border border-border text-xs text-left space-y-2 max-w-md mx-auto">
                  <p className="font-bold text-foreground">What happens next?</p>
                  <p className="text-muted-foreground">
                    1. Once confirmed, your unique promo code will be activated and tied to <strong>{formData.phone}</strong>.
                  </p>
                  <p className="text-muted-foreground">
                    2. You will receive an SMS/WhatsApp confirmation with your code.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/marketplace"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#E85D04] text-white hover:bg-[#d44f00] font-bold text-xs transition"
                  >
                    <span>Browse Marketplace</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ fullName: "", phone: "", email: "", state: "Lagos", lga: "", proofReference: "", referrerPhone: "" });
                    }}
                    className="px-6 py-3 rounded-xl border border-border text-xs font-semibold hover:bg-muted transition"
                  >
                    Submit Another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-black uppercase tracking-wider text-[#E85D04]">
                    Step 2: Submit Details
                  </span>
                  <h2 className="text-xl font-black text-foreground">
                    Register Your Phone &amp; Proof
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Enter the phone number you want your discount code tied to.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-foreground block mb-1">
                      Full Name <span className="text-[#E85D04]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Babatunde Adeleke"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-[#E85D04] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-foreground block mb-1">
                        Phone Number <span className="text-[#E85D04]">* (Tied to Code)</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 08012345678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-[#E85D04] focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-foreground block mb-1">
                        Email Address <span className="text-muted-foreground text-[10px]">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-[#E85D04] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-foreground block mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-[#E85D04] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-foreground block mb-1">
                        LGA / Area
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Alimosho, Ikeja"
                        value={formData.lga}
                        onChange={(e) => setFormData({ ...formData, lga: e.target.value })}
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-[#E85D04] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-foreground block mb-1">
                      Referral Phone Number / Code <span className="text-muted-foreground text-[10px]">(Optional — Referrer earns 15 pts)</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 08168850257 (Who invited you?)"
                      value={formData.referrerPhone}
                      onChange={(e) => setFormData({ ...formData, referrerPhone: e.target.value })}
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-[#E85D04] focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-foreground block mb-1">
                      Bank Transfer Reference / Payer Name <span className="text-[#E85D04]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. OPay TRX984210 or sender account name"
                      value={formData.proofReference}
                      onChange={(e) => setFormData({ ...formData, proofReference: e.target.value })}
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-[#E85D04] focus:outline-none"
                    />
                    <p className="text-[11px] text-muted-foreground mt-1">
                      This allows our admin to match your ₦3,200 payment instantly.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl bg-[#E85D04] hover:bg-[#d44f00] text-white font-bold text-sm transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <span>Submitting Proof...</span>
                    ) : (
                      <>
                        <span>Submit ₦3,200 Payment for Verification</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
