"use client";

import { Ref } from "react";

interface HeroCardProps {
  ref?: Ref<HTMLDivElement>;
  activeSectionIndex?: number;
  onNavigate?: (target: "home" | "work" | "about" | "contact") => void;
}

export default function HeroCard({ ref }: HeroCardProps) {
  return (
    <div
      ref={ref}
      className="capsule-card-wrapper absolute inset-0 w-full h-full flex items-center justify-center p-2.5 sm:p-4 md:p-0 z-10 will-change-transform origin-center"
    >
      <section className="capsule-card-section relative w-full h-full rounded-[32px] sm:rounded-[48px] md:rounded-[1000px] border-[2px] sm:border-[3px] border-white/25 bg-white/[0.12] overflow-hidden flex flex-col justify-between items-center shadow-[0_25px_65px_rgba(0,10,30,0.45),_inset_0_1.5px_2px_rgba(255,255,255,0.45)]">
        {/* Header interno alla pillola: Spazio dedicato alla Navbar globale floating */}
        <header className="w-full shrink-0 pt-4 sm:pt-6 md:pt-7 pb-1 sm:pb-2 flex justify-center items-center z-10 h-14 md:h-16" />

        {/* Contenuto centrale: Tipografia allineata a sinistra posizionata centralmente senza sovrapposizione */}
        <div className="w-full flex-1 min-h-0 flex flex-col justify-center items-center px-8 sm:px-12 md:px-16 lg:px-24 xl:px-32 max-w-5xl my-auto">
          <div className="w-full text-left space-y-2 sm:space-y-3 md:space-y-4">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-cyan-200/90 tracking-tight">
              Hi, I&apos;m Herald :)
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-[clamp(1.75rem,3.4vw,4.2rem)] font-medium tracking-[-0.025em] text-white leading-[1.16] sm:leading-[1.12] drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
              I <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-sky-300 to-cyan-400 font-semibold drop-shadow-[0_0_20px_rgba(0,212,255,0.4)]">design</span> digital
              products that{" "}
              <span className="italic font-serif font-normal text-white">help</span> and{" "}
              <span className="italic font-serif font-normal text-white">simplify</span>{" "}
              people&apos;s lives
            </h1>
          </div>
        </div>

        {/* Footer interno alla pillola: bilanciamento verticale minimale senza rubare spazio */}
        <footer className="w-full shrink-0 pb-3 sm:pb-5 md:pb-6 px-8 flex justify-center items-center z-10" />
      </section>
    </div>
  );
}
