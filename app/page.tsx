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

  // Mobile horizontal switch states (Figma layout)
  const [mobileCase1, setMobileCase1] = useState<"off" | "on">("off");
  const [mobileToggled1, setMobileToggled1] = useState(false);
  const [mobileCase2, setMobileCase2] = useState<"off" | "on">("off");
  const [mobileToggled2, setMobileToggled2] = useState(false);
  const [mobileCase3, setMobileCase3] = useState<"off" | "on">("off");
  const [mobileToggled3, setMobileToggled3] = useState(false);
  const [mobileCaseAbout, setMobileCaseAbout] = useState<"off" | "on">("off");
  const [mobileToggledAbout, setMobileToggledAbout] = useState(false);
  const [mobileCaseRec, setMobileCaseRec] = useState<"off" | "on">("off");
  const [mobileToggledRec, setMobileToggledRec] = useState(false);
  const [mobileActiveRec, setMobileActiveRec] = useState<"antonio" | "sebastian">("antonio");
  const [mobileCaseContact, setMobileCaseContact] = useState<"off" | "on">("off");
  const [mobileToggledContact, setMobileToggledContact] = useState(false);

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

    // 2. Orchestrazione GSAP ScrollTrigger per Desktop (min-width: 768px)
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
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
      mm.revert();
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
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      const el = document.getElementById(`mobile-${target}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
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
      <div className="fixed top-[max(1rem,env(safe-area-inset-top))] left-4 md:top-6 md:left-6 z-50">
        <button
          onClick={() => scrollToSection("home")}
          className="block group focus:outline-none cursor-pointer"
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

      {/* Burger Menu a specchio col logo: 16px (top-4 right-4) su mobile, nascosto da tablet in su */}
      <div className="fixed top-[max(1rem,env(safe-area-inset-top))] right-4 md:hidden z-50">
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

      {/* Floating Pill ScrollSpy Navigation (Visibile solo da desktop in su) */}
      <aside
        aria-label="Navigazione sezioni"
        className="hidden md:flex fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex-col items-center"
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

      {/* Wrapper dedicato per isolare ScrollTrigger pin-spacer dal resto del DOM (Desktop Only) */}
      <div className="hidden md:block relative w-full">
        {/* Contenitore Pinned dello Stack: bloccato a schermo durante lo scrub */}
        <div ref={pinnedContainerRef} className="relative w-full h-[100dvh] overflow-hidden">
        {/* --- CARD 1: HERO PILLOLA (z-10, scala indietro con lo scroll) --- */}
        <div
          ref={card1Ref}
          className="capsule-card-wrapper absolute inset-0 w-full h-full flex items-center justify-center p-2.5 sm:p-4 md:p-0 z-10 will-change-transform origin-center"
        >
          <section className="capsule-card-section relative w-full h-full rounded-[32px] sm:rounded-[48px] md:rounded-[1000px] border border-white/30 bg-white/[0.12] overflow-hidden flex flex-col justify-between items-center shadow-[0_25px_65px_rgba(0,10,30,0.45),_inset_0_1px_2px_rgba(255,255,255,0.45)]">
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
          className="capsule-card-wrapper absolute inset-0 w-full h-full flex items-center justify-center p-2.5 sm:p-4 md:p-0 z-20 will-change-transform"
        >
          <section className={`capsule-card-section relative w-full h-full rounded-[32px] sm:rounded-[48px] md:rounded-[1000px] border-[8px] sm:border-[16px] md:border-[26px] lg:border-[32px] border-white transition-colors duration-500 overflow-hidden flex items-center justify-center p-0 shadow-[0_25px_65px_rgba(0,10,30,0.35)] ${
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
              style={{
                "--travel-dist": "48cqw",
                "--travel-dist-y": "104%",
              } as React.CSSProperties}
              className={`group relative w-full h-full rounded-[26px] sm:rounded-[40px] md:rounded-[1000px] [container-type:inline-size] cursor-pointer select-none overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.988] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 ${
                case1Toggle === "off"
                  ? "bg-black/20 backdrop-blur-md shadow-[inset_0_4px_24px_rgba(0,10,30,0.5),_inset_0_1px_2px_rgba(255,255,255,0.2)]"
                  : "bg-white shadow-none"
              }`}
            >
              {/* 1. STATO ATTIVO (ON): In alto su Mobile, a Sinistra su Desktop */}
              <div
                className={`absolute top-[2.5%] left-0 w-full h-[47%] md:top-0 md:left-[8%] md:w-[41%] md:h-full flex flex-col justify-center px-6 sm:px-8 md:px-0 space-y-2 sm:space-y-4 md:space-y-5 overflow-y-auto [scrollbar-width:none] transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  case1Toggle === "on"
                    ? "opacity-100 scale-100 translate-y-0 md:translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-8 md:translate-y-0 md:-translate-x-12 pointer-events-none"
                }`}
              >
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-[clamp(1.5rem,3.2cqw,3.5rem)] font-bold text-slate-900 tracking-tight leading-tight">
                    Ungdomskort
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-700 font-normal leading-snug mt-1 sm:mt-2 max-w-xl">
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
                  <h3 className="text-[clamp(1.5rem,3.8cqw,3.75rem)] font-bold tracking-tight text-white/95 group-hover:text-white transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
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
          className="capsule-card-wrapper absolute inset-0 w-full h-full flex items-center justify-center p-2.5 sm:p-4 md:p-0 z-[25] will-change-transform"
        >
          <section className={`capsule-card-section relative w-full h-full rounded-[32px] sm:rounded-[48px] md:rounded-[1000px] border-[8px] sm:border-[16px] md:border-[26px] lg:border-[32px] border-white transition-colors duration-500 overflow-hidden flex items-center justify-center p-0 shadow-[0_25px_65px_rgba(0,10,30,0.35)] ${
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
                className={`absolute top-[2.5%] left-0 w-full h-[47%] md:top-0 md:left-[8%] md:w-[41%] md:h-full flex flex-col justify-center px-6 sm:px-8 md:px-0 space-y-2 sm:space-y-4 md:space-y-5 overflow-y-auto [scrollbar-width:none] transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  case2Toggle === "on"
                    ? "opacity-100 scale-100 translate-y-0 md:translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-8 md:translate-y-0 md:-translate-x-12 pointer-events-none"
                }`}
              >
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-[clamp(1.5rem,3.2cqw,3.5rem)] font-bold text-slate-900 tracking-tight leading-tight">
                    X-Bit
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-700 font-normal leading-snug mt-1 sm:mt-2 max-w-xl">
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
                  <h3 className="text-[clamp(1.5rem,3.8cqw,3.75rem)] font-bold tracking-tight text-white/95 group-hover:text-white transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
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
          className="capsule-card-wrapper absolute inset-0 w-full h-full flex items-center justify-center p-2.5 sm:p-4 md:p-0 z-[30] will-change-transform"
        >
          <section className={`capsule-card-section relative w-full h-full rounded-[32px] sm:rounded-[48px] md:rounded-[1000px] border-[8px] sm:border-[16px] md:border-[26px] lg:border-[32px] border-white transition-colors duration-500 overflow-hidden flex items-center justify-center p-0 shadow-[0_25px_65px_rgba(0,10,30,0.35)] ${
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
                className={`absolute top-[2.5%] left-0 w-full h-[47%] md:top-0 md:left-[8%] md:w-[41%] md:h-full flex flex-col justify-center px-6 sm:px-8 md:px-0 space-y-2 sm:space-y-4 md:space-y-5 overflow-y-auto [scrollbar-width:none] transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  case3Toggle === "on"
                    ? "opacity-100 scale-100 translate-y-0 md:translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-8 md:translate-y-0 md:-translate-x-12 pointer-events-none"
                }`}
              >
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-[clamp(1.4rem,3cqw,3.2rem)] font-bold text-slate-900 tracking-tight leading-tight">
                    I Pupi Siciliani
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-700 font-normal leading-snug mt-1 sm:mt-2 max-w-xl">
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
                  <h3 className="text-[clamp(1.4rem,3.5cqw,3.5rem)] font-bold tracking-tight text-white/95 group-hover:text-white transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
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
          className="capsule-card-wrapper absolute inset-0 w-full h-full flex items-center justify-center p-2.5 sm:p-4 md:p-0 z-[35] will-change-transform"
        >
          <section className={`capsule-card-section relative w-full h-full rounded-[32px] sm:rounded-[48px] md:rounded-[1000px] border-[8px] sm:border-[16px] md:border-[26px] lg:border-[32px] border-white transition-colors duration-500 overflow-hidden flex items-center justify-center p-0 shadow-[0_25px_65px_rgba(0,10,30,0.35)] ${
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
                className={`absolute top-[2.5%] left-0 w-full h-[47%] md:top-0 md:left-[8%] md:w-[41%] md:h-full flex flex-col justify-center px-6 sm:px-8 md:px-0 py-2 sm:py-4 space-y-1.5 sm:space-y-2 md:space-y-2.5 overflow-y-auto [scrollbar-width:none] transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  case4Toggle === "on"
                    ? "opacity-100 scale-100 translate-y-0 md:translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-8 md:translate-y-0 md:-translate-x-12 pointer-events-none"
                }`}
              >
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                    Herald Ago
                  </h2>
                  <p className="text-[11px] sm:text-xs md:text-xs lg:text-sm text-slate-600 font-medium leading-snug mt-0.5 max-w-xl">
                    27 y/o · Product Designer · Italy &amp; Barcelona
                  </p>
                </div>

                <div className="space-y-1 sm:space-y-1.5 text-[11px] sm:text-xs md:text-xs lg:text-sm text-slate-800 leading-relaxed max-w-lg font-normal">
                  <p>
                    Italian with Albanian roots, born and raised in Padua. After a Bachelor in Communication Science &amp; Technologies, I moved to Miami, then headed to Denmark for an MSc in IT – Web Communication Design. After returning to Italy, I now live between Italy and Barcelona.
                  </p>
                  <p className="text-slate-600">
                    Passionate about design, AI, sociology, books, and travel. Beyond the screen, I love good food, great wine, and spending time with family and friends.
                  </p>
                </div>

                {/* Pulsanti di Azione */}
                <div className="pt-0.5 sm:pt-1 flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <a
                    href="/cv-herald-ago.pdf"
                    target="_blank"
                    download
                    onClick={(e) => e.stopPropagation()}
                    className="px-3 sm:px-3.5 py-1 rounded-full bg-slate-900 hover:bg-black active:scale-95 text-white text-[11px] sm:text-xs font-semibold shadow-sm transition-all cursor-pointer"
                  >
                    Download Resume PDF
                  </a>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToSection(6);
                    }}
                    className="px-3 sm:px-3.5 py-1 rounded-full bg-slate-900/10 hover:bg-slate-900/20 active:scale-95 text-slate-900 text-[11px] sm:text-xs font-semibold border border-slate-900/15 backdrop-blur-md transition-all cursor-pointer"
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
                    <div className="relative w-[87%] h-[87%] flex items-center justify-center">
                      <Image
                        src="/profile.png"
                        alt="Herald Ago"
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

        {/* --- CARD 6: RECOMMENDATIONS INTERACTIVE TOGGLE PILL --- */}
        <div
          ref={card6Ref}
          className="capsule-card-wrapper absolute inset-0 w-full h-full flex items-center justify-center p-2.5 sm:p-4 md:p-0 z-[40] will-change-transform"
        >
          <section className={`capsule-card-section relative w-full h-full rounded-[32px] sm:rounded-[48px] md:rounded-[1000px] border-[8px] sm:border-[16px] md:border-[26px] lg:border-[32px] border-white transition-colors duration-500 overflow-hidden flex items-center justify-center p-0 shadow-[0_25px_65px_rgba(0,10,30,0.35)] ${
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
                className={`absolute top-[2.5%] left-0 w-full h-[47%] md:top-0 md:left-[8%] md:w-[41%] md:h-full flex flex-col justify-center px-5 sm:px-7 md:px-0 py-2 sm:py-3 space-y-1.5 sm:space-y-2 overflow-y-auto [scrollbar-width:none] transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  case5Toggle === "on"
                    ? "opacity-100 scale-100 translate-y-0 md:translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-8 md:translate-y-0 md:-translate-x-12 pointer-events-none"
                }`}
              >
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-[clamp(1.3rem,2.6cqw,2.4rem)] font-bold text-slate-900 tracking-tight leading-tight">
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
                  <h3 className="text-[clamp(1.35rem,3.4cqw,3.5rem)] font-bold tracking-tight text-white/90 group-hover:text-white transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
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
          className="capsule-card-wrapper absolute inset-0 w-full h-full flex items-center justify-center p-2.5 sm:p-4 md:p-0 z-[45] will-change-transform"
        >
          <section className={`capsule-card-section relative w-full h-full rounded-[32px] sm:rounded-[48px] md:rounded-[1000px] border-[8px] sm:border-[16px] md:border-[26px] lg:border-[32px] border-white transition-colors duration-500 overflow-hidden flex items-center justify-center p-0 shadow-[0_25px_65px_rgba(0,10,30,0.35)] ${
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
                className={`absolute top-[2.5%] left-0 w-full h-[47%] md:top-0 md:left-[8%] md:w-[41%] md:h-full flex flex-col justify-center px-5 sm:px-7 md:px-0 space-y-1.5 sm:space-y-2 overflow-y-auto [scrollbar-width:none] transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  case6Toggle === "on"
                    ? "opacity-100 scale-100 translate-y-0 md:translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-8 md:translate-y-0 md:-translate-x-12 pointer-events-none"
                }`}
              >
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-[clamp(1.4rem,2.8cqw,2.6rem)] font-bold text-slate-900 tracking-tight leading-tight">
                    Let&apos;s Connect
                  </h2>
                  <p className="text-[11px] sm:text-xs md:text-sm text-slate-700 font-normal leading-snug mt-0.5">
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
                  <h3 className="text-[clamp(1.5rem,3.8cqw,3.75rem)] font-bold tracking-tight text-white/95 group-hover:text-white transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
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

      {/* =========================================================================
          MOBILE VIEW: FIGMA DRAFT ARCHITECTURE (block md:hidden)
          3 Stacked Hero Glass Capsules + Horizontal Interactive Pill Switches
         ========================================================================= */}
      <div className="block md:hidden relative w-full z-10 px-0 pt-[max(5.5rem,calc(env(safe-area-inset-top)+4.5rem))] pb-[max(5rem,calc(env(safe-area-inset-bottom)+2rem))] flex flex-col gap-0">
        {/* --- 1. HERO: 3 STACKED TRANSLUCENT GLASS CAPSULES (FIGMA) --- */}
        <section id="mobile-home" className="w-full flex flex-col items-center">
          <div className="w-full flex flex-col items-center select-none gap-0">
            {/* Capsule 1: Saluto */}
            <div className="w-full aspect-[2/1] px-8 sm:px-10 rounded-full bg-white/[0.12] border-0 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.7)] flex items-center justify-center text-center relative z-30">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
                Hi, I&apos;m Herald :)
              </h1>
            </div>

            {/* Capsule 2: Missione */}
            <div className="w-full aspect-[2/1] px-8 sm:px-10 rounded-full bg-white/[0.12] border-0 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.7)] flex items-center justify-center text-center relative z-20">
              <p className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
                I <span className="font-extrabold text-[#38bdf8] drop-shadow-[0_0_16px_rgba(56,189,248,0.7)]">design</span> digital
                <br />
                products
              </p>
            </div>

            {/* Capsule 3: Scopo */}
            <div className="w-full aspect-[2/1] px-8 sm:px-10 rounded-full bg-white/[0.12] border-0 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.7)] flex items-center justify-center text-center relative z-10">
              <p className="text-2xl sm:text-3xl font-medium tracking-tight text-white/95 leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
                that <span className="italic font-serif text-white">help</span> and{" "}
                <span className="italic font-serif text-white">simplify</span>
                <br />
                people&apos;s lives.
              </p>
            </div>
          </div>
        </section>

        {/* --- 2. WORK: HORIZONTAL SWITCH PILLS (FIGMA MOCKUP) --- */}
        <section id="mobile-work" className="w-full flex flex-col gap-0">

          {/* Project 1: Ungdomskort Horizontal Pill Switch */}
          <div className="w-full flex justify-center">
            <div
              role="switch"
              aria-checked={mobileCase1 === "on"}
              aria-label={mobileCase1 === "off" ? "Attiva case study Ungdomskort" : "Torna a copertina Ungdomskort"}
              onClick={() => {
                setMobileToggled1(true);
                setMobileCase1((prev) => (prev === "off" ? "on" : "off"));
              }}
              style={{ "--travel-dist": "calc(100cqw - 100% - 16px)" } as React.CSSProperties}
              className={`group relative w-full aspect-[2/1] rounded-full border-0 transition-colors duration-500 overflow-hidden shadow-[0_25px_60px_rgba(0,10,30,0.4)] cursor-pointer select-none active:scale-[0.985] ${
                mobileCase1 === "off" ? "bg-transparent" : "bg-white"
              }`}
            >
              {/* Pista interna del Toggle (Glass ad OFF, Bianca ad ON) */}
              <div
                className={`relative w-full h-full rounded-full [container-type:inline-size] overflow-hidden transition-all duration-500 ${
                  mobileCase1 === "off"
                    ? "bg-white/[0.12] shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.7)]"
                    : "bg-white shadow-none"
                }`}
              >
                {/* 1. STATO ATTIVO (ON): Dettagli case study a sinistra con abbondante respiro */}
                <div
                  className={`absolute top-0 left-8 sm:left-9 w-[42%] max-w-[165px] h-full flex flex-col justify-center space-y-1.5 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                    mobileCase1 === "on"
                      ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                      : "opacity-0 scale-90 -translate-x-10 pointer-events-none"
                  }`}
                >
                  <span className="text-[10px] font-bold text-blue-600 tracking-wider uppercase">
                    Transit Platform
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    Ungdomskort
                  </h3>
                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-snug">
                    Redesign of Denmark&apos;s youth transit pass platform.
                  </p>
                  <div className="pt-0.5">
                    <a
                      href="https://www.heraldago.com/ungdomskort"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-black active:scale-95 text-white text-[11px] font-semibold shadow-xs transition-all cursor-pointer"
                    >
                      <span>See case study</span>
                      <span className="text-xs">↗</span>
                    </a>
                  </div>
                </div>

                {/* 2. STATO SPENTO (OFF): Cover con solo il numero gigante "1" a destra */}
                <div
                  className={`absolute top-0 right-7 sm:right-8 w-[42%] h-full flex items-center justify-center pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                    mobileCase1 === "off"
                      ? "opacity-100 scale-100 translate-x-0"
                      : "opacity-0 scale-75 translate-x-12"
                  }`}
                >
                  <span className="text-7xl sm:text-8xl font-black text-white tracking-tighter drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)] leading-none select-none">
                    1
                  </span>
                </div>

                {/* 3. IL KNOB DEL TOGGLE: Grande pomello circolare fluido */}
                <div
                  className={`absolute top-2 left-2 h-[calc(100%-16px)] aspect-square rounded-full overflow-visible ${
                    !mobileToggled1
                      ? "translate-x-0"
                      : mobileCase1 === "on"
                      ? "bubble-knob-h-in"
                      : "bubble-knob-h-out"
                  } flex items-center justify-center select-none`}
                >
                  <div
                    className={`relative w-full h-full rounded-full overflow-hidden flex items-center justify-center p-3 transition-all duration-300 ease-out cursor-pointer ${
                      mobileCase1 === "off"
                        ? "bg-white shadow-[0_16px_40px_rgba(0,0,0,0.35),0_2px_6px_rgba(0,0,0,0.12),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:scale-[1.02] active:scale-[0.98]"
                        : "bg-[#0b2847] border-[4px] sm:border-[6px] border-white shadow-[0_20px_50px_rgba(0,18,36,0.45)] active:scale-[0.98]"
                    }`}
                  >
                    {mobileCase1 === "on" && (
                      <VantaKnobWaves
                        color={0x0b2847}
                        shininess={30.0}
                        waveHeight={20.0}
                        waveSpeed={0.75}
                        zoom={0.65}
                      />
                    )}
                    <div
                      className={`relative z-10 w-full h-full flex items-center justify-center pointer-events-none transition-all duration-500 ease-out ${
                        mobileCase1 === "off"
                          ? "opacity-95 contrast-100"
                          : "opacity-100 brightness-100 drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
                      }`}
                    >
                      <Image
                        src="/ungheromockup.svg"
                        alt="Ungdomskort Mockup"
                        fill
                        unoptimized
                        sizes="180px"
                        className="object-contain p-1"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project 2: X-Bit Horizontal Pill Switch */}
          <div className="w-full flex justify-center">
            <div
              role="switch"
              aria-checked={mobileCase2 === "on"}
              aria-label={mobileCase2 === "off" ? "Attiva case study X-Bit" : "Torna a copertina X-Bit"}
              onClick={() => {
                setMobileToggled2(true);
                setMobileCase2((prev) => (prev === "off" ? "on" : "off"));
              }}
              style={{ "--travel-dist": "calc(100cqw - 100% - 16px)" } as React.CSSProperties}
              className={`group relative w-full aspect-[2/1] rounded-full border-0 transition-colors duration-500 overflow-hidden shadow-[0_25px_60px_rgba(0,10,30,0.4)] cursor-pointer select-none active:scale-[0.985] ${
                mobileCase2 === "off" ? "bg-transparent" : "bg-white"
              }`}
            >
              {/* Pista interna del Toggle (Glass ad OFF, Bianca ad ON) */}
              <div
                className={`relative w-full h-full rounded-full [container-type:inline-size] overflow-hidden transition-all duration-500 ${
                  mobileCase2 === "off"
                    ? "bg-white/[0.12] shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.7)]"
                    : "bg-white shadow-none"
                }`}
              >
                {/* 1. STATO ATTIVO (ON): Dettagli case study a sinistra con abbondante respiro */}
                <div
                  className={`absolute top-0 left-8 sm:left-9 w-[42%] max-w-[165px] h-full flex flex-col justify-center space-y-1.5 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                    mobileCase2 === "on"
                      ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                      : "opacity-0 scale-90 -translate-x-10 pointer-events-none"
                  }`}
                >
                  <span className="text-[10px] font-bold text-blue-600 tracking-wider uppercase">
                    Museum Exploration
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    X-Bit
                  </h3>
                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-snug">
                    Interactive audio guide and cultural heritage exploration platform.
                  </p>
                  <div className="pt-0.5">
                    <a
                      href="https://www.heraldago.com/xbit"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-black active:scale-95 text-white text-[11px] font-semibold shadow-xs transition-all cursor-pointer"
                    >
                      <span>See case study</span>
                      <span className="text-xs">↗</span>
                    </a>
                  </div>
                </div>

                {/* 2. STATO SPENTO (OFF): Cover con solo il numero gigante "2" a destra */}
                <div
                  className={`absolute top-0 right-7 sm:right-8 w-[42%] h-full flex items-center justify-center pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                    mobileCase2 === "off"
                      ? "opacity-100 scale-100 translate-x-0"
                      : "opacity-0 scale-75 translate-x-12"
                  }`}
                >
                  <span className="text-7xl sm:text-8xl font-black text-white tracking-tighter drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)] leading-none select-none">
                    2
                  </span>
                </div>

                {/* 3. IL KNOB DEL TOGGLE: Grande pomello circolare fluido */}
                <div
                  className={`absolute top-2 left-2 h-[calc(100%-16px)] aspect-square rounded-full overflow-visible ${
                    !mobileToggled2
                      ? "translate-x-0"
                      : mobileCase2 === "on"
                      ? "bubble-knob-h-in"
                      : "bubble-knob-h-out"
                  } flex items-center justify-center select-none`}
                >
                  <div
                    className={`relative w-full h-full rounded-full overflow-hidden flex items-center justify-center p-3 transition-all duration-300 ease-out cursor-pointer ${
                      mobileCase2 === "off"
                        ? "bg-white shadow-[0_16px_40px_rgba(0,0,0,0.35),0_2px_6px_rgba(0,0,0,0.12),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:scale-[1.02] active:scale-[0.98]"
                        : "bg-[#0b2847] border-[4px] sm:border-[6px] border-white shadow-[0_20px_50px_rgba(0,18,36,0.45)] active:scale-[0.98]"
                    }`}
                  >
                    {mobileCase2 === "on" && (
                      <VantaKnobWaves
                        color={0x0b2847}
                        shininess={30.0}
                        waveHeight={20.0}
                        waveSpeed={0.75}
                        zoom={0.65}
                      />
                    )}
                    <div
                      className={`relative z-10 w-full h-full flex items-center justify-center pointer-events-none transition-all duration-500 ease-out ${
                        mobileCase2 === "off"
                          ? "opacity-95 contrast-100"
                          : "opacity-100 brightness-100 drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
                      }`}
                    >
                      <Image
                        src="/xbitheromockup.svg"
                        alt="X-Bit Mockup"
                        fill
                        unoptimized
                        sizes="180px"
                        className="object-contain p-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project 3: I Pupi Siciliani Horizontal Pill Switch */}
          <div className="w-full flex justify-center">
            <div
              role="switch"
              aria-checked={mobileCase3 === "on"}
              aria-label={mobileCase3 === "off" ? "Attiva case study I Pupi Siciliani" : "Torna a copertina I Pupi Siciliani"}
              onClick={() => {
                setMobileToggled3(true);
                setMobileCase3((prev) => (prev === "off" ? "on" : "off"));
              }}
              style={{ "--travel-dist": "calc(100cqw - 100% - 16px)" } as React.CSSProperties}
              className={`group relative w-full aspect-[2/1] rounded-full border-0 transition-colors duration-500 overflow-hidden shadow-[0_25px_60px_rgba(0,10,30,0.4)] cursor-pointer select-none active:scale-[0.985] ${
                mobileCase3 === "off" ? "bg-transparent" : "bg-white"
              }`}
            >
              {/* Pista interna del Toggle (Glass ad OFF, Bianca ad ON) */}
              <div
                className={`relative w-full h-full rounded-full [container-type:inline-size] overflow-hidden transition-all duration-500 ${
                  mobileCase3 === "off"
                    ? "bg-white/[0.12] shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.7)]"
                    : "bg-white shadow-none"
                }`}
              >
                {/* 1. STATO ATTIVO (ON): Dettagli case study a sinistra con abbondante respiro */}
                <div
                  className={`absolute top-0 left-8 sm:left-9 w-[42%] max-w-[165px] h-full flex flex-col justify-center space-y-1.5 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                    mobileCase3 === "on"
                      ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                      : "opacity-0 scale-90 -translate-x-10 pointer-events-none"
                  }`}
                >
                  <span className="text-[10px] font-bold text-blue-600 tracking-wider uppercase">
                    E-Commerce &amp; Wine
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    I Pupi Siciliani
                  </h3>
                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-snug">
                    Bespoke digital wine store experience delivering +187% profit growth.
                  </p>
                  <div className="pt-0.5">
                    <a
                      href="https://www.heraldago.com/ipupisiciliani"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-black active:scale-95 text-white text-[11px] font-semibold shadow-xs transition-all cursor-pointer"
                    >
                      <span>See case study</span>
                      <span className="text-xs">↗</span>
                    </a>
                  </div>
                </div>

                {/* 2. STATO SPENTO (OFF): Cover con solo il numero gigante "3" a destra */}
                <div
                  className={`absolute top-0 right-7 sm:right-8 w-[42%] h-full flex items-center justify-center pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                    mobileCase3 === "off"
                      ? "opacity-100 scale-100 translate-x-0"
                      : "opacity-0 scale-75 translate-x-12"
                  }`}
                >
                  <span className="text-7xl sm:text-8xl font-black text-white tracking-tighter drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)] leading-none select-none">
                    3
                  </span>
                </div>

                {/* 3. IL KNOB DEL TOGGLE: Grande pomello circolare fluido */}
                <div
                  className={`absolute top-2 left-2 h-[calc(100%-16px)] aspect-square rounded-full overflow-visible ${
                    !mobileToggled3
                      ? "translate-x-0"
                      : mobileCase3 === "on"
                      ? "bubble-knob-h-in"
                      : "bubble-knob-h-out"
                  } flex items-center justify-center select-none`}
                >
                  <div
                    className={`relative w-full h-full rounded-full overflow-hidden flex items-center justify-center p-3 transition-all duration-300 ease-out cursor-pointer ${
                      mobileCase3 === "off"
                        ? "bg-white shadow-[0_16px_40px_rgba(0,0,0,0.35),0_2px_6px_rgba(0,0,0,0.12),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:scale-[1.02] active:scale-[0.98]"
                        : "bg-[#0b2847] border-[4px] sm:border-[6px] border-white shadow-[0_20px_50px_rgba(0,18,36,0.45)] active:scale-[0.98]"
                    }`}
                  >
                    {mobileCase3 === "on" && (
                      <VantaKnobWaves
                        color={0x0b2847}
                        shininess={30.0}
                        waveHeight={20.0}
                        waveSpeed={0.75}
                        zoom={0.65}
                      />
                    )}
                    <div
                      className={`relative z-10 w-full h-full flex items-center justify-center pointer-events-none transition-all duration-500 ease-out ${
                        mobileCase3 === "off"
                          ? "opacity-95 contrast-100"
                          : "opacity-100 brightness-100 drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
                      }`}
                    >
                      <Image
                        src={mobileCase3 === "on" ? "/pupi-mockup-white.svg" : "/pupi-mockup.svg"}
                        alt="I Pupi Siciliani Mockup"
                        fill
                        unoptimized
                        sizes="180px"
                        className="object-contain p-1.5"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 3. ABOUT ME: HORIZONTAL PILL SWITCH --- */}
        <section id="mobile-about" className="w-full flex justify-center">

          <div className="w-full flex justify-center">
            <div
              role="switch"
              aria-checked={mobileCaseAbout === "on"}
              aria-label={mobileCaseAbout === "off" ? "Attiva dettagli About" : "Torna a copertina About"}
              onClick={() => {
                setMobileToggledAbout(true);
                setMobileCaseAbout((prev) => (prev === "off" ? "on" : "off"));
              }}
              style={{ "--travel-dist": "calc(100cqw - 100% - 16px)" } as React.CSSProperties}
              className={`group relative w-full aspect-[2/1] rounded-full border-0 transition-colors duration-500 overflow-hidden shadow-[0_25px_60px_rgba(0,10,30,0.4)] cursor-pointer select-none active:scale-[0.985] ${
                mobileCaseAbout === "off" ? "bg-transparent" : "bg-white"
              }`}
            >
              {/* Pista interna del Toggle (Glass ad OFF, Bianca ad ON) */}
              <div
                className={`relative w-full h-full rounded-full [container-type:inline-size] overflow-hidden transition-all duration-500 ${
                  mobileCaseAbout === "off"
                    ? "bg-white/[0.12] shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.7)]"
                    : "bg-white shadow-none"
                }`}
              >
                {/* 1. STATO ATTIVO (ON): Bio sintetica e link a sinistra con abbondante respiro */}
                <div
                  className={`absolute top-0 left-8 sm:left-9 w-[42%] max-w-[165px] h-full flex flex-col justify-center space-y-1.5 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                    mobileCaseAbout === "on"
                      ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                      : "opacity-0 scale-90 -translate-x-10 pointer-events-none"
                  }`}
                >
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight leading-tight">Herald Ago · 27 y/o</h3>
                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-snug">
                    Padua, Miami, MSc in Denmark. Living between Italy &amp; Barcelona. Design, AI, sociology &amp; fine wine.
                  </p>
                  <div className="pt-0.5 flex items-center gap-1.5">
                    <a
                      href="/cv-herald-ago.pdf"
                      target="_blank"
                      download
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-1 rounded-full bg-slate-900 hover:bg-black text-white text-[10px] font-semibold transition-all shadow-xs"
                    >
                      CV PDF
                    </a>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const el = document.getElementById("mobile-contact");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-3 py-1 rounded-full bg-slate-900/10 text-slate-900 text-[10px] font-semibold border border-slate-900/15"
                    >
                      Contact
                    </button>
                  </div>
                </div>

                {/* 2. STATO SPENTO (OFF): Cover con nome a destra */}
                <div
                  className={`absolute top-0 right-7 sm:right-8 w-[42%] h-full flex flex-col items-center justify-center pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                    mobileCaseAbout === "off"
                      ? "opacity-100 scale-100 translate-x-0"
                      : "opacity-0 scale-75 translate-x-12"
                  }`}
                >
                  <div className="text-center px-1">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] leading-tight">
                      Herald<br />Ago
                    </h3>
                    <p className="text-[10px] sm:text-xs text-white/80 font-medium mt-0.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
                      Product Designer
                    </p>
                  </div>
                </div>

                {/* 3. IL KNOB DEL TOGGLE: Foto Profilo con VantaKnobWaves */}
                <div
                  className={`absolute top-2 left-2 h-[calc(100%-16px)] aspect-square rounded-full overflow-visible ${
                    !mobileToggledAbout
                      ? "translate-x-0"
                      : mobileCaseAbout === "on"
                      ? "bubble-knob-h-in"
                      : "bubble-knob-h-out"
                  } flex items-center justify-center select-none`}
                >
                  <div
                    className={`relative w-full h-full rounded-full overflow-hidden flex items-center justify-center p-1.5 transition-all duration-300 ease-out cursor-pointer ${
                      mobileCaseAbout === "off"
                        ? "bg-white shadow-[0_16px_40px_rgba(0,0,0,0.35),0_2px_6px_rgba(0,0,0,0.12),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:scale-[1.02] active:scale-[0.98]"
                        : "bg-[#0b2847] border-[4px] sm:border-[6px] border-white shadow-[0_20px_50px_rgba(0,18,36,0.45)] active:scale-[0.98]"
                    }`}
                  >
                    {mobileCaseAbout === "on" && (
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
                          src="/profile.png"
                          alt="Herald Ago"
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

        {/* --- 4. KIND WORDS (RECOMMENDATIONS): HORIZONTAL PILL SWITCH --- */}
        <section id="mobile-recommendations" className="w-full flex justify-center">
          <div className="w-full flex justify-center">
            <div
              role="switch"
              aria-checked={mobileCaseRec === "on"}
              aria-label={mobileCaseRec === "off" ? "Attiva testimonianze Kind Words" : "Torna a copertina Kind Words"}
              onClick={() => {
                setMobileToggledRec(true);
                setMobileCaseRec((prev) => (prev === "off" ? "on" : "off"));
              }}
              style={{ "--travel-dist": "calc(100cqw - 100% - 16px)" } as React.CSSProperties}
              className={`group relative w-full aspect-[2/1] rounded-full border-0 transition-colors duration-500 overflow-hidden shadow-[0_25px_60px_rgba(0,10,30,0.4)] cursor-pointer select-none active:scale-[0.985] ${
                mobileCaseRec === "off" ? "bg-transparent" : "bg-white"
              }`}
            >
              {/* Pista interna del Toggle (Glass ad OFF, Bianca ad ON) */}
              <div
                className={`relative w-full h-full rounded-full [container-type:inline-size] overflow-hidden transition-all duration-500 ${
                  mobileCaseRec === "off"
                    ? "bg-white/[0.12] shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.7)]"
                    : "bg-white shadow-none"
                }`}
              >
                {/* 1. STATO ATTIVO (ON): Testimonianze a sinistra con abbondante respiro */}
                <div
                  className={`absolute top-0 left-8 sm:left-9 w-[42%] max-w-[165px] h-full flex flex-col justify-center space-y-1.5 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                    mobileCaseRec === "on"
                      ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                      : "opacity-0 scale-90 -translate-x-10 pointer-events-none"
                  }`}
                >
                  <div className="flex items-center gap-1.5 pb-0.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => setMobileActiveRec("antonio")}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                        mobileActiveRec === "antonio"
                          ? "bg-slate-900 text-white shadow-xs"
                          : "bg-slate-900/10 text-slate-700 hover:bg-slate-900/15"
                      }`}
                    >
                      Antonio
                    </button>
                    <button
                      type="button"
                      onClick={() => setMobileActiveRec("sebastian")}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                        mobileActiveRec === "sebastian"
                          ? "bg-slate-900 text-white shadow-xs"
                          : "bg-slate-900/10 text-slate-700 hover:bg-slate-900/15"
                      }`}
                    >
                      Sebastian
                    </button>
                  </div>

                  {mobileActiveRec === "antonio" ? (
                    <div className="space-y-0.5">
                      <p className="text-[10.5px] text-slate-800 italic line-clamp-2 leading-snug">
                        &ldquo;Herald has rare proactivity and deep study. The trust he inspires will take him very far.&rdquo;
                      </p>
                      <p className="text-[9.5px] font-bold text-slate-900">
                        Antonio · <span className="font-normal text-slate-500 text-[9px]">Founder, I Pupi Siciliani</span>
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-0.5">
                      <p className="text-[10.5px] text-slate-800 italic line-clamp-2 leading-snug">
                        &ldquo;Herald excelled at cross-stakeholder collaboration, guiding the process with precision.&rdquo;
                      </p>
                      <p className="text-[9.5px] font-bold text-slate-900">
                        Sebastian · <span className="font-normal text-slate-500 text-[9px]">CEO, næmt.nu</span>
                      </p>
                    </div>
                  )}
                </div>

                {/* 2. STATO SPENTO (OFF): Cover con titolo a destra */}
                <div
                  className={`absolute top-0 right-7 sm:right-8 w-[42%] h-full flex flex-col items-center justify-center pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                    mobileCaseRec === "off"
                      ? "opacity-100 scale-100 translate-x-0"
                      : "opacity-0 scale-75 translate-x-12"
                  }`}
                >
                  <div className="text-center px-1">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] leading-tight">
                      Kind<br />Words
                    </h3>
                    <p className="text-[10px] sm:text-xs text-white/80 font-medium mt-0.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
                      Recommendations
                    </p>
                  </div>
                </div>

                {/* 3. IL KNOB DEL TOGGLE: Foto Founder con VantaKnobWaves */}
                <div
                  className={`absolute top-2 left-2 h-[calc(100%-16px)] aspect-square rounded-full overflow-visible ${
                    !mobileToggledRec
                      ? "translate-x-0"
                      : mobileCaseRec === "on"
                      ? "bubble-knob-h-in"
                      : "bubble-knob-h-out"
                  } flex items-center justify-center select-none`}
                >
                  <div
                    className={`relative w-full h-full rounded-full overflow-hidden flex items-center justify-center p-1.5 transition-all duration-300 ease-out cursor-pointer ${
                      mobileCaseRec === "off"
                        ? "bg-white shadow-[0_16px_40px_rgba(0,0,0,0.35),0_2px_6px_rgba(0,0,0,0.12),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:scale-[1.02] active:scale-[0.98]"
                        : "bg-[#0b2847] border-[4px] sm:border-[6px] border-white shadow-[0_20px_50px_rgba(0,18,36,0.45)] active:scale-[0.98]"
                    }`}
                  >
                    {mobileCaseRec === "on" && (
                      <VantaKnobWaves
                        color={0x0b2847}
                        shininess={30.0}
                        waveHeight={20.0}
                        waveSpeed={0.75}
                        zoom={0.65}
                      />
                    )}
                    <div className="relative z-10 w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                      <div
                        className={`absolute inset-0 transition-opacity duration-500 ease-out rounded-full overflow-hidden ${
                          mobileActiveRec === "antonio" ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                        }`}
                      >
                        <Image
                          src="/antonio-founder.jpg"
                          alt="Antonio"
                          fill
                          unoptimized
                          sizes="160px"
                          className="object-cover object-[center_32%]"
                        />
                      </div>
                      <div
                        className={`absolute inset-0 transition-opacity duration-500 ease-out rounded-full overflow-hidden ${
                          mobileActiveRec === "sebastian" ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                        }`}
                      >
                        <Image
                          src="/herald-sebastian-team.jpg"
                          alt="Sebastian"
                          fill
                          unoptimized
                          sizes="160px"
                          className="object-cover object-[52%_48%]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 5. CONTACT: HORIZONTAL PILL SWITCH --- */}
        <section id="mobile-contact" className="w-full flex justify-center">
          <div className="w-full flex justify-center">
            <div
              role="switch"
              aria-checked={mobileCaseContact === "on"}
              aria-label={mobileCaseContact === "off" ? "Attiva canali di contatto" : "Torna a copertina Contact"}
              onClick={() => {
                setMobileToggledContact(true);
                setMobileCaseContact((prev) => (prev === "off" ? "on" : "off"));
              }}
              style={{ "--travel-dist": "calc(100cqw - 100% - 16px)" } as React.CSSProperties}
              className={`group relative w-full aspect-[2/1] rounded-full border-0 transition-colors duration-500 overflow-hidden shadow-[0_25px_60px_rgba(0,10,30,0.4)] cursor-pointer select-none active:scale-[0.985] ${
                mobileCaseContact === "off" ? "bg-transparent" : "bg-white"
              }`}
            >
              {/* Pista interna del Toggle (Glass ad OFF, Bianca ad ON) */}
              <div
                className={`relative w-full h-full rounded-full [container-type:inline-size] overflow-hidden transition-all duration-500 ${
                  mobileCaseContact === "off"
                    ? "bg-white/[0.12] shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.7)]"
                    : "bg-white shadow-none"
                }`}
              >
                {/* 1. STATO ATTIVO (ON): Opzioni e canali a sinistra */}
                <div
                  className={`absolute top-0 left-8 sm:left-9 w-[42%] max-w-[165px] h-full flex flex-col justify-center space-y-1.5 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                    mobileCaseContact === "on"
                      ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                      : "opacity-0 scale-90 -translate-x-10 pointer-events-none"
                  }`}
                >
                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight leading-tight">
                      Let&apos;s Connect
                    </h3>
                    <p className="text-[10px] text-slate-600 line-clamp-1 leading-snug mt-0.5">
                      Open for product design roles.
                    </p>
                  </div>

                  <div className="flex flex-col gap-1 pt-0.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="w-full py-1 px-2 rounded-full bg-slate-900 hover:bg-black active:scale-95 text-white text-[10px] font-semibold transition-all shadow-xs text-center cursor-pointer"
                    >
                      {copiedEmail ? "Copied!" : "heraldago1@gmail.com"}
                    </button>

                    <div className="flex items-center gap-1.5">
                      <a
                        href="https://www.linkedin.com/in/heraldago/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-1 px-1.5 rounded-full bg-slate-900/10 text-slate-900 text-[10px] font-semibold border border-slate-900/15 text-center active:scale-95 transition-all"
                      >
                        LinkedIn ↗
                      </a>
                      <a
                        href="/cv-herald-ago.pdf"
                        target="_blank"
                        download
                        className="flex-1 py-1 px-1.5 rounded-full bg-slate-900/10 text-slate-900 text-[10px] font-semibold border border-slate-900/15 text-center active:scale-95 transition-all"
                      >
                        Resume ↗
                      </a>
                    </div>
                  </div>
                </div>

                {/* 2. STATO SPENTO (OFF): Cover con titolo a destra */}
                <div
                  className={`absolute top-0 right-7 sm:right-8 w-[42%] h-full flex flex-col items-center justify-center pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                    mobileCaseContact === "off"
                      ? "opacity-100 scale-100 translate-x-0"
                      : "opacity-0 scale-75 translate-x-12"
                  }`}
                >
                  <div className="text-center px-1">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] leading-tight">
                      Let&apos;s<br />Connect
                    </h3>
                    <p className="text-[10px] sm:text-xs text-white/80 font-medium mt-0.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
                      Say Hello
                    </p>
                  </div>
                </div>

                {/* 3. IL KNOB DEL TOGGLE: Icona Mail con VantaKnobWaves */}
                <div
                  className={`absolute top-2 left-2 h-[calc(100%-16px)] aspect-square rounded-full overflow-visible ${
                    !mobileToggledContact
                      ? "translate-x-0"
                      : mobileCaseContact === "on"
                      ? "bubble-knob-h-in"
                      : "bubble-knob-h-out"
                  } flex items-center justify-center select-none`}
                >
                  <div
                    className={`relative w-full h-full rounded-full overflow-hidden flex items-center justify-center p-3 transition-all duration-300 ease-out cursor-pointer ${
                      mobileCaseContact === "off"
                        ? "bg-white shadow-[0_16px_40px_rgba(0,0,0,0.35),0_2px_6px_rgba(0,0,0,0.12),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:scale-[1.02] active:scale-[0.98]"
                        : "bg-[#0b2847] border-[4px] sm:border-[6px] border-white shadow-[0_20px_50px_rgba(0,18,36,0.45)] active:scale-[0.98]"
                    }`}
                  >
                    {mobileCaseContact === "on" && (
                      <VantaKnobWaves
                        color={0x0b2847}
                        shininess={30.0}
                        waveHeight={20.0}
                        waveSpeed={0.75}
                        zoom={0.65}
                      />
                    )}
                    <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
                      <svg
                        className={`w-10 h-10 sm:w-12 sm:h-12 transition-all duration-300 ${
                          mobileCaseContact === "off"
                            ? "text-slate-900 drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                            : "text-white drop-shadow-[0_6px_20px_rgba(255,255,255,0.6)]"
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  </main>
  );
}


