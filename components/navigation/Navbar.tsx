"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface NavbarProps {
  onNavigate: (target: "home" | "work" | "about" | "contact") => void;
  activeSectionIndex?: number;
}

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export default function Navbar({ onNavigate, activeSectionIndex = 0 }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mappa activeSectionIndex -> tab attivo
  const activeTab: "home" | "work" | "about" | "contact" =
    activeSectionIndex === 0
      ? "home"
      : activeSectionIndex >= 1 && activeSectionIndex <= 3
      ? "work"
      : activeSectionIndex >= 4 && activeSectionIndex <= 5
      ? "about"
      : "contact";

  const currentLabel =
    NAV_ITEMS.find((item) => item.id === activeTab)?.label || "Home";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = (target: "home" | "work" | "about" | "contact") => {
    onNavigate(target);
    setIsOpen(false);
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
            className="w-10 h-10 md:w-11 md:h-11 rounded-full group-hover:scale-105 transition-transform duration-200"
          />
        </button>
      </div>

      {/* Top-Right Vertical Expandable Glass Capsule Navbar */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="fixed top-[max(1rem,env(safe-area-inset-top))] right-4 md:top-6 md:right-8 z-50"
      >
        {!isOpen ? (
          /* Pill compatto da chiuso (mostra la sezione attiva) - Effetto vetro speculare pillola */
          <button
            onClick={() => setIsOpen(true)}
            aria-expanded={false}
            aria-label={`Menu di navigazione. Sezione corrente: ${currentLabel}`}
            className="p-4 rounded-full bg-white/[0.12] hover:bg-white/[0.18] backdrop-blur-2xl border-[1.5px] border-white/25 text-white text-xs sm:text-sm font-medium shadow-[0_20px_50px_rgba(0,10,30,0.45),_inset_0_1.5px_2px_rgba(255,255,255,0.45)] transition-all select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 active:scale-95 min-w-[88px] text-center flex items-center justify-center leading-none"
          >
            {currentLabel}
          </button>
        ) : (
          /* Capsule verticale espansa (Home, Work, About, Contact) - Effetto vetro speculare pillola */
          <nav
            aria-label="Navigazione principale"
            className="px-4 pt-6 pb-6 rounded-full bg-white/[0.12] hover:bg-white/[0.16] backdrop-blur-2xl border-[1.5px] border-white/25 shadow-[0_25px_65px_rgba(0,10,30,0.45),_inset_0_1.5px_2px_rgba(255,255,255,0.45)] flex flex-col items-center gap-3 min-w-[96px] animate-in fade-in zoom-in-95 duration-200"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`w-full text-center px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 active:scale-95 leading-none ${
                    isActive
                      ? "bg-white/25 text-white font-semibold shadow-[0_4px_16px_rgba(0,10,30,0.3),_inset_0_1px_1.5px_rgba(255,255,255,0.6)] border border-white/35"
                      : "text-white/80 hover:text-white hover:bg-white/15 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] border border-transparent"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        )}
      </div>

      {/* Backdrop invisibile solo su mobile per touch dismiss */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[48] md:hidden bg-transparent"
        />
      )}
    </>
  );
}
