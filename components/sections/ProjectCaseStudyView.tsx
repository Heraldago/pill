"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import VantaWaves from "@/components/VantaWaves";
import VantaKnobWaves from "@/components/VantaKnobWaves";
import ScrollSpyNav from "@/components/navigation/ScrollSpyNav";
import { usePortfolioScroll, ScrollSectionItem } from "@/hooks/usePortfolioScroll";
import { ProjectDetail } from "@/data/caseStudiesData";

const PROJECT_SECTIONS: ScrollSectionItem[] = [
  { id: "hero", label: "Intro" },
  { id: "problem", label: "01. Problem" },
  { id: "decisions", label: "02. Decisions" },
  { id: "process", label: "03. System & Craft" },
  { id: "impact", label: "04. Impact" },
  { id: "learnings", label: "05. Retrospective" },
  { id: "next", label: "Next Project" },
];

const PROJECT_MOBILE_TARGET_MAP: Record<number, string> = {
  0: "m-proj-hero",
  1: "m-proj-problem",
  2: "m-proj-decisions",
  3: "m-proj-process",
  4: "m-proj-impact",
  5: "m-proj-learnings",
  6: "m-proj-next",
};

function getCardState(cardIndex: number, activeIndex: number): string {
  const diff = cardIndex - activeIndex;
  if (diff === 0) return "active";
  if (diff === -1) return "prev";
  if (diff === 1) return "next";
  if (diff < -1) return "far-prev";
  return "far-next";
}

interface ProjectCaseStudyViewProps {
  project: ProjectDetail;
}

export default function ProjectCaseStudyView({ project }: ProjectCaseStudyViewProps) {
  const {
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
  } = usePortfolioScroll(PROJECT_SECTIONS, PROJECT_MOBILE_TARGET_MAP);

  // Desktop pill toggle states
  const [problemOn, setProblemOn] = useState(false);
  const [problemToggledOnce, setProblemToggledOnce] = useState(false);
  const [problemCompareMode, setProblemCompareMode] = useState<"before" | "after">("after");

  const [decisionsOn, setDecisionsOn] = useState(false);
  const [decisionsToggledOnce, setDecisionsToggledOnce] = useState(false);
  const [selectedDecisionIdx, setSelectedDecisionIdx] = useState(2);
  const [decisionsViewMode, setDecisionsViewMode] = useState<"prototype" | "tradeoffs">(
    project.prototypeSteps && project.prototypeSteps.length > 0 ? "prototype" : "tradeoffs"
  );
  const [selectedProtoIdx, setSelectedProtoIdx] = useState(0);

  const [processOn, setProcessOn] = useState(false);
  const [processToggledOnce, setProcessToggledOnce] = useState(false);
  const [selectedPhaseIdx, setSelectedPhaseIdx] = useState(0);

  const [impactOn, setImpactOn] = useState(false);
  const [impactToggledOnce, setImpactToggledOnce] = useState(false);
  const [showTeamPhoto, setShowTeamPhoto] = useState(false);

  const [learningsOn, setLearningsOn] = useState(false);
  const [learningsToggledOnce, setLearningsToggledOnce] = useState(false);
  const [learningsTab, setLearningsTab] = useState<"worked" | "errors">("worked");

  const [nextOn, setNextOn] = useState(false);
  const [nextToggledOnce, setNextToggledOnce] = useState(false);

  // Mobile pill toggle states
  const [mProblemOn, setMProblemOn] = useState(false);
  const [mProblemOnce, setMProblemOnce] = useState(false);

  const [mDecisionsOn, setMDecisionsOn] = useState(false);
  const [mDecisionsOnce, setMDecisionsOnce] = useState(false);

  const [mProcessOn, setMProcessOn] = useState(false);
  const [mProcessOnce, setMProcessOnce] = useState(false);

  const [mImpactOn, setMImpactOn] = useState(false);
  const [mImpactOnce, setMImpactOnce] = useState(false);

  const [mLearningsOn, setMLearningsOn] = useState(false);
  const [mLearningsOnce, setMLearningsOnce] = useState(false);

  const [mNextOn, setMNextOn] = useState(false);
  const [mNextOnce, setMNextOnce] = useState(false);

  // Mobile burger menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fullscreen image lightbox state
  const [lightboxImage, setLightboxImage] = useState<{ src: string; label: string } | null>(null);

  const scrollToMobileElement = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const activeDecision =
    project.decisions.options[selectedDecisionIdx] ?? project.decisions.options[0];
  const activePhase =
    project.process.phases[selectedPhaseIdx] ?? project.process.phases[0];
  const activeProtoStep =
    project.prototypeSteps?.[selectedProtoIdx] ?? project.prototypeSteps?.[0];

  return (
    <div
      ref={pinnedContainerRef}
      className="relative min-h-screen md:h-screen w-full overflow-x-hidden md:overflow-hidden text-white font-sans selection:bg-cyan-400 selection:text-slate-900"
    >
      {/* Fixed 3D background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <VantaWaves
          color={0x0b2847}
          shininess={30.0}
          waveHeight={20.0}
          waveSpeed={0.75}
          zoom={0.65}
        />
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-2xl flex flex-col items-center justify-center p-4 sm:p-8 cursor-zoom-out animate-fadeIn"
        >
          <div className="relative w-full max-w-6xl h-[78vh] rounded-3xl overflow-hidden border border-white/20 bg-slate-950/60">
            <Image
              src={lightboxImage.src}
              alt={lightboxImage.label}
              fill
              sizes="100vw"
              className="object-contain p-3 sm:p-6"
            />
          </div>
          <div className="mt-4 flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
            <span className="text-xs sm:text-sm font-semibold text-white">
              {lightboxImage.label}
            </span>
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="px-2.5 py-0.5 rounded-full bg-white text-slate-900 text-xs font-bold cursor-pointer"
            >
              Close ✕
            </button>
          </div>
        </div>
      )}

      {/* 1. Fixed Top-Left Logo (Back to Home) */}
      <div className="fixed top-4 sm:top-5 md:top-6 left-4 sm:left-6 md:left-8 z-50 pointer-events-auto flex items-center gap-2.5">
        <Link
          href="/"
          aria-label="Back to Home"
          className="group relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/25 backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Image
            src="/logo.svg"
            alt="Herald Ago Logo"
            width={24}
            height={24}
            className="w-5 h-5 sm:w-6 sm:h-6 object-contain transition-transform duration-300 group-hover:rotate-6"
            priority
          />
        </Link>
        <Link
          href="/"
          className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.16] border border-white/20 backdrop-blur-xl text-xs font-semibold text-white/90 hover:text-white transition-all cursor-pointer"
        >
          <span>←</span>
          <span>Home</span>
        </Link>
      </div>

      {/* 2. Mobile Top-Right Hamburger Button */}
      <div className="fixed top-4 sm:top-5 right-4 sm:right-6 z-50 md:hidden pointer-events-auto">
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          className="relative flex flex-col items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/25 backdrop-blur-xl transition-all duration-300 active:scale-95 cursor-pointer"
        >
          <span
            className={`block w-4.5 h-0.5 bg-white rounded-full transition-all duration-300 ${
              mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`block w-4.5 h-0.5 bg-white rounded-full my-1 transition-all duration-300 ${
              mobileMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
            }`}
          />
          <span
            className={`block w-4.5 h-0.5 bg-white rounded-full transition-all duration-300 ${
              mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </div>

      {/* 3. Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
        />
        <div
          className={`absolute top-16 sm:top-20 right-4 sm:right-6 w-60 rounded-3xl bg-slate-900/90 backdrop-blur-2xl border border-white/25 p-3 flex flex-col gap-1 transition-all duration-300 origin-top-right ${
            mobileMenuOpen
              ? "scale-100 translate-y-0 opacity-100"
              : "scale-90 -translate-y-4 opacity-0"
          }`}
        >
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-left px-4 py-2.5 rounded-2xl text-sm font-semibold text-cyan-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            ← Back to Home
          </Link>
          <button
            type="button"
            onClick={() => scrollToMobileElement("m-proj-hero")}
            className="w-full text-left px-4 py-2.5 rounded-2xl text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            Intro
          </button>
          <button
            type="button"
            onClick={() => scrollToMobileElement("m-proj-problem")}
            className="w-full text-left px-4 py-2.5 rounded-2xl text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            01 / Problem
          </button>
          <button
            type="button"
            onClick={() => scrollToMobileElement("m-proj-decisions")}
            className="w-full text-left px-4 py-2.5 rounded-2xl text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            02 / Decisions &amp; Screens
          </button>
          <button
            type="button"
            onClick={() => scrollToMobileElement("m-proj-process")}
            className="w-full text-left px-4 py-2.5 rounded-2xl text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            03 / System &amp; Craft
          </button>
          <button
            type="button"
            onClick={() => scrollToMobileElement("m-proj-impact")}
            className="w-full text-left px-4 py-2.5 rounded-2xl text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            04 / Impact
          </button>
          <button
            type="button"
            onClick={() => scrollToMobileElement("m-proj-learnings")}
            className="w-full text-left px-4 py-2.5 rounded-2xl text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            05 / Retrospective
          </button>
          <Link
            href={`/work/${project.nextProject.slug}`}
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-left px-4 py-2.5 rounded-2xl text-sm font-semibold text-white bg-white/15 hover:bg-white/25 transition-all cursor-pointer mt-1"
          >
            Next: {project.nextProject.title} ↗
          </Link>
        </div>
      </div>

      {/* 4. Desktop Top Pill Nav */}
      <div
        className={`fixed top-5 md:top-7 left-1/2 -translate-x-1/2 z-50 hidden md:block transition-all duration-500 ${
          activeSectionIndex === 0
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-6 pointer-events-none"
        }`}
      >
        <nav
          aria-label="Case Study Navigation"
          className="flex items-center gap-1 p-1.5 rounded-full bg-white/[0.08] backdrop-blur-2xl border border-white/25"
        >
          <button
            type="button"
            onClick={() => navigateToSection(0)}
            className="px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold bg-white text-slate-900 transition-all cursor-pointer"
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => navigateToSection(1)}
            className="px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium text-white/85 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            Problem
          </button>
          <button
            type="button"
            onClick={() => navigateToSection(2)}
            className="px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium text-white/85 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            Decisions
          </button>
          <button
            type="button"
            onClick={() => navigateToSection(3)}
            className="px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium text-white/85 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            Craft
          </button>
          <button
            type="button"
            onClick={() => navigateToSection(4)}
            className="px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium text-white/85 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            Impact
          </button>
          <button
            type="button"
            onClick={() => navigateToSection(5)}
            className="px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium text-white/85 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            Learnings
          </button>
        </nav>
      </div>

      {/* Right-Side ScrollSpy Navigation */}
      <ScrollSpyNav
        sections={PROJECT_SECTIONS}
        activeIndex={activeSectionIndex}
        onNavigate={navigateToSection}
      />

      {/* =========================================================
          DESKTOP 3D WARP STACK (Fixed Stage with data-card-state)
         ========================================================= */}
      <div className="hidden md:block fixed inset-0 w-screen h-[100dvh] overflow-hidden">
        <div className="warp-stage">
          {/* ==========================================
              CARD 1: HERO & EXECUTIVE SUMMARY
             ========================================== */}
          <div
            ref={card1Ref}
            data-card-state={getCardState(0, activeSectionIndex)}
            className="warp-card-node flex items-center justify-center px-6 py-8 md:p-8"
          >
            <div className="pill-shell relative w-full max-w-6xl mx-auto">
              <div className="pill-inner relative w-full h-full px-8 lg:px-14 flex flex-col justify-center items-center text-center">
                {/* Metadata Strip */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-cyan-400/20 border border-cyan-300/40 text-[10px] font-bold tracking-widest uppercase text-cyan-200">
                    {project.badge}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-semibold text-white/90">
                    {project.role}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-semibold text-white/80">
                    {project.timeline} / {project.year}
                  </span>
                  {project.tools?.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 rounded-full bg-slate-950/40 border border-white/15 text-[10px] font-medium text-cyan-200/90"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Title & One-Line Pitch */}
                <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight leading-none text-white">
                  {project.title}
                </h1>
                <p className="mt-2 max-w-xl text-xs lg:text-sm text-white/85 font-medium">
                  {project.summary}
                </p>

                {/* Visual Showcase + 3 Headline KPIs */}
                <div className="mt-4 w-full max-w-4xl grid grid-cols-12 gap-3 items-center">
                  {/* Hero Mockup Preview */}
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxImage({
                        src: project.heroMockup,
                        label: `${project.title} - Overview`,
                      })
                    }
                    className="col-span-5 relative h-32 lg:h-36 rounded-2xl bg-slate-950/45 border border-white/20 overflow-hidden group cursor-zoom-in"
                  >
                    <Image
                      src={project.heroMockup}
                      alt={project.title}
                      fill
                      priority
                      sizes="400px"
                      className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-slate-950/80 border border-white/20 text-[9px] font-semibold text-cyan-200">
                      Zoom ⤢
                    </span>
                  </button>

                  {/* 3 Big Metrics */}
                  <div className="col-span-7 grid grid-cols-3 gap-2.5">
                    {project.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="h-32 lg:h-36 px-3 py-3 rounded-2xl bg-white/[0.08] border border-white/20 backdrop-blur-md flex flex-col items-center justify-center text-center"
                      >
                        <span className="text-2xl lg:text-3xl font-black text-cyan-300 tracking-tight">
                          {m.value}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white mt-1">
                          {m.label}
                        </span>
                        <span className="text-[9px] text-white/70 mt-1 line-clamp-2 leading-tight">
                          {m.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick CTAs */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => navigateToSection(1)}
                    className="px-5 py-2 rounded-full bg-white text-slate-900 font-semibold text-xs hover:bg-cyan-50 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    01 / Problem ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDecisionsViewMode("prototype");
                      setDecisionsOn(true);
                      setDecisionsToggledOnce(true);
                      navigateToSection(2);
                    }}
                    className="px-4 py-2 rounded-full bg-cyan-400/20 hover:bg-cyan-400/30 border border-cyan-300/40 text-cyan-100 font-semibold text-xs transition-all hover:scale-105 cursor-pointer"
                  >
                    Interactive Screens (7)
                  </button>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-xs transition-all hover:scale-105 cursor-pointer"
                    >
                      Live Portal ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ==========================================
              CARD 2: 01 / THE PROBLEM (Before vs After)
             ========================================== */}
          <div
            ref={card2Ref}
            data-card-state={getCardState(1, activeSectionIndex)}
            className="warp-card-node flex items-center justify-center px-6 py-8 md:p-8"
          >
            <div className="pill-shell relative w-full max-w-6xl mx-auto">
              <div
                data-pill-state={problemOn ? "on" : "off"}
                onClick={() => {
                  if (!problemOn) {
                    setProblemOn(true);
                    setProblemToggledOnce(true);
                  }
                }}
                className="pill-inner pill-toggle-track relative w-full h-full select-none"
              >
                {/* RIGHT teaser when OFF */}
                <div
                  className={`hidden md:flex absolute inset-y-0 right-0 w-[52%] flex-col justify-center items-start pl-8 pr-12 z-10 transition-all duration-500 ${
                    problemOn
                      ? "opacity-0 translate-x-8 pointer-events-none"
                      : "opacity-100 translate-x-0"
                  }`}
                >
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-semibold tracking-widest uppercase text-cyan-200 mb-3">
                    01 / Friction Audit
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2 leading-tight">
                    {project.problem.headline}
                  </h2>
                  <p className="text-white/80 text-xs lg:text-sm mb-5 max-w-md">
                    {project.problem.description}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setProblemOn(true);
                      setProblemToggledOnce(true);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-900 text-xs font-bold hover:scale-105 transition-all cursor-pointer"
                  >
                    <span>Compare Before / After</span>
                    <span>→</span>
                  </button>
                </div>

                {/* LEFT summary when ON */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className={`hidden md:flex absolute inset-y-0 left-0 w-[39%] flex-col justify-center pl-12 pr-4 z-10 transition-all duration-500 ${
                    problemOn
                      ? "opacity-100 translate-x-0 pointer-events-auto"
                      : "opacity-0 -translate-x-8 pointer-events-none"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 rounded-full bg-rose-500/20 border border-rose-300/35 text-[10px] font-bold tracking-widest uppercase text-rose-200">
                      01 / Problem
                    </span>
                    <button
                      type="button"
                      onClick={() => setProblemOn(false)}
                      className="text-[11px] font-medium text-white/70 hover:text-white px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
                    >
                      ← Close
                    </button>
                  </div>

                  <h3 className="text-xl lg:text-2xl font-extrabold tracking-tight text-white mb-3 leading-snug">
                    {project.problem.headline}
                  </h3>

                  <div className="space-y-2 mb-4">
                    {project.problem.keyIssues.map((issue, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-white/[0.08] border border-white/15 flex items-center gap-2.5"
                      >
                        <span className="w-5 h-5 rounded-full bg-rose-400/25 border border-rose-300/40 text-rose-200 text-[10px] font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <p className="text-xs text-white/95 font-medium leading-snug">
                          {issue}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Before / After Switcher */}
                  {project.problem.beforeImage && project.problem.afterImage && (
                    <div className="flex items-center gap-1.5 p-1 rounded-full bg-slate-950/45 border border-white/15 w-fit">
                      <button
                        type="button"
                        onClick={() => setProblemCompareMode("before")}
                        className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                          problemCompareMode === "before"
                            ? "bg-rose-500 text-white"
                            : "text-white/75 hover:text-white"
                        }`}
                      >
                        Before (Legacy)
                      </button>
                      <button
                        type="button"
                        onClick={() => setProblemCompareMode("after")}
                        className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                          problemCompareMode === "after"
                            ? "bg-emerald-400 text-slate-950"
                            : "text-white/75 hover:text-white"
                        }`}
                      >
                        After (3-Step UI)
                      </button>
                    </div>
                  )}
                </div>

                {/* KNOB (Right Visual Showcase when ON) */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setProblemOn((prev) => !prev);
                    setProblemToggledOnce(true);
                  }}
                  role="button"
                  tabIndex={0}
                  aria-pressed={problemOn}
                  aria-label="Toggle Problem view"
                  className="pill-toggle-knob group"
                >
                  <div className="pill-knob-shader">
                    <VantaKnobWaves />
                  </div>
                  <div className="pill-knob-specular" />

                  {/* OFF state */}
                  <div
                    className={`relative z-20 flex flex-col items-center justify-center text-center p-6 transition-all duration-500 ${
                      problemOn
                        ? "opacity-0 scale-90 pointer-events-none"
                        : "opacity-100 scale-100"
                    }`}
                  >
                    <span className="px-4 py-1.5 rounded-full bg-white/15 border border-white/30 text-xs font-bold uppercase tracking-widest text-white mb-2">
                      01 / Problem
                    </span>
                    <span className="text-white/80 text-xs font-medium">
                      Click to inspect Before / After
                    </span>
                    {!problemToggledOnce && (
                      <span className="mt-3 w-2.5 h-2.5 rounded-full bg-cyan-300 animate-ping" />
                    )}
                  </div>

                  {/* ON state: Large Visual */}
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className={`absolute inset-0 z-20 flex flex-col items-center justify-center p-6 transition-all duration-500 ${
                      problemOn
                        ? "opacity-100 scale-100 pointer-events-auto"
                        : "opacity-0 scale-95 pointer-events-none"
                    }`}
                  >
                    {project.problem.beforeImage && project.problem.afterImage ? (
                      <div className="relative w-[84%] h-[74%] rounded-3xl overflow-hidden border border-white/25 bg-slate-950/75 flex flex-col">
                        <div
                          onClick={() =>
                            setLightboxImage({
                              src:
                                problemCompareMode === "before"
                                  ? project.problem.beforeImage!
                                  : project.problem.afterImage!,
                              label:
                                problemCompareMode === "before"
                                  ? project.problem.beforeLabel || "Before"
                                  : project.problem.afterLabel || "After",
                            })
                          }
                          className="relative flex-1 w-full overflow-hidden cursor-zoom-in group/img"
                        >
                          <Image
                            src={
                              problemCompareMode === "before"
                                ? project.problem.beforeImage
                                : project.problem.afterImage
                            }
                            alt="Before vs After comparison"
                            fill
                            sizes="600px"
                            className="object-contain p-3 transition-transform duration-500 group-hover/img:scale-105"
                          />
                          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 border border-white/20 text-[10px] font-semibold text-cyan-200">
                            Zoom ⤢
                          </span>
                        </div>
                        <div className="px-4 py-2 bg-slate-950/90 border-t border-white/15 flex items-center justify-between">
                          <span className="text-[11px] font-semibold text-white/90 truncate">
                            {problemCompareMode === "before"
                              ? project.problem.beforeLabel
                              : project.problem.afterLabel}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setProblemCompareMode((prev) =>
                                prev === "before" ? "after" : "before"
                              )
                            }
                            className="px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 text-[10px] font-bold text-cyan-200 shrink-0 cursor-pointer"
                          >
                            Switch to {problemCompareMode === "before" ? "After" : "Before"} →
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-[78%] h-[68%]">
                        <Image
                          src={project.heroMockup}
                          alt={project.title}
                          fill
                          sizes="500px"
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ==========================================
              CARD 3: 02 / DECISIONS & INTERACTIVE SCREENS
             ========================================== */}
          <div
            ref={card3Ref}
            data-card-state={getCardState(2, activeSectionIndex)}
            className="warp-card-node flex items-center justify-center px-6 py-8 md:p-8"
          >
            <div className="pill-shell relative w-full max-w-6xl mx-auto">
              <div
                data-pill-state={decisionsOn ? "on" : "off"}
                onClick={() => {
                  if (!decisionsOn) {
                    setDecisionsOn(true);
                    setDecisionsToggledOnce(true);
                  }
                }}
                className="pill-inner pill-toggle-track relative w-full h-full select-none"
              >
                {/* RIGHT teaser when OFF */}
                <div
                  className={`hidden md:flex absolute inset-y-0 right-0 w-[52%] flex-col justify-center items-start pl-8 pr-12 z-10 transition-all duration-500 ${
                    decisionsOn
                      ? "opacity-0 translate-x-8 pointer-events-none"
                      : "opacity-100 translate-x-0"
                  }`}
                >
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-semibold tracking-widest uppercase text-cyan-200 mb-3">
                    02 / Decisions &amp; Interactive Flow
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2 leading-tight">
                    {project.decisions.headline}
                  </h2>
                  <p className="text-white/80 text-xs lg:text-sm mb-5 max-w-md">
                    {project.decisions.description}
                  </p>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDecisionsViewMode("prototype");
                        setDecisionsOn(true);
                        setDecisionsToggledOnce(true);
                      }}
                      className="px-5 py-2.5 rounded-full bg-white text-slate-900 text-xs font-bold hover:scale-105 transition-all cursor-pointer"
                    >
                      Explore 7 Screens →
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDecisionsViewMode("tradeoffs");
                        setDecisionsOn(true);
                        setDecisionsToggledOnce(true);
                      }}
                      className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white text-xs font-semibold transition-all cursor-pointer"
                    >
                      V1 / V2 / Final
                    </button>
                  </div>
                </div>

                {/* LEFT selector when ON */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className={`hidden md:flex absolute inset-y-0 left-0 w-[39%] flex-col justify-center pl-12 pr-4 z-10 transition-all duration-500 ${
                    decisionsOn
                      ? "opacity-100 translate-x-0 pointer-events-auto"
                      : "opacity-0 -translate-x-8 pointer-events-none"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-1 p-1 rounded-full bg-slate-950/45 border border-white/15">
                      {project.prototypeSteps && project.prototypeSteps.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setDecisionsViewMode("prototype")}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            decisionsViewMode === "prototype"
                              ? "bg-cyan-300 text-slate-950"
                              : "text-white/75 hover:text-white"
                          }`}
                        >
                          Screens ({project.prototypeSteps.length})
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setDecisionsViewMode("tradeoffs")}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          decisionsViewMode === "tradeoffs"
                            ? "bg-white text-slate-900"
                            : "text-white/75 hover:text-white"
                        }`}
                      >
                        Iterations (3)
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDecisionsOn(false)}
                      className="text-[11px] font-medium text-white/70 hover:text-white px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
                    >
                      ← Close
                    </button>
                  </div>

                  {decisionsViewMode === "tradeoffs" ? (
                    <div className="space-y-2">
                      {project.decisions.options.map((opt, idx) => {
                        const isSelected = idx === selectedDecisionIdx;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setSelectedDecisionIdx(idx)}
                            className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                              isSelected
                                ? "bg-white/15 border-cyan-300/60"
                                : "bg-white/[0.06] border-white/15 hover:bg-white/10"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-0.5">
                              <span className="text-xs font-bold text-white">
                                {opt.title}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                                  opt.chosen
                                    ? "bg-emerald-400/20 text-emerald-200 border border-emerald-300/40"
                                    : "bg-white/10 text-white/70 border border-white/15"
                                }`}
                              >
                                {opt.tag}
                              </span>
                            </div>
                            <p className="text-[11px] text-white/80 leading-snug">
                              {opt.outcome}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div>
                      <div className="grid grid-cols-2 gap-1.5 mb-2.5">
                        {project.prototypeSteps?.map((step, idx) => {
                          const isSelected = idx === selectedProtoIdx;
                          return (
                            <button
                              key={step.title}
                              type="button"
                              onClick={() => setSelectedProtoIdx(idx)}
                              className={`text-left px-2.5 py-2 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-1 ${
                                isSelected
                                  ? "bg-cyan-400/20 border-cyan-300/60 text-white"
                                  : "bg-white/[0.06] border-white/15 text-white/80 hover:bg-white/10"
                              }`}
                            >
                              <span className="text-[11px] font-bold truncate">
                                {step.title}
                              </span>
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-cyan-200 shrink-0">
                                {step.badge}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      {activeProtoStep && (
                        <div className="p-2.5 rounded-xl bg-slate-950/45 border border-white/15">
                          <p className="text-xs text-white/90 font-medium">
                            {activeProtoStep.description}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* KNOB (Right Visual Showcase when ON) */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setDecisionsOn((prev) => !prev);
                    setDecisionsToggledOnce(true);
                  }}
                  role="button"
                  tabIndex={0}
                  aria-pressed={decisionsOn}
                  aria-label="Toggle Decisions view"
                  className="pill-toggle-knob group"
                >
                  <div className="pill-knob-shader">
                    <VantaKnobWaves />
                  </div>
                  <div className="pill-knob-specular" />

                  {/* OFF state */}
                  <div
                    className={`relative z-20 flex flex-col items-center justify-center text-center p-6 transition-all duration-500 ${
                      decisionsOn
                        ? "opacity-0 scale-90 pointer-events-none"
                        : "opacity-100 scale-100"
                    }`}
                  >
                    <span className="px-4 py-1.5 rounded-full bg-white/15 border border-white/30 text-xs font-bold uppercase tracking-widest text-white mb-2">
                      02 / Decisions
                    </span>
                    <span className="text-white/80 text-xs font-medium">
                      Click to view 7 Screens &amp; Iterations
                    </span>
                    {!decisionsToggledOnce && (
                      <span className="mt-3 w-2.5 h-2.5 rounded-full bg-cyan-300 animate-ping" />
                    )}
                  </div>

                  {/* ON state: Large Screen or Iteration Display */}
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className={`absolute inset-0 z-20 flex flex-col items-center justify-center p-6 transition-all duration-500 ${
                      decisionsOn
                        ? "opacity-100 scale-100 pointer-events-auto"
                        : "opacity-0 scale-95 pointer-events-none"
                    }`}
                  >
                    {decisionsViewMode === "prototype" && activeProtoStep ? (
                      <div className="relative w-[84%] h-[74%] rounded-3xl overflow-hidden border border-white/25 bg-slate-950/75 flex flex-col">
                        <div
                          onClick={() =>
                            setLightboxImage({
                              src: activeProtoStep.image,
                              label: `${activeProtoStep.title} - ${activeProtoStep.description}`,
                            })
                          }
                          className="relative flex-1 w-full overflow-hidden cursor-zoom-in group/img"
                        >
                          <Image
                            src={activeProtoStep.image}
                            alt={activeProtoStep.title}
                            fill
                            sizes="600px"
                            className="object-contain p-3 transition-transform duration-500 group-hover/img:scale-105"
                          />
                          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 border border-white/20 text-[10px] font-semibold text-cyan-200">
                            Zoom ⤢
                          </span>
                        </div>
                        <div className="px-4 py-2 bg-slate-950/90 border-t border-white/15 flex items-center justify-between gap-2">
                          <span className="text-[11px] font-bold text-white truncate">
                            {activeProtoStep.title}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedProtoIdx((prev) =>
                                  prev > 0
                                    ? prev - 1
                                    : (project.prototypeSteps?.length ?? 1) - 1
                                )
                              }
                              className="px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-[10px] font-bold text-white cursor-pointer"
                            >
                              ←
                            </button>
                            <span className="text-[10px] text-white/70 font-semibold">
                              {selectedProtoIdx + 1}/{project.prototypeSteps?.length}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedProtoIdx((prev) =>
                                  prev < (project.prototypeSteps?.length ?? 1) - 1
                                    ? prev + 1
                                    : 0
                                )
                              }
                              className="px-2.5 py-0.5 rounded-full bg-cyan-400/25 hover:bg-cyan-400/35 text-[10px] font-bold text-cyan-100 cursor-pointer"
                            >
                              →
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : activeDecision.image ? (
                      <div className="relative w-[84%] h-[74%] rounded-3xl overflow-hidden border border-white/25 bg-slate-950/75 flex flex-col">
                        <div
                          onClick={() =>
                            setLightboxImage({
                              src: activeDecision.image!,
                              label: activeDecision.title,
                            })
                          }
                          className="relative flex-1 w-full overflow-hidden cursor-zoom-in group/img"
                        >
                          <Image
                            src={activeDecision.image}
                            alt={activeDecision.title}
                            fill
                            sizes="600px"
                            className="object-contain p-3 transition-transform duration-500 group-hover/img:scale-105"
                          />
                          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 border border-white/20 text-[10px] font-semibold text-cyan-200">
                            Zoom ⤢
                          </span>
                        </div>
                        <div className="px-4 py-2 bg-slate-950/90 border-t border-white/15 flex items-center justify-between">
                          <span className="text-[11px] font-semibold text-white/90 truncate">
                            {activeDecision.imageCaption || activeDecision.title}
                          </span>
                          <span className="text-[10px] font-bold text-cyan-300">
                            {activeDecision.tag}
                          </span>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ==========================================
              CARD 4: 03 / SYSTEM & CRAFT
             ========================================== */}
          <div
            ref={card4Ref}
            data-card-state={getCardState(3, activeSectionIndex)}
            className="warp-card-node flex items-center justify-center px-6 py-8 md:p-8"
          >
            <div className="pill-shell relative w-full max-w-6xl mx-auto">
              <div
                data-pill-state={processOn ? "on" : "off"}
                onClick={() => {
                  if (!processOn) {
                    setProcessOn(true);
                    setProcessToggledOnce(true);
                  }
                }}
                className="pill-inner pill-toggle-track relative w-full h-full select-none"
              >
                {/* RIGHT teaser when OFF */}
                <div
                  className={`hidden md:flex absolute inset-y-0 right-0 w-[52%] flex-col justify-center items-start pl-8 pr-12 z-10 transition-all duration-500 ${
                    processOn
                      ? "opacity-0 translate-x-8 pointer-events-none"
                      : "opacity-100 translate-x-0"
                  }`}
                >
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-semibold tracking-widest uppercase text-cyan-200 mb-3">
                    03 / System &amp; Craft
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2 leading-tight">
                    {project.process.headline}
                  </h2>
                  <p className="text-white/80 text-xs lg:text-sm mb-4 max-w-md">
                    {project.process.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.deliverables.map((d) => (
                      <span
                        key={d}
                        className="px-2.5 py-1 rounded-full bg-white/[0.08] border border-white/15 text-[10px] font-medium text-white/90"
                      >
                        ✓ {d}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setProcessOn(true);
                      setProcessToggledOnce(true);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-900 text-xs font-bold hover:scale-105 transition-all cursor-pointer"
                  >
                    <span>Inspect Research &amp; Tokens</span>
                    <span>→</span>
                  </button>
                </div>

                {/* LEFT artifact selector when ON */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className={`hidden md:flex absolute inset-y-0 left-0 w-[39%] flex-col justify-center pl-12 pr-4 z-10 transition-all duration-500 ${
                    processOn
                      ? "opacity-100 translate-x-0 pointer-events-auto"
                      : "opacity-0 -translate-x-8 pointer-events-none"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="px-3 py-1 rounded-full bg-cyan-400/20 border border-cyan-300/35 text-[10px] font-bold tracking-widest uppercase text-cyan-200">
                      03 / Craft Artifacts ({project.process.phases.length})
                    </span>
                    <button
                      type="button"
                      onClick={() => setProcessOn(false)}
                      className="text-[11px] font-medium text-white/70 hover:text-white px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
                    >
                      ← Close
                    </button>
                  </div>

                  {/* 2-Column Grid of Craft Phases */}
                  <div className="grid grid-cols-2 gap-1.5 mb-2.5">
                    {project.process.phases.map((phase, idx) => {
                      const isSelected = idx === selectedPhaseIdx;
                      return (
                        <button
                          key={phase.step}
                          type="button"
                          onClick={() => setSelectedPhaseIdx(idx)}
                          className={`text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-white/15 border-cyan-300/60"
                              : "bg-white/[0.06] border-white/15 hover:bg-white/10"
                          }`}
                        >
                          <span className="text-[9px] font-bold uppercase tracking-wider text-cyan-300 block">
                            Step {phase.step}
                          </span>
                          <span className="text-xs font-bold text-white block truncate">
                            {phase.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {activePhase && (
                    <div className="p-2.5 rounded-xl bg-slate-950/45 border border-white/15">
                      <p className="text-xs text-white/90 font-medium">
                        {activePhase.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* KNOB (Right Artifact Showcase when ON) */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setProcessOn((prev) => !prev);
                    setProcessToggledOnce(true);
                  }}
                  role="button"
                  tabIndex={0}
                  aria-pressed={processOn}
                  aria-label="Toggle Craft view"
                  className="pill-toggle-knob group"
                >
                  <div className="pill-knob-shader">
                    <VantaKnobWaves />
                  </div>
                  <div className="pill-knob-specular" />

                  {/* OFF state */}
                  <div
                    className={`relative z-20 flex flex-col items-center justify-center text-center p-6 transition-all duration-500 ${
                      processOn
                        ? "opacity-0 scale-90 pointer-events-none"
                        : "opacity-100 scale-100"
                    }`}
                  >
                    <span className="px-4 py-1.5 rounded-full bg-white/15 border border-white/30 text-xs font-bold uppercase tracking-widest text-white mb-2">
                      03 / Craft
                    </span>
                    <span className="text-white/80 text-xs font-medium">
                      Click for Audit, Flow &amp; Tokens
                    </span>
                    {!processToggledOnce && (
                      <span className="mt-3 w-2.5 h-2.5 rounded-full bg-cyan-300 animate-ping" />
                    )}
                  </div>

                  {/* ON state: Large Visual Artifact */}
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className={`absolute inset-0 z-20 flex flex-col items-center justify-center p-6 transition-all duration-500 ${
                      processOn
                        ? "opacity-100 scale-100 pointer-events-auto"
                        : "opacity-0 scale-95 pointer-events-none"
                    }`}
                  >
                    {activePhase?.image ? (
                      <div className="relative w-[84%] h-[74%] rounded-3xl overflow-hidden border border-white/25 bg-slate-950/75 flex flex-col">
                        <div
                          onClick={() =>
                            setLightboxImage({
                              src: activePhase.image!,
                              label: `${activePhase.title} - ${activePhase.description}`,
                            })
                          }
                          className="relative flex-1 w-full overflow-hidden cursor-zoom-in group/img"
                        >
                          <Image
                            src={activePhase.image}
                            alt={activePhase.title}
                            fill
                            sizes="600px"
                            className="object-contain p-3 transition-transform duration-500 group-hover/img:scale-105"
                          />
                          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 border border-white/20 text-[10px] font-semibold text-cyan-200">
                            Zoom ⤢
                          </span>
                        </div>
                        <div className="px-4 py-2 bg-slate-950/90 border-t border-white/15 flex items-center justify-between">
                          <span className="text-[11px] font-bold text-white truncate">
                            {activePhase.step}. {activePhase.title}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedPhaseIdx((prev) =>
                                  prev > 0
                                    ? prev - 1
                                    : project.process.phases.length - 1
                                )
                              }
                              className="px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-[10px] font-bold text-white cursor-pointer"
                            >
                              ←
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedPhaseIdx((prev) =>
                                  prev < project.process.phases.length - 1
                                    ? prev + 1
                                    : 0
                                )
                              }
                              className="px-2.5 py-0.5 rounded-full bg-cyan-400/25 hover:bg-cyan-400/35 text-[10px] font-bold text-cyan-100 cursor-pointer"
                            >
                              →
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ==========================================
              CARD 5: 04 / IMPACT & TESTIMONIAL
             ========================================== */}
          <div
            ref={card5Ref}
            data-card-state={getCardState(4, activeSectionIndex)}
            className="warp-card-node flex items-center justify-center px-6 py-8 md:p-8"
          >
            <div className="pill-shell relative w-full max-w-6xl mx-auto">
              <div
                data-pill-state={impactOn ? "on" : "off"}
                onClick={() => {
                  if (!impactOn) {
                    setImpactOn(true);
                    setImpactToggledOnce(true);
                  }
                }}
                className="pill-inner pill-toggle-track relative w-full h-full select-none"
              >
                {/* RIGHT teaser when OFF */}
                <div
                  className={`hidden md:flex absolute inset-y-0 right-0 w-[52%] flex-col justify-center items-start pl-8 pr-12 z-10 transition-all duration-500 ${
                    impactOn
                      ? "opacity-0 translate-x-8 pointer-events-none"
                      : "opacity-100 translate-x-0"
                  }`}
                >
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-semibold tracking-widest uppercase text-cyan-200 mb-3">
                    04 / Quantitative &amp; Qualitative Impact
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-4 leading-tight">
                    {project.results.headline}
                  </h2>
                  <div className="grid grid-cols-3 gap-2.5 w-full max-w-md mb-5">
                    {project.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="p-3 rounded-2xl bg-white/[0.08] border border-white/20 text-center"
                      >
                        <div className="text-xl lg:text-2xl font-black text-cyan-300">
                          {m.value}
                        </div>
                        <div className="text-[9px] font-bold uppercase tracking-wider text-white/80 mt-0.5">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImpactOn(true);
                      setImpactToggledOnce(true);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-900 text-xs font-bold hover:scale-105 transition-all cursor-pointer"
                  >
                    <span>Read CEO Endorsement</span>
                    <span>→</span>
                  </button>
                </div>

                {/* LEFT metrics + highlights when ON */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className={`hidden md:flex absolute inset-y-0 left-0 w-[39%] flex-col justify-center pl-12 pr-4 z-10 transition-all duration-500 ${
                    impactOn
                      ? "opacity-100 translate-x-0 pointer-events-auto"
                      : "opacity-0 -translate-x-8 pointer-events-none"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full bg-emerald-400/20 border border-emerald-300/35 text-[10px] font-bold tracking-widest uppercase text-emerald-200">
                      04 / Verified Outcomes
                    </span>
                    <button
                      type="button"
                      onClick={() => setImpactOn(false)}
                      className="text-[11px] font-medium text-white/70 hover:text-white px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
                    >
                      ← Close
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {project.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="p-2.5 rounded-xl bg-white/10 border border-white/20 text-center"
                      >
                        <div className="text-xl font-black text-cyan-300">
                          {m.value}
                        </div>
                        <div className="text-[9px] font-bold uppercase text-white/85">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    {project.results.highlights.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-white/[0.08] border border-white/15 flex items-center gap-2.5"
                      >
                        <span className="w-5 h-5 rounded-full bg-emerald-400/25 text-emerald-200 text-[10px] font-bold flex items-center justify-center shrink-0">
                          ✓
                        </span>
                        <span className="text-xs text-white/95 font-medium">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* KNOB (Right Testimonial & Team Photo when ON) */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setImpactOn((prev) => !prev);
                    setImpactToggledOnce(true);
                  }}
                  role="button"
                  tabIndex={0}
                  aria-pressed={impactOn}
                  aria-label="Toggle Impact view"
                  className="pill-toggle-knob group"
                >
                  <div className="pill-knob-shader">
                    <VantaKnobWaves />
                  </div>
                  <div className="pill-knob-specular" />

                  {/* OFF state */}
                  <div
                    className={`relative z-20 flex flex-col items-center justify-center text-center p-6 transition-all duration-500 ${
                      impactOn
                        ? "opacity-0 scale-90 pointer-events-none"
                        : "opacity-100 scale-100"
                    }`}
                  >
                    <span className="px-4 py-1.5 rounded-full bg-white/15 border border-white/30 text-xs font-bold uppercase tracking-widest text-white mb-2">
                      04 / Impact
                    </span>
                    <span className="text-white/80 text-xs font-medium">
                      Click for KPIs &amp; Endorsement
                    </span>
                    {!impactToggledOnce && (
                      <span className="mt-3 w-2.5 h-2.5 rounded-full bg-cyan-300 animate-ping" />
                    )}
                  </div>

                  {/* ON state: Testimonial / Team Photo */}
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className={`absolute inset-0 z-20 flex flex-col items-center justify-center p-8 transition-all duration-500 ${
                      impactOn
                        ? "opacity-100 scale-100 pointer-events-auto"
                        : "opacity-0 scale-95 pointer-events-none"
                    }`}
                  >
                    {project.results.testimonial ? (
                      <div className="w-[84%] rounded-3xl bg-slate-950/75 border border-white/25 p-5 flex flex-col items-center text-center">
                        {project.results.testimonial.teamPhoto && showTeamPhoto ? (
                          <div
                            onClick={() =>
                              setLightboxImage({
                                src: project.results.testimonial!.teamPhoto!,
                                label: `${project.title} - Team`,
                              })
                            }
                            className="relative w-full h-44 rounded-2xl overflow-hidden border border-white/20 mb-3 cursor-zoom-in"
                          >
                            <Image
                              src={project.results.testimonial.teamPhoto}
                              alt="Herald and Sebastian"
                              fill
                              sizes="400px"
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <>
                            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-cyan-300 mb-3">
                              <Image
                                src={project.results.testimonial.avatar}
                                alt={project.results.testimonial.author}
                                fill
                                sizes="64px"
                                className="object-cover"
                              />
                            </div>
                            <p className="text-xs lg:text-sm italic text-white/95 leading-relaxed mb-3">
                              &ldquo;{project.results.testimonial.quote}&rdquo;
                            </p>
                          </>
                        )}
                        <div className="flex items-center justify-between w-full pt-2 border-t border-white/15">
                          <div className="text-left">
                            <div className="text-xs font-bold text-white">
                              {project.results.testimonial.author}
                            </div>
                            <div className="text-[10px] text-cyan-300 font-semibold">
                              {project.results.testimonial.role}
                            </div>
                          </div>
                          {project.results.testimonial.teamPhoto && (
                            <button
                              type="button"
                              onClick={() => setShowTeamPhoto((prev) => !prev)}
                              className="px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 text-[10px] font-bold text-white cursor-pointer"
                            >
                              {showTeamPhoto ? "Show Quote" : "Team Photo"}
                            </button>
                          )}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ==========================================
              CARD 6: 05 / RETROSPECTIVE & PIVOTS
             ========================================== */}
          <div
            ref={card6Ref}
            data-card-state={getCardState(5, activeSectionIndex)}
            className="warp-card-node flex items-center justify-center px-6 py-8 md:p-8"
          >
            <div className="pill-shell relative w-full max-w-6xl mx-auto">
              <div
                data-pill-state={learningsOn ? "on" : "off"}
                onClick={() => {
                  if (!learningsOn) {
                    setLearningsOn(true);
                    setLearningsToggledOnce(true);
                  }
                }}
                className="pill-inner pill-toggle-track relative w-full h-full select-none"
              >
                {/* RIGHT teaser when OFF */}
                <div
                  className={`hidden md:flex absolute inset-y-0 right-0 w-[52%] flex-col justify-center items-start pl-8 pr-12 z-10 transition-all duration-500 ${
                    learningsOn
                      ? "opacity-0 translate-x-8 pointer-events-none"
                      : "opacity-100 translate-x-0"
                  }`}
                >
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-semibold tracking-widest uppercase text-cyan-200 mb-3">
                    05 / Retrospective &amp; Pivots
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2 leading-tight">
                    What worked &amp; where we pivoted
                  </h2>
                  <p className="text-white/80 text-xs lg:text-sm mb-5 max-w-md">
                    Key design system wins and wireframe pivots from commuter usability testing.
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLearningsOn(true);
                      setLearningsToggledOnce(true);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-900 text-xs font-bold hover:scale-105 transition-all cursor-pointer"
                  >
                    <span>Inspect Pivots</span>
                    <span>→</span>
                  </button>
                </div>

                {/* LEFT takeaways when ON */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className={`hidden md:flex absolute inset-y-0 left-0 w-[39%] flex-col justify-center pl-12 pr-4 z-10 transition-all duration-500 ${
                    learningsOn
                      ? "opacity-100 translate-x-0 pointer-events-auto"
                      : "opacity-0 -translate-x-8 pointer-events-none"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 p-1 rounded-full bg-slate-950/45 border border-white/15">
                      <button
                        type="button"
                        onClick={() => setLearningsTab("worked")}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          learningsTab === "worked"
                            ? "bg-emerald-400 text-slate-950"
                            : "text-white/75 hover:text-white"
                        }`}
                      >
                        What Worked
                      </button>
                      <button
                        type="button"
                        onClick={() => setLearningsTab("errors")}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          learningsTab === "errors"
                            ? "bg-amber-300 text-slate-950"
                            : "text-white/75 hover:text-white"
                        }`}
                      >
                        Pivots
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => setLearningsOn(false)}
                      className="text-[11px] font-medium text-white/70 hover:text-white px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
                    >
                      ← Close
                    </button>
                  </div>

                  <div className="space-y-2">
                    {(learningsTab === "worked"
                      ? project.learnings.whatWorked
                      : project.learnings.whatCausedErrors
                    ).map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white/[0.08] border border-white/15 flex items-start gap-2.5"
                      >
                        <span
                          className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                            learningsTab === "worked"
                              ? "bg-emerald-400/25 text-emerald-200"
                              : "bg-amber-400/25 text-amber-200"
                          }`}
                        >
                          {learningsTab === "worked" ? "✓" : "↻"}
                        </span>
                        <p className="text-xs text-white/95 font-medium leading-snug">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* KNOB (Right Pivot Visual when ON) */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setLearningsOn((prev) => !prev);
                    setLearningsToggledOnce(true);
                  }}
                  role="button"
                  tabIndex={0}
                  aria-pressed={learningsOn}
                  aria-label="Toggle Retrospective view"
                  className="pill-toggle-knob group"
                >
                  <div className="pill-knob-shader">
                    <VantaKnobWaves />
                  </div>
                  <div className="pill-knob- specular" />

                  {/* OFF state */}
                  <div
                    className={`relative z-20 flex flex-col items-center justify-center text-center p-6 transition-all duration-500 ${
                      learningsOn
                        ? "opacity-0 scale-90 pointer-events-none"
                        : "opacity-100 scale-100"
                    }`}
                  >
                    <span className="px-4 py-1.5 rounded-full bg-white/15 border border-white/30 text-xs font-bold uppercase tracking-widest text-white mb-2">
                      05 / Learnings
                    </span>
                    <span className="text-white/80 text-xs font-medium">
                      Click for Wireframe Pivots
                    </span>
                    {!learningsToggledOnce && (
                      <span className="mt-3 w-2.5 h-2.5 rounded-full bg-cyan-300 animate-ping" />
                    )}
                  </div>

                  {/* ON state: Pivot Wireframe Image */}
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className={`absolute inset-0 z-20 flex flex-col items-center justify-center p-6 transition-all duration-500 ${
                      learningsOn
                        ? "opacity-100 scale-100 pointer-events-auto"
                        : "opacity-0 scale-95 pointer-events-none"
                    }`}
                  >
                    {project.learnings.pivotImage ? (
                      <div className="relative w-[84%] h-[74%] rounded-3xl overflow-hidden border border-white/25 bg-slate-950/75 flex flex-col">
                        <div
                          onClick={() =>
                            setLightboxImage({
                              src: project.learnings.pivotImage!,
                              label: project.learnings.pivotCaption || "Wireframe Pivot",
                            })
                          }
                          className="relative flex-1 w-full overflow-hidden cursor-zoom-in group/img"
                        >
                          <Image
                            src={project.learnings.pivotImage}
                            alt="Wireframe pivot"
                            fill
                            sizes="600px"
                            className="object-contain p-3 transition-transform duration-500 group-hover/img:scale-105"
                          />
                          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 border border-white/20 text-[10px] font-semibold text-cyan-200">
                            Zoom ⤢
                          </span>
                        </div>
                        <div className="px-4 py-2 bg-slate-950/90 border-t border-white/15 text-center">
                          <span className="text-[11px] font-semibold text-white/90">
                            {project.learnings.pivotCaption}
                          </span>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ==========================================
              CARD 7: NEXT PROJECT HANDOFF
             ========================================== */}
          <div
            ref={card7Ref}
            data-card-state={getCardState(6, activeSectionIndex)}
            className="warp-card-node flex items-center justify-center px-6 py-8 md:p-8"
          >
            <div className="pill-shell relative w-full max-w-6xl mx-auto">
              <div
                data-pill-state={nextOn ? "on" : "off"}
                onClick={() => {
                  if (!nextOn) {
                    setNextOn(true);
                    setNextToggledOnce(true);
                  }
                }}
                className="pill-inner pill-toggle-track relative w-full h-full select-none"
              >
                {/* RIGHT teaser when OFF */}
                <div
                  className={`hidden md:flex absolute inset-y-0 right-0 w-[52%] flex-col justify-center items-start pl-8 pr-12 z-10 transition-all duration-500 ${
                    nextOn
                      ? "opacity-0 translate-x-8 pointer-events-none"
                      : "opacity-100 translate-x-0"
                  }`}
                >
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-semibold tracking-widest uppercase text-cyan-200 mb-3">
                    Next Case Study
                  </span>
                  <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-white mb-2">
                    {project.nextProject.title}
                  </h2>
                  <p className="text-white/80 text-xs lg:text-sm mb-5 max-w-md">
                    {project.nextProject.tagline}
                  </p>
                  <div className="flex items-center gap-2.5">
                    <Link
                      href={`/work/${project.nextProject.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="px-5 py-2.5 rounded-full bg-white text-slate-900 text-xs font-bold hover:scale-105 transition-all cursor-pointer"
                    >
                      Open {project.nextProject.title} →
                    </Link>
                    <Link
                      href="/"
                      onClick={(e) => e.stopPropagation()}
                      className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white text-xs font-semibold transition-all cursor-pointer"
                    >
                      ← All Work
                    </Link>
                  </div>
                </div>

                {/* LEFT summary when ON */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className={`hidden md:flex absolute inset-y-0 left-0 w-[39%] flex-col justify-center pl-12 pr-4 z-10 transition-all duration-500 ${
                    nextOn
                      ? "opacity-100 translate-x-0 pointer-events-auto"
                      : "opacity-0 -translate-x-8 pointer-events-none"
                  }`}
                >
                  <span className="px-3 py-1 rounded-full bg-cyan-400/20 border border-cyan-300/35 text-[10px] font-bold tracking-widest uppercase text-cyan-200 w-fit mb-3">
                    {project.nextProject.badge}
                  </span>
                  <h3 className="text-3xl font-extrabold text-white mb-2">
                    {project.nextProject.title}
                  </h3>
                  <p className="text-xs text-white/80 mb-5">
                    {project.nextProject.tagline}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/work/${project.nextProject.slug}`}
                      className="px-5 py-2.5 rounded-full bg-white text-slate-900 font-bold text-xs hover:bg-cyan-50 transition-all cursor-pointer"
                    >
                      View Case Study →
                    </Link>
                    <Link
                      href="/"
                      className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-xs transition-all cursor-pointer"
                    >
                      Home
                    </Link>
                  </div>
                </div>

                {/* KNOB (Right Next Project Preview when ON) */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setNextOn((prev) => !prev);
                    setNextToggledOnce(true);
                  }}
                  role="button"
                  tabIndex={0}
                  aria-pressed={nextOn}
                  aria-label="Toggle Next Project preview"
                  className="pill-toggle-knob group"
                >
                  <div className="pill-knob-shader">
                    <VantaKnobWaves />
                  </div>
                  <div className="pill-knob- specular" />

                  <div
                    className={`relative z-20 flex flex-col items-center justify-center text-center p-6 transition-all duration-500 ${
                      nextOn
                        ? "opacity-0 scale-90 pointer-events-none"
                        : "opacity-100 scale-100"
                    }`}
                  >
                    <span className="px-4 py-1.5 rounded-full bg-white/15 border border-white/30 text-xs font-bold uppercase tracking-widest text-white mb-2">
                      Up Next
                    </span>
                    <span className="text-lg font-extrabold text-white">
                      {project.nextProject.title}
                    </span>
                    {!nextToggledOnce && (
                      <span className="mt-3 w-2.5 h-2.5 rounded-full bg-cyan-300 animate-ping" />
                    )}
                  </div>

                  <div
                    onClick={(e) => e.stopPropagation()}
                    className={`absolute inset-0 z-20 flex flex-col items-center justify-center p-8 transition-all duration-500 ${
                      nextOn
                        ? "opacity-100 scale-100 pointer-events-auto"
                        : "opacity-0 scale-95 pointer-events-none"
                    }`}
                  >
                    <Link
                      href={`/work/${project.nextProject.slug}`}
                      className="relative w-[80%] h-[70%] block group/next"
                    >
                      <Image
                        src={project.nextProject.mockup}
                        alt={project.nextProject.title}
                        fill
                        sizes="500px"
                        className="object-contain transition-transform duration-500 group-hover/next:scale-105"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          MOBILE VERTICAL STREAM (Ultra-Clean 2:1 Capsules)
         ========================================================= */}
      <div className="md:hidden relative z-10 flex flex-col items-center gap-6 px-3 pt-20 pb-16">
        {/* MOBILE 1: HERO */}
        <div id="m-proj-hero" className="w-full scroll-mt-20">
          <div className="pill-shell-mobile relative w-full">
            <div className="pill-inner relative w-full h-full px-5 py-4 flex flex-col justify-center items-center text-center">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/20 border border-cyan-300/40 text-[9px] font-bold uppercase text-cyan-200 mb-1">
                {project.badge}
              </span>
              <h1 className="text-2xl font-extrabold tracking-tight text-white">
                {project.title}
              </h1>
              <p className="text-[11px] text-white/80 line-clamp-1 mt-0.5 mb-2">
                {project.summary}
              </p>
              <div className="grid grid-cols-3 gap-1.5 w-full max-w-xs">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="py-1.5 px-2 rounded-xl bg-white/10 border border-white/20 text-center"
                  >
                    <div className="text-sm font-black text-cyan-300">{m.value}</div>
                    <div className="text-[8px] font-bold uppercase text-white/80 truncate">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE 2: PROBLEM */}
        <div id="m-proj-problem" className="w-full scroll-mt-20">
          <div className="pill-shell-mobile relative w-full">
            <div
              data-pill-state={mProblemOn ? "on" : "off"}
              onClick={() => {
                setMProblemOn((p) => !p);
                setMProblemOnce(true);
              }}
              className="pill-inner pill-toggle-track relative w-full h-full select-none"
            >
              <div
                className={`absolute inset-y-0 right-0 w-[54%] flex flex-col justify-center pr-4 pl-2 z-10 transition-all duration-500 ${
                  mProblemOn ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                <span className="text-[9px] font-bold uppercase tracking-widest text-cyan-300">
                  01 / Problem
                </span>
                <h2 className="text-sm font-extrabold text-white leading-snug mt-0.5 line-clamp-2">
                  {project.problem.headline}
                </h2>
                <span className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-slate-900 text-[10px] font-bold w-fit">
                  Before / After →
                </span>
              </div>

              <div
                onClick={(e) => e.stopPropagation()}
                className={`absolute inset-y-0 left-0 w-[46%] flex flex-col justify-center pl-4 pr-1 z-10 transition-all duration-500 ${
                  mProblemOn ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
              >
                <span className="text-[9px] font-bold uppercase text-rose-300 mb-1">
                  01 / Audit
                </span>
                <div className="space-y-1 mb-2">
                  {project.problem.keyIssues.slice(0, 2).map((iss, i) => (
                    <p key={i} className="text-[9px] text-white/90 leading-tight line-clamp-2">
                      - {iss}
                    </p>
                  ))}
                </div>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setProblemCompareMode("before")}
                    className={`px-2 py-0.5 rounded-full text-[8px] font-bold ${
                      problemCompareMode === "before"
                        ? "bg-rose-500 text-white"
                        : "bg-white/10 text-white/70"
                    }`}
                  >
                    Before
                  </button>
                  <button
                    type="button"
                    onClick={() => setProblemCompareMode("after")}
                    className={`px-2 py-0.5 rounded-full text-[8px] font-bold ${
                      problemCompareMode === "after"
                        ? "bg-emerald-400 text-slate-950"
                        : "bg-white/10 text-white/70"
                    }`}
                  >
                    After
                  </button>
                </div>
              </div>

              <div className="pill-toggle-knob">
                <div className="pill-knob-shader">
                  <VantaKnobWaves />
                </div>
                <div className="pill-knob- specular" />
                {!mProblemOn ? (
                  <div className="relative z-20 flex flex-col items-center justify-center p-3 text-center">
                    <span className="text-xs font-extrabold uppercase text-white">
                      01 / Problem
                    </span>
                    {!mProblemOnce && (
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
                    )}
                  </div>
                ) : (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      const img =
                        problemCompareMode === "before"
                          ? project.problem.beforeImage
                          : project.problem.afterImage;
                      if (img) setLightboxImage({ src: img, label: "Before vs After" });
                    }}
                    className="absolute inset-0 z-20 flex items-center justify-center p-3"
                  >
                    <div className="relative w-[82%] h-[72%] rounded-2xl overflow-hidden bg-slate-950/80 border border-white/20">
                      <Image
                        src={
                          (problemCompareMode === "before"
                            ? project.problem.beforeImage
                            : project.problem.afterImage) || project.heroMockup
                        }
                        alt="Problem comparison"
                        fill
                        sizes="240px"
                        className="object-contain p-1.5"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE 3: DECISIONS & SCREENS */}
        <div id="m-proj-decisions" className="w-full scroll-mt-20">
          <div className="pill-shell-mobile relative w-full">
            <div
              data-pill-state={mDecisionsOn ? "on" : "off"}
              onClick={() => {
                setMDecisionsOn((p) => !p);
                setMDecisionsOnce(true);
              }}
              className="pill-inner pill-toggle-track relative w-full h-full select-none"
            >
              <div
                className={`absolute inset-y-0 right-0 w-[54%] flex flex-col justify-center pr-4 pl-2 z-10 transition-all duration-500 ${
                  mDecisionsOn ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                <span className="text-[9px] font-bold uppercase tracking-widest text-cyan-300">
                  02 / Decisions
                </span>
                <h2 className="text-sm font-extrabold text-white leading-snug mt-0.5 line-clamp-2">
                  {project.decisions.headline}
                </h2>
                <span className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-slate-900 text-[10px] font-bold w-fit">
                  View Screens →
                </span>
              </div>

              <div
                onClick={(e) => e.stopPropagation()}
                className={`absolute inset-y-0 left-0 w-[46%] flex flex-col justify-center pl-4 pr-1 z-10 transition-all duration-500 ${
                  mDecisionsOn ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
              >
                <span className="text-[9px] font-bold uppercase text-cyan-300 mb-1">
                  Screen {selectedProtoIdx + 1}/{project.prototypeSteps?.length || 1}
                </span>
                <p className="text-[11px] font-bold text-white truncate">
                  {activeProtoStep?.title || activeDecision.title}
                </p>
                <p className="text-[9px] text-white/80 line-clamp-2 mt-0.5 mb-2">
                  {activeProtoStep?.description || activeDecision.outcome}
                </p>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedProtoIdx((p) =>
                        p > 0 ? p - 1 : (project.prototypeSteps?.length ?? 1) - 1
                      )
                    }
                    className="px-2 py-0.5 rounded-full bg-white/15 text-[9px] font-bold text-white"
                  >
                    ← Prev
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedProtoIdx((p) =>
                        p < (project.prototypeSteps?.length ?? 1) - 1 ? p + 1 : 0
                      )
                    }
                    className="px-2 py-0.5 rounded-full bg-cyan-400 text-slate-950 text-[9px] font-bold"
                  >
                    Next →
                  </button>
                </div>
              </div>

              <div className="pill-toggle-knob">
                <div className="pill-knob-shader">
                  <VantaKnobWaves />
                </div>
                <div className="pill-knob- specular" />
                {!mDecisionsOn ? (
                  <div className="relative z-20 flex flex-col items-center justify-center p-3 text-center">
                    <span className="text-xs font-extrabold uppercase text-white">
                      02 / Screens
                    </span>
                    {!mDecisionsOnce && (
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
                    )}
                  </div>
                ) : (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      const img = activeProtoStep?.image || activeDecision.image;
                      if (img)
                        setLightboxImage({
                          src: img,
                          label: activeProtoStep?.title || activeDecision.title,
                        });
                    }}
                    className="absolute inset-0 z-20 flex items-center justify-center p-3"
                  >
                    <div className="relative w-[82%] h-[72%] rounded-2xl overflow-hidden bg-slate-950/80 border border-white/20">
                      <Image
                        src={
                          activeProtoStep?.image ||
                          activeDecision.image ||
                          project.heroMockup
                        }
                        alt="Screen preview"
                        fill
                        sizes="240px"
                        className="object-contain p-1.5"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE 4: SYSTEM & CRAFT */}
        <div id="m-proj-process" className="w-full scroll-mt-20">
          <div className="pill-shell-mobile relative w-full">
            <div
              data-pill-state={mProcessOn ? "on" : "off"}
              onClick={() => {
                setMProcessOn((p) => !p);
                setMProcessOnce(true);
              }}
              className="pill-inner pill-toggle-track relative w-full h-full select-none"
            >
              <div
                className={`absolute inset-y-0 right-0 w-[54%] flex flex-col justify-center pr-4 pl-2 z-10 transition-all duration-500 ${
                  mProcessOn ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                <span className="text-[9px] font-bold uppercase tracking-widest text-cyan-300">
                  03 / System &amp; Craft
                </span>
                <h2 className="text-sm font-extrabold text-white leading-snug mt-0.5 line-clamp-2">
                  {project.process.headline}
                </h2>
                <span className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-slate-900 text-[10px] font-bold w-fit">
                  Inspect Craft →
                </span>
              </div>

              <div
                onClick={(e) => e.stopPropagation()}
                className={`absolute inset-y-0 left-0 w-[46%] flex flex-col justify-center pl-4 pr-1 z-10 transition-all duration-500 ${
                  mProcessOn ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
              >
                <span className="text-[9px] font-bold uppercase text-cyan-300 mb-0.5">
                  Artifact {selectedPhaseIdx + 1}/{project.process.phases.length}
                </span>
                <p className="text-[11px] font-bold text-white truncate">
                  {activePhase?.title}
                </p>
                <p className="text-[9px] text-white/80 line-clamp-2 mt-0.5 mb-2">
                  {activePhase?.description}
                </p>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedPhaseIdx((p) =>
                        p > 0 ? p - 1 : project.process.phases.length - 1
                      )
                    }
                    className="px-2 py-0.5 rounded-full bg-white/15 text-[9px] font-bold text-white"
                  >
                    ← Prev
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedPhaseIdx((p) =>
                        p < project.process.phases.length - 1 ? p + 1 : 0
                      )
                    }
                    className="px-2 py-0.5 rounded-full bg-cyan-400 text-slate-950 text-[9px] font-bold"
                  >
                    Next →
                  </button>
                </div>
              </div>

              <div className="pill-toggle-knob">
                <div className="pill-knob-shader">
                  <VantaKnobWaves />
                </div>
                <div className="pill-knob- specular" />
                {!mProcessOn ? (
                  <div className="relative z-20 flex flex-col items-center justify-center p-3 text-center">
                    <span className="text-xs font-extrabold uppercase text-white">
                      03 / Craft
                    </span>
                    {!mProcessOnce && (
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
                    )}
                  </div>
                ) : (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      if (activePhase?.image)
                        setLightboxImage({
                          src: activePhase.image,
                          label: activePhase.title,
                        });
                    }}
                    className="absolute inset-0 z-20 flex items-center justify-center p-3"
                  >
                    <div className="relative w-[82%] h-[72%] rounded-2xl overflow-hidden bg-slate-950/80 border border-white/20">
                      <Image
                        src={activePhase?.image || project.heroMockup}
                        alt={activePhase?.title || "Artifact"}
                        fill
                        sizes="240px"
                        className="object-contain p-1.5"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE 5: IMPACT */}
        <div id="m-proj-impact" className="w-full scroll-mt-20">
          <div className="pill-shell-mobile relative w-full">
            <div
              data-pill-state={mImpactOn ? "on" : "off"}
              onClick={() => {
                setMImpactOn((p) => !p);
                setMImpactOnce(true);
              }}
              className="pill-inner pill-toggle-track relative w-full h-full select-none"
            >
              <div
                className={`absolute inset-y-0 right-0 w-[54%] flex flex-col justify-center pr-4 pl-2 z-10 transition-all duration-500 ${
                  mImpactOn ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                <span className="text-[9px] font-bold uppercase tracking-widest text-cyan-300">
                  04 / Impact
                </span>
                <h2 className="text-sm font-extrabold text-white leading-snug mt-0.5 line-clamp-2">
                  {project.results.headline}
                </h2>
                <span className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-slate-900 text-[10px] font-bold w-fit">
                  KPIs &amp; Quote →
                </span>
              </div>

              <div
                onClick={(e) => e.stopPropagation()}
                className={`absolute inset-y-0 left-0 w-[46%] flex flex-col justify-center pl-4 pr-1 z-10 transition-all duration-500 ${
                  mImpactOn ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="space-y-1">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="flex items-baseline gap-1.5">
                      <span className="text-xs font-black text-cyan-300">{m.value}</span>
                      <span className="text-[9px] text-white/85 font-semibold truncate">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pill-toggle-knob">
                <div className="pill-knob-shader">
                  <VantaKnobWaves />
                </div>
                <div className="pill-knob- specular" />
                {!mImpactOn ? (
                  <div className="relative z-20 flex flex-col items-center justify-center p-3 text-center">
                    <span className="text-xs font-extrabold uppercase text-white">
                      04 / Impact
                    </span>
                    {!mImpactOnce && (
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
                    )}
                  </div>
                ) : (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-3 text-center">
                    {project.results.testimonial && (
                      <div className="px-2">
                        <p className="text-[9px] italic text-white/95 line-clamp-3">
                          &ldquo;{project.results.testimonial.quote}&rdquo;
                        </p>
                        <span className="text-[8px] font-bold text-cyan-300 block mt-1">
                          {project.results.testimonial.author} - {project.results.testimonial.role}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE 6: RETROSPECTIVE */}
        <div id="m-proj-learnings" className="w-full scroll-mt-20">
          <div className="pill-shell-mobile relative w-full">
            <div
              data-pill-state={mLearningsOn ? "on" : "off"}
              onClick={() => {
                setMLearningsOn((p) => !p);
                setMLearningsOnce(true);
              }}
              className="pill-inner pill-toggle-track relative w-full h-full select-none"
            >
              <div
                className={`absolute inset-y-0 right-0 w-[54%] flex flex-col justify-center pr-4 pl-2 z-10 transition-all duration-500 ${
                  mLearningsOn ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                <span className="text-[9px] font-bold uppercase tracking-widest text-cyan-300">
                  05 / Retrospective
                </span>
                <h2 className="text-sm font-extrabold text-white leading-snug mt-0.5">
                  Wins &amp; Wireframe Pivots
                </h2>
                <span className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-slate-900 text-[10px] font-bold w-fit">
                  Inspect →
                </span>
              </div>

              <div
                onClick={(e) => e.stopPropagation()}
                className={`absolute inset-y-0 left-0 w-[46%] flex flex-col justify-center pl-4 pr-1 z-10 transition-all duration-500 ${
                  mLearningsOn ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
              >
                <span className="text-[9px] font-bold uppercase text-emerald-300 mb-1">
                  Key Takeaways
                </span>
                {project.learnings.whatWorked.slice(0, 2).map((w, i) => (
                  <p key={i} className="text-[9px] text-white/90 leading-tight line-clamp-2 mb-1">
                    ✓ {w}
                  </p>
                ))}
              </div>

              <div className="pill-toggle-knob">
                <div className="pill-knob-shader">
                  <VantaKnobWaves />
                </div>
                <div className="pill-knob- specular" />
                {!mLearningsOn ? (
                  <div className="relative z-20 flex flex-col items-center justify-center p-3 text-center">
                    <span className="text-xs font-extrabold uppercase text-white">
                      05 / Pivots
                    </span>
                    {!mLearningsOnce && (
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
                    )}
                  </div>
                ) : (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      if (project.learnings.pivotImage)
                        setLightboxImage({
                          src: project.learnings.pivotImage,
                          label: "Wireframe Pivot",
                        });
                    }}
                    className="absolute inset-0 z-20 flex items-center justify-center p-3"
                  >
                    <div className="relative w-[82%] h-[72%] rounded-2xl overflow-hidden bg-slate-950/80 border border-white/20">
                      <Image
                        src={project.learnings.pivotImage || project.heroMockup}
                        alt="Wireframe pivot"
                        fill
                        sizes="240px"
                        className="object-contain p-1.5"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE 7: NEXT PROJECT */}
        <div id="m-proj-next" className="w-full scroll-mt-20">
          <div className="pill-shell-mobile relative w-full">
            <div
              data-pill-state={mNextOn ? "on" : "off"}
              onClick={() => {
                setMNextOn((p) => !p);
                setMNextOnce(true);
              }}
              className="pill-inner pill-toggle-track relative w-full h-full select-none"
            >
              <div
                className={`absolute inset-y-0 right-0 w-[54%] flex flex-col justify-center pr-4 pl-2 z-10 transition-all duration-500 ${
                  mNextOn ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                <span className="text-[9px] font-bold uppercase tracking-widest text-cyan-300">
                  Next Project
                </span>
                <h2 className="text-base font-extrabold text-white mt-0.5">
                  {project.nextProject.title}
                </h2>
                <Link
                  href={`/work/${project.nextProject.slug}`}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-slate-900 text-[10px] font-bold w-fit"
                >
                  Open →
                </Link>
              </div>

              <div
                onClick={(e) => e.stopPropagation()}
                className={`absolute inset-y-0 left-0 w-[46%] flex flex-col justify-center pl-4 pr-1 z-10 transition-all duration-500 ${
                  mNextOn ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
              >
                <h3 className="text-sm font-extrabold text-white mb-1">
                  {project.nextProject.title}
                </h3>
                <Link
                  href={`/work/${project.nextProject.slug}`}
                  className="px-3 py-1 rounded-full bg-white text-slate-900 text-[10px] font-bold w-fit"
                >
                  View Study →
                </Link>
              </div>

              <div className="pill-toggle-knob">
                <div className="pill-knob-shader">
                  <VantaKnobWaves />
                </div>
                <div className="pill-knob- specular" />
                <div className="relative z-20 flex flex-col items-center justify-center p-3 text-center">
                  <span className="text-xs font-extrabold uppercase text-white">
                    {project.nextProject.title}
                  </span>
                  {!mNextOnce && (
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
