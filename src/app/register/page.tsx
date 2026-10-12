"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { NIGERIAN_STATES } from "@/types/auth";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  UserPlus,
  AlertCircle,
  ArrowRight,
  Shield,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { signUp, isConfigured } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [stateOfResidence, setStateOfResidence] = useState("Lagos");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please verify.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    if (!agreed) {
      setErrorMessage("Please accept the PITS Movement Code of Conduct to proceed.");
      return;
    }

    setLoading(true);
    const result = await signUp({
      fullName,
      email,
      phone,
      stateOfResidence,
      password,
    });
    setLoading(false);

    if (result.error) {
      setErrorMessage(result.error);
    } else {
      router.push("/portal");
    }
  };

  return (
    <div className="min-h-[85vh] bg-[#F7F5EF] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-black/5">
        {/* Header */}
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
            <Shield className="w-3.5 h-3.5 text-[#ff5500]" />
            <span>Grassroots Civic Registry</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#171A19]">
            Join the Movement
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#646B66]">
            Power in the Street (PITS 2027) Citizen Membership Registration
          </p>
        </div>

        {!isConfigured && (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-lg p-3 text-xs flex flex-col gap-1">
            <span className="font-semibold text-amber-800">
              Demo Registration Active
            </span>
            <p className="text-[11px] leading-relaxed text-amber-800/90">
              You will be automatically registered and admitted into the Member Portal upon submitting this form.
            </p>
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-xs font-bold text-[#171A19] uppercase tracking-wider mb-1"
            >
              Full Legal Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Babatunde Adebayo"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-black/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent transition"
              />
              <User className="w-4 h-4 text-[#646B66] absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-bold text-[#171A19] uppercase tracking-wider mb-1"
            >
              Email Address <span className="text-red-500">*</span>
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
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-black/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent transition"
              />
              <Mail className="w-4 h-4 text-[#646B66] absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Phone & State grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-bold text-[#171A19] uppercase tracking-wider mb-1"
              >
                Phone Number
              </label>
              <div className="relative">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+234 800 000 0000"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-black/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent transition"
                />
                <Phone className="w-4 h-4 text-[#646B66] absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label
                htmlFor="stateOfResidence"
                className="block text-xs font-bold text-[#171A19] uppercase tracking-wider mb-1"
              >
                State of Residence <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="stateOfResidence"
                  name="stateOfResidence"
                  value={stateOfResidence}
                  onChange={(e) => setStateOfResidence(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-black/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent transition bg-white"
                >
                  {NIGERIAN_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                <MapPin className="w-4 h-4 text-[#646B66] absolute left-3.5 top-3.5" />
              </div>
            </div>
          </div>

          {/* Password & Confirm */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold text-[#171A19] uppercase tracking-wider mb-1"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-black/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent transition"
                />
                <Lock className="w-4 h-4 text-[#646B66] absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-bold text-[#171A19] uppercase tracking-wider mb-1"
              >
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-black/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent transition"
                />
                <Lock className="w-4 h-4 text-[#646B66] absolute left-3.5 top-3.5" />
              </div>
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer text-xs text-[#646B66]">
              <input
                type="checkbox"
                required
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 rounded border-black/20 text-[#ff5500] focus:ring-[#ff5500] h-4 w-4"
              />
              <span>
                I agree to the PITS civic engagement values, non-violent advocacy charter, and data privacy policy.
              </span>
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-lg bg-[#ff5500] hover:bg-[#e04b00] text-white font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <span>Creating Citizen Profile...</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Register Citizen Membership</span>
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-[#646B66] flex items-center justify-center gap-1">
          <span>Already registered?</span>
          <Link
            href="/login"
            className="font-bold text-[#ff5500] hover:underline inline-flex items-center gap-0.5"
          >
            <span>Sign in here</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
