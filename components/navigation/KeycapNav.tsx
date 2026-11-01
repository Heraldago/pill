"use client";

import { useEffect, useState } from "react";

interface KeycapNavProps {
  activeIndex: number;
  totalSections: number;
  onNavigateNext: () => void;
  onNavigatePrev: () => void;
  onToggleOn: () => void;
  onToggleOff: () => void;
  currentToggleState?: "off" | "on" | null; // null if section doesn't have toggle (e.g. Hero)
}

export default function KeycapNav({
  activeIndex,
  totalSections,
  onNavigateNext,
  onNavigatePrev,
  onToggleOn,
  onToggleOff,
  currentToggleState,
}: KeycapNavProps) {
  const [activeKey, setActiveKey] = useState<"up" | "down" | "left" | "right" | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable
      ) {
        return;
      }

      if (e.key === "ArrowUp") {
        setActiveKey("up");
      } else if (e.key === "ArrowDown") {
        setActiveKey("down");
      } else if (e.key === "ArrowLeft") {
        setActiveKey("left");
      } else if (e.key === "ArrowRight") {
        setActiveKey("right");
      }
    };

    const handleKeyUp = () => {
      setActiveKey(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const canGoUp = activeIndex > 0;
  const canGoDown = activeIndex < totalSections - 1;
  const hasToggle = currentToggleState !== null && currentToggleState !== undefined;
  const canToggleOn = hasToggle && currentToggleState === "off";
  const canToggleOff = hasToggle && currentToggleState === "on";

  // Glass circular pebble key buttons matching the site's pill knob language
  const renderKey = (
    direction: "up" | "down" | "left" | "right",
    label: string,
    enabled: boolean,
    onClick: () => void
  ) => {
    const isPressed = activeKey === direction;

    return (
      <button
        type="button"
        aria-label={label}
        disabled={!enabled}
        onClick={onClick}
        className={`group relative w-8.5 h-8.5 rounded-full flex items-center justify-center transition-all duration-200 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 backdrop-blur-xl ${
          enabled
            ? "bg-white/[0.08] hover:bg-white/[0.2] border border-white/20 text-white shadow-[0_6px_20px_rgba(0,10,30,0.35),_inset_0_1px_1.5px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-90"
            : "bg-white/[0.02] border border-white/10 text-white/25 cursor-not-allowed opacity-35"
        } ${
          isPressed && enabled
            ? "scale-90 bg-white text-slate-950 border-white shadow-[0_0_20px_rgba(255,255,255,0.85)] !opacity-100"
            : ""
        }`}
      >
        {direction === "up" && (
          <svg
            className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        )}
        {direction === "down" && (
          <svg
            className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        )}
        {direction === "left" && (
          <svg
            className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        )}
        {direction === "right" && (
          <svg
            className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        )}
      </button>
    );
  };

  return (
    <aside
      aria-label="Navigation keys"
      className="hidden md:flex fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 pointer-events-auto flex-col items-center gap-1.5 select-none"
    >
      {/* Row 1: Arrow Up centered */}
      <div className="flex justify-center">
        {renderKey("up", "Previous section (Up Arrow)", canGoUp, onNavigatePrev)}
      </div>

      {/* Row 2: Left, Down, Right in keyboard T-cluster */}
      <div className="flex items-center gap-1.5">
        {renderKey("left", "Close pill details (Left Arrow)", canToggleOff, onToggleOff)}
        {renderKey("down", "Next section (Down Arrow)", canGoDown, onNavigateNext)}
        {renderKey("right", "Open pill details (Right Arrow)", canToggleOn, onToggleOn)}
      </div>
    </aside>
  );
}
