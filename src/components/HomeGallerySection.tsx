"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, X, ChevronLeft, ChevronRight, Eye } from "lucide-react";

export interface GalleryItem {
  id: string;
  title: string;
  location: string;
  category: string;
  image: string;
  description: string;
}

export const HOME_GALLERY: GalleryItem[] = [
  {
    id: "g1",
    title: "Grassroots Ward Dialogue",
    location: "Alimosho, Lagos",
    category: "Community Meeting",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    description: "Local residents gathering to discuss food security cooperatives and clean neighborhood drainage interventions.",
  },
  {
    id: "g2",
    title: "Youth Tech & Data Training",
    location: "Ikeja Hub, Lagos",
    category: "Skills & Education",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    description: "Young volunteer monitors learning real-time mobile ledger recording and community issue mapping.",
  },
  {
    id: "g3",
    title: "Direct Rice Harvest Logistics",
    location: "Argungu Rice Paddies, Kebbi",
    category: "Agriculture & Food",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
    description: "Tracking harvest bags from paddy to milling to ensure zero middleman markup before reaching community hubs.",
  },
  {
    id: "g4",
    title: "Market Traders Engagement",
    location: "Bodija Market, Ibadan",
    category: "Market Co-ops",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    description: "Women cooperative leaders uniting to bulk-order food items at wholesale farm-gate prices.",
  },
  {
    id: "g5",
    title: "Community Problem-Solving Teams",
    location: "Surulere, Lagos",
    category: "Civic Action",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80",
    description: "Volunteer teams inspecting municipal water access points and street lighting challenges.",
  },
  {
    id: "g6",
    title: "Lagos Street Mobilization",
    location: "Ojuelegba Corridor, Lagos",
    category: "Field Action",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    description: "Foot soldiers connecting bus commuters to verifiable discounted transit subsidies.",
  },
];

export function HomeGallerySection() {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  const handlePrev = () => {
    if (activePhoto === null) return;
    setActivePhoto((activePhoto - 1 + HOME_GALLERY.length) % HOME_GALLERY.length);
  };

  const handleNext = () => {
    if (activePhoto === null) return;
    setActivePhoto((activePhoto + 1) % HOME_GALLERY.length);
  };

  return (
    <section className="py-16 sm:py-24 bg-card border-b border-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/20 text-xs font-bold uppercase tracking-widest text-[#E85D04]">
              <Camera className="w-3.5 h-3.5" />
              <span>Ground Proof In Pictures</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight">
              Power in the Street <br className="hidden sm:inline" />
              <span className="text-[#E85D04]">Live Field Gallery</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Real moments from the communities, markets, agricultural fields, and student innovation hubs across Nigeria.
            </p>
          </div>
        </div>

        {/* Bento Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {HOME_GALLERY.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(idx)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 border border-border cursor-pointer hover:border-[#E85D04]/60 hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Tag */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase border border-white/10">
                  {item.category}
                </span>
              </div>

              {/* Hover Eye Icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4" />
              </div>

              {/* Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <h4 className="font-heading font-black text-base sm:text-lg leading-tight group-hover:text-[#E85D04] transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-white/80 line-clamp-2">
                  {item.location} • {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setActivePhoto(null)}
        >
          {/* Close */}
          <button
            type="button"
            onClick={() => setActivePhoto(null)}
            className="absolute top-5 right-5 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors"
            aria-label="Close photo"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Photo Container */}
          <div
            className="relative max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9]">
              <Image
                src={HOME_GALLERY[activePhoto].image}
                alt={HOME_GALLERY[activePhoto].title}
                fill
                className="object-contain sm:object-cover"
              />
            </div>
            <div className="p-5 bg-neutral-950 text-white space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E85D04]">
                {HOME_GALLERY[activePhoto].category} • {HOME_GALLERY[activePhoto].location}
              </span>
              <h3 className="font-heading font-black text-xl">
                {HOME_GALLERY[activePhoto].title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300">
                {HOME_GALLERY[activePhoto].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
