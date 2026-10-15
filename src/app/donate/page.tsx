"use client";

import { useState } from "react";
import Link from "next/link";
import { BRAND_INFO } from "@/content/campaign";
import {
  Heart,
  CheckCircle2,
  Copy,
  Building2,
  ShieldCheck,
  Wheat,
  Truck,
  ArrowRight,
  Phone,
  Lock,
} from "lucide-react";

export default function DonatePage() {
  const [copiedAccount, setCopiedAccount] = useState(false);

  const bankDetails = {
    accountName: "AMVORA LIGHT FOUNDATION",
    bankName: "Access Bank Nigeria PLC",
    accountNumber: "1849204812",
    sortCode: "044150149",
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(bankDetails.accountNumber);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2500);
  };

  return (
    <div className="min-h-screen bg-transparent text-foreground pb-20">
      {/* Top Banner */}
      <section className="py-14 sm:py-16 border-b border-border/40 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/60 text-[#E85D04] text-xs font-bold uppercase tracking-wider border border-border">
            <Heart className="w-3.5 h-3.5 text-[#E85D04]" />
            <span>PITS Civic Solidarity Fund</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-foreground">
            Support the 60-Day Proof Movement
          </h1>
          <p className="font-body text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed font-normal">
            Every contribution directly funds commodity price subsidies, community grain storage, and non-violent legal defense against illegal interstate road tolls.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Bank Transfer Information Card */}
        <div className="bg-card border-2 border-border rounded-3xl p-6 sm:p-10 shadow-lg space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#E85D04] uppercase tracking-wider">
                Direct Civic Account
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-black text-foreground">
                Official Nigerian Banking Details
              </h2>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-muted/30 border border-border space-y-1">
              <span className="text-muted-foreground block text-[11px]">Beneficiary Account Name</span>
              <strong className="text-foreground text-sm font-heading block">{bankDetails.accountName}</strong>
              <span className="text-[10px] text-muted-foreground">{BRAND_INFO.foundation}</span>
            </div>

            <div className="p-4 rounded-2xl bg-muted/30 border border-border space-y-1">
              <span className="text-muted-foreground block text-[11px]">Banking Partner</span>
              <strong className="text-foreground text-sm font-heading block">{bankDetails.bankName}</strong>
              <span className="text-[10px] text-muted-foreground">Corporate Current Account</span>
            </div>
          </div>

          {/* Account Number Box with One-Click Copy */}
          <div className="p-5 rounded-2xl bg-[#171A19] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[11px] text-white/60 block uppercase font-mono tracking-wider">
                NUBAN Account Number
              </span>
              <span className="font-mono font-black text-2xl sm:text-3xl text-[#E85D04] tracking-wider">
                {bankDetails.accountNumber}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#E85D04] hover:bg-[#e04b00] text-white font-bold text-xs shadow-md transition w-full sm:w-auto justify-center"
            >
              {copiedAccount ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Account Number</span>
                </>
              )}
            </button>
          </div>

          <p className="text-[11px] text-muted-foreground leading-relaxed">
            * Please include your phone number or state in the transaction reference/narration so our accounts desk can credit your contribution to the corresponding ward grain subsidy pool.
          </p>
        </div>

        {/* In-Kind Contributions Section */}
        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E85D04]">
              Beyond Financial Support
            </span>
            <h3 className="font-heading font-black text-xl text-foreground">
              In-Kind Community Contributions
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-2xl p-5 space-y-2">
              <Wheat className="w-6 h-6 text-[#E85D04]" />
              <h4 className="font-bold text-xs text-foreground">Grains & Commodity Sacks</h4>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Direct donations of rice paddy, maize, cassava, or beans for ward emergency food banks.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5 space-y-2">
              <Truck className="w-6 h-6 text-[#E85D04]" />
              <h4 className="font-bold text-xs text-foreground">Freight & Logistics Transport</h4>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Truck owners dedicating haulage capacity to move produce between farm clusters and city hubs.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5 space-y-2">
              <Building2 className="w-6 h-6 text-[#E85D04]" />
              <h4 className="font-bold text-xs text-foreground">Secure Storage & Hub Space</h4>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Dry warehouse facilities and secure market stalls serving as neighborhood pickup hubs.
              </p>
            </div>
          </div>
        </div>

        {/* Helpline */}
        <div className="p-4 rounded-2xl bg-muted/40 border border-border flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#E85D04]" />
            <span>Inquiries & Proof Enquiries: <strong>{BRAND_INFO.contact.phone}</strong></span>
          </div>
          <Link href="/about" className="text-[#E85D04] font-bold hover:underline">
            About Our Foundation →
          </Link>
        </div>
      </div>
    </div>
  );
}
