"use client";

import SmoothScroller from "@/components/SmoothScroller";
import HeroSection from "@/components/sections/HeroSection";
import TextSection from "@/components/sections/TextSection";
import GridSection from "@/components/sections/GridSection";
import VideoSection from "@/components/sections/VideoSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <SmoothScroller />
      <div className="min-h-screen">
        <HeroSection />
        <TextSection />
        <GridSection />
        <VideoSection />
        <ContactSection />
      </div>
    </>
  );
}
