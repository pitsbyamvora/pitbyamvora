"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Camera, X, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { fetchGalleryPhotos, GalleryPhoto } from "@/lib/db";

export function HomeGallerySection() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  useEffect(() => {
    fetchGalleryPhotos().then((data) => {
      if (data && data.length > 0) setPhotos(data);
    });
  }, []);

  const handlePrev = () => {
    if (activePhoto === null || photos.length === 0) return;
    setActivePhoto((activePhoto - 1 + photos.length) % photos.length);
  };

  const handleNext = () => {
    if (activePhoto === null || photos.length === 0) return;
    setActivePhoto((activePhoto + 1) % photos.length);
  };

  return (
    <section className="py-16 sm:py-24 bg-card border-b border-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/20 text-xs font-bold uppercase tracking-widest text-[#E85D04]">
              <Camera className="w-3.5 h-3.5" />
              <span>Gallery</span>
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

        {/* Gallery Grid — 2x2 on Mobile, 3 cols on Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
          {photos.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(idx)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 border border-border cursor-pointer hover:border-[#E85D04]/60 hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Category pill */}
              <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3">
                <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold tracking-wider uppercase border border-white/10">
                  {item.category}
                </span>
              </div>

              {/* View Overlay Icon */}
              <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/50 backdrop-blur-md text-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>

              {/* Title & Location Footer */}
              <div className="absolute bottom-0 inset-x-0 p-3 sm:p-5 text-white space-y-0.5 sm:space-y-1">
                <p className="text-[10px] sm:text-xs font-semibold text-[#E85D04] tracking-wide truncate">
                  {item.location}
                </p>
                <h3 className="font-heading font-black text-xs sm:text-base leading-tight truncate">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto !== null && photos[activePhoto] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <button
            onClick={() => setActivePhoto(null)}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close photo preview"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors hidden sm:flex items-center justify-center"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors hidden sm:flex items-center justify-center"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col rounded-3xl overflow-hidden bg-neutral-950 border border-white/10 shadow-2xl">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black">
              <Image
                src={photos[activePhoto].imageUrl}
                alt={photos[activePhoto].title}
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="p-5 sm:p-6 bg-neutral-900 border-t border-white/10 text-white space-y-2">
              <div className="flex items-center justify-between gap-4">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#E85D04]/20 text-[#E85D04] border border-[#E85D04]/30">
                  {photos[activePhoto].category}
                </span>
                <span className="text-xs text-white/50 font-mono">
                  {activePhoto + 1} of {photos.length}
                </span>
              </div>
              <h3 className="font-heading font-black text-lg sm:text-xl text-white">
                {photos[activePhoto].title}
              </h3>
              <p className="text-xs sm:text-sm text-[#E85D04] font-semibold">
                {photos[activePhoto].location}
              </p>
              {photos[activePhoto].description && (
                <p className="text-xs text-white/70 leading-relaxed pt-1">
                  {photos[activePhoto].description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
