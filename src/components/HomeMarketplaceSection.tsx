import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ArrowRight, Tag, Truck, Sparkles } from "lucide-react";
import { ServiceCategoryBar } from "@/components/ServiceCategoryBar";
import { MARKETPLACE_PRODUCTS, VERIFIED_PROMO_CODES } from "@/content/marketplace";

export function HomeMarketplaceSection() {
  const featuredProducts = MARKETPLACE_PRODUCTS.slice(0, 4);

  return (
    <section className="py-16 sm:py-24 bg-card/50 border-b border-border relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E85D04]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/20 text-xs font-bold uppercase tracking-widest text-[#E85D04]">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Direct Farm-Gate Marketplace</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight">
              Essential Food Staples <br className="hidden sm:inline" />
              <span className="text-[#E85D04]">At True Cooperative Prices</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              We eliminate cartel markups by connecting families directly to farmers, local millers, and bulk producers. Use civic promo codes to unlock additional citizen discounts.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-500/10 px-3.5 py-2 rounded-lg border border-emerald-500/20">
              <Tag className="w-4 h-4" />
              <span>Save 35% - 50% With Vouchers</span>
            </div>
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E85D04] text-white hover:bg-[#d44f00] text-xs font-bold transition-all shadow-md"
            >
              <span>Visit Full Marketplace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Quick Service Categories Bar (From Design Reference) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
              Direct Service &amp; Commodity Portals
            </span>
            <Link
              href="/marketplace"
              className="text-xs font-bold text-[#E85D04] hover:underline"
            >
              See all categories →
            </Link>
          </div>
          <ServiceCategoryBar asLink={true} />
        </div>

        {/* E-Commerce Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => {
            const savings = product.openMarketPrice - product.cooperativePrice;
            const savingsPct = Math.round((savings / product.openMarketPrice) * 100);

            return (
              <div
                key={product.id}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-card overflow-hidden hover:border-[#E85D04]/60 hover:shadow-xl transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    <span className="px-2 py-0.5 rounded-md bg-[#E85D04] text-white text-[10px] font-black uppercase tracking-wider shadow">
                      {savingsPct}% OFF
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white text-[10px] font-semibold">
                      {product.unit}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                      {product.category}
                    </span>
                    <h3 className="font-heading font-black text-sm sm:text-base text-foreground leading-snug line-clamp-2 group-hover:text-[#E85D04] transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1 pt-0.5">
                      <Truck className="w-3 h-3 text-[#E85D04]" />
                      <span className="truncate">{product.origin}</span>
                    </p>
                  </div>

                  {/* Price Comparison */}
                  <div className="pt-3 border-t border-border/60 space-y-2">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] text-muted-foreground block line-through">
                          Open Cartel: ₦{product.openMarketPrice.toLocaleString()}
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-lg sm:text-xl font-black text-foreground">
                            ₦{product.cooperativePrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
                        Save ₦{savings.toLocaleString()}
                      </span>
                    </div>

                    <Link
                      href={`/marketplace#${product.id}`}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-foreground text-background hover:bg-[#E85D04] hover:text-white text-xs font-bold transition-all shadow-sm group-hover:shadow"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Order with Promo Code</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Promo Code Flash Voucher Banner */}
        <div className="rounded-2xl border border-dashed border-[#E85D04]/40 bg-[#E85D04]/5 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#E85D04]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Active Citizen Solidarity Vouchers</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-foreground">
              Have a community promo code? Get up to 50% extra off!
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Use verified promo codes like <strong className="text-foreground">PITS2027</strong> or <strong className="text-foreground">RICETEST</strong> at checkout.
            </p>
          </div>

          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E85D04] text-white hover:bg-[#d44f00] font-bold text-xs sm:text-sm transition-all shadow-md shrink-0"
          >
            <span>Claim Discount in Marketplace</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
