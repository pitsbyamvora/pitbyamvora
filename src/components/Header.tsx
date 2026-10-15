"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  ShoppingBag,
  Menu,
  X,
  User as UserIcon,
  ChevronDown,
  LogOut,
  Settings,
  Shield,
} from "lucide-react";

const navLinks = [
  { label: "Marketplace", href: "/marketplace" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "60-Day Challenge", href: "/campaigns/60-day-proof-of-work" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  // Close dropdowns on outside click or Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setUserMenuOpen(false);
      }
    };
    const onClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group py-2">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-neutral-200 shadow-xs transition-transform group-hover:scale-105">
              <Image
                src="/logo.jpg"
                alt="Amvora"
                width={36}
                height={36}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black text-neutral-900 tracking-tight leading-none">
                Amvora
              </span>
              <span className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider hidden sm:block">
                Light Foundation
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1.5 bg-neutral-100/70 p-1.5 rounded-full border border-neutral-200/60">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${active
                      ? "bg-white text-neutral-900 shadow-xs"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-white/50"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Marketplace CTA + Profile */}
          <div className="flex items-center gap-3">
            {/* Shop CTA */}
            <Link
              href="/marketplace"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E85D04] text-white text-xs font-bold tracking-wide hover:bg-[#d14e00] shadow-sm hover:shadow transition-all duration-200 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Shop Essentials</span>
            </Link>

            {/* Profile / Account Dropdown */}
            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex items-center gap-2 py-1.5 px-2.5 rounded-xl border border-neutral-200/80 bg-neutral-50/50 hover:bg-neutral-100/80 transition-colors text-left"
                >
                  <div className="w-7 h-7 rounded-lg bg-orange-100 text-[#E85D04] flex items-center justify-center font-bold text-xs">
                    {user.fullName.charAt(0)}
                  </div>
                  <span className="text-xs font-semibold text-neutral-800 hidden sm:block max-w-[100px] truncate">
                    {user.fullName.split(" ")[0]}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-neutral-500 transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-neutral-200 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-neutral-100">
                      <p className="text-xs font-bold text-neutral-900 truncate">{user.fullName}</p>
                      <p className="text-[11px] text-neutral-500 truncate">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/profile"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
                      >
                        <UserIcon className="w-4 h-4 text-neutral-400" />
                        <span>My Account / Profile</span>
                      </Link>
                      <Link
                        href="/admin"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
                      >
                        <Shield className="w-4 h-4 text-neutral-400" />
                        <span>Admin Portal</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-neutral-200/80 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors shadow-2xs"
              >
                <UserIcon className="w-4 h-4 text-neutral-500" />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            )}

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2.5 rounded-xl bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-5 py-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${active
                      ? "bg-orange-50 text-[#E85D04]"
                      : "text-neutral-700 hover:bg-neutral-50"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-neutral-100 space-y-2.5">
            <Link
              href="/marketplace"
              className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl bg-[#E85D04] text-white text-sm font-bold shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Shop Marketplace</span>
            </Link>

            {!user ? (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/login"
                  className="flex items-center justify-center py-2.5 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-800"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="flex items-center justify-center py-2.5 rounded-xl bg-neutral-900 text-white text-xs font-bold"
                >
                  Register
                </Link>
              </div>
            ) : (
              <Link
                href="/profile"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-800"
              >
                <UserIcon className="w-4 h-4 text-neutral-500" />
                <span>My Profile</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}