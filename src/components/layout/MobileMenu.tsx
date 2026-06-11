"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, LogOut, LayoutDashboard, Calendar, User as UserIcon } from "lucide-react";
import { motion } from "framer-motion";
import GoldButton from "../ui/GoldButton";
import { useAuth } from "@/components/providers/AuthProvider";
import Logo from "@/components/ui/Logo";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activePath?: string;
}

const menuLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Membership", href: "/membership" },
  { label: "Classes", href: "/classes" },
  { label: "Trainers", href: "/trainers" },
  { label: "Contact", href: "/contact" },
];

export default function MobileMenu({ isOpen, onClose, activePath = "" }: MobileMenuProps) {
  const { user, logout } = useAuth();
  const router = useRouter();

  // Lock scroll on body when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogout = async () => {
    await logout();
    onClose();
    router.push("/");
  };

  const containerVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "tween",
        duration: 0.4,
        ease: [0.2, 0.8, 0.2, 1],
        staggerChildren: 0.08,
      },
    },
    exit: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className="fixed inset-0 z-[100] bg-background-stitch/98 backdrop-blur-lg flex flex-col justify-between p-8 w-screen h-screen overflow-y-auto"
    >
      {/* Header Row */}
      <div className="flex justify-between items-center w-full">
        <Link href="/" onClick={onClose} className="hover:opacity-90 transition-opacity">
          <Logo textSize="text-2xl" iconSize={26} />
        </Link>
        <button
          onClick={onClose}
          className="text-on-surface hover:text-primary transition-colors p-2 cursor-pointer focus:outline-none"
          aria-label="Close menu"
        >
          <X className="w-8 h-8" />
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-5 my-auto text-left pl-4 pt-8 pb-8">
        {menuLinks.map((link) => {
          const isActive = activePath === link.href;
          return (
            <motion.div key={link.label} variants={linkVariants}>
              <Link
                href={link.href}
                onClick={onClose}
                className={`font-bebas text-3xl tracking-widest uppercase transition-colors duration-300 block ${
                  isActive ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            </motion.div>
          );
        })}

        {user && (
          <>
            <div className="border-t border-[#4d4637]/20 my-2"></div>
            <motion.div variants={linkVariants}>
              <Link
                href="/dashboard"
                onClick={onClose}
                className="font-bebas text-2xl tracking-widest uppercase text-on-surface-variant hover:text-primary flex items-center gap-2"
              >
                <LayoutDashboard size={18} /> Dashboard
              </Link>
            </motion.div>
            <motion.div variants={linkVariants}>
              <Link
                href="/dashboard#bookings"
                onClick={onClose}
                className="font-bebas text-2xl tracking-widest uppercase text-on-surface-variant hover:text-primary flex items-center gap-2"
              >
                <Calendar size={18} /> My Bookings
              </Link>
            </motion.div>
            <motion.div variants={linkVariants}>
              <Link
                href="/dashboard#profile"
                onClick={onClose}
                className="font-bebas text-2xl tracking-widest uppercase text-on-surface-variant hover:text-primary flex items-center gap-2"
              >
                <UserIcon size={18} /> Profile
              </Link>
            </motion.div>
          </>
        )}
      </nav>

      {/* CTA Section */}
      <motion.div variants={linkVariants} className="w-full flex flex-col gap-4 mt-auto">
        {user ? (
          <button
            onClick={handleLogout}
            className="w-full text-center py-4 text-xl tracking-[0.2em] border border-error hover:bg-error/10 text-error font-bebas uppercase transition-all duration-300 rounded-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut size={18} /> LOGOUT
          </button>
        ) : (
          <div className="flex flex-col gap-3">
            <Link href="/login" onClick={onClose}>
              <button className="w-full text-center py-4 text-xl tracking-[0.2em] border border-primary hover:bg-primary/10 text-primary font-bebas uppercase transition-all duration-300 rounded-sm cursor-pointer">
                LOGIN
              </button>
            </Link>
            <Link href="/register" onClick={onClose}>
              <GoldButton className="w-full text-center py-4 text-xl tracking-[0.2em]">
                JOIN NOW
              </GoldButton>
            </Link>
          </div>
        )}
        <div className="text-center font-dm-sans text-[10px] text-on-surface-variant/40 tracking-wider pt-2">
          © 2026 IRONFORGE FITNESS. ALL RIGHTS RESERVED.
        </div>
      </motion.div>
    </motion.div>
  );
}
