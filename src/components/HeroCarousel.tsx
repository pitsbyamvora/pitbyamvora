"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { HERO_SLIDES } from "@/content/campaign";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";
import gsap from "gsap";

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const sideCardRef = useRef<HTMLDivElement>(null);

  // Auto-advance slides every 3 seconds unless user pauses/hovers
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // GSAP animation triggered upon slide change
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background Image smooth scale & reveal
      if (bgImageRef.current) {
        gsap.fromTo(
          bgImageRef.current,
          { scale: 1.05, opacity: 0.8 },
          { scale: 1, opacity: 1, duration: 1.1, ease: "power2.out" }
        );
      }

      // Animate text elements with stagger
      const textElements = textContentRef.current?.querySelectorAll(".gsap-text");
      if (textElements && textElements.length > 0) {
        gsap.fromTo(
          textElements,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.07,
            ease: "power3.out",
          }
        );
      }

      // Animate side card
      if (sideCardRef.current) {
        gsap.fromTo(
          sideCardRef.current,
          { opacity: 0, x: 20, scale: 0.97 },
          { opacity: 1, x: 0, scale: 1, duration: 0.7, ease: "power2.out", delay: 0.1 }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [currentSlide]);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none min-h-[460px] lg:min-h-[520px] flex items-center border-b border-white/10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* 1. Full-Bleed Background Image (High Visibility with Lighter Backdrop) */}
      <div ref={bgImageRef} className="absolute inset-0 w-full h-full pointer-events-none">
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-105"
        />

        {/* Lightweight translucent overlay so the photo is clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171A19]/80 via-transparent to-black/35" />
      </div>

      {/* 2. Compact Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* Left: Text & Action Controls */}
          <div ref={textContentRef} className="lg:col-span-7 space-y-3 sm:space-y-4">
            
            {/* Top Pill Badge */}
            <div className="gsap-text inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/25 text-[10px] sm:text-[11px] font-bold tracking-wider text-[#ff5500] uppercase shadow-md">
              <Sparkles className="w-3 h-3 text-[#ff5500] animate-pulse" />
              <span>{slide.badge}</span>
            </div>

            {/* Main Title with Sharp Drop Shadow for Crisp Legibility */}
            <h1 className="gsap-text font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.15] drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
              {slide.title} <br className="hidden sm:inline" />
              <span className="text-[#ff5500] drop-shadow-[0_2px_15px_rgba(255,85,0,0.5)]">
                {slide.highlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="gsap-text font-body text-xs sm:text-sm md:text-base text-white/95 leading-relaxed font-medium max-w-2xl drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
              {slide.subtitle}
            </p>

            {/* Philosophy Quote in Sleek Frosted Box */}
            {slide.quote && (
              <div className="gsap-text p-3 sm:p-3.5 rounded-xl bg-black/50 backdrop-blur-md border-l-4 border-[#ff5500] border-t border-r border-b border-white/15 max-w-xl shadow-lg">
                <p className="font-heading text-xs sm:text-sm font-semibold text-white italic drop-shadow-sm">
                  {slide.quote}
                </p>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#ff5500] uppercase tracking-wider mt-1.5">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{slide.tagline}</span>
                </div>
              </div>
            )}

            {/* Responsive Call-to-Action Buttons */}
            <div className="gsap-text pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <Link
                href={slide.primaryCtaLink}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold rounded-full bg-[#ff5500] hover:bg-[#e04b00] text-white transition-all duration-200 shadow-[0_4px_20px_rgba(255,85,0,0.4)] hover:scale-[1.02] active:scale-[0.98] text-center"
              >
                <span>{slide.primaryCtaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href={slide.secondaryCtaLink}
                className="inline-flex items-center justify-center px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/25 text-white transition-all text-center hover:border-white/40"
              >
                {slide.secondaryCtaText}
              </Link>
            </div>
          </div>

          {/* Right: Compact Frosted Scorecard */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              ref={sideCardRef}
              className="w-full max-w-sm bg-black/50 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.7)] text-white space-y-3.5"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white p-0.5 border border-[#ff5500]">
                    <Image src="/logo.jpg" alt="Logo" width={30} height={30} className="object-contain" />
                  </div>
                  <div>
                    <h4 className="font-heading font-black text-[11px] text-white uppercase tracking-wider">
                      60-Day Proof Ledger
                    </h4>
                    <p className="text-[9px] text-white/70">
                      Standard of Evidence
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-mono font-black text-[#ff5500] px-2 py-0.5 rounded-full bg-[#ff5500]/15 border border-[#ff5500]/30">
                  0{currentSlide + 1} / 04
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2 text-white/95">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-white block font-heading text-[11px]">Empirical Field Pilots</strong>
                    <span className="text-[10px] text-white/80">
                      Direct rice hub, mobility corridor subsidies, verifiable data mesh.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-white/95">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-white block font-heading text-[11px]">Zero Campaign Gimmicks</strong>
                    <span className="text-[10px] text-white/80">
                      Every pilot operates with an open public scorecard.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px]">
                <span className="text-white/70">Status: <strong className="text-emerald-400">Active Proof Window</strong></span>
                <Link
                  href="/campaigns/60-day-proof-of-work"
                  className="text-[#ff5500] font-bold hover:underline flex items-center gap-1"
                >
                  <span>Explore Tests</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Compact Bottom Carousel Controls */}
        <div className="pt-5 sm:pt-6 flex items-center justify-between border-t border-white/15 mt-5 sm:mt-6">
          {/* Progress Indicator Dots */}
          <div className="flex items-center gap-1.5">
            {HERO_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 rounded-full h-2 ${
                  idx === currentSlide
                    ? "w-7 sm:w-10 bg-[#ff5500] shadow-[0_0_10px_rgba(255,85,0,0.6)]"
                    : "w-2 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
            <span className="text-[10px] font-mono text-white/80 ml-2">
              0{currentSlide + 1} / 0{HERO_SLIDES.length}
            </span>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() =>
                setCurrentSlide((prev) =>
                  prev === 0 ? HERO_SLIDES.length - 1 : prev - 1
                )
              }
              className="p-2 rounded-full border border-white/20 bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-all active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
              }
              className="p-2 rounded-full border border-white/20 bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-all active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
