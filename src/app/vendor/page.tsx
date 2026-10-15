"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Store,
  Plus,
  Package,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShoppingBag,
  ArrowRight,
  Truck,
  Building2,
  Phone,
  Tag,
  DollarSign,
  X,
} from "lucide-react";
import {
  registerVendor,
  fetchVendorProducts,
  createVendorProduct,
  Vendor,
  VendorProduct,
} from "@/lib/db";

export default function VendorPortalPage() {
  const [currentVendor, setCurrentVendor] = useState<Vendor | null>(null);
  const [products, setProducts] = useState<VendorProduct[]>([]);
  const [loading, setLoading] = useState(false);

  // Sign up state
  const [signupForm, setSignupForm] = useState({
    storeName: "",
    ownerName: "",
    whatsapp: "",
    email: "",
    state: "Lagos",
    lga: "",
    category: "Food Staples & Grains",
  });
  const [signupError, setSignupError] = useState("");

  // Add Product Modal
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    category: "Grains & Rice",
    retailPrice: "",
    memberPrice: "",
    unit: "50kg Bag",
    imageUrl: "",
    description: "",
    stockCount: "50",
    pickupHubs: "Lagos (Ojodu), Lagos (Ikeja)",
  });
  const [productError, setProductError] = useState("");
  const [productSubmitting, setProductSubmitting] = useState(false);

  // Check localStorage for active vendor session
  useEffect(() => {
    const saved = localStorage.getItem("pits_active_vendor");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCurrentVendor(parsed);
        loadProducts(parsed.id);
      } catch {}
    }
  }, []);

  const loadProducts = async (vendorId: string) => {
    setLoading(true);
    const data = await fetchVendorProducts(vendorId);
    setProducts(data);
    setLoading(false);
  };

  const handleRegisterVendor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupForm.storeName.trim() || !signupForm.whatsapp.trim()) {
      setSignupError("Please provide Store Name and WhatsApp Number.");
      return;
    }

    setSignupError("");
    setLoading(true);

    const res = await registerVendor(signupForm);
    setLoading(false);

    if (res.success && res.vendor) {
      setCurrentVendor(res.vendor);
      localStorage.setItem("pits_active_vendor", JSON.stringify(res.vendor));
      loadProducts(res.vendor.id);
    } else {
      setSignupError(res.error || "Failed to create vendor account");
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentVendor) return;

    if (!newProduct.title.trim() || !newProduct.retailPrice || !newProduct.memberPrice) {
      setProductError("Please enter Title, Retail Price, and Member Price.");
      return;
    }

    setProductSubmitting(true);
    setProductError("");

    const hubs = newProduct.pickupHubs.split(",").map((s) => s.trim()).filter(Boolean);

    const res = await createVendorProduct({
      vendorId: currentVendor.id,
      title: newProduct.title,
      category: newProduct.category,
      retailPrice: Number(newProduct.retailPrice),
      memberPrice: Number(newProduct.memberPrice),
      unit: newProduct.unit,
      imageUrl:
        newProduct.imageUrl ||
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      description: newProduct.description,
      stockCount: Number(newProduct.stockCount) || 50,
      pickupHubs: hubs,
    });

    setProductSubmitting(false);

    if (res.success) {
      setIsAddProductOpen(false);
      setNewProduct({
        title: "",
        category: "Grains & Rice",
        retailPrice: "",
        memberPrice: "",
        unit: "50kg Bag",
        imageUrl: "",
        description: "",
        stockCount: "50",
        pickupHubs: "Lagos (Ojodu), Lagos (Ikeja)",
      });
      loadProducts(currentVendor.id);
    } else {
      setProductError(res.error || "Failed to publish product");
    }
  };

  return (
    <div className="min-h-screen text-foreground pb-20">
      {/* ── Top Header ── */}
      <section className="py-12 sm:py-16 border-b border-border/40 bg-card/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/20 text-[#E85D04] text-xs font-bold uppercase tracking-wider">
              <Store className="w-3.5 h-3.5" />
              <span>Partner &amp; Producer Command Center</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-black text-foreground">
              {currentVendor ? currentVendor.storeName : "Vendor & Producer Portal"}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {currentVendor
                ? `Manage your catalog. Incoming customer orders route directly to your WhatsApp (${currentVendor.whatsapp}).`
                : "List your wholesale farm staples, cookery meals, or services. Get direct orders via WhatsApp from verified members and general citizens."}
            </p>
          </div>

          {currentVendor && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsAddProductOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E85D04] text-white hover:bg-[#d44f00] font-bold text-xs shadow-md transition"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem("pits_active_vendor");
                  setCurrentVendor(null);
                  setProducts([]);
                }}
                className="px-4 py-2.5 rounded-xl border border-border text-xs font-semibold hover:bg-muted text-muted-foreground transition"
              >
                Switch Account
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Body Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {!currentVendor ? (
          /* Sign Up Form for Vendors (Instant Access) */
          <div className="max-w-2xl mx-auto bg-card border-2 border-border rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div className="space-y-1 text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#E85D04]/10 text-[#E85D04] flex items-center justify-center mx-auto mb-3">
                <Store className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-foreground">
                Register Your Merchant Store
              </h2>
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                No complex approval wait. Partners gain instant access to add products to the public marketplace.
              </p>
            </div>

            {signupError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{signupError}</span>
              </div>
            )}

            <form onSubmit={handleRegisterVendor} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">
                  Store / Business Name <span className="text-[#E85D04]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kebbi Direct Rice Mills"
                  value={signupForm.storeName}
                  onChange={(e) => setSignupForm({ ...signupForm, storeName: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-[#E85D04] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">
                    Contact Person Name <span className="text-[#E85D04]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alhaji Garba"
                    value={signupForm.ownerName}
                    onChange={(e) => setSignupForm({ ...signupForm, ownerName: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-[#E85D04] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">
                    WhatsApp Number <span className="text-[#E85D04]">* (Receives Orders)</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 08168850257"
                    value={signupForm.whatsapp}
                    onChange={(e) => setSignupForm({ ...signupForm, whatsapp: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-[#E85D04] focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">
                    Primary Category
                  </label>
                  <select
                    value={signupForm.category}
                    onChange={(e) => setSignupForm({ ...signupForm, category: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-[#E85D04] focus:outline-none"
                  >
                    <option value="Food Staples & Grains">Food Staples &amp; Grains</option>
                    <option value="Cookery & Meals">Cookery &amp; Prepared Meals</option>
                    <option value="Connectivity & Tech">Connectivity &amp; Tech</option>
                    <option value="Logistics & Mobility">Logistics &amp; Mobility</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">
                    State / Location
                  </label>
                  <input
                    type="text"
                    value={signupForm.state}
                    onChange={(e) => setSignupForm({ ...signupForm, state: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-[#E85D04] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-[#E85D04] hover:bg-[#d44f00] text-white font-bold text-sm transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>Creating Store...</span>
                  ) : (
                    <>
                      <span>Open Vendor Store &amp; Access Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Active Vendor Dashboard (Shopify style) */
          <div className="space-y-8">
            {/* Quick Stat Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="rounded-2xl border border-border bg-card p-5 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Active Listed Products
                </span>
                <p className="text-3xl font-black text-foreground">{products.length}</p>
                <p className="text-[11px] text-emerald-600 font-semibold">Live in public marketplace</p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Order Dispatch Route
                </span>
                <p className="text-lg font-black text-foreground truncate">{currentVendor.whatsapp}</p>
                <p className="text-[11px] text-[#E85D04] font-semibold">Direct WhatsApp routing enabled</p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Store Status
                </span>
                <p className="text-lg font-black text-emerald-600 flex items-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Verified Partner</span>
                </p>
                <p className="text-[11px] text-muted-foreground">Zero commission deduction</p>
              </div>
            </div>

            {/* Product Table / Cards */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-black text-xl text-foreground">
                  Your Catalog Products ({products.length})
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E85D04] hover:underline"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add another product</span>
                </button>
              </div>

              {products.length === 0 ? (
                <div className="rounded-2xl border-2 border-dashed border-border p-12 text-center space-y-3 bg-card/40">
                  <Package className="w-10 h-10 text-muted-foreground mx-auto" />
                  <h4 className="font-bold text-foreground">No products added yet</h4>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    Start publishing your wholesale commodities, meals, or items so citizens can order directly to your WhatsApp.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsAddProductOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E85D04] text-white text-xs font-bold shadow transition"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add First Product</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((p) => (
                    <div
                      key={p.id}
                      className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col justify-between shadow-sm"
                    >
                      <div className="relative aspect-[16/10] w-full bg-muted">
                        <Image src={p.imageUrl} alt={p.title} fill className="object-cover" />
                        <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-white">
                          {p.category}
                        </div>
                      </div>

                      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-sm text-foreground line-clamp-1">{p.title}</h4>
                          <p className="text-xs text-muted-foreground mt-0.5">{p.unit} • Stock: {p.stockCount}</p>
                        </div>

                        <div className="pt-2 border-t border-border flex items-baseline justify-between text-xs">
                          <div>
                            <span className="text-[10px] text-muted-foreground block">Retail Price:</span>
                            <span className="font-bold text-foreground">₦{p.retailPrice.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#E85D04] block font-bold">Member Price:</span>
                            <span className="font-black text-[#E85D04]">₦{p.memberPrice.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Add Product Modal (Shopify style) ── */}
      {isAddProductOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-xl rounded-3xl border border-border bg-card p-6 sm:p-8 text-foreground shadow-2xl space-y-5 my-8">
            <button
              type="button"
              onClick={() => setIsAddProductOpen(false)}
              className="absolute right-4 top-4 p-2 rounded-full text-muted-foreground hover:bg-muted"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="font-heading font-black text-xl text-foreground">
                Add Product to Marketplace
              </h3>
              <p className="text-xs text-muted-foreground">
                Set both standard visitor retail price and the discounted member price.
              </p>
            </div>

            {productError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs">
                {productError}
              </div>
            )}

            <form onSubmit={handleCreateProduct} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">
                  Product Title <span className="text-[#E85D04]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 50kg Premium Stone-Free Local Rice"
                  value={newProduct.title}
                  onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm focus:border-[#E85D04] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">
                    Category
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm focus:border-[#E85D04] focus:outline-none"
                  >
                    <option value="Grains & Rice">Grains &amp; Rice</option>
                    <option value="Tubers & Staples">Tubers &amp; Staples</option>
                    <option value="Cooking Oils">Cooking Oils</option>
                    <option value="Cookery Meals">Cookery Meals</option>
                    <option value="Civic Connectivity">Civic Connectivity</option>
                    <option value="Mobility Vouchers">Mobility Vouchers</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">
                    Unit Size (e.g. 50kg Bag, 25L Keg, Voucher)
                  </label>
                  <input
                    type="text"
                    value={newProduct.unit}
                    onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm focus:border-[#E85D04] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">
                    Standard Retail Price (₦) <span className="text-[#E85D04]">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="88000"
                    value={newProduct.retailPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, retailPrice: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm focus:border-[#E85D04] focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#E85D04] block mb-1">
                    Member Discounted Price (₦) <span className="text-[#E85D04]">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="52000"
                    value={newProduct.memberPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, memberPrice: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm focus:border-[#E85D04] focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1">
                  Product Image URL (Unsplash or ImageKit)
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newProduct.imageUrl}
                  onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm focus:border-[#E85D04] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1">
                  Description / Origin
                </label>
                <textarea
                  rows={2}
                  placeholder="Direct farm packaging from Kebbi paddles..."
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm focus:border-[#E85D04] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-border text-xs font-semibold hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={productSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-[#E85D04] hover:bg-[#d44f00] text-white font-bold text-xs shadow transition disabled:opacity-50"
                >
                  {productSubmitting ? "Publishing..." : "Publish Product Live"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
