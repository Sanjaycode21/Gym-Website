"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import GoldButton from "../ui/GoldButton";
import GhostButton from "../ui/GhostButton";
import { useAuth } from "@/components/providers/AuthProvider";

export default function HeroSection() {
  const { user, membership, loading } = useAuth();

  const hasMembership = membership && membership.status === "ACTIVE";

  const headline = user
    ? `WELCOME BACK, ${user.name.split(" ")[0]}`
    : "DEFINING THE NEW STANDARD IN HUMAN PERFORMANCE";
  const words = headline.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.2, 0.8, 0.2, 1],
      },
    },
  };

  const getSubtitle = () => {
    if (loading) return "";
    if (user) {
      if (hasMembership) {
        return `Your training schedule is live. You are subscribed to the ${membership?.plan?.name || "active"} tier. Access your stats and bookings from your member dashboard.`;
      } else {
        return "You don't have an active membership yet. Select one of our athletic plans to start your training legacy.";
      }
    }
    return "An elite training environment designed for those who demand absolute mechanical precision and premium recovery. Break boundaries. Forge your legacy.";
  };

  const getCTA = () => {
    if (loading) return null;
    if (user) {
      if (hasMembership) {
        return (
          <>
            <Link href="/dashboard">
              <GoldButton className="w-full sm:w-auto tracking-[0.2em] px-12 py-5 text-[20px] uppercase">
                GO TO DASHBOARD
              </GoldButton>
            </Link>
            <Link href="/classes">
              <GhostButton variant="white" className="w-full sm:w-auto tracking-[0.2em] px-12 py-5 text-[20px] uppercase">
                BOOK CLASSES
              </GhostButton>
            </Link>
          </>
        );
      } else {
        return (
          <>
            <Link href="/membership">
              <GoldButton className="w-full sm:w-auto tracking-[0.2em] px-12 py-5 text-[20px] uppercase">
                VIEW MEMBERSHIP PLANS
              </GoldButton>
            </Link>
            <Link href="/contact">
              <GhostButton variant="white" className="w-full sm:w-auto tracking-[0.2em] px-12 py-5 text-[20px] uppercase">
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
          <GoldButton className="w-full sm:w-auto tracking-[0.2em] px-12 py-5 text-[20px] uppercase">
            JOIN THE FORGE
          </GoldButton>
        </Link>
        <Link href="/contact">
          <GhostButton variant="white" className="w-full sm:w-auto tracking-[0.2em] px-12 py-5 text-[20px] uppercase">
            BOOK A TOUR
          </GhostButton>
        </Link>
      </>
    );
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-background px-6 md:px-grid-margin overflow-hidden py-32">
      {/* Background Image with Dark & Gold Gradients */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7PV96otBPskyWgLMrT8T-tZenQxysbG9VGdRfA0rEFrzDR-YL4L4iQSewl2EU9nDzIzWFJUBhTufjoXCLO--uhrq2dVPcNVqxifmaGUmfyU33a0lsM_rtgoHcywE_YUR1DAuo8sn4gkB6cEHsDV7SNMjC47Pc20vutONObM1VXXhohTXVR7PP0ks-o-t81LRgarqVbSqj8KNN1X0y6rMjtmCua4djKXxMSNdk8g06v4onVqtxnlOsD1ypBTAotdsFPzkP8sbZk_FG"
          alt="IronForge Gym Background"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col items-start gap-8 mt-12">
        {/* Kicker */}
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-dm-sans text-xs font-bold text-primary tracking-[0.4em] bg-primary/10 px-4 py-1.5 rounded-sm uppercase"
        >
          {user ? `MEMBER STATE: ${hasMembership ? "ACTIVE" : "REGISTERED"}` : "LUXURY MEETS RAW INTENSITY"}
        </motion.span>

        {/* Staggered Word Reveal Heading */}
        <motion.h1
          key={headline}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-bebas text-6xl sm:text-7xl md:text-8xl leading-[0.9] text-on-background tracking-wider max-w-5xl text-left uppercase"
        >
          {words.map((word, idx) => (
            <span key={idx} className="inline-block mr-4 overflow-hidden">
              <motion.span variants={wordVariants} className="inline-block">
                {word === "HUMAN" || word === "PERFORMANCE" ? (
                  <span className="text-primary italic font-cormorant capitalize tracking-normal font-normal pr-1">
                    {word.toLowerCase()}
                  </span>
                ) : (
                  word
                )}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          key={getSubtitle()}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-dm-sans text-sm sm:text-base md:text-lg text-on-surface-variant max-w-2xl leading-relaxed text-left"
        >
          {getSubtitle()}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4"
        >
          {getCTA()}
        </motion.div>
      </div>

      {/* Aesthetic Floating Grid Accent */}
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />
    </section>
  );
}
