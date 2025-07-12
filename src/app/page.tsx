"use client";

import { useState, lazy, Suspense } from "react";
import StickyContactButton from "@/components/StickyContactButton";
import HeroSection from "@/components/sections/HeroSection";
import ErrorBoundary from "@/components/ErrorBoundary";
import Loading from "@/components/Loading";
import { services } from "@/lib/services";
import { useLenis } from "@/components/LenisProvider";

// Dynamic imports for better code splitting
const TextSection = lazy(() => import("@/components/sections/TextSection"));
const ServicesSection = lazy(
  () => import("@/components/sections/ServicesSection")
);
const GridSection = lazy(() => import("@/components/sections/GridSection"));
const VideoSection = lazy(() => import("@/components/sections/VideoSection"));
const ContactSection = lazy(
  () => import("@/components/sections/ContactSection")
);

export default function Home() {
  const { scrollTo } = useLenis();
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

      if (contactSection) {
        scrollTo(contactSection as HTMLElement, { offset: 0, duration: 1.2 });
      }
    }, 100);
  };

  return (
    <ErrorBoundary>
      {/* Sticky Contact Button - sibling to main content, not inside sections */}
      <StickyContactButton
        selectedServices={selectedServiceIndices.map(
          (index) => services[index] || `Service ${index + 1}`
        )}
        onContactClick={handleContactClick}
      />

      <main className="min-h-screen">
        {/* Hero section loads immediately */}
        <HeroSection />

        {/* Other sections load with Suspense for better performance */}
        <Suspense
          fallback={<Loading className="py-16" text="Loading content..." />}
        >
          <TextSection />
        </Suspense>

        <Suspense
          fallback={<Loading className="py-16" text="Loading services..." />}
        >
          <ServicesSection
            selectedServiceIndices={selectedServiceIndices}
            onServiceSelectionChange={handleServiceSelectionChange}
          />
        </Suspense>

        <Suspense
          fallback={<Loading className="py-16" text="Loading portfolio..." />}
        >
          <GridSection />
        </Suspense>

        <Suspense
          fallback={<Loading className="py-16" text="Loading video..." />}
        >
          <VideoSection />
        </Suspense>

        <Suspense
          fallback={
            <Loading className="py-16" text="Loading contact form..." />
          }
        >
          <ContactSection preSelectedServices={selectedServicesForContact} />
        </Suspense>
      </main>
    </ErrorBoundary>
  );
}
