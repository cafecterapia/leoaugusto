"use client";

import { useState } from "react";
import SmoothScroller from "@/components/SmoothScroller";
import HeroSection from "@/components/sections/HeroSection";
import TextSection from "@/components/sections/TextSection";
import ServicesSection from "@/components/sections/ServicesSection";
import GridSection from "@/components/sections/GridSection";
import VideoSection from "@/components/sections/VideoSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  const [selectedServicesForContact, setSelectedServicesForContact] = useState<
    string[]
  >([]);

  const handleContactWithServices = (services: string[]) => {
    setSelectedServicesForContact(services);
  };

  return (
    <>
      <SmoothScroller />
      <div className="min-h-screen">
        <HeroSection />
        <TextSection />
        <ServicesSection onContactWithServices={handleContactWithServices} />
        <GridSection />
        <VideoSection />
        <ContactSection preSelectedServices={selectedServicesForContact} />
      </div>
    </>
  );
}
