"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { trainers } from "@/lib/mockData";
import SectionHeading from "../ui/SectionHeading";
import TrainerCard from "../ui/TrainerCard";
import ScrollReveal from "../ui/ScrollReveal";

export default function TrainersPreview() {
  const router = useRouter();
  // Show first 3 coaches on homepage preview
  const featuredCoaches = trainers.slice(0, 3);

  const handleTrainerClick = () => {
    router.push("/trainers");
  };

  return (
    <section className="py-20 md:py-section-gap-desktop bg-background px-6 md:px-grid-margin w-full">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <ScrollReveal yOffset={30}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeading
              title={
                <>
                  MEET THE <span className="text-primary italic font-cormorant capitalize font-normal">Coaches</span>
                </>
              }
              subtitle="EXPERIENCED COACHES"
            />
            <Link
              href="/trainers"
              className="font-dm-sans text-xs font-bold tracking-widest text-primary hover:text-white underline underline-offset-8 decoration-primary/45 hover:decoration-white transition-all uppercase whitespace-nowrap self-start md:self-end"
            >
              VIEW ALL COACHES
            </Link>
          </div>
        </ScrollReveal>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {featuredCoaches.map((trainer, idx) => (
            <ScrollReveal
              key={trainer.id}
              delay={idx * 0.1}
              yOffset={40}
              duration={0.6}
            >
              <TrainerCard trainer={trainer} onClick={handleTrainerClick} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
