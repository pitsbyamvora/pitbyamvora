"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Home,
  Info,
  Layers,
  Mic,
  AlertCircle,
  FileText,
  ChevronDown,
  Globe,
  Heart,
  Menu,
  X,
  MapPin,
  ShoppingBag,
  Newspaper,
  Timer,
  Flame,
  User as UserIcon,
  ShieldAlert,
} from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("EN");
  const { user } = useAuth();
  const pathname = usePathname();

  const moreDropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        moreDropdownRef.current &&
        !moreDropdownRef.current.contains(event.target as Node)
      ) {
        setMoreDropdownOpen(false);
      }
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "About", href: "/about", icon: Info },
    { label: "Programs", href: "/programs", icon: Layers },
    { label: "People's Voice", href: "/movement", icon: Mic },
    { label: "Issues Hub", href: "/issues", icon: AlertCircle },
    { label: "Petitions", href: "/petitions", icon: FileText },
  ];

  const moreLinks = [
    { label: "60-Day Challenge", href: "/campaigns/60-day-proof-of-work", icon: Timer },
    { label: "Movement & Charter", href: "/movement", icon: Flame },
    { label: "Community Marketplace", href: "/marketplace", icon: ShoppingBag },
    { label: "Movement Newsroom", href: "/newsroom", icon: Newspaper },
    { label: "Report a Community Issue", href: "/report", icon: MapPin },
    {
      label: user ? `Portal (${user.fullName.split(" ")[0]})` : "Citizen Member Login",
      href: user ? "/portal" : "/login",
      icon: UserIcon,
    },
    {
      label: "Admin Command Center",
      href: "/admin-dashboard",
      icon: ShieldAlert,
    },
  ];

  const languages = [
    { code: "EN", name: "English" },
    { code: "PG", name: "Pidgin" },
    { code: "YO", name: "Yorùbá" },
    { code: "HA", name: "Hausa" },
    { code: "IG", name: "Igbo" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#171A19] text-white border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* 1. Left: Brand Logo & Typography */}
          <Link href="/" className="flex items-center gap-3 group select-none flex-shrink-0">
            <div className="relative w-11 h-11 rounded-full overflow-hidden bg-white p-1 border-2 border-white/20 shadow-md group-hover:scale-105 transition-transform">
              <Image
                src="/logo.jpg"
                alt="AMVORALIGHT Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg font-black tracking-tight text-white group-hover:text-[#ff5500] transition-colors leading-none uppercase">
                AMVORALIGHT
              </span>
              <span className="text-[11px] font-medium text-white/70 tracking-wide mt-1">
                Power In The Street
              </span>
            </div>
          </Link>

          {/* 2. Center: Rounded Floating Pill Navigation Bar (Exact Image Design) */}
          <nav className="hidden lg:flex items-center bg-[#292D2B]/90 backdrop-blur-md border border-white/15 rounded-full p-1.5 shadow-inner">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 select-none ${
                    isActive
                      ? "bg-white text-[#171A19] font-bold shadow-md"
                      : "text-zinc-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#171A19]" : "text-zinc-300"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* "More" Dropdown Menu */}
            <div className="relative" ref={moreDropdownRef}>
              <button
                type="button"
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-expanded={moreDropdownOpen}
              >
                <span>More</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {moreDropdownOpen && (
                <div className="absolute right-0 mt-2.5 w-60 rounded-2xl bg-[#1d211f] border border-white/15 shadow-2xl p-2 space-y-1 animate-fadeIn z-50">
                  {moreLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setMoreDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-white/90 hover:text-white hover:bg-white/10 transition"
                      >
                        <Icon className="w-4 h-4 text-[#ff5500]" />
                        <span>{link.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* 3. Right: Globe / Language Selector + Donate Orange Pill Button */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Globe Language Selector */}
            <div className="relative" ref={langDropdownRef}>
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-zinc-300 hover:text-white transition"
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-zinc-300" />
                <ChevronDown className="w-3 h-3 text-zinc-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-xl bg-[#1d211f] border border-white/15 shadow-xl p-1.5 space-y-1 animate-fadeIn z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setSelectedLang(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition ${
                        selectedLang === lang.code
                          ? "bg-[#ff5500] text-white font-bold"
                          : "text-zinc-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Donate Pill Button */}
            <Link
              href="/donate"
              className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#ff5500] hover:bg-[#e04b00] text-white font-bold text-xs tracking-wide shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Heart className="w-3.5 h-3.5 text-white" />
              <span>Donate</span>
            </Link>
          </div>

          {/* Mobile Right Controls: Donate Button + Menu Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/donate"
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#ff5500] hover:bg-[#e04b00] text-white font-bold text-xs shadow-sm"
            >
              <Heart className="w-3.5 h-3.5 text-white" />
              <span>Donate</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-white bg-white/5 hover:bg-white/10 border border-white/15 focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-[#ff5500]" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer (Responsive & Touch-Friendly) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#171A19]/98 backdrop-blur-xl px-4 pt-4 pb-8 space-y-3 text-sm animate-fadeIn max-h-[85vh] overflow-y-auto">
          
          {/* Member Status Card */}
          {user ? (
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <h4 className="font-heading font-bold text-white text-xs">
                  {user.fullName}
                </h4>
                <p className="text-[10px] text-white/60">
                  {user.stateOfResidence || "Lagos Chapter"}
                </p>
              </div>
              <Link
                href="/portal"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold bg-[#ff5500] text-white px-3 py-1.5 rounded-full"
              >
                Member Portal
              </Link>
            </div>
          ) : (
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
              <span className="text-white/80">Citizen Access:</span>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="font-bold text-[#ff5500] hover:underline"
              >
                Sign In &rarr;
              </Link>
            </div>
          )}

          {/* Nav Items with Icons */}
          <div className="space-y-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? "bg-white text-[#171A19] font-bold"
                      : "text-white/80 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#171A19]" : "text-[#ff5500]"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <div className="pt-2 border-t border-white/10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 px-3 block mb-1">
                More Sections
              </span>
              {moreLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-white/80 hover:bg-white/5 hover:text-white transition"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#ff5500]" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Actions in Mobile Drawer */}
          <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
            <Link
              href="/report"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 text-center px-3 py-2.5 rounded-full text-xs font-bold border border-white/20 text-white hover:bg-white/10 transition"
            >
              <MapPin className="w-3.5 h-3.5 text-[#ff5500]" />
              <span>Report Issue</span>
            </Link>

            <Link
              href="/volunteer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 text-center px-3 py-2.5 rounded-full text-xs font-bold bg-[#ff5500] text-white hover:bg-[#e04b00] transition"
            >
              <Heart className="w-3.5 h-3.5 text-white" />
              <span>Donate</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
