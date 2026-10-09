"use client";

import { Ref, useRef, useState } from "react";
import Image from "next/image";
import VantaKnobWaves from "@/components/VantaKnobWaves";
import { PROFILE_DATA } from "@/data/portfolio";

interface AboutCardProps {
  ref?: Ref<HTMLDivElement>;
  onContactClick: () => void;
}

export default function AboutCard({ ref, onContactClick }: AboutCardProps) {
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

  return (
    <div
      ref={ref}
      className="capsule-card-wrapper absolute inset-0 w-full h-full flex items-center justify-center p-2.5 sm:p-4 md:p-0 z-[35] will-change-transform"
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
              ? "Attiva dettagli su About Me"
              : "Torna alla copertina di About Me"
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
            className={`absolute top-0 left-[5%] w-[44%] h-full flex flex-col justify-center px-4 sm:px-6 md:px-0 py-2 sm:py-4 space-y-1.5 sm:space-y-2 md:space-y-2.5 overflow-y-auto [scrollbar-width:none] transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
              isToggledOn
                ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                : "opacity-0 scale-95 -translate-x-12 pointer-events-none"
            }`}
          >
            <div>
              <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                {PROFILE_DATA.name}
              </h2>
              <p className="text-[11px] sm:text-xs md:text-xs lg:text-sm text-slate-600 font-medium leading-snug mt-0.5 max-w-xl">
                {PROFILE_DATA.age} · {PROFILE_DATA.role} · {PROFILE_DATA.locations}
              </p>
            </div>

            <div className="space-y-1 sm:space-y-1.5 text-[11px] sm:text-xs md:text-xs lg:text-sm text-slate-800 leading-relaxed max-w-lg font-normal">
              <p>{PROFILE_DATA.bioParagraph1}</p>
              <p className="text-slate-600">{PROFILE_DATA.bioParagraph2}</p>
            </div>

            {/* Pulsanti di Azione */}
            <div className="pt-0.5 sm:pt-1 flex flex-wrap items-center gap-1.5 sm:gap-2">
              <a
                href={PROFILE_DATA.resumePdf}
                target="_blank"
                download
                onClick={(e) => e.stopPropagation()}
                className="px-3 sm:px-3.5 py-1 rounded-full bg-slate-900 hover:bg-black active:scale-95 text-white text-[11px] sm:text-xs font-semibold shadow-sm transition-all cursor-pointer"
              >
                Download Resume PDF
              </a>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onContactClick();
                }}
                className="px-3 sm:px-3.5 py-1 rounded-full bg-slate-900/10 hover:bg-slate-900/20 active:scale-95 text-slate-900 text-[11px] sm:text-xs font-semibold border border-slate-900/15 backdrop-blur-md transition-all cursor-pointer"
              >
                Contact me
              </button>
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
              <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white/95 group-hover:text-white transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                About Me
              </h3>
            </div>
          </div>

          {/* 3. IL KNOB DEL TOGGLE: Foto Profilo Perfettamente Circolare */}
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
              className={`relative w-full h-full rounded-full overflow-hidden flex items-center justify-center p-2 sm:p-4 transition-all duration-300 ease-out cursor-pointer ${
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
              <div
                className={`relative z-10 w-full h-full min-h-full flex items-center justify-center pointer-events-none transition-all duration-500 ease-out rounded-[1000px] overflow-hidden ${
                  !isToggledOn
                    ? "opacity-70 group-hover:opacity-95 contrast-[0.95] group-hover:contrast-100"
                    : "opacity-100 brightness-100"
                }`}
              >
                <div className="relative w-[87%] h-[87%] flex items-center justify-center">
                  <Image
                    src={PROFILE_DATA.profileImage}
                    alt={PROFILE_DATA.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 85vw, 45vw"
                    className="object-contain object-bottom"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
