"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VantaWaves from "@/components/VantaWaves";

const SECTIONS = [
  { id: "hero", label: "Intro" },
  { id: "case-1", label: "Ungdomskort" },
  { id: "case-2", label: "X-Bit" },
  { id: "case-3", label: "I Pupi Siciliani" },
  { id: "about", label: "About Me" },
  { id: "recommendations", label: "Recommendations" },
  { id: "contact", label: "Contact" },
];

export default function Home() {
  const pinnedContainerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  const card5Ref = useRef<HTMLDivElement>(null);
  const card6Ref = useRef<HTMLDivElement>(null);
  const card7Ref = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const [case1Toggle, setCase1Toggle] = useState<"off" | "on">("off");
  const [hasToggledOnce1, setHasToggledOnce1] = useState(false);

  const [case2Toggle, setCase2Toggle] = useState<"off" | "on">("off");
  const [hasToggledOnce2, setHasToggledOnce2] = useState(false);

  const [case3Toggle, setCase3Toggle] = useState<"off" | "on">("off");
  const [hasToggledOnce3, setHasToggledOnce3] = useState(false);

  const [case4Toggle, setCase4Toggle] = useState<"off" | "on">("off");
  const [hasToggledOnce4, setHasToggledOnce4] = useState(false);

  const [case5Toggle, setCase5Toggle] = useState<"off" | "on">("off");
  const [hasToggledOnce5, setHasToggledOnce5] = useState(false);
  const [activeRecPhoto, setActiveRecPhoto] = useState<"antonio" | "sebastian">("antonio");

  const [case6Toggle, setCase6Toggle] = useState<"off" | "on">("off");
  const [hasToggledOnce6, setHasToggledOnce6] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Stato form contatti & copia email
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText("heraldago1@gmail.com").then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    const mailtoSubject = encodeURIComponent(`Portfolio inquiry from ${contactName}`);
    const mailtoBody = encodeURIComponent(`Name: ${contactName}\nEmail: ${contactEmail}\n\nMessage:\n${contactMessage}`);
    window.location.href = `mailto:heraldago1@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    setContactSubmitted(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Inizializzazione Smooth Scrolling inerziale con Lenis
    const lenis = new Lenis({
      lerp: 0.09, // Inerzia frenata e fluida stile Juan Angustia
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Sincronizzazione Lenis -> ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // 2. Orchestrazione GSAP ScrollTrigger (Card Stacking per tutte le 7 Card)
    const ctx = gsap.context(() => {
      if (
        !pinnedContainerRef.current ||
        !card1Ref.current ||
        !card2Ref.current ||
        !card3Ref.current ||
        !card4Ref.current ||
        !card5Ref.current ||
        !card6Ref.current ||
        !card7Ref.current
      )
        return;

      // Impostazione iniziale: Tutte le card dalla 2 alla 7 partono sotto al viewport
      gsap.set(card2Ref.current, { yPercent: 100 });
      gsap.set(card3Ref.current, { yPercent: 100 });
      gsap.set(card4Ref.current, { yPercent: 100 });
      gsap.set(card5Ref.current, { yPercent: 100 });
      gsap.set(card6Ref.current, { yPercent: 100 });
      gsap.set(card7Ref.current, { yPercent: 100 });

      // Timeline bloccata (pin: true) con scrub elastico 1:1 per lo stack a 7 schede
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinnedContainerRef.current,
          start: "top top",
          end: "+=600%", // Distanza virtuale per 6 transizioni consecutive complete
          pin: true,
          scrub: 1, // Ritardo elastico per il controllo 1:1 con la rotella
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            const totalSteps = SECTIONS.length - 1; // 6
            const activeIdx = Math.min(totalSteps, Math.max(0, Math.round(p * totalSteps)));
            setActiveSectionIndex(activeIdx);
          },
        },
      });

      scrollTriggerRef.current = tl.scrollTrigger ?? null;

      // Transizione 1: Card 1 rimpicciolisce/sfoca, Card 2 sale sopra
      tl.to(
        card1Ref.current,
        {
          scale: 0.92,
          opacity: 0.35,
          filter: "blur(5px)",
          ease: "power1.inOut",
        },
        0
      );
      tl.to(
        card2Ref.current,
        {
          yPercent: 0,
          ease: "power1.inOut",
        },
        0
      );

      // Transizione 2: Card 2 rimpicciolisce/sfoca, Card 3 sale sopra
      tl.to(
        card2Ref.current,
        {
          scale: 0.92,
          opacity: 0.35,
          filter: "blur(5px)",
          ease: "power1.inOut",
        },
        1
      );
      tl.to(
        card3Ref.current,
        {
          yPercent: 0,
          ease: "power1.inOut",
        },
        1
      );

      // Transizione 3: Card 3 rimpicciolisce/sfoca, Card 4 sale sopra
      tl.to(
        card3Ref.current,
        {
          scale: 0.92,
          opacity: 0.35,
          filter: "blur(5px)",
          ease: "power1.inOut",
        },
        2
      );
      tl.to(
        card4Ref.current,
        {
          yPercent: 0,
          ease: "power1.inOut",
        },
        2
      );

      // Transizione 4: Card 4 rimpicciolisce/sfoca, Card 5 (About Me) sale sopra
      tl.to(
        card4Ref.current,
        {
          scale: 0.92,
          opacity: 0.35,
          filter: "blur(5px)",
          ease: "power1.inOut",
        },
        3
      );
      tl.to(
        card5Ref.current,
        {
          yPercent: 0,
          ease: "power1.inOut",
        },
        3
      );

      // Transizione 5: Card 5 rimpicciolisce/sfoca, Card 6 (Recommendations) sale sopra
      tl.to(
        card5Ref.current,
        {
          scale: 0.92,
          opacity: 0.35,
          filter: "blur(5px)",
          ease: "power1.inOut",
        },
        4
      );
      tl.to(
        card6Ref.current,
        {
          yPercent: 0,
          ease: "power1.inOut",
        },
        4
      );

      // Transizione 6: Card 6 rimpicciolisce/sfoca, Card 7 (Contact) sale sopra
      tl.to(
        card6Ref.current,
        {
          scale: 0.92,
          opacity: 0.35,
          filter: "blur(5px)",
          ease: "power1.inOut",
        },
        5
      );
      tl.to(
        card7Ref.current,
        {
          yPercent: 0,
          ease: "power1.inOut",
        },
        5
      );
    });

    return () => {
      ctx.revert();
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  const navigateToSection = (index: number) => {
    if (!lenisRef.current) return;
    const trigger = scrollTriggerRef.current;
    const totalSteps = SECTIONS.length - 1;
    if (!trigger) {
      const fallbackTarget = index === 0 ? 0 : window.innerHeight * 6 * (index / totalSteps);
      lenisRef.current.scrollTo(fallbackTarget, { duration: 1.4 });
      return;
    }
    const totalDist = trigger.end - trigger.start;
    const target = trigger.start + totalDist * (index / totalSteps);
    lenisRef.current.scrollTo(target, { duration: 1.4 });
  };

  const scrollToSection = (target: "home" | "work" | "about" | "contact") => {
    if (target === "home") {
      navigateToSection(0);
    } else if (target === "work") {
      navigateToSection(1);
    } else if (target === "about") {
      navigateToSection(4);
    } else if (target === "contact") {
      navigateToSection(6);
    }
  };

  return (
    <main className="relative min-h-screen w-[100vw] overflow-x-hidden p-0 m-0 select-none bg-[#091b2e]">
      {/* Sfondo Animato 3D Vanta Waves (fixed z-0 continuo) */}
      <VantaWaves
        color={0x0b2847}
        shininess={30.0}
        waveHeight={20.0}
        waveSpeed={0.75}
        zoom={0.65}
      />

      {/* Logo fisso in alto a sinistra: 16px (top-4 left-4) su mobile, 24px (md:top-6 md:left-6) su schermi più grandi */}
      <div className="fixed top-4 left-4 md:top-6 md:left-6 z-50">
        <button
          onClick={() => scrollToSection("home")}
          className="block group focus:outline-none cursor-pointer"
        >
          <Image
            src="/logo.png"
            alt="HN Logo"
            width={48}
            height={48}
            priority
            className="w-10 h-10 md:w-11 md:h-11 rounded-full shadow-xs group-hover:scale-105 transition-transform duration-200"
          />
        </button>
      </div>

      {/* Burger Menu a specchio col logo: 16px (top-4 right-4) su mobile, nascosto da tablet in su */}
      <div className="fixed top-4 right-4 md:hidden z-50">
        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="w-10 h-10 rounded-full flex flex-col items-center justify-center gap-[4.5px] bg-white/85 backdrop-blur-md border border-[#E5E9F0] shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:bg-white active:scale-95 transition-all cursor-pointer group focus:outline-none"
          aria-label={isMobileMenuOpen ? "Chiudi menu" : "Apri menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {/* Tre linee a forma di pillola (rounded-full) */}
          <span
            className={`h-[2.5px] w-4.5 rounded-full bg-neutral-800 transition-all duration-300 origin-center ${
              isMobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`h-[2.5px] w-4.5 rounded-full bg-neutral-800 transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`h-[2.5px] w-4.5 rounded-full bg-neutral-800 transition-all duration-300 origin-center ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>

        {/* Dropdown del menu mobile */}
        <div
          data-lenis-prevent
          className={`absolute top-12 right-0 w-44 sm:w-48 p-1.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#E5E9F0] shadow-[0_15px_35px_rgba(0,0,0,0.12)] flex flex-col gap-1 z-50 transition-all duration-200 origin-top-right ${
            isMobileMenuOpen
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <button
            onClick={() => {
              scrollToSection("home");
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3.5 py-2 rounded-xl bg-[#0096C7] text-white font-medium text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => {
              scrollToSection("work");
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3.5 py-2 rounded-xl text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 font-medium text-xs sm:text-sm transition-colors cursor-pointer"
          >
            Work & Archive
          </button>
          <button
            onClick={() => {
              scrollToSection("about");
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3.5 py-2 rounded-xl text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 font-medium text-xs sm:text-sm transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => {
              scrollToSection("contact");
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3.5 py-2 rounded-xl text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 font-medium text-xs sm:text-sm transition-colors cursor-pointer"
          >
            Contact
          </button>
        </div>
      </div>

      {/* Backdrop per chiudere il menu toccando fuori */}
      <div
        onClick={() => setIsMobileMenuOpen(false)}
        className={`fixed inset-0 z-[48] bg-black/15 backdrop-blur-[1px] md:hidden transition-opacity duration-200 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Floating Pill ScrollSpy Navigation (Posizionato all'angolo opposto al logo, senza slop o font mono) */}
      <aside
        aria-label="Navigazione sezioni"
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-center"
      >
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.04)] px-1.5 py-2.5 rounded-full flex flex-col items-center gap-2">
          {SECTIONS.map((section, idx) => {
            const isActive = activeSectionIndex === idx;
            return (
              <div key={section.id} className="relative group flex items-center">
                {/* Tooltip minimale e umano all'hover: solo il nome della sezione, niente separatori o font mono */}
                <div className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-3 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-200 ease-out whitespace-nowrap bg-neutral-900/90 text-white backdrop-blur-md px-3 py-1 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.2)] border border-neutral-700/60 text-xs font-medium tracking-normal select-none">
                  {section.label}
                </div>

                {/* Pillola / Indicatore Interattivo */}
                <button
                  onClick={() => navigateToSection(idx)}
                  aria-label={`Vai alla sezione ${section.label}`}
                  aria-current={isActive ? "step" : undefined}
                  className={`rounded-full transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0096C7] ${
                    isActive
                      ? "w-2 h-6 bg-[#0096C7] shadow-[0_2px_8px_rgba(0,150,199,0.45)]"
                      : "w-2 h-2 bg-stone-300 hover:bg-stone-400 hover:h-3"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </aside>

      {/* Wrapper dedicato per isolare ScrollTrigger pin-spacer dal resto del DOM */}
      <div className="relative w-full">
        {/* Contenitore Pinned dello Stack: bloccato a schermo durante lo scrub */}
        <div ref={pinnedContainerRef} className="relative w-full h-[100dvh] overflow-hidden">
        {/* --- CARD 1: HERO PILLOLA (z-10, scala indietro con lo scroll) --- */}
        <div
          ref={card1Ref}
          className="absolute inset-0 w-full h-full flex items-center justify-center p-0 z-10 will-change-transform origin-center"
        >
          <section className="relative w-full h-full rounded-[1000px] border-x-[10px] border-y-0 border-[#E4DCD0] bg-[#F5EFE6] overflow-hidden flex flex-col justify-between items-center shadow-[0_20px_50px_rgba(10,25,47,0.12)]">
            {/* Header interno alla pillola: Navbar a 4 voci (visibile solo da tablet/iPad in su) */}
            <header className="w-full pt-6 sm:pt-8 md:pt-10 flex justify-center items-center z-10 min-h-[50px]">
              <nav className="hidden md:flex items-center gap-1 bg-white/90 backdrop-blur-md border border-[#E5DDD0] p-1.5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.03)] text-xs sm:text-sm">
                <button
                  onClick={() => scrollToSection("home")}
                  className={`px-4 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                    activeSectionIndex === 0
                      ? "bg-[#0096C7] text-white shadow-xs"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("work")}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                    activeSectionIndex >= 1 && activeSectionIndex <= 3
                      ? "bg-[#0096C7] text-white shadow-xs"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  Work & Archive
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                    activeSectionIndex === 4
                      ? "bg-[#0096C7] text-white shadow-xs"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                    activeSectionIndex === 6
                      ? "bg-[#0096C7] text-white shadow-xs"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  Contact
                </button>
              </nav>
            </header>

            {/* Contenuto centrale: Tipografia allineata a sinistra posizionata centralmente */}
            <div className="w-full flex-1 flex flex-col justify-center items-center px-10 sm:px-16 md:px-24 lg:px-36 max-w-5xl">
              <div className="w-full text-left space-y-3 sm:space-y-4">
                <p className="text-base sm:text-lg md:text-xl font-normal text-[#7A6B5D] tracking-tight">
                  Hi, I&apos;m Herald :)
                </p>
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-medium tracking-[-0.025em] text-[#24180F] leading-[1.16] sm:leading-[1.12]">
                  I <span className="text-[#0096C7] font-medium">design</span> digital
                  products that{" "}
                  <span className="italic font-serif font-normal">help</span> and{" "}
                  <span className="italic font-serif font-normal">simplify</span>{" "}
                  people&apos;s lives
                </h1>
              </div>
            </div>

            {/* Footer interno alla pillola: bilanciamento verticale minimale */}
            <footer className="w-full pb-6 sm:pb-8 md:pb-10 px-8 flex justify-center items-center z-10 min-h-[50px]" />
          </section>
        </div>

        {/* --- CARD 2: INTERACTIVE CASE STUDY TOGGLE PILL (CASE 01: UNGDOMSKORT) --- */}
        <div
          ref={card2Ref}
          className="absolute inset-0 w-full h-full flex items-center justify-center p-0 z-20 will-change-transform"
        >
          <section className="relative w-full h-full rounded-[1000px] border-x-[10px] border-y-0 border-[#E4DCD0] bg-[#F5EFE6] overflow-hidden flex items-center justify-center p-3 sm:p-6 md:p-8 lg:p-10 shadow-[0_20px_50px_rgba(10,25,47,0.12)]">
            {/* Contenitore interattivo del Toggle (Bouncy Bubble Physics) */}
            <div
              role="switch"
              aria-checked={case1Toggle === "on"}
              tabIndex={0}
              aria-label={
                case1Toggle === "off"
                  ? "Attiva dettagli del case study Ungdomskort"
                  : "Torna alla copertina del case study Ungdomskort"
              }
              onClick={() => {
                setHasToggledOnce1(true);
                setCase1Toggle((prev) => (prev === "off" ? "on" : "off"));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setHasToggledOnce1(true);
                  setCase1Toggle((prev) => (prev === "off" ? "on" : "off"));
                }
              }}
              style={{ "--travel-dist": "48cqw" } as React.CSSProperties}
              className={`group relative w-full h-full rounded-[1000px] [container-type:inline-size] cursor-pointer select-none overflow-hidden transition-colors duration-500 ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.988] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0096C7]/50 ${
                case1Toggle === "off"
                  ? "bg-[#E5DDD0] border-[6px] md:border-[8px] border-[#D7CEBF] hover:border-[#C4B9A7] shadow-[inset_0_3px_12px_rgba(40,28,16,0.06),_0_8px_24px_rgba(40,28,16,0.03)]"
                  : "bg-[#0096C7] border-[7px] md:border-[10px] border-[#0077B6] hover:border-[#023E8A] shadow-[0_25px_60px_rgba(0,180,216,0.35)]"
              }`}
            >
              {/* Sfondo dinamico con sfumatura sottile in stato attivo */}
              <div
                className={`absolute inset-0 rounded-[1000px] pointer-events-none transition-opacity duration-500 bg-gradient-to-r from-[#00B4D8] via-[#0096C7] to-[#0077B6] ${
                  case1Toggle === "on" ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* 1. STATO ATTIVO (ON) - LATO SINISTRO: Dettagli sintetici e minimalisti */}
              <div
                className={`absolute left-[3%] sm:left-[4%] top-0 w-[48%] h-full flex flex-col justify-center px-4 sm:px-6 md:px-10 lg:px-12 space-y-3 sm:space-y-5 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  case1Toggle === "on"
                    ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-x-12 pointer-events-none"
                }`}
              >
                <div>
                  <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                    Ungdomskort
                  </h2>
                  <p className="text-xs sm:text-base md:text-xl text-cyan-100 font-normal leading-snug mt-1.5 sm:mt-2.5 max-w-xl">
                    Denmark&apos;s youth transit pass platform redesign.
                  </p>
                </div>

                {/* Pulsante primario bianco con testo mare sardo su fondo attivo */}
                <div className="pt-1 sm:pt-2">
                  <a
                    href="https://www.heraldago.com/ungdomskort"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation(); // Evita che il click sul pulsante richiuda il toggle
                    }}
                    className="inline-flex items-center gap-1.5 px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-full bg-white hover:bg-cyan-50 active:scale-95 text-[#0077B6] text-xs sm:text-sm font-semibold shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.22)] transition-all cursor-pointer"
                  >
                    <span>See more</span>
                    <span className="text-xs font-bold">↗</span>
                  </a>
                </div>
              </div>

              {/* 2. STATO SPENTO (OFF) - LATO DESTRO: Solo il Titolo Puro */}
              <div
                className={`absolute right-[3%] top-0 w-[48%] h-full flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  case1Toggle === "off"
                    ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-75 translate-x-12 pointer-events-none"
                }`}
              >
                <div className="flex flex-col items-center justify-center text-center px-4 max-w-lg select-none pointer-events-none">
                  <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#24180F] group-hover:text-[#18100A] transition-colors">
                    Ungdomskort
                  </h3>
                </div>
              </div>

              {/* 3. IL KNOB / THUMB DEL TOGGLE (Animazione BUBBLE + Hover State Dedicato) */}
              <div
                className={`absolute top-[6%] h-[88%] left-[2%] sm:left-[2.5%] w-[47%] rounded-[1000px] overflow-visible ${
                  !hasToggledOnce1
                    ? "translate-x-0"
                    : case1Toggle === "on"
                    ? "bubble-knob-in"
                    : "bubble-knob-out"
                } flex items-center justify-center select-none`}
              >
                {/* Guscio interattivo interno con stato hover dedicato specificamente per l'area del knob */}
                <div
                  className={`relative w-full h-full rounded-[1000px] overflow-hidden flex items-center justify-center p-2.5 sm:p-5 md:p-7 transition-all duration-300 ease-out cursor-pointer ${
                    case1Toggle === "off"
                      ? "bg-white border-[6px] md:border-[8px] border-white shadow-[0_12px_32px_rgba(40,28,16,0.12),_0_2px_6px_rgba(40,28,16,0.06)] hover:scale-[1.025] hover:shadow-[0_24px_55px_rgba(40,28,16,0.20),_0_4px_12px_rgba(40,28,16,0.08)] hover:border-[#D7CEBF] active:scale-[0.98]"
                      : "bg-white border-[6px] md:border-[8px] border-white shadow-[0_16px_45px_rgba(0,0,0,0.24)] hover:scale-[1.015] hover:shadow-[0_24px_60px_rgba(0,0,0,0.3),_0_0_0_4px_rgba(255,255,255,0.45)] active:scale-[0.98]"
                  }`}
                >
                  {/* Schermo del Device dentro il Knob (opaco quando spento, brillante all'hover e su ON) */}
                  <div
                    className={`relative w-full h-full min-h-full flex items-center justify-center pointer-events-none transition-all duration-500 ease-out ${
                      case1Toggle === "off"
                        ? "opacity-65 group-hover:opacity-90 contrast-[0.95] group-hover:contrast-100"
                        : "opacity-100 brightness-100"
                    }`}
                  >
                    <Image
                      src="/ungheromockup.svg"
                      alt="Ungdomskort Hero Mockup"
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 85vw, 45vw"
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* --- CARD 3: REAL CASE STUDY 02 TOGGLE PILL (X-BIT) --- */}
        <div
          ref={card3Ref}
          className="absolute inset-0 w-full h-full flex items-center justify-center p-0 z-[25] will-change-transform"
        >
          <section className="relative w-full h-full rounded-[1000px] border-x-[10px] border-y-0 border-[#E4DCD0] bg-[#F5EFE6] overflow-hidden flex items-center justify-center p-3 sm:p-6 md:p-8 lg:p-10 shadow-[0_20px_50px_rgba(10,25,47,0.12)]">
            <div
              role="switch"
              aria-checked={case2Toggle === "on"}
              tabIndex={0}
              aria-label={
                case2Toggle === "off"
                  ? "Attiva dettagli del case study X-Bit"
                  : "Torna alla copertina del case study X-Bit"
              }
              onClick={() => {
                setHasToggledOnce2(true);
                setCase2Toggle((prev) => (prev === "off" ? "on" : "off"));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setHasToggledOnce2(true);
                  setCase2Toggle((prev) => (prev === "off" ? "on" : "off"));
                }
              }}
              style={{ "--travel-dist": "48cqw" } as React.CSSProperties}
              className={`group relative w-full h-full rounded-[1000px] [container-type:inline-size] cursor-pointer select-none overflow-hidden transition-colors duration-500 ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.988] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0096C7]/50 ${
                case2Toggle === "off"
                  ? "bg-[#E5DDD0] border-[6px] md:border-[8px] border-[#D7CEBF] hover:border-[#C4B9A7] shadow-[inset_0_3px_12px_rgba(40,28,16,0.06),_0_8px_24px_rgba(40,28,16,0.03)]"
                  : "bg-[#0096C7] border-[7px] md:border-[10px] border-[#0077B6] hover:border-[#023E8A] shadow-[0_25px_60px_rgba(0,180,216,0.35)]"
              }`}
            >
              {/* Sfondo dinamico azzurro mare sardo / piscina in stato attivo */}
              <div
                className={`absolute inset-0 rounded-[1000px] pointer-events-none transition-opacity duration-500 bg-gradient-to-r from-[#00B4D8] via-[#0096C7] to-[#0077B6] ${
                  case2Toggle === "on" ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* 1. STATO ATTIVO (ON) - LATO SINISTRO: Dettagli sintetici e minimalisti */}
              <div
                className={`absolute left-[3%] sm:left-[4%] top-0 w-[48%] h-full flex flex-col justify-center px-4 sm:px-6 md:px-10 lg:px-12 space-y-3 sm:space-y-5 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  case2Toggle === "on"
                    ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-x-12 pointer-events-none"
                }`}
              >
                <div>
                  <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                    X-Bit
                  </h2>
                  <p className="text-xs sm:text-base md:text-xl text-cyan-100 font-normal leading-snug mt-1.5 sm:mt-2.5 max-w-xl">
                    Museum exploration and interactive audio guide.
                  </p>
                </div>

                <div className="pt-1 sm:pt-2">
                  <a
                    href="https://www.heraldago.com/xbit"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-full bg-white hover:bg-cyan-50 active:scale-95 text-[#0077B6] text-xs sm:text-sm font-semibold shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.22)] transition-all cursor-pointer"
                  >
                    <span>See more</span>
                    <span className="text-xs font-bold">↗</span>
                  </a>
                </div>
              </div>

              {/* 2. STATO SPENTO (OFF) - LATO DESTRO: Solo il Titolo Puro */}
              <div
                className={`absolute right-[3%] top-0 w-[48%] h-full flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  case2Toggle === "off"
                    ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-75 translate-x-12 pointer-events-none"
                }`}
              >
                <div className="flex flex-col items-center justify-center text-center px-4 max-w-lg select-none pointer-events-none">
                  <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#24180F] group-hover:text-[#18100A] transition-colors">
                    X-Bit
                  </h3>
                </div>
              </div>

              {/* 3. IL KNOB DEL TOGGLE (Animazione BUBBLE + Mockup X-Bit) */}
              <div
                className={`absolute top-[6%] h-[88%] left-[2%] sm:left-[2.5%] w-[47%] rounded-[1000px] overflow-visible ${
                  !hasToggledOnce2
                    ? "translate-x-0"
                    : case2Toggle === "on"
                    ? "bubble-knob-in"
                    : "bubble-knob-out"
                } flex items-center justify-center select-none`}
              >
                <div
                  className={`relative w-full h-full rounded-[1000px] overflow-hidden flex items-center justify-center p-2.5 sm:p-5 md:p-7 transition-all duration-300 ease-out cursor-pointer ${
                    case2Toggle === "off"
                      ? "bg-white border-[6px] md:border-[8px] border-white shadow-[0_12px_32px_rgba(40,28,16,0.12),_0_2px_6px_rgba(40,28,16,0.06)] hover:scale-[1.025] hover:shadow-[0_24px_55px_rgba(40,28,16,0.20),_0_4px_12px_rgba(40,28,16,0.08)] hover:border-[#D7CEBF] active:scale-[0.98]"
                      : "bg-white border-[6px] md:border-[8px] border-white shadow-[0_16px_45px_rgba(0,0,0,0.24)] hover:scale-[1.015] hover:shadow-[0_24px_60px_rgba(0,0,0,0.3),_0_0_0_4px_rgba(255,255,255,0.45)] active:scale-[0.98]"
                  }`}
                >
                  <div
                    className={`relative w-full h-full min-h-full flex items-center justify-center pointer-events-none transition-all duration-500 ease-out ${
                      case2Toggle === "off"
                        ? "opacity-65 group-hover:opacity-90 contrast-[0.95] group-hover:contrast-100"
                        : "opacity-100 brightness-100"
                    }`}
                  >
                    <Image
                      src="/xbitheromockup.svg"
                      alt="X-Bit Museum App Mockup"
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 85vw, 45vw"
                      className="object-contain p-2 sm:p-4"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* --- CARD 4: REAL CASE STUDY 03 TOGGLE PILL (I PUPI SICILIANI) --- */}
        <div
          ref={card4Ref}
          className="absolute inset-0 w-full h-full flex items-center justify-center p-0 z-[30] will-change-transform"
        >
          <section className="relative w-full h-full rounded-[1000px] border-x-[10px] border-y-0 border-[#E4DCD0] bg-[#F5EFE6] overflow-hidden flex items-center justify-center p-3 sm:p-6 md:p-8 lg:p-10 shadow-[0_20px_50px_rgba(10,25,47,0.12)]">
            <div
              role="switch"
              aria-checked={case3Toggle === "on"}
              tabIndex={0}
              aria-label={
                case3Toggle === "off"
                  ? "Attiva dettagli del case study I Pupi Siciliani"
                  : "Torna alla copertina del case study I Pupi Siciliani"
              }
              onClick={() => {
                setHasToggledOnce3(true);
                setCase3Toggle((prev) => (prev === "off" ? "on" : "off"));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setHasToggledOnce3(true);
                  setCase3Toggle((prev) => (prev === "off" ? "on" : "off"));
                }
              }}
              style={{ "--travel-dist": "48cqw" } as React.CSSProperties}
              className={`group relative w-full h-full rounded-[1000px] [container-type:inline-size] cursor-pointer select-none overflow-hidden transition-colors duration-500 ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.988] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0096C7]/50 ${
                case3Toggle === "off"
                  ? "bg-[#E5DDD0] border-[6px] md:border-[8px] border-[#D7CEBF] hover:border-[#C4B9A7] shadow-[inset_0_3px_12px_rgba(40,28,16,0.06),_0_8px_24px_rgba(40,28,16,0.03)]"
                  : "bg-[#0096C7] border-[7px] md:border-[10px] border-[#0077B6] hover:border-[#023E8A] shadow-[0_25px_60px_rgba(0,180,216,0.35)]"
              }`}
            >
              {/* Sfondo dinamico azzurro mare sardo / piscina in stato attivo */}
              <div
                className={`absolute inset-0 rounded-[1000px] pointer-events-none transition-opacity duration-500 bg-gradient-to-r from-[#00B4D8] via-[#0096C7] to-[#0077B6] ${
                  case3Toggle === "on" ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* 1. STATO ATTIVO (ON) - LATO SINISTRO: Dettagli sintetici e minimalisti */}
              <div
                className={`absolute left-[3%] sm:left-[4%] top-0 w-[48%] h-full flex flex-col justify-center px-4 sm:px-6 md:px-10 lg:px-12 space-y-3 sm:space-y-5 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  case3Toggle === "on"
                    ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-x-12 pointer-events-none"
                }`}
              >
                <div>
                  <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                    I Pupi Siciliani
                  </h2>
                  <p className="text-xs sm:text-base md:text-xl text-cyan-100 font-normal leading-snug mt-1.5 sm:mt-2.5 max-w-xl">
                    Wine retail platform with +187% YoY profit.
                  </p>
                </div>

                <div className="pt-1 sm:pt-2">
                  <a
                    href="https://www.heraldago.com/ipupisiciliani"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-full bg-white hover:bg-cyan-50 active:scale-95 text-[#0077B6] text-xs sm:text-sm font-semibold shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.22)] transition-all cursor-pointer"
                  >
                    <span>See more</span>
                    <span className="text-xs font-bold">↗</span>
                  </a>
                </div>
              </div>

              {/* 2. STATO SPENTO (OFF) - LATO DESTRO: Solo il Titolo Puro */}
              <div
                className={`absolute right-[3%] top-0 w-[48%] h-full flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  case3Toggle === "off"
                    ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-75 translate-x-12 pointer-events-none"
                }`}
              >
                <div className="flex flex-col items-center justify-center text-center px-4 max-w-lg select-none pointer-events-none">
                  <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#24180F] group-hover:text-[#18100A] transition-colors">
                    I Pupi Siciliani
                  </h3>
                </div>
              </div>

              {/* 3. IL KNOB DEL TOGGLE (Animazione BUBBLE + Mockup I Pupi Siciliani) */}
              <div
                className={`absolute top-[6%] h-[88%] left-[2%] sm:left-[2.5%] w-[47%] rounded-[1000px] overflow-visible ${
                  !hasToggledOnce3
                    ? "translate-x-0"
                    : case3Toggle === "on"
                    ? "bubble-knob-in"
                    : "bubble-knob-out"
                } flex items-center justify-center select-none`}
              >
                <div
                  className={`relative w-full h-full rounded-[1000px] overflow-hidden flex items-center justify-center p-2.5 sm:p-5 md:p-7 transition-all duration-300 ease-out cursor-pointer ${
                    case3Toggle === "off"
                      ? "bg-white border-[6px] md:border-[8px] border-white shadow-[0_12px_32px_rgba(40,28,16,0.12),_0_2px_6px_rgba(40,28,16,0.06)] hover:scale-[1.025] hover:shadow-[0_24px_55px_rgba(40,28,16,0.20),_0_4px_12px_rgba(40,28,16,0.08)] hover:border-[#D7CEBF] active:scale-[0.98]"
                      : "bg-white border-[6px] md:border-[8px] border-white shadow-[0_16px_45px_rgba(0,0,0,0.24)] hover:scale-[1.015] hover:shadow-[0_24px_60px_rgba(0,0,0,0.3),_0_0_0_4px_rgba(255,255,255,0.45)] active:scale-[0.98]"
                  }`}
                >
                  <div
                    className={`relative w-full h-full min-h-full flex items-center justify-center pointer-events-none transition-all duration-500 ease-out ${
                      case3Toggle === "off"
                        ? "opacity-65 group-hover:opacity-90 contrast-[0.95] group-hover:contrast-100"
                        : "opacity-100 brightness-100"
                    }`}
                  >
                    <Image
                      src="/pupi-mockup.svg"
                      alt="I Pupi Siciliani Wine Store Mockup"
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 85vw, 45vw"
                      className="object-contain p-2 sm:p-4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* --- CARD 5: ABOUT ME INTERACTIVE TOGGLE PILL --- */}
        <div
          ref={card5Ref}
          className="absolute inset-0 w-full h-full flex items-center justify-center p-0 z-[35] will-change-transform"
        >
          <section className="relative w-full h-full rounded-[1000px] border-x-[10px] border-y-0 border-[#E4DCD0] bg-[#F5EFE6] overflow-hidden flex items-center justify-center p-3 sm:p-6 md:p-8 lg:p-10 shadow-[0_20px_50px_rgba(10,25,47,0.12)]">
            <div
              role="switch"
              aria-checked={case4Toggle === "on"}
              tabIndex={0}
              aria-label={
                case4Toggle === "off"
                  ? "Attiva dettagli su About Me"
                  : "Torna alla copertina di About Me"
              }
              onClick={() => {
                setHasToggledOnce4(true);
                setCase4Toggle((prev) => (prev === "off" ? "on" : "off"));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setHasToggledOnce4(true);
                  setCase4Toggle((prev) => (prev === "off" ? "on" : "off"));
                }
              }}
              style={{ "--travel-dist": "48cqw" } as React.CSSProperties}
              className={`group relative w-full h-full rounded-[1000px] [container-type:inline-size] cursor-pointer select-none overflow-hidden transition-colors duration-500 ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.988] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0096C7]/50 ${
                case4Toggle === "off"
                  ? "bg-[#E5DDD0] border-[6px] md:border-[8px] border-[#D7CEBF] hover:border-[#C4B9A7] shadow-[inset_0_3px_12px_rgba(40,28,16,0.06),_0_8px_24px_rgba(40,28,16,0.03)]"
                  : "bg-[#0096C7] border-[7px] md:border-[10px] border-[#0077B6] hover:border-[#023E8A] shadow-[0_25px_60px_rgba(0,180,216,0.35)]"
              }`}
            >
              {/* Sfondo dinamico azzurro mare sardo / piscina in stato attivo */}
              <div
                className={`absolute inset-0 rounded-[1000px] pointer-events-none transition-opacity duration-500 bg-gradient-to-r from-[#00B4D8] via-[#0096C7] to-[#0077B6] ${
                  case4Toggle === "on" ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* 1. STATO ATTIVO (ON) - LATO SINISTRO: Bio essenziale e minimalista */}
              <div
                className={`absolute left-[3%] sm:left-[4%] top-0 w-[48%] h-full flex flex-col justify-center px-4 sm:px-6 md:px-10 lg:px-12 space-y-3 sm:space-y-4 md:space-y-5 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  case4Toggle === "on"
                    ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-x-12 pointer-events-none"
                }`}
              >
                <div>
                  <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                    Herald Ago
                  </h2>
                  <p className="text-xs sm:text-base md:text-xl text-cyan-100 font-normal leading-snug mt-1 sm:mt-2 max-w-xl">
                    Product Designer based in Barcelona
                  </p>
                </div>

                <p className="text-xs sm:text-sm md:text-base text-cyan-50 leading-relaxed max-w-lg font-normal">
                  I design digital products that simplify everyday life. MSc in IT - Web Communication Design from the University of Southern Denmark.
                </p>

                {/* Pulsanti di Azione */}
                <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-2">
                  <a
                    href="/cv-herald-ago.pdf"
                    target="_blank"
                    download
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white hover:bg-cyan-50 active:scale-95 text-[#0077B6] text-[11px] sm:text-xs md:text-sm font-semibold shadow-[0_4px_14px_rgba(0,0,0,0.15)] transition-all cursor-pointer"
                  >
                    <span>Download Resume PDF</span>
                    <span className="text-xs font-bold">↗</span>
                  </a>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToSection(6);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 text-white text-[11px] sm:text-xs md:text-sm font-medium border border-white/30 transition-all cursor-pointer"
                  >
                    <span>Contact me</span>
                  </button>
                </div>
              </div>

              {/* 2. STATO SPENTO (OFF) - LATO DESTRO: Titolo Pulito e Minimale */}
              <div
                className={`absolute right-[3%] top-0 w-[48%] h-full flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  case4Toggle === "off"
                    ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-75 translate-x-12 pointer-events-none"
                }`}
              >
                <div className="flex flex-col items-center justify-center text-center px-4 max-w-lg select-none pointer-events-none">
                  <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#24180F] group-hover:text-[#18100A] transition-colors">
                    About Me
                  </h3>
                </div>
              </div>

              {/* 3. IL KNOB DEL TOGGLE (Animazione BUBBLE + Ritratto Reale Zoom-out) */}
              <div
                className={`absolute top-[6%] h-[88%] left-[2%] sm:left-[2.5%] w-[47%] rounded-[1000px] overflow-visible ${
                  !hasToggledOnce4
                    ? "translate-x-0"
                    : case4Toggle === "on"
                    ? "bubble-knob-in"
                    : "bubble-knob-out"
                } flex items-center justify-center select-none`}
              >
                <div
                  className={`relative w-full h-full rounded-[1000px] overflow-hidden flex items-center justify-center p-2 sm:p-4 transition-all duration-300 ease-out cursor-pointer ${
                    case4Toggle === "off"
                      ? "bg-white border-[6px] md:border-[8px] border-white shadow-[0_12px_32px_rgba(40,28,16,0.12),_0_2px_6px_rgba(40,28,16,0.06)] hover:scale-[1.025] hover:shadow-[0_24px_55px_rgba(40,28,16,0.20),_0_4px_12px_rgba(40,28,16,0.08)] hover:border-[#D7CEBF] active:scale-[0.98]"
                      : "bg-white border-[6px] md:border-[8px] border-white shadow-[0_16px_45px_rgba(0,0,0,0.24)] hover:scale-[1.015] hover:shadow-[0_24px_60px_rgba(0,0,0,0.3),_0_0_0_4px_rgba(255,255,255,0.45)] active:scale-[0.98]"
                  }`}
                >
                  <div
                    className={`relative w-full h-full min-h-full flex items-center justify-center pointer-events-none transition-all duration-500 ease-out rounded-[1000px] overflow-hidden ${
                      case4Toggle === "off"
                        ? "opacity-70 group-hover:opacity-95 contrast-[0.95] group-hover:contrast-100"
                        : "opacity-100 brightness-100"
                    }`}
                  >
                    <Image
                      src="/profile-pro.jpg"
                      alt="Herald Ago"
                      fill
                      priority
                      sizes="(max-width: 768px) 85vw, 45vw"
                      className="object-cover object-[center_top]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* --- CARD 6: RECOMMENDATIONS INTERACTIVE TOGGLE PILL --- */}
        <div
          ref={card6Ref}
          className="absolute inset-0 w-full h-full flex items-center justify-center p-0 z-[40] will-change-transform"
        >
          <section className="relative w-full h-full rounded-[1000px] border-x-[10px] border-y-0 border-[#E4DCD0] bg-[#F5EFE6] overflow-hidden flex items-center justify-center p-3 sm:p-6 md:p-8 lg:p-10 shadow-[0_20px_50px_rgba(10,25,47,0.12)]">
            <div
              role="switch"
              aria-checked={case5Toggle === "on"}
              tabIndex={0}
              aria-label={
                case5Toggle === "off"
                  ? "Attiva raccomandazioni e testimonianze"
                  : "Torna alla copertina delle raccomandazioni"
              }
              onClick={() => {
                setHasToggledOnce5(true);
                setCase5Toggle((prev) => (prev === "off" ? "on" : "off"));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setHasToggledOnce5(true);
                  setCase5Toggle((prev) => (prev === "off" ? "on" : "off"));
                }
              }}
              style={{ "--travel-dist": "48cqw" } as React.CSSProperties}
              className={`group relative w-full h-full rounded-[1000px] [container-type:inline-size] cursor-pointer select-none overflow-hidden transition-colors duration-500 ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.988] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0096C7]/50 ${
                case5Toggle === "off"
                  ? "bg-[#E5DDD0] border-[6px] md:border-[8px] border-[#D7CEBF] hover:border-[#C4B9A7] shadow-[inset_0_3px_12px_rgba(40,28,16,0.06),_0_8px_24px_rgba(40,28,16,0.03)]"
                  : "bg-[#0096C7] border-[7px] md:border-[10px] border-[#0077B6] hover:border-[#023E8A] shadow-[0_25px_60px_rgba(0,180,216,0.35)]"
              }`}
            >
              {/* Sfondo dinamico azzurro mare sardo / piscina in stato attivo */}
              <div
                className={`absolute inset-0 rounded-[1000px] pointer-events-none transition-opacity duration-500 bg-gradient-to-r from-[#00B4D8] via-[#0096C7] to-[#0077B6] ${
                  case5Toggle === "on" ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* 1. STATO ATTIVO (ON) - LATO SINISTRO: Testimonianze Sintetiche */}
              <div
                className={`absolute left-[3.5%] sm:left-[4%] top-0 w-[43%] sm:w-[44%] lg:w-[45%] max-w-[45%] h-full flex flex-col justify-center pl-4 sm:pl-6 md:pl-8 lg:pl-10 pr-2 sm:pr-4 md:pr-5 space-y-2 sm:space-y-2.5 md:space-y-3 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  case5Toggle === "on"
                    ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-x-12 pointer-events-none"
                }`}
              >
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-bold text-white tracking-tight leading-tight">
                    Kind Words
                  </h2>
                </div>

                {/* Card Testimonial 1: Antonio (I Pupi Siciliani) */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveRecPhoto("antonio");
                  }}
                  onMouseEnter={() => setActiveRecPhoto("antonio")}
                  className={`p-2.5 sm:p-3 md:p-3.5 rounded-2xl transition-all duration-300 backdrop-blur-xs text-white cursor-pointer ${
                    activeRecPhoto === "antonio"
                      ? "bg-white/20 border-2 border-white/50 shadow-[0_8px_24px_rgba(0,0,0,0.12)] scale-[1.01]"
                      : "bg-white/10 border border-white/20 hover:bg-white/15"
                  }`}
                >
                  <p className="text-xs sm:text-[13px] md:text-sm leading-relaxed font-normal">
                    &ldquo;Herald has rare proactivity and deep study. The dedication he brings to preparing every detail and the immediate trust he inspires in people will take him very far.&rdquo;
                  </p>
                  <div className="flex items-center gap-2 mt-1.5 sm:mt-2">
                    <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-white/50 flex-shrink-0 shadow-xs">
                      <Image
                        src="/antonio-avatar.jpg"
                        alt="Antonio"
                        fill
                        unoptimized
                        sizes="32px"
                        className="object-cover object-center"
                      />
                    </div>
                    <div>
                      <p className="text-[11px] sm:text-xs font-semibold text-white">Antonio</p>
                      <p className="text-[9px] sm:text-[10px] text-cyan-100">Founder, I Pupi Siciliani</p>
                    </div>
                  </div>
                </div>

                {/* Card Testimonial 2: Sebastian (næmt.nu) */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveRecPhoto("sebastian");
                  }}
                  onMouseEnter={() => setActiveRecPhoto("sebastian")}
                  className={`p-2.5 sm:p-3 md:p-3.5 rounded-2xl transition-all duration-300 backdrop-blur-xs text-white cursor-pointer ${
                    activeRecPhoto === "sebastian"
                      ? "bg-white/20 border-2 border-white/50 shadow-[0_8px_24px_rgba(0,0,0,0.12)] scale-[1.01]"
                      : "bg-white/10 border border-white/20 hover:bg-white/15"
                  }`}
                >
                  <p className="text-xs sm:text-[13px] md:text-sm leading-relaxed font-normal">
                    &ldquo;Herald excelled at cross-stakeholder collaboration, guiding the entire creation process from start to finish with great precision and genuine passion.&rdquo;
                  </p>
                  <div className="flex items-center gap-2 mt-1.5 sm:mt-2">
                    <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-white/50 flex-shrink-0 shadow-xs">
                      <Image
                        src="/sebastian-avatar.jpg"
                        alt="Sebastian"
                        fill
                        unoptimized
                        sizes="32px"
                        className="object-cover object-center"
                      />
                    </div>
                    <div>
                      <p className="text-[11px] sm:text-xs font-semibold text-white">Sebastian</p>
                      <p className="text-[9px] sm:text-[10px] text-cyan-100">CEO, næmt.nu</p>
                    </div>
                  </div>
                </div>

                {/* Pulsante Navigazione */}
                <div className="pt-0.5 sm:pt-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToSection(6);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white hover:bg-cyan-50 active:scale-95 text-[#0077B6] text-xs sm:text-sm font-semibold shadow-[0_4px_14px_rgba(0,0,0,0.15)] transition-all cursor-pointer"
                  >
                    <span>Next: Contact</span>
                    <span className="text-xs font-bold">↗</span>
                  </button>
                </div>
              </div>

              {/* 2. STATO SPENTO (OFF) - LATO DESTRO: Titolo Pulito e Minimale */}
              <div
                className={`absolute right-[3%] top-0 w-[48%] h-full flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  case5Toggle === "off"
                    ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-75 translate-x-12 pointer-events-none"
                }`}
              >
                <div className="flex flex-col items-center justify-center text-center px-4 max-w-lg select-none pointer-events-none">
                  <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#24180F] group-hover:text-[#18100A] transition-colors">
                    Recommendations
                  </h3>
                </div>
              </div>

              {/* 3. IL KNOB DEL TOGGLE (Animazione BUBBLE + Foto Reali con Crossfade Pulito, senza badge) */}
              <div
                className={`absolute top-[6%] h-[88%] left-[2%] sm:left-[2.5%] w-[47%] rounded-[1000px] overflow-visible ${
                  !hasToggledOnce5
                    ? "translate-x-0"
                    : case5Toggle === "on"
                    ? "bubble-knob-in"
                    : "bubble-knob-out"
                } flex items-center justify-center select-none`}
              >
                <div
                  className={`relative w-full h-full rounded-[1000px] overflow-hidden flex items-center justify-center p-2 sm:p-4 transition-all duration-300 ease-out cursor-pointer ${
                    case5Toggle === "off"
                      ? "bg-white border-[6px] md:border-[8px] border-white shadow-[0_12px_32px_rgba(40,28,16,0.12),_0_2px_6px_rgba(40,28,16,0.06)] hover:scale-[1.025] hover:shadow-[0_24px_55px_rgba(40,28,16,0.20),_0_4px_12px_rgba(40,28,16,0.08)] hover:border-[#D7CEBF] active:scale-[0.98]"
                      : "bg-white border-[6px] md:border-[8px] border-white shadow-[0_16px_45px_rgba(0,0,0,0.24)] hover:scale-[1.015] hover:shadow-[0_24px_60px_rgba(0,0,0,0.3),_0_0_0_4px_rgba(255,255,255,0.45)] active:scale-[0.98]"
                  }`}
                >
                  <div
                    className={`relative w-full h-full min-h-full flex items-center justify-center pointer-events-none transition-all duration-500 ease-out rounded-[1000px] overflow-hidden ${
                      case5Toggle === "off"
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

        {/* --- CARD 7: CONTACT INTERACTIVE TOGGLE PILL --- */}
        <div
          ref={card7Ref}
          className="absolute inset-0 w-full h-full flex items-center justify-center p-0 z-[45] will-change-transform"
        >
          <section className="relative w-full h-full rounded-[1000px] border-x-[10px] border-y-0 border-[#E4DCD0] bg-[#F5EFE6] overflow-hidden flex items-center justify-center p-3 sm:p-6 md:p-8 lg:p-10 shadow-[0_20px_50px_rgba(10,25,47,0.12)]">
            <div
              role="switch"
              aria-checked={case6Toggle === "on"}
              tabIndex={0}
              aria-label={
                case6Toggle === "off"
                  ? "Attiva canali di contatto"
                  : "Torna alla copertina dei contatti"
              }
              onClick={() => {
                setHasToggledOnce6(true);
                setCase6Toggle((prev) => (prev === "off" ? "on" : "off"));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setHasToggledOnce6(true);
                  setCase6Toggle((prev) => (prev === "off" ? "on" : "off"));
                }
              }}
              style={{ "--travel-dist": "48cqw" } as React.CSSProperties}
              className={`group relative w-full h-full rounded-[1000px] [container-type:inline-size] cursor-pointer select-none overflow-hidden transition-colors duration-500 ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.988] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0096C7]/50 ${
                case6Toggle === "off"
                  ? "bg-[#E5DDD0] border-[6px] md:border-[8px] border-[#D7CEBF] hover:border-[#C4B9A7] shadow-[inset_0_3px_12px_rgba(40,28,16,0.06),_0_8px_24px_rgba(40,28,16,0.03)]"
                  : "bg-[#0096C7] border-[7px] md:border-[10px] border-[#0077B6] hover:border-[#023E8A] shadow-[0_25px_60px_rgba(0,180,216,0.35)]"
              }`}
            >
              {/* Sfondo dinamico azzurro mare sardo / piscina in stato attivo */}
              <div
                className={`absolute inset-0 rounded-[1000px] pointer-events-none transition-opacity duration-500 bg-gradient-to-r from-[#00B4D8] via-[#0096C7] to-[#0077B6] ${
                  case6Toggle === "on" ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* 1. STATO ATTIVO (ON) - LATO SINISTRO: Canali di Contatto Diretti + Form */}
              <div
                className={`absolute left-[3%] sm:left-[4%] top-0 w-[48%] h-full flex flex-col justify-center px-3 sm:px-6 md:px-10 lg:px-12 space-y-2.5 sm:space-y-3.5 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  case6Toggle === "on"
                    ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-x-12 pointer-events-none"
                }`}
              >
                <div>
                  <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                    Let&apos;s Connect
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base text-cyan-100 font-normal leading-snug mt-1">
                    Open for product design opportunities.
                  </p>
                </div>

                {/* Pillole Rapide: Copia Email, LinkedIn, Resume */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="flex flex-wrap items-center gap-2 pt-0.5"
                >
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-white hover:bg-cyan-50 text-[#0077B6] text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    <span>heraldago1@gmail.com</span>
                    <span className="text-[10px] bg-cyan-100 text-[#0077B6] px-1.5 py-0.5 rounded-full font-medium">
                      {copiedEmail ? "Copied!" : "Copy"}
                    </span>
                  </button>
                  <a
                    href="https://www.linkedin.com/in/heraldago/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 sm:px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-medium border border-white/30 transition-all cursor-pointer"
                  >
                    <span>LinkedIn</span>
                    <span className="text-[10px]">↗</span>
                  </a>
                  <a
                    href="/cv-herald-ago.pdf"
                    target="_blank"
                    download
                    className="inline-flex items-center gap-1 px-3 sm:px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-medium border border-white/30 transition-all cursor-pointer"
                  >
                    <span>Resume PDF</span>
                    <span className="text-[10px]">↗</span>
                  </a>
                </div>

                {/* Form di contatto sul canvas sinistro */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="w-full pt-1 select-text"
                >
                  {contactSubmitted ? (
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-white/15 border border-white/25 backdrop-blur-xs text-center space-y-1.5">
                      <div className="w-8 h-8 rounded-full bg-emerald-400 text-slate-900 flex items-center justify-center mx-auto text-sm font-bold">
                        ✓
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-white">
                        Message sent!
                      </h3>
                      <p className="text-xs text-cyan-100">
                        Thank you for reaching out. I will reply soon.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setContactSubmitted(false);
                          setContactName("");
                          setContactEmail("");
                          setContactMessage("");
                        }}
                        className="px-3.5 py-1 rounded-full bg-white text-[#0077B6] text-xs font-semibold hover:bg-cyan-50 transition-colors cursor-pointer"
                      >
                        Send another
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-2 w-full">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="Your name"
                          className="w-full px-3.5 py-1.5 sm:py-2 rounded-xl bg-white/15 border border-white/25 text-xs sm:text-sm text-white placeholder:text-cyan-100/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all"
                        />
                        <input
                          type="email"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="Your email"
                          className="w-full px-3.5 py-1.5 sm:py-2 rounded-xl bg-white/15 border border-white/25 text-xs sm:text-sm text-white placeholder:text-cyan-100/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all"
                        />
                      </div>
                      <div>
                        <textarea
                          required
                          rows={2}
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          placeholder="Your message or project idea..."
                          className="w-full px-3.5 py-1.5 sm:py-2 rounded-xl bg-white/15 border border-white/25 text-xs sm:text-sm text-white placeholder:text-cyan-100/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 resize-none transition-all"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-5 py-1.5 sm:py-2 rounded-full bg-white hover:bg-cyan-50 active:scale-98 text-[#0077B6] font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span>Send Message</span>
                        <span className="text-xs font-bold">↗</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* 2. STATO SPENTO (OFF) - LATO DESTRO: Titolo Pulito e Minimale */}
              <div
                className={`absolute right-[3%] top-0 w-[48%] h-full flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  case6Toggle === "off"
                    ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-75 translate-x-12 pointer-events-none"
                }`}
              >
                <div className="flex flex-col items-center justify-center text-center px-4 max-w-lg select-none pointer-events-none">
                  <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#24180F] group-hover:text-[#18100A] transition-colors">
                    Contact
                  </h3>
                </div>
              </div>

              {/* 3. IL KNOB DEL TOGGLE (Animazione BUBBLE + Handle Tattile Reattivo al Click) */}
              <div
                className={`absolute top-[6%] h-[88%] left-[2%] sm:left-[2.5%] w-[47%] rounded-[1000px] overflow-visible ${
                  !hasToggledOnce6
                    ? "translate-x-0"
                    : case6Toggle === "on"
                    ? "bubble-knob-in"
                    : "bubble-knob-out"
                } flex items-center justify-center select-none`}
              >
                <div
                  className={`relative w-full h-full rounded-[1000px] overflow-hidden flex items-center justify-center p-3 sm:p-5 md:p-6 transition-all duration-300 ease-out cursor-pointer ${
                    case6Toggle === "off"
                      ? "bg-white border-[6px] md:border-[8px] border-white shadow-[0_12px_32px_rgba(40,28,16,0.12),_0_2px_6px_rgba(40,28,16,0.06)] hover:scale-[1.025] hover:shadow-[0_24px_55px_rgba(40,28,16,0.20),_0_4px_12px_rgba(40,28,16,0.08)] hover:border-[#D7CEBF] active:scale-[0.98]"
                      : "bg-white border-[6px] md:border-[8px] border-white shadow-[0_16px_45px_rgba(0,0,0,0.24)] hover:scale-[1.015] hover:shadow-[0_24px_60px_rgba(0,0,0,0.3),_0_0_0_4px_rgba(255,255,255,0.45)] active:scale-[0.98]"
                  }`}
                >
                  {case6Toggle === "off" ? (
                    /* Copertina Knob quando SPENTO: Visual Contatto Elegante e Muted */
                    <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-4 pointer-events-none select-none opacity-80 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#E5DDD0] text-[#24180F] flex items-center justify-center text-xl sm:text-2xl shadow-xs border border-[#D7CEBF] mb-2">
                        ✉
                      </div>
                      <span className="text-sm sm:text-lg font-bold text-[#24180F]">
                        heraldago1@gmail.com
                      </span>
                      <span className="text-[11px] sm:text-xs text-[#7A6B5D] font-normal mt-0.5">
                        Barcelona, Spain
                      </span>
                    </div>
                  ) : (
                    /* Handle Tattile del Knob quando ATTIVO: 100% cliccabile per spegnere */
                    <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-4 pointer-events-none select-none">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-cyan-50 text-[#0077B6] flex items-center justify-center text-xl sm:text-2xl shadow-xs border border-cyan-100 mb-2">
                        ✉
                      </div>
                      <span className="text-sm sm:text-lg font-bold text-[#24180F]">
                        heraldago1@gmail.com
                      </span>
                      <span className="text-[11px] sm:text-xs text-[#7A6B5D] font-normal mt-0.5">
                        Barcelona, Spain
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </main>
  );
}


