"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Sparkles, BookOpen, Phone, Heart, User, Volume2, VolumeX, Globe } from "lucide-react";
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
  const t = translations[language];

  const quickLinks = [
    { label: t.nav.bookshelf, id: "bookshelf", icon: BookOpen },
    { label: t.nav.phone, id: "phone", icon: Phone },
    { label: t.nav.corkboard, id: "corkboard", icon: Heart },
    { label: t.nav.poster, id: "poster", icon: User },
    { label: t.nav.cat, id: "cat", icon: Sparkles },
    { label: t.nav.globe, id: "globe", icon: Globe },
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

  return (
    <>
      {/* 1. TOP RIGHT: Sound Toggle + Language Toggle + Menu Button */}
      <div className="fixed top-5 right-5 sm:top-8 sm:right-8 z-40 flex items-center gap-2 sm:gap-3">
        {/* Sound Toggle */}
        <button
          onClick={handleSoundBtn}
          aria-label={isMuted ? t.ui.soundUnmuted : t.ui.soundMuted}
          title={isMuted ? t.ui.soundUnmuted : t.ui.soundMuted}
          className="flex items-center justify-center w-11 h-11 rounded-full bg-[#271f1a]/85 hover:bg-[#382b24] text-[#f4ebdc] border border-[#f4ebdc]/15 backdrop-blur-md shadow-xl transition-all hover:scale-105 active:scale-95"
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
          className="flex items-center gap-1.5 px-3.5 h-11 rounded-full bg-[#271f1a]/85 hover:bg-[#382b24] text-[#f4ebdc] border border-[#f4ebdc]/15 backdrop-blur-md shadow-xl text-xs font-mono font-bold tracking-wider transition-all hover:scale-105 active:scale-95"
        >
          <span className={language === "th" ? "text-[#f2b705] font-black" : "text-[#c8b7a6]"}>TH</span>
          <span className="text-[#c8b7a6]/50">/</span>
          <span className={language === "en" ? "text-[#f2b705] font-black" : "text-[#c8b7a6]"}>EN</span>
        </button>

        {/* Menu Button */}
        <button
          onClick={handleMenuOpen}
          aria-label="Open navigation menu"
          className="flex items-center gap-2 px-4 h-11 sm:px-5 rounded-full bg-[#f4ebdc] text-[#2e2620] hover:bg-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-xl hover:scale-105 active:scale-95"
        >
          <Menu className="w-3.5 h-3.5" />
          <span>{t.ui.menu}</span>
        </button>
      </div>

      {/* 2. BOTTOM LEFT: Main Headline & Discovery Tracker */}
      <div className="fixed bottom-5 left-5 sm:bottom-10 sm:left-10 z-30 max-w-[calc(100vw-2.5rem)] sm:max-w-md pointer-events-none select-none">
        <h1 className="font-playfair text-2xl sm:text-4xl lg:text-5xl text-[#f4ebdc] leading-[1.12] tracking-tight mb-2 sm:mb-3 whitespace-pre-line">
          {t.ui.headline}
        </h1>
        <p className="font-karla text-xs sm:text-sm text-[#c8b7a6] leading-relaxed mb-3 sm:mb-4 max-w-xs sm:max-w-sm">
          {t.ui.subheadline}
        </p>

        {/* Discovery Progress */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#271f1a]/85 border border-[#f4ebdc]/15 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#f2b705]" />
          <span className="font-mono text-[10px] sm:text-[11px] tracking-widest text-[#f4ebdc]/90 uppercase">
            {t.ui.discoveredBadge.replace("{count}", String(discoveredCount))}
          </span>
        </div>
      </div>

      {/* 3. CENTER / FLOATING HOVER TOOLTIP */}
      <AnimatePresence>
        {hoveredObject && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed top-6 sm:top-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none px-4 py-1.5 rounded-full bg-[#271f1a]/90 text-[#f4ebdc] border border-[#f2b705]/40 backdrop-blur-md shadow-2xl flex items-center gap-2 max-w-[90vw]"
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
              className="w-full max-w-md h-full bg-[#231a15] text-[#f4ebdc] border-l border-[#f4ebdc]/10 p-6 sm:p-8 flex flex-col justify-between font-karla shadow-2xl overflow-y-auto"
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
                    className="p-2 rounded-full bg-[#342a23] hover:bg-[#453830] text-[#f4ebdc] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Nav Links */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono tracking-widest text-[#f2b705] uppercase">
                    {t.ui.directNav}
                  </span>
                  {quickLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className="w-full flex items-center justify-between p-4 rounded-xl bg-[#2e231c] hover:bg-[#3d3027] text-left transition-all group min-h-[48px]"
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
