"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Sparkles, BookOpen, Phone, Heart, User } from "lucide-react";

interface OfficeUIProps {
  discoveredCount: number;
  hoveredObject: string | null;
  onOpenModal: (id: string) => void;
}

export default function OfficeUI({
  discoveredCount,
  hoveredObject,
  onOpenModal,
}: OfficeUIProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const quickLinks = [
    { label: "Case Studies & Works", id: "bookshelf", icon: BookOpen },
    { label: "Get in Touch (Phone)", id: "phone", icon: Phone },
    { label: "Kind Words & Feedback", id: "corkboard", icon: Heart },
    { label: "Engineering Philosophy", id: "poster", icon: User },
    { label: "Talk to Zuko the Cat", id: "cat", icon: Sparkles },
  ];

  return (
    <>
      {/* 1. TOP RIGHT: Menu Button */}
      <div className="fixed top-6 right-6 sm:top-8 sm:right-8 z-40">
        <button
          onClick={() => setMenuOpen(true)}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#f4ebdc] text-[#2e2620] hover:bg-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-xl hover:scale-105 active:scale-95"
        >
          <Menu className="w-3.5 h-3.5" />
          <span>Menu</span>
        </button>
      </div>

      {/* 2. BOTTOM LEFT: Main Headline & Discovery Tracker */}
      <div className="fixed bottom-6 left-6 sm:bottom-10 sm:left-10 z-30 max-w-md pointer-events-none select-none">
        <h1 className="font-playfair text-3xl sm:text-5xl lg:text-6xl text-[#f4ebdc] leading-[1.05] tracking-tight mb-3">
          Welcome to <br />
          my office
        </h1>
        <p className="font-karla text-xs sm:text-sm text-[#c8b7a6] leading-relaxed mb-4 max-w-sm">
          Click around and see what you find — or use the menu for a quicker way through.
        </p>

        {/* Discovery Progress */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#271f1a]/80 border border-[#f4ebdc]/15 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#f2b705] animate-pulse" />
          <span className="font-mono text-[11px] tracking-widest text-[#f4ebdc]/90 uppercase">
            {discoveredCount} of 17 discovered
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
            className="fixed top-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none px-4 py-1.5 rounded-full bg-[#271f1a]/90 text-[#f4ebdc] border border-[#f2b705]/40 backdrop-blur-md shadow-2xl flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#f2b705]" />
            <span className="font-caveat text-lg text-[#f2b705]">Click to explore:</span>
            <span className="font-karla text-xs font-semibold text-white tracking-wide">
              {hoveredObject}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. QUICK NAVIGATION MENU (DRAWER) */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full max-w-md h-full bg-[#231a15] text-[#f4ebdc] border-l border-[#f4ebdc]/10 p-8 flex flex-col justify-between font-karla shadow-2xl"
            >
              {/* Header */}
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#f4ebdc]/10 mb-8">
                  <div>
                    <h2 className="font-playfair text-2xl text-white">Jirayu</h2>
                    <span className="text-xs text-[#9c897a]">Full-Stack & Mobile Developer</span>
                  </div>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="p-2 rounded-full bg-[#342a23] hover:bg-[#453830] text-[#f4ebdc] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Nav Links */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono tracking-widest text-[#f2b705] uppercase">
                    Direct Navigation
                  </span>
                  {quickLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setMenuOpen(false);
                          onOpenModal(item.id);
                        }}
                        className="w-full flex items-center justify-between p-4 rounded-xl bg-[#2e231c] hover:bg-[#3d3027] text-left transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-[#f2b705]" />
                          <span className="text-sm font-medium text-white group-hover:text-[#f2b705] transition-colors">
                            {item.label}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-[#9c897a] group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Footer info in menu */}
              <div className="pt-6 border-t border-[#f4ebdc]/10 text-xs text-[#9c897a] space-y-2">
                <div className="flex items-center justify-between">
                  <span>Base:</span>
                  <span className="text-white">Bangkok, Thailand</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Status:</span>
                  <span className="text-[#a3e635]">Open for opportunities</span>
                </div>
                <div className="pt-2 text-[10px] text-center font-mono opacity-60">
                  © 2026 Jirayu · Inspired by Júlia Moresco
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
