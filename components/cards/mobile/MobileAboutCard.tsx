"use client";

import { useState } from "react";
import Image from "next/image";
import VantaKnobWaves from "@/components/VantaKnobWaves";
import { PROFILE_DATA } from "@/data/portfolio";

export default function MobileAboutCard() {
  const [toggleState, setToggleState] = useState<"off" | "on">("off");
  const [hasToggledOnce, setHasToggledOnce] = useState(false);

  const handleToggle = () => {
    setHasToggledOnce(true);
    setToggleState((prev) => (prev === "off" ? "on" : "off"));
  };

  const isToggledOn = toggleState === "on";

  return (
    <section id="mobile-about" className="w-full flex justify-center">
      <div className="w-full flex justify-center">
        <div
          role="switch"
          aria-checked={isToggledOn}
          aria-label={
            !isToggledOn
              ? "Attiva dettagli About"
              : "Torna a copertina About"
          }
          onClick={handleToggle}
          style={{ "--travel-dist": "calc(100cqw - 100% - 16px)" } as React.CSSProperties}
          className={`group relative w-full aspect-[2/1] rounded-full border-[2px] transition-all duration-500 overflow-hidden cursor-pointer select-none active:scale-[0.985] ${
            !isToggledOn
              ? "border-white/25 bg-transparent shadow-[0_20px_50px_rgba(0,10,30,0.4),_inset_0_1.5px_2px_rgba(255,255,255,0.45)]"
              : "border-white bg-white shadow-[0_25px_60px_rgba(0,10,30,0.4)]"
          }`}
        >
          {/* Pista interna del Toggle (Glass ad OFF, Bianca ad ON) */}
          <div
            className={`relative w-full h-full rounded-full [container-type:inline-size] overflow-hidden transition-all duration-500 ${
              !isToggledOn
                ? "bg-white/[0.12] shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.7)]"
                : "bg-white shadow-none"
            }`}
          >
            {/* 1. STATO ATTIVO (ON): Bio sintetica e link a sinistra con abbondante respiro */}
            <div
              className={`absolute top-0 left-[6%] sm:left-[7%] w-[46%] sm:w-[45%] h-full flex flex-col justify-center space-y-1 sm:space-y-2 md:space-y-2.5 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                isToggledOn
                  ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                  : "opacity-0 scale-90 -translate-x-10 pointer-events-none"
              }`}
            >
              <h3 className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {PROFILE_DATA.name} · {PROFILE_DATA.age}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 sm:line-clamp-3 leading-snug">
                {PROFILE_DATA.shortBio}
              </p>
              <div className="pt-0.5 sm:pt-1 flex items-center gap-1.5 sm:gap-2">
                <a
                  href={PROFILE_DATA.resumePdf}
                  target="_blank"
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-slate-900 hover:bg-black text-white text-xs sm:text-sm font-semibold transition-all shadow-xs"
                >
                  CV PDF
                </a>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const el = document.getElementById("mobile-contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-slate-900/10 text-slate-900 text-xs sm:text-sm font-semibold border border-slate-900/15 cursor-pointer"
                >
                  Contact
                </button>
              </div>
            </div>

            {/* 2. STATO SPENTO (OFF): Cover con nome a destra */}
            <div
              className={`absolute top-0 right-4 sm:right-6 w-[46%] h-full flex flex-col items-center justify-center pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                !isToggledOn
                  ? "opacity-100 scale-100 translate-x-0"
                  : "opacity-0 scale-75 translate-x-12"
              }`}
            >
              <div className="text-center px-1">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] leading-tight whitespace-nowrap">
                  About me
                </h3>
              </div>
            </div>

            {/* 3. IL KNOB DEL TOGGLE: Foto Profilo con VantaKnobWaves */}
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
                    : "bg-[#0b2847] border-[4px] sm:border-[6px] border-white shadow-[0_20px_50px_rgba(0,18,36,0.45)] active:scale-[0.98]"
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
                  <div className="relative w-[87%] h-[87%] flex items-center justify-center">
                    <Image
                      src={PROFILE_DATA.profileImage}
                      alt={PROFILE_DATA.name}
                      fill
                      priority
                      sizes="160px"
                      className="object-contain object-bottom"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
