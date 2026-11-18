"use client";

import { motion } from "framer-motion";

interface PreloaderProps {
  progress: number;
}

export default function Preloader({ progress }: PreloaderProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1c1613] text-[#f4ebdc] select-none p-6"
    >
      <div className="flex flex-col items-center text-center max-w-sm">
        {/* Glowing Lamp Icon / Orb */}
        <div className="relative w-14 h-14 mb-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#f2b705]/20 blur-xl animate-pulse" />
          <div className="w-8 h-8 rounded-full bg-[#f2b705] shadow-lg shadow-[#f2b705]/50 flex items-center justify-center text-[#1c1613] font-bold text-xs">
            💡
          </div>
        </div>

        {/* Title */}
        <h2 className="font-playfair text-3xl sm:text-4xl text-[#f4ebdc] tracking-tight mb-2">
          Jirayu&rsquo;s Desk
        </h2>

        {/* Handwritten subtitle */}
        <p className="font-caveat text-xl sm:text-2xl text-[#f2b705] mb-8">
          Setting up the lights & workstation...
        </p>

        {/* Progress Bar */}
        <div className="w-56 h-1 rounded-full bg-[#3d312a] overflow-hidden mb-3">
          <motion.div
            className="h-full bg-gradient-to-r from-[#f2b705] to-[#f59e0b] rounded-full"
            initial={{ width: "10%" }}
            animate={{ width: `${Math.max(15, progress)}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <span className="font-mono text-[10px] tracking-widest text-[#c8b7a6] uppercase">
          Loading 3D Environment ({Math.round(progress)}%)
        </span>
      </div>
    </motion.div>
  );
}
