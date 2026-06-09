"use client";

import React from "react";
import AnimatedCounter from "../ui/AnimatedCounter";
import ScrollReveal from "../ui/ScrollReveal";

const stats = [
  { value: 1200, suffix: "+", label: "ACTIVE MEMBERS" },
  { value: 12, suffix: "", label: "YEARS ACTIVE" },
  { value: 15, suffix: "", label: "ELITE COACHES" },
  { value: 120, suffix: "+", label: "PREMIUM EQUIPMENT" },
];

export default function StatsBar() {
  return (
    <section className="relative z-20 bg-surface-container-lowest border-y border-outline-variant/30 py-12 px-6 md:px-grid-margin w-full">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal yOffset={20} duration={0.8}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 justify-center items-center divide-y md:divide-y-0 md:divide-x divide-outline-variant/20">
            {stats.map((stat, idx) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center justify-center text-center ${
                  idx > 1 ? "pt-8 md:pt-0" : ""
                } ${idx % 2 === 1 ? "border-none" : ""}`}
              >
                {/* Count value */}
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  duration={1.8}
                  className="font-bebas text-5xl md:text-6xl text-primary tracking-tight font-bold"
                />
                
                {/* Label */}
                <span className="font-dm-sans text-[11px] font-bold text-on-surface-variant tracking-[0.2em] mt-3 uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
