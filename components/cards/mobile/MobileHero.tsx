"use client";

import { useLiveContent } from "@/contexts/LiveContentContext";

export default function MobileHero() {
  const { content, isEditMode, updateHero } = useLiveContent();
  const { hero, theme } = content;

  const glassStyle = {
    backgroundColor: `rgba(255, 255, 255, ${theme?.glassOpacity ?? 0.12})`,
    borderColor: `rgba(255, 255, 255, ${theme?.borderOpacity ?? 0.25})`,
  };

  return (
    <section id="mobile-home" className="w-full flex flex-col items-center">
      <div className="w-full flex flex-col items-center select-none gap-0">
        {/* Capsule 1: Saluto */}
        <div
          style={glassStyle}
          className="w-full aspect-[2/1] px-8 sm:px-10 rounded-full border-[2px] shadow-[0_20px_50px_rgba(0,10,30,0.4),_inset_0_1.5px_2px_rgba(255,255,255,0.45)] flex items-center justify-center text-center relative z-30"
        >
          <h1
            contentEditable={isEditMode}
            suppressContentEditableWarning
            onBlur={(e) => updateHero({ greeting: e.currentTarget.textContent || "" })}
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight ${
              isEditMode ? "hover:outline hover:outline-dashed hover:outline-cyan-400/50 rounded px-2 cursor-text" : ""
            }`}
          >
            {hero.greeting}
          </h1>
        </div>

        {/* Capsule 2: Missione */}
        <div
          style={glassStyle}
          className="w-full aspect-[2/1] px-8 sm:px-10 rounded-full border-[2px] shadow-[0_20px_50px_rgba(0,10,30,0.4),_inset_0_1.5px_2px_rgba(255,255,255,0.45)] flex items-center justify-center text-center relative z-20"
        >
          <p className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
            <span>{hero.prefix}</span>
            <span className="font-extrabold text-[#38bdf8]">{hero.highlight1}</span>
            <span>{hero.middle}</span>
          </p>
        </div>

        {/* Capsule 3: Scopo */}
        <div
          style={glassStyle}
          className="w-full aspect-[2/1] px-8 sm:px-10 rounded-full border-[2px] shadow-[0_20px_50px_rgba(0,10,30,0.4),_inset_0_1.5px_2px_rgba(255,255,255,0.45)] flex items-center justify-center text-center relative z-10"
        >
          <p className="text-2xl sm:text-3xl font-medium tracking-tight text-white/95 leading-tight">
            <span>that </span>
            <span className="italic font-serif text-white">{hero.highlight2}</span>
            <span>{hero.conjunction}</span>
            <span className="italic font-serif text-white">{hero.highlight3}</span>
            <br />
            <span>{hero.suffix.trim()}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
