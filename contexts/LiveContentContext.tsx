"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import initialJson from "@/data/live-content.json";

export interface HeroContent {
  greeting: string;
  badge: string;
  prefix: string;
  highlight1: string;
  middle: string;
  highlight2: string;
  conjunction: string;
  highlight3: string;
  suffix: string;
}

export interface CaseStudyItem {
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

export interface ProfileContent {
  name: string;
  age: string;
  role: string;
  locations: string;
  bioParagraph1: string;
  bioParagraph2: string;
  shortBio: string;
  resumePdf: string;
  profileImage: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  fullQuote: string;
  shortQuote: string;
  avatar: string;
  photo: string;
  photoAlt: string;
  photoPosition?: string;
}

export interface ContactContent {
  email: string;
  linkedin: string;
  resumePdf: string;
}

export interface ThemeSettings {
  glassOpacity: number;
  borderOpacity: number;
  vantaSpeed: number;
  vantaWaveHeight: number;
}

export interface LiveContent {
  hero: HeroContent;
  caseStudies: CaseStudyItem[];
  profile: ProfileContent;
  testimonials: TestimonialItem[];
  contact: ContactContent;
  theme: ThemeSettings;
}

export type EditorTab =
  | "quick"
  | "caseStudies"
  | "hero"
  | "profile"
  | "testimonials"
  | "media"
  | "theme";

interface LiveContentContextType {
  content: LiveContent;
  isEditMode: boolean;
  toggleEditMode: () => void;
  activeTab: EditorTab;
  setActiveTab: (tab: EditorTab) => void;
  // Modifiche
  updateHero: (data: Partial<HeroContent>) => void;
  updateCaseStudy: (id: string, data: Partial<CaseStudyItem>) => void;
  addCaseStudy: (study: CaseStudyItem) => void;
  deleteCaseStudy: (id: string) => void;
  reorderCaseStudies: (sourceIdx: number, targetIdx: number) => void;
  updateProfile: (data: Partial<ProfileContent>) => void;
  updateTestimonial: (id: string, data: Partial<TestimonialItem>) => void;
  addTestimonial: (item: TestimonialItem) => void;
  deleteTestimonial: (id: string) => void;
  reorderTestimonials: (sourceIdx: number, targetIdx: number) => void;
  updateContact: (data: Partial<ContactContent>) => void;
  updateTheme: (data: Partial<ThemeSettings>) => void;
  // Operazioni
  saveChanges: () => Promise<boolean>;
  resetToDefaults: () => Promise<void>;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  isSaving: boolean;
  saveStatus: "idle" | "saving" | "saved" | "error";
  toastMessage: string | null;
  setToastMessage: (msg: string | null) => void;
}

const LiveContentContext = createContext<LiveContentContextType | null>(null);

export function LiveContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<LiveContent>(initialJson as LiveContent);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<EditorTab>("quick");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // History stack for Undo/Redo
  const [history, setHistory] = useState<LiveContent[]>([initialJson as LiveContent]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const isInternalUpdateRef = useRef(false);

  // Sync from backend on mount
  useEffect(() => {
    fetch("/api/editor/content")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.caseStudies) {
          isInternalUpdateRef.current = true;
          setContent(data);
          setHistory([data]);
          setHistoryIndex(0);
        }
      })
      .catch((err) => {
        console.warn("LiveContentProvider sync note:", err);
      });
  }, []);

  // Shortcut Ctrl+E / Cmd+E / Alt+E to toggle editor
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey || e.altKey) && e.key.toLowerCase() === "e") {
        e.preventDefault();
        setIsEditMode((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto clear toast
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const pushState = useCallback((newContent: LiveContent) => {
    setContent(newContent);
    setHistory((prev) => {
      const sliced = prev.slice(0, historyIndex + 1);
      return [...sliced, newContent];
    });
    setHistoryIndex((prev) => prev + 1);
  }, [historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const targetIdx = historyIndex - 1;
      setHistoryIndex(targetIdx);
      setContent(history[targetIdx]);
      setToastMessage("Azione annullata");
    }
  }, [historyIndex, history]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const targetIdx = historyIndex + 1;
      setHistoryIndex(targetIdx);
      setContent(history[targetIdx]);
      setToastMessage("Azione ripristinata");
    }
  }, [historyIndex, history]);

  // Mutation Handlers
  const updateHero = useCallback((data: Partial<HeroContent>) => {
    setContent((prev) => {
      const updated = { ...prev, hero: { ...prev.hero, ...data } };
      pushState(updated);
      return updated;
    });
  }, [pushState]);

  const updateCaseStudy = useCallback((id: string, data: Partial<CaseStudyItem>) => {
    setContent((prev) => {
      const updatedList = prev.caseStudies.map((item) =>
        item.id === id ? { ...item, ...data } : item
      );
      const updated = { ...prev, caseStudies: updatedList };
      pushState(updated);
      return updated;
    });
  }, [pushState]);

  const addCaseStudy = useCallback((study: CaseStudyItem) => {
    setContent((prev) => {
      const updated = { ...prev, caseStudies: [...prev.caseStudies, study] };
      pushState(updated);
      setToastMessage(`Progetto "${study.title}" aggiunto!`);
      return updated;
    });
  }, [pushState]);

  const deleteCaseStudy = useCallback((id: string) => {
    setContent((prev) => {
      const target = prev.caseStudies.find((s) => s.id === id);
      const updatedList = prev.caseStudies.filter((item) => item.id !== id);
      const updated = { ...prev, caseStudies: updatedList };
      pushState(updated);
      setToastMessage(`Progetto "${target?.title || id}" eliminato!`);
      return updated;
    });
  }, [pushState]);

  const reorderCaseStudies = useCallback((sourceIdx: number, targetIdx: number) => {
    setContent((prev) => {
      const list = [...prev.caseStudies];
      const [removed] = list.splice(sourceIdx, 1);
      list.splice(targetIdx, 0, removed);
      // Aggiorna anche la numerazione automatica
      const renumbered = list.map((item, idx) => ({ ...item, number: (idx + 1).toString() }));
      const updated = { ...prev, caseStudies: renumbered };
      pushState(updated);
      return updated;
    });
  }, [pushState]);

  const updateProfile = useCallback((data: Partial<ProfileContent>) => {
    setContent((prev) => {
      const updated = { ...prev, profile: { ...prev.profile, ...data } };
      pushState(updated);
      return updated;
    });
  }, [pushState]);

  const updateTestimonial = useCallback((id: string, data: Partial<TestimonialItem>) => {
    setContent((prev) => {
      const updatedList = prev.testimonials.map((item) =>
        item.id === id ? { ...item, ...data } : item
      );
      const updated = { ...prev, testimonials: updatedList };
      pushState(updated);
      return updated;
    });
  }, [pushState]);

  const addTestimonial = useCallback((item: TestimonialItem) => {
    setContent((prev) => {
      const updated = { ...prev, testimonials: [...prev.testimonials, item] };
      pushState(updated);
      setToastMessage(`Testimonial "${item.name}" aggiunto!`);
      return updated;
    });
  }, [pushState]);

  const deleteTestimonial = useCallback((id: string) => {
    setContent((prev) => {
      const target = prev.testimonials.find((t) => t.id === id);
      const updatedList = prev.testimonials.filter((item) => item.id !== id);
      const updated = { ...prev, testimonials: updatedList };
      pushState(updated);
      setToastMessage(`Testimonial "${target?.name || id}" eliminato!`);
      return updated;
    });
  }, [pushState]);

  const reorderTestimonials = useCallback((sourceIdx: number, targetIdx: number) => {
    setContent((prev) => {
      const list = [...prev.testimonials];
      const [removed] = list.splice(sourceIdx, 1);
      list.splice(targetIdx, 0, removed);
      const updated = { ...prev, testimonials: list };
      pushState(updated);
      return updated;
    });
  }, [pushState]);

  const updateContact = useCallback((data: Partial<ContactContent>) => {
    setContent((prev) => {
      const updated = { ...prev, contact: { ...prev.contact, ...data } };
      pushState(updated);
      return updated;
    });
  }, [pushState]);

  const updateTheme = useCallback((data: Partial<ThemeSettings>) => {
    setContent((prev) => {
      const updated = { ...prev, theme: { ...prev.theme, ...data } };
      pushState(updated);
      return updated;
    });
  }, [pushState]);

  // Salva su file locale
  const saveChanges = useCallback(async (): Promise<boolean> => {
    setIsSaving(true);
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/editor/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Errore nel salvataggio");
      }
      setSaveStatus("saved");
      setToastMessage("Modifiche salvate con successo nei file locali!");
      setTimeout(() => setSaveStatus("idle"), 2500);
      return true;
    } catch (err) {
      console.error(err);
      setSaveStatus("error");
      setToastMessage("Errore nel salvataggio: " + (err as Error).message);
      setTimeout(() => setSaveStatus("idle"), 3500);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [content]);

  // Reset ai default
  const resetToDefaults = useCallback(async () => {
    if (!window.confirm("Sei sicuro di voler ripristinare tutti i contenuti ai valori iniziali?")) {
      return;
    }
    setIsSaving(true);
    try {
      const res = await fetch("/api/editor/reset", { method: "POST" });
      const data = await res.json();
      if (data.success && data.data) {
        setContent(data.data);
        setHistory([data.data]);
        setHistoryIndex(0);
        setToastMessage("Ripristino completato con successo!");
      }
    } catch (err) {
      setToastMessage("Errore nel ripristino: " + (err as Error).message);
    } finally {
      setIsSaving(false);
    }
  }, []);

  return (
    <LiveContentContext.Provider
      value={{
        content,
        isEditMode,
        toggleEditMode: () => setIsEditMode((prev) => !prev),
        activeTab,
        setActiveTab,
        updateHero,
        updateCaseStudy,
        addCaseStudy,
        deleteCaseStudy,
        reorderCaseStudies,
        updateProfile,
        updateTestimonial,
        addTestimonial,
        deleteTestimonial,
        reorderTestimonials,
        updateContact,
        updateTheme,
        saveChanges,
        resetToDefaults,
        undo,
        redo,
        canUndo: historyIndex > 0,
        canRedo: historyIndex < history.length - 1,
        isSaving,
        saveStatus,
        toastMessage,
        setToastMessage,
      }}
    >
      {children}
    </LiveContentContext.Provider>
  );
}

export function useLiveContent() {
  const context = useContext(LiveContentContext);
  if (!context) {
    throw new Error("useLiveContent deve essere usato all'interno di un LiveContentProvider");
  }
  return context;
}
