"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { BRAND_INFO } from "@/content/campaign";
import {
  Zap,
  MapPin,
  FileSignature,
  ClipboardCheck,
  ShoppingBag,
  Phone,
  Mail,
  ShieldCheck,
  Plus,
  LogOut,
  LayoutDashboard,
  CheckSquare,
  FileText,
  User,
  Radio,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function MemberPortalPage() {
  const router = useRouter();
  const { user, loading, signOut, demoSignIn } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "tasks" | "reports" | "profile">("overview");

  // Track tasks
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({
    task1: true,
    task2: true,
    task3: false,
    task4: false,
  });

  const toggleTask = (id: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#F7F5EF]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#ff5500] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-semibold text-[#171A19]">Loading Citizen Portal...</p>
        </div>
      </div>
    );
  }

  // Not signed in view
  if (!user) {
    return (
      <div className="min-h-[80vh] bg-[#F7F5EF] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-black/10 shadow-lg text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-[#171A19] flex items-center justify-center mx-auto border-2 border-[#ff5500]">
            <Zap className="w-7 h-7 text-[#ff5500]" />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-black text-[#171A19]">
              Authentication Required
            </h2>
            <p className="mt-2 text-xs text-[#646B66] leading-relaxed">
              The Member Portal is reserved for registered PITS 2027 citizens, volunteers, and ground coordinators.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 pt-2">
            <Link
              href="/login"
              className="w-full py-3 px-4 rounded-lg bg-[#171A19] text-white text-xs font-bold hover:bg-black transition"
            >
              Log In to Existing Account
            </Link>
            <button
              onClick={() => demoSignIn("member")}
              className="w-full py-3 px-4 rounded-lg bg-[#ff5500] text-white text-xs font-bold hover:bg-[#e04b00] transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Instant Demo Access as Citizen</span>
            </button>
            <Link
              href="/register"
              className="w-full py-2 px-4 rounded-lg text-xs font-semibold text-[#646B66] hover:text-[#171A19] flex items-center justify-center gap-1.5"
            >
              <span>Register New Account</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5EF] pb-16">
      {/* Portal Top Bar */}
      <div className="bg-[#171A19] text-white border-b border-white/10 pt-8 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-white p-1 border-2 border-[#ff5500] shadow-md flex-shrink-0">
              <Image
                src="/logo.jpg"
                alt="PITS Logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                  {user.fullName}
                </h1>
                <span className="bg-[#ff5500] text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-white/70 mt-1 flex items-center gap-3">
                <span>Member ID: <strong className="text-white font-mono">{user.membershipNumber || "PITS-704921"}</strong></span>
                <span>•</span>
                <span>State Chapter: <strong className="text-[#ff5500]">{user.stateOfResidence || "Lagos"}</strong></span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/report"
              className="flex items-center gap-1.5 text-xs font-bold bg-[#ff5500] hover:bg-[#e04b00] text-white px-4 py-2.5 rounded-lg transition shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Submit Ground Report</span>
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 px-3 py-2.5 rounded-lg transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-black/10 p-1.5 flex gap-1 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${
              activeTab === "overview"
                ? "bg-[#171A19] text-white"
                : "text-[#646B66] hover:text-[#171A19] hover:bg-black/5"
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard Overview</span>
          </button>
          <button
            onClick={() => setActiveTab("tasks")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${
              activeTab === "tasks"
                ? "bg-[#171A19] text-white"
                : "text-[#646B66] hover:text-[#171A19] hover:bg-black/5"
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>60-Day Action Checklist</span>
          </button>
          <button
            onClick={() => setActiveTab("reports")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${
              activeTab === "reports"
                ? "bg-[#171A19] text-white"
                : "text-[#646B66] hover:text-[#171A19] hover:bg-black/5"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>My Field Submissions</span>
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${
              activeTab === "profile"
                ? "bg-[#171A19] text-white"
                : "text-[#646B66] hover:text-[#171A19] hover:bg-black/5"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Citizen Credentials</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Main Stats & 60-Day Progress */}
            <div className="lg:col-span-2 space-y-6">
              {/* Challenge Banner */}
              <div className="bg-gradient-to-br from-[#171A19] to-[#252a28] text-white rounded-2xl p-6 sm:p-8 shadow-md border border-black/10 relative overflow-hidden">
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 bg-[#ff5500]/20 border border-[#ff5500]/40 px-3 py-1 rounded-full text-[11px] font-bold text-[#ff5500] uppercase tracking-wider mb-4">
                    Active Proof-of-Work Challenge
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-black">
                    {BRAND_INFO.slogan}
                  </h2>
                  <p className="text-white/80 text-xs sm:text-sm mt-2 max-w-xl leading-relaxed">
                    You are connected to the nationwide citizen verification system. Track tangible test milestones across logistics, food affordability, and community monitoring.
                  </p>

                  <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <span className="block text-2xl sm:text-3xl font-heading font-black text-[#ff5500]">
                        Day 18
                      </span>
                      <span className="text-[11px] text-white/60 uppercase font-semibold">
                        Of 60 Days
                      </span>
                    </div>
                    <div>
                      <span className="block text-2xl sm:text-3xl font-heading font-black text-white">
                        5 / 5
                      </span>
                      <span className="text-[11px] text-white/60 uppercase font-semibold">
                        Pillars Active
                      </span>
                    </div>
                    <div>
                      <span className="block text-2xl sm:text-3xl font-heading font-black text-emerald-400">
                        100%
                      </span>
                      <span className="text-[11px] text-white/60 uppercase font-semibold">
                        Public Audit
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="/report"
                  className="bg-white p-5 rounded-xl border border-black/10 shadow-sm hover:border-[#ff5500] hover:shadow-md transition group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#ff5500]/10 text-[#ff5500] flex items-center justify-center mb-3 group-hover:bg-[#ff5500] group-hover:text-white transition">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-[#171A19] text-sm">
                    Report Local Incident
                  </h3>
                  <p className="text-xs text-[#646B66] mt-1 leading-relaxed">
                    Document food price inflation, infrastructure neglect, or security concerns directly from your ward.
                  </p>
                </Link>

                <Link
                  href="/petitions"
                  className="bg-white p-5 rounded-xl border border-black/10 shadow-sm hover:border-[#ff5500] hover:shadow-md transition group"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition">
                    <FileSignature className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-[#171A19] text-sm">
                    Sign Verified Petitions
                  </h3>
                  <p className="text-xs text-[#646B66] mt-1 leading-relaxed">
                    Back community-driven legislative appeals with verified citizen signatures.
                  </p>
                </Link>

                <Link
                  href="/campaigns/60-day-proof-of-work"
                  className="bg-white p-5 rounded-xl border border-black/10 shadow-sm hover:border-[#ff5500] hover:shadow-md transition group"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:bg-amber-600 group-hover:text-white transition">
                    <ClipboardCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-[#171A19] text-sm">
                    Review 60-Day Strategy
                  </h3>
                  <p className="text-xs text-[#646B66] mt-1 leading-relaxed">
                    Inspect the 5 core tests (The Rice Test, PITS Connect, PITS Move, Food Hubs).
                  </p>
                </Link>

                <Link
                  href="/marketplace"
                  className="bg-white p-5 rounded-xl border border-black/10 shadow-sm hover:border-[#ff5500] hover:shadow-md transition group"
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:bg-purple-600 group-hover:text-white transition">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-[#171A19] text-sm">
                    Direct Food Hub
                  </h3>
                  <p className="text-xs text-[#646B66] mt-1 leading-relaxed">
                    Access verified grassroots commodities with zero middlemen markups.
                  </p>
                </Link>
              </div>

              {/* Recent Community Alerts */}
              <div className="bg-white rounded-xl border border-black/10 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-[#ff5500]" />
                    <h3 className="font-heading font-bold text-sm text-[#171A19]">
                      Movement Bulletins & Feed
                    </h3>
                  </div>
                  <span className="text-[11px] font-semibold text-[#ff5500]">
                    Live Broadcast
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="p-3.5 rounded-lg bg-[#F7F5EF] border border-black/5 text-xs">
                    <div className="flex items-center justify-between text-[#646B66] text-[11px] mb-1">
                      <span className="font-bold text-[#171A19]">PITS Mobilization Unit</span>
                      <span>2 hours ago</span>
                    </div>
                    <p className="text-[#171A19] font-medium leading-relaxed">
                      Verification teams deployed in Kebbi & Kano for Stage 2 paddy direct collection audits.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-[#F7F5EF] border border-black/5 text-xs">
                    <div className="flex items-center justify-between text-[#646B66] text-[11px] mb-1">
                      <span className="font-bold text-[#171A19]">Grassroots Legal Desk</span>
                      <span>Yesterday</span>
                    </div>
                    <p className="text-[#171A19] font-medium leading-relaxed">
                      Free legal orientation webinar scheduled this Thursday for all registered ward coordinators.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Citizen Digital Credential Card */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border-2 border-black/10 shadow-lg overflow-hidden">
                <div className="bg-[#171A19] p-5 text-white flex items-center justify-between border-b-2 border-[#ff5500]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white p-0.5 relative overflow-hidden">
                      <Image src="/logo.jpg" alt="Logo" fill className="object-contain" />
                    </div>
                    <div>
                      <span className="font-heading text-xs font-black tracking-wide block">
                        PITS 2027
                      </span>
                      <span className="text-[9px] uppercase tracking-wider text-white/70">
                        Citizen Identity Pass
                      </span>
                    </div>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-[#ff5500]/10 border-2 border-[#ff5500] text-[#ff5500] flex items-center justify-center font-heading font-black text-2xl">
                      {user.fullName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-heading font-extrabold text-[#171A19] text-base">
                        {user.fullName}
                      </h4>
                      <p className="text-xs text-[#646B66] font-mono">
                        {user.membershipNumber || "PITS-704921"}
                      </p>
                      <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Active & Verified</span>
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-black/10 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#646B66]">Chapter:</span>
                      <span className="font-bold text-[#171A19]">{user.stateOfResidence || "Lagos State"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#646B66]">Email:</span>
                      <span className="font-medium text-[#171A19]">{user.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#646B66]">Phone:</span>
                      <span className="font-medium text-[#171A19]">{user.phone || "+234 816 885 0257"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#646B66]">Role:</span>
                      <span className="font-bold uppercase text-[#ff5500]">{user.role}</span>
                    </div>
                  </div>

                  {/* Visual Barcode Accent */}
                  <div className="pt-4 border-t border-black/10">
                    <div className="h-8 bg-black/5 rounded flex items-center justify-center font-mono text-[10px] tracking-widest text-[#646B66]">
                      |||||| | |||| |||||| || ||||| |||
                    </div>
                    <p className="text-[10px] text-center text-[#646B66] mt-1">
                      Non-Violent Grassroots Civic Network
                    </p>
                  </div>
                </div>
              </div>

              {/* Support & Helplines */}
              <div className="bg-[#171A19] text-white p-5 rounded-xl border border-white/10 text-xs space-y-3">
                <h4 className="font-heading font-bold text-sm text-[#ff5500]">
                  Movement Helplines
                </h4>
                <p className="text-white/80 leading-relaxed text-[11px]">
                  Need ground coordination assistance or have emergency community reports?
                </p>
                <div className="space-y-1.5 font-mono text-[11px]">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#ff5500]" />
                    <span>{BRAND_INFO.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#ff5500]" />
                    <span>{BRAND_INFO.contact.altPhone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <Mail className="w-3.5 h-3.5 text-[#ff5500]" />
                    <span>{BRAND_INFO.contact.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TASKS */}
        {activeTab === "tasks" && (
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-black/10 shadow-sm space-y-6">
            <div>
              <h2 className="font-heading text-xl font-black text-[#171A19]">
                Citizen 60-Day Proof Checklist
              </h2>
              <p className="text-xs text-[#646B66] mt-1">
                Complete your grassroots tasks to help verify data in your local ward.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { id: "task1", title: "Verify Local Market Commodity Prices", desc: "Collect rice and garri market retail prices in your local council", points: "20 pts" },
                { id: "task2", title: "Join PITS State Telegram & WhatsApp Voice Room", desc: "Connect with ward mobilizers in your state", points: "15 pts" },
                { id: "task3", title: "Submit a Verified Road or Infrastructure Report", desc: "Upload geolocated photo of damaged public asset in your community", points: "25 pts" },
                { id: "task4", title: "Invite 3 Neighbors to Register as PITS Citizens", desc: "Help build the verified voting collective for 2027", points: "30 pts" },
              ].map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-4 rounded-xl border transition cursor-pointer flex items-start gap-4 ${
                    completedTasks[task.id]
                      ? "bg-emerald-50/50 border-emerald-200"
                      : "bg-[#F7F5EF] border-black/5 hover:border-black/20"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={completedTasks[task.id]}
                    onChange={() => {}}
                    className="mt-1 h-5 w-5 rounded text-[#ff5500] focus:ring-[#ff5500] cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-xs sm:text-sm font-bold ${completedTasks[task.id] ? "line-through text-emerald-900" : "text-[#171A19]"}`}>
                        {task.title}
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/5 text-[#171A19]">
                        {task.points}
                      </span>
                    </div>
                    <p className="text-xs text-[#646B66] mt-1 leading-relaxed">
                      {task.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: REPORTS */}
        {activeTab === "reports" && (
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-black/10 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading text-xl font-black text-[#171A19]">
                  Field Ground Submissions
                </h2>
                <p className="text-xs text-[#646B66] mt-1">
                  Track your community challenge submissions and status.
                </p>
              </div>
              <Link
                href="/report"
                className="flex items-center gap-1.5 py-2 px-3 bg-[#ff5500] text-white rounded-lg text-xs font-bold hover:bg-[#e04b00] transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Report</span>
              </Link>
            </div>

            <div className="p-4 rounded-xl bg-[#F7F5EF] border border-black/5 text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center mx-auto text-[#646B66]">
                <FileText className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-sm text-[#171A19]">
                No pending ground reports
              </h4>
              <p className="text-xs text-[#646B66] max-w-sm mx-auto">
                You haven&apos;t filed any community infrastructure reports yet. Use the ground reporting tool whenever you notice public anomalies.
              </p>
              <Link
                href="/report"
                className="inline-flex items-center gap-1.5 mt-2 py-2 px-4 bg-[#171A19] text-white rounded-md text-xs font-semibold"
              >
                <span>File Your First Report</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* TAB 4: PROFILE */}
        {activeTab === "profile" && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-black/10 shadow-sm space-y-6">
            <div>
              <h2 className="font-heading text-xl font-black text-[#171A19]">
                Citizen Account Settings
              </h2>
              <p className="text-xs text-[#646B66] mt-1">
                Manage your profile details and chapter affiliation.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#171A19] mb-1">Full Legal Name</label>
                <input
                  type="text"
                  disabled
                  value={user.fullName}
                  className="w-full px-4 py-2.5 rounded-lg border border-black/15 bg-black/5 text-[#646B66]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#171A19] mb-1">Registered Email</label>
                <input
                  type="email"
                  disabled
                  value={user.email}
                  className="w-full px-4 py-2.5 rounded-lg border border-black/15 bg-black/5 text-[#646B66]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#171A19] mb-1">State Chapter</label>
                <input
                  type="text"
                  disabled
                  value={user.stateOfResidence || "Lagos"}
                  className="w-full px-4 py-2.5 rounded-lg border border-black/15 bg-black/5 text-[#646B66]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#171A19] mb-1">Civic Role</label>
                <input
                  type="text"
                  disabled
                  value={user.role.toUpperCase()}
                  className="w-full px-4 py-2.5 rounded-lg border border-black/15 bg-black/5 text-[#646B66]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-black/10 flex justify-between items-center">
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1.5 py-2.5 px-4 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-bold text-xs transition"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out of Account</span>
              </button>
              <span className="text-[11px] text-[#646B66]">
                PITS Security Protocol v2.4
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
