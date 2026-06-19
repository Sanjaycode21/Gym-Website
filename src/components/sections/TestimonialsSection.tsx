"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/mockData";
import SectionHeading from "../ui/SectionHeading";
import ScrollReveal from "../ui/ScrollReveal";
import { AnimatePresence, motion } from "framer-motion";

export default function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[activeIdx];

  return (
    <section className="py-20 md:py-section-gap-desktop bg-background px-6 md:px-grid-margin w-full overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col gap-12 items-center">
        {/* Header */}
        <ScrollReveal yOffset={30}>
          <SectionHeading
            title={
              <>
                Member <span className="text-primary italic font-cormorant capitalize font-normal">Testimonials</span>
              </>
            }
            subtitle="MEMBER REVIEWS"
            align="center"
          />
        </ScrollReveal>

        {/* Carousel Container */}
        <ScrollReveal yOffset={40} className="w-full relative min-h-[350px] md:min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-surface-container border border-outline-variant/30 p-8 md:p-12 rounded-lg flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10 w-full"
            >
              {/* Member Avatar */}
              <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-full overflow-hidden border border-primary/30 shadow-lg">
                <Image
                  src={current.avatarUrl}
                  alt={current.name}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>

              {/* Quote Details */}
              <div className="flex-1 flex flex-col items-start gap-4">
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="font-cormorant text-xl md:text-2xl italic text-on-background leading-relaxed font-normal text-left">
                  "{current.quote}"
                </p>

                {/* Citation */}
                <div>
                  <h4 className="font-bebas text-lg tracking-wider text-primary uppercase">
                    {current.name}
                  </h4>
                  <span className="font-dm-sans text-xs text-on-surface-variant font-bold uppercase tracking-wider">
                    {current.role}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex gap-4 mt-8 justify-center">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-outline-variant hover:border-primary text-on-surface-variant hover:text-primary transition-all flex items-center justify-center cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-outline-variant hover:border-primary text-on-surface-variant hover:text-primary transition-all flex items-center justify-center cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
