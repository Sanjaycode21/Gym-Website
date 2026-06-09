"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import GoldButton from "../ui/GoldButton";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activePath?: string;
}

const menuLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Membership", href: "/membership" },
  { label: "Classes", href: "/classes" },
  { label: "Trainers", href: "/trainers" },
  { label: "Contact", href: "/contact" },
];

export default function MobileMenu({ isOpen, onClose, activePath = "" }: MobileMenuProps) {
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
      className="fixed inset-0 z-[100] bg-background-stitch/98 backdrop-blur-lg flex flex-col justify-between p-8 md:hidden w-screen h-screen overflow-hidden"
    >
      {/* Header Row */}
      <div className="flex justify-between items-center w-full">
        <div className="font-bebas text-[28px] tracking-widest text-primary">
          IRONFORGE
        </div>
        <button
          onClick={onClose}
          className="text-on-surface hover:text-primary transition-colors p-2 cursor-pointer focus:outline-none"
          aria-label="Close menu"
        >
          <X className="w-8 h-8" />
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-6 my-auto text-left pl-4">
        {menuLinks.map((link) => {
          const isActive = activePath === link.href;
          return (
            <motion.div key={link.label} variants={linkVariants}>
              <Link
                href={link.href}
                onClick={onClose}
                className={`font-bebas text-4xl tracking-widest uppercase transition-colors duration-300 block ${
                  isActive ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* CTA Section */}
      <motion.div variants={linkVariants} className="w-full flex flex-col gap-4">
        <Link href="/membership/checkout" onClick={onClose}>
          <GoldButton className="w-full text-center py-4 text-xl tracking-[0.2em]">
            JOIN NOW
          </GoldButton>
        </Link>
        <div className="text-center font-dm-sans text-[10px] text-on-surface-variant/40 tracking-wider">
          © 2026 IRONFORGE FITNESS. ALL RIGHTS RESERVED.
        </div>
      </motion.div>
    </motion.div>
  );
}
