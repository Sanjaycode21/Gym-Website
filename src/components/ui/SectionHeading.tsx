import React from "react";
import GoldDivider from "./GoldDivider";

interface SectionHeadingProps {
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const isLeft = align === "left";

  return (
    <div
      className={`flex flex-col ${
        isLeft ? "items-start text-left" : "items-center text-center"
      } gap-4 w-full ${className}`}
    >
      {/* Subtitle/Kicker */}
      {subtitle && (
        <span className="font-dm-sans text-[11px] font-bold text-primary tracking-[0.3em] bg-primary/10 px-4 py-1 rounded-sm uppercase">
          {subtitle}
        </span>
      )}

      {/* Main Heading */}
      <h2 className="font-bebas text-5xl md:text-6xl tracking-wider text-on-surface leading-tight uppercase max-w-4xl">
        {title}
      </h2>

      {/* Signature Glow Line */}
      <div className={`w-24 h-1 line-glow mt-2 ${isLeft ? "" : "mx-auto"}`} />
    </div>
  );
}
