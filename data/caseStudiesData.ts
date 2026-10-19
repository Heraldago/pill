export interface ProjectMetric {
  label: string;
  value: string;
  description: string;
}

export interface ProjectDecisionOption {
  id: string;
  title: string;
  tag: string;
  chosen: boolean;
  constraint: string;
  outcome: string;
  image?: string;
  imageCaption?: string;
}

export interface ProjectPrototypeStep {
  title: string;
  badge: string;
  description: string;
  image: string;
}

export interface ProjectDetail {
  slug: string;
  title: string;
  tagline: string;
  badge: string;
  year: string;
  role: string;
  client: string;
  timeline: string;
  team: string;
  tools?: string[];
  liveUrl?: string;
  heroMockup: string;
  mockupPadding?: string;
  summary: string;
  deliverables: string[];
  problem: {
    headline: string;
    description: string;
    keyIssues: string[];
    beforeImage?: string;
    beforeLabel?: string;
    afterImage?: string;
    afterLabel?: string;
  };
  decisions: {
    headline: string;
    description: string;
    options: ProjectDecisionOption[];
  };
  prototypeSteps?: ProjectPrototypeStep[];
  metrics: ProjectMetric[];
  process: {
    headline: string;
    description: string;
    teamDivision: {
      role: string;
      members: string;
      tasks: string;
    }[];
    phases: {
      step: string;
      title: string;
      description: string;
      image?: string;
      imageCaption?: string;
    }[];
  };
  results: {
    headline: string;
    description: string;
    highlights: string[];
    testimonial?: {
      quote: string;
      author: string;
      role: string;
      avatar: string;
      teamPhoto?: string;
    };
  };
  learnings: {
    whatWorked: string[];
    whatCausedErrors: string[];
    pivotImage?: string;
    pivotCaption?: string;
  };
  nextProject: {
    slug: string;
    title: string;
    badge: string;
    tagline: string;
    mockup: string;
  };
}

export const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  ungdomskort: {
    slug: "ungdomskort",
    title: "Ungdomskort",
    tagline: "National Danish Student Travel Pass Overhaul.",
    badge: "Public Transit UX & Accessibility",
    year: "2024",
    role: "Lead Product Designer & Accessibility Engineer",
    client: "Ungdomskort.dk / næmt.nu",
    timeline: "4 Months",
    team: "Herald Ago (Lead Product Designer), Sebastian (Stakeholder Lead), Frontend & QA Team",
    tools: ["Figma", "HTML5", "WCAG 2.2 Audit", "Miro"],
    liveUrl: "https://www.ungdomskort.dk",
    heroMockup: "/ungheromockup.svg",
    mockupPadding: "p-4 sm:p-8",
    summary:
      "Mobile-first redesign of Ungdomskort.dk and its companion student transit pass flow. Re-architected a fragmented 7-stage verification and payment funnel into an intuitive 3-step wizard, introduced automated 7-day renewal alerts, and established a WCAG 2.2 AA compliant tokenized design system.",
    deliverables: [
      "WCAG 2.2 AA Tokenized Design System (7:1 outdoor contrast ratio)",
      "3-Step Application & Renewal Wizard with MitID Single Sign-On",
      "Digital Student Transit Pass with Live QR & Offline Caching",
      "Automated 7-Day Calendar & Push Notification Renewal System",
    ],
    problem: {
      headline: "Extreme cognitive friction and WCAG failures across a 7-stage transit pass funnel",
      description:
        "Danish students faced high cognitive friction and transaction drop-off when applying for and renewing their national transport pass. Auditing the legacy platform against Nielsen Norman Group heuristics and WCAG 2.2 revealed 14 critical usability blockers, while 78% of students attempted renewals on smartphones while commuting.",
      keyIssues: [
        "14 critical WCAG 2.1/2.2 accessibility blockers, including broken color contrast ratios and hidden keyboard tab focus indicators.",
        "Fragmented 7-stage verification and payment funnel causing high student drop-off during peak semester starts.",
        "Broken mobile layouts and ambiguous payment guidance despite 78% of students renewing passes on smartphones in transit.",
      ],
      beforeImage: "/assets/ung-step1-original-hd.png",
      beforeLabel: "Legacy Portal (Before): Cluttered desktop-only hierarchy & low contrast",
      afterImage: "/assets/ungscreen-web-calendar.png",
      afterLabel: "Redesigned Portal (After): 3-step wizard with 7:1 WCAG AA contrast",
    },
    decisions: {
      headline: "Consolidating a 7-stage government funnel into a 3-step accessible wizard",
      description:
        "To eliminate checkout drop-off while preserving strict Danish transport authority validation, we tested three iterative architectures from early wireframes to high-contrast production UI.",
      options: [
        {
          id: "opt-a",
          title: "Iteration V1: Single-Page Form & Manual Entry",
          tag: "Rejected",
          chosen: false,
          constraint: "Low backend refactoring cost, but dense vertical scroll and manual route entry on mobile viewports.",
          outcome: "Usability testing showed high cognitive load: commuting students struggled with manual tariff zone codes and dense legal blocks.",
          image: "/assets/ung-step2-v1-hd.png",
          imageCaption: "Iteration V1: Early structural cleanup, still too dense for mobile commuters",
        },
        {
          id: "opt-b",
          title: "Iteration V2: Multi-Tab Portal Without Smart Alerts",
          tag: "Iterated",
          chosen: false,
          constraint: "Improved visual hierarchy, but still required students to manually track 30-day pass expirations.",
          outcome: "Solved layout legibility, yet student interviews revealed accidental pass expiration remained a top source of transit fines.",
          image: "/assets/ung-step3-v2-hd.png",
          imageCaption: "Iteration V2: Refined visual hierarchy prior to automated renewal integration",
        },
        {
          id: "opt-c",
          title: "Final: 3-Step MitID Wizard + 7-Day Smart Alerts",
          tag: "Selected",
          chosen: true,
          constraint: "Required real-time MitID SSO handoff, automated route tariff lookup, and proactive SMS/push renewal triggers.",
          outcome: "Cut checkout friction by 45%, achieved 100% WCAG 2.2 AA compliance, and reached a 92% positive mobile usability score.",
          image: "/assets/ungscreen-web-calendar.png",
          imageCaption: "Final Production UI: 3-step wizard, MobilePay checkout & calendar sync",
        },
      ],
    },
    prototypeSteps: [
      {
        title: "1. MitID Authentication",
        badge: "Single Sign-On",
        description: "Streamlined identity verification via Danish MitID with automatic student eligibility lookup.",
        image: "/assets/ungscreen-login.png",
      },
      {
        title: "2. Zone & Route Selector",
        badge: "Smart Tariff Engine",
        description: "Automated campus-to-home route mapping that calculates transit zones without manual map decoding.",
        image: "/assets/ungscreen-search.jpg",
      },
      {
        title: "3. Calendar & MobilePay",
        badge: "Frictionless Renewal",
        description: "Visual validity period picker with instant price breakdown and 1-tap MobilePay checkout.",
        image: "/assets/ungscreen-web-calendar.png",
      },
      {
        title: "4. Active Digital Pass",
        badge: "Offline-Ready QR",
        description: "High-contrast digital pass with live animated inspection QR code and offline ticket caching.",
        image: "/assets/ungscreen-web-card.png",
      },
      {
        title: "5. Smart Renewal Hub",
        badge: "7-Day Proactive Alerts",
        description: "Automated push and SMS reminders 7 days before expiration so students never ride with an expired pass.",
        image: "/assets/ungscreen-notifications.jpg",
      },
    ],
    metrics: [
      {
        label: "WCAG Compliance",
        value: "100%",
        description: "Full AA compliance verified with axe-core & manual screen reader audits.",
      },
      {
        label: "Checkout Friction",
        value: "-45%",
        description: "Reduction in user step completion times during pass renewal.",
      },
      {
        label: "Mobile Usability",
        value: "+92%",
        description: "Positive feedback rating from 18-25 year old Danish student cohort.",
      },
    ],
    process: {
      headline: "From NN/g heuristic audits and commuter research to a WCAG 2.2 AA design system",
      description:
        "Executed across 5 structured phases combining empirical research with Danish students, information architecture simplification, and rigorous assistive technology verification.",
      teamDivision: [
        {
          role: "Lead Product Designer & A11y",
          members: "Herald Ago",
          tasks:
            "NN/g heuristic audit, WCAG 2.2 remediation, student interviews, IA restructuring, Figma token system & interactive prototyping.",
        },
        {
          role: "Product & Stakeholder Lead",
          members: "Sebastian (næmt.nu)",
          tasks:
            "Cross-stakeholder alignment, Danish transit compliance requirements, and milestone validation.",
        },
        {
          role: "Engineering & QA",
          members: "Frontend & Accessibility QA",
          tasks:
            "HTML5 semantic implementation, keyboard focus trap resolution, VoiceOver & axe-core verification.",
        },
      ],
      phases: [
        {
          step: "01",
          title: "Heuristic & WCAG 2.2 Audit",
          description:
            "Audited the legacy platform against Nielsen Norman Group heuristics and WCAG 2.2, identifying 14 critical blockers including broken contrast and hidden focus states.",
          image: "/assets/ungcompetitive-analysis.jpg",
          imageCaption: "Competitive & Heuristic Benchmark (Rejsekort, DSB, DOT)",
        },
        {
          step: "02",
          title: "Empirical Student Research",
          description:
            "Conducted contextual inquiries and interviews with Danish students, discovering 78% attempt renewals on smartphones while actively commuting.",
          image: "/assets/ungpersona-1.jpg",
          imageCaption: "Primary Student Commuter Persona & Pain Points",
        },
        {
          step: "03",
          title: "IA & Flow Simplification",
          description:
            "Collapsed a 7-stage verification and payment funnel into an intuitive 3-stage visual progress tracker, eliminating redundant form inputs.",
          image: "/assets/unguser-flow.jpg",
          imageCaption: "Simplified 3-Stage Transit Verification & Payment Flow",
        },
        {
          step: "04",
          title: "Accessible Design Tokens",
          description:
            "Built high-contrast UI tokens in Figma exceeding 7:1 contrast ratios for outdoor mobile readability under direct sunlight.",
          image: "/assets/ungcolors.jpg",
          imageCaption: "WCAG 2.2 AA/AAA Color & Typography Token System",
        },
        {
          step: "05",
          title: "Prototyping & Screen Reader QA",
          description:
            "Validated interactive flows for keyboard focus order, VoiceOver announcements, and dynamic text resizing up to 200%.",
          image: "/assets/ungtypography.jpg",
          imageCaption: "Scalable Typography & Assistive Tech Verification",
        },
      ],
    },
    results: {
      headline: "An accessible, frictionless public transit experience for Danish students",
      description:
        "The redesigned Ungdomskort platform eliminated critical accessibility barriers and streamlined mobile renewals, earning praise from both student commuters and project stakeholders.",
      highlights: [
        "100% WCAG 2.2 AA compliance verified via automated axe-core checks and manual screen reader testing.",
        "45% faster pass application and renewal completion time across mobile and desktop viewports.",
        "92% positive usability rating from the 18-25 year old Danish student validation cohort.",
      ],
      testimonial: {
        quote:
          "Herald excelled at cross-stakeholder collaboration, guiding the entire creation process from start to finish with great precision and genuine passion.",
        author: "Sebastian",
        role: "CEO, næmt.nu",
        avatar: "/sebastian-avatar.jpg",
        teamPhoto: "/herald-sebastian-team.jpg",
      },
    },
    learnings: {
      whatWorked: [
        "Engineering a 7:1 high-contrast token system at the start prevented accessibility regressions and improved outdoor smartphone legibility for commuters.",
        "Replacing manual zone selection with automated campus-to-home route lookup eliminated the most error-prone step in the legacy funnel.",
        "Proactive 7-day renewal notifications directly solved accidental pass lapses discovered during student interviews.",
      ],
      whatCausedErrors: [
        "Our first iteration (V1) tried to fit the entire renewal onto a single scrolling view, which still overwhelmed mobile users in transit; testing led us to pivot to a chunked 3-step wizard.",
        "Early secondary accent colors failed 4.5:1 contrast on translucent surfaces, prompting a systematic overhaul to strict WCAG 2.2 AA/AAA surface tokens.",
      ],
      pivotImage: "/assets/ungwireframes.jpg",
      pivotCaption: "From early dense wireframes to the chunked 3-step mobile wizard",
    },
    nextProject: {
      slug: "xbit",
      title: "X-Bit",
      badge: "Museum Exploration",
      tagline: "Museum exploration and interactive audio guide platform.",
      mockup: "/xbitheromockup.svg",
    },
  },

  xbit: {
    slug: "xbit",
    title: "X-Bit",
    tagline: "Museum exploration and interactive audio guide platform.",
    badge: "Culture & Interactive EdTech",
    year: "2023",
    role: "UI/UX Designer & Creative Technologist",
    client: "X-Bit Heritage Foundation",
    timeline: "3 Mesi",
    team: "Herald Ago (Lead Designer), 1 Curatore Museale, 1 Mobile Developer, 1 Sound Designer",
    liveUrl: "https://www.xbit-museum.org",
    heroMockup: "/xbitheromockup.svg",
    mockupPadding: "p-4 sm:p-6",
    summary:
      "X-Bit è un'app di esplorazione museale che rivoluziona il concetto di audioguida tradizionale: attraverso la geolocalizzazione indoor a beacon e narrazioni interattive dinamiche, trasforma la visita in una caccia culturale coinvolgente per nativi digitali.",
    deliverables: [
      "Interfaccia Mobile iOS & Android con tema dark preserva-batteria per ambienti museali",
      "Mappa interattiva indoor delle sale con indicazione di prossimità in tempo reale",
      "Player audio contestuale a capitoli con trascrizioni sincronizzate e modelli 3D",
      "Dashboard per curatori per aggiornare percorsi tematici e mostre temporanee in pochi clic",
    ],
    problem: {
      headline: "Le audioguide fisiche non coinvolgono i giovani e creano costi di manutenzione proibitivi",
      description:
        "I visitatori sotto i 35 anni saltavano regolarmente le audioguide hardware a noleggio per via di dispositivi igienicamente dubbi, cuffie scomode e monologhi accademici noiosi. Il museo riscontrava un tempo medio di permanenza nelle sale inferiore a 25 minuti.",
      keyIssues: [
        "Meno del 12% dei visitatori giovani noleggiava i dispositivi tradizionali all'ingresso.",
        "Dispersione nelle sale: i visitatori perdevano i capolavori principali non seguendo la numerazione fisica.",
        "Costi continui di sanificazione e ricarica delle apparecchiature hardware obsolete.",
      ],
    },
    decisions: {
      headline: "Bilanciare immersione digitale e attenzione visiva verso l'opera d'arte reale",
      description:
        "Il rischio principale di un'app museale è incollare gli occhi del visitatore allo smartphone. Abbiamo testato tre paradigmi di interazione direttamente nelle gallerie.",
      options: [
        {
          id: "opt-a",
          title: "Opzione A: Scansione Manuale QR Code",
          tag: "Scartata",
          chosen: false,
          constraint: "Scarsa illuminazione nelle sale storiche e code davanti alle targhette.",
          outcome: "Interrompeva il flusso emotivo della visita e creava assembramenti vicino alle opere.",
        },
        {
          id: "opt-b",
          title: "Opzione B: Realtà Aumentata 3D Continua",
          tag: "Scartata",
          chosen: false,
          constraint: "Consumo batteria elevato (-35% in 20 minuti) e surriscaldamento del telefono.",
          outcome: "I visitatori guardavano il quadro attraverso la fotocamera invece di osservare i dettagli dal vivo.",
        },
        {
          id: "opt-c",
          title: "Opzione C: Beacon BLE + Controlli Tattili Eyes-Free",
          tag: "Scelta Vincente",
          chosen: true,
          constraint: "Calibrazione fine del segnale Bluetooth per evitare sovrapposizioni tra opere adiacenti.",
          outcome: "Notifica aptica discreta in tasca e player controllabile con il pollice senza distogliere lo sguardo dal dipinto.",
        },
      ],
    },
    metrics: [
      {
        label: "Adozione visitatori",
        value: "+68%",
        description: "Visitatori che hanno utilizzato l'app sul proprio smartphone rispetto all'audioguida fisica.",
      },
      {
        label: "Tempo medio di visita",
        value: "+45 min",
        description: "Permanenza nelle sale passata da 25 a 70 minuti medi.",
      },
      {
        label: "Rating sullo Store",
        value: "4.9 / 5",
        description: "Oltre 1.200 recensioni entusiaste nei primi tre mesi di lancio.",
      },
    ],
    process: {
      headline: "Portare il linguaggio del gaming e delle micro-interazioni nell'ambiente museale",
      description:
        "Abbiamo testato prototipi direttamente nelle sale del museo con gruppi di studenti universitari e famiglie, osservando come lo sguardo si alternava tra schermo e opera d'arte.",
      teamDivision: [
        {
          role: "Lead UI/UX & Motion",
          members: "Herald Ago",
          tasks:
            "Design dei componenti a pillola, interfaccia del player audio, sistema di micro-animazioni e palette ad alto contrasto per sale buie.",
        },
        {
          role: "Curatela & Storytelling",
          members: "Curatore del Museo",
          tasks:
            "Scrittura di mini-storie da 90 secondi ad alto ritmo e selezione dei dettagli nascosti delle opere.",
        },
        {
          role: "Sviluppo & Sound Design",
          members: "Mobile Dev & Sound Designer",
          tasks:
            "Integrazione geofencing Bluetooth Low Energy e produzione di paesaggi sonori binaurali 3D.",
        },
      ],
      phases: [
        {
          step: "01",
          title: "Shadowing nelle Gallerie",
          description:
            "Osservazione non invasiva di oltre 100 visitatori per tracciare percorsi spontanei e punti ciechi delle sale.",
        },
        {
          step: "02",
          title: "Audio-first Wireframing",
          description:
            "Progettazione di controlli che permettessero di ascoltare e gestire la guida senza dover fissare costantemente il display.",
        },
        {
          step: "03",
          title: "Test Beacon sul Campo",
          description:
            "Calibrazione della precisione di prossimità per evitare notifiche audio sovrapposte tra opere vicine.",
        },
        {
          step: "04",
          title: "Lancio & Gamification Card",
          description:
            "Aggiunta di capsule collezionabili di fine percorso condivisibili sui social media.",
        },
      ],
    },
    results: {
      headline: "Un nuovo standard di fruizione culturale premiato da visitatori e critica",
      description:
        "X-Bit ha dimostrato che la tecnologia nel museo non distrae dall'arte, ma fa da lente d'ingrandimento per accendere curiosità e passione.",
      highlights: [
        "Più del 78% dei visitatori ha completato almeno un percorso tematico intero.",
        "Abbattimento del 95% delle spese di manutenzione dei dispositivi hardware noleggiati.",
        "Progetto selezionato tra le migliori innovazioni digitali museali regionali del 2023.",
      ],
    },
    learnings: {
      whatWorked: [
        "I pulsanti oversize a pillola con feedback tattile permettevano il controllo dell'audio tenendo il telefono con una sola mano mentre si guardava l'opera.",
        "Gli aneddoti brevi in formato podcast sono risultati tre volte più ascoltati rispetto alle descrizioni storiche formali.",
      ],
      whatCausedErrors: [
        "Inizialmente avevamo implementato modelli 3D pesanti in realtà aumentata: l'interfaccia si surriscaldava e la batteria si esauriva troppo in fretta. Abbiamo rimosso l'AR a favore di audio immersivo e fotografia ad altissima risoluzione.",
        "Il trigger automatico dell'audio quando ci si avvicinava all'opera creava confusione; abbiamo trasformato l'avvicinamento in un suggerimento visivo delicato con pulsante di play manuale.",
      ],
    },
    nextProject: {
      slug: "pupisiciliani",
      title: "I Pupi Siciliani",
      badge: "E-Commerce & Wine",
      tagline: "Wine retail platform with +187% YoY profit.",
      mockup: "/pupi-mockup.svg",
    },
  },

  pupisiciliani: {
    slug: "pupisiciliani",
    title: "I Pupi Siciliani",
    tagline: "Wine retail platform with +187% YoY profit.",
    badge: "E-Commerce & Luxury Wine",
    year: "2023",
    role: "Lead E-Commerce Designer & Brand Strategist",
    client: "I Pupi Siciliani S.r.l.",
    timeline: "3 Mesi",
    team: "Herald Ago (Lead Designer), Antonio (Founder & Sommelier), 1 Full-Stack Developer",
    liveUrl: "https://www.ipupisiciliani.com",
    heroMockup: "/pupi-mockup.svg",
    mockupPadding: "p-4 sm:p-8",
    summary:
      "I Pupi Siciliani è una boutique enologica d'eccellenza che unisce l'alta tradizione vinicola dell'Etna e della Sicilia a una piattaforma e-commerce sartoriale, pensata per guidare intenditori e neofiti alla scoperta della bottiglia perfetta.",
    deliverables: [
      "Piattaforma E-Commerce Shopify Headless personalizzata con velocità di caricamento fulminea (< 1s)",
      "Sistema di degustazione guidata interattivo 'Wine Sommelier Quiz' a pillola",
      "Schede prodotto sensoriali con note aromatiche, abbinamenti gastronomici e temperatura di servizio",
      "Checkout frictionless a pagina singola con Apple Pay e Klarna integrati",
    ],
    problem: {
      headline: "Un catalogo prestigioso penalizzato da un sito datato e una selezione percepita come troppo complessa",
      description:
        "L'e-commerce precedente soffriva di una grafica generica da template che sminuiva il valore di vini rari da collezione. I clienti non esperti si sentivano intimiditi da descrizioni troppo tecniche e abbandonavano l'acquisto prima del carrello.",
      keyIssues: [
        "Tasso di rimbalzo del 64% sulla pagina catalogo a causa di filtri confusi e scarsa gerarchia visiva.",
        "Il 71% degli ordini era confinato a sole 4 etichette note, lasciando invenduti i vitigni di nicchia più redditizi.",
        "Esperienza di pagamento su mobile disastrosa con 5 schermate lente che facevano crollare le conversioni.",
      ],
    },
    decisions: {
      headline: "Sostituire i filtri tecnici da enoteca con una guida sommelier conversazionale",
      description:
        "Dovevamo aiutare gli acquirenti occasionali a scegliere vini artigianali da 45-120€ senza alienare i collezionisti esperti.",
      options: [
        {
          id: "opt-a",
          title: "Opzione A: Mega-Filtro Tecnico (Vitigno, Altitudine, Tannini)",
          tag: "Scartata",
          chosen: false,
          constraint: "Richiedeva conoscenze da sommelier per orientarsi tra oltre 120 etichette.",
          outcome: "Paralisi decisionale: il 62% degli utenti mobile usciva dopo aver applicato due filtri senza capire la differenza.",
        },
        {
          id: "opt-b",
          title: "Opzione B: Box Abbonamento Mensile a Sorpresa",
          tag: "Scartata",
          chosen: false,
          constraint: "Impegno economico ricorrente troppo alto per il primo acquisto.",
          outcome: "Bassa propensione all'iscrizione senza aver prima provato la qualità della cantina.",
        },
        {
          id: "opt-c",
          title: "Opzione C: Sommelier Quiz in 3 Pillole + Bundle Dinamici",
          tag: "Scelta Vincente",
          chosen: true,
          constraint: "Mappatura manuale di tutte le 120 bottiglie per occasione, piatto e intensità aromatica.",
          outcome: "Completato dal 60% dei visitatori, ha sbloccato la vendita delle etichette ad alto margine (+34% carrello medio).",
        },
      ],
    },
    metrics: [
      {
        label: "Profitto Annuo",
        value: "+187%",
        description: "Crescita netta anno su anno del fatturato generato dal canale online.",
      },
      {
        label: "Valore Carrello Medio",
        value: "+34%",
        description: "Aumento del numero medio di bottiglie per singolo ordine grazie ai suggerimenti intelligenti.",
      },
      {
        label: "Tasso di Conversione",
        value: "4.2%",
        description: "Più che raddoppiato rispetto alla media di settore e-commerce wine (1.8%).",
      },
    ],
    process: {
      headline: "Tradurre il calore e la competenza dell'enoteca fisica in un rituale digitale accogliente",
      description:
        "Abbiamo lavorato a stretto contatto con Antonio per distillare la sua consulenza in negozio in un'interfaccia empatica che parla di sapori, territorio e momenti conviviali anziché di tecnicismi incomprensibili.",
      teamDivision: [
        {
          role: "Design Lead & Brand Identity",
          members: "Herald Ago",
          tasks:
            "Ridisegno dell'identità visiva, UI design e-commerce, architettura informativa, prototipazione Sommelier Quiz e direzione artistica fotografica.",
        },
        {
          role: "Founder & Master Sommelier",
          members: "Antonio",
          tasks:
            "Catalogazione caratteristiche organolettiche di oltre 120 etichette e definizione abbinamenti cibo-vino.",
        },
        {
          role: "Full-Stack Development",
          members: "Full-Stack Engineer",
          tasks:
            "Sviluppo tema custom ad alte prestazioni, sincronizzazione magazzino in tempo reale e checkout avanzato.",
        },
      ],
      phases: [
        {
          step: "01",
          title: "Audit Sensoriale & Posizionamento",
          description:
            "Definizione della palette mediterranea con accenti di terracotta e mare profondo e ridefinizione dei filtri di ricerca per occasione d'uso.",
        },
        {
          step: "02",
          title: "Il Quiz 'Trova il tuo Calice'",
          description:
            "Sviluppo di un percorso interattivo in 3 click a pulsanti pillola per consigliare la bottiglia ideale per cena, regalo o meditazione.",
        },
        {
          step: "03",
          title: "Ottimizzazione Scheda Prodotto",
          description:
            "Sostituzione del testo accademico con diagrammi aromatici intuitivi e consigli dello chef.",
        },
        {
          step: "04",
          title: "Checkout Express a 1 Click",
          description:
            "Integrazione di pagamenti biometrici Apple Pay e Google Pay per chiudere l'ordine in meno di 25 secondi da smartphone.",
        },
      ],
    },
    results: {
      headline: "Dalla bottega locale a un brand digitale di riferimento per il vino siciliano d'autore",
      description:
        "L'e-commerce è diventato il principale canale di crescita aziendale, espandendo la clientela dal mercato locale all'intero territorio europeo.",
      highlights: [
        "Oltre 12.000 bottiglie spedite con zero rotture e recensioni di imballaggio a 5 stelle.",
        "Il Sommelier Quiz è stato completato da più del 60% degli utenti del sito.",
        "Fidelizzazione record con il 41% dei clienti che ha effettuato un secondo riacquisto entro 60 giorni.",
      ],
      testimonial: {
        quote:
          "Herald ha una proattività e una profondità di studio rare. La dedizione che mette nella preparazione di ogni singolo dettaglio e la fiducia immediata che sa ispirare nelle persone lo porteranno molto lontano.",
        author: "Antonio",
        role: "Founder, I Pupi Siciliani",
        avatar: "/antonio-avatar.jpg",
      },
    },
    learnings: {
      whatWorked: [
        "I filtri basati sull'occasione ('Cena di pesce', 'Regalo importante', 'Grigliata tra amici') hanno registrato 5 volte più interazioni rispetto ai filtri per denominazione DOC/IGT.",
        "Le schede con etichette ingrandite e packaging visuale ad alta risoluzione hanno trasmesso immediatamente la qualità artigianale del prodotto.",
      ],
      whatCausedErrors: [
        "Inizialmente avevamo inserito troppe opzioni di degustazione e abbinamento nella stessa schermata, creando sovraccarico informativo; abbiamo scorporato i dettagli in tab a scomparsa fluida.",
        "La stima dei costi di spedizione compariva troppo tardi nel flusso, causando abbandoni: anticiparla con un banner trasparente 'Spedizione gratuita da 69€' ha aumentato la spesa media al carrello del 22%.",
      ],
    },
    nextProject: {
      slug: "ungdomskort",
      title: "Ungdomskort",
      badge: "Public Transit",
      tagline: "Denmark's youth transit pass platform redesign.",
      mockup: "/ungheromockup.svg",
    },
  },
};
