"use client";

import { Ref } from "react";
import { CASE_STUDIES } from "@/data/portfolio";
import HeroCard from "@/components/cards/desktop/HeroCard";
import CaseStudyCard from "@/components/cards/desktop/CaseStudyCard";
import AboutCard from "@/components/cards/desktop/AboutCard";
import RecommendationsCard from "@/components/cards/desktop/RecommendationsCard";
import ContactCard from "@/components/cards/desktop/ContactCard";

interface DesktopCardStackProps {
  pinnedContainerRef: Ref<HTMLDivElement>;
  card1Ref: Ref<HTMLDivElement>;
  card2Ref: Ref<HTMLDivElement>;
  card3Ref: Ref<HTMLDivElement>;
  card4Ref: Ref<HTMLDivElement>;
  card5Ref: Ref<HTMLDivElement>;
  card6Ref: Ref<HTMLDivElement>;
  card7Ref: Ref<HTMLDivElement>;
  activeSectionIndex: number;
  onNavigate: (target: "home" | "work" | "about" | "contact") => void;
  onNavigateToIndex: (index: number) => void;
  toggleStates: Record<number, "off" | "on">;
  onToggleChange: (sectionIndex: number, state: "off" | "on") => void;
}

function getCardState(cardIndex: number, activeIndex: number) {
  const diff = cardIndex - activeIndex;
  if (diff === 0) return "active";
  if (diff === -1) return "prev";
  if (diff === 1) return "next";
  return diff < -1 ? "far-prev" : "far-next";
}

export default function DesktopCardStack({
  pinnedContainerRef,
  card1Ref,
  card2Ref,
  card3Ref,
  card4Ref,
  card5Ref,
  card6Ref,
  card7Ref,
  activeSectionIndex,
  onNavigate,
  onNavigateToIndex,
  toggleStates,
  onToggleChange,
}: DesktopCardStackProps) {
  return (
    <div className="hidden md:block fixed inset-0 w-screen h-[100dvh] overflow-hidden">
      {/* Stage 3D fisso 100% schermo: ogni pillola ruota nel portale 3D una alla volta */}
      <div
        ref={pinnedContainerRef}
        className="warp-stage-3d relative w-full h-[100dvh] overflow-hidden"
      >
        {/* Card 1: Intro / Hero Capsule */}
        <div className="warp-card-node" data-card-state={getCardState(0, activeSectionIndex)}>
          <HeroCard
            ref={card1Ref}
            activeSectionIndex={activeSectionIndex}
            onNavigate={onNavigate}
          />
        </div>

        {/* Card 2: Ungdomskort */}
        <div className="warp-card-node" data-card-state={getCardState(1, activeSectionIndex)}>
          <CaseStudyCard
            ref={card2Ref}
            caseStudy={CASE_STUDIES[0]}
            zIndexClass="z-20"
            imagePadding=""
            priorityImage
            toggleState={toggleStates[1] || "off"}
            onToggleChange={(s) => onToggleChange(1, s)}
          />
        </div>

        {/* Card 3: X-Bit */}
        <div className="warp-card-node" data-card-state={getCardState(2, activeSectionIndex)}>
          <CaseStudyCard
            ref={card3Ref}
            caseStudy={CASE_STUDIES[1]}
            zIndexClass="z-[25]"
            imagePadding="p-2 sm:p-4"
            priorityImage
            toggleState={toggleStates[2] || "off"}
            onToggleChange={(s) => onToggleChange(2, s)}
          />
        </div>

        {/* Card 4: I Pupi Siciliani */}
        <div className="warp-card-node" data-card-state={getCardState(3, activeSectionIndex)}>
          <CaseStudyCard
            ref={card4Ref}
            caseStudy={CASE_STUDIES[2]}
            zIndexClass="z-[30]"
            imagePadding="p-2 sm:p-4"
            toggleState={toggleStates[3] || "off"}
            onToggleChange={(s) => onToggleChange(3, s)}
          />
        </div>

        {/* Card 5: About Me */}
        <div className="warp-card-node" data-card-state={getCardState(4, activeSectionIndex)}>
          <AboutCard
            ref={card5Ref}
            onContactClick={() => onNavigateToIndex(6)}
            toggleState={toggleStates[4] || "off"}
            onToggleChange={(s) => onToggleChange(4, s)}
          />
        </div>

        {/* Card 6: Kind Words / Recommendations */}
        <div className="warp-card-node" data-card-state={getCardState(5, activeSectionIndex)}>
          <RecommendationsCard
            ref={card6Ref}
            onContactClick={() => onNavigateToIndex(6)}
            toggleState={toggleStates[5] || "off"}
            onToggleChange={(s) => onToggleChange(5, s)}
          />
        </div>

        {/* Card 7: Contact */}
        <div className="warp-card-node" data-card-state={getCardState(6, activeSectionIndex)}>
          <ContactCard
            ref={card7Ref}
            toggleState={toggleStates[6] || "off"}
            onToggleChange={(s) => onToggleChange(6, s)}
          />
        </div>
      </div>
    </div>
  );
}
