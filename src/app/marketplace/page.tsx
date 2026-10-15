"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
import { ServiceCategoryBar } from "@/components/ServiceCategoryBar";
import {
  ShoppingBag,
  Search,
  CheckCircle2,
  Plus,
  Minus,
  Trash2,
  X,
  HeartHandshake,
  ArrowLeft,
  Copy,
  Check,
  Loader2,
} from "lucide-react";

/*
  Brand colours (from the Amvora Light logo)
  ink #1A1A1A · flame red #F42D1E · amber #F4A942
*/

interface CartEntry {
  id: string;
  quantity: number;
}

interface CartLine {
  product: MarketplaceProduct;
  quantity: number;
  unitPrice: number; // price after promo, per unit
  lineTotal: number;
}

interface PlacedOrder {
  code: string;
  hub: string;
  total: number;
  name: string;
  promo?: string;
  itemCount: number;
}

const CART_KEY = "pits-marketplace-cart-v1";
const MAX_QTY = 99;

const categories = [
  "All",
  "Grains & Rice",
  "Tubers & Staples",
  "Cooking Oils",
  "Civic Connectivity",
];

const quickCodes = ["PITS2027", "RICETEST", "CITIZEN60", "WARDFOOD"];

const hubs = [
  "Lagos (Ojodu Underpass Hub)",
  "Abuja (Wuse Market Distribution Node)",
  "Ibadan (Bodija Cooperative Post)",
  "Kano (Dawanau Grain Center)",
  "Kebbi (Argungu Pilot Mill)",
  "Port Harcourt (Mile 1 Node)",
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "savings", label: "Biggest saving" },
];

const NG_PHONE = /^(?:\+?234|0)[789][01]\d{8}$/;

const naira = (n: number) => `₦${n.toLocaleString("en-NG")}`;

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4A942]";

// Promo discount for one product. Respects the code's category, so the price on the
// card is always the price the customer is charged.
function promoPctFor(promo: PromoCode | null, product: MarketplaceProduct) {
  if (!promo) return 0;
  const eligible =
    !promo.applicableCategory || promo.applicableCategory === product.category;
  return eligible ? promo.discountPercentage : 0;
}

function unitPriceFor(promo: PromoCode | null, product: MarketplaceProduct) {
  return Math.round(
    product.cooperativePrice * (1 - promoPctFor(promo, product) / 100)
  );
}

function QtyStepper({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (next: number) => void;
  label: string;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-border bg-background">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        aria-label={`Decrease quantity of ${label}`}
        className={`flex h-9 w-9 items-center justify-center rounded-l-full text-foreground transition-colors hover:bg-muted ${focusRing}`}
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span
        aria-live="polite"
        className="w-8 text-center text-sm font-bold tabular-nums text-foreground"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= MAX_QTY}
        aria-label={`Increase quantity of ${label}`}
        className={`flex h-9 w-9 items-center justify-center rounded-r-full text-foreground transition-colors hover:bg-muted disabled:opacity-40 ${focusRing}`}
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export default function MarketplacePage() {
  const { user } = useAuth();

  // Catalogue
  const [products, setProducts] = useState<MarketplaceProduct[]>(MARKETPLACE_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");

  // Basket (stored as id + quantity so prices always come from the latest catalogue)
  const [cart, setCart] = useState<CartEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [step, setStep] = useState<"cart" | "details">("cart");
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Promo
  const [promoInput, setPromoInput] = useState("");
  const [activePromo, setActivePromo] = useState<PromoCode | null>(
    VERIFIED_PROMO_CODES["PITS2027"] ?? null
  );
  const [promoError, setPromoError] = useState<string | null>(null);

  // Checkout
  const [selectedHub, setSelectedHub] = useState(hubs[0]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [placing, setPlacing] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [placed, setPlaced] = useState<PlacedOrder | null>(null);
  const [copied, setCopied] = useState(false);

  // Load the latest products from the database
  useEffect(() => {
    let cancelled = false;
    fetchMarketplaceProducts().then((data) => {
      if (!cancelled && data && data.length > 0) setProducts(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Restore the basket after a refresh
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setCart(
            parsed.filter(
              (e) =>
                e &&
                typeof e.id === "string" &&
                Number.isFinite(e.quantity) &&
                e.quantity > 0
            )
          );
        }
      }
    } catch {
      // Storage unavailable: start with an empty basket
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage errors
    }
  }, [cart, hydrated]);

  // Pre-fill the name for signed-in members
  useEffect(() => {
    if (user?.fullName && !customerName) setCustomerName(user.fullName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Lock page scroll and close on Escape while a panel is open
  useEffect(() => {
    if (!isCartOpen && !placed) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (placed) setPlaced(null);
      else closeCart();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCartOpen, placed]);

  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    []
  );

  const showToast = (message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  };

  const closeCart = () => {
    setIsCartOpen(false);
    setStep("cart");
    setOrderError(null);
  };

  const qtyOf = (id: string) => cart.find((e) => e.id === id)?.quantity ?? 0;

  const setQty = (id: string, quantity: number) => {
    const q = Math.min(quantity, MAX_QTY);
    setCart((prev) => {
      if (q <= 0) return prev.filter((e) => e.id !== id);
      return prev.some((e) => e.id === id)
        ? prev.map((e) => (e.id === id ? { ...e, quantity: q } : e))
        : [...prev, { id, quantity: q }];
    });
  };

  const addToCart = (product: MarketplaceProduct) => {
    setQty(product.id, qtyOf(product.id) + 1);
    showToast(`${product.title} added to basket`);
  };

  // Basket lines and totals
  const lines: CartLine[] = useMemo(() => {
    const result: CartLine[] = [];
    for (const entry of cart) {
      const product = products.find((p) => p.id === entry.id);
      if (!product) continue;
      const unitPrice = unitPriceFor(activePromo, product);
      result.push({
        product,
        quantity: entry.quantity,
        unitPrice,
        lineTotal: unitPrice * entry.quantity,
      });
    }
    return result;
  }, [cart, products, activePromo]);

  const itemCount = lines.reduce((a, l) => a + l.quantity, 0);
  const marketTotal = lines.reduce(
    (a, l) => a + l.product.openMarketPrice * l.quantity,
    0
  );
  const baseTotal = lines.reduce(
    (a, l) => a + l.product.cooperativePrice * l.quantity,
    0
  );
  const total = lines.reduce((a, l) => a + l.lineTotal, 0);
  const discount = baseTotal - total;
  const savings = Math.max(0, marketTotal - total);
  const promoNotUsed = !!activePromo && lines.length > 0 && discount === 0;

  // If the basket empties while checking out, go back to the basket step
  useEffect(() => {
    if (lines.length === 0) setStep("cart");
  }, [lines.length]);

  // Search, filter and sort
  const visibleProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = products.filter((p) => {
      const inCategory = selectedCategory === "All" || p.category === selectedCategory;
      const matches =
        !q || `${p.title} ${p.origin} ${p.description}`.toLowerCase().includes(q);
      return inCategory && matches;
    });
    const price = (p: MarketplaceProduct) => unitPriceFor(activePromo, p);
    if (sort === "price-asc") return [...list].sort((a, b) => price(a) - price(b));
    if (sort === "price-desc") return [...list].sort((a, b) => price(b) - price(a));
    if (sort === "savings")
      return [...list].sort(
        (a, b) =>
          b.openMarketPrice - price(b) - (a.openMarketPrice - price(a))
      );
    return list;
  }, [products, selectedCategory, search, sort, activePromo]);

  const filtersActive = selectedCategory !== "All" || search.trim() !== "";
  const clearFilters = () => {
    setSelectedCategory("All");
    setSearch("");
  };

  // Promo codes
  const handleApplyPromo = (codeToApply?: string) => {
    const code = (codeToApply ?? promoInput).trim().toUpperCase();
    setPromoError(null);
    if (!code) {
      setPromoError("Enter a promo code.");
      return;
    }
    const matched = VERIFIED_PROMO_CODES[code];
    if (matched) {
      setActivePromo(matched);
      setPromoInput("");
    } else {
      setPromoError("That code isn't valid. Check the spelling and try again.");
    }
  };

  const toggleQuickCode = (code: string) => {
    if (activePromo?.code === code) setActivePromo(null);
    else handleApplyPromo(code);
  };

  // Checkout
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lines.length === 0 || placing) return;

    const cleanPhone = customerPhone.replace(/[\s()-]/g, "");
    const nextErrors: { name?: string; phone?: string } = {};
    if (customerName.trim().length < 2) nextErrors.name = "Enter your full name.";
    if (!NG_PHONE.test(cleanPhone))
      nextErrors.phone = "Enter a Nigerian phone number, like 0803 123 4567.";
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.phone) return;

    setPlacing(true);
    setOrderError(null);
    const code = `PITS-HUB-${Math.floor(10000 + Math.random() * 90000)}`;

    try {
      await createMarketplaceOrder({
        orderCode: code,
        buyerName: customerName.trim(),
        buyerPhone: cleanPhone,
        buyerEmail: user?.email,
        pickupHub: selectedHub,
        items: lines.map((l) => ({
          id: l.product.id,
          title: l.product.title,
          unit: l.product.unit,
          quantity: l.quantity,
          unitPrice: l.product.cooperativePrice,
        })),
        appliedPromo: activePromo?.code,
        discountAmount: discount,
        totalPrice: total,
        userId: user?.id,
      });

      // Snapshot first, because clearing the basket resets the totals
      setPlaced({
        code,
        hub: selectedHub,
        total,
        name: customerName.trim(),
        promo: discount > 0 ? activePromo?.code : undefined,
        itemCount,
      });
      setCart([]);
      closeCart();
    } catch {
      setOrderError(
        "We couldn't place your order. Check your connection and try again. Your basket is still saved."
      );
    } finally {
      setPlacing(false);
    }
  };

  const copyOrderCode = async () => {
    if (!placed) return;
    try {
      await navigator.clipboard.writeText(placed.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard not available
    }
  };

  const inputClass = `w-full rounded-xl border bg-background px-3 py-2.5 text-sm text-foreground ${focusRing}`;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-transparent pb-32 text-foreground">
      {/* Page header */}
      <section className="border-b border-border/40 py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-[#F42D1E]">
                The Rice Test &amp; PITS Food Hub
              </p>
              <h1 className="font-heading mt-2 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                Direct food and commodity hub
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Farm-gate food supplies without middleman hoarding. Use your citizen
                promo code for subsidised prices on locally milled rice, garri and
                other essentials.
              </p>
            </div>
            <Link
              href="/become-partner"
              className={`inline-flex items-center gap-2 self-start rounded-full border border-border px-5 py-3 text-sm font-bold transition-colors hover:bg-muted ${focusRing}`}
            >
              <HeartHandshake className="h-4 w-4 text-[#F42D1E]" />
              <span>Become a producer partner</span>
            </Link>
          </div>

          <ol className="mt-8 grid gap-4 text-sm sm:grid-cols-3">
            {[
              ["Fill your basket", "Pick items at farm-gate prices."],
              ["Reserve with a pickup hub", "Choose the hub nearest to you."],
              ["Pay when you collect", "Show your order ID at the hub."],
            ].map(([title, text], i) => (
              <li key={title} className="flex gap-3">
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[#F4A942] text-xs font-black text-[#1A1A1A]">
                  {i + 1}
                </span>
                <span>
                  <span className="block font-bold">{title}</span>
                  <span className="text-muted-foreground">{text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Promo banner */}
      <div className="bg-[#1A1A1A] px-4 py-4 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-xs md:flex-row md:items-center md:justify-between">
          <p className="text-white/85">
            {activePromo ? (
              <>
                <span className="font-semibold text-[#F4A942]">Promo code applied:</span>{" "}
                <strong className="font-mono">{activePromo.code}</strong>
                {" · "}
                {activePromo.description}
              </>
            ) : (
              "No promo code applied. Tap a code to see subsidised prices."
            )}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-white/60">Quick codes:</span>
            {quickCodes.map((code) => {
              const active = activePromo?.code === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => toggleQuickCode(code)}
                  aria-pressed={active}
                  className={`rounded-full px-3 py-1 font-mono text-[11px] font-bold transition-colors ${focusRing} ${active
                      ? "bg-[#F4A942] text-[#1A1A1A]"
                      : "border border-white/30 text-white hover:bg-white/10"
                    }`}
                >
                  {code}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Catalogue */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mb-8">
          <ServiceCategoryBar
            activeCategory={selectedCategory}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            asLink={false}
          />
        </div>

        {/* Toolbar: search, sort, basket */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search rice, garri, oil..."
              aria-label="Search products"
              className={`${inputClass} border-border pl-10`}
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort products"
            className={`${inputClass} border-border sm:w-52`}
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className={`inline-flex flex-none items-center justify-center gap-2.5 rounded-full bg-[#1A1A1A] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-black ${focusRing}`}
          >
            <ShoppingBag className="h-4 w-4 text-[#F4A942]" />
            <span>Basket</span>
            {itemCount > 0 && (
              <span className="rounded-full bg-[#F42D1E] px-2 py-0.5 text-[11px] font-black">
                {itemCount}
              </span>
            )}
          </button>
        </div>

        {/* Category pills */}
        <div className="mb-6 flex items-center gap-2 overflow-x-auto border-b border-border pb-5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              aria-pressed={selectedCategory === cat}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-colors ${focusRing} ${selectedCategory === cat
                  ? "bg-[#1A1A1A] text-white"
                  : "border border-border bg-card text-muted-foreground hover:border-[#F4A942] hover:text-foreground"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <p className="mb-5 text-sm text-muted-foreground" aria-live="polite">
          {visibleProducts.length}{" "}
          {visibleProducts.length === 1 ? "product" : "products"}
          {filtersActive && (
            <>
              {" · "}
              <button
                type="button"
                onClick={clearFilters}
                className={`font-semibold text-foreground underline ${focusRing}`}
              >
                Clear filters
              </button>
            </>
          )}
        </p>

        {/* Product grid */}
        {visibleProducts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border py-16 text-center">
            <Search className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-3 font-bold">No products found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different word or category.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className={`mt-5 rounded-full bg-[#1A1A1A] px-5 py-2.5 text-sm font-bold text-white ${focusRing}`}
            >
              Show all products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {visibleProducts.map((product) => {
              const price = unitPriceFor(activePromo, product);
              const promoPct = promoPctFor(activePromo, product);
              const saved = Math.max(0, product.openMarketPrice - price);
              const pctBelow =
                product.openMarketPrice > 0
                  ? Math.round((1 - price / product.openMarketPrice) * 100)
                  : 0;
              const inBasket = qtyOf(product.id);

              return (
                <article
                  key={product.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] bg-muted">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-[#1A1A1A]/80 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
                      {product.category}
                    </span>
                    {saved > 0 && (
                      <span className="absolute bottom-3 right-3 rounded-full bg-[#F4A942] px-3 py-1 text-[11px] font-black text-[#1A1A1A] shadow-lg">
                        Save {naira(saved)}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs text-muted-foreground">{product.origin}</p>
                    <h3 className="font-heading mt-1 text-lg font-bold leading-snug">
                      {product.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {product.description}
                    </p>

                    <div className="mt-auto pt-5">
                      <div className="flex items-baseline gap-2">
                        <span className="font-heading text-2xl font-black">
                          {naira(price)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          / {product.unit}
                        </span>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-2 text-xs">
                        <span className="text-muted-foreground line-through">
                          {naira(product.openMarketPrice)}
                        </span>
                        {pctBelow > 0 && (
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                            {pctBelow}% below market
                          </span>
                        )}
                      </div>
                      {promoPct > 0 && activePromo && (
                        <p className="mt-1 text-[11px] text-muted-foreground">
                          Includes code {activePromo.code} (−{promoPct}%)
                        </p>
                      )}

                      <div className="mt-4">
                        {inBasket === 0 ? (
                          <button
                            type="button"
                            onClick={() => addToCart(product)}
                            className={`flex w-full items-center justify-center gap-2 rounded-full bg-[#F42D1E] py-3 text-sm font-bold text-white transition-colors hover:bg-[#D9241A] ${focusRing}`}
                          >
                            <Plus className="h-4 w-4" />
                            <span>Add to basket</span>
                          </button>
                        ) : (
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                              In your basket
                            </span>
                            <QtyStepper
                              value={inBasket}
                              onChange={(q) => setQty(product.id, q)}
                              label={product.title}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating basket bar */}
      {itemCount > 0 && !isCartOpen && (
        <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 px-4">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className={`pointer-events-auto mx-auto flex w-full max-w-md items-center justify-between rounded-full bg-[#1A1A1A] px-5 py-3.5 text-white shadow-2xl ring-1 ring-white/10 ${focusRing}`}
          >
            <span className="flex items-center gap-2 text-sm font-semibold">
              <ShoppingBag className="h-4 w-4 text-[#F4A942]" />
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
            <span className="text-sm font-bold">View basket · {naira(total)}</span>
          </button>
        </div>
      )}

      {toast && (
        <div
          role="status"
          className="pointer-events-none fixed inset-x-0 bottom-24 z-40 flex justify-center px-4"
        >
          <span className="rounded-full bg-[#1A1A1A] px-4 py-2 text-xs font-semibold text-white shadow-lg ring-1 ring-white/10">
            {toast}
          </span>
        </div>
      )}

      {/* Basket and checkout drawer */}
      {isCartOpen && (
        <div
          className="animate-fadeIn fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeCart();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={step === "cart" ? "Your basket" : "Pickup details"}
            className="flex h-full w-full max-w-md flex-col bg-card shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              {step === "details" ? (
                <button
                  type="button"
                  onClick={() => setStep("cart")}
                  className={`flex items-center gap-2 text-sm font-bold ${focusRing}`}
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to basket</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-[#F42D1E]" />
                  <h2 className="font-heading text-lg font-black">Your basket</h2>
                </div>
              )}
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close basket"
                autoFocus
                className={`rounded-full p-2 text-muted-foreground hover:bg-muted ${focusRing}`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {lines.length === 0 ? (
                <div className="py-16 text-center">
                  <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-3 font-bold">Your basket is empty</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Add items from the catalogue to see your subsidised prices.
                  </p>
                  <button
                    type="button"
                    onClick={closeCart}
                    className={`mt-5 rounded-full bg-[#1A1A1A] px-5 py-2.5 text-sm font-bold text-white ${focusRing}`}
                  >
                    Keep shopping
                  </button>
                </div>
              ) : step === "cart" ? (
                <>
                  <ul className="space-y-3">
                    {lines.map((line) => (
                      <li
                        key={line.product.id}
                        className="flex gap-3 rounded-2xl border border-border p-3"
                      >
                        <div className="relative h-16 w-16 flex-none overflow-hidden rounded-xl bg-muted">
                          <Image
                            src={line.product.imageUrl}
                            alt=""
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <h3 className="truncate text-sm font-bold">
                                {line.product.title}
                              </h3>
                              <p className="text-xs text-muted-foreground">
                                {naira(line.unitPrice)} / {line.product.unit}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setQty(line.product.id, 0)}
                              aria-label={`Remove ${line.product.title}`}
                              className={`rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-red-500 ${focusRing}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <QtyStepper
                              value={line.quantity}
                              onChange={(q) => setQty(line.product.id, q)}
                              label={line.product.title}
                            />
                            <span className="text-sm font-black tabular-nums">
                              {naira(line.lineTotal)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Promo code */}
                  <div className="mt-5 border-t border-border pt-4">
                    <label htmlFor="promo" className="block text-sm font-bold">
                      Promo code
                    </label>
                    <div className="mt-2 flex gap-2">
                      <input
                        id="promo"
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleApplyPromo();
                          }
                        }}
                        placeholder="e.g. PITS2027"
                        className={`${inputClass} border-border font-mono uppercase`}
                      />
                      <button
                        type="button"
                        onClick={() => handleApplyPromo()}
                        className={`rounded-xl bg-[#1A1A1A] px-4 text-sm font-bold text-white hover:bg-black ${focusRing}`}
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <p role="alert" className="mt-2 text-xs font-medium text-red-500">
                        {promoError}
                      </p>
                    )}
                    {activePromo && (
                      <div className="mt-2 flex items-center justify-between rounded-lg bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                        <span>
                          {activePromo.code}: {activePromo.discountPercentage}% off
                          {activePromo.applicableCategory
                            ? ` ${activePromo.applicableCategory} only`
                            : ""}
                        </span>
                        <button
                          type="button"
                          onClick={() => setActivePromo(null)}
                          className={`font-semibold underline ${focusRing}`}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                    {promoNotUsed && activePromo && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        {activePromo.code} doesn&apos;t apply to anything in your basket
                        yet.
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <form id="checkout-form" onSubmit={handleCheckout} noValidate className="space-y-4">
                  <div>
                    <label htmlFor="hub" className="block text-sm font-bold">
                      Pickup hub
                    </label>
                    <select
                      id="hub"
                      value={selectedHub}
                      onChange={(e) => setSelectedHub(e.target.value)}
                      className={`${inputClass} mt-1.5 border-border`}
                    >
                      {hubs.map((h) => (
                        <option key={h} value={h}>
                          {h}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-sm font-bold">
                      Full name
                    </label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={`${inputClass} mt-1.5 ${errors.name ? "border-red-500" : "border-border"}`}
                    />
                    {errors.name && (
                      <p id="name-error" role="alert" className="mt-1 text-xs text-red-500">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold">
                      Phone number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="0803 123 4567"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : "phone-help"}
                      className={`${inputClass} mt-1.5 ${errors.phone ? "border-red-500" : "border-border"}`}
                    />
                    {errors.phone ? (
                      <p id="phone-error" role="alert" className="mt-1 text-xs text-red-500">
                        {errors.phone}
                      </p>
                    ) : (
                      <p id="phone-help" className="mt-1 text-xs text-muted-foreground">
                        Use a number the hub can reach.
                      </p>
                    )}
                  </div>

                  <div className="rounded-2xl border border-border p-4 text-sm">
                    <p className="font-bold">
                      {itemCount} {itemCount === 1 ? "item" : "items"} to collect
                    </p>
                    <ul className="mt-2 space-y-1 text-muted-foreground">
                      {lines.map((l) => (
                        <li key={l.product.id} className="flex justify-between gap-3">
                          <span className="truncate">
                            {l.quantity} × {l.product.title}
                          </span>
                          <span className="tabular-nums">{naira(l.lineTotal)}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-xs text-muted-foreground">
                      You pay at the hub when you collect your order.
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Footer */}
            {lines.length > 0 && (
              <div className="space-y-3 border-t border-border px-5 py-4">
                <dl className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <dt>Cooperative price</dt>
                    <dd className="tabular-nums">{naira(baseTotal)}</dd>
                  </div>
                  {discount > 0 && activePromo && (
                    <div className="flex justify-between font-semibold text-emerald-600 dark:text-emerald-400">
                      <dt>Promo code {activePromo.code}</dt>
                      <dd className="tabular-nums">−{naira(discount)}</dd>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-border pt-2 text-base font-black">
                    <dt>Total to pay at hub</dt>
                    <dd className="tabular-nums">{naira(total)}</dd>
                  </div>
                </dl>

                {savings > 0 && (
                  <p className="rounded-lg bg-emerald-500/10 px-3 py-2 text-center text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    You save {naira(savings)} compared with open-market prices
                  </p>
                )}

                {orderError && (
                  <p role="alert" className="text-xs font-medium text-red-500">
                    {orderError}
                  </p>
                )}

                {step === "cart" ? (
                  <button
                    type="button"
                    onClick={() => setStep("details")}
                    className={`w-full rounded-full bg-[#F42D1E] py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#D9241A] ${focusRing}`}
                  >
                    Continue to pickup details
                  </button>
                ) : (
                  <button
                    type="submit"
                    form="checkout-form"
                    disabled={placing}
                    className={`flex w-full items-center justify-center gap-2 rounded-full bg-[#F42D1E] py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#D9241A] disabled:opacity-60 ${focusRing}`}
                  >
                    {placing && <Loader2 className="h-4 w-4 animate-spin" />}
                    <span>{placing ? "Placing your order..." : "Reserve my order"}</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Order confirmation */}
      {placed && (
        <div className="animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Order confirmed"
            className="w-full max-w-md space-y-6 rounded-3xl border border-border bg-card p-6 text-center shadow-2xl sm:p-8"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div>
              <h2 className="font-heading text-xl font-black sm:text-2xl">
                Order reserved
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Thank you, <strong>{placed.name}</strong>. Your {placed.itemCount}{" "}
                {placed.itemCount === 1 ? "item is" : "items are"} reserved
                {placed.promo ? (
                  <>
                    {" "}
                    with code <strong>{placed.promo}</strong>
                  </>
                ) : null}
                . Show the order ID below at the hub.
              </p>
            </div>

            <dl className="space-y-3 rounded-2xl border-2 border-dashed border-border bg-muted/40 p-5 text-left text-sm">
              <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
                <dt className="text-muted-foreground">Order ID</dt>
                <dd className="flex items-center gap-2 font-mono font-bold">
                  {placed.code}
                  <button
                    type="button"
                    onClick={copyOrderCode}
                    aria-label="Copy order ID"
                    className={`rounded-full p-1.5 hover:bg-muted ${focusRing}`}
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Pickup hub</dt>
                <dd className="text-right font-semibold">{placed.hub}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Pay at the hub</dt>
                <dd className="font-black">{naira(placed.total)}</dd>
              </div>
            </dl>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => setPlaced(null)}
                className={`w-full rounded-full bg-[#1A1A1A] py-3 text-sm font-bold text-white hover:bg-black ${focusRing}`}
              >
                Back to the food hub
              </button>
              {user && (
                <Link
                  href="/portal"
                  className={`text-sm font-semibold text-[#F42D1E] hover:underline ${focusRing}`}
                >
                  View in member portal
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}