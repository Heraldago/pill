"use client";

import { Ref, useRef, useState } from "react";
import VantaKnobWaves from "@/components/VantaKnobWaves";
import { CONTACT_DATA } from "@/data/portfolio";

interface ContactCardProps {
  ref?: Ref<HTMLDivElement>;
}

export default function ContactCard({ ref }: ContactCardProps) {
  const [toggleState, setToggleState] = useState<"off" | "on">("off");
  const [hasToggledOnce, setHasToggledOnce] = useState(false);
  const touchStartYRef = useRef<number | null>(null);

  // Form & Clipboard state (isolato localmente, non re-renderizza l'intera pagina!)
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(CONTACT_DATA.email).then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    const mailtoSubject = encodeURIComponent(`Portfolio inquiry from ${contactName}`);
    const mailtoBody = encodeURIComponent(`Name: ${contactName}\nEmail: ${contactEmail}\n\nMessage:\n${contactMessage}`);
    window.location.href = `mailto:${CONTACT_DATA.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
    setContactSubmitted(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartYRef.current === null) return;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;
    touchStartYRef.current = null;
    if (deltaY > 35) {
      setHasToggledOnce(true);
      setToggleState("on");
    } else if (deltaY < -35) {
      setHasToggledOnce(true);
      setToggleState("off");
    }
  };

  const handleToggle = () => {
    setHasToggledOnce(true);
    setToggleState((prev) => (prev === "off" ? "on" : "off"));
  };

  const isToggledOn = toggleState === "on";

  return (
    <div
      ref={ref}
      className="capsule-card-wrapper absolute inset-0 w-full h-full flex items-center justify-center p-2.5 sm:p-4 md:p-0 z-[45] will-change-transform"
    >
      <section
        className={`capsule-card-section relative w-full h-full rounded-[32px] sm:rounded-[48px] md:rounded-[1000px] border-[2px] sm:border-[3px] transition-all duration-500 overflow-hidden flex items-center justify-center p-0 ${
          !isToggledOn
            ? "border-white/25 bg-transparent shadow-[0_25px_65px_rgba(0,10,30,0.45),_inset_0_1.5px_2px_rgba(255,255,255,0.45)]"
            : "border-white bg-white shadow-[0_25px_65px_rgba(0,10,30,0.35)]"
        }`}
      >
        <div
          role="switch"
          aria-checked={isToggledOn}
          tabIndex={0}
          aria-label={
            !isToggledOn
              ? "Attiva canali di contatto"
              : "Torna alla copertina dei contatti"
          }
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={handleToggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleToggle();
            }
          }}
          style={
            {
              "--knob-pad": "clamp(8px, 1.6cqw, 18px)",
              "--travel-dist": "calc(100cqw - 100% - 2 * var(--knob-pad))",
            } as React.CSSProperties
          }
          className={`group relative w-full h-full rounded-[26px] sm:rounded-[40px] md:rounded-[1000px] [container-type:inline-size] cursor-pointer select-none overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.988] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 ${
            !isToggledOn
              ? "bg-black/20 backdrop-blur-md shadow-[inset_0_4px_24px_rgba(0,10,30,0.5),_inset_0_1px_2px_rgba(255,255,255,0.2)]"
              : "bg-white shadow-none"
          }`}
        >
          {/* 1. STATO ATTIVO (ON): Dettagli a Sinistra */}
          <div
            className={`absolute top-0 left-[5%] w-[44%] h-full flex flex-col justify-center px-4 sm:px-6 md:px-0 space-y-1.5 sm:space-y-2 overflow-y-auto [scrollbar-width:none] transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
              isToggledOn
                ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                : "opacity-0 scale-95 -translate-x-12 pointer-events-none"
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
                {copiedEmail ? "Copied!" : CONTACT_DATA.email}
              </button>
              <a
                href={CONTACT_DATA.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-slate-900/10 hover:bg-slate-900/20 active:scale-95 text-slate-900 text-[11px] sm:text-sm font-semibold border border-slate-900/15 backdrop-blur-md transition-all cursor-pointer"
              >
                LinkedIn
              </a>
              <a
                href={CONTACT_DATA.resumePdf}
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

          {/* 2. STATO SPENTO (OFF): Titolo a Destra */}
          <div
            className={`absolute top-0 right-[4%] w-[44%] h-full flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
              !isToggledOn
                ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                : "opacity-0 scale-75 translate-x-12 pointer-events-none"
            }`}
          >
            <div className="flex flex-col items-center justify-center text-center px-4 max-w-lg select-none pointer-events-none">
              <h3 className="text-[clamp(1.5rem,3.8cqw,3.75rem)] font-bold tracking-tight text-white/95 group-hover:text-white transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                Contact
              </h3>
            </div>
          </div>

          {/* 3. IL KNOB DEL TOGGLE: Icone Fluttuanti Perfettamente Circolare */}
          <div
            className={`absolute top-[var(--knob-pad)] bottom-[var(--knob-pad)] left-[var(--knob-pad)] h-[calc(100%-2*var(--knob-pad))] aspect-square w-auto rounded-full overflow-visible ${
              !hasToggledOnce
                ? "translate-x-0"
                : isToggledOn
                ? "bubble-knob-in"
                : "bubble-knob-out"
            } flex items-center justify-center select-none`}
          >
            <div
              className={`relative w-full h-full rounded-full overflow-hidden flex items-center justify-center p-3 sm:p-5 md:p-6 transition-all duration-300 ease-out cursor-pointer ${
                !isToggledOn
                  ? "bg-white shadow-[0_16px_40px_rgba(0,0,0,0.35),_0_2px_6px_rgba(0,0,0,0.12),_inset_0_1px_2px_rgba(255,255,255,0.95)] hover:scale-[1.025] hover:shadow-[0_24px_55px_rgba(0,0,0,0.45)] active:scale-[0.98]"
                  : "bg-[#0b2847] border border-white/30 shadow-[0_20px_50px_rgba(0,18,36,0.45),_0_2px_6px_rgba(0,10,25,0.2),_inset_0_1px_2px_rgba(255,255,255,0.35)] hover:scale-[1.015] active:scale-[0.98]"
              }`}
            >
              {isToggledOn && (
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
                {/* 1. Icona Fluttuante: Mail */}
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
                      !isToggledOn
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

                {/* 2. Icona Fluttuante: LinkedIn */}
                <a
                  href={CONTACT_DATA.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  title="LinkedIn"
                  className="animate-float-2 absolute top-[36%] right-[16%] sm:right-[20%] cursor-pointer z-20 pointer-events-auto transition-transform duration-300 hover:scale-115 active:scale-90"
                >
                  <svg
                    className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 fill-current transition-all duration-300 ${
                      !isToggledOn
                        ? "text-slate-800 hover:text-[#0077b5] drop-shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
                        : "text-white hover:text-sky-200 drop-shadow-[0_10px_30px_rgba(255,255,255,0.5)]"
                    }`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>

                {/* 3. Icona Fluttuante: Resume */}
                <a
                  href={CONTACT_DATA.resumePdf}
                  target="_blank"
                  download
                  onClick={(e) => e.stopPropagation()}
                  title="Resume PDF"
                  className="animate-float-3 absolute bottom-[16%] left-[26%] sm:left-[30%] cursor-pointer z-20 pointer-events-auto transition-transform duration-300 hover:scale-115 active:scale-90"
                >
                  <svg
                    className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 transition-all duration-300 ${
                      !isToggledOn
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
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
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
  );
}
