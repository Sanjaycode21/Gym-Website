"use client";

import React from "react";
import { motion } from "framer-motion";

interface GoldButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function GoldButton({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: GoldButtonProps) {
  return (
    <motion.button
      whileTap={disabled ? undefined : { scale: 0.97 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-primary text-on-primary font-bebas text-[18px] tracking-widest px-8 py-3.5 gold-shimmer uppercase transition-all duration-300 border-none select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none ${className}`}
    >
      {children}
    </motion.button>
  );
}
