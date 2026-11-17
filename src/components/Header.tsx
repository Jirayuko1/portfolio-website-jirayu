"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { number: "01", label: "About", href: "#about" },
    { number: "02", label: "Projects", href: "#projects" },
    { number: "03", label: "Services", href: "#services" },
    { number: "04", label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 w-full px-6 py-7 sm:px-12 flex items-center justify-between pointer-events-none">
        {/* Brand */}
        <a
          href="/"
          className="pointer-events-auto flex flex-col font-montreal tracking-tight group"
        >
          <span className="text-xl sm:text-2xl font-bold leading-none text-black">
            Jirayu
          </span>
          <span className="text-xs text-zinc-500 font-normal">Developer</span>
        </a>

        {/* Right side navigation & menu button */}
        <div className="pointer-events-auto flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-8 text-sm font-montreal">
            {navLinks.slice(0, 3).map((link) => (
              <a
                key={link.number}
                href={link.href}
                className="group flex items-baseline gap-1.5 text-zinc-600 hover:text-black transition-colors"
              >
                <span className="text-[11px] text-zinc-400 group-hover:text-black transition-colors">
                  {link.number}
                </span>
                <span className="font-medium">{link.label}</span>
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="text-xs uppercase tracking-widest font-mono font-medium text-black px-3.5 py-1.5 rounded-full border border-black/15 hover:border-black transition-all bg-white/80 backdrop-blur-md"
          >
            menu
          </button>
        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 bg-[#121214] text-white flex flex-col justify-between p-8 sm:p-16"
          >
            {/* Top Bar inside Menu */}
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold font-montreal tracking-tight text-white">
                Jirayu
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-zinc-400 hover:text-white transition-colors"
              >
                <span>close</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Menu Links in Humane Font */}
            <nav className="flex flex-col gap-2 my-auto">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.number}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.08, duration: 0.4 }}
                  className="group flex items-baseline gap-4 hover:translate-x-3 transition-transform duration-300"
                >
                  <span className="font-mono text-sm sm:text-lg text-zinc-500 group-hover:text-blue-400 transition-colors">
                    ({link.number})
                  </span>
                  <span className="font-humane text-7xl sm:text-9xl md:text-[11rem] leading-[0.8] text-white group-hover:text-zinc-300 transition-colors">
                    {link.label}
                  </span>
                </motion.a>
              ))}
            </nav>

            {/* Bottom info in Menu */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-zinc-500 border-t border-zinc-800 pt-6 gap-4">
              <span>Full-Stack & Mobile Developer — Bangkok</span>
              <div className="flex items-center gap-6 text-zinc-400">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  GitHub
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  LinkedIn
                </a>
                <a href="mailto:jirayu.dev@example.com" className="hover:text-white transition-colors">
                  Email
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
