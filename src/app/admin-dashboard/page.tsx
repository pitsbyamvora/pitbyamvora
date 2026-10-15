"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { MARKETPLACE_PRODUCTS, MarketplaceProduct } from "@/content/marketplace";
import {
  fetchMarketplaceProducts,
  fetchAllPaidMemberships,
  approvePaidMembership,
  PaidMembership,
  fetchAllWithdrawalRequests,
  markWithdrawalAsPaid,
  WithdrawalRequest,
  fetchAllMovementMembers,
  MovementMember,
  fetchGalleryPhotos,
  addGalleryPhoto,
  deleteGalleryPhoto,
  GalleryPhoto,
} from "@/lib/db";
import {
  Users,
  CreditCard,
  Coins,
  ShoppingBag,
  CheckCircle2,
  Clock,
  LogOut,
  Search,
  Filter,
  Check,
  RefreshCw,
  LayoutDashboard,
  Menu,
  X,
  Store,
  Camera,
  Trash2,
  Plus,
} from "lucide-react";

type AdminTab = "movement" | "memberships" | "withdrawals" | "marketplace" | "gallery";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const [activeTab, setActiveTab] = useState<AdminTab>("movement");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Data states
  const [movementSupporters, setMovementSupporters] = useState<MovementMember[]>([]);
  const [memberships, setMemberships] = useState<PaidMembership[]>([]);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([]);
  const [productsList, setProductsList] = useState<MarketplaceProduct[]>(MARKETPLACE_PRODUCTS);
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([]);

  // Action states
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [payingId, setPayingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  // New Photo Form Modal
  const [isAddPhotoOpen, setIsAddPhotoOpen] = useState(false);
  const [newPhoto, setNewPhoto] = useState({
    title: "",
    location: "Lagos",
    category: "Field Moment",
    imageUrl: "",
    description: "",
  });
  const [photoSubmitting, setPhotoSubmitting] = useState(false);

  const loadAllData = async () => {
    setRefreshing(true);
    try {
      const [moveData, memData, withData, prodData, photoData] = await Promise.all([
        fetchAllMovementMembers(),
        fetchAllPaidMemberships(),
        fetchAllWithdrawalRequests(),
        fetchMarketplaceProducts(),
        fetchGalleryPhotos(),
      ]);
      if (moveData) setMovementSupporters(moveData);
      if (memData) setMemberships(memData);
      if (withData) setWithdrawals(withData);
      if (prodData && prodData.length > 0) setProductsList(prodData);
      if (photoData) setGalleryPhotos(photoData);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleToggleProductStock = (productId: string) => {
    setProductsList((prev) =>
      prev.map((prod) =>
        prod.id === productId ? { ...prod, inStock: !prod.inStock } : prod
      )
    );
  };

  const handleAddPhotoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhoto.title.trim() || !newPhoto.imageUrl.trim()) return;
    setPhotoSubmitting(true);
    const res = await addGalleryPhoto(newPhoto);
    setPhotoSubmitting(false);
    if (res.success) {
      setIsAddPhotoOpen(false);
      setNewPhoto({ title: "", location: "Lagos", category: "Field Moment", imageUrl: "", description: "" });
      loadAllData();
    }
  };

  const handleDeletePhoto = async (id: string) => {
    const res = await deleteGalleryPhoto(id);
    if (res.success) {
      loadAllData();
    }
  };

  const pendingMembershipsCount = memberships.filter((m) => m.paymentStatus === "pending").length;
  const pendingWithdrawalsCount = withdrawals.filter((w) => w.status === "pending").length;

  const sidebarItems: { id: AdminTab; label: string; icon: any; count?: number }[] = [
    { id: "movement", label: "Movement Network", icon: Users, count: movementSupporters.length },
    { id: "memberships", label: "₦3,200 Memberships", icon: CreditCard, count: pendingMembershipsCount },
    { id: "withdrawals", label: "Bank Cashouts", icon: Coins, count: pendingWithdrawalsCount },
    { id: "marketplace", label: "Marketplace Products", icon: ShoppingBag, count: productsList.length },
    { id: "gallery", label: "Live Field Gallery", icon: Camera, count: galleryPhotos.length },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col md:flex-row">
      
      {/* ── MOBILE TOP BAR ── */}
      <div className="md:hidden bg-white border-b border-neutral-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full overflow-hidden border border-neutral-200">
            <Image src="/logo.jpg" alt="Logo" width={28} height={28} className="object-cover" />
          </div>
          <span className="font-bold text-sm text-neutral-900">Admin Portal</span>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-1.5 rounded-lg border border-neutral-200 text-neutral-700"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ── CLEAN SIDEBAR ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-neutral-200 flex flex-col justify-between transition-transform duration-200 md:static md:translate-x-0 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 space-y-6">
          {/* Logo & Portal Info */}
          <div className="flex items-center gap-3 pb-5 border-b border-neutral-100">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-neutral-200 shrink-0">
              <Image src="/logo.jpg" alt="Logo" width={36} height={36} className="object-cover" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-neutral-900 leading-tight">Amvora PITS</h2>
              <p className="text-[11px] text-neutral-500">Admin Portal</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-3 block mb-2">
              Management
            </span>
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? "bg-[#E85D04] text-white shadow-sm"
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && item.count > 0 && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : item.id === "memberships" || item.id === "withdrawals"
                          ? "bg-orange-100 text-[#E85D04]"
                          : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-neutral-100 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-50 transition"
          >
            <span>Back to Main Website</span>
          </Link>
          <button
            onClick={() => {
              signOut();
              router.push("/login");
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ── MAIN DASHBOARD VIEW ── */}
      <main className="flex-1 p-4 sm:p-8 max-w-6xl">
        
        {/* Top Header bar inside main */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-neutral-200 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-neutral-900">
              {sidebarItems.find((i) => i.id === activeTab)?.label}
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              Review records, approve member payments, and manage cashout transfers
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={loadAllData}
              disabled={refreshing}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-neutral-200 bg-white text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition shadow-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
              <span>{refreshing ? "Refreshing..." : "Refresh"}</span>
            </button>
          </div>
        </div>

        {/* ── TAB 1: MOVEMENT NETWORK SUPPORTERS ── */}
        {activeTab === "movement" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-neutral-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
                  Total Grassroots Supporters
                </span>
                <p className="text-2xl font-black text-neutral-900">{movementSupporters.length}</p>
              </div>
              <p className="text-xs text-neutral-500 max-w-sm">
                Every citizen who pledged their solidarity from the &ldquo;Join The Movement&rdquo; home section.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
              {movementSupporters.length === 0 ? (
                <div className="p-8 text-center text-xs text-neutral-500">
                  No supporters logged yet. Test by submitting from the home page.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-bold">
                      <tr>
                        <th className="py-3 px-4">Supporter Name</th>
                        <th className="py-3 px-4">Phone</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Date Joined</th>
                        <th className="py-3 px-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 text-neutral-700">
                      {movementSupporters.map((supporter, idx) => (
                        <tr key={supporter.id || idx} className="hover:bg-neutral-50/60 transition">
                          <td className="py-3 px-4 font-bold text-neutral-900">{supporter.fullName}</td>
                          <td className="py-3 px-4 font-mono">{supporter.phone}</td>
                          <td className="py-3 px-4 text-neutral-500">{supporter.email || "—"}</td>
                          <td className="py-3 px-4 text-neutral-500">
                            {new Date(supporter.joinedAt).toLocaleDateString("en-NG", { dateStyle: "medium" })}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                              Active
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── TAB 2: ₦3,200 PAID MEMBERSHIPS DESK ── */}
        {activeTab === "memberships" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-neutral-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
                  Pending Verification
                </span>
                <p className="text-2xl font-black text-[#E85D04]">{pendingMembershipsCount}</p>
              </div>
              <p className="text-xs text-neutral-500 max-w-sm">
                Confirm incoming ₦3,200 bank transfers to Access Bank. Approval generates their phone-bound 50% discount promo code.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
              {memberships.length === 0 ? (
                <div className="p-8 text-center text-xs text-neutral-500">
                  No membership payment submissions yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-bold">
                      <tr>
                        <th className="py-3 px-4">Member</th>
                        <th className="py-3 px-4">Phone</th>
                        <th className="py-3 px-4">Transfer Ref / Sender</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Code</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 text-neutral-700">
                      {memberships.map((mem) => (
                        <tr key={mem.id} className="hover:bg-neutral-50/60 transition">
                          <td className="py-3 px-4 font-bold text-neutral-900">{mem.fullName}</td>
                          <td className="py-3 px-4 font-mono">{mem.phone}</td>
                          <td className="py-3 px-4 font-mono text-neutral-600">{mem.proofReference || "Bank Transfer"}</td>
                          <td className="py-3 px-4 font-bold text-neutral-900">₦{mem.amountPaid.toLocaleString()}</td>
                          <td className="py-3 px-4 font-mono text-xs text-emerald-700">
                            {mem.promoCode ? <strong>{mem.promoCode}</strong> : <span className="text-neutral-400">Not issued</span>}
                          </td>
                          <td className="py-3 px-4 text-right">
                            {mem.paymentStatus === "pending" ? (
                              <button
                                disabled={approvingId === mem.id}
                                onClick={async () => {
                                  setApprovingId(mem.id);
                                  const res = await approvePaidMembership(mem.id);
                                  setApprovingId(null);
                                  if (res.success) {
                                    loadAllData();
                                  }
                                }}
                                className="px-3.5 py-1.5 rounded-lg bg-[#E85D04] text-white font-bold text-[11px] hover:bg-[#d14e00] transition disabled:opacity-50"
                              >
                                {approvingId === mem.id ? "Approving..." : "Confirm & Issue Code"}
                              </button>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                                <Check className="w-3 h-3" />
                                <span>Verified</span>
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── TAB 3: BANK CASHOUTS & WITHDRAWALS ── */}
        {activeTab === "withdrawals" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-neutral-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
                  Pending Cashout Requests
                </span>
                <p className="text-2xl font-black text-emerald-600">{pendingWithdrawalsCount}</p>
              </div>
              <p className="text-xs text-neutral-500 max-w-sm">
                Members cashing out their earned Refer &amp; Earn points (Min ₦3,000). Transfer to their bank account and mark as paid.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
              {withdrawals.length === 0 ? (
                <div className="p-8 text-center text-xs text-neutral-500">
                  No bank cashout requests submitted yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-bold">
                      <tr>
                        <th className="py-3 px-4">Account Holder</th>
                        <th className="py-3 px-4">Bank</th>
                        <th className="py-3 px-4">Account No</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Points</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 text-neutral-700">
                      {withdrawals.map((req) => (
                        <tr key={req.id} className="hover:bg-neutral-50/60 transition">
                          <td className="py-3 px-4 font-bold text-neutral-900">{req.accountName}</td>
                          <td className="py-3 px-4">{req.bankName}</td>
                          <td className="py-3 px-4 font-mono font-bold text-neutral-900">{req.accountNumber}</td>
                          <td className="py-3 px-4 font-bold text-emerald-700">₦{req.nairaAmount.toLocaleString()}</td>
                          <td className="py-3 px-4 font-mono text-neutral-500">{req.pointsRedeemed} pts</td>
                          <td className="py-3 px-4 text-right">
                            {req.status === "pending" ? (
                              <button
                                disabled={payingId === req.id}
                                onClick={async () => {
                                  setPayingId(req.id);
                                  const res = await markWithdrawalAsPaid(req.id);
                                  setPayingId(null);
                                  if (res.success) {
                                    loadAllData();
                                  }
                                }}
                                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700 transition disabled:opacity-50"
                              >
                                {payingId === req.id ? "Updating..." : "Mark as Paid"}
                              </button>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                                <Check className="w-3 h-3" />
                                <span>Paid to Bank</span>
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── TAB 4: MARKETPLACE PRODUCT CONTROLS ── */}
        {activeTab === "marketplace" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-neutral-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
                  Active Products
                </span>
                <p className="text-2xl font-black text-neutral-900">{productsList.length}</p>
              </div>
              <Link
                href="/vendor"
                className="px-4 py-2 rounded-lg bg-[#E85D04] text-white text-xs font-bold hover:bg-[#d14e00] transition w-fit"
              >
                + Open Vendor Portal to Add Items
              </Link>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-bold">
                    <tr>
                      <th className="py-3 px-4">Item</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Retail Price</th>
                      <th className="py-3 px-4">Member Price</th>
                      <th className="py-3 px-4 text-right">Availability</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 text-neutral-700">
                    {productsList.map((prod) => (
                      <tr key={prod.id} className="hover:bg-neutral-50/60 transition">
                        <td className="py-3 px-4 font-bold text-neutral-900">{prod.title}</td>
                        <td className="py-3 px-4 text-neutral-500">{prod.category}</td>
                        <td className="py-3 px-4 font-mono">₦{prod.openMarketPrice.toLocaleString()}</td>
                        <td className="py-3 px-4 font-mono font-bold text-[#E85D04]">₦{prod.cooperativePrice.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleToggleProductStock(prod.id)}
                            className={`px-3 py-1 rounded-full text-[10px] font-bold transition ${
                              prod.inStock
                                ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                : "bg-red-50 text-red-700 hover:bg-red-100"
                            }`}
                          >
                            {prod.inStock ? "In Stock" : "Out of Stock"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        {/* ── TAB 5: LIVE FIELD GALLERY MANAGEMENT ── */}
        {activeTab === "gallery" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-neutral-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
                  Field Photo Gallery
                </span>
                <p className="text-2xl font-black text-neutral-900">{galleryPhotos.length} Photos Live</p>
              </div>
              <button
                onClick={() => setIsAddPhotoOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#E85D04] text-white text-xs font-bold hover:bg-[#d14e00] transition w-fit shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Photo</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
              {galleryPhotos.length === 0 ? (
                <div className="p-8 text-center text-xs text-neutral-500">
                  No photos in the gallery yet. Click &ldquo;Add New Photo&rdquo; to upload.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-bold">
                      <tr>
                        <th className="py-3 px-4">Preview</th>
                        <th className="py-3 px-4">Title</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Location</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 text-neutral-700">
                      {galleryPhotos.map((photo) => (
                        <tr key={photo.id} className="hover:bg-neutral-50/60 transition">
                          <td className="py-3 px-4">
                            <div className="relative w-12 h-9 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200">
                              <Image src={photo.imageUrl} alt={photo.title} fill className="object-cover" />
                            </div>
                          </td>
                          <td className="py-3 px-4 font-bold text-neutral-900">{photo.title}</td>
                          <td className="py-3 px-4 text-neutral-500">{photo.category}</td>
                          <td className="py-3 px-4 text-[#E85D04] font-semibold">{photo.location}</td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => handleDeletePhoto(photo.id)}
                              className="p-1.5 text-neutral-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition"
                              title="Delete Photo"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* ── ADD PHOTO MODAL ── */}
      {isAddPhotoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-md rounded-2xl bg-white border border-neutral-200 p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setIsAddPhotoOpen(false)}
              className="absolute right-4 top-4 p-1.5 rounded-lg text-neutral-400 hover:bg-neutral-100"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <h3 className="font-bold text-base text-neutral-900">Add Field Photo to Gallery</h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Displays live in the 2x2 field gallery on the homepage.
              </p>
            </div>

            <form onSubmit={handleAddPhotoSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Photo Title <span className="text-[#E85D04]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grassroots Food Distribution"
                  value={newPhoto.title}
                  onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alimosho, Lagos"
                    value={newPhoto.location}
                    onChange={(e) => setNewPhoto({ ...newPhoto, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Agriculture & Food"
                    value={newPhoto.category}
                    onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Image URL (ImageKit, Unsplash, or CDN) <span className="text-[#E85D04]">*</span>
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={newPhoto.imageUrl}
                  onChange={(e) => setNewPhoto({ ...newPhoto, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief description of what happened..."
                  value={newPhoto.description}
                  onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddPhotoOpen(false)}
                  className="px-4 py-2 rounded-lg border border-neutral-200 text-xs font-medium hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={photoSubmitting}
                  className="px-4 py-2 rounded-lg bg-[#E85D04] text-white text-xs font-bold hover:bg-[#d14e00] disabled:opacity-50"
                >
                  {photoSubmitting ? "Saving..." : "Publish to Gallery"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
