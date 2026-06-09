"use client";

import React from "react";
import { Check, X } from "lucide-react";
import { MembershipPlan } from "@/types";
import GoldButton from "./GoldButton";
import GhostButton from "./GhostButton";

interface PlanCardProps {
  plan: MembershipPlan;
  isAnnual: boolean;
  onSelect: (planSlug: string) => void;
}

export default function PlanCard({ plan, isAnnual, onSelect }: PlanCardProps) {
  const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

  return (
    <div
      className={`relative p-8 md:p-10 flex flex-col items-start transition-all duration-500 rounded-lg h-full ${
        plan.isPopular
          ? "bg-surface-container border-2 border-primary lg:scale-105 z-10 shadow-2xl shadow-primary/5"
          : "bg-surface-container-low border border-outline-variant/30 hover:border-primary/50 hover:shadow-card-hover group"
      }`}
    >
      {/* Featured Badge */}
      {plan.isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-on-primary font-dm-sans text-[10px] font-bold px-6 py-1 tracking-[0.2em] whitespace-nowrap rounded-sm">
          MOST POPULAR
        </div>
      )}

      {/* Plan Header */}
      <span
        className={`font-dm-sans text-[11px] font-bold tracking-widest px-3 py-1 mb-6 rounded-sm uppercase ${
          plan.isPopular
            ? "bg-primary/20 text-primary"
            : "bg-surface-variant text-on-surface-variant"
        }`}
      >
        {plan.category}
      </span>
      <h3 className="font-bebas text-4xl tracking-wider mb-2 text-on-surface">
        {plan.name}
      </h3>

      {/* Pricing */}
      <div className="flex items-baseline gap-1.5 mb-8">
        <span className="font-mono text-4xl font-semibold text-primary">
          ₹{price.toLocaleString()}
        </span>
        <span className="text-outline-variant font-dm-sans text-xs font-bold tracking-widest">
          / MONTH
        </span>
      </div>

      {/* Features List */}
      <div className="space-y-4 mb-10 w-full flex-1">
        {plan.features.map((feature, index) => {
          const isNotIncluded = feature.toLowerCase().startsWith("no ");
          return (
            <div
              key={index}
              className={`flex items-center gap-3 ${
                isNotIncluded ? "opacity-30" : ""
              }`}
            >
              {isNotIncluded ? (
                <X className="w-5 h-5 text-on-surface-variant flex-shrink-0" />
              ) : (
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
              )}
              <span className="text-on-surface font-dm-sans text-sm tracking-wide">
                {feature}
              </span>
            </div>
          );
        })}
      </div>

      {/* Select CTA Button */}
      {plan.isPopular ? (
        <GoldButton
          onClick={() => onSelect(plan.slug)}
          className="w-full text-center"
        >
          Select {plan.name}
        </GoldButton>
      ) : (
        <GhostButton
          onClick={() => onSelect(plan.slug)}
          className="w-full text-center hover:bg-primary hover:text-on-primary transition-all duration-300"
        >
          Select {plan.name}
        </GhostButton>
      )}
    </div>
  );
}
