"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 sm:p-6 transition-all duration-300">
      <nav
        className={`flex items-center justify-between w-full max-w-5xl px-5 py-3 rounded-full border transition-all duration-300 ${
          scrolled
            ? "bg-zinc-950/80 border-zinc-800/80 backdrop-blur-xl shadow-2xl shadow-black/50"
            : "bg-zinc-950/40 border-zinc-800/40 backdrop-blur-md"
        }`}
      >
        {/* Brand */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="font-semibold text-sm tracking-wider uppercase text-zinc-100 group-hover:text-blue-400 transition-colors">
            JIRAYU<span className="text-blue-500">.</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Open for projects
          </span>
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-medium tracking-wide text-zinc-400">
          <a href="#about" className="hover:text-zinc-100 transition-colors">
            PHILOSOPHY
          </a>
          <a href="#projects" className="hover:text-zinc-100 transition-colors">
            PROJECTS
          </a>
          <a href="#skills" className="hover:text-zinc-100 transition-colors">
            TECH STACK
          </a>
        </div>

        {/* Action Button */}
        <a
          href="#contact"
          className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-zinc-100 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/60 rounded-full transition-all hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 group"
        >
          <span>Connect</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </nav>
    </header>
  );
}
