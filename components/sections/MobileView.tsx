"use client";

import { useLiveContent } from "@/contexts/LiveContentContext";
import MobileHero from "@/components/cards/mobile/MobileHero";
import MobileCaseStudyCard from "@/components/cards/mobile/MobileCaseStudyCard";
import MobileAboutCard from "@/components/cards/mobile/MobileAboutCard";
import MobileRecommendationsCard from "@/components/cards/mobile/MobileRecommendationsCard";
import MobileContactCard from "@/components/cards/mobile/MobileContactCard";

export default function MobileView() {
  const { content } = useLiveContent();

  return (
    <div className="block md:hidden relative w-full z-10 px-0 pt-[max(5.5rem,calc(env(safe-area-inset-top)+4.5rem))] pb-[max(5rem,calc(env(safe-area-inset-bottom)+2rem))] flex flex-col gap-0">
      {/* 1. Hero: 3 Stacked Translucent Glass Capsules */}
      <MobileHero />

      {/* 2. Work: Dynamic Horizontal Switch Pills */}
      <section id="mobile-work" className="w-full flex flex-col gap-0">
        {content.caseStudies.map((study, idx) => (
          <MobileCaseStudyCard
            key={study.id}
            caseStudy={study}
            priorityImage={idx === 0}
          />
        ))}
      </section>

      {/* 3. About Me: Horizontal Pill Switch */}
      <MobileAboutCard />

      {/* 4. Recommendations: Horizontal Pill Switch */}
      <MobileRecommendationsCard />

      {/* 5. Contact: Horizontal Pill Switch */}
      <MobileContactCard />
    </div>
  );
}
