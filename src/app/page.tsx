"use client";

import { useState } from "react";
import StickyContactButton from "@/components/StickyContactButton";
import HeroSection from "@/components/sections/HeroSection";
import TextSection from "@/components/sections/TextSection";
import VideoSection from "@/components/sections/VideoSection";
import ContactSection from "@/components/sections/ContactSection";
import ServicesSection from "@/components/sections/ServicesSection";
import GridSection from "@/components/sections/GridSection";
import { services } from "@/lib/services";
import { useLenis } from "lenis/react";

export default function Home() {
  const lenis = useLenis();

  const [selectedServicesForContact, setSelectedServicesForContact] = useState<
    string[]
  >([]);
  const [selectedServiceIndices, setSelectedServiceIndices] = useState<
    number[]
  >([]);

  const handleContactWithServices = (services: string[]) => {
    setSelectedServicesForContact(services);
  };

  const handleServiceSelectionChange = (indices: number[]) => {
    setSelectedServiceIndices(indices);
  };

  const handleContactClick = () => {
    // Get the actual selected services using the services array
    const selectedServices = selectedServiceIndices.map(
      (index) => services[index] || `Service ${index + 1}`
    );

    // Call the callback with selected services first
    handleContactWithServices(selectedServices);

    // Clear selected indices to hide the button and unselect boxes
    setSelectedServiceIndices([]);

    // Small delay to ensure state updates, then scroll
    setTimeout(() => {
      const contactSection =
        document.querySelector("#contact-section") ||
        document.querySelector('section:has([id="contact-form"])') ||
        document.querySelector('[id*="contact"]') ||
        document.querySelector("section:last-of-type");

      if (contactSection && lenis) {
        lenis.scrollTo(contactSection as HTMLElement, {
          offset: 0,
          duration: 1.2,
        });
      }
    }, 100);
  };

  return (
    <>
      {/* Sticky Contact Button - sibling to main content, not inside sections */}
      <StickyContactButton
        selectedServices={selectedServiceIndices.map(
          (index) => services[index] || `Service ${index + 1}`
        )}
        onContactClick={handleContactClick}
      />

      <main className="min-h-screen relative">
        {/* Hero section */}
        <HeroSection />

        <TextSection />

        <ServicesSection
          selectedServiceIndices={selectedServiceIndices}
          onServiceSelectionChange={handleServiceSelectionChange}
        />

        <GridSection />

        <VideoSection />

        <ContactSection preSelectedServices={selectedServicesForContact} />
      </main>
    </>
  );
}
