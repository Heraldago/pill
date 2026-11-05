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
    tagline: "National Danish Student Transit Pass.",
    badge: "Transit UX / WCAG 2.2 AA",
    year: "2024",
    role: "Lead Product Designer",
    client: "Ungdomskort.dk / næmt.nu",
    timeline: "4 Months",
    team: "Herald Ago, Sebastian (CEO), Frontend & QA",
    tools: ["Figma", "HTML5", "WCAG 2.2", "Miro"],
    liveUrl: "https://www.ungdomskort.dk",
    heroMockup: "/ungheromockup.svg",
    mockupPadding: "p-4 sm:p-8",
    summary:
      "7-stage legacy portal rebuilt into a 3-step WCAG 2.2 AA mobile pass.",
    deliverables: [
      "WCAG 2.2 AA Design System (7:1 contrast)",
      "3-Step MitID & MobilePay Wizard",
      "Offline QR Digital Pass",
      "7-Day Smart Renewal Alerts",
    ],
    problem: {
      headline: "7-stage legacy funnel with 14 WCAG failures",
      description:
        "78% of students renew in transit on phones, facing broken layouts and 14 WCAG blockers.",
      keyIssues: [
        "14 WCAG 2.2 blockers: broken contrast & missing focus states",
        "7-stage verification funnel causing high checkout drop-off",
        "Desktop-only tables failing 78% of mobile commuters",
      ],
      beforeImage: "/assets/ung-step1-original-hd.png",
      beforeLabel: "Before: Legacy 7-Stage Desktop Portal",
      afterImage: "/assets/ungscreen-web-calendar.png",
      afterLabel: "After: 3-Step WCAG 2.2 AA Wizard",
    },
    decisions: {
      headline: "From 7 stages to a 3-step wizard",
      description:
        "Three iterations tested with Danish student commuters.",
      options: [
        {
          id: "opt-a",
          title: "V1: Single-Page Form",
          tag: "Rejected",
          chosen: false,
          constraint: "Dense vertical scroll & manual tariff zone entry.",
          outcome: "High cognitive load for commuters in transit.",
          image: "/assets/ung-step2-v1-hd.png",
          imageCaption: "V1: Single-page layout - too dense on mobile",
        },
        {
          id: "opt-b",
          title: "V2: Multi-Tab Portal",
          tag: "Iterated",
          chosen: false,
          constraint: "Clean layout, but manual 30-day expiry tracking.",
          outcome: "Students still missed renewals and got fined.",
          image: "/assets/ung-step3-v2-hd.png",
          imageCaption: "V2: Refined hierarchy before smart alerts",
        },
        {
          id: "opt-c",
          title: "Final: 3-Step Wizard + Smart Alerts",
          tag: "Selected",
          chosen: true,
          constraint: "Real-time MitID SSO, auto-zones & 7-day push alerts.",
          outcome: "-45% checkout time, 100% WCAG AA, +92% mobile UX.",
          image: "/assets/ungscreen-web-calendar.png",
          imageCaption: "Final: 3-step wizard, MobilePay & calendar sync",
        },
      ],
    },
    prototypeSteps: [
      {
        title: "1. MitID SSO",
        badge: "Auth",
        description: "1-tap identity & student eligibility check.",
        image: "/assets/ungscreen-login.png",
      },
      {
        title: "2. Auto-Zone Route",
        badge: "Tariff Engine",
        description: "Automatic home-to-campus zone calculation.",
        image: "/assets/ungscreen-search.jpg",
      },
      {
        title: "3. Calendar & Pay",
        badge: "Checkout",
        description: "Visual validity picker with 1-tap MobilePay.",
        image: "/assets/ungscreen-web-calendar.png",
      },
      {
        title: "4. Digital QR Pass",
        badge: "Offline Pass",
        description: "7:1 high-contrast pass with live offline QR.",
        image: "/assets/ungscreen-web-card.png",
      },
      {
        title: "5. 7-Day Alerts",
        badge: "Notifications",
        description: "Push & SMS reminders 7 days before expiry.",
        image: "/assets/ungscreen-notifications.jpg",
      },
      {
        title: "6. Message Hub",
        badge: "Inbox",
        description: "Direct transit authority updates & receipts.",
        image: "/assets/ungscreen-web-messages.png",
      },
      {
        title: "7. Student Profile",
        badge: "Account",
        description: "Verified enrollment status & saved routes.",
        image: "/assets/ungscreen-profile.jpg",
      },
    ],
    metrics: [
      {
        label: "WCAG 2.2 AA",
        value: "100%",
        description: "7:1 contrast & full keyboard/VoiceOver support.",
      },
      {
        label: "Checkout Time",
        value: "-45%",
        description: "7 stages collapsed into a 3-step wizard.",
      },
      {
        label: "Mobile UX Score",
        value: "+92%",
        description: "Validated with 18-25 yr Danish students.",
      },
    ],
    process: {
      headline: "System & Craft Architecture",
      description:
        "NN/g audit, commuter fieldwork, and tokenized WCAG 2.2 AA system.",
      teamDivision: [
        {
          role: "Product Design & A11y",
          members: "Herald Ago",
          tasks: "Audit, research, IA, Figma tokens & prototype.",
        },
        {
          role: "Stakeholder Lead",
          members: "Sebastian (næmt.nu)",
          tasks: "Transit compliance & milestone validation.",
        },
        {
          role: "Engineering & QA",
          members: "Frontend Team",
          tasks: "Semantic HTML5, focus states & axe-core QA.",
        },
      ],
      phases: [
        {
          step: "01",
          title: "NN/g & WCAG Audit",
          description: "14 blockers mapped across Rejsekort, DSB & DOT.",
          image: "/assets/ungcompetitive-analysis.jpg",
          imageCaption: "Competitive & Heuristic Benchmark",
        },
        {
          step: "02",
          title: "Commuter Personas",
          description: "78% renew on smartphones while commuting.",
          image: "/assets/ungpersona-1.jpg",
          imageCaption: "Student Commuter Persona & Needs",
        },
        {
          step: "03",
          title: "Transit Storyboards",
          description: "Mapped real-world boarding & renewal contexts.",
          image: "/assets/ungstoryboards.jpg",
          imageCaption: "Commuter Context Storyboards",
        },
        {
          step: "04",
          title: "3-Step User Flow",
          description: "Collapsed 7 legacy stages into 3 guided steps.",
          image: "/assets/unguser-flow.jpg",
          imageCaption: "Simplified 3-Stage Verification Flow",
        },
        {
          step: "05",
          title: "7:1 Color Tokens",
          description: "High-contrast tokens for outdoor sunlight legibility.",
          image: "/assets/ungcolors.jpg",
          imageCaption: "WCAG 2.2 AA/AAA Color Tokens",
        },
        {
          step: "06",
          title: "Scalable Type System",
          description: "200% dynamic type scaling & VoiceOver QA.",
          image: "/assets/ungtypography.jpg",
          imageCaption: "Accessible Typography Scale",
        },
      ],
    },
    results: {
      headline: "Verified impact across accessibility & speed",
      description:
        "Zero accessibility blockers and 45% faster mobile renewals.",
      highlights: [
        "100% WCAG 2.2 AA verified via axe-core & VoiceOver",
        "45% faster renewal across mobile & desktop",
        "92% positive usability score from Danish students",
      ],
      testimonial: {
        quote:
          "Herald excelled at cross-stakeholder collaboration, guiding the entire creation process with great precision and passion.",
        author: "Sebastian",
        role: "CEO, næmt.nu",
        avatar: "/sebastian-avatar.jpg",
        teamPhoto: "/herald-sebastian-team.jpg",
      },
    },
    learnings: {
      whatWorked: [
        "7:1 contrast tokens ensured outdoor sunlight readability from day one.",
        "Auto-zone campus lookup removed the #1 cause of user errors.",
        "7-day push alerts eliminated accidental pass expiration fines.",
      ],
      whatCausedErrors: [
        "V1 single-page scroll overwhelmed commuters; pivoted to 3-step wizard.",
        "Early translucent accents failed 4.5:1; rebuilt surface token contrast.",
      ],
      pivotImage: "/assets/ungwireframes.jpg",
      pivotCaption: "Pivot: Dense V1 wireframes to chunked 3-step mobile wizard",
    },
    nextProject: {
      slug: "xbit",
      title: "Xbit",
      badge: "Google UX Certificate",
      tagline: "Public art museum companion app & responsive web design.",
      mockup: "/xbitheromockup.svg",
    },
  },

  xbit: {
    slug: "xbit",
    title: "Xbit",
    tagline: "Public art museum companion app and responsive website.",
    badge: "Google UX Professional Certificate",
    year: "2023",
    role: "Lead UX/UI Designer (Capstone Project)",
    client: "Google UX Design Professional Certificate (Coursera)",
    timeline: "6 Months",
    team: "Herald Ago (Solo UX/UI Designer)",
    liveUrl: "https://www.heraldago.com/xbit",
    heroMockup: "/xbitheromockup.svg",
    mockupPadding: "p-4 sm:p-6",
    summary:
      "Xbit è l'app mobile e sito web responsive progettata come Capstone Project del Google UX Design Professional Certificate su Coursera. Risponde al prompt: 'Design an app and a responsive website for a public art museum to advertise exhibitions and events, provide museum information to patrons, and enable patrons to schedule visits.'",
    deliverables: [
      "App mobile iOS & Android con flusso unificato per consultazione mostre e ticketing QR",
      "Sito web responsive ottimizzato per desktop, tablet e mobile",
      "Flusso di checkout a schermata unica (selezione data, orario e biglietti in meno di 60s)",
      "Design system accessibile con palette warm amber, token scalabili e tipografia leggibile",
    ],
    problem: {
      headline: "Prompt: Design an app and a responsive website for a public art museum",
      description:
        "Prompt ufficiale Google UX: 'Design an app and a responsive website for a public art museum to advertise exhibitions and events, provide museum information to patrons, and enable patrons to schedule visits.' I visitatori dei musei affrontavano esperienze frammentate: scoperta delle mostre su una piattaforma, orari su un'altra e biglietteria esterna farraginosa.",
      keyIssues: [
        "Esperienza frammentata tra canali di promozione e biglietteria esterna.",
        "Difficoltà per famiglie e gruppi nel selezionare data, orario e numero di ingressi senza continui ricaricamenti.",
        "Mancanza di un wallet digitale per accedere direttamente ai turnstiles con codice QR.",
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
