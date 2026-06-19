import type { Metadata } from "next";
import {
  Bebas_Neue,
  DM_Sans,
  Cormorant_Garamond,
  JetBrains_Mono,
  Syncopate,
} from "next/font/google";
import "./globals.css";
import PageLoader from "@/components/layout/PageLoader";
import { AuthProvider } from "@/components/providers/AuthProvider";

/* ─── Font declarations ─────────────────────────────────────────────────────── */
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bebas-neue",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant",
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500"],
});

const syncopate = Syncopate({
  weight: ["700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syncopate",
});

/* ─── Metadata ───────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: "IronForge Fitness — Premium Strength & Conditioning Gym",
    template: "%s | IronForge Fitness",
  },
  description:
    "IronForge Fitness is a premium strength and conditioning gym. Train with professional-grade equipment, certified coaches, and structured programs built to help you get results.",
  keywords: [
    "strength gym",
    "premium fitness",
    "weightlifting gym",
    "IronForge",
    "personal training",
    "strength and conditioning",
  ],
  openGraph: {
    type: "website",
    siteName: "IronForge Fitness",
    title: "IronForge Fitness — Premium Strength & Conditioning Gym",
    description:
      "Train with professional-grade equipment, certified coaches, and structured programs built to help you get results.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "IronForge Fitness",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IronForge Fitness — Premium Strength & Conditioning Gym",
    description: "Premium strength and conditioning gym built for serious training.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* ─── Root Layout ────────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const fontVariables = [
    bebasNeue.variable,
    dmSans.variable,
    cormorant.variable,
    jetbrainsMono.variable,
    syncopate.variable,
  ].join(" ");

  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0A0A0A] text-[#e9e1d7]">
        {/* Film grain overlay */}
        <div className="grain-overlay" aria-hidden="true" />

        <AuthProvider>
          {/* First-load animation */}
          <PageLoader />

          {/* Page content */}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
