"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, LogIn, Sparkles, AlertCircle, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, demoSignIn, isConfigured } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage("Please enter both your email address and password.");
      return;
    }

    setLoading(true);
    const result = await signIn(email, password);
    setLoading(false);

    if (result.error) {
      setErrorMessage(result.error);
    } else {
      router.push("/portal");
    }
  };

  const handleDemoLogin = (role: "member" | "volunteer" | "coordinator" = "member") => {
    demoSignIn(role);
    router.push("/portal");
  };

  return (
    <div className="min-h-[85vh] bg-[#F7F5EF] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-black/5">
        {/* Header / Logo */}
        <div className="text-center">
          <Link href="/" className="inline-block relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#ff5500] shadow-sm mb-3">
            <Image
              src="/logo.jpg"
              alt="PITS Logo"
              fill
              className="object-contain"
            />
          </Link>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#171A19]">
            Citizen Member Login
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#646B66]">
            Power in the Street (PITS 2027) Civic Action Network
          </p>
        </div>

        {/* Supabase Status notice if in preview mode */}
        {!isConfigured && (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-lg p-3 text-xs flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-800">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              Local Demo Mode Active
            </div>
            <p className="text-[11px] leading-relaxed text-amber-800/90">
              Supabase credentials not yet set in environment. You can enter any credentials or click the instant test login below.
            </p>
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email-address"
              className="block text-xs font-bold text-[#171A19] uppercase tracking-wider mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-black/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent transition"
              />
              <Mail className="w-4 h-4 text-[#646B66] absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="password"
                className="block text-xs font-bold text-[#171A19] uppercase tracking-wider"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-medium text-[#ff5500] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-black/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent transition"
              />
              <Lock className="w-4 h-4 text-[#646B66] absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-[#646B66]">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-black/20 text-[#ff5500] focus:ring-[#ff5500] h-4 w-4"
              />
              <span>Remember this device</span>
            </label>
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
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Sign In to PITS Portal</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Fast Access */}
        <div className="pt-2 border-t border-black/5">
          <p className="text-[11px] font-semibold text-center text-[#646B66] mb-2 uppercase tracking-wider flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#ff5500]" />
            <span>Quick Test Access</span>
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin("member")}
              className="py-2 px-3 text-xs font-semibold rounded-md bg-[#F7F5EF] hover:bg-[#eae6db] text-[#171A19] border border-black/10 transition"
            >
              Demo Member
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin("coordinator")}
              className="py-2 px-3 text-xs font-semibold rounded-md bg-[#ff5500]/10 hover:bg-[#ff5500]/20 text-[#ff5500] border border-[#ff5500]/30 transition"
            >
              Demo Coordinator
            </button>
          </div>
        </div>

        {/* Registration Link */}
        <div className="text-center pt-2 text-xs text-[#646B66] flex items-center justify-center gap-1">
          <span>Not yet a registered citizen member?</span>
          <Link
            href="/register"
            className="font-bold text-[#ff5500] hover:underline inline-flex items-center gap-0.5"
          >
            <span>Create an Account</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
