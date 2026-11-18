"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import OfficeScene from "@/components/OfficeScene";
import OfficeUI from "@/components/OfficeUI";
import OfficeModals from "@/components/OfficeModals";
import Preloader from "@/components/Preloader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(10);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [hoveredObject, setHoveredObject] = useState<string | null>(null);
  const [discoveredItems, setDiscoveredItems] = useState<Set<string>>(new Set());

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
      />

      {/* 2. 2D Overlay Interface (Headline, Menu, Hover Tooltip, Discovery Tracker) */}
      <OfficeUI
        discoveredCount={discoveredItems.size}
        hoveredObject={hoveredObject}
        onOpenModal={handleSelectObject}
      />

      {/* 3. Pop-up Modals & Drawers for Selected Objects */}
      <OfficeModals
        activeModal={activeModal}
        onClose={handleCloseModal}
        discoveredCount={discoveredItems.size}
      />
    </main>
  );
}
