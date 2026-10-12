"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { INITIAL_ISSUES, INITIAL_PETITIONS, CommunityIssue, Petition } from "@/content/community";
import { MARKETPLACE_PRODUCTS, VERIFIED_PROMO_CODES, MarketplaceProduct } from "@/content/marketplace";
import { fetchCommunityIssues, fetchPetitions, fetchMarketplaceProducts } from "@/lib/db";
import { NIGERIAN_STATES } from "@/types/auth";
import {
  ShieldAlert,
  AlertCircle,
  FileText,
  ShoppingBag,
  Users,
  CheckCircle2,
  Clock,
  MapPin,
  Search,
  Filter,
  LogOut,
  Sparkles,
  BarChart3,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Tag,
  Eye,
  Check,
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, signOut, demoSignIn } = useAuth();

  const [activeTab, setActiveTab] = useState<"incidents" | "petitions" | "marketplace" | "coordinators">("incidents");
  
  // Incidents state
  const [issuesList, setIssuesList] = useState<CommunityIssue[]>(INITIAL_ISSUES);
  const [issueFilterState, setIssueFilterState] = useState("All");
  const [issueSearch, setIssueSearch] = useState("");
  const [statusUpdatedId, setStatusUpdatedId] = useState<string | null>(null);

  // Petitions state
  const [petitionsList, setPetitionsList] = useState<Petition[]>(INITIAL_PETITIONS);

  // Marketplace state
  const [productsList, setProductsList] = useState<MarketplaceProduct[]>(MARKETPLACE_PRODUCTS);

  useEffect(() => {
    fetchCommunityIssues().then((data) => {
      if (data && data.length > 0) setIssuesList(data);
    });
    fetchPetitions().then((data) => {
      if (data && data.length > 0) setPetitionsList(data);
    });
    fetchMarketplaceProducts().then((data) => {
      if (data && data.length > 0) setProductsList(data);
    });
  }, []);

  // Handlers
  const handleUpdateIssueStatus = (issueId: string, newStatus: CommunityIssue["status"]) => {
    setIssuesList((prev) =>
      prev.map((iss) => (iss.id === issueId ? { ...iss, status: newStatus } : iss))
    );
    setStatusUpdatedId(issueId);
    setTimeout(() => setStatusUpdatedId(null), 2000);
  };

  const handleMarkPetitionDelivered = (petitionId: string) => {
    setPetitionsList((prev) =>
      prev.map((p) =>
        p.id === petitionId ? { ...p, status: "Delivered" } : p
      )
    );
  };

  const handleToggleProductStock = (productId: string) => {
    setProductsList((prev) =>
      prev.map((prod) =>
        prod.id === productId ? { ...prod, inStock: !prod.inStock } : prod
      )
    );
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/admin-login");
  };

  // If not logged in as admin/coordinator, show quick access banner
  const isAdminOrCoordinator = user?.role === "admin" || user?.role === "coordinator";

  return (
    <div className="min-h-screen bg-[#0e1110] text-white pb-24">
      {/* Top Command Bar */}
      <div className="bg-[#171a19] border-b border-white/10 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="relative w-10 h-10 rounded-full bg-white p-1 border-2 border-[#ff5500]">
              <Image src="/logo.jpg" alt="Logo" fill className="object-contain" priority />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-base text-white tracking-wide">
                  PITS COMMAND CENTER
                </span>
                <span className="bg-[#ff5500] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full font-mono">
                  {user?.role?.toUpperCase() || "ADMIN"}
                </span>
              </div>
              <p className="text-[10px] text-white/60">
                PITS 2027 • Grassroots Oversight & Verification Desk
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {!isAdminOrCoordinator && (
              <button
                onClick={() => demoSignIn("admin")}
                className="px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-500/30 transition flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Simulate Admin Mode</span>
              </button>
            )}

            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-white/80 hover:text-white border border-white/15 text-xs font-semibold transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit Desk</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Analytics Counter Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-[#171a19] border border-white/10 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-white/60">
              <span>Verified Citizens</span>
              <Users className="w-4 h-4 text-[#ff5500]" />
            </div>
            <div className="font-heading font-black text-2xl sm:text-3xl text-white">
              48,210
            </div>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
              <TrendingUp className="w-3 h-3" />
              <span>+1,420 registered this week</span>
            </div>
          </div>

          <div className="bg-[#171a19] border border-white/10 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-white/60">
              <span>Field Ground Reports</span>
              <AlertCircle className="w-4 h-4 text-amber-400" />
            </div>
            <div className="font-heading font-black text-2xl sm:text-3xl text-amber-400">
              {issuesList.length}
            </div>
            <div className="text-[10px] text-white/60">
              Across 36 states + FCT
            </div>
          </div>

          <div className="bg-[#171a19] border border-white/10 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-white/60">
              <span>Verified Petition Sigs</span>
              <FileText className="w-4 h-4 text-blue-400" />
            </div>
            <div className="font-heading font-black text-2xl sm:text-3xl text-blue-400">
              50,410
            </div>
            <div className="text-[10px] text-white/60">
              3 legislative targets active
            </div>
          </div>

          <div className="bg-[#171a19] border border-white/10 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-white/60">
              <span>Food Hub Orders</span>
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="font-heading font-black text-2xl sm:text-3xl text-emerald-400">
              1,840
            </div>
            <div className="text-[10px] text-white/60">
              Direct farm-gate distribution
            </div>
          </div>
        </div>

        {/* Navigation Tabs for Administrative Desks */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10">
          <button
            onClick={() => setActiveTab("incidents")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
              activeTab === "incidents"
                ? "bg-[#ff5500] text-white shadow-lg"
                : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <AlertCircle className="w-4 h-4" />
            <span>Incident Moderation Desk ({issuesList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("petitions")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
              activeTab === "petitions"
                ? "bg-[#ff5500] text-white shadow-lg"
                : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Petitions Oversight Desk ({petitionsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("marketplace")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
              activeTab === "marketplace"
                ? "bg-[#ff5500] text-white shadow-lg"
                : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Food Hub & Subsidy Controls</span>
          </button>

          <button
            onClick={() => setActiveTab("coordinators")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
              activeTab === "coordinators"
                ? "bg-[#ff5500] text-white shadow-lg"
                : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Ward Coordinators & RBAC</span>
          </button>
        </div>

        {/* TAB 1: INCIDENT MODERATION DESK */}
        {activeTab === "incidents" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-heading font-black text-xl text-white">
                  Field Reports & Surveillance Moderation
                </h3>
                <p className="text-xs text-white/60">
                  Verify or update the status of infrastructure, food prices, and service breakdown reports.
                </p>
              </div>

              {/* State Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#ff5500]" />
                <select
                  value={issueFilterState}
                  onChange={(e) => setIssueFilterState(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-white/15 bg-[#171a19] text-xs text-white focus:outline-none"
                >
                  <option value="All">All States</option>
                  {NIGERIAN_STATES.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Issues Cards Table */}
            <div className="space-y-4">
              {issuesList
                .filter((iss) => issueFilterState === "All" || iss.state === issueFilterState)
                .map((iss) => (
                  <div
                    key={iss.id}
                    className="p-5 rounded-2xl bg-[#171a19] border border-white/10 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-[#ff5500]">
                          {iss.trackingId}
                        </span>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-white/10 text-white/80">
                          {iss.category}
                        </span>
                        <span className="text-[10px] text-white/60 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#ff5500]" />
                          <span>{iss.location}, {iss.lga} LGA ({iss.state})</span>
                        </span>
                      </div>

                      <h4 className="font-heading font-bold text-sm text-white">
                        {iss.title}
                      </h4>

                      <p className="text-xs text-white/70 line-clamp-2">
                        {iss.description}
                      </p>
                    </div>

                    {/* Status Management Actions */}
                    <div className="flex items-center gap-2 flex-wrap lg:flex-nowrap">
                      <div className="text-xs text-white/60 mr-2">
                        <span>Current Status:</span>
                        <span className="block font-bold text-white uppercase text-[11px]">
                          {iss.status}
                        </span>
                      </div>

                      <button
                        onClick={() => handleUpdateIssueStatus(iss.id, "Field Verified")}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 text-xs font-bold transition border border-emerald-500/30"
                      >
                        Verify
                      </button>

                      <button
                        onClick={() => handleUpdateIssueStatus(iss.id, "In Progress")}
                        className="px-3 py-1.5 rounded-lg bg-[#ff5500]/20 text-[#ff5500] hover:bg-[#ff5500]/30 text-xs font-bold transition border border-[#ff5500]/30"
                      >
                        In Progress
                      </button>

                      <button
                        onClick={() => handleUpdateIssueStatus(iss.id, "Resolved")}
                        className="px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 text-xs font-bold transition border border-blue-500/30"
                      >
                        Resolve
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 2: PETITIONS OVERSIGHT */}
        {activeTab === "petitions" && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="font-heading font-black text-xl text-white">
                Active Petitions Oversight Desk
              </h3>
              <p className="text-xs text-white/60">
                Audit citizen signatures and dispatch verified petitions to federal regulatory agencies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {petitionsList.map((pet) => (
                <div
                  key={pet.id}
                  className="p-6 rounded-2xl bg-[#171a19] border border-white/10 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-mono text-[#ff5500] font-bold">
                        {pet.trackingNumber}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        pet.status === "Delivered" ? "bg-emerald-500/20 text-emerald-400" : "bg-blue-500/20 text-blue-400"
                      }`}>
                        {pet.status}
                      </span>
                    </div>

                    <h4 className="font-heading font-bold text-sm text-white">
                      {pet.title}
                    </h4>

                    <p className="text-xs text-white/60">
                      Target: {pet.targetAuthority}
                    </p>

                    <div className="pt-2 text-xs font-mono font-bold text-emerald-400">
                      {pet.signaturesCount.toLocaleString()} / {pet.goalCount.toLocaleString()} Signatures Counted
                    </div>
                  </div>

                  {pet.status !== "Delivered" ? (
                    <button
                      onClick={() => handleMarkPetitionDelivered(pet.id)}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#e04b00] text-white font-bold text-xs shadow-md transition"
                    >
                      Dispatch Official Delivery Memo
                    </button>
                  ) : (
                    <div className="py-2.5 text-center text-xs font-bold text-emerald-400 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                      ✓ Delivered to Ministry Desk
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: FOOD HUB CONTROLS */}
        {activeTab === "marketplace" && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="font-heading font-black text-xl text-white">
                Food Hub Inventory & Promo Voucher Controls
              </h3>
              <p className="text-xs text-white/60">
                Manage cooperative baseline prices, toggle item stock availability, and view voucher allocations.
              </p>
            </div>

            {/* Active Citizen Voucher Codes Box */}
            <div className="p-5 rounded-2xl bg-[#171a19] border border-white/10 space-y-3">
              <span className="text-xs font-bold text-[#ff5500] uppercase tracking-wider font-mono">
                Active Citizen Promo Codes
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                {Object.values(VERIFIED_PROMO_CODES).map((voucher) => (
                  <div key={voucher.code} className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
                    <span className="font-mono font-black text-white text-sm block">
                      {voucher.code}
                    </span>
                    <span className="text-emerald-400 font-bold text-xs block">
                      {voucher.discountPercentage}% Subsidy
                    </span>
                    <p className="text-[10px] text-white/60">{voucher.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Stock Table */}
            <div className="space-y-3">
              {productsList.map((prod) => (
                <div
                  key={prod.id}
                  className="p-4 rounded-xl bg-[#171a19] border border-white/10 flex items-center justify-between text-xs"
                >
                  <div>
                    <h4 className="font-bold text-white text-sm">{prod.title}</h4>
                    <p className="text-[11px] text-white/60">
                      Baseline Farm-Gate: <strong className="text-emerald-400 font-mono">₦{prod.cooperativePrice.toLocaleString()}</strong> | Origin: {prod.origin}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      prod.inStock ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                    }`}>
                      {prod.inStock ? "In Stock" : "Temporarily Depleted"}
                    </span>
                    <button
                      onClick={() => handleToggleProductStock(prod.id)}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition"
                    >
                      Toggle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: WARD COORDINATORS (RBAC) */}
        {activeTab === "coordinators" && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="font-heading font-black text-xl text-white">
                Ward Mobilizers & Role Permissions (RBAC)
              </h3>
              <p className="text-xs text-white/60">
                Verified regional coordinators with field moderation clearance across the federation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {[
                { name: "Adeyinka Honey.A (Dabiraoluwa)", role: "National Director", state: "National Command", clearance: "Level 4 (Super Admin)" },
                { name: "Babajide Adeleke", role: "State Coordinator", state: "Lagos State", clearance: "Level 3 (State Moderator)" },
                { name: "Amina Yusuf", role: "Field Inspector", state: "Kebbi State", clearance: "Level 2 (Paddy Hub Audit)" },
                { name: "Chinedu Eze", role: "State Coordinator", state: "Enugu State", clearance: "Level 3 (State Moderator)" },
                { name: "Fatima Aliyu", role: "Field Inspector", state: "Kano State", clearance: "Level 2 (Dawanau Audit)" },
                { name: "Tersoo Vembe", role: "Field Inspector", state: "Benue State", clearance: "Level 2 (Yam Transit Audit)" },
              ].map((coord) => (
                <div key={coord.name} className="p-5 rounded-2xl bg-[#171a19] border border-white/10 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-heading font-bold text-white text-sm">{coord.name}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  </div>
                  <div className="text-white/70">Role: <strong className="text-[#ff5500]">{coord.role}</strong></div>
                  <div className="text-white/70">Territory: {coord.state}</div>
                  <div className="text-[10px] font-mono text-emerald-400 pt-1 border-t border-white/10">
                    {coord.clearance}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
