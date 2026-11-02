"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import VantaKnobWaves from "@/components/VantaKnobWaves";
import { CaseStudy } from "@/data/portfolio";

interface MobileCaseStudyCardProps {
  caseStudy: CaseStudy;
  priorityImage?: boolean;
}

export default function MobileCaseStudyCard({
  caseStudy,
  priorityImage = false,
}: MobileCaseStudyCardProps) {
  const [toggleState, setToggleState] = useState<"off" | "on">("off");
  const [hasToggledOnce, setHasToggledOnce] = useState(false);

  const handleToggle = () => {
    setHasToggledOnce(true);
    setToggleState((prev) => (prev === "off" ? "on" : "off"));
  };

  const isToggledOn = toggleState === "on";
  const displayImage = isToggledOn && caseStudy.imageOn ? caseStudy.imageOn : caseStudy.imageOff;

  return (
    <div className="w-full flex justify-center">
      <div
        role="switch"
        aria-checked={isToggledOn}
        aria-label={
          !isToggledOn
            ? `Attiva case study ${caseStudy.title}`
            : `Torna a copertina ${caseStudy.title}`
        }
        onClick={handleToggle}
        style={{ "--travel-dist": "calc(100cqw - 100% - 16px)" } as React.CSSProperties}
        className={`group relative w-full aspect-[2/1] rounded-full border-[2px] transition-all duration-500 overflow-hidden cursor-pointer select-none active:scale-[0.985] ${
          !isToggledOn
            ? "border-white/25 bg-transparent shadow-[0_20px_50px_rgba(0,10,30,0.4),_inset_0_1.5px_2px_rgba(255,255,255,0.45)]"
            : "border-white bg-white"
        }`}
      >
        {/* Pista interna del Toggle (Glass ad OFF, Bianca ad ON) */}
        <div
          className={`relative w-full h-full rounded-full [container-type:inline-size] overflow-hidden transition-all duration-500 ${
            !isToggledOn
              ? "bg-white/[0.12] shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.7)]"
              : "bg-white"
          }`}
        >
          {/* 1. STATO ATTIVO (ON): Dettagli case study a sinistra con abbondante respiro */}
          <div
            className={`absolute top-0 left-[6%] sm:left-[7%] w-[46%] sm:w-[45%] h-full flex flex-col justify-center space-y-1 sm:space-y-2 md:space-y-3 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
              isToggledOn
                ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                : "opacity-0 scale-90 -translate-x-10 pointer-events-none"
            }`}
          >
            <span className="text-[10px] sm:text-xs md:text-sm font-bold text-blue-600 tracking-wider uppercase">
              {caseStudy.badge}
            </span>
            <h3 className="text-[clamp(1.05rem,4.2cqw,1.45rem)] font-extrabold text-slate-900 tracking-tight leading-tight">
              {caseStudy.title}
            </h3>
            <p className="text-[clamp(0.6875rem,2.6cqw,0.85rem)] text-slate-600 line-clamp-2 sm:line-clamp-3 leading-snug">
              {caseStudy.mobileSubtitle}
            </p>
            <div className="pt-0.5 sm:pt-1">
              <Link
                href={caseStudy.link}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-slate-900 hover:bg-black active:scale-95 text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              >
                <span>See more</span>
              </Link>
            </div>
          </div>

          {/* 2. STATO SPENTO (OFF): Cover con solo il numero gigante a destra */}
          <div
            className={`absolute top-0 right-6 sm:right-9 w-[44%] h-full flex items-center justify-center pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
              !isToggledOn
                ? "opacity-100 scale-100 translate-x-0"
                : "opacity-0 scale-75 translate-x-12"
            }`}
          >
            <span className="text-[clamp(3.5rem,14cqw,6.5rem)] font-black text-white tracking-tighter leading-none select-none">
              {caseStudy.number}
            </span>
          </div>

          {/* 3. IL KNOB DEL TOGGLE: Grande pomello circolare fluido */}
          <div
            className={`absolute top-2 left-2 h-[calc(100%-16px)] aspect-square rounded-full overflow-visible ${
              !hasToggledOnce
                ? "translate-x-0"
                : isToggledOn
                ? "bubble-knob-h-in"
                : "bubble-knob-h-out"
            } flex items-center justify-center select-none`}
          >
            <div
              className={`relative w-full h-full rounded-full overflow-hidden flex items-center justify-center p-3 transition-all duration-300 ease-out cursor-pointer ${
                !isToggledOn
                  ? "bg-white shadow-[0_16px_40px_rgba(0,0,0,0.35),0_2px_6px_rgba(0,0,0,0.12),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:scale-[1.02] active:scale-[0.98]"
                  : "bg-[#0b2847] border-[4px] sm:border-[6px] border-white active:scale-[0.98]"
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
              <div
                className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none transition-all duration-500 ease-out opacity-100"
              >
                <Image
                  src={displayImage}
                  alt={caseStudy.imageAlt}
                  fill
                  unoptimized
                  sizes="180px"
                  className="object-contain p-1"
                  priority={priorityImage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
