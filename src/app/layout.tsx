import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const sora = Sora({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PITS 2027 — Power in the Street | Supported by Amvora Light Foundation",
  description:
    "A digital hub empowering citizens to advocate for change, participate in governance, report community challenges, and join nationwide youth-led movements for sustainable development.",
  metadataBase: new URL("https://amvora.com.ng"),

  openGraph: {
    title: "PITS 2027 — Power in the Street",
    description:
      "A digital hub empowering citizens to advocate for change, participate in governance, report community challenges, and join nationwide youth-led movements.",
    url: "https://amvora.com.ng",
    siteName: "PITS — Power in the Street",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 1200,
        alt: "PITS — Power in the Street",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PITS 2027 — Power in the Street",
    description:
      "A digital hub empowering citizens to advocate for change, participate in governance, and join nationwide youth-led movements.",
    site: "@MoreMillionVoices",
    creator: "@MoreMillionVoices",
    images: ["/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-NG"
      className={`${sora.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-body relative">
        {/* Fixed Ambient Logo Watermark for scrolling illusion vibe */}
        <div 
          className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden"
          aria-hidden="true"
        >
          <div 
            className="w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] md:w-[650px] md:h-[650px] lg:w-[800px] lg:h-[800px] rounded-full opacity-[0.035] dark:opacity-[0.05] bg-center bg-no-repeat bg-contain filter grayscale contrast-125 select-none"
            style={{ backgroundImage: "url('/logo.jpg')" }}
          />
        </div>

        <AuthProvider>
          <Header />
          <div className="flex-1 flex flex-col relative z-10">{children}</div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
