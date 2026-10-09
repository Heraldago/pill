"use client";

import { SECTIONS } from "@/data/portfolio";

interface ScrollSpyNavProps {
  activeIndex: number;
  onNavigate: (index: number) => void;
}

export default function ScrollSpyNav({ activeIndex, onNavigate }: ScrollSpyNavProps) {
  return (
    <aside
      aria-label="Navigazione sezioni"
      className="hidden md:flex fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex-col items-center"
    >
      <div className="bg-white/15 backdrop-blur-2xl border border-white/25 shadow-[0_8px_32px_rgba(0,0,0,0.3),_inset_0_1px_1px_rgba(255,255,255,0.3)] px-1.5 py-2.5 rounded-full flex flex-col items-center gap-2">
        {SECTIONS.map((section, idx) => {
          const isActive = activeIndex === idx;
          return (
            <div key={section.id} className="relative group flex items-center">
              {/* Tooltip minimale all'hover */}
              <div className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-3 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-200 ease-out whitespace-nowrap bg-slate-900/90 text-white backdrop-blur-md px-3 py-1 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.3)] border border-white/20 text-xs font-medium tracking-normal select-none">
                {section.label}
              </div>

              {/* Indicatore interattivo */}
              <button
                onClick={() => onNavigate(idx)}
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
  );
}
