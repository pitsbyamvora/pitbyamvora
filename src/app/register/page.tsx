"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { recordReferralSignup } from "@/lib/db";

export default function RegisterPage() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [referrerPhone, setReferrerPhone] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !email.trim() || !phone.trim() || !password) {
      setError("Please fill in your name, email, phone number, and password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    const result = await signUp({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      stateOfResidence: "Lagos",
      password,
    });
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      // If someone referred them, record referral credit
      if (referrerPhone.trim()) {
        recordReferralSignup({
          referrerPhone: referrerPhone.trim(),
          referredName: fullName.trim(),
          referredPhone: phone.trim(),
        });
      }
      router.push("/profile");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-neutral-50">
      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-neutral-900">Create Free Account</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Join Amvora to start shopping essentials at wholesale rates
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm space-y-4">

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Full Name <span className="text-[#E85D04]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Tunde Adeleke"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#E85D04] focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Phone Number <span className="text-[#E85D04]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="08012345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#E85D04] focus:border-transparent font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Email Address <span className="text-[#E85D04]">*</span>
                </label>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#E85D04] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-neutral-700">
                  Password <span className="text-[#E85D04]">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="text-xs text-neutral-400 hover:text-neutral-600"
                >
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>
              <input
                type={showPass ? "text" : "password"}
                required
                autoComplete="new-password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#E85D04] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Referral Phone Number <span className="text-neutral-400 font-normal">(Optional)</span>
              </label>
              <input
                type="tel"
                placeholder="e.g. 08168850257 (Who invited you?)"
                value={referrerPhone}
                onChange={(e) => setReferrerPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#E85D04] focus:border-transparent font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-[#E85D04] text-white text-sm font-semibold hover:bg-[#d14e00] transition-colors disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Free Account"}
            </button>
          </form>

          <p className="text-[11px] text-neutral-500 text-center leading-relaxed">
            By creating an account, you get instant access to shop our direct catalog. You can unlock up to 50% member discounts anytime from your profile.
          </p>

          <div className="pt-2 text-center text-xs text-neutral-500 border-t border-neutral-100">
            Already have an account?{" "}
            <Link href="/login" className="text-[#E85D04] font-semibold hover:underline">
              Sign in
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
