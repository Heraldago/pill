"use client";

import { Ref, useRef, useState } from "react";
import Image from "next/image";
import VantaKnobWaves from "@/components/VantaKnobWaves";
import { CaseStudy } from "@/data/portfolio";

interface CaseStudyCardProps {
  ref?: Ref<HTMLDivElement>;
  caseStudy: CaseStudy;
  zIndexClass: string;
  imagePadding?: string;
  priorityImage?: boolean;
}

export default function CaseStudyCard({
  ref,
  caseStudy,
  zIndexClass,
  imagePadding = "p-2 sm:p-4",
  priorityImage = false,
}: CaseStudyCardProps) {
  const [toggleState, setToggleState] = useState<"off" | "on">("off");
  const [hasToggledOnce, setHasToggledOnce] = useState(false);
  const touchStartYRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartYRef.current === null) return;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;
    touchStartYRef.current = null;
    if (deltaY > 35) {
      setHasToggledOnce(true);
      setToggleState("on");
    } else if (deltaY < -35) {
      setHasToggledOnce(true);
      setToggleState("off");
    }
  };

  const handleToggle = () => {
    setHasToggledOnce(true);
    setToggleState((prev) => (prev === "off" ? "on" : "off"));
  };

  const isToggledOn = toggleState === "on";
  const displayImage = isToggledOn && caseStudy.imageOn ? caseStudy.imageOn : caseStudy.imageOff;

  return (
    <div
      ref={ref}
      className={`capsule-card-wrapper absolute inset-0 w-full h-full flex items-center justify-center p-2.5 sm:p-4 md:p-0 ${zIndexClass} will-change-transform`}
    >
      <section
        className={`capsule-card-section relative w-full h-full rounded-[32px] sm:rounded-[48px] md:rounded-[1000px] border-[2px] sm:border-[3px] transition-all duration-500 overflow-hidden flex items-center justify-center p-0 ${
          !isToggledOn
            ? "border-white/25 bg-transparent shadow-[0_25px_65px_rgba(0,10,30,0.45),_inset_0_1.5px_2px_rgba(255,255,255,0.45)]"
            : "border-white bg-white shadow-[0_25px_65px_rgba(0,10,30,0.35)]"
        }`}
      >
        <div
          role="switch"
          aria-checked={isToggledOn}
          tabIndex={0}
          aria-label={
            !isToggledOn
              ? `Attiva dettagli del case study ${caseStudy.title}`
              : `Torna alla copertina del case study ${caseStudy.title}`
          }
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={handleToggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleToggle();
            }
          }}
          style={
            {
              "--knob-pad": "clamp(8px, 1.6cqw, 18px)",
              "--travel-dist": "calc(100cqw - 100% - 2 * var(--knob-pad))",
            } as React.CSSProperties
          }
          className={`group relative w-full h-full rounded-[26px] sm:rounded-[40px] md:rounded-[1000px] [container-type:inline-size] cursor-pointer select-none overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.988] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 ${
            !isToggledOn
              ? "bg-black/20 backdrop-blur-md shadow-[inset_0_4px_24px_rgba(0,10,30,0.5),_inset_0_1px_2px_rgba(255,255,255,0.2)]"
              : "bg-white shadow-none"
          }`}
        >
          {/* 1. STATO ATTIVO (ON): Dettagli a Sinistra */}
          <div
            className={`absolute top-0 left-[5%] w-[44%] h-full flex flex-col justify-center px-4 sm:px-6 md:px-0 space-y-2 sm:space-y-4 md:space-y-5 overflow-y-auto [scrollbar-width:none] transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
              isToggledOn
                ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                : "opacity-0 scale-95 -translate-x-12 pointer-events-none"
            }`}
          >
            <div>
              <span className="text-xs sm:text-sm font-bold text-blue-600 tracking-wider uppercase mb-1 block">
                {caseStudy.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-[clamp(1.5rem,3.2cqw,3.5rem)] font-bold text-slate-900 tracking-tight leading-tight">
                {caseStudy.title}
              </h2>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-700 font-normal leading-snug mt-1 sm:mt-2 max-w-xl">
                {caseStudy.desktopSubtitle}
              </p>
            </div>

            {/* Pulsante primario scuro */}
            <div className="pt-0.5 sm:pt-2">
              <a
                href={caseStudy.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="inline-flex items-center gap-1.5 px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-full bg-slate-900 hover:bg-black active:scale-95 text-white text-xs sm:text-sm font-semibold shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition-all cursor-pointer"
              >
                <span>See more</span>
                <span className="text-xs font-bold">↗</span>
              </a>
            </div>
          </div>

          {/* 2. STATO SPENTO (OFF): Titolo a Destra */}
          <div
            className={`absolute top-0 right-[4%] w-[44%] h-full flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
              !isToggledOn
                ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                : "opacity-0 scale-75 translate-x-12 pointer-events-none"
            }`}
          >
            <div className="flex flex-col items-center justify-center text-center px-4 max-w-lg select-none pointer-events-none">
              <h3 className="text-[clamp(1.5rem,3.8cqw,3.75rem)] font-bold tracking-tight text-white/95 group-hover:text-white transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                {caseStudy.title}
              </h3>
            </div>
          </div>

          {/* 3. IL KNOB DEL TOGGLE: Perfettamente Circolare (aspect-square) */}
          <div
            className={`absolute top-[var(--knob-pad)] bottom-[var(--knob-pad)] left-[var(--knob-pad)] h-[calc(100%-2*var(--knob-pad))] aspect-square w-auto rounded-full overflow-visible ${
              !hasToggledOnce
                ? "translate-x-0"
                : isToggledOn
                ? "bubble-knob-in"
                : "bubble-knob-out"
            } flex items-center justify-center select-none`}
          >
            <div
              className={`relative w-full h-full rounded-full overflow-hidden flex items-center justify-center p-2.5 sm:p-5 md:p-7 transition-all duration-300 ease-out cursor-pointer ${
                !isToggledOn
                  ? "bg-white shadow-[0_16px_40px_rgba(0,0,0,0.35),_0_2px_6px_rgba(0,0,0,0.12),_inset_0_1px_2px_rgba(255,255,255,0.95)] hover:scale-[1.025] hover:shadow-[0_24px_55px_rgba(0,0,0,0.45)] active:scale-[0.98]"
                  : "bg-[#0b2847] border border-white/30 shadow-[0_20px_50px_rgba(0,18,36,0.45),_0_2px_6px_rgba(0,10,25,0.2),_inset_0_1px_2px_rgba(255,255,255,0.35)] hover:scale-[1.015] active:scale-[0.98]"
              }`}
            >
              {isToggledOn && (
                <VantaKnobWaves
                  color={0x0b2847}
                  shininess={30.0}
                  waveHeight={20.0}
                  waveSpeed={0.75}
                  zoom={0.65}
                />
              )}

              {/* Mockup del Device dentro il Knob */}
              <div
                className={`relative z-10 w-full h-full min-h-full flex items-center justify-center pointer-events-none transition-all duration-500 ease-out ${
                  !isToggledOn
                    ? "opacity-75 group-hover:opacity-95 contrast-[0.98] group-hover:contrast-100"
                    : "opacity-100 brightness-100 drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
                }`}
              >
                <Image
                  src={displayImage}
                  alt={caseStudy.imageAlt}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 85vw, 45vw"
                  className={`object-contain ${imagePadding}`}
                  priority={priorityImage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
