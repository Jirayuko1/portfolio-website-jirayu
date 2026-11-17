"use client";

import { motion } from "framer-motion";
import { ArrowDown, Code2, Smartphone, Terminal, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-32 pb-20 text-center">
      {/* Background radial gradient accent */}
      <div className="absolute top-1/3 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Role Pill */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-md mb-8"
      >
        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
        <span className="text-xs font-mono font-medium tracking-wider text-blue-300 uppercase">
          Full-Stack & Mobile Engineer
        </span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="max-w-4xl text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-zinc-100 leading-[1.1] mb-6 font-sans"
      >
        Building scalable{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400">
          Web Systems
        </span>{" "}
        & intuitive{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-blue-400">
          Mobile Apps
        </span>
        .
      </motion.h1>

      {/* Subtitle / Positioning Statement */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-2xl text-base sm:text-lg text-zinc-400 leading-relaxed font-normal mb-10"
      >
        ขับเคลื่อนด้วยแนวคิด <span className="text-zinc-200 font-medium">"Ask First, Code Later"</span> ทำความเข้าใจโจทย์และเคลียร์ Requirements ให้ชัดเจนเพื่อส่งมอบสถาปัตยกรรมที่แข็งแกร่ง ทุ่มเทและพร้อมเรียนรู้สิ่งใหม่อยู่เสมอ
      </motion.p>

      {/* Dual Badge Highlights */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-3 mb-12"
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm text-xs font-mono text-zinc-300">
          <Smartphone className="w-4 h-4 text-sky-400" />
          <span>Mobile Apps (iOS & Android)</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm text-xs font-mono text-zinc-300">
          <Code2 className="w-4 h-4 text-blue-400" />
          <span>Modern Web & Cloud Backend</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm text-xs font-mono text-zinc-300">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span>Requirements Clarity & Clean Code</span>
        </div>
      </motion.div>

      {/* Call to Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex flex-col sm:flex-row items-center gap-4"
      >
        <a
          href="#projects"
          className="w-full sm:w-auto px-7 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm tracking-wide transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40"
        >
          Explore Works
        </a>
        <a
          href="#about"
          className="w-full sm:w-auto px-7 py-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/60 text-zinc-300 font-medium text-sm tracking-wide transition-all hover:text-white"
        >
          Engineering Philosophy
        </a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 text-[11px] tracking-widest font-mono uppercase"
      >
        <span>SCROLL DOWN</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </motion.div>
    </section>
  );
}
