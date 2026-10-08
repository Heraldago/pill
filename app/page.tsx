"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VantaWaves from "@/components/VantaWaves";
import VantaKnobWaves from "@/components/VantaKnobWaves";

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

  // Supporto swipe touch su mobile per attivare/disattivare il toggle
  const touchStartYRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
  };

  const createTouchEndHandler = (
    setter: React.Dispatch<React.SetStateAction<"off" | "on">>,
    setOnce: React.Dispatch<React.SetStateAction<boolean>>
  ) => (e: React.TouchEvent) => {
    if (touchStartYRef.current === null) return;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;
    touchStartYRef.current = null;
    if (deltaY > 35) {
      // Swipe verso il basso -> Accendi (ON)
      setOnce(true);
      setter("on");
    } else if (deltaY < -35) {
      // Swipe verso l'alto -> Spegni (OFF)
      setOnce(true);
      setter("off");
    }
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
      gsap.set(card1Ref.current, { autoAlpha: 1, scale: 1 });
      gsap.set(card2Ref.current, { yPercent: 100, autoAlpha: 1, scale: 1 });
      gsap.set(card3Ref.current, { yPercent: 100, autoAlpha: 1, scale: 1 });
      gsap.set(card4Ref.current, { yPercent: 100, autoAlpha: 1, scale: 1 });
      gsap.set(card5Ref.current, { yPercent: 100, autoAlpha: 1, scale: 1 });
      gsap.set(card6Ref.current, { yPercent: 100, autoAlpha: 1, scale: 1 });
      gsap.set(card7Ref.current, { yPercent: 100, autoAlpha: 1, scale: 1 });

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

      // Transizione 1: Card 1 sfuma e scompare a 0, Card 2 sale sopra
      tl.to(
        card1Ref.current,
        {
          autoAlpha: 0,
          scale: 0.94,
          ease: "power1.inOut",
          duration: 0.7,
        },
        0
      );
      tl.to(
        card2Ref.current,
        {
          yPercent: 0,
          ease: "power1.inOut",
          duration: 1,
        },
        0
      );

      // Transizione 2: Card 2 sfuma e scompare a 0, Card 3 sale sopra
      tl.to(
        card2Ref.current,
        {
          autoAlpha: 0,
          scale: 0.94,
          ease: "power1.inOut",
          duration: 0.7,
        },
        1
      );
      tl.to(
        card3Ref.current,
        {
          yPercent: 0,
          ease: "power1.inOut",
          duration: 1,
        },
        1
      );

      // Transizione 3: Card 3 sfuma e scompare a 0, Card 4 sale sopra
      tl.to(
        card3Ref.current,
        {
          autoAlpha: 0,
          scale: 0.94,
          ease: "power1.inOut",
          duration: 0.7,
        },
        2
      );
      tl.to(
        card4Ref.current,
        {
          yPercent: 0,
          ease: "power1.inOut",
          duration: 1,
        },
        2
      );

      // Transizione 4: Card 4 sfuma e scompare a 0, Card 5 (About Me) sale sopra
      tl.to(
        card4Ref.current,
        {
          autoAlpha: 0,
          scale: 0.94,
          ease: "power1.inOut",
          duration: 0.7,
        },
        3
      );
      tl.to(
        card5Ref.current,
        {
          yPercent: 0,
          ease: "power1.inOut",
          duration: 1,
        },
        3
      );

      // Transizione 5: Card 5 sfuma e scompare a 0, Card 6 (Recommendations) sale sopra
      tl.to(
        card5Ref.current,
        {
          autoAlpha: 0,
          scale: 0.94,
          ease: "power1.inOut",
          duration: 0.7,
        },
        4
      );
      tl.to(
        card6Ref.current,
        {
          yPercent: 0,
          ease: "power1.inOut",
          duration: 1,
        },
        4
      );

      // Transizione 6: Card 6 sfuma e scompare a 0, Card 7 (Contact) sale sopra
      tl.to(
        card6Ref.current,
        {
          autoAlpha: 0,
          scale: 0.94,
          ease: "power1.inOut",
          duration: 0.7,
        },
        5
      );
      tl.to(
        card7Ref.current,
        {
          yPercent: 0,
          ease: "power1.inOut",
          duration: 1,
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
          className="w-10 h-10 rounded-full flex flex-col items-center justify-center gap-[4.5px] bg-white/15 backdrop-blur-xl border border-white/30 shadow-[0_4px_16px_rgba(0,0,0,0.2),_inset_0_1px_1px_rgba(255,255,255,0.4)] hover:bg-white/25 active:scale-95 transition-all cursor-pointer group focus:outline-none"
          aria-label={isMobileMenuOpen ? "Chiudi menu" : "Apri menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {/* Tre linee a forma di pillola (rounded-full) */}
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
            onClick={() => {
              scrollToSection("home");
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3.5 py-2 rounded-xl bg-white text-slate-900 font-semibold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => {
              scrollToSection("work");
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3.5 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 font-medium text-xs sm:text-sm transition-colors cursor-pointer"
          >
            Work & Archive
          </button>
          <button
            onClick={() => {
              scrollToSection("about");
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3.5 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 font-medium text-xs sm:text-sm transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => {
              scrollToSection("contact");
              setIsMobileMenuOpen(false);
            }}
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

      {/* Floating Pill ScrollSpy Navigation (Posizionato all'angolo opposto al logo, senza slop o font mono) */}
      <aside
        aria-label="Navigazione sezioni"
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-center"
      >
        <div className="bg-white/15 backdrop-blur-2xl border border-white/25 shadow-[0_8px_32px_rgba(0,0,0,0.3),_inset_0_1px_1px_rgba(255,255,255,0.3)] px-1.5 py-2.5 rounded-full flex flex-col items-center gap-2">
          {SECTIONS.map((section, idx) => {
            const isActive = activeSectionIndex === idx;
            return (
              <div key={section.id} className="relative group flex items-center">
                {/* Tooltip minimale e umano all'hover: solo il nome della sezione, niente separatori o font mono */}
                <div className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-3 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-200 ease-out whitespace-nowrap bg-slate-900/90 text-white backdrop-blur-md px-3 py-1 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.3)] border border-white/20 text-xs font-medium tracking-normal select-none">
                  {section.label}
                </div>

                {/* Pillola / Indicatore Interattivo */}
                <button
                  onClick={() => navigateToSection(idx)}
                  aria-label={`Vai alla sezione ${section.label}`}
                  aria-current={isActive ? "step" : undefined}
                  className={`rounded-full transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                    isActive
                      ? "w-2 h-6 bg-white shadow-[0_0_14px_rgba(255,255,255,0.85)]"
                      : "w-2 h-2 bg-white/40 hover:bg-white/70 hover:h-3"
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
          className="absolute inset-0 w-full h-full flex items-center justify-center p-2.5 sm:p-4 md:p-0 z-10 will-change-transform origin-center"
        >
          <section className="relative w-full h-full rounded-[32px] sm:rounded-[48px] md:rounded-[1000px] border border-white/30 bg-white/[0.12] backdrop-blur-2xl overflow-hidden flex flex-col justify-between items-center shadow-[0_25px_65px_rgba(0,10,30,0.45),_inset_0_1px_2px_rgba(255,255,255,0.45)]">
            {/* Header interno alla pillola: Navbar a 4 voci (visibile solo da tablet/iPad in su) */}
            <header className="w-full pt-6 sm:pt-8 md:pt-10 flex justify-center items-center z-10 min-h-[50px]">
              <nav className="hidden md:flex items-center gap-1 bg-white/15 backdrop-blur-xl border border-white/25 p-1.5 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.15),_inset_0_1px_1px_rgba(255,255,255,0.3)] text-xs sm:text-sm">
                <button
                  onClick={() => scrollToSection("home")}
                  className={`px-4 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                    activeSectionIndex === 0
                      ? "bg-white text-slate-900 font-semibold shadow-xs"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("work")}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                    activeSectionIndex >= 1 && activeSectionIndex <= 3
                      ? "bg-white text-slate-900 font-semibold shadow-xs"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  Work & Archive
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                    activeSectionIndex === 4
                      ? "bg-white text-slate-900 font-semibold shadow-xs"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                    activeSectionIndex === 6
                      ? "bg-white text-slate-900 font-semibold shadow-xs"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  Contact
                </button>
              </nav>
            </header>

            {/* Contenuto centrale: Tipografia allineata a sinistra posizionata centralmente */}
            <div className="w-full flex-1 flex flex-col justify-center items-center px-10 sm:px-16 md:px-24 lg:px-36 max-w-5xl">
              <div className="w-full text-left space-y-3 sm:space-y-4">
                <p className="text-base sm:text-lg md:text-xl font-normal text-cyan-200/90 tracking-tight">
                  Hi, I&apos;m Herald :)
                </p>
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-medium tracking-[-0.025em] text-white leading-[1.16] sm:leading-[1.12] drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
                  I <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-sky-300 to-cyan-400 font-semibold drop-shadow-[0_0_20px_rgba(0,212,255,0.4)]">design</span> digital
                  products that{" "}
                  <span className="italic font-serif font-normal text-white">help</span> and{" "}
                  <span className="italic font-serif font-normal text-white">simplify</span>{" "}
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
          className="absolute inset-0 w-full h-full flex items-center justify-center p-2.5 sm:p-4 md:p-0 z-20 will-change-transform"
        >
          <section className={`relative w-full h-full rounded-[32px] sm:rounded-[48px] md:rounded-[1000px] border-[8px] sm:border-[16px] md:border-[26px] lg:border-[32px] border-white transition-colors duration-500 overflow-hidden flex items-center justify-center p-0 shadow-[0_25px_65px_rgba(0,10,30,0.35)] ${
            case1Toggle === "off" ? "bg-transparent" : "bg-white"
          }`}>
            {/* Contenitore interattivo del Toggle (Bouncy Bubble Physics: Orizzontale su Desktop, Verticale su Mobile) */}
            <div
              role="switch"
              aria-checked={case1Toggle === "on"}
              tabIndex={0}
              aria-label={
                case1Toggle === "off"
                  ? "Attiva dettagli del case study Ungdomskort"
                  : "Torna alla copertina del case study Ungdomskort"
              }
              onTouchStart={handleTouchStart}
              onTouchEnd={createTouchEndHandler(setCase1Toggle, setHasToggledOnce1)}
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
              style={{ "--travel-dist": "48cqw", "--travel-dist-y": "104%" } as React.CSSProperties}
              className={`group relative w-full h-full rounded-[26px] sm:rounded-[40px] md:rounded-[1000px] [container-type:inline-size] cursor-pointer select-none overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.988] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 ${
                case1Toggle === "off"
                  ? "bg-black/20 backdrop-blur-md shadow-[inset_0_4px_24px_rgba(0,10,30,0.5),_inset_0_1px_2px_rgba(255,255,255,0.2)]"
                  : "bg-white shadow-none"
              }`}
            >
              {/* 1. STATO ATTIVO (ON): In alto su Mobile, a Sinistra su Desktop */}
              <div
                className={`absolute top-[2.5%] left-0 w-full h-[47%] md:top-0 md:left-[3%] md:w-[48%] md:h-full flex flex-col justify-center px-6 sm:px-8 md:px-10 lg:px-12 space-y-2 sm:space-y-4 md:space-y-5 overflow-y-auto [scrollbar-width:none] transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  case1Toggle === "on"
                    ? "opacity-100 scale-100 translate-y-0 md:translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-8 md:translate-y-0 md:-translate-x-12 pointer-events-none"
                }`}
              >
                <div>
                  <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight">
                    Ungdomskort
                  </h2>
                  <p className="text-xs sm:text-base md:text-xl text-slate-700 font-normal leading-snug mt-1 sm:mt-2.5 max-w-xl">
                    Denmark&apos;s youth transit pass platform redesign.
                  </p>
                </div>

                {/* Pulsante primario scuro a contrasto su pista bianca */}
                <div className="pt-0.5 sm:pt-2">
                  <a
                    href="https://www.heraldago.com/ungdomskort"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation(); // Evita che il click sul pulsante richiuda il toggle
                    }}
                    className="inline-flex items-center gap-1.5 px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-full bg-slate-900 hover:bg-black active:scale-95 text-white text-xs sm:text-sm font-semibold shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition-all cursor-pointer"
                  >
                    <span>See more</span>
                    <span className="text-xs font-bold">↗</span>
                  </a>
                </div>
              </div>

              {/* 2. STATO SPENTO (OFF): In basso su Mobile, a Destra su Desktop */}
              <div
                className={`absolute bottom-[2.5%] left-0 w-full h-[47%] md:bottom-auto md:top-0 md:right-[3%] md:left-auto md:w-[48%] md:h-full flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  case1Toggle === "off"
                    ? "opacity-100 scale-100 translate-y-0 md:translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-75 translate-y-8 md:translate-y-0 md:translate-x-12 pointer-events-none"
                }`}
              >
                <div className="flex flex-col items-center justify-center text-center px-4 max-w-lg select-none pointer-events-none">
                  <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white/95 group-hover:text-white transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                    Ungdomskort
                  </h3>
                </div>
              </div>

              {/* 3. IL KNOB / THUMB DEL TOGGLE: Scorrimento Y su mobile, X su desktop */}
              <div
                className={`absolute top-[2.5%] left-[2.5%] w-[95%] h-[47%] md:top-[6%] md:h-[88%] md:left-[2%] md:sm:left-[2.5%] md:w-[47%] rounded-[22px] sm:rounded-[36px] md:rounded-[1000px] overflow-visible ${
                  !hasToggledOnce1
                    ? "translate-y-0 md:translate-x-0"
                    : case1Toggle === "on"
                    ? "bubble-knob-in"
                    : "bubble-knob-out"
                } flex items-center justify-center select-none`}
              >
                {/* Guscio interattivo interno con stato hover dedicato specificamente per l'area del knob */}
                <div
                  className={`relative w-full h-full rounded-[20px] sm:rounded-[32px] md:rounded-[1000px] overflow-hidden flex items-center justify-center p-2.5 sm:p-5 md:p-7 transition-all duration-300 ease-out cursor-pointer ${
                    case1Toggle === "off"
                      ? "bg-white shadow-[0_16px_40px_rgba(0,0,0,0.35),_0_2px_6px_rgba(0,0,0,0.12),_inset_0_1px_2px_rgba(255,255,255,0.95)] hover:scale-[1.025] hover:shadow-[0_24px_55px_rgba(0,0,0,0.45)] active:scale-[0.98]"
                      : "bg-[#0b2847] border border-white/30 shadow-[0_20px_50px_rgba(0,18,36,0.45),_0_2px_6px_rgba(0,10,25,0.2),_inset_0_1px_2px_rgba(255,255,255,0.35)] hover:scale-[1.015] active:scale-[0.98]"
                  }`}
                >
                  {case1Toggle === "on" && (
                    <VantaKnobWaves
                      color={0x0b2847}
                      shininess={30.0}
                      waveHeight={20.0}
                      waveSpeed={0.75}
                      zoom={0.65}
                    />
                  )}

                  {/* Schermo del Device dentro il Knob */}
                  <div
                    className={`relative z-10 w-full h-full min-h-full flex items-center justify-center pointer-events-none transition-all duration-500 ease-out ${
                      case1Toggle === "off"
                        ? "opacity-80 group-hover:opacity-100 contrast-100"
                        : "opacity-100 brightness-100 drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
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
          className="absolute inset-0 w-full h-full flex items-center justify-center p-2.5 sm:p-4 md:p-0 z-[25] will-change-transform"
        >
          <section className={`relative w-full h-full rounded-[32px] sm:rounded-[48px] md:rounded-[1000px] border-[8px] sm:border-[16px] md:border-[26px] lg:border-[32px] border-white transition-colors duration-500 overflow-hidden flex items-center justify-center p-0 shadow-[0_25px_65px_rgba(0,10,30,0.35)] ${
            case2Toggle === "off" ? "bg-transparent" : "bg-white"
          }`}>
            <div
              role="switch"
              aria-checked={case2Toggle === "on"}
              tabIndex={0}
              aria-label={
                case2Toggle === "off"
                  ? "Attiva dettagli del case study X-Bit"
                  : "Torna alla copertina del case study X-Bit"
              }
              onTouchStart={handleTouchStart}
              onTouchEnd={createTouchEndHandler(setCase2Toggle, setHasToggledOnce2)}
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
              style={{ "--travel-dist": "48cqw", "--travel-dist-y": "104%" } as React.CSSProperties}
              className={`group relative w-full h-full rounded-[26px] sm:rounded-[40px] md:rounded-[1000px] [container-type:inline-size] cursor-pointer select-none overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.988] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 ${
                case2Toggle === "off"
                  ? "bg-black/20 backdrop-blur-md shadow-[inset_0_4px_24px_rgba(0,10,30,0.5),_inset_0_1px_2px_rgba(255,255,255,0.2)]"
                  : "bg-white shadow-none"
              }`}
            >
              {/* 1. STATO ATTIVO (ON): In alto su Mobile, a Sinistra su Desktop */}
              <div
                className={`absolute top-[2.5%] left-0 w-full h-[47%] md:top-0 md:left-[3%] md:w-[48%] md:h-full flex flex-col justify-center px-6 sm:px-8 md:px-10 lg:px-12 space-y-2 sm:space-y-4 md:space-y-5 overflow-y-auto [scrollbar-width:none] transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  case2Toggle === "on"
                    ? "opacity-100 scale-100 translate-y-0 md:translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-8 md:translate-y-0 md:-translate-x-12 pointer-events-none"
                }`}
              >
                <div>
                  <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight">
                    X-Bit
                  </h2>
                  <p className="text-xs sm:text-base md:text-xl text-slate-700 font-normal leading-snug mt-1 sm:mt-2.5 max-w-xl">
                    Museum exploration and interactive audio guide.
                  </p>
                </div>

                <div className="pt-0.5 sm:pt-2">
                  <a
                    href="https://www.heraldago.com/xbit"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-full bg-slate-900 hover:bg-black active:scale-95 text-white text-xs sm:text-sm font-semibold shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition-all cursor-pointer"
                  >
                    <span>See more</span>
                    <span className="text-xs font-bold">↗</span>
                  </a>
                </div>
              </div>

              {/* 2. STATO SPENTO (OFF): In basso su Mobile, a Destra su Desktop */}
              <div
                className={`absolute bottom-[2.5%] left-0 w-full h-[47%] md:bottom-auto md:top-0 md:right-[3%] md:left-auto md:w-[48%] md:h-full flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  case2Toggle === "off"
                    ? "opacity-100 scale-100 translate-y-0 md:translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-75 translate-y-8 md:translate-y-0 md:translate-x-12 pointer-events-none"
                }`}
              >
                <div className="flex flex-col items-center justify-center text-center px-4 max-w-lg select-none pointer-events-none">
                  <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white/95 group-hover:text-white transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                    X-Bit
                  </h3>
                </div>
              </div>

              {/* 3. IL KNOB DEL TOGGLE: Scorrimento Y su mobile, X su desktop */}
              <div
                className={`absolute top-[2.5%] left-[2.5%] w-[95%] h-[47%] md:top-[6%] md:h-[88%] md:left-[2%] md:sm:left-[2.5%] md:w-[47%] rounded-[22px] sm:rounded-[36px] md:rounded-[1000px] overflow-visible ${
                  !hasToggledOnce2
                    ? "translate-y-0 md:translate-x-0"
                    : case2Toggle === "on"
                    ? "bubble-knob-in"
                    : "bubble-knob-out"
                } flex items-center justify-center select-none`}
              >
                <div
                  className={`relative w-full h-full rounded-[20px] sm:rounded-[32px] md:rounded-[1000px] overflow-hidden flex items-center justify-center p-2.5 sm:p-5 md:p-7 transition-all duration-300 ease-out cursor-pointer ${
                    case2Toggle === "off"
                      ? "bg-white shadow-[0_16px_40px_rgba(0,0,0,0.35),_0_2px_6px_rgba(0,0,0,0.12),_inset_0_1px_2px_rgba(255,255,255,0.95)] hover:scale-[1.025] hover:shadow-[0_24px_55px_rgba(0,0,0,0.45)] active:scale-[0.98]"
                      : "bg-[#0b2847] border border-white/30 shadow-[0_20px_50px_rgba(0,18,36,0.45),_0_2px_6px_rgba(0,10,25,0.2),_inset_0_1px_2px_rgba(255,255,255,0.35)] hover:scale-[1.015] active:scale-[0.98]"
                  }`}
                >
                  {case2Toggle === "on" && (
                    <VantaKnobWaves
                      color={0x0b2847}
                      shininess={30.0}
                      waveHeight={20.0}
                      waveSpeed={0.75}
                      zoom={0.65}
                    />
                  )}
                  <div
                    className={`relative z-10 w-full h-full min-h-full flex items-center justify-center pointer-events-none transition-all duration-500 ease-out ${
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
          className="absolute inset-0 w-full h-full flex items-center justify-center p-2.5 sm:p-4 md:p-0 z-[30] will-change-transform"
        >
          <section className={`relative w-full h-full rounded-[32px] sm:rounded-[48px] md:rounded-[1000px] border-[8px] sm:border-[16px] md:border-[26px] lg:border-[32px] border-white transition-colors duration-500 overflow-hidden flex items-center justify-center p-0 shadow-[0_25px_65px_rgba(0,10,30,0.35)] ${
            case3Toggle === "off" ? "bg-transparent" : "bg-white"
          }`}>
            <div
              role="switch"
              aria-checked={case3Toggle === "on"}
              tabIndex={0}
              aria-label={
                case3Toggle === "off"
                  ? "Attiva dettagli del case study I Pupi Siciliani"
                  : "Torna alla copertina del case study I Pupi Siciliani"
              }
              onTouchStart={handleTouchStart}
              onTouchEnd={createTouchEndHandler(setCase3Toggle, setHasToggledOnce3)}
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
              style={{ "--travel-dist": "48cqw", "--travel-dist-y": "104%" } as React.CSSProperties}
              className={`group relative w-full h-full rounded-[26px] sm:rounded-[40px] md:rounded-[1000px] [container-type:inline-size] cursor-pointer select-none overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.988] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 ${
                case3Toggle === "off"
                  ? "bg-black/20 backdrop-blur-md shadow-[inset_0_4px_24px_rgba(0,10,30,0.5),_inset_0_1px_2px_rgba(255,255,255,0.2)]"
                  : "bg-white shadow-none"
              }`}
            >
              {/* 1. STATO ATTIVO (ON): In alto su Mobile, a Sinistra su Desktop */}
              <div
                className={`absolute top-[2.5%] left-0 w-full h-[47%] md:top-0 md:left-[3%] md:w-[48%] md:h-full flex flex-col justify-center px-6 sm:px-8 md:px-10 lg:px-12 space-y-2 sm:space-y-4 md:space-y-5 overflow-y-auto [scrollbar-width:none] transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  case3Toggle === "on"
                    ? "opacity-100 scale-100 translate-y-0 md:translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-8 md:translate-y-0 md:-translate-x-12 pointer-events-none"
                }`}
              >
                <div>
                  <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight">
                    I Pupi Siciliani
                  </h2>
                  <p className="text-xs sm:text-base md:text-xl text-slate-700 font-normal leading-snug mt-1 sm:mt-2.5 max-w-xl">
                    Wine retail platform with +187% YoY profit.
                  </p>
                </div>

                <div className="pt-0.5 sm:pt-2">
                  <a
                    href="https://www.heraldago.com/ipupisiciliani"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-full bg-slate-900 hover:bg-black active:scale-95 text-white text-xs sm:text-sm font-semibold shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition-all cursor-pointer"
                  >
                    <span>See more</span>
                    <span className="text-xs font-bold">↗</span>
                  </a>
                </div>
              </div>

              {/* 2. STATO SPENTO (OFF): In basso su Mobile, a Destra su Desktop */}
              <div
                className={`absolute bottom-[2.5%] left-0 w-full h-[47%] md:bottom-auto md:top-0 md:right-[3%] md:left-auto md:w-[48%] md:h-full flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  case3Toggle === "off"
                    ? "opacity-100 scale-100 translate-y-0 md:translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-75 translate-y-8 md:translate-y-0 md:translate-x-12 pointer-events-none"
                }`}
              >
                <div className="flex flex-col items-center justify-center text-center px-4 max-w-lg select-none pointer-events-none">
                  <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white/95 group-hover:text-white transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                    I Pupi Siciliani
                  </h3>
                </div>
              </div>

              {/* 3. IL KNOB DEL TOGGLE: Scorrimento Y su mobile, X su desktop */}
              <div
                className={`absolute top-[2.5%] left-[2.5%] w-[95%] h-[47%] md:top-[6%] md:h-[88%] md:left-[2%] md:sm:left-[2.5%] md:w-[47%] rounded-[22px] sm:rounded-[36px] md:rounded-[1000px] overflow-visible ${
                  !hasToggledOnce3
                    ? "translate-y-0 md:translate-x-0"
                    : case3Toggle === "on"
                    ? "bubble-knob-in"
                    : "bubble-knob-out"
                } flex items-center justify-center select-none`}
              >
                <div
                  className={`relative w-full h-full rounded-[20px] sm:rounded-[32px] md:rounded-[1000px] overflow-hidden flex items-center justify-center p-2.5 sm:p-5 md:p-7 transition-all duration-300 ease-out cursor-pointer ${
                    case3Toggle === "off"
                      ? "bg-white shadow-[0_16px_40px_rgba(0,0,0,0.35),_0_2px_6px_rgba(0,0,0,0.12),_inset_0_1px_2px_rgba(255,255,255,0.95)] hover:scale-[1.025] hover:shadow-[0_24px_55px_rgba(0,0,0,0.45)] active:scale-[0.98]"
                      : "bg-[#0b2847] border border-white/30 shadow-[0_20px_50px_rgba(0,18,36,0.45),_0_2px_6px_rgba(0,10,25,0.2),_inset_0_1px_2px_rgba(255,255,255,0.35)] hover:scale-[1.015] active:scale-[0.98]"
                  }`}
                >
                  {case3Toggle === "on" && (
                    <VantaKnobWaves
                      color={0x0b2847}
                      shininess={30.0}
                      waveHeight={20.0}
                      waveSpeed={0.75}
                      zoom={0.65}
                    />
                  )}
                  <div
                    className={`relative z-10 w-full h-full min-h-full flex items-center justify-center pointer-events-none transition-all duration-500 ease-out ${
                      case3Toggle === "off"
                        ? "opacity-65 group-hover:opacity-90 contrast-[0.95] group-hover:contrast-100"
                        : "opacity-100 brightness-100 drop-shadow-[0_2px_16px_rgba(255,255,255,0.45)]"
                    }`}
                  >
                    <Image
                      src={case3Toggle === "on" ? "/pupi-mockup-white.svg" : "/pupi-mockup.svg"}
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
          className="absolute inset-0 w-full h-full flex items-center justify-center p-2.5 sm:p-4 md:p-0 z-[35] will-change-transform"
        >
          <section className={`relative w-full h-full rounded-[32px] sm:rounded-[48px] md:rounded-[1000px] border-[8px] sm:border-[16px] md:border-[26px] lg:border-[32px] border-white transition-colors duration-500 overflow-hidden flex items-center justify-center p-0 shadow-[0_25px_65px_rgba(0,10,30,0.35)] ${
            case4Toggle === "off" ? "bg-transparent" : "bg-white"
          }`}>
            <div
              role="switch"
              aria-checked={case4Toggle === "on"}
              tabIndex={0}
              aria-label={
                case4Toggle === "off"
                  ? "Attiva dettagli su About Me"
                  : "Torna alla copertina di About Me"
              }
              onTouchStart={handleTouchStart}
              onTouchEnd={createTouchEndHandler(setCase4Toggle, setHasToggledOnce4)}
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
              style={{ "--travel-dist": "48cqw", "--travel-dist-y": "104%" } as React.CSSProperties}
              className={`group relative w-full h-full rounded-[26px] sm:rounded-[40px] md:rounded-[1000px] [container-type:inline-size] cursor-pointer select-none overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.988] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 ${
                case4Toggle === "off"
                  ? "bg-black/20 backdrop-blur-md shadow-[inset_0_4px_24px_rgba(0,10,30,0.5),_inset_0_1px_2px_rgba(255,255,255,0.2)]"
                  : "bg-white shadow-none"
              }`}
            >
              {/* 1. STATO ATTIVO (ON): In alto su Mobile, a Sinistra su Desktop */}
              <div
                className={`absolute top-[2.5%] left-0 w-full h-[47%] md:top-0 md:left-[3%] md:w-[48%] md:h-full flex flex-col justify-center px-6 sm:px-8 md:px-10 lg:px-12 space-y-2 sm:space-y-3.5 md:space-y-4 overflow-y-auto [scrollbar-width:none] transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  case4Toggle === "on"
                    ? "opacity-100 scale-100 translate-y-0 md:translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-8 md:translate-y-0 md:-translate-x-12 pointer-events-none"
                }`}
              >
                <div>
                  <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight">
                    Herald Ago
                  </h2>
                  <p className="text-xs sm:text-base md:text-xl text-slate-700 font-medium leading-snug mt-0.5 sm:mt-1.5 max-w-xl">
                    27 y/o · Product Designer · Italy &amp; Barcelona
                  </p>
                </div>

                <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-base text-slate-800 leading-relaxed max-w-lg font-normal">
                  <p>
                    Italian with Albanian roots, born and raised in Padua. After a Bachelor in Communication Science &amp; Technologies, I moved to Miami, then headed to Denmark for an MSc in IT – Web Communication Design. After returning to Italy, I now live between Italy and Barcelona.
                  </p>
                  <p className="text-slate-700">
                    Passionate about design, AI, sociology, books, and travel. Beyond the screen, I love good food, great wine, and spending time with family and friends.
                  </p>
                </div>

                {/* Pulsanti di Azione */}
                <div className="pt-0.5 sm:pt-1.5 flex flex-wrap items-center gap-2">
                  <a
                    href="/cv-herald-ago.pdf"
                    target="_blank"
                    download
                    onClick={(e) => e.stopPropagation()}
                    className="px-4 py-1.5 sm:py-2 rounded-full bg-slate-900 hover:bg-black active:scale-95 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all cursor-pointer"
                  >
                    Download Resume PDF
                  </a>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToSection(6);
                    }}
                    className="px-4 py-1.5 sm:py-2 rounded-full bg-slate-900/10 hover:bg-slate-900/20 active:scale-95 text-slate-900 text-xs sm:text-sm font-semibold border border-slate-900/15 backdrop-blur-md transition-all cursor-pointer"
                  >
                    Contact me
                  </button>
                </div>
              </div>

              {/* 2. STATO SPENTO (OFF): In basso su Mobile, a Destra su Desktop */}
              <div
                className={`absolute bottom-[2.5%] left-0 w-full h-[47%] md:bottom-auto md:top-0 md:right-[3%] md:left-auto md:w-[48%] md:h-full flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  case4Toggle === "off"
                    ? "opacity-100 scale-100 translate-y-0 md:translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-75 translate-y-8 md:translate-y-0 md:translate-x-12 pointer-events-none"
                }`}
              >
                <div className="flex flex-col items-center justify-center text-center px-4 max-w-lg select-none pointer-events-none">
                  <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white/95 group-hover:text-white transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                    About Me
                  </h3>
                </div>
              </div>

              {/* 3. IL KNOB DEL TOGGLE: Scorrimento Y su mobile, X su desktop */}
              <div
                className={`absolute top-[2.5%] left-[2.5%] w-[95%] h-[47%] md:top-[6%] md:h-[88%] md:left-[2%] md:sm:left-[2.5%] md:w-[47%] rounded-[22px] sm:rounded-[36px] md:rounded-[1000px] overflow-visible ${
                  !hasToggledOnce4
                    ? "translate-y-0 md:translate-x-0"
                    : case4Toggle === "on"
                    ? "bubble-knob-in"
                    : "bubble-knob-out"
                } flex items-center justify-center select-none`}
              >
                <div
                  className={`relative w-full h-full rounded-[20px] sm:rounded-[32px] md:rounded-[1000px] overflow-hidden flex items-center justify-center p-2 sm:p-4 transition-all duration-300 ease-out cursor-pointer ${
                    case4Toggle === "off"
                      ? "bg-white shadow-[0_16px_40px_rgba(0,0,0,0.35),_0_2px_6px_rgba(0,0,0,0.12),_inset_0_1px_2px_rgba(255,255,255,0.95)] hover:scale-[1.025] hover:shadow-[0_24px_55px_rgba(0,0,0,0.45)] active:scale-[0.98]"
                      : "bg-[#0b2847] border border-white/30 shadow-[0_20px_50px_rgba(0,18,36,0.45),_0_2px_6px_rgba(0,10,25,0.2),_inset_0_1px_2px_rgba(255,255,255,0.35)] hover:scale-[1.015] active:scale-[0.98]"
                  }`}
                >
                  {case4Toggle === "on" && (
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
          className="absolute inset-0 w-full h-full flex items-center justify-center p-2.5 sm:p-4 md:p-0 z-[40] will-change-transform"
        >
          <section className={`relative w-full h-full rounded-[32px] sm:rounded-[48px] md:rounded-[1000px] border-[8px] sm:border-[16px] md:border-[26px] lg:border-[32px] border-white transition-colors duration-500 overflow-hidden flex items-center justify-center p-0 shadow-[0_25px_65px_rgba(0,10,30,0.35)] ${
            case5Toggle === "off" ? "bg-transparent" : "bg-white"
          }`}>
            <div
              role="switch"
              aria-checked={case5Toggle === "on"}
              tabIndex={0}
              aria-label={
                case5Toggle === "off"
                  ? "Attiva raccomandazioni e testimonianze"
                  : "Torna alla copertina delle raccomandazioni"
              }
              onTouchStart={handleTouchStart}
              onTouchEnd={createTouchEndHandler(setCase5Toggle, setHasToggledOnce5)}
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
              style={{ "--travel-dist": "48cqw", "--travel-dist-y": "104%" } as React.CSSProperties}
              className={`group relative w-full h-full rounded-[26px] sm:rounded-[40px] md:rounded-[1000px] [container-type:inline-size] cursor-pointer select-none overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.988] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 ${
                case5Toggle === "off"
                  ? "bg-black/20 backdrop-blur-md shadow-[inset_0_4px_24px_rgba(0,10,30,0.5),_inset_0_1px_2px_rgba(255,255,255,0.2)]"
                  : "bg-white shadow-none"
              }`}
            >
              {/* 1. STATO ATTIVO (ON): In alto su Mobile, a Sinistra su Desktop */}
              <div
                className={`absolute top-[2.5%] left-0 w-full h-[47%] md:top-0 md:left-[3.5%] md:w-[43%] md:sm:w-[44%] md:lg:w-[45%] md:h-full flex flex-col justify-center px-5 sm:px-7 md:pl-8 md:lg:pl-10 md:pr-2 space-y-2 sm:space-y-2.5 overflow-y-auto [scrollbar-width:none] transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  case5Toggle === "on"
                    ? "opacity-100 scale-100 translate-y-0 md:translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-8 md:translate-y-0 md:-translate-x-12 pointer-events-none"
                }`}
              >
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-[2.6rem] font-bold text-slate-900 tracking-tight leading-tight">
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
                  className={`p-2 sm:p-3 md:p-3.5 rounded-2xl transition-all duration-300 backdrop-blur-md cursor-pointer ${
                    activeRecPhoto === "antonio"
                      ? "bg-white border-2 border-slate-900/20 text-slate-900 shadow-md scale-[1.01]"
                      : "bg-slate-900/[0.05] border border-slate-900/10 hover:bg-slate-900/[0.08] hover:border-slate-900/20 text-slate-800"
                  }`}
                >
                  <p className="text-[11px] sm:text-xs md:text-sm leading-relaxed font-normal text-slate-800">
                    &ldquo;Herald has rare proactivity and deep study. The dedication he brings to preparing every detail and the immediate trust he inspires in people will take him very far.&rdquo;
                  </p>
                  <div className="flex items-center gap-2 mt-1 sm:mt-2">
                    <div className="relative w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-slate-900/20 flex-shrink-0 shadow-xs">
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
                      <p className="text-[10px] sm:text-xs font-semibold text-slate-900">Antonio</p>
                      <p className="text-[8px] sm:text-[10px] text-slate-600">Founder, I Pupi Siciliani</p>
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
                  className={`p-2 sm:p-3 md:p-3.5 rounded-2xl transition-all duration-300 backdrop-blur-md cursor-pointer ${
                    activeRecPhoto === "sebastian"
                      ? "bg-white border-2 border-slate-900/20 text-slate-900 shadow-md scale-[1.01]"
                      : "bg-slate-900/[0.05] border border-slate-900/10 hover:bg-slate-900/[0.08] hover:border-slate-900/20 text-slate-800"
                  }`}
                >
                  <p className="text-[11px] sm:text-xs md:text-sm leading-relaxed font-normal text-slate-800">
                    &ldquo;Herald excelled at cross-stakeholder collaboration, guiding the entire creation process from start to finish with great precision and genuine passion.&rdquo;
                  </p>
                  <div className="flex items-center gap-2 mt-1 sm:mt-2">
                    <div className="relative w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-slate-900/20 flex-shrink-0 shadow-xs">
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
                      <p className="text-[10px] sm:text-xs font-semibold text-slate-900">Sebastian</p>
                      <p className="text-[8px] sm:text-[10px] text-slate-600">CEO, næmt.nu</p>
                    </div>
                  </div>
                </div>

                {/* Pulsante Navigazione */}
                <div className="pt-0.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToSection(6);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-1 sm:py-2 rounded-full bg-slate-900 hover:bg-black active:scale-95 text-white text-[11px] sm:text-sm font-semibold shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition-all cursor-pointer"
                  >
                    <span>Next: Contact</span>
                    <span className="text-xs font-bold">↗</span>
                  </button>
                </div>
              </div>

              {/* 2. STATO SPENTO (OFF): In basso su Mobile, a Destra su Desktop */}
              <div
                className={`absolute bottom-[2.5%] left-0 w-full h-[47%] md:bottom-auto md:top-0 md:right-[3%] md:left-auto md:w-[48%] md:h-full flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  case5Toggle === "off"
                    ? "opacity-100 scale-100 translate-y-0 md:translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-75 translate-y-8 md:translate-y-0 md:translate-x-12 pointer-events-none"
                }`}
              >
                <div className="flex flex-col items-center justify-center text-center px-4 max-w-lg select-none pointer-events-none">
                  <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white/90 group-hover:text-white transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                    Recommendations
                  </h3>
                </div>
              </div>

              {/* 3. IL KNOB DEL TOGGLE: Scorrimento Y su mobile, X su desktop */}
              <div
                className={`absolute top-[2.5%] left-[2.5%] w-[95%] h-[47%] md:top-[6%] md:h-[88%] md:left-[2%] md:sm:left-[2.5%] md:w-[47%] rounded-[22px] sm:rounded-[36px] md:rounded-[1000px] overflow-visible ${
                  !hasToggledOnce5
                    ? "translate-y-0 md:translate-x-0"
                    : case5Toggle === "on"
                    ? "bubble-knob-in"
                    : "bubble-knob-out"
                } flex items-center justify-center select-none`}
              >
                <div
                  className={`relative w-full h-full rounded-[20px] sm:rounded-[32px] md:rounded-[1000px] overflow-hidden flex items-center justify-center p-2 sm:p-4 transition-all duration-300 ease-out cursor-pointer ${
                    case5Toggle === "off"
                      ? "bg-white shadow-[0_16px_40px_rgba(0,0,0,0.35),_0_2px_6px_rgba(0,0,0,0.12),_inset_0_1px_2px_rgba(255,255,255,0.95)] hover:scale-[1.025] hover:shadow-[0_24px_55px_rgba(0,0,0,0.45)] active:scale-[0.98]"
                      : "bg-[#0b2847] border border-white/30 shadow-[0_20px_50px_rgba(0,18,36,0.45),_0_2px_6px_rgba(0,10,25,0.2),_inset_0_1px_2px_rgba(255,255,255,0.35)] hover:scale-[1.015] active:scale-[0.98]"
                  }`}
                >
                  {case5Toggle === "on" && (
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
          className="absolute inset-0 w-full h-full flex items-center justify-center p-2.5 sm:p-4 md:p-0 z-[45] will-change-transform"
        >
          <section className={`relative w-full h-full rounded-[32px] sm:rounded-[48px] md:rounded-[1000px] border-[8px] sm:border-[16px] md:border-[26px] lg:border-[32px] border-white transition-colors duration-500 overflow-hidden flex items-center justify-center p-0 shadow-[0_25px_65px_rgba(0,10,30,0.35)] ${
            case6Toggle === "off" ? "bg-transparent" : "bg-white"
          }`}>
            <div
              role="switch"
              aria-checked={case6Toggle === "on"}
              tabIndex={0}
              aria-label={
                case6Toggle === "off"
                  ? "Attiva canali di contatto"
                  : "Torna alla copertina dei contatti"
              }
              onTouchStart={handleTouchStart}
              onTouchEnd={createTouchEndHandler(setCase6Toggle, setHasToggledOnce6)}
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
              style={{ "--travel-dist": "48cqw", "--travel-dist-y": "104%" } as React.CSSProperties}
              className={`group relative w-full h-full rounded-[26px] sm:rounded-[40px] md:rounded-[1000px] [container-type:inline-size] cursor-pointer select-none overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.988] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 ${
                case6Toggle === "off"
                  ? "bg-black/20 backdrop-blur-md shadow-[inset_0_4px_24px_rgba(0,10,30,0.5),_inset_0_1px_2px_rgba(255,255,255,0.2)]"
                  : "bg-white shadow-none"
              }`}
            >
              {/* 1. STATO ATTIVO (ON): In alto su Mobile, a Sinistra su Desktop */}
              <div
                className={`absolute top-[2.5%] left-0 w-full h-[47%] md:top-0 md:left-[3%] md:w-[48%] md:h-full flex flex-col justify-center px-5 sm:px-7 md:px-10 lg:px-12 space-y-2 sm:space-y-3 overflow-y-auto [scrollbar-width:none] transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  case6Toggle === "on"
                    ? "opacity-100 scale-100 translate-y-0 md:translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-8 md:translate-y-0 md:-translate-x-12 pointer-events-none"
                }`}
              >
                <div>
                  <h2 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight">
                    Let&apos;s Connect
                  </h2>
                  <p className="text-[11px] sm:text-xs md:text-base text-slate-700 font-normal leading-snug mt-0.5 sm:mt-1">
                    Open for product design opportunities.
                  </p>
                </div>

                {/* Bottoni Rapidi: Email, LinkedIn, Resume */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-0.5"
                >
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-slate-900 hover:bg-black active:scale-95 text-white text-[11px] sm:text-sm font-semibold shadow-sm transition-all cursor-pointer"
                  >
                    {copiedEmail ? "Copied!" : "heraldago1@gmail.com"}
                  </button>
                  <a
                    href="https://www.linkedin.com/in/heraldago/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-slate-900/10 hover:bg-slate-900/20 active:scale-95 text-slate-900 text-[11px] sm:text-sm font-semibold border border-slate-900/15 backdrop-blur-md transition-all cursor-pointer"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="/cv-herald-ago.pdf"
                    target="_blank"
                    download
                    className="px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-slate-900/10 hover:bg-slate-900/20 active:scale-95 text-slate-900 text-[11px] sm:text-sm font-semibold border border-slate-900/15 backdrop-blur-md transition-all cursor-pointer"
                  >
                    Resume PDF
                  </a>
                </div>

                {/* Form di contatto sul canvas */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="w-full pt-0.5 select-text"
                >
                  {contactSubmitted ? (
                    <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/[0.05] border border-slate-900/15 backdrop-blur-md text-center space-y-1">
                      <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center mx-auto text-xs font-bold shadow-md">
                        ✓
                      </div>
                      <h3 className="text-xs sm:text-base font-bold text-slate-900">
                        Message sent!
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-700">
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
                        className="px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-semibold hover:bg-black transition-colors cursor-pointer"
                      >
                        Send another
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-1.5 w-full">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="Your name"
                          className="w-full px-3 py-1.5 rounded-xl bg-slate-900/[0.05] border border-slate-900/15 text-xs text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900/30 focus:border-slate-900 focus:bg-white transition-all backdrop-blur-sm"
                        />
                        <input
                          type="email"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="Your email"
                          className="w-full px-3 py-1.5 rounded-xl bg-slate-900/[0.05] border border-slate-900/15 text-xs text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900/30 focus:border-slate-900 focus:bg-white transition-all backdrop-blur-sm"
                        />
                      </div>
                      <div>
                        <textarea
                          required
                          rows={2}
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          placeholder="Your message or project idea..."
                          className="w-full px-3 py-1.5 rounded-xl bg-slate-900/[0.05] border border-slate-900/15 text-xs text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900/30 focus:border-slate-900 focus:bg-white resize-none transition-all backdrop-blur-sm"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-5 py-1.5 rounded-full bg-slate-900 hover:bg-black active:scale-95 text-white font-bold text-xs sm:text-sm shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-all cursor-pointer"
                      >
                        Send Message
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* 2. STATO SPENTO (OFF): In basso su Mobile, a Destra su Desktop */}
              <div
                className={`absolute bottom-[2.5%] left-0 w-full h-[47%] md:bottom-auto md:top-0 md:right-[3%] md:left-auto md:w-[48%] md:h-full flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  case6Toggle === "off"
                    ? "opacity-100 scale-100 translate-y-0 md:translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-75 translate-y-8 md:translate-y-0 md:translate-x-12 pointer-events-none"
                }`}
              >
                <div className="flex flex-col items-center justify-center text-center px-4 max-w-lg select-none pointer-events-none">
                  <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white/95 group-hover:text-white transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                    Contact
                  </h3>
                </div>
              </div>

              {/* 3. IL KNOB DEL TOGGLE: Scorrimento Y su mobile, X su desktop */}
              <div
                className={`absolute top-[2.5%] left-[2.5%] w-[95%] h-[47%] md:top-[6%] md:h-[88%] md:left-[2%] md:sm:left-[2.5%] md:w-[47%] rounded-[22px] sm:rounded-[36px] md:rounded-[1000px] overflow-visible ${
                  !hasToggledOnce6
                    ? "translate-y-0 md:translate-x-0"
                    : case6Toggle === "on"
                    ? "bubble-knob-in"
                    : "bubble-knob-out"
                } flex items-center justify-center select-none`}
              >
                <div
                  className={`relative w-full h-full rounded-[20px] sm:rounded-[32px] md:rounded-[1000px] overflow-hidden flex items-center justify-center p-3 sm:p-5 md:p-6 transition-all duration-300 ease-out cursor-pointer ${
                    case6Toggle === "off"
                      ? "bg-white shadow-[0_16px_40px_rgba(0,0,0,0.35),_0_2px_6px_rgba(0,0,0,0.12),_inset_0_1px_2px_rgba(255,255,255,0.95)] hover:scale-[1.025] hover:shadow-[0_24px_55px_rgba(0,0,0,0.45)] active:scale-[0.98]"
                      : "bg-[#0b2847] border border-white/30 shadow-[0_20px_50px_rgba(0,18,36,0.45),_0_2px_6px_rgba(0,10,25,0.2),_inset_0_1px_2px_rgba(255,255,255,0.35)] hover:scale-[1.015] active:scale-[0.98]"
                  }`}
                >
                  {case6Toggle === "on" && (
                    <VantaKnobWaves
                      color={0x0b2847}
                      shininess={30.0}
                      waveHeight={20.0}
                      waveSpeed={0.75}
                      zoom={0.65}
                    />
                  )}
                  {/* Contenitore Spaziale delle 3 Icone Fluttuanti (Mail, LinkedIn, Resume) */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none select-none">
                    {/* 1. Icona Fluttuante: Mail (pura, grande, senza frame) */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyEmail();
                      }}
                      title="heraldago1@gmail.com"
                      className="animate-float-1 absolute top-[16%] left-[16%] sm:left-[20%] cursor-pointer z-20 pointer-events-auto transition-transform duration-300 hover:scale-115 active:scale-90"
                    >
                      <svg
                        className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 transition-all duration-300 ${
                          case6Toggle === "off"
                            ? "text-slate-800 hover:text-black drop-shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
                            : "text-white hover:text-sky-200 drop-shadow-[0_10px_30px_rgba(255,255,255,0.5)]"
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="3" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>

                    {/* 2. Icona Fluttuante: LinkedIn (pura, grande, senza frame) */}
                    <a
                      href="https://www.linkedin.com/in/heraldago/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      title="LinkedIn"
                      className="animate-float-2 absolute top-[36%] right-[16%] sm:right-[20%] cursor-pointer z-20 pointer-events-auto transition-transform duration-300 hover:scale-115 active:scale-90"
                    >
                      <svg
                        className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 fill-current transition-all duration-300 ${
                          case6Toggle === "off"
                            ? "text-slate-800 hover:text-[#0077b5] drop-shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
                            : "text-white hover:text-sky-200 drop-shadow-[0_10px_30px_rgba(255,255,255,0.5)]"
                        }`}
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                      </svg>
                    </a>

                    {/* 3. Icona Fluttuante: Resume (pura, grande, senza frame) */}
                    <a
                      href="/cv-herald-ago.pdf"
                      target="_blank"
                      download
                      onClick={(e) => e.stopPropagation()}
                      title="Resume PDF"
                      className="animate-float-3 absolute bottom-[16%] left-[26%] sm:left-[30%] cursor-pointer z-20 pointer-events-auto transition-transform duration-300 hover:scale-115 active:scale-90"
                    >
                      <svg
                        className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 transition-all duration-300 ${
                          case6Toggle === "off"
                            ? "text-slate-800 hover:text-black drop-shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
                            : "text-white hover:text-sky-200 drop-shadow-[0_10px_30px_rgba(255,255,255,0.5)]"
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                    </a>
                  </div>
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


