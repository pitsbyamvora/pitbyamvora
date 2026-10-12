"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  ShieldAlert,
  Lock,
  Mail,
  KeyRound,
  ArrowRight,
  Sparkles,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { demoSignIn, signIn, isConfigured } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securityKey, setSecurityKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage("Please enter both admin email and password.");
      return;
    }

    setLoading(true);
    // If Supabase is configured, sign in, else simulate
    if (isConfigured) {
      const res = await signIn(email, password);
      setLoading(false);
      if (res.error) {
        setErrorMessage(res.error);
        return;
      }
    } else {
      setTimeout(() => {
        demoSignIn("admin");
        setLoading(false);
        router.push("/admin-dashboard");
      }, 500);
      return;
    }

    router.push("/admin-dashboard");
  };

  const handleDemoAdmin = (role: "admin" | "coordinator" = "admin") => {
    demoSignIn(role);
    router.push("/admin-dashboard");
  };

  return (
    <div className="min-h-[85vh] bg-[#121413] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-md w-full space-y-7 bg-[#1b1f1d] p-8 sm:p-10 rounded-3xl shadow-2xl border border-white/10 relative overflow-hidden">
        
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#ff5500]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header */}
        <div className="text-center relative z-10 space-y-2">
          <Link href="/" className="inline-block relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#ff5500] bg-white p-1 shadow-lg mb-2">
            <Image
              src="/logo.jpg"
              alt="PITS Logo"
              fill
              className="object-contain"
            />
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#ff5500]/15 text-[#ff5500] border border-[#ff5500]/30 text-[10px] font-bold font-mono uppercase tracking-widest">
            <ShieldAlert className="w-3 h-3" />
            <span>PITS Central Command</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-white">
            Administrative Access
          </h2>
          <p className="text-xs text-white/60">
            Field Verification & Incident Moderation Desk
          </p>
        </div>

        {errorMessage && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs relative z-10">
          <div>
            <label className="block font-bold text-white uppercase tracking-wider text-[11px] mb-1">
              Command Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="coordinator@amvora.org"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/15 bg-black/40 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500]"
              />
              <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block font-bold text-white uppercase tracking-wider text-[11px] mb-1">
              Security Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-white/15 bg-black/40 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500]"
              />
              <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-white/40 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block font-bold text-white uppercase tracking-wider text-[11px] mb-1">
              Field Security PIN (Optional for Demo)
            </label>
            <div className="relative">
              <input
                type="password"
                maxLength={6}
                value={securityKey}
                onChange={(e) => setSecurityKey(e.target.value)}
                placeholder="6-digit ward coordinator PIN"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/15 bg-black/40 text-white text-xs sm:text-sm font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-[#ff5500]"
              />
              <KeyRound className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-[#ff5500] hover:bg-[#e04b00] text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
          >
            {loading ? (
              <span>Verifying Clearance...</span>
            ) : (
              <>
                <ShieldAlert className="w-4 h-4" />
                <span>Enter Admin Command Center</span>
              </>
            )}
          </button>
        </form>

        {/* 1-Click Fast Preview */}
        <div className="pt-3 border-t border-white/10 text-center relative z-10 space-y-2.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">
            Instant Testing Access
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoAdmin("admin")}
              className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/15 transition flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ff5500]" />
              <span>Demo Admin</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoAdmin("coordinator")}
              className="py-2.5 px-3 rounded-xl bg-[#ff5500]/15 hover:bg-[#ff5500]/25 text-[#ff5500] text-xs font-semibold border border-[#ff5500]/30 transition"
            >
              State Coordinator
            </button>
          </div>
        </div>

        {/* Links */}
        <div className="text-center pt-1 text-xs text-white/50 flex justify-between">
          <Link href="/login" className="hover:text-white transition">
            ← Citizen Portal Login
          </Link>
          <Link href="/admin-signup" className="text-[#ff5500] hover:underline font-semibold">
            Request Coordinator Vetting
          </Link>
        </div>
      </div>
    </div>
  );
}
