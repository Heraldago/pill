"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SECTIONS } from "@/data/portfolio";

export function usePortfolioScroll() {
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
  const currentStepRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const wheelAccumulatorRef = useRef(0);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navigateToSection = useCallback((index: number, onDone?: () => void) => {
    const clampedIndex = Math.min(SECTIONS.length - 1, Math.max(0, index));
    currentStepRef.current = clampedIndex;
    setActiveSectionIndex(clampedIndex);

    if (!lenisRef.current) {
      onDone?.();
      return;
    }

    const trigger = scrollTriggerRef.current;
    const totalSteps = SECTIONS.length - 1;

    let target = 0;
    if (trigger) {
      const totalDist = trigger.end - trigger.start;
      target = trigger.start + totalDist * (clampedIndex / totalSteps);
    } else {
      target = (window.innerHeight * 6 * clampedIndex) / totalSteps;
    }

    isTransitioningRef.current = true;
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }

    lenisRef.current.scrollTo(target, {
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lock: true,
      onComplete: () => {
        onDone?.();
        // Cooldown safety margin to absorb lingering trackpad inertia
        setTimeout(() => {
          isTransitioningRef.current = false;
          wheelAccumulatorRef.current = 0;
        }, 140);
      },
    });

    // Failsafe timer to unlock state if onComplete is interrupted
    transitionTimeoutRef.current = setTimeout(() => {
      isTransitioningRef.current = false;
      wheelAccumulatorRef.current = 0;
      onDone?.();
    }, 1100);
  }, []);

  const scrollToSection = useCallback((target: "home" | "work" | "about" | "contact") => {
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
  }, [navigateToSection]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Inizializzazione Smooth Scrolling inerziale con Lenis
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
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

    // Supporto per test / automazione
    if (typeof window !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__navigateToSection = navigateToSection;
    }

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
      ) {
        return;
      }

      // Impostazione iniziale: Tutte le card dalla 2 alla 7 partono sotto al viewport
      gsap.set(card1Ref.current, { autoAlpha: 1, scale: 1 });
      gsap.set(card2Ref.current, { yPercent: 100, autoAlpha: 1, scale: 1 });
      gsap.set(card3Ref.current, { yPercent: 100, autoAlpha: 1, scale: 1 });
      gsap.set(card4Ref.current, { yPercent: 100, autoAlpha: 1, scale: 1 });
      gsap.set(card5Ref.current, { yPercent: 100, autoAlpha: 1, scale: 1 });
      gsap.set(card6Ref.current, { yPercent: 100, autoAlpha: 1, scale: 1 });
      gsap.set(card7Ref.current, { yPercent: 100, autoAlpha: 1, scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinnedContainerRef.current,
          start: "top top",
          end: "+=600%", // Distanza virtuale per 6 transizioni consecutive complete
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          snap: {
            snapTo: 1 / 6,
            duration: { min: 0.35, max: 0.65 },
            delay: 0.05,
            ease: "power2.inOut",
          },
          onUpdate: (self) => {
            const p = self.progress;
            const totalSteps = SECTIONS.length - 1; // 6
            const activeIdx = Math.min(totalSteps, Math.max(0, Math.round(p * totalSteps)));
            if (!isTransitioningRef.current) {
              currentStepRef.current = activeIdx;
              setActiveSectionIndex(activeIdx);
            }
          },
        },
      });

      scrollTriggerRef.current = tl.scrollTrigger ?? null;

      // Transizione 1: Card 1 -> Card 2
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

      // Transizione 2: Card 2 -> Card 3
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

      // Transizione 3: Card 3 -> Card 4
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

      // Transizione 4: Card 4 -> Card 5 (About Me)
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

      // Transizione 5: Card 5 -> Card 6 (Recommendations)
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

      // Transizione 6: Card 6 -> Card 7 (Contact)
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

    // 3. Step Wheel Controller: 1 Scroll Gesture = Exactly 1 Card Step
    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth < 768) return;

      // Intercetta lo scroll per bloccare la transizione a metà e avanzare a step
      e.preventDefault();

      if (isTransitioningRef.current) return;

      wheelAccumulatorRef.current += e.deltaY;

      // Soglia per distinguere micro-sfioramenti da gesture voluta
      if (Math.abs(wheelAccumulatorRef.current) < 22) return;

      const direction = wheelAccumulatorRef.current > 0 ? 1 : -1;
      wheelAccumulatorRef.current = 0;

      const nextIndex = Math.min(
        SECTIONS.length - 1,
        Math.max(0, currentStepRef.current + direction)
      );

      if (nextIndex !== currentStepRef.current) {
        navigateToSection(nextIndex);
      }
    };

    // 4. Keyboard Arrow / Page Controller
    const handleKeyDown = (e: KeyboardEvent) => {
      if (window.innerWidth < 768) return;
      const target = e.target as HTMLElement;
      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable
      ) {
        return;
      }

      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        if (isTransitioningRef.current) return;
        const nextIndex = Math.min(SECTIONS.length - 1, currentStepRef.current + 1);
        if (nextIndex !== currentStepRef.current) {
          navigateToSection(nextIndex);
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        if (isTransitioningRef.current) return;
        const nextIndex = Math.max(0, currentStepRef.current - 1);
        if (nextIndex !== currentStepRef.current) {
          navigateToSection(nextIndex);
        }
      } else if (e.key === "Home") {
        e.preventDefault();
        navigateToSection(0);
      } else if (e.key === "End") {
        e.preventDefault();
        navigateToSection(SECTIONS.length - 1);
      }
    };

    // 5. Touch swipe su desktop/laptop touch
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (window.innerWidth >= 768 && e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (window.innerWidth < 768 || e.changedTouches.length === 0) return;
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) < 35 || isTransitioningRef.current) return;

      const direction = deltaY > 0 ? 1 : -1;
      const nextIndex = Math.min(
        SECTIONS.length - 1,
        Math.max(0, currentStepRef.current + direction)
      );
      if (nextIndex !== currentStepRef.current) {
        navigateToSection(nextIndex);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
      mm.revert();
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      if (typeof window !== "undefined") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (window as any).__navigateToSection;
      }
    };
  }, [navigateToSection]);

  return {
    pinnedContainerRef,
    card1Ref,
    card2Ref,
    card3Ref,
    card4Ref,
    card5Ref,
    card6Ref,
    card7Ref,
    activeSectionIndex,
    navigateToSection,
    scrollToSection,
  };
}
