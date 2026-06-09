"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/lib/mockData";
import SectionHeading from "../ui/SectionHeading";
import ScrollReveal from "../ui/ScrollReveal";

export default function BlogPreview() {
  return (
    <section className="py-20 md:py-section-gap-desktop bg-background px-6 md:px-grid-margin w-full">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <ScrollReveal yOffset={30}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeading
              title={
                <>
                  Latest <span className="text-primary italic font-cormorant capitalize font-normal">Articles</span>
                </>
              }
              subtitle="INSIGHTS & INTEL"
            />
            <Link
              href="#"
              className="font-dm-sans text-xs font-bold tracking-widest text-primary hover:text-white underline underline-offset-8 decoration-primary/45 hover:decoration-white transition-all uppercase whitespace-nowrap self-start md:self-end"
            >
              VIEW ALL ARTICLES
            </Link>
          </div>
        </ScrollReveal>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {blogPosts.map((post, idx) => (
            <ScrollReveal
              key={post.id}
              delay={idx * 0.1}
              yOffset={40}
              duration={0.6}
            >
              <article className="group bg-surface-container border border-outline-variant/30 rounded-lg overflow-hidden flex flex-col hover:border-primary/50 hover:shadow-card-hover transition-all duration-300 h-full">
                {/* Image Wrap */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                  />
                  {/* Category Tag */}
                  <div className="absolute top-4 left-4 bg-primary text-on-primary font-dm-sans text-[10px] font-bold px-3 py-1 tracking-widest rounded-sm uppercase">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1 gap-6 justify-between">
                  <div className="space-y-4">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs font-bold tracking-wider font-dm-sans text-on-surface-variant/60 uppercase">
                      <span>{post.publishedAt}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                      <span>{post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bebas text-2xl md:text-3xl tracking-wide text-on-surface group-hover:text-primary transition-colors leading-tight uppercase">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="font-dm-sans text-sm text-on-surface-variant leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Author Citations */}
                  <div className="pt-6 border-t border-outline-variant/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-primary/20">
                        <Image
                          src={post.author.imageUrl}
                          alt={post.author.name}
                          fill
                          sizes="32px"
                          className="object-cover"
                        />
                      </div>
                      <span className="font-dm-sans text-xs font-bold text-on-surface">
                        {post.author.name}
                      </span>
                    </div>
                    
                    <span className="text-primary group-hover:text-white transition-colors flex items-center gap-1 font-dm-sans text-xs font-bold tracking-widest uppercase">
                      READ POST <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
