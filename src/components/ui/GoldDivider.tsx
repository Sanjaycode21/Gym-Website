import React from "react";

interface GoldDividerProps {
  className?: string;
  glow?: boolean;
}

export default function GoldDivider({ className = "", glow = false }: GoldDividerProps) {
  return (
    <div
      className={`w-full ${glow ? "line-glow" : "gold-divider"} ${className}`}
      style={{ height: "1px" }}
    />
  );
}
