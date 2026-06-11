"use client";

import React from "react";

interface LogoProps {
  className?: string;
  iconSize?: number;
  showText?: boolean;
  textSize?: string;
  isAdmin?: boolean;
}

export default function Logo({
  className = "",
  iconSize = 32,
  showText = true,
  textSize = "text-xl md:text-2xl",
  isAdmin = false,
}: LogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Premium SVG Crest */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-[0_2px_8px_rgba(230,179,37,0.25)]"
      >
        <defs>
          <linearGradient id="logoGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2CC" />
            <stop offset="30%" stopColor="#E6B325" />
            <stop offset="70%" stopColor="#B38600" />
            <stop offset="100%" stopColor="#664D00" />
          </linearGradient>
          <linearGradient id="logoSilverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#CCCCCC" />
            <stop offset="100%" stopColor="#555555" />
          </linearGradient>
          <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Faceted Crest Shield Border */}
        <path
          d="M50 6 L84 18 V48 C84 68 70 85 50 91 C30 85 16 68 16 48 V18 L50 6 Z"
          stroke="url(#logoGoldGradient)"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Sleek Faceted Anvil Base */}
        <path
          d="M32 64 H68 L64 71 H36 Z"
          fill="url(#logoSilverGradient)"
        />
        <path
          d="M37 64 L41 55 H59 L63 64 Z"
          fill="url(#logoSilverGradient)"
          opacity="0.9"
        />
        <path
          d="M26 55 C26 55 34 55 39 55 L41 51 H59 L61 55 C66 55 74 55 74 55 C74 55 76 49 70 47 C63 45 58 47 50 47 C42 47 37 45 30 47 C23 49 26 55 26 55 Z"
          fill="url(#logoSilverGradient)"
          opacity="0.8"
        />

        {/* Forge Flame Rising From Anvil */}
        <path
          d="M50 20 C53 27 57 31 57 37 C57 43 50 46 50 46 C50 46 43 43 43 37 C43 31 47 27 50 20 Z"
          fill="url(#logoGoldGradient)"
          filter="url(#logoGlow)"
        />
      </svg>

      {showText && (
        <span className={`font-syncopate tracking-[0.1em] leading-none select-none flex items-center ${textSize}`}>
          <span className="text-[#FFFFFF]">IRON</span>
          <span className="text-primary bg-clip-text">FORGE</span>
          {isAdmin && (
            <span className="ml-2.5 px-2 py-0.5 bg-primary/10 border border-primary/25 text-primary text-[9px] font-dm-sans font-bold tracking-widest rounded-sm">
              ADMIN
            </span>
          )}
        </span>
      )}
    </div>
  );
}
