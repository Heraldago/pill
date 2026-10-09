export default function MobileHero() {
  return (
    <section id="mobile-home" className="w-full flex flex-col items-center">
      <div className="w-full flex flex-col items-center select-none gap-0">
        {/* Capsule 1: Saluto */}
        <div className="w-full aspect-[2/1] px-8 sm:px-10 rounded-full bg-white/[0.12] border-[2px] border-white/25 shadow-[0_20px_50px_rgba(0,10,30,0.4),_inset_0_1.5px_2px_rgba(255,255,255,0.45)] flex items-center justify-center text-center relative z-30">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
            Hi, I&apos;m Herald :)
          </h1>
        </div>

        {/* Capsule 2: Missione */}
        <div className="w-full aspect-[2/1] px-8 sm:px-10 rounded-full bg-white/[0.12] border-[2px] border-white/25 shadow-[0_20px_50px_rgba(0,10,30,0.4),_inset_0_1.5px_2px_rgba(255,255,255,0.45)] flex items-center justify-center text-center relative z-20">
          <p className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
            I <span className="font-extrabold text-[#38bdf8] drop-shadow-[0_0_16px_rgba(56,189,248,0.7)]">design</span> digital
            <br />
            products
          </p>
        </div>

        {/* Capsule 3: Scopo */}
        <div className="w-full aspect-[2/1] px-8 sm:px-10 rounded-full bg-white/[0.12] border-[2px] border-white/25 shadow-[0_20px_50px_rgba(0,10,30,0.4),_inset_0_1.5px_2px_rgba(255,255,255,0.45)] flex items-center justify-center text-center relative z-10">
          <p className="text-2xl sm:text-3xl font-medium tracking-tight text-white/95 leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
            that <span className="italic font-serif text-white">help</span> and{" "}
            <span className="italic font-serif text-white">simplify</span>
            <br />
            people&apos;s lives.
          </p>
        </div>
      </div>
    </section>
  );
}
