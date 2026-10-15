"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { BRAND_INFO, HERO_SLIDES } from "@/content/campaign";

/*
  Amvora Light brand colours (sampled from the logo, confirm exact hex with the designer)
  ink    #1A1A1A   logo black, used for overlays
  flame  #F42D1E   logo red, used for the main button and the final phase
  amber  #F4A942   logo gold, used for rules, progress and small accents
*/

const SLIDE_MS = 7000; // time each slide stays on screen
const TOTAL = HERO_SLIDES.length;

// "Days 8–20" -> 13, so each phase is drawn in proportion to its length
function phaseLength(duration: string) {
  const m = duration.match(/(\d+)\D+(\d+)/);
  return m ? Number(m[2]) - Number(m[1]) + 1 : 1;
}

const PHASES = BRAND_INFO.executionPhases.map((p) => ({
  ...p,
  days: phaseLength(p.duration),
}));

const pad = (n: number) => String(n).padStart(2, "0");

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const paused = hovering || userPaused;

  const slide = HERO_SLIDES[current];
  const next = () => setCurrent((c) => (c + 1) % TOTAL);
  const prev = () => setCurrent((c) => (c - 1 + TOTAL) % TOTAL);

  const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4A942]";

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Campaign highlights"
      className="relative isolate flex min-h-[640px] w-full flex-col overflow-hidden bg-[#1A1A1A] text-white lg:min-h-[720px]"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
      onTouchStart={() => setHovering(true)}
      onTouchEnd={() => setHovering(false)}
    >
      <style>{`
        @keyframes pits-progress { from { width: 0% } to { width: 100% } }
        @keyframes pits-rise {
          from { opacity: 0; transform: translateY(16px) }
          to { opacity: 1; transform: none }
        }
        .pits-progress { animation-name: pits-progress; animation-timing-function: linear; animation-fill-mode: forwards; }
        .pits-rise > * { animation: pits-rise .7s cubic-bezier(.2,.7,.2,1) both; }
        .pits-rise > *:nth-child(2) { animation-delay: .08s }
        .pits-rise > *:nth-child(3) { animation-delay: .16s }
        .pits-rise > *:nth-child(4) { animation-delay: .24s }
        @media (prefers-reduced-motion: reduce) {
          .pits-rise > * { animation: none }
          .pits-progress { animation: none; width: 0% }
        }
      `}</style>

      {/* Photos: all slides stacked, cross-fading */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {HERO_SLIDES.map((s, i) => (
          <Image
            key={s.id}
            src={s.image}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover object-center transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"
              }`}
          />
        ))}
        {/* Keeps the text readable on any photo: even tint on mobile, left-to-right fade on desktop */}
        <div className="absolute inset-0 bg-[#1A1A1A]/70 lg:bg-transparent lg:bg-gradient-to-r lg:from-[#1A1A1A]/95 lg:via-[#1A1A1A]/65 lg:to-[#1A1A1A]/10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#1A1A1A]/80 to-transparent" />
      </div>

      {/* Message */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 items-center px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div
          key={slide.id}
          className="pits-rise max-w-3xl"
          aria-live={paused ? "polite" : "off"}
        >
          <h1 className="font-heading leading-[1.03] tracking-tight [text-wrap:balance]">
            <span className="block text-3xl font-light text-white/80 sm:text-5xl lg:text-6xl">
              {slide.title}
            </span>
            <span className="mt-2 block text-4xl font-black text-white sm:text-6xl lg:text-[5.25rem]">
              {slide.highlight}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 lg:text-lg">
            {slide.subtitle}
          </p>

          {slide.quote && (
            <blockquote className="mt-6 hidden max-w-lg border-l-2 border-[#F4A942] pl-4 text-sm italic leading-relaxed text-white/70 sm:block">
              {slide.quote}
            </blockquote>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href={slide.primaryCtaLink}
              className={`inline-flex items-center justify-center rounded-full bg-[#F42D1E] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#F42D1E]/30 transition-colors hover:bg-[#D9241A] ${focusRing}`}
            >
              {slide.primaryCtaText}
            </Link>
            <Link
              href={slide.secondaryCtaLink}
              className={`inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 ${focusRing}`}
            >
              {slide.secondaryCtaText}
            </Link>
          </div>
        </div>
      </div>

      {/* Dock: slide controls on the left, the 60-day plan on the right */}
      <div className="border-t border-white/10 bg-[#1A1A1A]/60 backdrop-blur-md">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[320px_1fr] lg:gap-12 lg:px-8">
          {/* Slide controls */}
          <div>
            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                aria-label="Previous slide"
                className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white hover:text-[#1A1A1A] ${focusRing}`}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={next}
                aria-label="Next slide"
                className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white hover:text-[#1A1A1A] ${focusRing}`}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => setUserPaused((p) => !p)}
                aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
                className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white hover:text-[#1A1A1A] ${focusRing}`}
              >
                {userPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </button>
              <span className="font-heading text-sm tabular-nums text-white">
                {pad(current + 1)}
                <span className="text-white/40"> / {pad(TOTAL)}</span>
              </span>
              {/* Time until next slide. Its animation ending is what advances the slide. */}
              <div className="relative h-0.5 flex-1 overflow-hidden bg-white/20">
                <span
                  key={slide.id}
                  onAnimationEnd={next}
                  className="pits-progress absolute inset-y-0 left-0 bg-[#F4A942]"
                  style={{
                    animationDuration: `${SLIDE_MS}ms`,
                    animationPlayState: paused ? "paused" : "running",
                  }}
                />
              </div>
            </div>
            <p className="mt-3 line-clamp-2 text-xs leading-snug text-white/60">
              {slide.badge}
            </p>
          </div>

          {/* The 60-day plan, each phase drawn in proportion to its length */}
          <div>
            <p className="mb-2 text-xs font-semibold text-white/80">
              {BRAND_INFO.coreArchitecture}
            </p>
            <ol className="flex gap-1.5" aria-label="The 60-day plan">
              {PHASES.map((p, i) => (
                <li
                  key={p.phase}
                  title={`${p.phase}: ${p.duration}. ${p.focus}`}
                  className="min-w-0 sm:min-w-[4.5rem]"
                  style={{ flex: `${p.days} 1 0%` }}
                >
                  <span
                    className={`block h-1 rounded-full ${i === PHASES.length - 1 ? "bg-[#F42D1E]" : "bg-[#F4A942]"
                      }`}
                  />
                  <span className="sr-only sm:not-sr-only sm:mt-2 sm:block sm:truncate sm:text-xs sm:font-semibold sm:text-white">
                    {p.phase}
                  </span>
                  <span className="sr-only sm:not-sr-only sm:block sm:truncate sm:text-[11px] sm:text-white/55">
                    {p.duration}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}