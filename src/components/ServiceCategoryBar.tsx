"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  UtensilsCrossed,
  Smartphone,
  Zap,
  Car,
  Plane,
  ChevronRight,
} from "lucide-react";
import { QUICK_SERVICE_CATEGORIES, QuickServiceCategory } from "@/content/services";

const ICON_MAP = {
  ShoppingBag,
  UtensilsCrossed,
  Smartphone,
  Zap,
  Car,
  Plane,
};

interface ServiceCategoryBarProps {
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
  asLink?: boolean;
}

export function ServiceCategoryBar({
  activeCategory,
  onSelectCategory,
  asLink = true,
}: ServiceCategoryBarProps) {
  return (
    <div className="w-full">
      {/* Scrollable Horizontal Ribbon Container */}
      <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-3 pt-1 no-scrollbar scroll-smooth">
        {QUICK_SERVICE_CATEGORIES.map((item) => {
          const Icon = ICON_MAP[item.iconName];
          const isSelected = activeCategory === item.categoryFilter;

          const content = (
            <div
              className={`group relative flex-shrink-0 w-36 sm:w-44 md:w-48 aspect-[4/3] rounded-2xl overflow-hidden border transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 cursor-pointer select-none ${
                isSelected
                  ? "border-[#E85D04] ring-2 ring-[#E85D04]/30"
                  : "border-border/60 hover:border-[#E85D04]/60"
              }`}
            >
              {/* Background Photo */}
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 150px, 200px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-[0.82]"
              />

              {/* Cinematic Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

              {/* Center Frosted Circular Icon Container */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-md ${
                    isSelected
                      ? "bg-[#E85D04] text-white"
                      : "bg-black/45 text-white/90 group-hover:bg-[#E85D04] group-hover:text-white border border-white/20"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              {/* Bottom Bold Text Caption */}
              <div className="absolute bottom-2.5 left-2 right-2 text-center">
                <span className="font-heading font-black text-xs sm:text-[13px] text-white leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] line-clamp-1 block">
                  {item.name}
                </span>
              </div>
            </div>
          );

          if (asLink) {
            return (
              <Link
                key={item.id}
                href={`/marketplace?category=${encodeURIComponent(item.categoryFilter)}`}
              >
                {content}
              </Link>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectCategory && onSelectCategory(item.categoryFilter)}
              className="text-left"
            >
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
}
