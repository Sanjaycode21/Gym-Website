import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import StatsBar from "@/components/sections/StatsBar";
import FeaturesSection from "@/components/sections/FeaturesSection";
import MembershipPreview from "@/components/sections/MembershipPreview";
import TrainersPreview from "@/components/sections/TrainersPreview";
import ClassSchedulePreview from "@/components/sections/ClassSchedulePreview";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import GalleryPreview from "@/components/sections/GalleryPreview";
import BlogPreview from "@/components/sections/BlogPreview";
import CTABanner from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "IronForge Fitness — Premium Strength & Conditioning Gym",
  description:
    "IronForge Fitness is a premium strength and conditioning gym. Train with professional-grade equipment, certified coaches, and structured programs built to help you get results.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <FeaturesSection />
      <MembershipPreview />
      <TrainersPreview />
      <ClassSchedulePreview />
      <TestimonialsSection />
      <GalleryPreview />
      <BlogPreview />
      <CTABanner />
    </>
  );
}
