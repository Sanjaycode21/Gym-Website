"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { membershipPlans } from "@/lib/mockData";
import SectionHeading from "../ui/SectionHeading";
import PlanCard from "../ui/PlanCard";
import ScrollReveal from "../ui/ScrollReveal";
import { useAuth } from "@/components/providers/AuthProvider";

export default function MembershipPreview() {
  const [isAnnual, setIsAnnual] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  const handleSelectPlan = (slug: string) => {
    if (user) {
      router.push(`/checkout?plan=${slug}&billing=${isAnnual ? "annual" : "monthly"}`);
    } else {
      router.push(`/login?redirect=/checkout?plan=${slug}&billing=${isAnnual ? "annual" : "monthly"}`);
    }
  };

  return (
    <section className="py-20 md:py-section-gap-desktop bg-surface-container-lowest px-6 md:px-grid-margin w-full">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <ScrollReveal yOffset={30}>
          <div className="flex flex-col items-center text-center gap-6">
            <SectionHeading
              title={
                <>
                  MEMBERSHIP <span className="text-primary italic font-cormorant capitalize font-normal">Plans</span>
                </>
              }
              subtitle="JOIN THE FORGE"
              align="center"
            />
            
            {/* Custom Billing Toggle from Stitch design */}
            <div className="flex items-center gap-6 mt-4">
              <span className={`font-dm-sans text-xs font-bold tracking-widest transition-colors ${
                !isAnnual ? "text-on-background" : "text-on-surface-variant/40"
              }`}>
                MONTHLY
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative w-16 h-8 bg-surface-container rounded-full p-1 border border-outline-variant/30 transition-all duration-300 cursor-pointer"
                aria-label="Toggle annual billing"
              >
                <div
                  className={`w-6 h-6 bg-primary rounded-full transition-transform duration-300 ${
                    isAnnual ? "translate-x-8" : "translate-x-0"
                  }`}
                />
              </button>
              <span className={`font-dm-sans text-xs font-bold tracking-widest transition-colors ${
                isAnnual ? "text-primary" : "text-on-surface-variant/40"
              }`}>
                ANNUAL (SAVE 20%)
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter items-stretch mt-6">
          {membershipPlans.map((plan, idx) => (
            <ScrollReveal
              key={plan.id}
              delay={idx * 0.1}
              yOffset={40}
              duration={0.6}
            >
              <PlanCard
                plan={plan}
                isAnnual={isAnnual}
                onSelect={handleSelectPlan}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Comparison Page Link */}
        <ScrollReveal yOffset={20} className="text-center mt-6">
          <Link
            href="/membership"
            className="font-dm-sans text-xs font-bold tracking-widest text-primary hover:text-white underline underline-offset-8 decoration-primary/45 hover:decoration-white transition-all uppercase"
          >
            VIEW DETAILED COMPARISON TABLE
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
