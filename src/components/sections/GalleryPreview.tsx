"use client";

import React, { useState } from "react";
import Image from "next/image";
import { galleryItems } from "@/lib/mockData";
import SectionHeading from "../ui/SectionHeading";
import ScrollReveal from "../ui/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["ALL", "EQUIPMENT", "CLASSES"];

export default function GalleryPreview() {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filteredItems =
    activeCategory === "ALL"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section className="py-20 md:py-section-gap-desktop bg-surface-container-lowest px-6 md:px-grid-margin w-full">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <ScrollReveal yOffset={30}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeading
              title={
                <>
                  THE FORGE <span className="text-primary italic font-cormorant capitalize font-normal">Gallery</span>
                </>
              }
              subtitle="VISUAL TOUR"
            />

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-dm-sans text-xs font-bold tracking-widest px-6 py-2 border transition-all cursor-pointer rounded-sm uppercase ${
                    activeCategory === cat
                      ? "bg-primary text-on-primary border-primary"
                      : "border-outline-variant/30 text-on-surface-variant hover:border-primary hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-gutter"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                key={item.id}
                className="group relative h-96 overflow-hidden rounded-md border border-outline-variant/20 bg-surface-container cursor-pointer"
              >
                {/* Image */}
                <Image
                  src={item.imageUrl}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Caption Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="font-dm-sans text-[10px] font-bold text-primary tracking-widest uppercase mb-2">
                    {item.category}
                  </span>
                  <h3 className="font-bebas text-2xl tracking-wider text-on-surface uppercase transform group-hover:translate-x-2 transition-transform duration-300">
                    {item.title}
                  </h3>
                  <p className="font-dm-sans text-sm text-on-surface-variant/80 max-w-sm mt-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {item.alt}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
