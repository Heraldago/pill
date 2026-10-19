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
  { id: "problem", label: "The Problem" },
  { id: "decisions", label: "Decisions & Flow" },
  { id: "process", label: "Process & Craft" },
  { id: "impact", label: "Impact & KPIs" },
  { id: "learnings", label: "Retrospective" },
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

  // Desktop pill toggle states ("off" | "on") + hasToggledOnce
  const [problemOn, setProblemOn] = useState(false);
  const [problemToggledOnce, setProblemToggledOnce] = useState(false);
  const [problemCompareMode, setProblemCompareMode] = useState<"before" | "after">("before");

  const [decisionsOn, setDecisionsOn] = useState(false);
  const [decisionsToggledOnce, setDecisionsToggledOnce] = useState(false);
  const [selectedDecisionIdx, setSelectedDecisionIdx] = useState(2); // default to chosen option C
  const [decisionsViewMode, setDecisionsViewMode] = useState<"tradeoffs" | "prototype">("tradeoffs");
  const [selectedProtoIdx, setSelectedProtoIdx] = useState(0);

  const [processOn, setProcessOn] = useState(false);
  const [processToggledOnce, setProcessToggledOnce] = useState(false);
  const [selectedPhaseIdx, setSelectedPhaseIdx] = useState(0);
  const [processKnobView, setProcessKnobView] = useState<"artifact" | "deliverables">("artifact");

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
      {/* Fixed 3D background identical to Home Page */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <VantaWaves
          color={0x0b2847}
          shininess={30.0}
          waveHeight={20.0}
          waveSpeed={0.75}
          zoom={0.65}
        />
      </div>

      {/* Top Navigation identical to Home Page */}
      {/* 1. Fixed Top-Left Logo (Back to Home) */}
      <div className="fixed top-4 sm:top-5 md:top-6 left-4 sm:left-6 md:left-8 z-50 pointer-events-auto flex items-center gap-2.5">
        <Link
          href="/"
          aria-label="Back to Home"
          className="group relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/25 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,10,30,0.4),_inset_0_1px_1px_rgba(255,255,255,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
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
          className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.16] border border-white/20 backdrop-blur-xl text-xs font-semibold text-white/90 hover:text-white transition-all cursor-pointer shadow-sm"
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
          className="relative flex flex-col items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/25 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,10,30,0.4),_inset_0_1px_1px_rgba(255,255,255,0.35)] transition-all duration-300 active:scale-95 cursor-pointer"
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
          className={`absolute top-16 sm:top-20 right-4 sm:right-6 w-60 rounded-3xl bg-slate-900/90 backdrop-blur-2xl border border-white/25 shadow-[0_20px_50px_rgba(0,10,30,0.6),_inset_0_1px_1px_rgba(255,255,255,0.3)] p-3 flex flex-col gap-1 transition-all duration-300 origin-top-right ${
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
            Intro &amp; Role
          </button>
          <button
            type="button"
            onClick={() => scrollToMobileElement("m-proj-problem")}
            className="w-full text-left px-4 py-2.5 rounded-2xl text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            01 / The Problem
          </button>
          <button
            type="button"
            onClick={() => scrollToMobileElement("m-proj-decisions")}
            className="w-full text-left px-4 py-2.5 rounded-2xl text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            02 / Decisions &amp; Flow
          </button>
          <button
            type="button"
            onClick={() => scrollToMobileElement("m-proj-process")}
            className="w-full text-left px-4 py-2.5 rounded-2xl text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            03 / Process &amp; Craft
          </button>
          <button
            type="button"
            onClick={() => scrollToMobileElement("m-proj-impact")}
            className="w-full text-left px-4 py-2.5 rounded-2xl text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            04 / Impact &amp; KPIs
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

      {/* 4. Desktop Center Pill Nav inside Card 1 */}
      <div
        className={`fixed top-5 md:top-7 left-1/2 -translate-x-1/2 z-50 hidden md:block transition-all duration-500 ${
          activeSectionIndex === 0
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-6 pointer-events-none"
        }`}
      >
        <nav
          aria-label="Case Study Navigation"
          className="flex items-center gap-1 p-1.5 rounded-full bg-white/[0.08] backdrop-blur-2xl border border-white/25 shadow-[0_12px_32px_rgba(0,10,30,0.35),_inset_0_1px_1px_rgba(255,255,255,0.35)]"
        >
          <button
            type="button"
            onClick={() => navigateToSection(0)}
            className="px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold bg-white text-slate-900 shadow-xs transition-all cursor-pointer"
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
            Process
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
          <Link
            href={`/work/${project.nextProject.slug}`}
            className="px-3.5 py-1.5 rounded-full text-xs md:text-sm font-semibold text-cyan-200 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            Next ↗
          </Link>
        </nav>
      </div>

      {/* Bottom-right ScrollSpyNav with 7 project capsules */}
      <ScrollSpyNav
        activeIndex={activeSectionIndex}
        onNavigate={navigateToSection}
        sections={PROJECT_SECTIONS}
      />

      {/* ================================================================= */}
      {/* DESKTOP VIEW (>= 768px): 7 STACKED 3D CAPSULES                    */}
      {/* ================================================================= */}
      <main className="warp-stage-3d relative z-10 hidden md:block">
        {/* --- PILL 1 (TRANSLUCENT HERO CAPSULE) --- */}
        <div
          ref={card1Ref}
          className="warp-card-node capsule-card-wrapper relative w-full h-[100dvh] shrink-0 flex items-center justify-center p-2.5 sm:p-4 md:p-0 z-10"
        >
          <section className="capsule-card-section relative w-full h-full rounded-[32px] sm:rounded-[48px] md:rounded-[1000px] border-[2px] sm:border-[3px] border-white/25 bg-white/[0.12] overflow-hidden flex flex-col justify-between items-center shadow-[0_25px_65px_rgba(0,10,30,0.45),_inset_0_1.5px_2px_rgba(255,255,255,0.45)]">
            <header className="w-full shrink-0 pt-4 sm:pt-6 md:pt-7 pb-1 sm:pb-2 flex justify-center items-center z-10 h-14 md:h-16" />

            <div className="w-full flex-1 min-h-0 flex flex-col justify-center items-center px-10 sm:px-14 md:px-20 lg:px-28 xl:px-36 max-w-5xl my-auto">
              <div className="w-full text-left space-y-3 md:space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-cyan-200/95 font-medium">
                  <span className="px-3 py-1 rounded-full bg-cyan-400/20 border border-cyan-300/35 text-cyan-200 font-semibold">
                    {project.badge}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/90">
                    {project.year}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/90">
                    {project.role}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/15 text-white/75">
                    {project.timeline}
                  </span>
                  {project.tools?.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/15 text-[11px] text-cyan-100/80"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-[clamp(2rem,3.6vw,4.2rem)] font-semibold tracking-[-0.025em] text-white leading-[1.1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
                  {project.title}:{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-sky-300 to-cyan-400">
                    {project.tagline}
                  </span>
                </h1>

                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/85 font-normal max-w-3xl leading-relaxed">
                  {project.summary}
                </p>

                {/* Quick KPI + Action Pills */}
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  {project.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="px-4 py-2 rounded-full bg-white/[0.1] border border-white/25 backdrop-blur-md flex items-center gap-2"
                    >
                      <span className="text-sm md:text-base font-extrabold text-cyan-300">
                        {m.value}
                      </span>
                      <span className="text-[11px] md:text-xs text-white/85 font-medium">
                        {m.label}
                      </span>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => navigateToSection(1)}
                    className="px-4 py-2 rounded-full bg-white text-slate-950 hover:bg-cyan-50 text-xs font-bold shadow-md transition-all cursor-pointer"
                  >
                    Explore Case Study ↓
                  </button>
                </div>
              </div>
            </div>

            <footer className="w-full shrink-0 pb-3 sm:pb-5 md:pb-6 px-8 flex justify-center items-center z-10">
              <span className="text-[11px] text-white/50 tracking-wider uppercase font-medium">
                Scroll to navigate across the 7 case study capsules
              </span>
            </footer>
          </section>
        </div>

        {/* --- PILL 2 (01 / THE PROBLEM & BEFORE/AFTER) --- */}
        <div
          ref={card2Ref}
          className="warp-card-node capsule-card-wrapper relative w-full h-[100dvh] shrink-0 flex items-center justify-center p-2.5 sm:p-4 md:p-0 z-20"
        >
          <section
            className={`capsule-card-section relative w-full h-full rounded-[32px] sm:rounded-[48px] md:rounded-[1000px] border-[2px] sm:border-[3px] transition-all duration-500 overflow-hidden flex items-center justify-center p-0 ${
              !problemOn
                ? "border-white/25 bg-transparent shadow-[0_25px_65px_rgba(0,10,30,0.45),_inset_0_1.5px_2px_rgba(255,255,255,0.45)]"
                : "border-white bg-white shadow-[0_25px_65px_rgba(0,10,30,0.35)]"
            }`}
          >
            <div
              role="switch"
              aria-checked={problemOn}
              tabIndex={0}
              aria-label="Toggle details for The Problem"
              onClick={() => {
                setProblemToggledOnce(true);
                setProblemOn((prev) => !prev);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setProblemToggledOnce(true);
                  setProblemOn((prev) => !prev);
                }
              }}
              style={
                {
                  "--knob-pad": "clamp(8px, 1.6cqw, 18px)",
                  "--travel-dist": "calc(100cqw - 100% - 2 * var(--knob-pad))",
                } as React.CSSProperties
              }
              className={`group relative w-full h-full rounded-[26px] sm:rounded-[40px] md:rounded-[1000px] [container-type:inline-size] cursor-pointer select-none overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.988] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 ${
                !problemOn
                  ? "bg-black/20 backdrop-blur-md shadow-[inset_0_4px_24px_rgba(0,10,30,0.5),_inset_0_1px_2px_rgba(255,255,255,0.2)]"
                  : "bg-white shadow-none"
              }`}
            >
              {/* ON STATE: Problem Details on the Left */}
              <div
                className={`absolute top-0 bottom-0 left-[5%] sm:left-[6%] md:left-[7%] w-[38%] max-w-[38%] my-auto h-fit max-h-[90%] flex flex-col justify-center px-1 sm:px-3 py-1 gap-2 sm:gap-2.5 card-on-container overflow-y-auto [scrollbar-width:none] transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  problemOn
                    ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-x-12 pointer-events-none"
                }`}
              >
                <div>
                  <span className="text-[10px] sm:text-xs font-bold text-rose-600 tracking-wider uppercase mb-0.5 block">
                    01 / The Initial Challenge
                  </span>
                  <h2 className="text-lg sm:text-xl md:text-[clamp(1.15rem,2cqw,2.1rem)] card-title-lg font-bold text-slate-900 tracking-tight leading-tight">
                    {project.problem.headline}
                  </h2>
                  <p className="text-[11px] sm:text-xs md:text-sm card-bio-text text-slate-600 font-normal leading-relaxed mt-1">
                    {project.problem.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-1">
                  {project.problem.keyIssues.map((issue, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 p-2 sm:p-2.5 rounded-2xl bg-rose-50 border border-rose-200/80 text-slate-800 text-[11px] sm:text-xs leading-snug"
                    >
                      <span className="w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        !
                      </span>
                      <span>{issue}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* OFF STATE: Title on the Right */}
              <div
                className={`absolute top-0 bottom-0 right-[3%] sm:right-[4%] w-[42%] max-w-[42%] h-full flex flex-col items-center justify-center text-center px-2 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  !problemOn
                    ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-75 translate-x-12 pointer-events-none"
                }`}
              >
                <div className="flex flex-col items-center justify-center text-center max-w-full select-none pointer-events-none space-y-1.5">
                  <span className="px-3 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-rose-500/20 border border-rose-300/30 text-rose-200">
                    Chapter 01
                  </span>
                  <h3 className="text-center text-[clamp(1.15rem,2.3cqw,2.6rem)] font-bold tracking-tight text-white/95 group-hover:text-white transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                    The Problem
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 max-w-xs">
                    Click the capsule to inspect usability blockers &amp; legacy vs redesigned UI
                  </p>
                </div>
              </div>

              {/* CIRCULAR KNOB (Hero Mockup when OFF, Interactive Before/After Screen when ON) */}
              <div
                className={`absolute top-[var(--knob-pad)] bottom-[var(--knob-pad)] left-[var(--knob-pad)] h-[calc(100%-2*var(--knob-pad))] aspect-square w-auto rounded-full overflow-visible ${
                  !problemToggledOnce
                    ? "translate-x-0"
                    : problemOn
                    ? "bubble-knob-in"
                    : "bubble-knob-out"
                } flex items-center justify-center select-none`}
              >
                <div
                  className={`relative w-full h-full rounded-full overflow-hidden flex items-center justify-center p-3 sm:p-5 md:p-7 transition-all duration-300 ease-out cursor-pointer ${
                    !problemOn
                      ? "bg-white shadow-[0_16px_40px_rgba(0,0,0,0.35),_0_2px_6px_rgba(0,0,0,0.12),_inset_0_1px_2px_rgba(255,255,255,0.95)] hover:scale-[1.025]"
                      : "bg-[#0b2847] border border-white/30 shadow-[0_20px_50px_rgba(0,18,36,0.45)] hover:scale-[1.015]"
                  }`}
                >
                  {problemOn && (
                    <VantaKnobWaves
                      color={0x0b2847}
                      shininess={30.0}
                      waveHeight={20.0}
                      waveSpeed={0.75}
                      zoom={0.65}
                    />
                  )}
                  {!problemOn || !project.problem.beforeImage ? (
                    <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
                      <Image
                        src={project.heroMockup}
                        alt={project.title}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 85vw, 45vw"
                        className={`object-contain ${project.mockupPadding ?? "p-4 sm:p-6"}`}
                      />
                    </div>
                  ) : (
                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-3 px-4">
                      {/* Before / After Switcher inside Knob */}
                      <div
                        className="flex items-center gap-1 p-1 rounded-full bg-slate-950/80 border border-white/25 backdrop-blur-md shadow-lg z-20"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => setProblemCompareMode("before")}
                          className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
                            problemCompareMode === "before"
                              ? "bg-rose-500 text-white shadow-xs"
                              : "text-white/75 hover:text-white"
                          }`}
                        >
                          Legacy (Before)
                        </button>
                        <button
                          type="button"
                          onClick={() => setProblemCompareMode("after")}
                          className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
                            problemCompareMode === "after"
                              ? "bg-emerald-500 text-slate-950 shadow-xs"
                              : "text-white/75 hover:text-white"
                          }`}
                        >
                          Redesign (After)
                        </button>
                      </div>

                      {/* Image Container */}
                      <div className="relative w-[84%] h-[68%] rounded-2xl overflow-hidden border border-white/25 bg-slate-950/60 shadow-2xl">
                        <Image
                          src={
                            problemCompareMode === "before"
                              ? project.problem.beforeImage
                              : project.problem.afterImage ?? project.heroMockup
                          }
                          alt={
                            problemCompareMode === "before"
                              ? project.problem.beforeLabel ?? "Legacy UI"
                              : project.problem.afterLabel ?? "Redesigned UI"
                          }
                          fill
                          unoptimized
                          sizes="40vw"
                          className="object-contain p-1.5"
                        />
                      </div>

                      {/* Caption Pill */}
                      <span className="px-3 py-1 rounded-full bg-slate-950/80 border border-white/20 text-[10px] font-medium text-white/90 text-center max-w-[82%] truncate">
                        {problemCompareMode === "before"
                          ? project.problem.beforeLabel
                          : project.problem.afterLabel}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* --- PILL 3 (02 / DECISIONS, TRADE-OFFS & INTERACTIVE FLOW) --- */}
        <div
          ref={card3Ref}
          className="warp-card-node capsule-card-wrapper relative w-full h-[100dvh] shrink-0 flex items-center justify-center p-2.5 sm:p-4 md:p-0 z-30"
        >
          <section
            className={`capsule-card-section relative w-full h-full rounded-[32px] sm:rounded-[48px] md:rounded-[1000px] border-[2px] sm:border-[3px] transition-all duration-500 overflow-hidden flex items-center justify-center p-0 ${
              !decisionsOn
                ? "border-white/25 bg-transparent shadow-[0_25px_65px_rgba(0,10,30,0.45),_inset_0_1.5px_2px_rgba(255,255,255,0.45)]"
                : "border-white bg-white shadow-[0_25px_65px_rgba(0,10,30,0.35)]"
            }`}
          >
            <div
              role="switch"
              aria-checked={decisionsOn}
              tabIndex={0}
              aria-label="Toggle details for Decisions and Flow"
              onClick={() => {
                setDecisionsToggledOnce(true);
                setDecisionsOn((prev) => !prev);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setDecisionsToggledOnce(true);
                  setDecisionsOn((prev) => !prev);
                }
              }}
              style={
                {
                  "--knob-pad": "clamp(8px, 1.6cqw, 18px)",
                  "--travel-dist": "calc(100cqw - 100% - 2 * var(--knob-pad))",
                } as React.CSSProperties
              }
              className={`group relative w-full h-full rounded-[26px] sm:rounded-[40px] md:rounded-[1000px] [container-type:inline-size] cursor-pointer select-none overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.988] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 ${
                !decisionsOn
                  ? "bg-black/20 backdrop-blur-md shadow-[inset_0_4px_24px_rgba(0,10,30,0.5),_inset_0_1px_2px_rgba(255,255,255,0.2)]"
                  : "bg-white shadow-none"
              }`}
            >
              {/* ON STATE: Trade-off & Interactive Prototype Selector on the Left */}
              <div
                className={`absolute top-0 bottom-0 left-[5%] sm:left-[6%] md:left-[7%] w-[38%] max-w-[38%] my-auto h-fit max-h-[90%] flex flex-col justify-center px-1 sm:px-3 py-1 gap-2 card-on-container overflow-y-auto [scrollbar-width:none] transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  decisionsOn
                    ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-x-12 pointer-events-none"
                }`}
              >
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-[10px] sm:text-xs font-bold text-blue-600 tracking-wider uppercase block">
                    02 / Architecture &amp; Flow
                  </span>
                  {project.prototypeSteps && project.prototypeSteps.length > 0 && (
                    <div
                      className="flex items-center gap-1 p-0.5 rounded-full bg-slate-100 border border-slate-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => setDecisionsViewMode("tradeoffs")}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                          decisionsViewMode === "tradeoffs"
                            ? "bg-slate-900 text-white shadow-xs"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        Iterations (V1-V3)
                      </button>
                      <button
                        type="button"
                        onClick={() => setDecisionsViewMode("prototype")}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                          decisionsViewMode === "prototype"
                            ? "bg-blue-600 text-white shadow-xs"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        5-Step Prototype
                      </button>
                    </div>
                  )}
                </div>

                {decisionsViewMode === "tradeoffs" || !project.prototypeSteps ? (
                  <>
                    <div>
                      <h2 className="text-lg sm:text-xl md:text-[clamp(1.05rem,1.8cqw,1.85rem)] card-title-lg font-bold text-slate-900 tracking-tight leading-tight">
                        {project.decisions.headline}
                      </h2>
                      <p className="text-[11px] sm:text-xs text-slate-600 font-normal leading-relaxed mt-1">
                        {project.decisions.description}
                      </p>
                    </div>

                    {/* Interactive Option Buttons */}
                    <div className="flex flex-col gap-1.5 pt-0.5">
                      {project.decisions.options.map((opt, idx) => {
                        const isSelected = selectedDecisionIdx === idx;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDecisionIdx(idx);
                            }}
                            className={`w-full text-left p-2 sm:p-2.5 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1 ${
                              isSelected
                                ? "bg-slate-900 text-white border-slate-900 shadow-md"
                                : "bg-slate-100 hover:bg-slate-200/80 text-slate-800 border-slate-200"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 w-full">
                              <span className="text-xs font-bold truncate">{opt.title}</span>
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                                  opt.chosen
                                    ? "bg-emerald-400/25 text-emerald-300 border border-emerald-400/40"
                                    : isSelected
                                    ? "bg-white/20 text-white"
                                    : "bg-slate-200 text-slate-600"
                                }`}
                              >
                                {opt.tag}
                              </span>
                            </div>
                            {isSelected && (
                              <p className="text-[11px] text-white/85 leading-snug">
                                {opt.outcome}
                              </p>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h2 className="text-lg sm:text-xl md:text-[clamp(1.05rem,1.8cqw,1.85rem)] card-title-lg font-bold text-slate-900 tracking-tight leading-tight">
                        Interactive 5-Step Student Pass Flow
                      </h2>
                      <p className="text-[11px] sm:text-xs text-slate-600 font-normal leading-relaxed mt-0.5">
                        Select any step below to inspect the high-contrast mobile &amp; web screens inside the capsule viewer.
                      </p>
                    </div>

                    <div className="flex flex-col gap-1.5 pt-0.5">
                      {project.prototypeSteps.map((step, idx) => {
                        const isSelected = selectedProtoIdx === idx;
                        return (
                          <button
                            key={step.title}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProtoIdx(idx);
                            }}
                            className={`w-full text-left p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                              isSelected
                                ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                                : "bg-slate-100 hover:bg-slate-200/80 text-slate-800 border-slate-200"
                            }`}
                          >
                            <span className="text-xs font-bold truncate">{step.title}</span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold shrink-0 ${
                                isSelected
                                  ? "bg-cyan-400/20 text-cyan-200 border border-cyan-300/30"
                                  : "bg-slate-200 text-slate-600"
                              }`}
                            >
                              {step.badge}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>

              {/* OFF STATE: Title on the Right */}
              <div
                className={`absolute top-0 bottom-0 right-[3%] sm:right-[4%] w-[42%] max-w-[42%] h-full flex flex-col items-center justify-center text-center px-2 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  !decisionsOn
                    ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-75 translate-x-12 pointer-events-none"
                }`}
              >
                <div className="flex flex-col items-center justify-center text-center max-w-full select-none pointer-events-none space-y-1.5">
                  <span className="px-3 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-cyan-500/20 border border-cyan-300/30 text-cyan-200">
                    Chapter 02
                  </span>
                  <h3 className="text-center text-[clamp(1.15rem,2.3cqw,2.6rem)] font-bold tracking-tight text-white/95 group-hover:text-white transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                    Decisions &amp; Flow
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 max-w-xs">
                    Explore V1-V3 design iterations and the 5-step interactive student pass flow
                  </p>
                </div>
              </div>

              {/* CIRCULAR KNOB */}
              <div
                className={`absolute top-[var(--knob-pad)] bottom-[var(--knob-pad)] left-[var(--knob-pad)] h-[calc(100%-2*var(--knob-pad))] aspect-square w-auto rounded-full overflow-visible ${
                  !decisionsToggledOnce
                    ? "translate-x-0"
                    : decisionsOn
                    ? "bubble-knob-in"
                    : "bubble-knob-out"
                } flex items-center justify-center select-none`}
              >
                <div
                  className={`relative w-full h-full rounded-full overflow-hidden flex items-center justify-center p-5 sm:p-8 transition-all duration-300 ease-out cursor-pointer ${
                    !decisionsOn
                      ? "bg-white shadow-[0_16px_40px_rgba(0,0,0,0.35),_inset_0_1px_2px_rgba(255,255,255,0.95)] hover:scale-[1.025]"
                      : "bg-[#0b2847] border border-white/30 shadow-[0_20px_50px_rgba(0,18,36,0.45)] hover:scale-[1.015]"
                  }`}
                >
                  {decisionsOn && (
                    <VantaKnobWaves
                      color={0x0b2847}
                      shininess={30.0}
                      waveHeight={20.0}
                      waveSpeed={0.75}
                      zoom={0.65}
                    />
                  )}

                  {!decisionsOn ? (
                    <div className="relative z-10 flex flex-col items-center justify-center text-center p-4 space-y-2">
                      <span className="w-14 h-14 rounded-full bg-slate-900 text-cyan-300 flex items-center justify-center text-lg font-extrabold shadow-md">
                        V1-V3
                      </span>
                      <span className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
                        3 Iterations &amp; 5 Screens
                      </span>
                      <span className="text-xs text-slate-500 max-w-[200px]">
                        From dense single-scroll wireframes to a 3-step MitID wizard
                      </span>
                    </div>
                  ) : decisionsViewMode === "prototype" && activeProtoStep ? (
                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-2 px-3 text-white">
                      <span className="px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-400/20 text-cyan-200 border border-cyan-300/35">
                        {activeProtoStep.title} / {activeProtoStep.badge}
                      </span>
                      <div className="relative w-[82%] h-[68%] rounded-2xl overflow-hidden border border-white/25 bg-slate-950/65 shadow-2xl">
                        <Image
                          src={activeProtoStep.image}
                          alt={activeProtoStep.title}
                          fill
                          unoptimized
                          sizes="40vw"
                          className="object-contain p-1.5"
                        />
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-white/90 text-center max-w-[82%] leading-snug bg-slate-950/75 px-3 py-1 rounded-full border border-white/15 truncate">
                        {activeProtoStep.description}
                      </p>
                    </div>
                  ) : activeDecision.image ? (
                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-2 px-3 text-white">
                      <span
                        className={`px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          activeDecision.chosen
                            ? "bg-emerald-400/20 text-emerald-200 border border-emerald-300/40"
                            : "bg-rose-400/20 text-rose-200 border border-rose-300/40"
                        }`}
                      >
                        {activeDecision.tag}: {activeDecision.title}
                      </span>
                      <div className="relative w-[82%] h-[66%] rounded-2xl overflow-hidden border border-white/25 bg-slate-950/65 shadow-2xl">
                        <Image
                          src={activeDecision.image}
                          alt={activeDecision.title}
                          fill
                          unoptimized
                          sizes="40vw"
                          className="object-contain p-1.5"
                        />
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-white/90 text-center max-w-[82%] leading-snug bg-slate-950/75 px-3 py-1 rounded-full border border-white/15 truncate">
                        {activeDecision.imageCaption ?? activeDecision.constraint}
                      </p>
                    </div>
                  ) : (
                    <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-4 max-w-[85%] space-y-2.5 text-white">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                          activeDecision.chosen
                            ? "bg-emerald-400/20 text-emerald-200 border border-emerald-300/40"
                            : "bg-rose-400/20 text-rose-200 border border-rose-300/40"
                        }`}
                      >
                        {activeDecision.tag}
                      </span>
                      <h4 className="text-sm sm:text-base md:text-lg font-bold leading-snug">
                        {activeDecision.title}
                      </h4>
                      <div className="p-3 rounded-2xl bg-black/30 border border-white/15 text-left space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 block">
                          UX / Technical Constraint
                        </span>
                        <p className="text-xs text-white/90 leading-relaxed">
                          {activeDecision.constraint}
                        </p>
                      </div>
                      <div className="p-3 rounded-2xl bg-white/10 border border-white/20 text-left space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 block">
                          Validation Outcome
                        </span>
                        <p className="text-xs text-white/95 leading-relaxed">
                          {activeDecision.outcome}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* --- PILL 4 (03 / PROCESS, CRAFT & DELIVERABLES) --- */}
        <div
          ref={card4Ref}
          className="warp-card-node capsule-card-wrapper relative w-full h-[100dvh] shrink-0 flex items-center justify-center p-2.5 sm:p-4 md:p-0 z-40"
        >
          <section
            className={`capsule-card-section relative w-full h-full rounded-[32px] sm:rounded-[48px] md:rounded-[1000px] border-[2px] sm:border-[3px] transition-all duration-500 overflow-hidden flex items-center justify-center p-0 ${
              !processOn
                ? "border-white/25 bg-transparent shadow-[0_25px_65px_rgba(0,10,30,0.45),_inset_0_1.5px_2px_rgba(255,255,255,0.45)]"
                : "border-white bg-white shadow-[0_25px_65px_rgba(0,10,30,0.35)]"
            }`}
          >
            <div
              role="switch"
              aria-checked={processOn}
              tabIndex={0}
              aria-label="Toggle Process and Craft details"
              onClick={() => {
                setProcessToggledOnce(true);
                setProcessOn((prev) => !prev);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setProcessToggledOnce(true);
                  setProcessOn((prev) => !prev);
                }
              }}
              style={
                {
                  "--knob-pad": "clamp(8px, 1.6cqw, 18px)",
                  "--travel-dist": "calc(100cqw - 100% - 2 * var(--knob-pad))",
                } as React.CSSProperties
              }
              className={`group relative w-full h-full rounded-[26px] sm:rounded-[40px] md:rounded-[1000px] [container-type:inline-size] cursor-pointer select-none overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.988] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 ${
                !processOn
                  ? "bg-black/20 backdrop-blur-md shadow-[inset_0_4px_24px_rgba(0,10,30,0.5),_inset_0_1px_2px_rgba(255,255,255,0.2)]"
                  : "bg-white shadow-none"
              }`}
            >
              {/* STATE ON: Phases & Team on Left */}
              <div
                className={`absolute top-0 bottom-0 left-[5%] sm:left-[6%] md:left-[7%] w-[38%] max-w-[38%] my-auto h-fit max-h-[90%] flex flex-col justify-center px-1 sm:px-3 py-1 gap-2 card-on-container overflow-y-auto [scrollbar-width:none] transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  processOn
                    ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-x-12 pointer-events-none"
                }`}
              >
                <div>
                  <span className="text-[10px] sm:text-xs font-bold text-blue-600 tracking-wider uppercase mb-0.5 block">
                    03 / Process &amp; Craft ({project.timeline})
                  </span>
                  <h2 className="text-lg sm:text-xl md:text-[clamp(1.1rem,1.85cqw,1.85rem)] card-title-lg font-bold text-slate-900 tracking-tight leading-tight">
                    {project.process.headline}
                  </h2>
                </div>

                {/* Phase Selector */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-0.5">
                  {project.process.phases.map((phase, idx) => {
                    const active = selectedPhaseIdx === idx;
                    return (
                      <button
                        key={phase.step}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPhaseIdx(idx);
                          setProcessKnobView("artifact");
                        }}
                        className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                          active
                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200"
                        }`}
                      >
                        <span className="text-[9px] font-mono font-bold text-cyan-500 block">
                          PHASE {phase.step}
                        </span>
                        <span className="text-[11px] font-bold line-clamp-1">
                          {phase.title}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="p-2.5 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  <strong className="text-slate-900 block mb-0.5">
                    {activePhase.step} - {activePhase.title}
                  </strong>
                  {activePhase.description}
                </div>

                {/* Team pills */}
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {project.process.teamDivision.map((td, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[10px] font-semibold text-blue-900"
                    >
                      {td.members}: {td.role}
                    </span>
                  ))}
                </div>
              </div>

              {/* STATE OFF: Title on Right */}
              <div
                className={`absolute top-0 bottom-0 right-[3%] sm:right-[4%] w-[42%] max-w-[42%] h-full flex flex-col items-center justify-center text-center px-2 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  !processOn
                    ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-75 translate-x-12 pointer-events-none"
                }`}
              >
                <div className="flex flex-col items-center justify-center text-center max-w-full select-none pointer-events-none space-y-1.5">
                  <span className="px-3 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-sky-500/20 border border-sky-300/30 text-sky-200">
                    Chapter 03
                  </span>
                  <h3 className="text-center text-[clamp(1.15rem,2.3cqw,2.6rem)] font-bold tracking-tight text-white/95 group-hover:text-white transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                    Process &amp; Craft
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 max-w-xs">
                    Research artifacts, personas, wireframes, design system, and team roles
                  </p>
                </div>
              </div>

              {/* CIRCULAR KNOB */}
              <div
                className={`absolute top-[var(--knob-pad)] bottom-[var(--knob-pad)] left-[var(--knob-pad)] h-[calc(100%-2*var(--knob-pad))] aspect-square w-auto rounded-full overflow-visible ${
                  !processToggledOnce
                    ? "translate-x-0"
                    : processOn
                    ? "bubble-knob-in"
                    : "bubble-knob-out"
                } flex items-center justify-center select-none`}
              >
                <div
                  className={`relative w-full h-full rounded-full overflow-hidden flex items-center justify-center p-5 sm:p-8 transition-all duration-300 ease-out cursor-pointer ${
                    !processOn
                      ? "bg-white shadow-[0_16px_40px_rgba(0,0,0,0.35),_inset_0_1px_2px_rgba(255,255,255,0.95)] hover:scale-[1.025]"
                      : "bg-[#0b2847] border border-white/30 shadow-[0_20px_50px_rgba(0,18,36,0.45)] hover:scale-[1.015]"
                  }`}
                >
                  {processOn && (
                    <VantaKnobWaves
                      color={0x0b2847}
                      shininess={30.0}
                      waveHeight={20.0}
                      waveSpeed={0.75}
                      zoom={0.65}
                    />
                  )}

                  {!processOn ? (
                    <div className="relative z-10 flex flex-col items-center justify-center text-center p-4 space-y-2">
                      <span className="w-14 h-14 rounded-full bg-slate-900 text-cyan-300 flex items-center justify-center text-xl font-extrabold shadow-md">
                        01-0{project.process.phases.length}
                      </span>
                      <span className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
                        {project.timeline} Sprint
                      </span>
                      <span className="text-xs text-slate-500 max-w-[200px]">
                        {project.deliverables.length} Key deliverables shipped to production
                      </span>
                    </div>
                  ) : activePhase.image && processKnobView === "artifact" ? (
                    <div className="relative z-10 flex flex-col items-center justify-between w-full h-full py-3 sm:py-5 px-4 text-white">
                      {/* Switch between Artifact Image and Deliverables List */}
                      <div
                        className="flex items-center gap-1 p-1 rounded-full bg-black/45 border border-white/20 backdrop-blur-md z-20"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => setProcessKnobView("artifact")}
                          className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-400 text-slate-950 shadow-xs cursor-pointer"
                        >
                          Phase {activePhase.step} Artifact
                        </button>
                        <button
                          type="button"
                          onClick={() => setProcessKnobView("deliverables")}
                          className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white/80 hover:text-white cursor-pointer"
                        >
                          Deliverables ({project.deliverables.length})
                        </button>
                      </div>

                      <div className="relative w-[82%] h-[62%] rounded-xl overflow-hidden border border-white/25 bg-slate-950/60 shadow-2xl">
                        <Image
                          src={activePhase.image}
                          alt={activePhase.title}
                          fill
                          unoptimized
                          sizes="(max-width: 768px) 80vw, 40vw"
                          className="object-contain p-1.5"
                        />
                      </div>

                      <span className="px-3 py-1 rounded-full bg-black/50 border border-white/15 text-[10px] font-medium text-cyan-200 text-center max-w-[82%] line-clamp-1">
                        {activePhase.imageCaption || activePhase.title}
                      </span>
                    </div>
                  ) : (
                    <div className="relative z-10 flex flex-col items-center justify-center px-6 py-4 max-w-[85%] space-y-2 text-white">
                      {activePhase.image && (
                        <div
                          className="flex items-center gap-1 p-1 rounded-full bg-black/45 border border-white/20 backdrop-blur-md mb-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={() => setProcessKnobView("artifact")}
                            className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white/80 hover:text-white cursor-pointer"
                          >
                            Phase {activePhase.step} Artifact
                          </button>
                          <button
                            type="button"
                            onClick={() => setProcessKnobView("deliverables")}
                            className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-400 text-slate-950 shadow-xs cursor-pointer"
                          >
                            Deliverables ({project.deliverables.length})
                          </button>
                        </div>
                      )}
                      {!activePhase.image && (
                        <span className="px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-400/20 text-cyan-200 border border-cyan-300/30">
                          Shipped Deliverables
                        </span>
                      )}
                      <div className="space-y-1.5 w-full text-left">
                        {project.deliverables.map((deliv, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 p-2 rounded-xl bg-black/30 border border-white/15 text-[11px] sm:text-xs text-white/95"
                          >
                            <span className="text-cyan-300 font-bold shrink-0">✓</span>
                            <span className="leading-snug">{deliv}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* --- PILL 5 (04 / IMPACT, KPIS & TESTIMONIAL) --- */}
        <div
          ref={card5Ref}
          className="warp-card-node capsule-card-wrapper relative w-full h-[100dvh] shrink-0 flex items-center justify-center p-2.5 sm:p-4 md:p-0 z-50"
        >
          <section
            className={`capsule-card-section relative w-full h-full rounded-[32px] sm:rounded-[48px] md:rounded-[1000px] border-[2px] sm:border-[3px] transition-all duration-500 overflow-hidden flex items-center justify-center p-0 ${
              !impactOn
                ? "border-white/25 bg-transparent shadow-[0_25px_65px_rgba(0,10,30,0.45),_inset_0_1.5px_2px_rgba(255,255,255,0.45)]"
                : "border-white bg-white shadow-[0_25px_65px_rgba(0,10,30,0.35)]"
            }`}
          >
            <div
              role="switch"
              aria-checked={impactOn}
              tabIndex={0}
              aria-label="Toggle Impact and KPIs details"
              onClick={() => {
                setImpactToggledOnce(true);
                setImpactOn((prev) => !prev);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setImpactToggledOnce(true);
                  setImpactOn((prev) => !prev);
                }
              }}
              style={
                {
                  "--knob-pad": "clamp(8px, 1.6cqw, 18px)",
                  "--travel-dist": "calc(100cqw - 100% - 2 * var(--knob-pad))",
                } as React.CSSProperties
              }
              className={`group relative w-full h-full rounded-[26px] sm:rounded-[40px] md:rounded-[1000px] [container-type:inline-size] cursor-pointer select-none overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.988] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 ${
                !impactOn
                  ? "bg-black/20 backdrop-blur-md shadow-[inset_0_4px_24px_rgba(0,10,30,0.5),_inset_0_1px_2px_rgba(255,255,255,0.2)]"
                  : "bg-white shadow-none"
              }`}
            >
              {/* STATE ON: Results & Highlights on Left */}
              <div
                className={`absolute top-0 bottom-0 left-[5%] sm:left-[6%] md:left-[7%] w-[38%] max-w-[38%] my-auto h-fit max-h-[90%] flex flex-col justify-center px-1 sm:px-3 py-1 gap-2 card-on-container overflow-y-auto [scrollbar-width:none] transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  impactOn
                    ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-x-12 pointer-events-none"
                }`}
              >
                <div>
                  <span className="text-[10px] sm:text-xs font-bold text-emerald-600 tracking-wider uppercase mb-0.5 block">
                    04 / Verified Impact
                  </span>
                  <h2 className="text-lg sm:text-xl md:text-[clamp(1.1rem,1.9cqw,2rem)] card-title-lg font-bold text-slate-900 tracking-tight leading-tight">
                    {project.results.headline}
                  </h2>
                </div>

                {/* 3 KPI Cards */}
                <div className="grid grid-cols-3 gap-2 pt-0.5">
                  {project.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-2xl bg-slate-900 text-white flex flex-col justify-between"
                    >
                      <span className="text-base sm:text-xl font-extrabold text-cyan-300 tracking-tight">
                        {m.value}
                      </span>
                      <span className="text-[10px] text-white/80 font-medium leading-tight mt-1">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Highlights */}
                <div className="space-y-1.5 pt-0.5">
                  {project.results.highlights.map((h, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-slate-800 text-[11px] sm:text-xs leading-snug"
                    >
                      <span className="text-emerald-600 font-bold shrink-0">★</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* STATE OFF: Title on Right */}
              <div
                className={`absolute top-0 bottom-0 right-[3%] sm:right-[4%] w-[42%] max-w-[42%] h-full flex flex-col items-center justify-center text-center px-2 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  !impactOn
                    ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-75 translate-x-12 pointer-events-none"
                }`}
              >
                <div className="flex flex-col items-center justify-center text-center max-w-full select-none pointer-events-none space-y-1.5">
                  <span className="px-3 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-emerald-500/20 border border-emerald-300/30 text-emerald-200">
                    Chapter 04
                  </span>
                  <h3 className="text-center text-[clamp(1.15rem,2.3cqw,2.6rem)] font-bold tracking-tight text-white/95 group-hover:text-white transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                    Impact &amp; KPIs
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 max-w-xs">
                    Measured usability gains and team feedback
                  </p>
                </div>
              </div>

              {/* CIRCULAR KNOB */}
              <div
                className={`absolute top-[var(--knob-pad)] bottom-[var(--knob-pad)] left-[var(--knob-pad)] h-[calc(100%-2*var(--knob-pad))] aspect-square w-auto rounded-full overflow-visible ${
                  !impactToggledOnce
                    ? "translate-x-0"
                    : impactOn
                    ? "bubble-knob-in"
                    : "bubble-knob-out"
                } flex items-center justify-center select-none`}
              >
                <div
                  className={`relative w-full h-full rounded-full overflow-hidden flex items-center justify-center p-5 sm:p-8 transition-all duration-300 ease-out cursor-pointer ${
                    !impactOn
                      ? "bg-white shadow-[0_16px_40px_rgba(0,0,0,0.35),_inset_0_1px_2px_rgba(255,255,255,0.95)] hover:scale-[1.025]"
                      : "bg-[#0b2847] border border-white/30 shadow-[0_20px_50px_rgba(0,18,36,0.45)] hover:scale-[1.015]"
                  }`}
                >
                  {impactOn && (
                    <VantaKnobWaves
                      color={0x0b2847}
                      shininess={30.0}
                      waveHeight={20.0}
                      waveSpeed={0.75}
                      zoom={0.65}
                    />
                  )}

                  {!impactOn ? (
                    <div className="relative z-10 flex flex-col items-center justify-center text-center p-4 space-y-1">
                      <span className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
                        {project.metrics[0]?.value}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-wider">
                        {project.metrics[0]?.label}
                      </span>
                      <span className="text-xs text-slate-500 max-w-[200px] pt-1">
                        {project.metrics[0]?.description}
                      </span>
                    </div>
                  ) : project.results.testimonial ? (
                    <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-4 max-w-[88%] space-y-2.5 text-white">
                      {project.results.testimonial.teamPhoto && (
                        <div
                          className="flex items-center gap-1 p-1 rounded-full bg-black/45 border border-white/20 backdrop-blur-md"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={() => setShowTeamPhoto(false)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
                              !showTeamPhoto
                                ? "bg-cyan-400 text-slate-950 shadow-xs"
                                : "text-white/80 hover:text-white"
                            }`}
                          >
                            Endorsement
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowTeamPhoto(true)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
                              showTeamPhoto
                                ? "bg-cyan-400 text-slate-950 shadow-xs"
                                : "text-white/80 hover:text-white"
                            }`}
                          >
                            Team Photo
                          </button>
                        </div>
                      )}

                      {showTeamPhoto && project.results.testimonial.teamPhoto ? (
                        <div className="flex flex-col items-center space-y-2 w-full">
                          <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-cyan-300 shadow-2xl">
                            <Image
                              src={project.results.testimonial.teamPhoto}
                              alt={`${project.title} Team`}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          </div>
                          <span className="text-[11px] font-semibold text-cyan-200">
                            Herald &amp; {project.results.testimonial.author}
                          </span>
                        </div>
                      ) : (
                        <>
                          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-cyan-300 shadow-lg">
                            <Image
                              src={project.results.testimonial.avatar}
                              alt={project.results.testimonial.author}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          </div>
                          <p className="text-xs sm:text-sm italic text-white/95 leading-relaxed">
                            &ldquo;{project.results.testimonial.quote}&rdquo;
                          </p>
                          <div>
                            <span className="text-xs font-bold text-white block">
                              {project.results.testimonial.author}
                            </span>
                            <span className="text-[11px] text-cyan-300">
                              {project.results.testimonial.role}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-4 max-w-[85%] space-y-3 text-white">
                      {project.metrics.map((m, i) => (
                        <div key={i} className="space-y-0.5">
                          <span className="text-2xl font-extrabold text-cyan-300 block">
                            {m.value}
                          </span>
                          <span className="text-xs text-white/85 block">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* --- PILL 6 (05 / RETROSPECTIVE & LEARNINGS) --- */}
        <div
          ref={card6Ref}
          className="warp-card-node capsule-card-wrapper relative w-full h-[100dvh] shrink-0 flex items-center justify-center p-2.5 sm:p-4 md:p-0 z-[60]"
        >
          <section
            className={`capsule-card-section relative w-full h-full rounded-[32px] sm:rounded-[48px] md:rounded-[1000px] border-[2px] sm:border-[3px] transition-all duration-500 overflow-hidden flex items-center justify-center p-0 ${
              !learningsOn
                ? "border-white/25 bg-transparent shadow-[0_25px_65px_rgba(0,10,30,0.45),_inset_0_1.5px_2px_rgba(255,255,255,0.45)]"
                : "border-white bg-white shadow-[0_25px_65px_rgba(0,10,30,0.35)]"
            }`}
          >
            <div
              role="switch"
              aria-checked={learningsOn}
              tabIndex={0}
              aria-label="Toggle Retrospective and Learnings details"
              onClick={() => {
                setLearningsToggledOnce(true);
                setLearningsOn((prev) => !prev);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setLearningsToggledOnce(true);
                  setLearningsOn((prev) => !prev);
                }
              }}
              style={
                {
                  "--knob-pad": "clamp(8px, 1.6cqw, 18px)",
                  "--travel-dist": "calc(100cqw - 100% - 2 * var(--knob-pad))",
                } as React.CSSProperties
              }
              className={`group relative w-full h-full rounded-[26px] sm:rounded-[40px] md:rounded-[1000px] [container-type:inline-size] cursor-pointer select-none overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.988] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 ${
                !learningsOn
                  ? "bg-black/20 backdrop-blur-md shadow-[inset_0_4px_24px_rgba(0,10,30,0.5),_inset_0_1px_2px_rgba(255,255,255,0.2)]"
                  : "bg-white shadow-none"
              }`}
            >
              {/* STATE ON: What Worked vs Mid-Sprint Pivots */}
              <div
                className={`absolute top-0 bottom-0 left-[5%] sm:left-[6%] md:left-[7%] w-[38%] max-w-[38%] my-auto h-fit max-h-[90%] flex flex-col justify-center px-1 sm:px-3 py-1 gap-2.5 card-on-container overflow-y-auto [scrollbar-width:none] transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  learningsOn
                    ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-x-12 pointer-events-none"
                }`}
              >
                <div>
                  <span className="text-[10px] sm:text-xs font-bold text-amber-600 tracking-wider uppercase mb-0.5 block">
                    05 / Retrospective &amp; Pivots
                  </span>
                  <h2 className="text-lg sm:text-xl md:text-[clamp(1.1rem,1.9cqw,2rem)] card-title-lg font-bold text-slate-900 tracking-tight leading-tight">
                    What Worked vs Mid-Sprint Pivots
                  </h2>
                </div>

                {/* Tab buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLearningsTab("worked");
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      learningsTab === "worked"
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    ✓ What Worked
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLearningsTab("errors");
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      learningsTab === "errors"
                        ? "bg-amber-600 text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    ! Mistakes &amp; Pivots
                  </button>
                </div>

                <div className="space-y-2">
                  {(learningsTab === "worked"
                    ? project.learnings.whatWorked
                    : project.learnings.whatCausedErrors
                  ).map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-2xl border text-xs leading-relaxed ${
                        learningsTab === "worked"
                          ? "bg-emerald-50 border-emerald-200 text-slate-800"
                          : "bg-amber-50 border-amber-200 text-slate-800"
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* STATE OFF: Title on Right */}
              <div
                className={`absolute top-0 bottom-0 right-[3%] sm:right-[4%] w-[42%] max-w-[42%] h-full flex flex-col items-center justify-center text-center px-2 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  !learningsOn
                    ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-75 translate-x-12 pointer-events-none"
                }`}
              >
                <div className="flex flex-col items-center justify-center text-center max-w-full select-none pointer-events-none space-y-1.5">
                  <span className="px-3 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-amber-500/20 border border-amber-300/30 text-amber-200">
                    Chapter 05
                  </span>
                  <h3 className="text-center text-[clamp(1.15rem,2.3cqw,2.6rem)] font-bold tracking-tight text-white/95 group-hover:text-white transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                    Retrospective
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 max-w-xs">
                    Validated hypotheses, early mistakes, and key lessons learned
                  </p>
                </div>
              </div>

              {/* CIRCULAR KNOB */}
              <div
                className={`absolute top-[var(--knob-pad)] bottom-[var(--knob-pad)] left-[var(--knob-pad)] h-[calc(100%-2*var(--knob-pad))] aspect-square w-auto rounded-full overflow-visible ${
                  !learningsToggledOnce
                    ? "translate-x-0"
                    : learningsOn
                    ? "bubble-knob-in"
                    : "bubble-knob-out"
                } flex items-center justify-center select-none`}
              >
                <div
                  className={`relative w-full h-full rounded-full overflow-hidden flex items-center justify-center p-5 sm:p-8 transition-all duration-300 ease-out cursor-pointer ${
                    !learningsOn
                      ? "bg-white shadow-[0_16px_40px_rgba(0,0,0,0.35),_inset_0_1px_2px_rgba(255,255,255,0.95)] hover:scale-[1.025]"
                      : "bg-[#0b2847] border border-white/30 shadow-[0_20px_50px_rgba(0,18,36,0.45)] hover:scale-[1.015]"
                  }`}
                >
                  {learningsOn && (
                    <VantaKnobWaves
                      color={0x0b2847}
                      shininess={30.0}
                      waveHeight={20.0}
                      waveSpeed={0.75}
                      zoom={0.65}
                    />
                  )}

                  {!learningsOn ? (
                    <div className="relative z-10 flex flex-col items-center justify-center text-center p-4 space-y-2">
                      <span className="w-14 h-14 rounded-full bg-slate-900 text-amber-300 flex items-center justify-center text-xl font-extrabold shadow-md">
                        ✓ / !
                      </span>
                      <span className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
                        Behind the Scenes
                      </span>
                      <span className="text-xs text-slate-500 max-w-[200px]">
                        Candid look at what we had to rethink mid-sprint
                      </span>
                    </div>
                  ) : project.learnings.pivotImage ? (
                    <div className="relative z-10 flex flex-col items-center justify-between w-full h-full py-4 sm:py-6 px-4 text-white">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-200 border border-amber-300/35">
                        Key Design Pivot
                      </span>

                      <div className="relative w-[82%] h-[60%] rounded-xl overflow-hidden border border-white/25 bg-slate-950/60 shadow-2xl">
                        <Image
                          src={project.learnings.pivotImage}
                          alt="Wireframes and Design Pivot"
                          fill
                          unoptimized
                          sizes="(max-width: 768px) 80vw, 40vw"
                          className="object-contain p-1.5"
                        />
                      </div>

                      <span className="px-3 py-1 rounded-full bg-black/50 border border-white/15 text-[10px] font-medium text-amber-200 text-center max-w-[82%] line-clamp-1">
                        {project.learnings.pivotCaption || project.learnings.whatCausedErrors[0]}
                      </span>
                    </div>
                  ) : (
                    <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-4 max-w-[85%] space-y-3 text-white">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-200 border border-amber-300/35">
                        Key Project Pivot
                      </span>
                      <p className="text-xs sm:text-sm text-white/95 leading-relaxed">
                        {project.learnings.whatCausedErrors[0]}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* --- PILL 7 (06 / NEXT PROJECT & LINKS) --- */}
        <div
          ref={card7Ref}
          className="warp-card-node capsule-card-wrapper relative w-full h-[100dvh] shrink-0 flex items-center justify-center p-2.5 sm:p-4 md:p-0 z-[70]"
        >
          <section
            className={`capsule-card-section relative w-full h-full rounded-[32px] sm:rounded-[48px] md:rounded-[1000px] border-[2px] sm:border-[3px] transition-all duration-500 overflow-hidden flex items-center justify-center p-0 ${
              !nextOn
                ? "border-white/25 bg-transparent shadow-[0_25px_65px_rgba(0,10,30,0.45),_inset_0_1.5px_2px_rgba(255,255,255,0.45)]"
                : "border-white bg-white shadow-[0_25px_65px_rgba(0,10,30,0.35)]"
            }`}
          >
            <div
              role="switch"
              aria-checked={nextOn}
              tabIndex={0}
              aria-label="Toggle Next Project details"
              onClick={() => {
                setNextToggledOnce(true);
                setNextOn((prev) => !prev);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setNextToggledOnce(true);
                  setNextOn((prev) => !prev);
                }
              }}
              style={
                {
                  "--knob-pad": "clamp(8px, 1.6cqw, 18px)",
                  "--travel-dist": "calc(100cqw - 100% - 2 * var(--knob-pad))",
                } as React.CSSProperties
              }
              className={`group relative w-full h-full rounded-[26px] sm:rounded-[40px] md:rounded-[1000px] [container-type:inline-size] cursor-pointer select-none overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.988] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 ${
                !nextOn
                  ? "bg-black/20 backdrop-blur-md shadow-[inset_0_4px_24px_rgba(0,10,30,0.5),_inset_0_1px_2px_rgba(255,255,255,0.2)]"
                  : "bg-white shadow-none"
              }`}
            >
              {/* STATE ON: Next Project CTA + Live Site + Home */}
              <div
                className={`absolute top-0 bottom-0 left-[5%] sm:left-[6%] md:left-[7%] w-[36%] max-w-[36%] my-auto h-fit max-h-[90%] flex flex-col justify-center px-1 sm:px-3 py-1 gap-3 card-on-container overflow-y-auto [scrollbar-width:none] transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  nextOn
                    ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-x-12 pointer-events-none"
                }`}
              >
                <div>
                  <span className="text-[10px] sm:text-xs font-bold text-blue-600 tracking-wider uppercase mb-0.5 block">
                    06 / Continue Exploring ({project.nextProject.badge})
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-[clamp(1.35rem,2.4cqw,2.6rem)] card-title-lg font-bold text-slate-900 tracking-tight leading-tight">
                    {project.nextProject.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mt-1">
                    {project.nextProject.tagline}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <Link
                    href={`/work/${project.nextProject.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-black text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
                  >
                    <span>Open Case Study</span>
                    <span>↗</span>
                  </Link>

                  <Link
                    href="/"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-semibold transition-all cursor-pointer"
                  >
                    <span>← Back to Home</span>
                  </Link>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-slate-300 hover:border-slate-900 text-slate-800 text-xs font-semibold transition-all cursor-pointer"
                    >
                      <span>Live Website ↗</span>
                    </a>
                  )}
                </div>
              </div>

              {/* STATE OFF: Title on Right */}
              <div
                className={`absolute top-0 bottom-0 right-[3%] sm:right-[4%] w-[42%] max-w-[42%] h-full flex flex-col items-center justify-center text-center px-2 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  !nextOn
                    ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-75 translate-x-12 pointer-events-none"
                }`}
              >
                <div className="flex flex-col items-center justify-center text-center max-w-full select-none pointer-events-none space-y-1.5">
                  <span className="px-3 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-cyan-500/20 border border-cyan-300/30 text-cyan-200">
                    Next Case Study
                  </span>
                  <h3 className="text-center text-[clamp(1.15rem,2.3cqw,2.6rem)] font-bold tracking-tight text-white/95 group-hover:text-white transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                    {project.nextProject.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 max-w-xs">
                    {project.nextProject.tagline}
                  </p>
                </div>
              </div>

              {/* CIRCULAR KNOB WITH NEXT PROJECT MOCKUP */}
              <div
                className={`absolute top-[var(--knob-pad)] bottom-[var(--knob-pad)] left-[var(--knob-pad)] h-[calc(100%-2*var(--knob-pad))] aspect-square w-auto rounded-full overflow-visible ${
                  !nextToggledOnce
                    ? "translate-x-0"
                    : nextOn
                    ? "bubble-knob-in"
                    : "bubble-knob-out"
                } flex items-center justify-center select-none`}
              >
                <div
                  className={`relative w-full h-full rounded-full overflow-hidden flex items-center justify-center p-4 sm:p-7 transition-all duration-300 ease-out cursor-pointer ${
                    !nextOn
                      ? "bg-white shadow-[0_16px_40px_rgba(0,0,0,0.35),_inset_0_1px_2px_rgba(255,255,255,0.95)] hover:scale-[1.025]"
                      : "bg-[#0b2847] border border-white/30 shadow-[0_20px_50px_rgba(0,18,36,0.45)] hover:scale-[1.015]"
                  }`}
                >
                  {nextOn && (
                    <VantaKnobWaves
                      color={0x0b2847}
                      shininess={30.0}
                      waveHeight={20.0}
                      waveSpeed={0.75}
                      zoom={0.65}
                    />
                  )}
                  <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
                    <Image
                      src={project.nextProject.mockup}
                      alt={project.nextProject.title}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 85vw, 45vw"
                      className="object-contain p-4 sm:p-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* ================================================================= */}
      {/* MOBILE VIEW (< 768px): STACKED 2:1 CAPSULES                       */}
      {/* ================================================================= */}
      <div className="md:hidden relative z-10 flex flex-col gap-5 px-3 pt-20 pb-14 max-w-lg mx-auto">
        {/* 3 Hero Glass Capsules */}
        <div id="m-proj-hero" className="flex flex-col gap-4">
          {/* Capsule 1: Badge, Year & Title */}
          <div className="relative w-full aspect-[2/1] rounded-full border-[2px] border-white/30 bg-white/[0.10] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,10,30,0.5),_inset_0_1.5px_2px_rgba(255,255,255,0.4)] flex flex-col items-center justify-center px-8 text-center overflow-hidden">
            <span className="px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-400/20 border border-cyan-300/30 text-cyan-200 mb-1">
              {project.badge} / {project.year}
            </span>
            <h1 className="text-[clamp(1.5rem,7vw,2.25rem)] font-bold tracking-tight text-white leading-tight">
              {project.title}
            </h1>
            <p className="text-xs text-white/80 mt-1 line-clamp-2">{project.tagline}</p>
          </div>

          {/* Capsule 2: Summary & Role */}
          <div className="relative w-full aspect-[2/1] rounded-full border-[2px] border-white/30 bg-white/[0.10] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,10,30,0.5),_inset_0_1.5px_2px_rgba(255,255,255,0.4)] flex flex-col items-center justify-center px-7 text-center overflow-hidden">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 mb-1">
              {project.role}
            </span>
            <p className="text-[clamp(0.75rem,3.4vw,0.95rem)] text-white/95 leading-snug line-clamp-4">
              {project.summary}
            </p>
          </div>

          {/* Capsule 3: Key Metrics */}
          <div className="relative w-full aspect-[2/1] rounded-full border-[2px] border-white/30 bg-white/[0.10] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,10,30,0.5),_inset_0_1.5px_2px_rgba(255,255,255,0.4)] flex items-center justify-around px-6 text-center overflow-hidden">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-lg sm:text-xl font-extrabold text-cyan-300">
                  {m.value}
                </span>
                <span className="text-[10px] text-white/80 font-medium max-w-[90px] leading-tight mt-0.5">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Switch Pill 1: The Problem */}
        <section
          id="m-proj-problem"
          role="switch"
          aria-checked={mProblemOn}
          tabIndex={0}
          onClick={() => {
            setMProblemOnce(true);
            setMProblemOn((p) => !p);
          }}
          style={
            {
              "--travel-dist": "calc(100cqw - 100% - 16px)",
            } as React.CSSProperties
          }
          className={`relative w-full aspect-[2/1] rounded-full [container-type:inline-size] border-[2px] transition-all duration-500 overflow-hidden cursor-pointer select-none ${
            !mProblemOn
              ? "border-white/30 bg-black/25 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,10,30,0.5),_inset_0_1.5px_2px_rgba(255,255,255,0.4)]"
              : "border-white bg-white shadow-[0_20px_50px_rgba(0,10,30,0.35)]"
          }`}
        >
          {/* State OFF: text on right */}
          <div
            className={`absolute top-0 bottom-0 right-3 w-[46%] flex flex-col items-center justify-center text-center px-2 transition-all duration-500 ${
              !mProblemOn
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8 pointer-events-none"
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300">
              01 / Challenge
            </span>
            <h2 className="text-base font-bold text-white leading-tight mt-0.5">
              The Problem
            </h2>
            <span className="text-[10px] text-white/70 mt-1">Tap to open</span>
          </div>

          {/* State ON: text on left */}
          <div
            className={`absolute top-0 bottom-0 left-4 w-[46%] flex flex-col justify-center pr-2 overflow-y-auto [scrollbar-width:none] py-3 transition-all duration-500 ${
              mProblemOn
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8 pointer-events-none"
            }`}
          >
            <span className="text-[9px] font-bold uppercase tracking-wider text-rose-600">
              01 / The Problem
            </span>
            <h3 className="text-xs font-bold text-slate-900 leading-tight mt-0.5">
              {project.problem.headline}
            </h3>
            <p className="text-[10px] text-slate-600 leading-snug mt-1">
              {project.problem.keyIssues[0]}
            </p>
          </div>

          {/* Mobile Circular Knob */}
          <div
            className={`absolute top-2 bottom-2 left-2 h-[calc(100%-16px)] aspect-square rounded-full ${
              !mProblemOnce
                ? "translate-x-0"
                : mProblemOn
                ? "bubble-knob-h-in"
                : "bubble-knob-h-out"
            } flex items-center justify-center`}
          >
            <div
              className={`relative w-full h-full rounded-full overflow-hidden flex items-center justify-center p-3 ${
                !mProblemOn ? "bg-white shadow-lg" : "bg-[#0b2847] border border-white/30"
              }`}
            >
              {mProblemOn && (
                <VantaKnobWaves
                  color={0x0b2847}
                  shininess={30.0}
                  waveHeight={20.0}
                  waveSpeed={0.75}
                  zoom={0.65}
                />
              )}
              <div className="relative z-10 w-full h-full">
                <Image
                  src={
                    mProblemOn && project.problem.beforeImage
                      ? project.problem.beforeImage
                      : project.heroMockup
                  }
                  alt={project.title}
                  fill
                  unoptimized
                  className="object-contain p-2"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Switch Pill 2: Decisions & Flow */}
        <section
          id="m-proj-decisions"
          role="switch"
          aria-checked={mDecisionsOn}
          tabIndex={0}
          onClick={() => {
            setMDecisionsOnce(true);
            setMDecisionsOn((p) => !p);
          }}
          style={
            {
              "--travel-dist": "calc(100cqw - 100% - 16px)",
            } as React.CSSProperties
          }
          className={`relative w-full aspect-[2/1] rounded-full [container-type:inline-size] border-[2px] transition-all duration-500 overflow-hidden cursor-pointer select-none ${
            !mDecisionsOn
              ? "border-white/30 bg-black/25 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,10,30,0.5),_inset_0_1.5px_2px_rgba(255,255,255,0.4)]"
              : "border-white bg-white shadow-[0_20px_50px_rgba(0,10,30,0.35)]"
          }`}
        >
          <div
            className={`absolute top-0 bottom-0 right-3 w-[46%] flex flex-col items-center justify-center text-center px-2 transition-all duration-500 ${
              !mDecisionsOn
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8 pointer-events-none"
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">
              02 / Architecture
            </span>
            <h2 className="text-base font-bold text-white leading-tight mt-0.5">
              Decisions &amp; Flow
            </h2>
            <span className="text-[10px] text-white/70 mt-1">Tap to open</span>
          </div>

          <div
            className={`absolute top-0 bottom-0 left-4 w-[46%] flex flex-col justify-center pr-2 overflow-y-auto [scrollbar-width:none] py-3 transition-all duration-500 ${
              mDecisionsOn
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8 pointer-events-none"
            }`}
          >
            <span className="text-[9px] font-bold uppercase tracking-wider text-blue-600">
              Winning Direction
            </span>
            <h3 className="text-xs font-bold text-slate-900 leading-tight mt-0.5">
              {project.decisions.options[2]?.title}
            </h3>
            <p className="text-[10px] text-slate-600 leading-snug mt-1">
              {project.decisions.options[2]?.outcome}
            </p>
          </div>

          <div
            className={`absolute top-2 bottom-2 left-2 h-[calc(100%-16px)] aspect-square rounded-full ${
              !mDecisionsOnce
                ? "translate-x-0"
                : mDecisionsOn
                ? "bubble-knob-h-in"
                : "bubble-knob-h-out"
            } flex items-center justify-center`}
          >
            <div
              className={`relative w-full h-full rounded-full overflow-hidden flex items-center justify-center p-3 text-center ${
                !mDecisionsOn ? "bg-white shadow-lg" : "bg-[#0b2847] border border-white/30"
              }`}
            >
              {mDecisionsOn && (
                <VantaKnobWaves
                  color={0x0b2847}
                  shininess={30.0}
                  waveHeight={20.0}
                  waveSpeed={0.75}
                  zoom={0.65}
                />
              )}
              {mDecisionsOn && project.decisions.options[2]?.image ? (
                <div className="relative z-10 w-full h-full">
                  <Image
                    src={project.decisions.options[2].image}
                    alt={project.decisions.options[2].title}
                    fill
                    unoptimized
                    className="object-contain p-2"
                  />
                </div>
              ) : (
                <div className="relative z-10 flex flex-col items-center justify-center px-2">
                  <span
                    className={`text-xs font-extrabold ${
                      !mDecisionsOn ? "text-slate-900" : "text-cyan-300"
                    }`}
                  >
                    V1 to V3
                  </span>
                  <span
                    className={`text-[10px] mt-0.5 leading-tight ${
                      !mDecisionsOn ? "text-slate-500" : "text-white/90"
                    }`}
                  >
                    3 design iterations tested
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Mobile Switch Pill 3: Process & Craft */}
        <section
          id="m-proj-process"
          role="switch"
          aria-checked={mProcessOn}
          tabIndex={0}
          onClick={() => {
            setMProcessOnce(true);
            setMProcessOn((p) => !p);
          }}
          style={
            {
              "--travel-dist": "calc(100cqw - 100% - 16px)",
            } as React.CSSProperties
          }
          className={`relative w-full aspect-[2/1] rounded-full [container-type:inline-size] border-[2px] transition-all duration-500 overflow-hidden cursor-pointer select-none ${
            !mProcessOn
              ? "border-white/30 bg-black/25 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,10,30,0.5),_inset_0_1.5px_2px_rgba(255,255,255,0.4)]"
              : "border-white bg-white shadow-[0_20px_50px_rgba(0,10,30,0.35)]"
          }`}
        >
          <div
            className={`absolute top-0 bottom-0 right-3 w-[46%] flex flex-col items-center justify-center text-center px-2 transition-all duration-500 ${
              !mProcessOn
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8 pointer-events-none"
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300">
              03 / Method
            </span>
            <h2 className="text-base font-bold text-white leading-tight mt-0.5">
              Process &amp; Craft
            </h2>
            <span className="text-[10px] text-white/70 mt-1">{project.timeline}</span>
          </div>

          <div
            className={`absolute top-0 bottom-0 left-4 w-[46%] flex flex-col justify-center pr-2 overflow-y-auto [scrollbar-width:none] py-3 transition-all duration-500 ${
              mProcessOn
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8 pointer-events-none"
            }`}
          >
            <span className="text-[9px] font-bold uppercase tracking-wider text-blue-600">
              Deliverables
            </span>
            <p className="text-[10px] text-slate-800 font-semibold leading-snug mt-0.5">
              {project.deliverables[0]}
            </p>
            <p className="text-[10px] text-slate-600 leading-snug mt-1">
              {project.deliverables[1]}
            </p>
          </div>

          <div
            className={`absolute top-2 bottom-2 left-2 h-[calc(100%-16px)] aspect-square rounded-full ${
              !mProcessOnce
                ? "translate-x-0"
                : mProcessOn
                ? "bubble-knob-h-in"
                : "bubble-knob-h-out"
            } flex items-center justify-center`}
          >
            <div
              className={`relative w-full h-full rounded-full overflow-hidden flex items-center justify-center p-3 text-center ${
                !mProcessOn ? "bg-white shadow-lg" : "bg-[#0b2847] border border-white/30"
              }`}
            >
              {mProcessOn && (
                <VantaKnobWaves
                  color={0x0b2847}
                  shininess={30.0}
                  waveHeight={20.0}
                  waveSpeed={0.75}
                  zoom={0.65}
                />
              )}
              {mProcessOn && project.process.phases[0]?.image ? (
                <div className="relative z-10 w-full h-full">
                  <Image
                    src={project.process.phases[0].image}
                    alt={project.process.phases[0].title}
                    fill
                    unoptimized
                    className="object-contain p-2"
                  />
                </div>
              ) : (
                <div className="relative z-10 flex flex-col items-center justify-center px-2">
                  <span
                    className={`text-xs font-extrabold ${
                      !mProcessOn ? "text-slate-900" : "text-cyan-300"
                    }`}
                  >
                    {project.process.phases.length} UX Phases
                  </span>
                  <span
                    className={`text-[10px] mt-0.5 leading-tight ${
                      !mProcessOn ? "text-slate-500" : "text-white/90"
                    }`}
                  >
                    {project.timeline}
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Mobile Switch Pill 4: Impact & KPIs */}
        <section
          id="m-proj-impact"
          role="switch"
          aria-checked={mImpactOn}
          tabIndex={0}
          onClick={() => {
            setMImpactOnce(true);
            setMImpactOn((p) => !p);
          }}
          style={
            {
              "--travel-dist": "calc(100cqw - 100% - 16px)",
            } as React.CSSProperties
          }
          className={`relative w-full aspect-[2/1] rounded-full [container-type:inline-size] border-[2px] transition-all duration-500 overflow-hidden cursor-pointer select-none ${
            !mImpactOn
              ? "border-white/30 bg-black/25 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,10,30,0.5),_inset_0_1.5px_2px_rgba(255,255,255,0.4)]"
              : "border-white bg-white shadow-[0_20px_50px_rgba(0,10,30,0.35)]"
          }`}
        >
          <div
            className={`absolute top-0 bottom-0 right-3 w-[46%] flex flex-col items-center justify-center text-center px-2 transition-all duration-500 ${
              !mImpactOn
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8 pointer-events-none"
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
              04 / Results
            </span>
            <h2 className="text-base font-bold text-white leading-tight mt-0.5">
              Impact &amp; KPIs
            </h2>
            <span className="text-[10px] text-white/70 mt-1">Tap for outcomes</span>
          </div>

          <div
            className={`absolute top-0 bottom-0 left-4 w-[46%] flex flex-col justify-center pr-2 overflow-y-auto [scrollbar-width:none] py-3 transition-all duration-500 ${
              mImpactOn
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8 pointer-events-none"
            }`}
          >
            <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-600">
              Key Outcome
            </span>
            <h3 className="text-xs font-bold text-slate-900 leading-tight mt-0.5">
              {project.results.highlights[0]}
            </h3>
            <p className="text-[10px] text-slate-600 leading-snug mt-1">
              {project.results.highlights[1]}
            </p>
          </div>

          <div
            className={`absolute top-2 bottom-2 left-2 h-[calc(100%-16px)] aspect-square rounded-full ${
              !mImpactOnce
                ? "translate-x-0"
                : mImpactOn
                ? "bubble-knob-h-in"
                : "bubble-knob-h-out"
            } flex items-center justify-center`}
          >
            <div
              className={`relative w-full h-full rounded-full overflow-hidden flex items-center justify-center p-3 text-center ${
                !mImpactOn ? "bg-white shadow-lg" : "bg-[#0b2847] border border-white/30"
              }`}
            >
              {mImpactOn && (
                <VantaKnobWaves
                  color={0x0b2847}
                  shininess={30.0}
                  waveHeight={20.0}
                  waveSpeed={0.75}
                  zoom={0.65}
                />
              )}
              <div className="relative z-10 flex flex-col items-center justify-center px-2">
                <span
                  className={`text-lg font-extrabold ${
                    !mImpactOn ? "text-slate-900" : "text-cyan-300"
                  }`}
                >
                  {project.metrics[0]?.value}
                </span>
                <span
                  className={`text-[10px] leading-tight ${
                    !mImpactOn ? "text-slate-500" : "text-white/90"
                  }`}
                >
                  {project.metrics[0]?.label}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Switch Pill 5: Retrospective */}
        <section
          id="m-proj-learnings"
          role="switch"
          aria-checked={mLearningsOn}
          tabIndex={0}
          onClick={() => {
            setMLearningsOnce(true);
            setMLearningsOn((p) => !p);
          }}
          style={
            {
              "--travel-dist": "calc(100cqw - 100% - 16px)",
            } as React.CSSProperties
          }
          className={`relative w-full aspect-[2/1] rounded-full [container-type:inline-size] border-[2px] transition-all duration-500 overflow-hidden cursor-pointer select-none ${
            !mLearningsOn
              ? "border-white/30 bg-black/25 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,10,30,0.5),_inset_0_1.5px_2px_rgba(255,255,255,0.4)]"
              : "border-white bg-white shadow-[0_20px_50px_rgba(0,10,30,0.35)]"
          }`}
        >
          <div
            className={`absolute top-0 bottom-0 right-3 w-[46%] flex flex-col items-center justify-center text-center px-2 transition-all duration-500 ${
              !mLearningsOn
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8 pointer-events-none"
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
              05 / Learnings
            </span>
            <h2 className="text-base font-bold text-white leading-tight mt-0.5">
              Retrospective
            </h2>
            <span className="text-[10px] text-white/70 mt-1">What we learned</span>
          </div>

          <div
            className={`absolute top-0 bottom-0 left-4 w-[46%] flex flex-col justify-center pr-2 overflow-y-auto [scrollbar-width:none] py-3 transition-all duration-500 ${
              mLearningsOn
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8 pointer-events-none"
            }`}
          >
            <span className="text-[9px] font-bold uppercase tracking-wider text-amber-600">
              Mid-Sprint Pivot
            </span>
            <p className="text-[10px] text-slate-700 leading-snug mt-0.5">
              {project.learnings.whatCausedErrors[0]}
            </p>
          </div>

          <div
            className={`absolute top-2 bottom-2 left-2 h-[calc(100%-16px)] aspect-square rounded-full ${
              !mLearningsOnce
                ? "translate-x-0"
                : mLearningsOn
                ? "bubble-knob-h-in"
                : "bubble-knob-h-out"
            } flex items-center justify-center`}
          >
            <div
              className={`relative w-full h-full rounded-full overflow-hidden flex items-center justify-center p-3 text-center ${
                !mLearningsOn ? "bg-white shadow-lg" : "bg-[#0b2847] border border-white/30"
              }`}
            >
              {mLearningsOn && (
                <VantaKnobWaves
                  color={0x0b2847}
                  shininess={30.0}
                  waveHeight={20.0}
                  waveSpeed={0.75}
                  zoom={0.65}
                />
              )}
              {mLearningsOn && project.learnings.pivotImage ? (
                <div className="relative z-10 w-full h-full">
                  <Image
                    src={project.learnings.pivotImage}
                    alt="Wireframes and Pivot"
                    fill
                    unoptimized
                    className="object-contain p-2"
                  />
                </div>
              ) : (
                <div className="relative z-10 flex flex-col items-center justify-center px-2">
                  <span
                    className={`text-xs font-extrabold ${
                      !mLearningsOn ? "text-slate-900" : "text-amber-300"
                    }`}
                  >
                    ✓ / !
                  </span>
                  <span
                    className={`text-[10px] mt-0.5 leading-tight ${
                      !mLearningsOn ? "text-slate-500" : "text-white/90"
                    }`}
                  >
                    Behind the scenes
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Mobile Switch Pill 6: Next Project */}
        <section
          id="m-proj-next"
          role="switch"
          aria-checked={mNextOn}
          tabIndex={0}
          onClick={() => {
            setMNextOnce(true);
            setMNextOn((p) => !p);
          }}
          style={
            {
              "--travel-dist": "calc(100cqw - 100% - 16px)",
            } as React.CSSProperties
          }
          className={`relative w-full aspect-[2/1] rounded-full [container-type:inline-size] border-[2px] transition-all duration-500 overflow-hidden cursor-pointer select-none ${
            !mNextOn
              ? "border-white/30 bg-black/25 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,10,30,0.5),_inset_0_1.5px_2px_rgba(255,255,255,0.4)]"
              : "border-white bg-white shadow-[0_20px_50px_rgba(0,10,30,0.35)]"
          }`}
        >
          <div
            className={`absolute top-0 bottom-0 right-3 w-[46%] flex flex-col items-center justify-center text-center px-2 transition-all duration-500 ${
              !mNextOn
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8 pointer-events-none"
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">
              Next Case Study
            </span>
            <h2 className="text-base font-bold text-white leading-tight mt-0.5">
              {project.nextProject.title}
            </h2>
            <span className="text-[10px] text-white/70 mt-1">Tap to open</span>
          </div>

          <div
            className={`absolute top-0 bottom-0 left-4 w-[46%] flex flex-col justify-center gap-1.5 pr-2 py-3 transition-all duration-500 ${
              mNextOn
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8 pointer-events-none"
            }`}
          >
            <h3 className="text-xs font-bold text-slate-900 leading-tight">
              {project.nextProject.title}
            </h3>
            <Link
              href={`/work/${project.nextProject.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-bold w-fit"
            >
              Open Case Study ↗
            </Link>
            <Link
              href="/"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[10px] font-semibold w-fit"
            >
              ← Home
            </Link>
          </div>

          <div
            className={`absolute top-2 bottom-2 left-2 h-[calc(100%-16px)] aspect-square rounded-full ${
              !mNextOnce
                ? "translate-x-0"
                : mNextOn
                ? "bubble-knob-h-in"
                : "bubble-knob-h-out"
            } flex items-center justify-center`}
          >
            <div
              className={`relative w-full h-full rounded-full overflow-hidden flex items-center justify-center p-3 ${
                !mNextOn ? "bg-white shadow-lg" : "bg-[#0b2847] border border-white/30"
              }`}
            >
              {mNextOn && (
                <VantaKnobWaves
                  color={0x0b2847}
                  shininess={30.0}
                  waveHeight={20.0}
                  waveSpeed={0.75}
                  zoom={0.65}
                />
              )}
              <div className="relative z-10 w-full h-full">
                <Image
                  src={project.nextProject.mockup}
                  alt={project.nextProject.title}
                  fill
                  unoptimized
                  className="object-contain p-2"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
