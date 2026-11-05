"use client";

import { Ref } from "react";
import { useLiveContent } from "@/contexts/LiveContentContext";

interface HeroCardProps {
  ref?: Ref<HTMLDivElement>;
  activeSectionIndex?: number;
  onNavigate?: (target: "home" | "work" | "about" | "contact") => void;
}

export default function HeroCard({ ref }: HeroCardProps) {
  const { content, isEditMode, updateHero } = useLiveContent();
  const { hero, theme } = content;

  return (
    <div
      ref={ref}
      className="capsule-card-wrapper relative w-full h-[100dvh] shrink-0 flex items-center justify-center p-2.5 sm:p-4 md:p-0 z-10"
    >
      <section
        style={{
          backgroundColor: `rgba(255, 255, 255, ${theme?.glassOpacity ?? 0.12})`,
          borderColor: `rgba(255, 255, 255, ${theme?.borderOpacity ?? 0.25})`,
        }}
        className="capsule-card-section relative w-full h-full rounded-[32px] sm:rounded-[48px] md:rounded-[1000px] border-[2px] sm:border-[3px] overflow-hidden flex flex-col justify-between items-center shadow-[0_25px_65px_rgba(0,10,30,0.45),_inset_0_1.5px_2px_rgba(255,255,255,0.45)]"
      >
        {/* Header interno alla pillola */}
        <header className="w-full shrink-0 pt-3 sm:pt-4 md:pt-5 pb-1 flex justify-center items-center z-10 h-8 md:h-10" />

        {/* Contenuto centrale: Tipografia allineata a sinistra posizionata centralmente senza sovrapposizione */}
        <div className="w-full flex-1 min-h-0 flex flex-col justify-center items-center px-8 sm:px-12 md:px-16 lg:px-24 xl:px-32 max-w-6xl my-auto">
          <div className="w-full text-left space-y-2.5 sm:space-y-4 md:space-y-5">
            <p
              contentEditable={isEditMode}
              suppressContentEditableWarning
              onBlur={(e) => updateHero({ greeting: e.currentTarget.textContent || "" })}
              className={`text-base sm:text-lg md:text-xl lg:text-2xl font-normal text-cyan-200/90 tracking-tight ${
                isEditMode
                  ? "hover:outline hover:outline-dashed hover:outline-cyan-400/50 rounded px-1 -mx-1 cursor-text"
                  : ""
              }`}
            >
              {hero.greeting}
            </p>
            <h1 className="text-2xl sm:text-4xl md:text-[clamp(2.2rem,4vw,4.8rem)] font-medium tracking-[-0.025em] text-white leading-[1.14] sm:leading-[1.1]">
              <span>{hero.prefix}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-sky-300 to-cyan-400 font-semibold">
                {hero.highlight1}
              </span>
              <span>{hero.middle}</span>
              <span className="italic font-serif font-normal text-white">{hero.highlight2}</span>
              <span>{hero.conjunction}</span>
              <span className="italic font-serif font-normal text-white">{hero.highlight3}</span>
              <span>{hero.suffix}</span>
            </h1>
          </div>
        </div>

        {/* Footer interno alla pillola: bilanciamento verticale minimale senza rubare spazio */}
        <footer className="w-full shrink-0 pb-3 sm:pb-5 md:pb-6 px-8 flex justify-center items-center z-10" />
      </section>
    </div>
  );
}
