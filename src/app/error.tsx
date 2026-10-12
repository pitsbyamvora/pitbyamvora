"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home, Phone, LifeBuoy } from "lucide-react";
import { BRAND_INFO } from "@/content/campaign";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console or telemetry service
    console.error("PITS Platform Error:", error);
  }, [error]);

  return (
    <div className="min-h-[75vh] bg-[#F7F5EF] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-black/10 shadow-xl text-center space-y-6">
        
        {/* Warning Icon Badge */}
        <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-600 flex items-center justify-center mx-auto border border-red-500/20">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#ff5500] px-2.5 py-0.5 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/20">
            System Notice
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-black text-[#171A19]">
            Something Encountered an Issue
          </h1>
          <p className="font-body text-xs sm:text-sm text-[#646B66] leading-relaxed">
            An unexpected error occurred while loading this page. Our civic technology desk has been alerted.
          </p>
        </div>

        {/* Error Digest (if available) */}
        {error?.digest && (
          <div className="p-2.5 rounded-xl bg-black/5 font-mono text-[11px] text-[#646B66]">
            Digest ID: {error.digest}
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#171A19] hover:bg-black text-white font-bold text-xs shadow-md transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Reloading</span>
          </button>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-black/15 hover:bg-black/5 text-[#171A19] font-semibold text-xs transition"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
        </div>

        {/* Helpline Contact */}
        <div className="pt-4 border-t border-black/10 text-[11px] text-[#646B66] flex items-center justify-center gap-2">
          <Phone className="w-3.5 h-3.5 text-[#ff5500]" />
          <span>Support Helpline: {BRAND_INFO.contact.phone}</span>
        </div>
      </div>
    </div>
  );
}
