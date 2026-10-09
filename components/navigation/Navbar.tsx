"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface NavbarProps {
  onNavigate: (target: "home" | "work" | "about" | "contact") => void;
  activeSectionIndex?: number;
}

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work & Archive" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export default function Navbar({ onNavigate, activeSectionIndex = 0 }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pulsingTab, setPulsingTab] = useState<string | null>(null);

  // Mappa activeSectionIndex -> tab attivo
  const activeTab: "home" | "work" | "about" | "contact" =
    activeSectionIndex === 0
      ? "home"
      : activeSectionIndex >= 1 && activeSectionIndex <= 3
      ? "work"
      : activeSectionIndex >= 4 && activeSectionIndex <= 5
      ? "about"
      : "contact";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleItemClick = (target: "home" | "work" | "about" | "contact") => {
    // Effetto click micro-interaction: bagliore e pulsazione tattile
    setPulsingTab(target);
    setTimeout(() => setPulsingTab(null), 400);

    onNavigate(target);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Logo fisso in alto a sinistra */}
      <div className="fixed top-[max(1rem,env(safe-area-inset-top))] left-4 md:top-6 md:left-6 z-50">
        <button
          onClick={() => handleItemClick("home")}
          className="block group focus:outline-none cursor-pointer"
          aria-label="Torna a Home"
        >
          <Image
            src="/logo.svg"
            alt="Herald Ago Logo"
            width={48}
            height={48}
            priority
            unoptimized
            className="w-10 h-10 md:w-11 md:h-11 rounded-full shadow-xs group-hover:scale-105 transition-transform duration-200"
          />
        </button>
      </div>

      {/* Floating Center Capsule Navbar (Desktop Only >= 768px) */}
      <nav
        aria-label="Navigazione principale"
        className="hidden md:flex fixed top-5 sm:top-6 left-1/2 -translate-x-1/2 z-50 items-center gap-1 bg-slate-900/40 hover:bg-slate-900/60 backdrop-blur-2xl border border-white/20 p-1.5 rounded-full shadow-[0_8px_32px_rgba(0,10,30,0.35),_inset_0_1px_1.5px_rgba(255,255,255,0.3)] transition-all duration-300"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          const isPulsing = pulsingTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              aria-current={isActive ? "page" : undefined}
              className={`relative px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 active:scale-95 ${
                isActive
                  ? "bg-white text-slate-950 font-semibold shadow-[0_2px_12px_rgba(255,255,255,0.35)]"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              } ${
                isPulsing
                  ? "ring-4 ring-white/60 shadow-[0_0_24px_rgba(255,255,255,0.85)] scale-105"
                  : ""
              }`}
            >
              <span className="relative z-10">{item.label}</span>
              {/* Effetto bagliore radiante al click */}
              {isPulsing && (
                <span className="absolute inset-0 rounded-full bg-white/40 animate-ping pointer-events-none" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Burger Menu a specchio col logo (visibile solo su mobile) */}
      <div className="fixed top-[max(1rem,env(safe-area-inset-top))] right-4 md:hidden z-50">
        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="w-10 h-10 rounded-full flex flex-col items-center justify-center gap-[4.5px] bg-white/15 backdrop-blur-xl border border-white/30 shadow-[0_4px_16px_rgba(0,0,0,0.2),_inset_0_1px_1px_rgba(255,255,255,0.4)] hover:bg-white/25 active:scale-95 transition-all cursor-pointer group focus:outline-none"
          aria-label={isMobileMenuOpen ? "Chiudi menu" : "Apri menu"}
          aria-expanded={isMobileMenuOpen}
        >
          <span
            className={`h-[2.5px] w-4.5 rounded-full bg-white transition-all duration-300 origin-center ${
              isMobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`h-[2.5px] w-4.5 rounded-full bg-white transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`h-[2.5px] w-4.5 rounded-full bg-white transition-all duration-300 origin-center ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>

        {/* Dropdown del menu mobile */}
        <div
          data-lenis-prevent
          className={`absolute top-12 right-0 w-44 sm:w-48 p-1.5 rounded-2xl bg-slate-900/85 backdrop-blur-2xl border border-white/25 shadow-[0_15px_35px_rgba(0,0,0,0.4),_inset_0_1px_1px_rgba(255,255,255,0.2)] flex flex-col gap-1 z-50 transition-all duration-200 origin-top-right ${
            isMobileMenuOpen
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                activeTab === item.id
                  ? "bg-white text-slate-900 font-semibold shadow-xs"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Backdrop per chiudere il menu toccando fuori */}
      <div
        onClick={() => setIsMobileMenuOpen(false)}
        className={`fixed inset-0 z-[48] bg-black/30 backdrop-blur-[2px] md:hidden transition-opacity duration-200 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />
    </>
  );
}
