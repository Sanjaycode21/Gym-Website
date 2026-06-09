"use client";

import React from "react";
import { ShieldCheck, Dumbbell, Sparkles } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import ScrollReveal from "../ui/ScrollReveal";

const features = [
  {
    icon: <Dumbbell className="w-10 h-10 text-primary" />,
    title: "ATHLETIC ENGINEERING",
    description:
      "Train with competition-grade Eleiko plates, Hammer Strength power racks, and customized biometric-tracking equipment engineered for peak output.",
  },
  {
    icon: <Sparkles className="w-10 h-10 text-primary" />,
    title: "LUXURY RECOVERY",
    description:
      "Access our dedicated recovery suites featuring private infrared saunas, cryotherapy chambers, compression boots, and professional sport therapies.",
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-primary" />,
    title: "ELITE COACHING",
    description:
      "Work 1-on-1 with coaches holding master's degrees in biomechanics, IFBB pro cards, or professional sports consulting credentials.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="about" className="py-20 md:py-section-gap-desktop bg-background px-6 md:px-grid-margin w-full">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Heading */}
        <ScrollReveal yOffset={30}>
          <SectionHeading
            title={
              <>
                Uncompromising <span className="text-primary italic font-cormorant capitalize font-normal">Standards</span>
              </>
            }
            subtitle="WHY IRONFORGE"
            align="center"
          />
        </ScrollReveal>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {features.map((feature, idx) => (
            <ScrollReveal
              key={feature.title}
              delay={idx * 0.1}
              yOffset={40}
              duration={0.6}
            >
              <div className="bg-surface-container border border-outline-variant/30 p-8 md:p-10 flex flex-col items-start gap-6 rounded-lg hover:border-primary/50 hover:shadow-card-hover hover:scale-[1.02] transition-all duration-300 group h-full">
                {/* Icon Container */}
                <div className="w-16 h-16 rounded-sm bg-surface-container-highest border border-primary/20 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-colors duration-300">
                  {feature.icon}
                </div>

                {/* Text Details */}
                <h3 className="font-bebas text-2xl tracking-wider text-on-surface">
                  {feature.title}
                </h3>
                <p className="font-dm-sans text-sm text-on-surface-variant leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
