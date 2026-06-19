"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import GoldDivider from "../ui/GoldDivider";
import GoldButton from "../ui/GoldButton";
import GhostButton from "../ui/GhostButton";
import ScrollReveal from "../ui/ScrollReveal";
import { useAuth } from "@/components/providers/AuthProvider";

export default function CTABanner() {
  const { user, membership } = useAuth();
  const hasMembership = membership && membership.status === "ACTIVE";

  const getHeadline = () => {
    if (user) {
      return (
        <>
          WELCOME BACK, <span className="text-primary italic font-cormorant capitalize font-normal">{user.name.split(" ")[0].toLowerCase()}</span>
        </>
      );
    }
    return (
      <>
        Ready to Train with <span className="text-primary italic font-cormorant capitalize font-normal">Purpose?</span>
      </>
    );
  };

  const getSubtitle = () => {
    if (user) {
      if (hasMembership) {
        return "Go to your member dashboard to manage your schedule, book training sessions, and view your account details.";
      }
      return "Choose one of our membership plans to get full access to the gym, locker rooms, saunas, and group classes.";
    }
    return "Visit our facility, meet our coaches, and see the equipment first-hand. Book a private tour of the gym today.";
  };

  const getCTA = () => {
    if (user) {
      if (hasMembership) {
        return (
          <>
            <Link href="/dashboard">
              <GoldButton className="w-full sm:w-auto px-12 py-5 text-[22px] tracking-[0.2em] uppercase">
                GO TO DASHBOARD
              </GoldButton>
            </Link>
            <Link href="/classes">
              <GhostButton variant="white" className="w-full sm:w-auto px-12 py-5 text-[22px] tracking-[0.2em] uppercase">
                BOOK CLASSES
              </GhostButton>
            </Link>
          </>
        );
      } else {
        return (
          <>
            <Link href="/membership">
              <GoldButton className="w-full sm:w-auto px-12 py-5 text-[22px] tracking-[0.2em] uppercase">
                VIEW PLANS
              </GoldButton>
            </Link>
            <Link href="/contact">
              <GhostButton variant="white" className="w-full sm:w-auto px-12 py-5 text-[22px] tracking-[0.2em] uppercase">
                BOOK A TOUR
              </GhostButton>
            </Link>
          </>
        );
      }
    }
    return (
      <>
        <Link href="/membership">
          <GoldButton className="w-full sm:w-auto px-12 py-5 text-[22px] tracking-[0.2em] uppercase">
            JOIN THE FORGE
          </GoldButton>
        </Link>
        <Link href="/contact">
          <GhostButton variant="white" className="w-full sm:w-auto px-12 py-5 text-[22px] tracking-[0.2em] uppercase">
            BOOK A TOUR
          </GhostButton>
        </Link>
      </>
    );
  };

  return (
    <section className="relative py-24 md:py-section-gap-desktop bg-background px-6 md:px-grid-margin w-full overflow-hidden flex flex-col justify-center items-center text-center">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7PV96otBPskyWgLMrT8T-tZenQxysbG9VGdRfA0rEFrzDR-YL4L4iQSewl2EU9nDzIzWFJUBhTufjoXCLO--uhrq2dVPcNVqxifmaGUmfyU33a0lsM_rtgoHcywE_YUR1DAuo8sn4gkB6cEHsDV7SNMjC47Pc20vutONObM1VXXhohTXVR7PP0ks-o-t81LRgarqVbSqj8KNN1X0y6rMjtmCua4djKXxMSNdk8g06v4onVqtxnlOsD1ypBTAotdsFPzkP8sbZk_FG"
          alt="Luxury IronForge Gym Interior"
          fill
          sizes="100vw"
          className="object-cover opacity-10 scale-105 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 w-full flex flex-col items-center gap-10">
        {/* Gold Divider Rule */}
        <ScrollReveal yOffset={10} className="w-full">
          <GoldDivider glow />
        </ScrollReveal>

        {/* Heading */}
        <ScrollReveal yOffset={30} delay={0.2}>
          <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl leading-none tracking-wider text-on-surface uppercase">
            {getHeadline()}
          </h2>
        </ScrollReveal>

        {/* Description */}
        <ScrollReveal yOffset={30} delay={0.4}>
          <p className="font-dm-sans text-sm sm:text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            {getSubtitle()}
          </p>
        </ScrollReveal>

        {/* Buttons CTA */}
        <ScrollReveal yOffset={35} delay={0.6}>
          <div className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto mt-4">
            {getCTA()}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
