"use client";

import React from "react";
import { motion } from "framer-motion";

interface GhostButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "gold" | "white";
}

export default function GhostButton({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  variant = "gold",
}: GhostButtonProps) {
  const borderClass =
    variant === "gold"
      ? "border-primary text-primary hover:bg-primary hover:text-on-primary"
      : "border-white text-white hover:bg-white hover:text-black";

  return (
    <motion.button
      whileTap={disabled ? undefined : { scale: 0.97 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`border bg-transparent font-bebas text-[18px] tracking-widest px-8 py-3.5 uppercase transition-all duration-300 select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none ${borderClass} ${className}`}
    >
      {children}
    </motion.button>
  );
}
