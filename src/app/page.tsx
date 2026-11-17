"use client";

import { useState, useCallback } from "react";
import OfficeScene from "@/components/OfficeScene";
import OfficeUI from "@/components/OfficeUI";
import OfficeModals from "@/components/OfficeModals";

export default function Home() {
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

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#2e2620]">
      {/* 3D Office Environment with Interactive GLTF Models */}
      <OfficeScene
        onSelectObject={handleSelectObject}
        hoveredObject={hoveredObject}
        setHoveredObject={setHoveredObject}
      />

      {/* 2D Overlay Interface (Headline, Menu, Hover Tooltip, Discovery Tracker) */}
      <OfficeUI
        discoveredCount={discoveredItems.size}
        hoveredObject={hoveredObject}
        onOpenModal={handleSelectObject}
      />

      {/* Pop-up Modals & Drawers for Selected Objects */}
      <OfficeModals
        activeModal={activeModal}
        onClose={handleCloseModal}
        discoveredCount={discoveredItems.size}
      />
    </main>
  );
}
