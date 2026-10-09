"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface NavbarProps {
  onNavigate: (target: "home" | "work" | "about" | "contact") => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <button
            onClick={() => handleItemClick("home")}
            className="w-full text-left px-3.5 py-2 rounded-xl bg-white text-slate-900 font-semibold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => handleItemClick("work")}
            className="w-full text-left px-3.5 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 font-medium text-xs sm:text-sm transition-colors cursor-pointer"
          >
            Work &amp; Archive
          </button>
          <button
            onClick={() => handleItemClick("about")}
            className="w-full text-left px-3.5 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 font-medium text-xs sm:text-sm transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => handleItemClick("contact")}
            className="w-full text-left px-3.5 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 font-medium text-xs sm:text-sm transition-colors cursor-pointer"
          >
            Contact
          </button>
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
