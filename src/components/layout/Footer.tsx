"use client";

import React from "react";
import Link from "next/link";
import { Instagram, Twitter, Youtube, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background border-t border-primary/50 mt-auto">
      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-gutter px-6 md:px-grid-margin py-16 md:py-section-gap-desktop max-w-7xl mx-auto">
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-1">
          <div className="font-bebas text-4xl text-primary mb-6 uppercase tracking-wider">
            IRONFORGE
          </div>
          <p className="text-on-surface-variant font-dm-sans text-sm leading-relaxed max-w-xs mb-8">
            DEFINING THE NEW STANDARD IN HUMAN PERFORMANCE. LUXURY MEETS RAW INTENSITY.
          </p>
        </div>

        {/* Quick Links Column */}
        <div>
          <h5 className="font-dm-sans text-[11px] font-bold text-primary mb-6 tracking-widest uppercase">
            EXPLORE
          </h5>
          <ul className="space-y-4 text-on-surface-variant font-dm-sans text-sm">
            <li>
              <Link href="/membership" className="hover:text-primary transition-colors">
                Membership Plans
              </Link>
            </li>
            <li>
              <Link href="/classes" className="hover:text-primary transition-colors">
                Group Classes
              </Link>
            </li>
            <li>
              <Link href="/trainers" className="hover:text-primary transition-colors">
                Private Coaching
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Column */}
        <div>
          <h5 className="font-dm-sans text-[11px] font-bold text-primary mb-6 tracking-widest uppercase">
            LEGAL
          </h5>
          <ul className="space-y-4 text-on-surface-variant font-dm-sans text-sm">
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect Column */}
        <div>
          <h5 className="font-dm-sans text-[11px] font-bold text-primary mb-6 tracking-widest uppercase">
            CONNECT
          </h5>
          <div className="flex gap-4 mb-6">
            <Link
              href="#"
              className="w-10 h-10 rounded-sm flex items-center justify-center border border-outline-variant hover:border-primary text-on-surface-variant hover:text-primary transition-all cursor-pointer"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </Link>
            <Link
              href="#"
              className="w-10 h-10 rounded-sm flex items-center justify-center border border-outline-variant hover:border-primary text-on-surface-variant hover:text-primary transition-all cursor-pointer"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </Link>
            <Link
              href="#"
              className="w-10 h-10 rounded-sm flex items-center justify-center border border-outline-variant hover:border-primary text-on-surface-variant hover:text-primary transition-all cursor-pointer"
              aria-label="Youtube"
            >
              <Youtube className="w-4 h-4" />
            </Link>
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-bold font-dm-sans text-on-surface-variant hover:text-primary transition-colors cursor-pointer group"
          >
            BACK TO TOP <ArrowUp className="w-3 h-3 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="px-6 md:px-grid-margin py-8 border-t border-outline-variant/10 text-center">
        <p className="font-dm-sans text-[10px] font-bold text-on-surface-variant/40 tracking-[0.2rem] uppercase">
          © 2026 IRONFORGE FITNESS. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
