"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MARKETPLACE_PRODUCTS,
  VERIFIED_PROMO_CODES,
  MarketplaceProduct,
  PromoCode,
} from "@/content/marketplace";
import { createMarketplaceOrder, fetchMarketplaceProducts } from "@/lib/db";
import { useAuth } from "@/context/AuthContext";
import {
  ShoppingBag,
  Tag,
  Sparkles,
  CheckCircle2,
  MapPin,
  TrendingDown,
  ArrowRight,
  Plus,
  Minus,
  Trash2,
  X,
  ShieldCheck,
  Percent,
  Receipt,
  HeartHandshake,
} from "lucide-react";

interface CartItem {
  product: MarketplaceProduct;
  quantity: number;
}

export default function MarketplacePage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<MarketplaceProduct[]>(MARKETPLACE_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    fetchMarketplaceProducts().then((data) => {
      if (data && data.length > 0) {
        setProducts(data);
      }
    });
  }, []);
  
  // Promo Code State
  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [activePromo, setActivePromo] = useState<PromoCode | null>(
    VERIFIED_PROMO_CODES["PITS2027"] // Pre-activated default for citizen delight
  );
  const [promoError, setPromoError] = useState<string | null>(null);
  
  // Checkout & Order Modal State
  const [selectedHub, setSelectedHub] = useState("Lagos (Ojodu Underpass Hub)");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [orderConfirmed, setOrderConfirmed] = useState<string | null>(null);

  const categories = [
    "All",
    "Grains & Rice",
    "Tubers & Staples",
    "Cooking Oils",
    "Civic Connectivity",
  ];

  const quickCodes = ["PITS2027", "RICETEST", "CITIZEN60", "WARDFOOD"];

  const handleApplyPromo = (codeToApply?: string) => {
    const code = (codeToApply || promoCodeInput).trim().toUpperCase();
    setPromoError(null);

    if (!code) {
      setPromoError("Please enter a valid citizen promo code.");
      return;
    }

    const matchedPromo = VERIFIED_PROMO_CODES[code];
    if (matchedPromo) {
      setActivePromo(matchedPromo);
      setPromoCodeInput(code);
    } else {
      setPromoError("Invalid code. Try citizen codes: PITS2027, RICETEST, or CITIZEN60.");
    }
  };

  const addToCart = (product: MarketplaceProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Price calculations
  const openMarketSubtotal = cart.reduce(
    (acc, item) => acc + item.product.openMarketPrice * item.quantity,
    0
  );

  const cooperativeSubtotal = cart.reduce(
    (acc, item) => acc + item.product.cooperativePrice * item.quantity,
    0
  );

  const discountAmount = activePromo
    ? Math.round((cooperativeSubtotal * activePromo.discountPercentage) / 100)
    : 0;

  const finalPayable = Math.max(0, cooperativeSubtotal - discountAmount);
  const totalSavings = openMarketSubtotal - finalPayable;

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const newOrderNumber = `PITS-HUB-${Math.floor(10000 + Math.random() * 90000)}`;
    
    try {
      await createMarketplaceOrder({
        orderCode: newOrderNumber,
        buyerName: customerName || (user?.fullName || "Citizen Buyer"),
        buyerPhone: customerPhone || "08000000000",
        buyerEmail: user?.email,
        pickupHub: selectedHub,
        items: cart.map((item) => ({
          id: item.product.id,
          title: item.product.title,
          unit: item.product.unit,
          quantity: item.quantity,
          unitPrice: item.product.cooperativePrice,
        })),
        appliedPromo: activePromo?.code,
        discountAmount,
        totalPrice: finalPayable,
        userId: user?.id,
      });
    } catch {
      // Graceful fallback already handled
    }

    setOrderConfirmed(newOrderNumber);
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 relative overflow-x-hidden">
      {/* 1. Header Banner */}
      <section className="bg-[#171A19] text-white py-12 sm:py-16 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#ff5500]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#ff5500] text-xs font-bold uppercase tracking-wider border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-[#ff5500]" />
                <span>The Rice Test & PITS Food Hub</span>
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white">
                Direct Food & Commodity Hub
              </h1>
              <p className="font-body text-xs sm:text-sm md:text-base text-white/80 leading-relaxed font-normal">
                Direct farm-gate food supplies bypassing middleman hoarding. Use your citizen promo codes to access heavy subsidies on locally milled rice, garri, and essentials.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/become-partner"
                className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 hover:bg-white/10 text-white font-bold text-xs transition"
              >
                <HeartHandshake className="w-4 h-4 text-[#ff5500]" />
                <span>Become a Producer Partner</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Citizen Promo Code Banner */}
      <div className="bg-[#ff5500] text-white py-4 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-heading font-black uppercase tracking-wider bg-black/20 px-2.5 py-1 rounded-md text-[11px] flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" />
              <span>Citizen Promo Code Active:</span>
            </span>
            <span className="font-medium text-white/95">
              {activePromo ? (
                <>
                  <strong className="underline font-mono font-bold">{activePromo.code}</strong> — {activePromo.description}
                </>
              ) : (
                "Click a citizen voucher code below to slash prices instantly:"
              )}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold text-white/80 uppercase">Quick Codes:</span>
            {quickCodes.map((code) => (
              <button
                key={code}
                onClick={() => handleApplyPromo(code)}
                className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold transition shadow-sm ${
                  activePromo?.code === code
                    ? "bg-white text-[#ff5500] ring-2 ring-white"
                    : "bg-black/25 text-white hover:bg-black/40"
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Main Catalogue Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* Category Filter Pills & Floating Basket Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-border pb-5">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-[#171A19] text-white font-bold shadow-md"
                    : "bg-card border border-border text-muted-foreground hover:border-[#ff5500] hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Trigger Basket Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#171A19] hover:bg-black text-white font-bold text-xs shadow-md transition-all flex-shrink-0"
          >
            <ShoppingBag className="w-4 h-4 text-[#ff5500]" />
            <span>Citizen Basket</span>
            {totalCartCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#ff5500] text-white text-[10px] font-black">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            // Calculate subsidized price based on active promo
            const isCategoryEligible =
              !activePromo?.applicableCategory ||
              activePromo.applicableCategory === product.category;

            const promoDiscountPct =
              activePromo && isCategoryEligible ? activePromo.discountPercentage : 0;

            const promoSlashedPrice = Math.round(
              product.cooperativePrice * (1 - promoDiscountPct / 100)
            );

            const totalSavedPerUnit = product.openMarketPrice - promoSlashedPrice;

            return (
              <div
                key={product.id}
                className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:border-[#ff5500]/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image with Badges */}
                  <div className="relative w-full h-52 bg-black/5 overflow-hidden">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Category Tag */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                        {product.category}
                      </span>
                    </div>

                    {/* Citizen Savings Ribbon */}
                    <div className="absolute bottom-3 right-3">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#ff5500] text-white text-[11px] font-black shadow-lg">
                        <TrendingDown className="w-3.5 h-3.5" />
                        <span>Save ₦{totalSavedPerUnit.toLocaleString()}</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <MapPin className="w-3 h-3 text-[#ff5500]" />
                      <span>{product.origin}</span>
                    </div>

                    <h3 className="font-heading text-base sm:text-lg font-bold text-foreground leading-snug group-hover:text-[#ff5500] transition-colors">
                      {product.title}
                    </h3>

                    <p className="font-body text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {product.description}
                    </p>

                    {/* Price Comparison Ledger */}
                    <div className="p-3.5 rounded-2xl bg-muted/40 border border-border space-y-2 mt-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Open Market Price:</span>
                        <span className="line-through text-red-500 font-mono font-semibold">
                          ₦{product.openMarketPrice.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>PITS Farm-Gate Price:</span>
                        <span className="font-mono font-bold text-foreground">
                          ₦{product.cooperativePrice.toLocaleString()}
                        </span>
                      </div>

                      {/* With Promo Code Slashed Price */}
                      <div className="pt-2 border-t border-border flex items-baseline justify-between">
                        <span className="text-[11px] font-extrabold text-[#ff5500] uppercase tracking-wider flex items-center gap-1">
                          <Percent className="w-3 h-3" />
                          <span>With Code ({activePromo?.code || "None"}):</span>
                        </span>
                        <span className="text-xl sm:text-2xl font-black text-[#ff5500] font-mono">
                          ₦{promoSlashedPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 sm:p-6 pt-0">
                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="w-full py-3 rounded-full bg-[#171A19] hover:bg-[#ff5500] text-white font-bold text-xs tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Citizen Basket</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Slide-Over Shopping Basket Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-card border-l border-border h-full flex flex-col justify-between p-6 shadow-2xl overflow-y-auto">
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#ff5500]" />
                  <h3 className="font-heading font-black text-lg text-foreground">
                    Your Subsidized Basket
                  </h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-full hover:bg-muted text-muted-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              {cart.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto" />
                  <p className="text-sm font-bold text-foreground">
                    Your basket is empty
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Select staple items from the catalogue to view direct cooperative pricing.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[38vh] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-3.5 rounded-2xl bg-muted/30 border border-border flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-foreground truncate">
                          {item.product.title}
                        </h4>
                        <div className="flex items-center gap-2 text-muted-foreground text-[11px] mt-0.5">
                          <span className="font-mono text-[#ff5500] font-bold">
                            ₦{item.product.cooperativePrice.toLocaleString()}
                          </span>
                          <span>•</span>
                          <span>{item.product.unit}</span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="p-1 rounded bg-muted hover:bg-muted/80 text-foreground"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono font-bold text-xs w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="p-1 rounded bg-muted hover:bg-muted/80 text-foreground"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1 text-red-500 hover:text-red-700 ml-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Promo Code Input Inside Drawer */}
              {cart.length > 0 && (
                <div className="pt-4 border-t border-border mt-4 space-y-2">
                  <label className="block text-[11px] font-bold text-foreground uppercase tracking-wider">
                    Enter Citizen Promo Voucher
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      placeholder="e.g. PITS2027 / RICETEST"
                      className="flex-1 px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs font-mono uppercase focus:outline-none focus:ring-2 focus:ring-[#ff5500]"
                    />
                    <button
                      onClick={() => handleApplyPromo()}
                      className="px-4 py-2 rounded-xl bg-[#ff5500] hover:bg-[#e04b00] text-white font-bold text-xs transition"
                    >
                      Apply
                    </button>
                  </div>

                  {activePromo && (
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-medium flex items-center justify-between">
                      <span>✓ {activePromo.code}: {activePromo.discountPercentage}% Subsidized</span>
                      <button
                        onClick={() => setActivePromo(null)}
                        className="text-red-500 hover:underline text-[10px]"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  {promoError && (
                    <p className="text-[11px] text-red-500 font-medium">{promoError}</p>
                  )}
                </div>
              )}
            </div>

            {/* Drawer Bottom: Order Summary & Checkout Form */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-border space-y-4">
                {/* Cost Breakdown */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Open Market Value:</span>
                    <span className="line-through font-mono">
                      ₦{openMarketSubtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>PITS Cooperative Baseline:</span>
                    <span className="font-mono text-foreground font-semibold">
                      ₦{cooperativeSubtotal.toLocaleString()}
                    </span>
                  </div>
                  {activePromo && (
                    <div className="flex justify-between text-[#ff5500] font-bold">
                      <span>Citizen Voucher Discount ({activePromo.discountPercentage}%):</span>
                      <span className="font-mono">-₦{discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-black text-foreground pt-2 border-t border-border">
                    <span>Final Payable Amount:</span>
                    <span className="font-mono text-[#ff5500] text-lg">
                      ₦{finalPayable.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Savings Pill */}
                <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold text-center">
                  You are saving ₦{totalSavings.toLocaleString()} on this order!
                </div>

                {/* Quick Reservation Form */}
                <form onSubmit={handleCheckout} className="space-y-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-foreground mb-1">
                      Select Your State Pickup Hub
                    </label>
                    <select
                      value={selectedHub}
                      onChange={(e) => setSelectedHub(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-[#ff5500]"
                    >
                      <option value="Lagos (Ojodu Underpass Hub)">Lagos (Ojodu Underpass Hub)</option>
                      <option value="Abuja (Wuse Market Distribution Node)">Abuja (Wuse Market Distribution Node)</option>
                      <option value="Ibadan (Bodija Cooperative Post)">Ibadan (Bodija Cooperative Post)</option>
                      <option value="Kano (Dawanau Grain Center)">Kano (Dawanau Grain Center)</option>
                      <option value="Kebbi (Argungu Pilot Mill)">Kebbi (Argungu Pilot Mill)</option>
                      <option value="Port Harcourt (Mile 1 Node)">Port Harcourt (Mile 1 Node)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone (+234)"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#ff5500] to-[#e04b00] hover:to-[#c73e00] text-white font-bold text-xs tracking-wider shadow-lg hover:shadow-xl transition-all"
                  >
                    Confirm Subsidized Order Reservation
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. Order Confirmation Voucher Modal */}
      {orderConfirmed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-card border border-border rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl text-center space-y-6 text-xs">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-500">
                Cooperative Voucher Issued
              </span>
              <h3 className="font-heading font-black text-xl sm:text-2xl text-foreground">
                Order Reserved Successfully
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Thank you, <strong>{customerName || "Citizen"}</strong>. Your subsidized food allocation has been locked in with promo code{" "}
                <strong>{activePromo?.code || "DIRECT"}</strong>.
              </p>
            </div>

            {/* Voucher Card */}
            <div className="p-5 rounded-2xl bg-muted/40 border-2 border-dashed border-border space-y-3 text-left font-mono">
              <div className="flex justify-between border-b border-border pb-2 text-[11px]">
                <span className="text-muted-foreground">Order ID:</span>
                <span className="font-bold text-[#ff5500]">{orderConfirmed}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-muted-foreground">Pickup Hub:</span>
                <span className="font-bold text-foreground text-right">{selectedHub}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-muted-foreground">Amount to Pay at Hub:</span>
                <span className="font-bold text-[#ff5500]">₦{finalPayable.toLocaleString()}</span>
              </div>

              {/* Barcode representation */}
              <div className="pt-2 text-center text-muted-foreground text-[10px] tracking-widest">
                |||||| | |||| |||||| || ||||| |||
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => setOrderConfirmed(null)}
                className="w-full py-3 rounded-full bg-[#171A19] text-white hover:bg-black font-bold text-xs"
              >
                Done & Return to Food Hub
              </button>
              <Link
                href="/portal"
                className="text-xs font-semibold text-[#ff5500] hover:underline"
              >
                View in Member Portal →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
