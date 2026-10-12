"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { CheckCircle2, ArrowLeft, Mail, KeyRound } from "lucide-react";

export default function ForgotPasswordPage() {
  const { resetPassword, isConfigured } = useAuth();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email) {
      setErrorMessage("Please enter your registered email address.");
      return;
    }

    setLoading(true);
    const result = await resetPassword(email);
    setLoading(false);

    if (result.error) {
      setErrorMessage(result.error);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-[85vh] bg-[#F7F5EF] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-black/5">
        <div className="text-center">
          <Link href="/" className="inline-block relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#ff5500] shadow-sm mb-3">
            <Image
              src="/logo.jpg"
              alt="PITS Logo"
              fill
              className="object-contain"
            />
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 text-[#171A19] text-xs font-semibold mb-2">
            <KeyRound className="w-3.5 h-3.5 text-[#ff5500]" />
            <span>PITS Security Desk</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#171A19]">
            Recover Account
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#646B66]">
            Enter your registered email to reset your PITS citizen password
          </p>
        </div>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="font-heading font-bold text-emerald-950 text-base">
              Recovery Link Dispatched
            </h3>
            <p className="text-xs text-emerald-800 leading-relaxed">
              If an account is associated with <strong>{email}</strong>, you will receive password reset instructions.
            </p>
            <div className="pt-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 py-2.5 px-4 bg-[#171A19] text-white rounded-lg text-xs font-semibold hover:bg-black transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Login</span>
              </Link>
            </div>
          </div>
        ) : (
          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            {!isConfigured && (
              <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-lg p-3 text-xs">
                Demo recovery mode active. You can enter your email to test the flow.
              </div>
            )}

            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-xs font-medium">
                {errorMessage}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-[#171A19] uppercase tracking-wider mb-1"
              >
                Registered Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="citizen@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-black/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent transition"
                />
                <Mail className="w-4 h-4 text-[#646B66] absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-lg bg-[#171A19] hover:bg-[#252a28] text-white font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  <span>Sending Instructions...</span>
                </>
              ) : (
                <span>Send Password Reset Link</span>
              )}
            </button>

            <div className="text-center pt-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs text-[#646B66] hover:text-[#171A19] font-medium transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Member Login</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
