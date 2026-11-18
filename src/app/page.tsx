"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import OfficeScene from "@/components/OfficeScene";
import OfficeUI from "@/components/OfficeUI";
import OfficeModals from "@/components/OfficeModals";
import Preloader from "@/components/Preloader";
import { Language, translations } from "@/lib/translations";
import { sound } from "@/lib/soundEffects";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(10);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [hoveredObject, setHoveredObject] = useState<string | null>(null);
  const [discoveredItems, setDiscoveredItems] = useState<Set<string>>(new Set());

  // Language & Sensory Ambient state
  const [language, setLanguage] = useState<Language>("th");
  const [isMuted, setIsMuted] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);
  const [isRainPlaying, setIsRainPlaying] = useState(false);
  const [coffeeToast, setCoffeeToast] = useState<string | null>(null);
  const coffeeToastTimer = useRef<NodeJS.Timeout | null>(null);

  // Imperative refs connecting UI triggers to 3D OfficeScene
  const triggerFeedFishRef = useRef<(() => void) | null>(null);
  const triggerSnowfallRef = useRef<(() => void) | null>(null);
  const triggerToggleLampRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const savedLang = localStorage.getItem("portfolio_lang") as Language | null;
    if (savedLang === "en" || savedLang === "th") {
      setLanguage(savedLang);
    }
    setIsMuted(sound.getIsMuted());
    setIsRainPlaying(sound.getIsRainPlaying());
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
    if (nextMuted) {
      setIsRainPlaying(false);
    }
  }, []);

  const handleToggleNightMode = useCallback(() => {
    sound.playClick();
    setIsNightMode((prev) => !prev);
  }, []);

  const handleToggleRain = useCallback(() => {
    const playing = sound.toggleRainAmbience();
    setIsRainPlaying(playing);
  }, []);

  const handleCoffeeClick = useCallback(() => {
    const toastMsg = translations[language].ui.coffeeBadge || "☕ Fueled by Americano & Clean Code";
    setCoffeeToast(toastMsg);
    setDiscoveredItems((prev) => new Set(prev).add("coffee"));

    if (coffeeToastTimer.current) clearTimeout(coffeeToastTimer.current);
    coffeeToastTimer.current = setTimeout(() => {
      setCoffeeToast(null);
    }, 3500);
  }, [language]);

  const handleFeedFish = useCallback(() => {
    triggerFeedFishRef.current?.();
    setDiscoveredItems((prev) => new Set(prev).add("aquarium"));
  }, []);

  const handleToggleLofi = useCallback(() => {
    sound.toggleLofiMusic();
    setDiscoveredItems((prev) => new Set(prev).add("speaker"));
  }, []);

  const handleToggleLamp = useCallback(() => {
    triggerToggleLampRef.current?.();
  }, []);

  const handleTriggerSnow = useCallback(() => {
    triggerSnowfallRef.current?.();
    setDiscoveredItems((prev) => new Set(prev).add("tree"));
  }, []);

  const handleSelectObject = useCallback((objectId: string) => {
    // Mini-game/ambient objects don't open modals
    if (objectId === "aquarium") {
      handleFeedFish();
      return;
    }
    if (objectId === "speaker") {
      handleToggleLofi();
      return;
    }
    if (objectId === "coffee") {
      handleCoffeeClick();
      return;
    }
    if (objectId === "lamp") {
      handleToggleLamp();
      return;
    }
    if (objectId === "tree") {
      handleTriggerSnow();
      return;
    }

    setActiveModal(objectId);
    setDiscoveredItems((prev) => new Set(prev).add(objectId));
  }, [handleFeedFish, handleToggleLofi, handleCoffeeClick, handleToggleLamp, handleTriggerSnow]);

  const handleDiscoverObject = useCallback((objectId: string) => {
    setDiscoveredItems((prev) => new Set(prev).add(objectId));
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

      {/* 1. 3D Office Environment with Interactive GLTF Models & Cinematic Camera Zoom */}
      <OfficeScene
        onSelectObject={handleSelectObject}
        onDiscoverObject={handleDiscoverObject}
        hoveredObject={hoveredObject}
        setHoveredObject={setHoveredObject}
        onLoaded={handleSceneLoaded}
        onProgress={handleSceneProgress}
        isModalOpen={activeModal !== null}
        activeModal={activeModal}
        language={language}
        isNightMode={isNightMode}
        onCoffeeClick={handleCoffeeClick}
        triggerFeedFishRef={triggerFeedFishRef}
        triggerSnowfallRef={triggerSnowfallRef}
        triggerToggleLampRef={triggerToggleLampRef}
      />

      {/* 2. 2D Overlay Interface (Toggles, Controls, Tooltip, Discovery Tracker, Drawer) */}
      <OfficeUI
        discoveredCount={discoveredItems.size}
        hoveredObject={hoveredObject}
        onOpenModal={handleSelectObject}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
        isNightMode={isNightMode}
        onToggleNightMode={handleToggleNightMode}
        isRainPlaying={isRainPlaying}
        onToggleRain={handleToggleRain}
        coffeeToast={coffeeToast}
        onFeedFish={handleFeedFish}
        onToggleLofi={handleToggleLofi}
        onToggleLamp={handleToggleLamp}
        onTriggerSnow={handleTriggerSnow}
        onCoffeeClick={handleCoffeeClick}
      />

      {/* 3. Pop-up Modals for Selected Objects */}
      <OfficeModals
        activeModal={activeModal}
        onClose={handleCloseModal}
        discoveredCount={discoveredItems.size}
        language={language}
      />
    </main>
  );
}
