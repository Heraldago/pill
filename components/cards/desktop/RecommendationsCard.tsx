"use client";

import { Ref, useRef, useState } from "react";
import Image from "next/image";
import VantaKnobWaves from "@/components/VantaKnobWaves";
import { useLiveContent } from "@/contexts/LiveContentContext";

interface RecommendationsCardProps {
  ref?: Ref<HTMLDivElement>;
  onContactClick?: () => void;
  toggleState?: "off" | "on";
  onToggleChange?: (state: "off" | "on") => void;
}

export default function RecommendationsCard({
  ref,
  toggleState: controlledToggleState,
  onToggleChange,
}: RecommendationsCardProps) {
  const { content } = useLiveContent();
  const TESTIMONIALS = content.testimonials;
  const [internalToggleState, setInternalToggleState] = useState<"off" | "on">("off");
  const [hasToggledOnce, setHasToggledOnce] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartYRef = useRef<number | null>(null);

  const toggleState = controlledToggleState !== undefined ? controlledToggleState : internalToggleState;
  const effectiveHasToggledOnce = hasToggledOnce || toggleState === "on" || controlledToggleState === "on";

  const setEffectiveToggleState = (next: "off" | "on") => {
    setHasToggledOnce(true);
    if (controlledToggleState === undefined) {
      setInternalToggleState(next);
    }
    onToggleChange?.(next);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartYRef.current === null) return;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;
    touchStartYRef.current = null;
    if (deltaY > 35) {
      setEffectiveToggleState("on");
    } else if (deltaY < -35) {
      setEffectiveToggleState("off");
    }
  };

  const handleToggle = () => {
    setEffectiveToggleState(toggleState === "off" ? "on" : "off");
  };

  const isToggledOn = toggleState === "on";
  const currentTestimonial = TESTIMONIALS[currentIndex] || TESTIMONIALS[0];
  const activeRecPhoto = currentTestimonial?.id;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      ref={ref}
      className="capsule-card-wrapper relative w-full h-[100dvh] shrink-0 flex items-center justify-center p-2.5 sm:p-4 md:p-0 z-[40]"
    >
      <section
        className={`capsule-card-section relative w-full h-full rounded-[32px] sm:rounded-[48px] md:rounded-[1000px] border-[2px] sm:border-[3px] transition-all duration-500 overflow-hidden flex items-center justify-center p-0 ${
          !isToggledOn
            ? "border-white/25 bg-transparent shadow-[0_25px_65px_rgba(0,10,30,0.45),_inset_0_1.5px_2px_rgba(255,255,255,0.45)]"
            : "border-white bg-white"
        }`}
      >
        <div
          role="switch"
          aria-checked={isToggledOn}
          aria-label={
            !isToggledOn
              ? "Attiva raccomandazioni Kind Words"
              : "Torna a copertina Kind Words"
          }
          tabIndex={0}
          onClick={handleToggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleToggle();
            }
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={
            {
              "--knob-pad": "clamp(8px, 1.6cqw, 18px)",
              "--travel-dist": "calc(100cqw - 100% - 2 * var(--knob-pad))",
            } as React.CSSProperties
          }
          className={`group relative w-full h-full rounded-[26px] sm:rounded-[40px] md:rounded-[1000px] [container-type:inline-size] cursor-pointer select-none overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.988] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 ${
            !isToggledOn
              ? "bg-black/20 backdrop-blur-md shadow-[inset_0_4px_24px_rgba(0,10,30,0.5),_inset_0_1px_2px_rgba(255,255,255,0.2)]"
              : "bg-white"
          }`}
        >
          {/* 1. STATO ATTIVO (ON): Testimonianza Singola a Sinistra (blocco compatto che non collide con il knob) */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={`absolute top-0 bottom-0 left-[5%] sm:left-[6%] md:left-[7%] w-[31%] max-w-[32%] my-auto h-fit max-h-[92%] flex flex-col justify-center px-1 sm:px-2 py-1 gap-3 sm:gap-3.5 card-on-container overflow-y-auto [scrollbar-width:none] transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
              isToggledOn
                ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                : "opacity-0 scale-95 -translate-x-12 pointer-events-none"
            }`}
          >
            {/* Header con Titolo e Contatore in font naturale */}
            <div className="flex items-center justify-between w-full">
              <h2 className="text-2xl sm:text-3xl md:text-[clamp(1.75rem,2.8cqw,3.2rem)] card-title-lg font-bold text-slate-900 tracking-tight leading-tight">
                Kind Words
              </h2>
              <span className="text-xs sm:text-sm font-medium text-slate-400">
                {currentIndex + 1} / {TESTIMONIALS.length}
              </span>
            </div>

            {/* Testimonial Singola con Card compatta ed elegante */}
            {currentTestimonial && (
              <div className="relative p-3.5 sm:p-4.5 md:p-5 rounded-2xl bg-slate-900/[0.04] border border-slate-900/10 shadow-sm backdrop-blur-md flex flex-col justify-between gap-3 min-h-[160px]">
                <p className="text-xs sm:text-sm md:text-[clamp(0.88rem,1.15cqw,1.02rem)] leading-relaxed font-normal text-slate-800 break-words">
                  &ldquo;{currentTestimonial.fullQuote}&rdquo;
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-900/10">
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-900/20 shrink-0">
                      <Image
                        src={currentTestimonial.avatar}
                        alt={currentTestimonial.name}
                        fill
                        unoptimized
                        sizes="32px"
                        className="object-cover object-center"
                      />
                    </div>
                    <div className="truncate">
                      <p className="text-xs sm:text-sm font-bold text-slate-900 leading-tight truncate">
                        {currentTestimonial.name}
                      </p>
                      <p className="text-[11px] sm:text-xs text-slate-600 leading-tight truncate">
                        {currentTestimonial.role}
                      </p>
                    </div>
                  </div>

                  {/* Frecce Sinistra e Destra */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Testimonianza precedente"
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-900/10 hover:bg-slate-900 hover:text-white text-slate-900 flex items-center justify-center font-bold text-xs sm:text-sm transition-all cursor-pointer active:scale-90"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Testimonianza successiva"
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-900/10 hover:bg-slate-900 hover:text-white text-slate-900 flex items-center justify-center font-bold text-xs sm:text-sm transition-all cursor-pointer active:scale-90"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Dots di navigazione (Contact button completamente rimosso) */}
            <div className="flex items-center gap-1.5 pt-0.5">
              {TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Vai a testimonial ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx
                      ? "w-5 bg-slate-900"
                      : "w-1.5 bg-slate-300 hover:bg-slate-500"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* 2. STATO SPENTO (OFF): Titolo centrato tra pallino e bordo destro */}
          <div
            className={`absolute top-0 bottom-0 right-[3%] sm:right-[4%] w-[40%] max-w-[40%] h-full flex flex-col items-center justify-center text-center px-2 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
              !isToggledOn
                ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                : "opacity-0 scale-75 translate-x-12 pointer-events-none"
            }`}
          >
            <div className="flex flex-col items-center justify-center text-center max-w-full select-none pointer-events-none">
              <h3 className="text-center text-[clamp(1.75rem,3.4cqw,4.2rem)] font-bold tracking-tight text-white/90 group-hover:text-white transition-colors">
                Recommendations
              </h3>
            </div>
          </div>

          {/* 3. IL KNOB DEL TOGGLE: Foto Founder Perfettamente Circolare */}
          <div
            className={`absolute top-[var(--knob-pad)] bottom-[var(--knob-pad)] left-[var(--knob-pad)] h-[calc(100%-2*var(--knob-pad))] aspect-square w-auto rounded-full overflow-visible ${
              !effectiveHasToggledOnce
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
                  : "bg-[#0b2847] border border-white/30 hover:scale-[1.015] active:scale-[0.98]"
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
                className="relative z-10 w-full h-full min-h-full flex items-center justify-center pointer-events-none transition-all duration-500 ease-out rounded-[1000px] overflow-hidden opacity-100"
              >
                {TESTIMONIALS.map((t) => (
                  <div
                    key={t.id}
                    className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                      activeRecPhoto === t.id ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={t.photo}
                      alt={t.photoAlt || t.name}
                      fill
                      priority
                      unoptimized
                      sizes="(max-width: 768px) 85vw, 45vw"
                      className={`object-cover ${t.photoPosition || "object-center"}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
