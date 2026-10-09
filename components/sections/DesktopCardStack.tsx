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
}: DesktopCardStackProps) {
  return (
    <div className="hidden md:block relative w-full">
      {/* Contenitore Pinned dello Stack: bloccato a schermo durante lo scrub */}
      <div ref={pinnedContainerRef} className="relative w-full h-[100dvh] overflow-hidden">
        {/* Card 1: Intro / Hero Capsule */}
        <HeroCard
          ref={card1Ref}
          activeSectionIndex={activeSectionIndex}
          onNavigate={onNavigate}
        />

        {/* Card 2: Ungdomskort */}
        <CaseStudyCard
          ref={card2Ref}
          caseStudy={CASE_STUDIES[0]}
          zIndexClass="z-20"
          imagePadding=""
          priorityImage
        />

        {/* Card 3: X-Bit */}
        <CaseStudyCard
          ref={card3Ref}
          caseStudy={CASE_STUDIES[1]}
          zIndexClass="z-[25]"
          imagePadding="p-2 sm:p-4"
          priorityImage
        />

        {/* Card 4: I Pupi Siciliani */}
        <CaseStudyCard
          ref={card4Ref}
          caseStudy={CASE_STUDIES[2]}
          zIndexClass="z-[30]"
          imagePadding="p-2 sm:p-4"
        />

        {/* Card 5: About Me */}
        <AboutCard
          ref={card5Ref}
          onContactClick={() => onNavigateToIndex(6)}
        />

        {/* Card 6: Kind Words / Recommendations */}
        <RecommendationsCard
          ref={card6Ref}
          onContactClick={() => onNavigateToIndex(6)}
        />

        {/* Card 7: Contact */}
        <ContactCard ref={card7Ref} />
      </div>
    </div>
  );
}
