"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, Instagram } from "lucide-react";
import Link from "next/link";
import { trainers } from "@/lib/mockData";
import { Trainer } from "@/types";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GoldButton from "@/components/ui/GoldButton";
import GhostButton from "@/components/ui/GhostButton";

export default function TrainersPage() {
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer>(
    trainers.find((t) => t.isFeatured) || trainers[0]
  );
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleSelectTrainer = (trainer: Trainer) => {
    setSelectedTrainer(trainer);
    setBookingSuccess(false); // Reset booking confirmation
    // Scroll spotlight section into view smoothly on mobile
    const element = document.getElementById("spotlight-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBookSession = () => {
    setBookingSuccess(true);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-10 px-6 md:px-grid-margin overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-start gap-4">
            <span className="font-dm-sans text-xs font-bold text-primary tracking-widest bg-primary/10 px-4 py-1">
              THE ELITE TEAM
            </span>
            <h1 className="font-bebas text-6xl md:text-8xl text-on-surface max-w-4xl leading-tight">
              MEET THE <span className="text-primary italic font-cormorant capitalize">Coaches</span>
            </h1>
            <div className="w-24 h-1 line-glow mt-4"></div>
          </div>
        </div>
      </section>

      {/* Trainer Grid Section */}
      <section className="py-12 px-6 md:px-grid-margin max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-gutter">
          {trainers.map((trainer, idx) => {
            const isFeatured = trainer.name === "SOFIA VALENTINE";
            const isSelected = selectedTrainer.id === trainer.id;

            return (
              <ScrollReveal key={trainer.id} delay={idx * 0.05}>
                <div
                  onClick={() => handleSelectTrainer(trainer)}
                  className={`group relative overflow-hidden bg-surface-container border h-[600px] cursor-pointer transition-all duration-500 ${
                    isSelected
                      ? "border-primary shadow-[0_0_20px_rgba(201,168,76,0.2)]"
                      : isFeatured
                      ? "border-primary/40 shadow-[0_0_30px_rgba(201,168,76,0.1)] hover:border-primary/60"
                      : "border-outline-variant/30 hover:border-primary/50"
                  }`}
                >
                  {/* Grayscale portrait transitions to color on hover */}
                  <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img
                      src={trainer.imageUrl}
                      alt={trainer.name}
                      className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                    />
                  </div>

                  {/* Shading overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80"></div>

                  {/* Sofia Badge */}
                  {isFeatured && (
                    <div className="absolute top-4 right-4 bg-primary text-on-primary font-dm-sans text-[10px] font-bold px-3 py-1 tracking-widest z-20">
                      FEATURED COACH
                    </div>
                  )}

                  {/* Info slide-up */}
                  <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="font-dm-sans text-xs font-bold text-primary mb-2 block tracking-widest uppercase">
                      {trainer.specialization.join(" & ")}
                    </span>
                    <h3 className="font-bebas text-3xl md:text-4xl text-on-surface">
                      {trainer.name}
                    </h3>
                    <p className="font-dm-sans text-sm text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-4 border-t border-primary/20 pt-4">
                      {trainer.bio}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Expanded Profile Spotlight View */}
      <section
        id="spotlight-section"
        className="py-20 bg-surface-container-low border-y border-outline-variant/30 scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-grid-margin grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          {/* Spotlight Image Container */}
          <div className="lg:col-span-5 relative mb-12 lg:mb-0">
            <div className="aspect-[4/5] bg-surface-container border border-outline-variant/20 overflow-hidden">
              <img
                src={selectedTrainer.imageUrl}
                alt={selectedTrainer.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 border border-primary/20 -z-10 bg-primary/5 hidden md:block"></div>
          </div>

          {/* Spotlight Text Container */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div>
              <div className="flex justify-between items-start">
                <span className="font-dm-sans text-xs font-bold text-primary tracking-widest mb-4 block">
                  EXPERT SPOTLIGHT
                </span>
                {selectedTrainer.instagramUrl && (
                  <a
                    href={selectedTrainer.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-on-surface-variant hover:text-primary transition-colors"
                  >
                    <Instagram size={20} />
                  </a>
                )}
              </div>
              <h2 className="font-bebas text-4xl md:text-5xl text-on-surface mb-2 tracking-wide">
                {selectedTrainer.name}
              </h2>
              {selectedTrainer.quote && (
                <p className="font-cormorant text-2xl text-primary/80 italic">
                  &ldquo;{selectedTrainer.quote}&rdquo;
                </p>
              )}
            </div>

            <div className="flex flex-col gap-6">
              {/* Bio */}
              {selectedTrainer.longBio && (
                <div className="space-y-3">
                  <h4 className="font-dm-sans text-xs font-bold text-on-surface border-b border-outline-variant/30 pb-2 uppercase tracking-widest">
                    BIOGRAPHY
                  </h4>
                  <p className="font-dm-sans text-base text-on-surface-variant leading-relaxed">
                    {selectedTrainer.longBio}
                  </p>
                </div>
              )}

              {/* Certifications */}
              {selectedTrainer.certifications && (
                <div className="space-y-3">
                  <h4 className="font-dm-sans text-xs font-bold text-on-surface border-b border-outline-variant/30 pb-2 uppercase tracking-widest">
                    CERTIFICATIONS
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTrainer.certifications.map((cert, cIdx) => (
                      <span
                        key={cIdx}
                        className="bg-primary/10 text-primary border border-primary/30 px-3 py-1 font-dm-sans text-[10px] font-bold tracking-wider uppercase rounded-sm"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Availability */}
              {selectedTrainer.schedule && (
                <div className="space-y-3">
                  <h4 className="font-dm-sans text-xs font-bold text-on-surface border-b border-outline-variant/30 pb-2 uppercase tracking-widest">
                    AVAILABILITY SCHEDULE
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedTrainer.schedule.map((slot, sIdx) => {
                      const isClosed = slot.hours.toUpperCase() === "CLOSED";
                      return (
                        <div
                          key={sIdx}
                          className={`p-3 border border-outline-variant/20 bg-surface-container text-center rounded-sm ${
                            isClosed ? "opacity-50" : ""
                          }`}
                        >
                          <span className="block font-dm-sans text-on-surface-variant text-[10px] font-bold tracking-wider">
                            {slot.days}
                          </span>
                          <span
                            className={`font-mono text-lg font-medium ${
                              isClosed ? "text-on-surface-variant" : "text-primary"
                            }`}
                          >
                            {slot.hours}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Booking Trigger */}
            <div className="pt-6 relative">
              {bookingSuccess ? (
                <div className="bg-primary/15 border border-primary/40 text-primary p-4 rounded-sm flex items-center gap-3 animate-fade-in font-dm-sans text-sm">
                  <Check size={20} className="shrink-0" />
                  <span>
                    PT Session successfully requested with {selectedTrainer.name}! Our coordinator will reach out to you shortly.
                  </span>
                </div>
              ) : (
                <button
                  onClick={handleBookSession}
                  className="bg-primary text-on-primary font-bebas text-xl md:text-2xl px-10 py-4 gold-shimmer shadow-lg flex items-center gap-4 group cursor-pointer tracking-wider"
                >
                  BOOK PT SESSION
                  <ArrowRight className="transform group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-grid-margin relative">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
          <h2 className="font-bebas text-5xl md:text-6xl text-on-surface">
            READY TO REFORGE YOURSELF?
          </h2>
          <p className="font-dm-sans text-lg text-on-surface-variant leading-relaxed max-w-2xl">
            Our elite coaching roster is currently accepting new private clients. Spaces are limited
            to ensure maximum attention to every detail of your performance journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 mt-4">
            <Link href="/contact" className="w-full sm:w-auto">
              <GoldButton className="w-full px-10 py-4 text-xl tracking-wider">
                CONSULTATION
              </GoldButton>
            </Link>
            <Link href="/membership" className="w-full sm:w-auto">
              <GhostButton variant="gold" className="w-full px-10 py-4 text-xl tracking-wider">
                VIEW PACKAGES
              </GhostButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
