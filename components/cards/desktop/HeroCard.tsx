"use client";

import { Ref } from "react";

interface HeroCardProps {
  ref?: Ref<HTMLDivElement>;
  activeSectionIndex: number;
  onNavigate: (target: "home" | "work" | "about" | "contact") => void;
}

export default function HeroCard({ ref, activeSectionIndex, onNavigate }: HeroCardProps) {
  return (
    <div
      ref={ref}
      className="capsule-card-wrapper absolute inset-0 w-full h-full flex items-center justify-center p-2.5 sm:p-4 md:p-0 z-10 will-change-transform origin-center"
    >
      <section className="capsule-card-section relative w-full h-full rounded-[32px] sm:rounded-[48px] md:rounded-[1000px] border-[2px] sm:border-[3px] border-white/25 bg-white/[0.12] overflow-hidden flex flex-col justify-between items-center shadow-[0_25px_65px_rgba(0,10,30,0.45),_inset_0_1.5px_2px_rgba(255,255,255,0.45)]">
        {/* Header interno alla pillola: Navbar a 4 voci */}
        <header className="w-full shrink-0 pt-4 sm:pt-6 md:pt-7 pb-1 sm:pb-2 flex justify-center items-center z-10">
          <nav className="hidden md:flex items-center gap-1 bg-white/15 backdrop-blur-xl border border-white/25 p-1.5 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.15),_inset_0_1px_1px_rgba(255,255,255,0.3)] text-xs sm:text-sm">
            <button
              onClick={() => onNavigate("home")}
              className={`px-4 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                activeSectionIndex === 0
                  ? "bg-white text-slate-900 font-semibold shadow-xs"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate("work")}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                activeSectionIndex >= 1 && activeSectionIndex <= 3
                  ? "bg-white text-slate-900 font-semibold shadow-xs"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Work &amp; Archive
            </button>
            <button
              onClick={() => onNavigate("about")}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                activeSectionIndex === 4
                  ? "bg-white text-slate-900 font-semibold shadow-xs"
                  : "text-white/80 hover:text-white"
              }`}
            >
              About
            </button>
            <button
              onClick={() => onNavigate("contact")}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                activeSectionIndex === 6
                  ? "bg-white text-slate-900 font-semibold shadow-xs"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Contact
            </button>
          </nav>
        </header>

        {/* Contenuto centrale: Tipografia allineata a sinistra posizionata centralmente senza sovrapposizione */}
        <div className="w-full flex-1 min-h-0 flex flex-col justify-center items-center px-8 sm:px-12 md:px-16 lg:px-24 xl:px-32 max-w-5xl my-auto">
          <div className="w-full text-left space-y-2 sm:space-y-3 md:space-y-4">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-cyan-200/90 tracking-tight">
              Hi, I&apos;m Herald :)
            </p>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.8rem] xl:text-[4.2rem] font-medium tracking-[-0.025em] text-white leading-[1.16] sm:leading-[1.12] drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
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
