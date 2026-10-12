import Link from "next/link";
import { Shield, Lock, FileText, CheckCircle2, Phone, Mail } from "lucide-react";
import { BRAND_INFO } from "@/content/campaign";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Top Banner */}
      <section className="bg-[#171A19] text-white py-12 sm:py-16 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#ff5500] text-xs font-bold uppercase tracking-wider border border-white/10">
            <Shield className="w-3.5 h-3.5 text-[#ff5500]" />
            <span>NDPA 2023 & NDPR Compliance</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            Data Privacy & Citizen Charter
          </h1>
          <p className="font-body text-xs sm:text-sm md:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            PITS (Power in the Street) is built on strict civic confidentiality principles. We protect grassroots whistleblowers, community reporters, and citizen members.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          
          <div className="space-y-3">
            <h2 className="font-heading font-black text-lg sm:text-xl text-foreground">
              1. Our Foundational Privacy Promise
            </h2>
            <p>
              The PITS platform, supported by <strong>Amvora Light Foundation</strong>, does not monetize, sell, or rent your personal information to political brokers, advertising networks, or commercial telemarketers. Information submitted to our public evidence desks is utilized strictly for community defense, empirical price verification, and legal petitioning.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading font-black text-lg sm:text-xl text-foreground">
              2. Anonymous Ground Reporting Protection
            </h2>
            <p>
              When filing reports on public infrastructure collapse, food price gouging, or illegal haulage tolls via our <Link href="/report" className="text-[#ff5500] underline">Incident Reporting Desk</Link>, you may choose the <em>Anonymous Submission</em> toggle. In anonymous mode:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Your name and contact phone are severed from the public record.</li>
              <li>Exif metadata from uploaded site photographs is stripped of personal origin flags.</li>
              <li>Only the physical landmark and factual evidence are published for community confirmation.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading font-black text-lg sm:text-xl text-foreground">
              3. Citizen Membership Credentials
            </h2>
            <p>
              When registering as a verified citizen member or volunteer:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>We collect: Legal Name, Email Address, Phone Number, and State/Ward territory.</li>
              <li>Passwords are cryptographically salted and hashed; staff members have zero access to plaintext credentials.</li>
              <li>Your Citizen ID Pass (e.g. <code>PITS-704921</code>) serves as your grassroots verification token.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading font-black text-lg sm:text-xl text-foreground">
              4. Data Retention & Deletion Rights
            </h2>
            <p>
              In full compliance with the Nigeria Data Protection Act (NDPA 2023), any citizen member has the right to review their stored record or request full account deletion at any time by contacting our security desk at <strong className="text-foreground">{BRAND_INFO.contact.email}</strong>.
            </p>
          </div>

          <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <div>
              <p className="font-bold text-foreground">PITS Data Protection Office</p>
              <p className="text-muted-foreground">Helpline: {BRAND_INFO.contact.phone} | {BRAND_INFO.contact.email}</p>
            </div>
            <Link
              href="/"
              className="px-6 py-2.5 rounded-full bg-[#171A19] text-white hover:bg-black font-bold text-xs"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
