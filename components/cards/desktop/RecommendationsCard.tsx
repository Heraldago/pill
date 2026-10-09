"use client";

import { Ref, useRef, useState } from "react";
import Image from "next/image";
import VantaKnobWaves from "@/components/VantaKnobWaves";
import { TESTIMONIALS } from "@/data/portfolio";

interface RecommendationsCardProps {
  ref?: Ref<HTMLDivElement>;
  onContactClick: () => void;
}

export default function RecommendationsCard({ ref, onContactClick }: RecommendationsCardProps) {
  const [toggleState, setToggleState] = useState<"off" | "on">("off");
  const [hasToggledOnce, setHasToggledOnce] = useState(false);
  const [activeRecPhoto, setActiveRecPhoto] = useState<"antonio" | "sebastian">("antonio");
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
      className="capsule-card-wrapper absolute inset-0 w-full h-full flex items-center justify-center p-2.5 sm:p-4 md:p-0 z-[40] will-change-transform"
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
              ? "Attiva raccomandazioni e testimonianze"
              : "Torna alla copertina delle raccomandazioni"
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
            className={`absolute top-0 left-[5%] w-[44%] h-full flex flex-col justify-center px-4 sm:px-6 md:px-0 py-2 sm:py-3 space-y-1.5 sm:space-y-2 overflow-y-auto [scrollbar-width:none] transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
              isToggledOn
                ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                : "opacity-0 scale-95 -translate-x-12 pointer-events-none"
            }`}
          >
            <div>
              <h2 className="text-xl sm:text-2xl md:text-[clamp(1.3rem,2.6cqw,2.4rem)] font-bold text-slate-900 tracking-tight leading-tight">
                Kind Words
              </h2>
            </div>

            {/* Testimonials List */}
            {TESTIMONIALS.map((testimonial) => {
              const isSelected = activeRecPhoto === testimonial.id;
              return (
                <div
                  key={testimonial.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveRecPhoto(testimonial.id);
                  }}
                  onMouseEnter={() => setActiveRecPhoto(testimonial.id)}
                  className={`p-2 sm:p-3 md:p-3.5 rounded-2xl transition-all duration-300 backdrop-blur-md cursor-pointer ${
                    isSelected
                      ? "bg-white border-2 border-slate-900/20 text-slate-900 shadow-md scale-[1.01]"
                      : "bg-slate-900/[0.05] border border-slate-900/10 hover:bg-slate-900/[0.08] hover:border-slate-900/20 text-slate-800"
                  }`}
                >
                  <p className="text-[11px] sm:text-xs md:text-sm leading-relaxed font-normal text-slate-800">
                    &ldquo;{testimonial.fullQuote}&rdquo;
                  </p>
                  <div className="flex items-center gap-2 mt-1 sm:mt-2">
                    <div className="relative w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-slate-900/20 flex-shrink-0 shadow-xs">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        unoptimized
                        sizes="32px"
                        className="object-cover object-center"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-xs font-semibold text-slate-900">{testimonial.name}</p>
                      <p className="text-[8px] sm:text-[10px] text-slate-600">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Pulsante Navigazione */}
            <div className="pt-0.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onContactClick();
                }}
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-1 sm:py-2 rounded-full bg-slate-900 hover:bg-black active:scale-95 text-white text-[11px] sm:text-sm font-semibold shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition-all cursor-pointer"
              >
                <span>Next: Contact</span>
                <span className="text-xs font-bold">↗</span>
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
              <h3 className="text-[clamp(1.35rem,3.4cqw,3.5rem)] font-bold tracking-tight text-white/90 group-hover:text-white transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                Recommendation
              </h3>
            </div>
          </div>

          {/* 3. IL KNOB DEL TOGGLE: Foto Founder Perfettamente Circolare */}
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
                {/* Foto Antonio */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                    activeRecPhoto === "antonio" ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                  }`}
                >
                  <Image
                    src="/antonio-founder.jpg"
                    alt="Antonio, Founder I Pupi Siciliani"
                    fill
                    priority
                    unoptimized
                    sizes="(max-width: 768px) 85vw, 45vw"
                    className="object-cover object-[center_32%]"
                  />
                </div>

                {/* Foto Herald & Sebastian */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                    activeRecPhoto === "sebastian" ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                  }`}
                >
                  <Image
                    src="/herald-sebastian-team.jpg"
                    alt="Herald with Sebastian, CEO næmt.nu"
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 85vw, 45vw"
                    className="object-cover object-[52%_48%]"
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
