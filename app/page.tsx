"use client";

import { useCallback, useRef, useState } from "react";
import VantaWaves from "@/components/VantaWaves";
import Navbar from "@/components/navigation/Navbar";
import KeycapNav from "@/components/navigation/KeycapNav";
import DesktopCardStack from "@/components/sections/DesktopCardStack";
import MobileView from "@/components/sections/MobileView";
import { usePortfolioScroll } from "@/hooks/usePortfolioScroll";

export default function Home() {
  const [toggleStates, setToggleStates] = useState<Record<number, "off" | "on">>({
    1: "off",
    2: "off",
    3: "off",
    4: "off",
    5: "off",
    6: "off",
  });

  const activeSectionIndexRef = useRef(0);

  const handleToggleChange = useCallback((sectionIndex: number, state: "off" | "on") => {
    setToggleStates((prev) => ({ ...prev, [sectionIndex]: state }));
  }, []);

  const handleHorizontalArrow = useCallback(
    (direction: "left" | "right") => {
      // Hero (0) doesn't have a toggle. Sections 1-6 have toggles.
      const curr = activeSectionIndexRef.current;
      if (curr >= 1 && curr <= 6) {
        const nextState = direction === "right" ? "on" : "off";
        setToggleStates((prev) => ({ ...prev, [curr]: nextState }));
      }
    },
    []
  );

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
  } = usePortfolioScroll(undefined, undefined, {
    onHorizontalArrow: handleHorizontalArrow,
  });

  activeSectionIndexRef.current = activeSectionIndex;

  const currentToggleState = activeSectionIndex >= 1 && activeSectionIndex <= 6
    ? toggleStates[activeSectionIndex] || "off"
    : null;

  return (
    <main className="relative min-h-screen w-full overflow-x-clip p-0 m-0 select-none bg-[#091b2e]">
      {/* Sfondo Animato 3D Vanta Waves (fixed z-0 continuo) */}
      <VantaWaves
        color={0x0b2847}
        shininess={30.0}
        waveHeight={20.0}
        waveSpeed={0.75}
        zoom={0.65}
      />

      {/* Top Navbar & Mobile Hamburger Menu */}
      <Navbar
        onNavigate={scrollToSection}
        activeSectionIndex={activeSectionIndex}
      />

      {/* Keyboard Micro-Dock Navigation (Desktop Only) */}
      <KeycapNav
        activeIndex={activeSectionIndex}
        totalSections={7}
        onNavigateNext={() => navigateToSection(activeSectionIndex + 1)}
        onNavigatePrev={() => navigateToSection(activeSectionIndex - 1)}
        onToggleOn={() => {
          if (activeSectionIndex >= 1 && activeSectionIndex <= 6) {
            handleToggleChange(activeSectionIndex, "on");
          }
        }}
        onToggleOff={() => {
          if (activeSectionIndex >= 1 && activeSectionIndex <= 6) {
            handleToggleChange(activeSectionIndex, "off");
          }
        }}
        currentToggleState={currentToggleState}
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
        toggleStates={toggleStates}
        onToggleChange={handleToggleChange}
      />

      {/* Mobile Stacked Flow (< 768px) */}
      <MobileView />
    </main>
  );
}
