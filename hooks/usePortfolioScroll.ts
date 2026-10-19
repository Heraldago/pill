"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { SECTIONS } from "@/data/portfolio";

export interface ScrollSectionItem {
  id: string;
  label: string;
}

export function usePortfolioScroll(
  customSections?: readonly ScrollSectionItem[],
  customMobileTargetMap?: Record<number, string>
) {
  const sections = customSections ?? SECTIONS;
  const pinnedContainerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  const card5Ref = useRef<HTMLDivElement>(null);
  const card6Ref = useRef<HTMLDivElement>(null);
  const card7Ref = useRef<HTMLDivElement>(null);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const currentStepRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navigateToSection = useCallback((index: number, onDone?: () => void) => {
    const clampedIndex = Math.min(sections.length - 1, Math.max(0, index));

    // Supporto per mobile (< 768px): scroll nativo fluido verso la sezione corrispondente
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      currentStepRef.current = clampedIndex;
      setActiveSectionIndex(clampedIndex);
      const defaultTargetMap: Record<number, string> = {
        0: "mobile-home",
        1: "mobile-work",
        2: "mobile-work",
        3: "mobile-work",
        4: "mobile-about",
        5: "mobile-recommendations",
        6: "mobile-contact",
      };
      const targetMap = customMobileTargetMap ?? defaultTargetMap;
      const id = targetMap[clampedIndex] || "mobile-home";
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      onDone?.();
      return;
    }

    if (clampedIndex === currentStepRef.current && !isTransitioningRef.current) {
      onDone?.();
      return;
    }

    const prevIndex = currentStepRef.current;
    currentStepRef.current = clampedIndex;
    setActiveSectionIndex(clampedIndex);

    isTransitioningRef.current = true;

    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }

    if (timelineRef.current) {
      const distance = Math.abs(clampedIndex - (timelineRef.current.time() || 0));
      const duration = Math.min(1.1, Math.max(0.65, 0.65 + (distance - 1) * 0.12));

      console.log(
        `%c[PortfolioScroll:NAVIGATE] Step: ${prevIndex} -> ${clampedIndex} | duration=${duration.toFixed(2)}s`,
        "color: #06b6d4; font-weight: bold;"
      );

      timelineRef.current.tweenTo(clampedIndex, {
        duration,
        ease: "power2.inOut",
        overwrite: true,
        onComplete: () => {
          console.log(`[PortfolioScroll:COMPLETE] Reached Step ${clampedIndex}`);
          isTransitioningRef.current = false;
          if (transitionTimeoutRef.current) {
            clearTimeout(transitionTimeoutRef.current);
            transitionTimeoutRef.current = null;
          }
          onDone?.();
        },
      });

      transitionTimeoutRef.current = setTimeout(() => {
        isTransitioningRef.current = false;
        onDone?.();
      }, (duration + 0.15) * 1000);
    } else {
      console.warn("[PortfolioScroll:WARN] timelineRef is null! Animation skipped.");
      isTransitioningRef.current = false;
      onDone?.();
    }
  }, []);

  const scrollToSection = useCallback(
    (target: "home" | "work" | "about" | "contact") => {
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
    },
    [navigateToSection]
  );

  useEffect(() => {
    console.log(
      "%c[PortfolioScroll v2.1 Loaded - Direct GSAP Timeline / No Lenis]",
      "background: #10b981; color: #000; font-weight: bold; padding: 4px 8px; border-radius: 4px;"
    );

    // Supporto per test / automazione
    if (typeof window !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__navigateToSection = navigateToSection;
    }

    // 1. Orchestrazione Timeline GSAP diretta per Desktop (min-width: 768px)
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      if (
        !card1Ref.current ||
        !card2Ref.current ||
        !card3Ref.current ||
        !card4Ref.current ||
        !card5Ref.current ||
        !card6Ref.current ||
        !card7Ref.current
      ) {
        console.warn("[PortfolioScroll] Missing card refs on mount:", {
          c1: !!card1Ref.current,
          c2: !!card2Ref.current,
          c3: !!card3Ref.current,
          c4: !!card4Ref.current,
          c5: !!card5Ref.current,
          c6: !!card6Ref.current,
          c7: !!card7Ref.current,
        });
        return;
      }

      console.log("[PortfolioScroll] Building GSAP timeline for 7 stacked cards");

      // Impostazione iniziale: Tutte le card dalla 2 alla 7 partono sotto al viewport
      gsap.set(card1Ref.current, { autoAlpha: 1, scale: 1 });
      gsap.set(card2Ref.current, { yPercent: 100, autoAlpha: 1, scale: 1 });
      gsap.set(card3Ref.current, { yPercent: 100, autoAlpha: 1, scale: 1 });
      gsap.set(card4Ref.current, { yPercent: 100, autoAlpha: 1, scale: 1 });
      gsap.set(card5Ref.current, { yPercent: 100, autoAlpha: 1, scale: 1 });
      gsap.set(card6Ref.current, { yPercent: 100, autoAlpha: 1, scale: 1 });
      gsap.set(card7Ref.current, { yPercent: 100, autoAlpha: 1, scale: 1 });

      const tl = gsap.timeline({ paused: true });

      const cards = [
        card1Ref.current,
        card2Ref.current,
        card3Ref.current,
        card4Ref.current,
        card5Ref.current,
        card6Ref.current,
        card7Ref.current,
      ];

      for (let i = 0; i < 6; i++) {
        const currentCard = cards[i];
        const nextCard = cards[i + 1];

        // Card N scales down to 0.95 over the 1s slide of Card N+1
        tl.to(currentCard, { scale: 0.95, ease: "none", duration: 1 }, i);

        // Card N fades out only in the second half of the slide (from i + 0.5 to i + 1.0)
        // In reverse, as soon as Card N+1 starts sliding down, Card N immediately fades back in!
        tl.to(currentCard, { autoAlpha: 0, ease: "none", duration: 0.5 }, i + 0.5);

        // Card N+1 slides up from yPercent: 100 to yPercent: 0
        tl.to(nextCard, { yPercent: 0, ease: "none", duration: 1 }, i);
      }

      timelineRef.current = tl;

      if (currentStepRef.current > 0) {
        tl.seek(currentStepRef.current);
      }

      return () => {
        tl.kill();
        timelineRef.current = null;
      };
    });

    // Helper: controlla se l'evento wheel e sopra un contenitore interno scrollabile
    const canScrollInner = (target: HTMLElement | null, deltaY: number): boolean => {
      let current: HTMLElement | null = target;
      while (current && current !== document.body && current !== document.documentElement) {
        if (current.tagName === "TEXTAREA" || current.tagName === "INPUT") {
          return true;
        }

        const style = window.getComputedStyle(current);
        const overflowY = style.overflowY;
        if (overflowY === "auto" || overflowY === "scroll") {
          const maxScroll = current.scrollHeight - current.clientHeight;
          if (maxScroll > 4) {
            const atTop = current.scrollTop <= 2;
            const atBottom = current.scrollTop >= maxScroll - 2;
            if (deltaY > 0 && !atBottom) return true;
            if (deltaY < 0 && !atTop) return true;
          }
        }
        current = current.parentElement;
      }
      return false;
    };

    // 2. Step Wheel Controller: 1 Scroll Gesture = Strictly 1 Card Step
    // Funziona perfettamente sia per tocchi brevissimi (short flick) che per trascinamenti lunghi (long swipe).
    let isLocked = false;
    let lastDirection = 0;
    let accumulatedDelta = 0;
    let quietTimer: ReturnType<typeof setTimeout> | null = null;
    let lastTransitionEndTime = 0;

    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth < 768) return;

      let deltaY = e.deltaY;
      if (e.deltaMode === 1) deltaY *= 16;
      else if (e.deltaMode === 2) deltaY *= window.innerHeight;

      if (Math.abs(deltaY) < 1) return;

      const direction = Math.sign(deltaY);

      // Controlla se la gesture avviene sopra un'area scrollabile interna (es. bio, recensioni, form)
      if (canScrollInner(e.target as HTMLElement, deltaY)) {
        accumulatedDelta = 0;
        return;
      }

      // Intercetta l'evento per impedire lo scroll nativo del browser
      e.preventDefault();

      // Resetta il timer di quiete: 140ms di silenzio senza eventi indicano che
      // il gesto (o l'inerzia prolungata del trackpad) e terminato.
      if (quietTimer) clearTimeout(quietTimer);
      quietTimer = setTimeout(() => {
        isLocked = false;
        accumulatedDelta = 0;
      }, 140);

      // 1. Se la transizione GSAP e ancora in corso, assorbi qualsiasi impulso
      if (isTransitioningRef.current) {
        return;
      }

      // 2. Cooldown post-transizione (80ms) per stabilita visiva
      if (performance.now() - lastTransitionEndTime < 80) {
        return;
      }

      // 3. Inversione immediata di marcia: sblocca subito senza attendere il timer di quiete
      if (isLocked && direction !== lastDirection) {
        isLocked = false;
        accumulatedDelta = 0;
      }

      // 4. Se la card attuale e ancora bloccata dalla gesture precedente nella stessa direzione:
      if (isLocked) {
        return;
      }

      // 5. Accumula delta
      if (Math.sign(accumulatedDelta) !== 0 && Math.sign(accumulatedDelta) !== direction) {
        accumulatedDelta = 0;
      }
      accumulatedDelta += deltaY;

      // 6. Soglia di scatto a 8px: sensibilita ideale per scattare sia con flick brevissimi che con swipe lunghi
      if (Math.abs(accumulatedDelta) < 8) {
        return;
      }

      const stepDirection = Math.sign(accumulatedDelta);
      const nextIndex = Math.min(
        sections.length - 1,
        Math.max(0, currentStepRef.current + stepDirection)
      );

      // Consuma l'accumulo
      accumulatedDelta = 0;

      if (nextIndex === currentStepRef.current) {
        isLocked = false;
        return;
      }

      // Blocca rigorosamente: questa gesture ha consumato il suo scatto di 1 pillola.
      // Non potra avanzare ulteriormente finche non termina l'animazione e la gesture non si ferma.
      isLocked = true;
      lastDirection = stepDirection;

      console.log(
        `[PortfolioScroll:wheel] 1-STEP -> targetIndex=${nextIndex} (${sections[nextIndex]?.label})`
      );

      navigateToSection(nextIndex, () => {
        lastTransitionEndTime = performance.now();
      });
    };

    // 3. Keyboard Arrow / Page Controller
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
        const nextIndex = Math.min(sections.length - 1, currentStepRef.current + 1);
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
        navigateToSection(sections.length - 1);
      }
    };

    // 4. Touch swipe per laptop touch / tablet orizzontale
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (window.innerWidth >= 768 && e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (window.innerWidth < 768 || e.changedTouches.length === 0) return;
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) < 40 || isTransitioningRef.current) return;

      const direction = deltaY > 0 ? 1 : -1;
      const nextIndex = Math.min(
        sections.length - 1,
        Math.max(0, currentStepRef.current + direction)
      );
      if (nextIndex !== currentStepRef.current) {
        navigateToSection(nextIndex);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false, capture: true });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      if (quietTimer) clearTimeout(quietTimer);
      window.removeEventListener("wheel", handleWheel, { capture: true });
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
      mm.revert();
      if (typeof window !== "undefined") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (window as any).__navigateToSection;
      }
    };
  }, [navigateToSection, sections]);

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
