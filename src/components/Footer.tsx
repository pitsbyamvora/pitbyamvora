import Link from "next/link";
import Image from "next/image";
import { BRAND_INFO } from "@/content/campaign";

export function Footer() {
  return (
    <footer className="bg-[#171A19] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand & Organization Information */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white p-0.5 border border-[#ff5500]">
                <Image
                  src="/logo.jpg"
                  alt="PITS Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-heading text-xl font-extrabold tracking-tight text-white">
                PITS <span className="text-[#ff5500]">2027</span>
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#ff5500] text-white font-bold tracking-wide">
                POWER IN THE STREET
              </span>
            </div>
            <p className="text-sm text-white/80 max-w-md leading-relaxed font-body">
              <strong>{BRAND_INFO.movement} ({BRAND_INFO.name}).</strong> A citizen-driven movement for measurable public-service delivery, direct community discounting, and structural governance accountability across Nigeria.
            </p>
            <div className="text-xs text-[#ff5500] font-semibold tracking-wide space-y-1">
              <p>“{BRAND_INFO.slogan}”</p>
              <p className="text-white/60 font-normal">
                {BRAND_INFO.foundation} • <em>“{BRAND_INFO.motto}”</em>
              </p>
            </div>

            {/* Social channels verified from amvora.com.ng */}
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-white/90">
              <a
                href={BRAND_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#ff5500] transition-colors"
              >
                Facebook
              </a>
              <a
                href={BRAND_INFO.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#ff5500] transition-colors"
              >
                YouTube (@MoremillionVoices)
              </a>
              <a
                href={BRAND_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#ff5500] transition-colors"
              >
                Instagram
              </a>
              <a
                href={BRAND_INFO.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#ff5500] transition-colors"
              >
                TikTok
              </a>
              <a
                href={BRAND_INFO.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#ff5500] transition-colors"
              >
                Twitter / X
              </a>
            </div>
          </div>

          {/* Quick Navigation Matching amvora.com.ng */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#ff5500] mb-4">
              Civic Action
            </h3>
            <ul className="space-y-2 text-sm text-white/80 font-body">
              <li>
                <Link href="/movement" className="hover:text-[#ff5500] transition-colors">
                  The PITS Movement
                </Link>
              </li>
              <li>
                <Link href="/campaigns/60-day-proof-of-work" className="hover:text-[#ff5500] transition-colors">
                  The 60-Day Challenge
                </Link>
              </li>
              <li>
                <Link href="/issues" className="hover:text-[#ff5500] transition-colors">
                  Community Issues
                </Link>
              </li>
              <li>
                <Link href="/report" className="hover:text-[#ff5500] transition-colors">
                  Report Problem
                </Link>
              </li>
              <li>
                <Link href="/petitions" className="hover:text-[#ff5500] transition-colors">
                  Active Petitions
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="hover:text-[#ff5500] transition-colors">
                  Join as Volunteer
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Governance */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#ff5500] mb-4">
              Contact & Hotline
            </h3>
            <div className="space-y-2 text-sm text-white/80 font-body">
              <p>
                <strong>Helpline:</strong>{" "}
                <a href={`tel:${BRAND_INFO.contact.phone}`} className="hover:underline text-white">
                  {BRAND_INFO.contact.phone}
                </a>
              </p>
              <p>
                <strong>Alt Phone:</strong>{" "}
                <a href={`tel:${BRAND_INFO.contact.altPhone}`} className="hover:underline text-white">
                  {BRAND_INFO.contact.altPhone}
                </a>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${BRAND_INFO.contact.email}`} className="hover:underline text-[#ff5500]">
                  {BRAND_INFO.contact.email}
                </a>
              </p>
              <div className="pt-3 border-t border-white/10 space-y-1.5 text-xs text-white/70">
                <p>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About PITS & Foundation
                  </Link>
                </p>
                <p>
                  <Link href="/privacy-policy" className="hover:text-white transition-colors">
                    Privacy Policy (NDPA)
                  </Link>
                </p>
                <p>
                  <Link href="/admin-login" className="hover:text-white transition-colors">
                    Admin Portal
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <p>© 2026 PITS — Power in the Street. Supported by Amvora Light Foundation.</p>
          <p className="text-white/80">
            Official Portal: <span className="text-[#ff5500] font-semibold">amvora.com.ng</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
