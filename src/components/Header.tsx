"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  ShoppingBag,
  Info,
  Layers,
  Timer,
  Menu,
  X,
  User as UserIcon,
  ChevronDown,
} from "lucide-react";

const navLinks = [
  { label: "Marketplace", href: "/marketplace" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "60-Day Challenge", href: "/campaigns/60-day-proof-of-work" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-neutral-200">
              <Image
                src="/logo.jpg"
                alt="Amvora"
                width={32}
                height={32}
                className="object-cover w-full h-full"
              />
            </div>
            <span className="text-sm font-black text-neutral-900 tracking-tight hidden sm:block">
              Amvora
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-neutral-100 text-neutral-900 font-semibold"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Marketplace CTA + Profile */}
          <div className="flex items-center gap-2">
            {/* Shop CTA — always visible */}
            <Link
              href="/marketplace"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#E85D04] text-white text-sm font-semibold hover:bg-[#d14e00] transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Shop</span>
            </Link>

            {/* Profile / Account */}
            <Link
              href={user ? "/profile" : "/login"}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-neutral-200 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              <UserIcon className="w-4 h-4" />
              <span className="hidden sm:block">
                {user ? (user.fullName.split(" ")[0]) : "Sign in"}
              </span>
            </Link>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg text-neutral-600 hover:bg-neutral-100"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-neutral-100 text-neutral-900 font-semibold"
                  : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3 mt-3 border-t border-neutral-100 space-y-2">
            <Link
              href="/marketplace"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#E85D04] text-white text-sm font-semibold"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Shop Now</span>
            </Link>

            <Link
              href={user ? "/profile" : "/login"}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-neutral-200 text-sm font-medium text-neutral-700"
            >
              <UserIcon className="w-4 h-4" />
              <span>{user ? "My Profile" : "Sign In"}</span>
            </Link>

            {!user && (
              <Link
                href="/register"
                className="block text-center w-full py-2.5 rounded-lg text-sm font-medium text-[#E85D04] hover:bg-orange-50"
              >
                Create Free Account
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}