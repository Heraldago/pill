"use client";

import VantaWaves from "@/components/VantaWaves";
import Navbar from "@/components/navigation/Navbar";
import ScrollSpyNav from "@/components/navigation/ScrollSpyNav";
import DesktopCardStack from "@/components/sections/DesktopCardStack";
import MobileView from "@/components/sections/MobileView";
import { usePortfolioScroll } from "@/hooks/usePortfolioScroll";

export default function Home() {
  const {
    pinnedContainerRef,
    card1Ref,
    card2Ref,
    card3Ref,
    card4Ref,
    card5Ref,
    card6Ref,
    card7Ref,
    activeSectionIndex,
    navigateToSection,
    scrollToSection,
  } = usePortfolioScroll();

  return (
    <main className="relative min-h-screen w-[100vw] overflow-x-hidden p-0 m-0 select-none bg-[#091b2e]">
      {/* Sfondo Animato 3D Vanta Waves (fixed z-0 continuo) */}
      <VantaWaves
        color={0x0b2847}
        shininess={30.0}
        waveHeight={20.0}
        waveSpeed={0.75}
        zoom={0.65}
      />

      {/* Top Navbar & Mobile Hamburger Menu */}
      <Navbar onNavigate={scrollToSection} />

      {/* Floating Pill ScrollSpy Navigation (Desktop Only) */}
      <ScrollSpyNav
        activeIndex={activeSectionIndex}
        onNavigate={navigateToSection}
      />

      {/* Desktop Stacked Cards Orchestration (>= 768px) */}
      <DesktopCardStack
        pinnedContainerRef={pinnedContainerRef}
        card1Ref={card1Ref}
        card2Ref={card2Ref}
        card3Ref={card3Ref}
        card4Ref={card4Ref}
        card5Ref={card5Ref}
        card6Ref={card6Ref}
        card7Ref={card7Ref}
        activeSectionIndex={activeSectionIndex}
        onNavigate={scrollToSection}
        onNavigateToIndex={navigateToSection}
      />

      {/* Mobile Stacked Flow (< 768px) */}
      <MobileView />
    </main>
  );
}
