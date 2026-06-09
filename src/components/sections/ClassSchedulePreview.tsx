"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import ScrollReveal from "../ui/ScrollReveal";

export default function ClassSchedulePreview() {
  const router = useRouter();

  return (
    <section className="py-20 md:py-section-gap-desktop bg-surface-container-lowest px-6 md:px-grid-margin w-full">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <ScrollReveal yOffset={30}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeading
              title={
                <>
                  Group <span className="text-primary italic font-cormorant capitalize font-normal">Classes</span>
                </>
              }
              subtitle="REDEFINE YOUR LIMITS"
            />
            <Link
              href="/classes"
              className="font-dm-sans text-xs font-bold tracking-widest text-primary hover:text-white underline underline-offset-8 decoration-primary/45 hover:decoration-white transition-all uppercase whitespace-nowrap self-start md:self-end"
            >
              VIEW FULL SCHEDULE
            </Link>
          </div>
        </ScrollReveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
          {/* Large Featured Card (CrossFit) */}
          <ScrollReveal
            yOffset={40}
            className="lg:col-span-8 group relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden border border-outline-variant/30 bg-surface-container-low rounded-md"
          >
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8LuNheH21q5pKpQlxwaEvcDD24HmVRtGmoO6PSMWL8YMsJY_SHCvrxZun65RH63L4Mmq03gs4-B0mVv72qtxTjel-JmcpRnZT1CWjhqTC83u6i5ZjOHeYThZdM9gEkgfEqvSUr-5PZP3F3KBjiFEVdAHG0YKcfJufxgCWlmNemRpU_PpU5KPf0pS3Ew7JqqZwY0x2MeOrWL_b22uO0-4TJrLxFi7qIkXuM2QXYVV0O8jILrgKWdQ6cGBqdwTEa16XGES9-9gpLl_L"
              alt="Elite CrossFit Class"
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover grayscale brightness-50 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end bg-gradient-to-t from-background via-background/40 to-transparent">
              <span className="font-dm-sans text-[10px] font-bold bg-primary text-on-primary px-3 py-1 w-fit mb-4 rounded-sm tracking-widest uppercase">
                MOST POPULAR
              </span>
              <h3 className="font-bebas text-2xl md:text-3xl tracking-wider mb-2 uppercase text-on-surface">
                Elite CrossFit AMRAP
              </h3>
              <p className="font-dm-sans text-sm text-on-surface-variant max-w-md mb-6 leading-relaxed">
                Master technical Olympic lifting movements and push your aerobic capacity with our flagship high-intensity conditioning blocks.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <button
                  onClick={() => router.push("/classes")}
                  className="bg-primary text-on-primary font-bebas text-sm tracking-widest px-8 py-3.5 gold-shimmer uppercase cursor-pointer rounded-sm active:scale-95 transition-all"
                >
                  BOOK SPOT
                </button>
                <span className="font-mono text-xl md:text-2xl text-primary font-semibold">
                  07:00 AM
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Secondary Featured Card (Yoga) */}
          <ScrollReveal
            yOffset={40}
            delay={0.1}
            className="lg:col-span-4 group relative flex flex-col justify-between p-8 border border-outline-variant/30 bg-surface-container rounded-md hover:border-primary/50 transition-colors"
          >
            <div>
              <div className="flex justify-between items-start mb-12">
                <div className="w-12 h-12 bg-surface-container-highest border border-primary/20 flex items-center justify-center rounded-sm">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <span className="font-dm-sans text-[10px] font-bold text-primary tracking-widest uppercase bg-primary/10 px-3 py-1 rounded-sm">
                  02 SLOTS LEFT
                </span>
              </div>
              <h3 className="font-bebas text-2xl tracking-wider mb-4 uppercase text-on-surface">
                ZENITH YOGA FLOW
              </h3>
              <p className="font-dm-sans text-sm text-on-surface-variant leading-relaxed">
                A meditative yet physically demanding Vinyasa flow designed to increase flexibility, restore joint alignment, and enhance focus.
              </p>
            </div>
            <button
              onClick={() => router.push("/classes")}
              className="w-full border border-primary text-primary font-dm-sans text-xs font-bold tracking-widest py-4 hover:bg-primary hover:text-on-primary transition-all duration-300 uppercase cursor-pointer mt-8 rounded-sm"
            >
              JOIN CLASS
            </button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
