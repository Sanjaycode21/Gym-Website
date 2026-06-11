"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, User, LayoutDashboard, Calendar, LogOut, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import MobileMenu from "./MobileMenu";
import { useAuth } from "@/components/providers/AuthProvider";
import Logo from "@/components/ui/Logo";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
    router.push("/");
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "";

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
          className="hover:opacity-90 transition-opacity"
        >
          <Logo textSize="text-xl md:text-2xl" iconSize={28} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => {
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
        <div className="flex items-center gap-4 relative">
          {user ? (
            /* Logged In Dropdown */
            <div className="hidden md:block relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 bg-[#1e1b15] border border-primary/30 px-4 py-2 hover:border-primary transition-all duration-300 cursor-pointer rounded-sm"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary text-primary flex items-center justify-center font-bebas text-sm font-bold">
                  {initials}
                </div>
                <span className="font-dm-sans text-xs font-bold uppercase tracking-wider text-on-surface">
                  {user.name.split(" ")[0]}
                </span>
                <ChevronDown size={14} className={`text-on-surface-variant transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-[#1e1b15] border border-[#4d4637]/40 rounded-sm py-2 shadow-2xl z-50 font-dm-sans text-xs flex flex-col"
                  >
                    <Link
                      href="/dashboard"
                      onClick={() => setIsDropdownOpen(false)}
                      className="px-4 py-3 hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-2 uppercase tracking-wider font-bold text-on-surface-variant"
                    >
                      <LayoutDashboard size={14} /> Dashboard
                    </Link>
                    <Link
                      href="/dashboard#bookings"
                      onClick={() => setIsDropdownOpen(false)}
                      className="px-4 py-3 hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-2 uppercase tracking-wider font-bold text-on-surface-variant"
                    >
                      <Calendar size={14} /> My Bookings
                    </Link>
                    <Link
                      href="/dashboard#profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="px-4 py-3 hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-2 uppercase tracking-wider font-bold text-on-surface-variant"
                    >
                      <User size={14} /> Profile
                    </Link>
                    <div className="border-t border-[#4d4637]/20 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 hover:bg-error/10 hover:text-error transition-colors flex items-center gap-2 uppercase tracking-wider font-bold text-error cursor-pointer"
                    >
                      <LogOut size={14} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Guest Buttons */
            <div className="hidden md:flex items-center gap-4">
              <Link href="/login" className="font-dm-sans text-xs font-bold tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors py-2 px-4">
                LOGIN
              </Link>
              <Link href="/register">
                <button className="bg-primary text-on-primary font-bebas text-[14px] md:text-[16px] tracking-wider px-6 md:px-8 py-2 gold-shimmer transition-all duration-300 active:scale-95 cursor-pointer uppercase rounded-sm">
                  REGISTER
                </button>
              </Link>
            </div>
          )}

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
