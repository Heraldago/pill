export interface CaseStudy {
  id: string;
  number: string;
  badge: string;
  title: string;
  desktopSubtitle: string;
  mobileSubtitle: string;
  link: string;
  imageOff: string;
  imageOn?: string;
  imageAlt: string;
}

export interface Testimonial {
  id: "antonio" | "sebastian";
  name: string;
  role: string;
  fullQuote: string;
  shortQuote: string;
  avatar: string;
  photo: string;
  photoAlt: string;
  photoPosition?: string;
}

export const SECTIONS = [
  { id: "hero", label: "Intro" },
  { id: "case-1", label: "Ungdomskort" },
  { id: "case-2", label: "X-Bit" },
  { id: "case-3", label: "I Pupi Siciliani" },
  { id: "about", label: "About Me" },
  { id: "recommendations", label: "Recommendations" },
  { id: "contact", label: "Contact" },
] as const;

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "ungdomskort",
    number: "1",
    badge: "Transit Platform",
    title: "Ungdomskort",
    desktopSubtitle: "Denmark's youth transit pass platform redesign.",
    mobileSubtitle: "Redesign of Denmark's youth transit pass platform.",
    link: "https://www.heraldago.com/ungdomskort",
    imageOff: "/ungheromockup.svg",
    imageAlt: "Ungdomskort Hero Mockup",
  },
  {
    id: "xbit",
    number: "2",
    badge: "Museum Exploration",
    title: "X-Bit",
    desktopSubtitle: "Museum exploration and interactive audio guide.",
    mobileSubtitle: "Interactive audio guide and cultural heritage exploration platform.",
    link: "https://www.heraldago.com/xbit",
    imageOff: "/xbitheromockup.svg",
    imageAlt: "X-Bit Museum App Mockup",
  },
  {
    id: "pupisiciliani",
    number: "3",
    badge: "E-Commerce & Wine",
    title: "I Pupi Siciliani",
    desktopSubtitle: "Wine retail platform with +187% YoY profit.",
    mobileSubtitle: "Bespoke digital wine store experience delivering +187% profit growth.",
    link: "https://www.heraldago.com/ipupisiciliani",
    imageOff: "/pupi-mockup.svg",
    imageOn: "/pupi-mockup-white.svg",
    imageAlt: "I Pupi Siciliani Wine Store Mockup",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "antonio",
    name: "Antonio",
    role: "Founder, I Pupi Siciliani",
    fullQuote: "Herald has rare proactivity and deep study. The dedication he brings to preparing every detail and the immediate trust he inspires in people will take him very far.",
    shortQuote: "Herald has rare proactivity and deep study. The trust he inspires will take him very far.",
    avatar: "/antonio-avatar.jpg",
    photo: "/antonio-founder.jpg",
    photoAlt: "Antonio, Founder I Pupi Siciliani",
    photoPosition: "object-[center_32%]",
  },
  {
    id: "sebastian",
    name: "Sebastian",
    role: "CEO, næmt.nu",
    fullQuote: "Herald excelled at cross-stakeholder collaboration, guiding the entire creation process from start to finish with great precision and genuine passion.",
    shortQuote: "Herald excelled at cross-stakeholder collaboration, guiding the process with precision.",
    avatar: "/sebastian-avatar.jpg",
    photo: "/herald-sebastian-team.jpg",
    photoAlt: "Herald with Sebastian, CEO næmt.nu",
    photoPosition: "object-[52%_48%]",
  },
];

export const PROFILE_DATA = {
  name: "Herald Ago",
  age: "27 y/o",
  role: "Product Designer",
  locations: "Italy & Barcelona",
  bioParagraph1:
    "Italian with Albanian roots, born and raised in Padua. After a Bachelor in Communication Science & Technologies, I moved to Miami, then headed to Denmark for an MSc in IT – Web Communication Design. After returning to Italy, I now live between Italy and Barcelona.",
  bioParagraph2:
    "Passionate about design, AI, sociology, books, and travel. Beyond the screen, I love good food, great wine, and spending time with family and friends.",
  shortBio:
    "Padua, Miami, MSc in Denmark. Living between Italy & Barcelona. Design, AI, sociology & fine wine.",
  resumePdf: "/cv-herald-ago.pdf",
  profileImage: "/profile.png",
};

export const CONTACT_DATA = {
  email: "heraldago1@gmail.com",
  linkedin: "https://www.linkedin.com/in/heraldago/",
  resumePdf: "/cv-herald-ago.pdf",
};
