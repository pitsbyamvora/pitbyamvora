import Link from "next/link";
import { Compass, Home, Search, ArrowRight, AlertCircle, FileText, User } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] bg-[#F7F5EF] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-lg w-full bg-white rounded-3xl p-8 sm:p-10 border border-black/10 shadow-xl text-center space-y-6">
        
        {/* 404 Visual Indicator */}
        <div className="relative inline-block">
          <span className="font-heading font-black text-6xl sm:text-7xl text-[#171A19]/10 select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[#ff5500]/10 text-[#ff5500] flex items-center justify-center border-2 border-[#ff5500]/30 shadow-md">
              <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: "12s" }} />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-heading text-2xl sm:text-3xl font-black text-[#171A19]">
            Page Not Found
          </h1>
          <p className="font-body text-xs sm:text-sm text-[#646B66] leading-relaxed max-w-sm mx-auto">
            The civic page or document you are looking for has either been moved, updated, or does not exist on the PITS portal.
          </p>
        </div>

        {/* Quick Route Suggestions */}
        <div className="p-4 rounded-2xl bg-[#F7F5EF] border border-black/5 text-left space-y-2 text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#646B66] block">
            Popular Destinations
          </span>
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/campaigns/60-day-proof-of-work"
              className="p-2.5 rounded-xl bg-white hover:border-[#ff5500] border border-black/5 transition flex items-center gap-2 font-semibold text-[#171A19]"
            >
              <span className="w-2 h-2 rounded-full bg-[#ff5500]"></span>
              <span>60-Day Challenge</span>
            </Link>
            <Link
              href="/issues"
              className="p-2.5 rounded-xl bg-white hover:border-[#ff5500] border border-black/5 transition flex items-center gap-2 font-semibold text-[#171A19]"
            >
              <AlertCircle className="w-3.5 h-3.5 text-red-500" />
              <span>Issues Hub</span>
            </Link>
            <Link
              href="/petitions"
              className="p-2.5 rounded-xl bg-white hover:border-[#ff5500] border border-black/5 transition flex items-center gap-2 font-semibold text-[#171A19]"
            >
              <FileText className="w-3.5 h-3.5 text-blue-500" />
              <span>Petitions</span>
            </Link>
            <Link
              href="/portal"
              className="p-2.5 rounded-xl bg-white hover:border-[#ff5500] border border-black/5 transition flex items-center gap-2 font-semibold text-[#171A19]"
            >
              <User className="w-3.5 h-3.5 text-emerald-500" />
              <span>Member Portal</span>
            </Link>
          </div>
        </div>

        {/* Home Button */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#171A19] hover:bg-black text-white font-bold text-xs shadow-md transition"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
