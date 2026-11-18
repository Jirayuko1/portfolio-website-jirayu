"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import OfficeScene from "@/components/OfficeScene";
import OfficeUI from "@/components/OfficeUI";
import OfficeModals from "@/components/OfficeModals";
import Preloader from "@/components/Preloader";
import { Language } from "@/lib/translations";
import { sound } from "@/lib/soundEffects";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(10);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [hoveredObject, setHoveredObject] = useState<string | null>(null);
  const [discoveredItems, setDiscoveredItems] = useState<Set<string>>(new Set());

  // Language state (defaults to 'th' with client hydration from localStorage)
  const [language, setLanguage] = useState<Language>("th");
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("portfolio_lang") as Language | null;
    if (savedLang === "en" || savedLang === "th") {
      setLanguage(savedLang);
    }
    setIsMuted(sound.getIsMuted());
  }, []);

  const handleToggleLanguage = useCallback(() => {
    setLanguage((prev) => {
      const next: Language = prev === "th" ? "en" : "th";
      localStorage.setItem("portfolio_lang", next);
      return next;
    });
  }, []);

  const handleToggleSound = useCallback(() => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
  }, []);

  const handleSelectObject = useCallback((objectId: string) => {
    setActiveModal(objectId);
    setDiscoveredItems((prev) => {
      const next = new Set(prev);
      next.add(objectId);
      return next;
    });
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  const handleSceneProgress = useCallback((percent: number) => {
    setLoadingProgress(percent);
  }, []);

  const handleSceneLoaded = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#2e2620]">
      {/* 0. Cozy Initial Preloader */}
      <AnimatePresence>
        {isLoading && <Preloader progress={loadingProgress} />}
      </AnimatePresence>

      {/* 1. 3D Office Environment with Interactive GLTF Models */}
      <OfficeScene
        onSelectObject={handleSelectObject}
        hoveredObject={hoveredObject}
        setHoveredObject={setHoveredObject}
        onLoaded={handleSceneLoaded}
        onProgress={handleSceneProgress}
        isModalOpen={activeModal !== null}
        language={language}
      />

      {/* 2. 2D Overlay Interface (Headline, Menu, Hover Tooltip, Discovery Tracker, Sound & Lang Toggles) */}
      <OfficeUI
        discoveredCount={discoveredItems.size}
        hoveredObject={hoveredObject}
        onOpenModal={handleSelectObject}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
      />

      {/* 3. Pop-up Modals & Drawers for Selected Objects */}
      <OfficeModals
        activeModal={activeModal}
        onClose={handleCloseModal}
        discoveredCount={discoveredItems.size}
        language={language}
      />
    </main>
  );
}
