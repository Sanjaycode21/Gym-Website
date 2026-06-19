"use client";

import React from "react";
import Image from "next/image";
import { Trainer } from "@/types";

interface TrainerCardProps {
  trainer: Trainer;
  onClick?: (trainerSlug: string) => void;
}

export default function TrainerCard({ trainer, onClick }: TrainerCardProps) {
  return (
    <div
      onClick={() => onClick?.(trainer.slug)}
      className={`group relative overflow-hidden bg-surface-container border h-[550px] md:h-[600px] cursor-pointer transition-all duration-500 rounded-md ${
        trainer.isFeatured
          ? "border-primary/40 shadow-[0_0_30px_rgba(201,168,76,0.1)]"
          : "border-outline-variant/30 hover:border-primary/50"
      }`}
    >
      {/* Grayscale image transition on hover */}
      <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700">
        <Image
          src={trainer.imageUrl}
          alt={trainer.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
          priority={trainer.isFeatured}
        />
      </div>

      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

      {/* Featured Badge */}
      {trainer.isFeatured && (
        <div className="absolute top-4 right-4 bg-primary text-on-primary font-dm-sans text-[10px] font-bold px-3 py-1 tracking-widest z-20 rounded-sm">
          FEATURED COACH
        </div>
      )}

      {/* Trainer Info Content */}
      <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <span className="font-dm-sans text-[11px] font-bold tracking-widest text-primary mb-2 block uppercase">
          {trainer.specialization.join(" & ")}
        </span>
        <h3 className="font-bebas text-3xl tracking-wider text-on-surface uppercase">
          {trainer.name}
        </h3>
        
        {/* Hover Bio Reveal */}
        <div className="max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-500 ease-in-out">
          <p className="font-dm-sans text-sm text-on-surface-variant leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-4 border-t border-primary/20 pt-4">
            {trainer.bio}
          </p>
        </div>
      </div>
    </div>
  );
}
