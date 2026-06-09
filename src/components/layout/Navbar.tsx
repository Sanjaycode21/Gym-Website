"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Membership", href: "/membership" },
  { label: "Classes", href: "/classes" },
  { label: "Trainers", href: "/trainers" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full h-20 z-50 flex justify-between items-center px-6 md:px-grid-margin transition-all duration-300 ${
          isScrolled
            ? "bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-outline-variant/30"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        {/* Brand Logo */}
        <Link
          href="/"
          className="font-bebas text-2xl md:text-3xl tracking-widest text-primary font-bold hover:opacity-90 transition-opacity"
        >
          IRONFORGE
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => {
            // Check if active: exact match for pathname, or hash match
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`font-dm-sans text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${
                  isActive
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Hamburger */}
        <div className="flex items-center gap-4">
          <Link href="/checkout">
            <button className="bg-primary text-on-primary font-bebas text-[14px] md:text-[16px] tracking-wider px-6 md:px-8 py-2 gold-shimmer transition-all duration-300 active:scale-95 cursor-pointer uppercase rounded-sm">
              JOIN NOW
            </button>
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-on-surface hover:text-primary transition-colors p-2 cursor-pointer focus:outline-none"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Slide-out Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            activePath={pathname}
          />
        )}
      </AnimatePresence>
    </>
  );
}
