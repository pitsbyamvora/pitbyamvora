import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ArrowRight, Tag, Sparkles } from "lucide-react";
import { ServiceCategoryBar } from "@/components/ServiceCategoryBar";

export function HomeMarketplaceSection() {
  return (
    <section className="py-16 sm:py-24 bg-card/50 border-b border-border relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E85D04]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 sm:space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/20 text-xs font-bold uppercase tracking-widest text-[#E85D04]">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Marketplace</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight">
              Essential Commodities &amp; Services <br className="hidden sm:inline" />
              <span className="text-[#E85D04]">At True Direct Prices</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Shop food staples, order fresh meals, buy airtime &amp; data, pay electricity bills, and book transportation with verified member discounts.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E85D04] text-white hover:bg-[#d44f00] text-xs font-bold transition-all shadow-md"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Category Portals Ribbon: Shop Essentials, Order Meals, Airtime, Electricity, etc. */}
        <div className="pt-2">
          <ServiceCategoryBar asLink={true} />
        </div>

        {/* Promo Code Flash Voucher Banner */}
        <div className="rounded-xl sm:rounded-2xl border border-dashed border-[#E85D04]/40 bg-[#E85D04]/5 p-5 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#E85D04]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Member Discounts</span>
            </div>
            <h4 className="text-base sm:text-2xl font-black text-foreground">
              Have a member promo code? Enjoy up to 50% discount!
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Sign up free, get your phone-bound promo code, and apply at checkout.
            </p>
          </div>

          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-[#E85D04] text-white hover:bg-[#d44f00] font-bold text-xs sm:text-sm transition-all shadow-md shrink-0 w-full sm:w-auto justify-center"
          >
            <span>Open Marketplace</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
