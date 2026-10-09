export interface ProjectMetric {
  label: string;
  value: string;
  description: string;
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
  liveUrl?: string;
  heroMockup: string;
  mockupPadding?: string;
  summary: string;
  deliverables: string[];
  problem: {
    headline: string;
    description: string;
    keyIssues: string[];
  };
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
    };
  };
  learnings: {
    whatWorked: string[];
    whatCausedErrors: string[];
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
    tagline: "Denmark's youth transit pass platform redesign.",
    badge: "Public Transit & GovTech",
    year: "2024",
    role: "Lead Product Designer & UX Researcher",
    client: "Trafikstyrelsen / næmt.nu",
    timeline: "4 Mesi",
    team: "1 Product Designer (Herald), 1 Product Owner, 2 Frontend Eng, 1 UX Writer",
    liveUrl: "https://www.ungdomskort.dk",
    heroMockup: "/ungheromockup.svg",
    mockupPadding: "p-4 sm:p-8",
    summary:
      "Ungdomskort è il portale ufficiale danese per i titoli di viaggio agevolati dedicati a oltre 150.000 studenti e giovani. L'obiettivo del progetto è stato trasformare una procedura burocratica farraginosa e obsoleta in un'esperienza digitale fluida, autonoma e inclusiva.",
    deliverables: [
      "Design System completo e accessibile (WCAG AAA)",
      "Flusso di onboarding e rinnovo smart con verifica NemID/MitID",
      "Dashboard studente mobile-first con tracciamento stato ordini in tempo reale",
      "Portale di gestione per operatori e segreterie scolastiche",
    ],
    problem: {
      headline: "Un processo burocratico frammentato che generava migliaia di ticket al supporto",
      description:
        "La piattaforma precedente costringeva gli studenti a un iter in 12 passaggi separati su tre portali diversi. Durante l'inizio dell'anno accademico, il carico di chiamate e reclami paralizzava i centri assistenza, con un tasso di abbandono della procedura superiore al 38%.",
      keyIssues: [
        "Tempi medi di approvazione superiori a 14 giorni lavorativi a causa di documentazione respinta per errori formali.",
        "Mancanza totale di feedback di stato: gli studenti non sapevano in quale fase si trovasse la loro tessera.",
        "Interfaccia non responsive che costringeva l'82% degli utenti mobili a ridimensionare manualmente schermate desktop complesse.",
      ],
    },
    metrics: [
      {
        label: "Tempo di completamento",
        value: "-58%",
        description: "Da una media di 18 minuti a meno di 7 minuti per l'intera richiesta.",
      },
      {
        label: "Ticket di supporto",
        value: "-42%",
        description: "Dimezzate le richieste di assistenza telefonica e via email.",
      },
      {
        label: "Tasso di successo primo invio",
        value: "94%",
        description: "Richieste andate a buon fine al primo tentativo senza rifiuti.",
      },
    ],
    process: {
      headline: "Dalla ricerca sul campo con studenti danesi alla semplificazione radicale dei flussi",
      description:
        "Abbiamo adottato un approccio Double Diamond a sprint bisettimanali, integrando costantemente test di usabilità qualitativi con studenti di Aarhus e Copenaghen.",
      teamDivision: [
        {
          role: "Product Design & UX Research",
          members: "Herald Ago",
          tasks:
            "Mappatura delle friction point, wireframing, prototipi interattivi Figma, interviste a 24 studenti e specifiche UI.",
        },
        {
          role: "Product Strategy & Stakeholders",
          members: "Product Owner & Trafikstyrelsen",
          tasks:
            "Definizione requisiti normativi danesi, allineamento istituti scolastici e approvazione KPI di conformità.",
        },
        {
          role: "Engineering Team",
          members: "2 Frontend Engineers",
          tasks:
            "Integrazione API MitID/NemID, architettura componenti React/Next.js e test di accessibilità a11y.",
        },
      ],
      phases: [
        {
          step: "01",
          title: "User Research & Audit Burocratico",
          description:
            "Interviste a studenti, segreterie e operatori per comprendere i blocchi cognitivi ed eliminare 5 passaggi ridondanti su 12.",
        },
        {
          step: "02",
          title: "Prototipazione & Design System Capsule",
          description:
            "Creazione di componenti chiari a contrasto elevato, con indicatori visivi di progresso ispirati alla semplicità scandinava.",
        },
        {
          step: "03",
          title: "Test di Usabilità Iterativi",
          description:
            "Tre sessioni di test su prototipi Figma interattivi per raffinare la gestione degli errori e la validazione dei documenti.",
        },
        {
          step: "04",
          title: "Handoff e Monitoraggio Pilota",
          description:
            "Rilascio pilota su un campione di 5.000 studenti dell'Università di Odense prima del rollout nazionale definitivo.",
        },
      ],
    },
    results: {
      headline: "Una piattaforma pubblica di riferimento per la pubblica amministrazione danese",
      description:
        "Il nuovo Ungdomskort ha trasformato una delle pratiche più temute dagli studenti in una procedura immediata e trasparente, ricevendo il plauso unanime degli enti di trasporto della Danimarca.",
      highlights: [
        "Oltre 140.000 abbonamenti gestiti con successo durante la finestra di picco di settembre.",
        "Valutazione di soddisfazione utente (CSAT) salita da 2.4/5 a 4.7/5.",
        "Zero downtime o sovraccarichi registrati durante le giornate di apertura delle immatricolazioni.",
      ],
      testimonial: {
        quote:
          "Herald ha dimostrato una capacità straordinaria nella collaborazione tra stakeholder istituzionali, guidando l'intero processo creativo con precisione meticolosa e passione autentica.",
        author: "Sebastian",
        role: "CEO, næmt.nu",
        avatar: "/sebastian-avatar.jpg",
      },
    },
    learnings: {
      whatWorked: [
        "Coinvolgere gli sviluppatori già nei primi wireframe ha evitato vincoli tecnici imprevisti con l'autenticazione MitID.",
        "Mostrare una timeline visuale 'Cosa succede adesso' ha abbattuto del 90% l'ansia da attesa degli studenti.",
        "I micro-feedback immediati sui campi del modulo hanno azzerato gli errori di digitazione dell'indirizzo postale.",
      ],
      whatCausedErrors: [
        "All'inizio abbiamo sottovalutato la complessità degli studenti con doppia residenza o tirocini all'estero, costringendoci a rifare un intero flusso secondario a metà sprint.",
        "Il primo prototipo era troppo minimalista e mancava di spiegazioni legali obbligatorie per il Ministero dei Trasporti; abbiamo dovuto riequilibrare pulizia grafica e requisiti istituzionali.",
      ],
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
