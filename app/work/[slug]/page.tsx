import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PROJECT_DETAILS, ProjectDetail } from "@/data/caseStudiesData";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(PROJECT_DETAILS).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECT_DETAILS[slug];
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} · Case Study · Herald Ago`,
    description: project.tagline,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project: ProjectDetail | undefined = PROJECT_DETAILS[slug];

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#091b2e] text-white selection:bg-cyan-400 selection:text-slate-900 overflow-x-hidden">
      {/* Dynamic Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="absolute top-[40%] -left-[10%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[130px]" />
        <div className="absolute bottom-[10%] -right-[10%] w-[700px] h-[700px] rounded-full bg-sky-500/10 blur-[150px]" />
      </div>

      {/* Top Floating Navigation Bar */}
      <header className="sticky top-4 sm:top-6 z-50 px-4 sm:px-8 max-w-6xl mx-auto">
        <nav className="w-full flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-slate-900/70 backdrop-blur-2xl border border-white/20 shadow-[0_10px_35px_rgba(0,10,30,0.5),_inset_0_1px_1px_rgba(255,255,255,0.3)]">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/85 hover:text-white transition-colors group cursor-pointer"
          >
            <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs group-hover:-translate-x-0.5 transition-transform">
              ←
            </span>
            <span className="hidden sm:inline">Torna a Portfolio</span>
            <span className="sm:hidden">Home</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-cyan-400/15 border border-cyan-400/30 text-cyan-200">
              {project.badge}
            </span>
          </div>

          <Link
            href={`/work/${project.nextProject.slug}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white text-slate-950 hover:bg-cyan-50 transition-colors shadow-xs group cursor-pointer"
          >
            <span className="hidden sm:inline">Prossimo Progetto</span>
            <span className="sm:hidden">Next</span>
            <span className="group-hover:translate-x-0.5 transition-transform">↗</span>
          </Link>
        </nav>
      </header>

      {/* Main Content Container */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-24 space-y-12 sm:space-y-16">
        {/* --- 1. HERO CAPSULE --- */}
        <section className="relative w-full rounded-[36px] sm:rounded-[56px] border-[2px] border-white/20 bg-white/[0.08] backdrop-blur-2xl p-6 sm:p-12 shadow-[0_25px_65px_rgba(0,10,30,0.5),_inset_0_1.5px_2px_rgba(255,255,255,0.4)] overflow-hidden">
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-cyan-200/90 font-medium">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15">
                {project.year}
              </span>
              <span>·</span>
              <span>{project.role}</span>
              <span>·</span>
              <span className="text-white/70">{project.client}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {project.title}
            </h1>

            <p className="text-base sm:text-xl text-slate-300 font-normal max-w-3xl leading-relaxed">
              {project.summary}
            </p>

            {/* Quick Meta Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.05] border border-white/10">
                <span className="text-[10px] sm:text-xs text-white/50 block font-medium uppercase tracking-wider">
                  Timeline
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white mt-0.5 block">
                  {project.timeline}
                </span>
              </div>
              <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.05] border border-white/10 col-span-1 sm:col-span-2">
                <span className="text-[10px] sm:text-xs text-white/50 block font-medium uppercase tracking-wider">
                  Team &amp; Ruoli
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white mt-0.5 block truncate">
                  {project.team}
                </span>
              </div>
              <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.05] border border-white/10">
                <span className="text-[10px] sm:text-xs text-white/50 block font-medium uppercase tracking-wider">
                  Output
                </span>
                <span className="text-xs sm:text-sm font-semibold text-cyan-300 mt-0.5 block">
                  Web &amp; Mobile UI
                </span>
              </div>
            </div>

            {/* Hero Mockup Showcase */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[1.8/1] mt-6 sm:mt-8 rounded-[28px] sm:rounded-[44px] bg-gradient-to-b from-white/10 via-black/20 to-black/40 border border-white/20 overflow-hidden flex items-center justify-center shadow-inner">
              <Image
                src={project.heroMockup}
                alt={`${project.title} Mockup Preview`}
                fill
                priority
                unoptimized
                className={`object-contain ${project.mockupPadding ?? "p-4 sm:p-8"}`}
              />
            </div>
          </div>
        </section>

        {/* --- 2. COSA È STATO REALIZZATO (DELIVERABLES) --- */}
        <section className="space-y-4">
          <div className="px-2">
            <span className="text-xs font-bold text-cyan-300 tracking-wider uppercase">
              Panoramica &amp; Deliverables
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
              Cosa è stato realizzato
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {project.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-[28px] bg-white/[0.07] border border-white/15 backdrop-blur-xl flex items-start gap-3.5 shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 flex items-center justify-center shrink-0 text-sm font-bold">
                  ✓
                </div>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- 3. IL PROBLEMA --- */}
        <section className="rounded-[36px] sm:rounded-[48px] border-[2px] border-white/15 bg-white/[0.06] backdrop-blur-2xl p-6 sm:p-10 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-rose-300 tracking-wider uppercase">
              La Sfida Iniziale
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {project.problem.headline}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
              {project.problem.description}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <span className="text-xs font-semibold text-white/60 uppercase tracking-wider block">
              Punti critici emersi dalla ricerca:
            </span>
            <div className="grid gap-3">
              {project.problem.keyIssues.map((issue, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-black/25 border border-white/10 text-sm text-slate-200"
                >
                  <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    !
                  </span>
                  <span>{issue}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 4. METRICHE STABILITE PER LA RIUSCITA (KPI) --- */}
        <section className="space-y-4">
          <div className="px-2">
            <span className="text-xs font-bold text-cyan-300 tracking-wider uppercase">
              Obiettivi &amp; Risultati Misurabili
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
              Metriche stabilite per la riuscita
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-6 rounded-[32px] bg-gradient-to-b from-white/[0.12] to-white/[0.04] border border-white/20 backdrop-blur-xl space-y-2 shadow-md relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />
                <span className="text-xs font-medium text-slate-300 uppercase tracking-wider block">
                  {metric.label}
                </span>
                <span className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400 block tracking-tight">
                  {metric.value}
                </span>
                <p className="text-xs sm:text-sm text-slate-300/90 leading-snug pt-1">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- 5. PROCESSO & DIVISIONE DEL TEAM --- */}
        <section className="rounded-[36px] sm:rounded-[48px] border-[2px] border-white/15 bg-white/[0.06] backdrop-blur-2xl p-6 sm:p-10 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold text-sky-300 tracking-wider uppercase">
              Metodologia &amp; Collaborazione
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Come lo abbiamo affrontato io e il team
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
              {project.process.description}
            </p>
          </div>

          {/* Divisione del lavoro */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70">
              Come ci siamo divisi il lavoro:
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {project.process.teamDivision.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-black/25 border border-white/10 space-y-2"
                >
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/15 text-white inline-block">
                    {item.members}
                  </span>
                  <h4 className="text-sm font-bold text-cyan-200">{item.role}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.tasks}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Fasi operative */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70">
              Fasi del processo:
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {project.process.phases.map((phase, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      {phase.step}
                    </span>
                    <h4 className="text-sm font-bold text-white">{phase.title}</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 6. IL RISULTATO --- */}
        <section className="rounded-[36px] sm:rounded-[48px] border-[2px] border-white/20 bg-gradient-to-b from-white/[0.12] to-white/[0.05] backdrop-blur-2xl p-6 sm:p-10 space-y-6 shadow-xl">
          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-300 tracking-wider uppercase">
              Impatto &amp; Risultato
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {project.results.headline}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
              {project.results.description}
            </p>
          </div>

          <div className="grid gap-3">
            {project.results.highlights.map((highlight, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/20 text-sm text-emerald-100"
              >
                <span className="text-base font-bold text-emerald-300">★</span>
                <span className="font-medium">{highlight}</span>
              </div>
            ))}
          </div>

          {/* Testimonial Quote if present */}
          {project.results.testimonial && (
            <div className="mt-4 p-6 rounded-3xl bg-black/30 border border-white/15 flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-white/30 shadow-md">
                <Image
                  src={project.results.testimonial.avatar}
                  alt={project.results.testimonial.author}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <p className="text-xs sm:text-sm italic text-slate-200">
                  &ldquo;{project.results.testimonial.quote}&rdquo;
                </p>
                <p className="text-xs font-bold text-white">
                  {project.results.testimonial.author} ·{" "}
                  <span className="text-cyan-300 font-normal">
                    {project.results.testimonial.role}
                  </span>
                </p>
              </div>
            </div>
          )}
        </section>

        {/* --- 7. ERRORI & LEZIONI APPRESE (COSA HA FUNZIONATO VS ERRORI) --- */}
        <section className="space-y-4">
          <div className="px-2">
            <span className="text-xs font-bold text-cyan-300 tracking-wider uppercase">
              Retropettiva &amp; Trasparenza
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
              Cosa ha funzionato vs Cosa ci ha fatto fare errori
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Cosa ha funzionato */}
            <div className="p-6 rounded-[32px] bg-emerald-950/20 border border-emerald-500/30 backdrop-blur-xl space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-sm border border-emerald-400/30">
                  ✓
                </span>
                <h3 className="text-lg font-bold text-emerald-200">Cosa ha funzionato</h3>
              </div>
              <ul className="space-y-3">
                {project.learnings.whatWorked.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed"
                  >
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cosa ci ha fatto fare errori & Come abbiamo risolto */}
            <div className="p-6 rounded-[32px] bg-amber-950/20 border border-amber-500/30 backdrop-blur-xl space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-sm border border-amber-400/30">
                  !
                </span>
                <h3 className="text-lg font-bold text-amber-200">Errori &amp; Sfide superate</h3>
              </div>
              <ul className="space-y-3">
                {project.learnings.whatCausedErrors.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed"
                  >
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* --- 8. LINK FINALI & PASSA AL PROSSIMO PROGETTO (PILL TOGGLE) --- */}
        <section className="pt-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-[32px] bg-white/[0.06] border border-white/15">
            <div>
              <h3 className="text-base font-bold text-white">Vuoi esplorare altro?</h3>
              <p className="text-xs text-slate-300">
                Torna al portfolio completo oppure passa direttamente al prossimo case study.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/#work"
                className="px-4 py-2 rounded-full text-xs font-semibold bg-white/15 hover:bg-white/25 border border-white/20 text-white transition-all cursor-pointer"
              >
                Tutti i progetti
              </Link>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full text-xs font-semibold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all shadow-sm cursor-pointer"
                >
                  Sito Ufficiale ↗
                </a>
              )}
            </div>
          </div>

          {/* NEXT PROJECT HERO PILL */}
          <Link
            href={`/work/${project.nextProject.slug}`}
            className="group block relative w-full rounded-[36px] sm:rounded-[56px] border-[2px] border-white/25 bg-gradient-to-r from-white/[0.12] via-white/[0.08] to-cyan-500/[0.12] backdrop-blur-2xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,10,30,0.45)] hover:border-white/50 hover:shadow-[0_25px_60px_rgba(0,212,255,0.25)] transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center sm:text-left">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/15 border border-white/25 text-cyan-200">
                  Prossimo Progetto ↗
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white group-hover:text-cyan-200 transition-colors">
                  {project.nextProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md">
                  {project.nextProject.tagline}
                </p>
              </div>

              <div className="relative w-40 h-24 sm:w-56 sm:h-32 rounded-2xl bg-black/30 border border-white/20 overflow-hidden flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={project.nextProject.mockup}
                  alt={project.nextProject.title}
                  fill
                  unoptimized
                  className="object-contain p-2"
                />
              </div>
            </div>
          </Link>
        </section>
      </main>
    </div>
  );
}
