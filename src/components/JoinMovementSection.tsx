"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, ArrowRight, AlertCircle, Sparkles } from "lucide-react";
import { joinMovement } from "@/lib/db";

export function JoinMovementSection() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setErrorMsg("Please enter your name and phone number.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    const res = await joinMovement({
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
    });

    setLoading(false);
    if (res.success) {
      setJoined(true);
    } else {
      setErrorMsg(res.error || "Unable to join at this time. Please try again.");
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-neutral-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Brand & Logo Side */}
          <div className="md:col-span-5 space-y-5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E85D04]/10 text-[#E85D04] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Civic Solidarity Network</span>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4 pt-1">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-neutral-200 shadow-md bg-white p-1 shrink-0">
                <Image
                  src="/logo.jpg"
                  alt="Amvora Light Foundation Logo"
                  width={80}
                  height={80}
                  className="object-cover w-full h-full rounded-xl"
                />
              </div>
              <div>
                <h3 className="font-heading font-black text-xl sm:text-2xl text-neutral-900 leading-tight">
                  PITS Movement
                </h3>
                <p className="text-xs text-[#E85D04] font-semibold mt-0.5">
                  Supported by Amvora Light Foundation
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
              A grassroots collective uniting citizens across Nigeria to defeat artificial commodity inflation, demand transparent governance, and build community-led price protection for all.
            </p>

            <div className="pt-2 flex items-center justify-center md:justify-start gap-6 text-xs text-neutral-500 font-medium">
              <div>
                <span className="text-lg font-black text-neutral-900 block font-mono">2,480+</span>
                <span>Active Supporters</span>
              </div>
              <div className="w-px h-8 bg-neutral-200" />
              <div>
                <span className="text-lg font-black text-[#E85D04] block font-mono">36 States</span>
                <span>Grassroots Scope</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Join Form or Custom Thank-You State */}
          <div className="md:col-span-7 bg-neutral-50 border-2 border-neutral-200 rounded-3xl p-6 sm:p-10 shadow-sm">
            {joined ? (
              <div className="text-center py-6 space-y-4 animate-fadeIn">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600">
                    Welcome to the Frontline
                  </span>
                  <h3 className="font-heading font-black text-2xl text-neutral-900">
                    Thank You, {fullName.split(" ")[0]}!
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-700 max-w-md mx-auto leading-relaxed">
                    You have joined thousands of determined Nigerians standing together for fair food prices, honest community leadership, and a country where everyday youth can build an independent future.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-neutral-200 text-xs text-neutral-500 max-w-sm mx-auto text-left space-y-1.5">
                  <p className="font-bold text-neutral-800">Next Steps:</p>
                  <p>• Your support has been logged in our citizen network database.</p>
                  <p>• We will send you grassroots updates on price subsidies and community action via WhatsApp/SMS.</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setJoined(false);
                    setFullName("");
                    setPhone("");
                    setEmail("");
                  }}
                  className="text-xs font-semibold text-[#E85D04] hover:underline pt-2 block mx-auto"
                >
                  Register Another Supporter
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-heading font-black text-xl sm:text-2xl text-neutral-900">
                    Join The Movement
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Add your voice. It takes 10 seconds to join our national civic network.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      Full Name <span className="text-[#E85D04]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Babatunde Adeleke"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#E85D04] focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 mb-1">
                        Phone Number <span className="text-[#E85D04]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="08012345678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#E85D04] focus:border-transparent font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-800 mb-1">
                        Email Address <span className="text-neutral-400 font-normal text-[10px]">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#E85D04] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-[#E85D04] hover:bg-[#d14e00] text-white font-bold text-xs sm:text-sm tracking-wide transition shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span>Joining Network...</span>
                    ) : (
                      <>
                        <span>Join The Movement</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[11px] text-neutral-400 text-center">
                  Your information is strictly protected and never shared with third-party advertisers.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
