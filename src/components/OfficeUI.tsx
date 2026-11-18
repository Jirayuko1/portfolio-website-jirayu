"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
  Laptop,
  Smartphone,
  Palette,
  User,
  Heart,
  Camera,
  BookOpen,
  Fish,
  Music,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import { Language, translations } from "@/lib/translations";
import { sound } from "@/lib/soundEffects";

interface OfficeUIProps {
  discoveredCount: number;
  hoveredObject: string | null;
  onOpenModal: (id: string) => void;
  language: Language;
  onToggleLanguage: () => void;
  isMuted: boolean;
  onToggleSound: () => void;
}

export default function OfficeUI({
  discoveredCount,
  hoveredObject,
  onOpenModal,
  language,
  onToggleLanguage,
  isMuted,
  onToggleSound,
}: OfficeUIProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isIntroCollapsed, setIsIntroCollapsed] = useState(false);
  const t = translations[language];

  const quickLinks = [
    { label: t.nav.laptop, id: "laptop", icon: Laptop },
    { label: t.nav.phone, id: "phone", icon: Smartphone },
    { label: t.nav.green_art, id: "green_art", icon: Palette },
    { label: t.nav.yellow_vase, id: "yellow_vase", icon: User },
    { label: t.nav.cards_green, id: "cards_green", icon: Heart },
    { label: t.nav.cards_red, id: "cards_red", icon: Camera },
    { label: t.nav.cards_blue, id: "cards_blue", icon: BookOpen },
    { label: t.nav.aquarium, id: "aquarium", icon: Fish },
    { label: t.nav.speaker, id: "speaker", icon: Music },
    { label: t.nav.lamp, id: "lamp", icon: Lightbulb },
    { label: t.nav.tree, id: "tree", icon: Sparkles },
  ];

  const handleMenuOpen = () => {
    sound.playClick();
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    sound.playClick();
    setMenuOpen(false);
  };

  const handleNavClick = (id: string) => {
    sound.playClick();
    setMenuOpen(false);
    onOpenModal(id);
  };

  const handleSoundBtn = () => {
    onToggleSound();
    if (isMuted) {
      setTimeout(() => sound.playClick(), 50);
    }
  };

  const handleLangBtn = () => {
    sound.playClick();
    onToggleLanguage();
  };

  const handleToggleIntro = () => {
    sound.playClick();
    setIsIntroCollapsed((prev) => !prev);
  };

  return (
    <>
      {/* 1. TOP RIGHT: Sound Toggle + Language Toggle + Menu Button */}
      <div className="fixed top-5 right-5 sm:top-8 sm:right-8 z-40 flex items-center gap-2 sm:gap-3">
        {/* Sound Toggle */}
        <button
          onClick={handleSoundBtn}
          aria-label={isMuted ? t.ui.soundUnmuted : t.ui.soundMuted}
          title={isMuted ? t.ui.soundUnmuted : t.ui.soundMuted}
          className="flex items-center justify-center w-11 h-11 rounded-full bg-[#1e1713]/85 hover:bg-[#342720] text-[#f4ebdc] border border-[#f4ebdc]/15 backdrop-blur-md shadow-xl transition-all hover:scale-105 active:scale-95"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-[#c8b7a6]" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#f2b705]" />
          )}
        </button>

        {/* Language Switcher */}
        <button
          onClick={handleLangBtn}
          aria-label="Switch Language (TH / EN)"
          title="Switch Language (TH / EN)"
          className="flex items-center gap-1.5 px-3.5 h-11 rounded-full bg-[#1e1713]/85 hover:bg-[#342720] text-[#f4ebdc] border border-[#f4ebdc]/15 backdrop-blur-md shadow-xl text-xs font-mono font-bold tracking-wider transition-all hover:scale-105 active:scale-95"
        >
          <span className={language === "th" ? "text-[#f2b705] font-black" : "text-[#c8b7a6]"}>TH</span>
          <span className="text-[#c8b7a6]/50">/</span>
          <span className={language === "en" ? "text-[#f2b705] font-black" : "text-[#c8b7a6]"}>EN</span>
        </button>

        {/* Menu Button */}
        <button
          onClick={handleMenuOpen}
          aria-label="Open navigation menu"
          className="flex items-center gap-2 px-4 h-11 sm:px-5 rounded-full bg-[#f4ebdc] text-[#1e1713] hover:bg-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-xl hover:scale-105 active:scale-95"
        >
          <Menu className="w-3.5 h-3.5" />
          <span>{t.ui.menu}</span>
        </button>
      </div>

      {/* 2. BOTTOM LEFT: Main Headline & Discovery Tracker (Collapsible) */}
      <div className="fixed bottom-5 left-5 sm:bottom-10 sm:left-10 z-30 max-w-[calc(100vw-2.5rem)] sm:max-w-md select-none pointer-events-none">
        <AnimatePresence mode="wait">
          {!isIntroCollapsed ? (
            <motion.div
              key="intro-card-expanded"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="pointer-events-auto p-4 sm:p-5 rounded-3xl bg-[#1c1613]/85 backdrop-blur-md border border-[#f4ebdc]/15 shadow-2xl text-[#f4ebdc]"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h1 className="font-playfair text-2xl sm:text-3xl lg:text-4xl text-[#f4ebdc] leading-[1.15] tracking-tight whitespace-pre-line">
                  {t.ui.headline}
                </h1>
                <button
                  onClick={handleToggleIntro}
                  aria-label={t.ui.collapse}
                  title={t.ui.collapse}
                  className="p-1.5 sm:p-2 rounded-full bg-[#2a211c] hover:bg-[#3d3027] text-[#c8b7a6] hover:text-[#f4ebdc] transition-all hover:scale-105 active:scale-95 shrink-0 border border-[#f4ebdc]/10 mt-1"
                >
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              <p className="font-karla text-xs sm:text-sm text-[#d4c3b3] leading-relaxed mb-3">
                {t.ui.subheadline}
              </p>

              {/* Discovery Progress */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2a211c] border border-[#f4ebdc]/15">
                <span className="w-2 h-2 rounded-full bg-[#f2b705]" />
                <span className="font-mono text-[10px] sm:text-[11px] tracking-widest text-[#f4ebdc] uppercase">
                  {t.ui.discoveredBadge.replace("{count}", String(discoveredCount))}
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.button
              key="intro-card-collapsed"
              initial={{ opacity: 0, y: 12, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.94 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onClick={handleToggleIntro}
              aria-label={t.ui.expand}
              title={t.ui.expand}
              className="pointer-events-auto group flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#1c1613]/90 hover:bg-[#2e231c] text-[#f4ebdc] border border-[#f4ebdc]/20 shadow-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#f2b705] animate-pulse" />
                <span className="font-playfair text-sm sm:text-base text-white font-medium">
                  {t.ui.workspaceTitle}
                </span>
                <span className="text-[#c8b7a6]/40">•</span>
                <span className="font-mono text-xs text-[#f2b705] font-semibold">
                  {discoveredCount}/10
                </span>
              </div>
              <span className="p-1 rounded-full bg-[#2a211c] text-[#c8b7a6] group-hover:text-white group-hover:bg-[#3d3027] transition-colors">
                <ChevronUp className="w-3.5 h-3.5" />
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* 3. CENTER / FLOATING HOVER TOOLTIP */}
      <AnimatePresence>
        {hoveredObject && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed top-6 sm:top-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none px-4 py-1.5 rounded-full bg-[#1e1713]/90 text-[#f4ebdc] border border-[#f2b705]/50 backdrop-blur-md shadow-2xl flex items-center gap-2 max-w-[90vw]"
          >
            <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-[#f2b705]" />
            <span className="font-caveat text-base sm:text-lg text-[#f2b705] whitespace-nowrap">
              {t.ui.clickToExplore}
            </span>
            <span className="font-karla text-xs font-semibold text-white tracking-wide truncate">
              {hoveredObject}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. QUICK NAVIGATION MENU (DRAWER) */}
      <AnimatePresence>
        {menuOpen && (
          <div
            className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm"
            onClick={handleMenuClose}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md h-full bg-[#1e1713] text-[#f4ebdc] border-l border-[#f4ebdc]/10 p-6 sm:p-8 flex flex-col justify-between font-karla shadow-2xl overflow-y-auto"
            >
              {/* Header */}
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#f4ebdc]/10 mb-6">
                  <div>
                    <h2 className="font-playfair text-2xl text-white">Jirayu</h2>
                    <span className="text-xs text-[#c8b7a6]">Senior Full-Stack & Mobile Developer</span>
                  </div>
                  <button
                    onClick={handleMenuClose}
                    aria-label="Close menu"
                    className="p-2 rounded-full bg-[#2e231c] hover:bg-[#3d3027] text-[#f4ebdc] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Nav Links */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-widest text-[#f2b705] uppercase">
                    {t.ui.directNav}
                  </span>
                  {quickLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#292019] hover:bg-[#382c23] text-left transition-all group min-h-[44px]"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-[#f2b705]" />
                          <span className="text-sm font-medium text-white group-hover:text-[#f2b705] transition-colors">
                            {item.label}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-[#c8b7a6] group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Footer info in menu */}
              <div className="pt-6 border-t border-[#f4ebdc]/10 text-xs text-[#c8b7a6] space-y-2">
                <div className="flex items-center justify-between">
                  <span>{t.ui.baseLabel}</span>
                  <span className="text-white">{t.ui.baseValue}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{t.ui.statusLabel}</span>
                  <span className="text-[#a3e635]">{t.ui.statusValue}</span>
                </div>
                <div className="pt-2 text-[10px] text-center font-mono opacity-60">
                  {t.ui.credits}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
