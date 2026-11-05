"use client";

import { useState } from "react";
import Image from "next/image";
import VantaKnobWaves from "@/components/VantaKnobWaves";
import { useLiveContent } from "@/contexts/LiveContentContext";

export default function MobileRecommendationsCard() {
  const { content } = useLiveContent();
  const TESTIMONIALS = content.testimonials;
  const [toggleState, setToggleState] = useState<"off" | "on">("off");
  const [hasToggledOnce, setHasToggledOnce] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleToggle = () => {
    setHasToggledOnce(true);
    setToggleState((prev) => (prev === "off" ? "on" : "off"));
  };

  const isToggledOn = toggleState === "on";
  const currentTestimonial = TESTIMONIALS[currentIndex] || TESTIMONIALS[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="mobile-recommendations" className="w-full flex justify-center">
      <div className="w-full flex justify-center">
        <div
          role="switch"
          aria-checked={isToggledOn}
          aria-label={
            !isToggledOn
              ? "Attiva testimonianze Kind Words"
              : "Torna a copertina Kind Words"
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
            {/* 1. STATO ATTIVO (ON): Testimonianza Singola a sinistra con frecce */}
            <div
              className={`absolute top-0 left-[6%] sm:left-[7%] w-[46%] sm:w-[45%] h-full flex flex-col justify-center space-y-1 sm:space-y-2 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                isToggledOn
                  ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                  : "opacity-0 scale-90 -translate-x-10 pointer-events-none"
              }`}
            >
              {currentTestimonial && (
                <div className="space-y-1">
                  <p className="text-[11px] sm:text-xs md:text-sm text-slate-800 italic line-clamp-3 leading-snug">
                    &ldquo;{currentTestimonial.shortQuote || currentTestimonial.fullQuote}&rdquo;
                  </p>
                  <div>
                    <p className="text-[11px] sm:text-xs font-bold text-slate-900 leading-tight">
                      {currentTestimonial.name}
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-slate-500 leading-tight">
                      {currentTestimonial.role}
                    </p>
                  </div>
                </div>
              )}

              {/* Frecce Carosello + Dots */}
              <div
                className="flex items-center justify-between pt-0.5"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-1">
                  {TESTIMONIALS.map((t, idx) => (
                    <span
                      key={t.id}
                      className={`h-1 rounded-full transition-all ${
                        currentIndex === idx ? "w-3 bg-slate-900" : "w-1 bg-slate-300"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Precedente"
                    className="w-6 h-6 rounded-full bg-slate-900/10 hover:bg-slate-900 hover:text-white text-slate-900 flex items-center justify-center font-bold text-xs transition-all active:scale-90"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Successivo"
                    className="w-6 h-6 rounded-full bg-slate-900/10 hover:bg-slate-900 hover:text-white text-slate-900 flex items-center justify-center font-bold text-xs transition-all active:scale-90"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            {/* 2. STATO SPENTO (OFF): Cover con titolo a destra */}
            <div
              className={`absolute top-0 right-4 sm:right-6 w-[46%] h-full flex flex-col items-center justify-center pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                !isToggledOn
                  ? "opacity-100 scale-100 translate-x-0"
                  : "opacity-0 scale-75 translate-x-12"
              }`}
            >
              <div className="text-center px-1">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight whitespace-nowrap">
                  Recommendation
                </h3>
              </div>
            </div>

            {/* 3. IL KNOB DEL TOGGLE: Foto Founder con VantaKnobWaves */}
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
                className={`relative w-full h-full rounded-full overflow-hidden flex items-center justify-center p-1.5 transition-all duration-300 ease-out cursor-pointer ${
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
                <div className="relative z-10 w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                  {TESTIMONIALS.map((t, idx) => (
                    <div
                      key={t.id}
                      className={`absolute inset-0 transition-opacity duration-500 ease-out rounded-full overflow-hidden ${
                        currentIndex === idx ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                      }`}
                    >
                      <Image
                        src={t.photo}
                        alt={t.photoAlt || t.name}
                        fill
                        unoptimized
                        sizes="160px"
                        className={`object-cover ${t.photoPosition || "object-center"}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
