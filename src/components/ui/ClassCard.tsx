"use client";

import React from "react";
import { ArrowRight, Lock } from "lucide-react";
import { GymClass } from "@/types";

interface ClassCardProps {
  gymClass: GymClass;
  onClick?: (classSlug: string) => void;
}

export default function ClassCard({ gymClass, onClick }: ClassCardProps) {
  const isFull = gymClass.slotsLeft === 0;

  // Determine border color class based on the type
  let borderClass = "border-primary"; // default gold
  if (gymClass.type === "YOGA") {
    borderClass = "border-tertiary";
  } else if (gymClass.type === "STRENGTH" || gymClass.type === "BOXING") {
    borderClass = "border-secondary";
  }

  return (
    <div
      onClick={() => !isFull && onClick?.(gymClass.slug)}
      className={`p-4 border-l-4 ${borderClass} bg-surface-container transition-all duration-300 group ${
        isFull
          ? "opacity-80 cursor-not-allowed"
          : "hover:bg-surface-container-high cursor-pointer hover:-translate-y-0.5"
      }`}
    >
      {/* Start Time */}
      <span className="font-mono text-sm block mb-1 text-on-surface-variant">
        {gymClass.startTime}
      </span>
      
      {/* Class Name */}
      <h4 className="font-bebas text-lg leading-tight tracking-wider mb-2 text-on-surface">
        {gymClass.name}
      </h4>

      {/* Slots Available indicator */}
      <div className="flex justify-between items-center">
        {isFull ? (
          <>
            <span className="font-dm-sans text-[10px] font-bold tracking-widest text-on-surface-variant/50">
              FULL
            </span>
            <Lock className="w-3.5 h-3.5 text-on-surface-variant/50" />
          </>
        ) : (
          <>
            <span className="font-dm-sans text-[10px] font-bold tracking-widest text-primary">
              {gymClass.slotsLeft.toString().padStart(2, "0")} SLOTS LEFT
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-on-surface-variant group-hover:translate-x-1 group-hover:text-primary transition-all" />
          </>
        )}
      </div>
    </div>
  );
}
