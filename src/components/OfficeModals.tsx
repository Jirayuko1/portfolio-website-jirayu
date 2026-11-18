"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Mail,
  Smartphone,
  Globe,
  Check,
  Copy,
} from "lucide-react";

interface OfficeModalsProps {
  activeModal: string | null;
  onClose: () => void;
  discoveredCount: number;
}

export default function OfficeModals({
  activeModal,
  onClose,
}: OfficeModalsProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [catSpeechIdx, setCatSpeechIdx] = useState(0);

  const email = "jirayu.dev@example.com";

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const catDialogues = [
    "Meow! I'm Zuko, head of moral support and bug catching in this office! 🐾",
    "Did you know? Jirayu always clarifies requirements and edge-cases before touching a single line of code! That saves everyone time.",
    "He bridges the gap between Mobile apps (iOS & Android) and Web architectures seamlessly!",
    "He is dedicated, loves learning new frameworks, and never says no to a good challenge!",
    "Purrr... want to hire him? Click on the pink telephone to get in touch!",
  ];

  if (!activeModal) return null;

  const modalTitles: Record<string, string> = {
    bookshelf: "Case Studies",
    phone: "Direct Contact",
    cat: "Office Companion",
    corkboard: "Kind Words",
    globe: "Location & Mode",
    poster: "Engineering Philosophy",
    plant: "Pothos Ivy Care",
    postcard: "Bangkok Postcard",
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#271f1a] text-[#f4ebdc] border border-[#f4ebdc]/15 shadow-2xl p-5 sm:p-10 font-karla"
        >
          {/* Sticky Modal Top Bar with Category & Close Button (Always visible on scroll) */}
          <div className="sticky top-0 z-30 flex items-center justify-between pb-4 pt-1 bg-[#271f1a]/95 backdrop-blur-md border-b border-[#f4ebdc]/10 -mx-5 px-5 sm:-mx-10 sm:px-10 mb-6">
            <span className="text-[11px] font-mono tracking-widest text-[#f2b705] uppercase">
              {modalTitles[activeModal] || "Office Artifact"}
            </span>

            <button
              onClick={onClose}
              aria-label="Close modal (Press Escape)"
              className="p-2 rounded-full bg-[#3d312a] hover:bg-[#524239] text-[#f4ebdc] transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* 1. BOOKSHELF / CASE STUDIES */}
          {activeModal === "bookshelf" && (
            <div className="break-words">
              <span className="font-caveat text-xl text-[#f2b705] block mb-1">
                From the bookshelf 📚
              </span>
              <h2 className="font-playfair text-2xl sm:text-4xl text-[#f4ebdc] mb-3">
                Selected Case Studies
              </h2>
              <p className="text-xs sm:text-sm text-[#d4c3b3] mb-6">
                Detailed breakdowns of products built with an engineering-first mindset.
              </p>

              <div className="space-y-6">
                {/* Project 1 */}
                <div className="p-5 sm:p-6 rounded-2xl bg-[#342a23] border border-[#f4ebdc]/10">
                  <div className="flex items-center justify-between text-xs font-mono text-[#f2b705] mb-2">
                    <span className="flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5" /> Mobile App & Cloud
                    </span>
                    <span>2026</span>
                  </div>
                  <h3 className="font-playfair text-xl sm:text-2xl text-white mb-2">
                    OmniFit — AI Health & Workout Companion
                  </h3>
                  <p className="text-xs sm:text-sm text-[#d4c3b3] leading-relaxed mb-4">
                    Cross-platform mobile application engineered with offline-first local SQLite sync and computer vision rep-counting.
                  </p>
                  <div className="p-3 rounded-xl bg-[#231a15] text-xs text-[#a3e635] font-mono mb-4 border border-[#a3e635]/20 leading-relaxed">
                    ★ Key Requirement Solved: Clarified data persistence needs; designed a local sync engine reducing battery usage by 35%.
                  </div>
                  <div className="flex flex-wrap gap-2 text-[11px] font-mono text-[#f4ebdc]/80">
                    <span className="px-2 py-0.5 rounded bg-[#231a15]">React Native</span>
                    <span className="px-2 py-0.5 rounded bg-[#231a15]">Node.js</span>
                    <span className="px-2 py-0.5 rounded bg-[#231a15]">PostgreSQL</span>
                  </div>
                </div>

                {/* Project 2 */}
                <div className="p-5 sm:p-6 rounded-2xl bg-[#342a23] border border-[#f4ebdc]/10">
                  <div className="flex items-center justify-between text-xs font-mono text-[#f2b705] mb-2">
                    <span className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5" /> Full-Stack Platform
                    </span>
                    <span>2024</span>
                  </div>
                  <h3 className="font-playfair text-xl sm:text-2xl text-white mb-2">
                    NexFlow — Cloud Logistics & Dispatch System
                  </h3>
                  <p className="text-xs sm:text-sm text-[#d4c3b3] leading-relaxed mb-4">
                    High-throughput real-time telemetry and dispatch architecture handling 10,000+ WebSocket events per second with sub-50ms latency.
                  </p>
                  <div className="p-3 rounded-xl bg-[#231a15] text-xs text-[#a3e635] font-mono mb-4 border border-[#a3e635]/20 leading-relaxed">
                    ★ Key Requirement Solved: Re-architected message queue with Kafka and Redis after interviewing operations staff.
                  </div>
                  <div className="flex flex-wrap gap-2 text-[11px] font-mono text-[#f4ebdc]/80">
                    <span className="px-2 py-0.5 rounded bg-[#231a15]">Next.js</span>
                    <span className="px-2 py-0.5 rounded bg-[#231a15]">NestJS</span>
                    <span className="px-2 py-0.5 rounded bg-[#231a15]">Kafka</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. PHONE / CONTACT */}
          {activeModal === "phone" && (
            <div className="text-center sm:text-left break-words">
              <span className="font-caveat text-xl text-[#f2b705] block mb-1">
                Ring ring! ☎️
              </span>
              <h2 className="font-playfair text-2xl sm:text-4xl text-[#f4ebdc] mb-3">
                Let&rsquo;s Connect
              </h2>
              <p className="text-xs sm:text-sm text-[#d4c3b3] mb-6">
                Available for Full-Stack & Mobile Developer roles, high-impact projects, or engineering consulting.
              </p>

              <div className="p-5 sm:p-6 rounded-2xl bg-[#342a23] border border-[#f4ebdc]/10 space-y-6">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#231a15]">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-[#f2b705]/20 flex items-center justify-center text-[#f2b705]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="text-left min-w-0">
                      <span className="text-xs text-[#d4c3b3] block">Direct Email</span>
                      <span className="text-xs sm:text-base font-mono font-medium text-white break-all">
                        {email}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCopy}
                    className="shrink-0 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-[#f2b705] hover:bg-[#d9a514] text-[#1b1a18] font-medium text-xs transition-colors shadow-md"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-950" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#231a15] hover:bg-[#2e231c] text-xs font-mono text-white transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span>GitHub</span>
                  </a>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#231a15] hover:bg-[#2e231c] text-xs font-mono text-white transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                </div>

                <div className="text-center font-caveat text-lg text-[#f2b705]">
                  &ldquo;Clear communication and verified specs make great software.&rdquo;
                </div>
              </div>
            </div>
          )}

          {/* 3. ZUKO THE CAT */}
          {activeModal === "cat" && (
            <div>
              <span className="font-caveat text-xl text-[#f2b705] block mb-1">
                Office Intern 🐾
              </span>
              <h2 className="font-playfair text-2xl sm:text-4xl text-[#f4ebdc] mb-4">
                Zuko Speaks
              </h2>

              <div className="p-5 sm:p-6 rounded-2xl bg-[#342a23] border border-[#f4ebdc]/10 mb-6">
                <div className="font-caveat text-2xl text-white leading-relaxed min-h-[90px] flex items-center">
                  &ldquo;{catDialogues[catSpeechIdx]}&rdquo;
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-[#d4c3b3] font-mono">
                  Quote {catSpeechIdx + 1} of {catDialogues.length}
                </span>
                <button
                  onClick={() =>
                    setCatSpeechIdx((prev) => (prev + 1) % catDialogues.length)
                  }
                  className="px-5 py-2.5 rounded-full bg-[#f2b705] hover:bg-[#d9a514] text-[#1b1a18] text-xs font-bold font-mono tracking-wider transition-all"
                >
                  PRESS TALKING BUTTON
                </button>
              </div>
            </div>
          )}

          {/* 4. CORKBOARD / KIND WORDS */}
          {activeModal === "corkboard" && (
            <div>
              <span className="font-caveat text-xl text-[#f2b705] block mb-1">
                Pinboard 📌
              </span>
              <h2 className="font-playfair text-2xl sm:text-4xl text-[#f4ebdc] mb-3">
                Kind Words & Feedback
              </h2>
              <p className="text-xs sm:text-sm text-[#d4c3b3] mb-6">
                Sticky notes from team leads, engineers, and product managers:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-[#fef08a] text-[#713f12] sticky-note rotate-[-1deg]">
                  <span className="text-[10px] font-mono uppercase tracking-wider block opacity-75 mb-1">
                    Senior Product Manager
                  </span>
                  <p className="font-caveat text-lg leading-snug">
                    &ldquo;Jirayu&rsquo;s habit of clarifying requirements upfront saved our sprint 3 weeks of potential rework. An indispensable problem solver!&rdquo;
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#bbf7d0] text-[#14532d] sticky-note rotate-[1.5deg]">
                  <span className="text-[10px] font-mono uppercase tracking-wider block opacity-75 mb-1">
                    Lead Mobile Engineer
                  </span>
                  <p className="font-caveat text-lg leading-snug">
                    &ldquo;Effortlessly bridges native iOS/Android code and Web APIs. Clean architecture and zero cut corners.&rdquo;
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#fed7aa] text-[#7c2d12] sticky-note rotate-[-2deg]">
                  <span className="text-[10px] font-mono uppercase tracking-wider block opacity-75 mb-1">
                    Tech Director
                  </span>
                  <p className="font-caveat text-lg leading-snug">
                    &ldquo;Dedicated, humble, and has a great growth mindset. Always eager to dive into new tech stacks.&rdquo;
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#e9d5ff] text-[#581c87] sticky-note rotate-[1deg]">
                  <span className="text-[10px] font-mono uppercase tracking-wider block opacity-75 mb-1">
                    Frontend Designer
                  </span>
                  <p className="font-caveat text-lg leading-snug">
                    &ldquo;Has great respect for design details and micro-interactions. A rare engineer who cares as much about UX as code.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 5. GLOBE / TRAVELS */}
          {activeModal === "globe" && (
            <div>
              <span className="font-caveat text-xl text-[#f2b705] block mb-1">
                World Map 🌍
              </span>
              <h2 className="font-playfair text-2xl sm:text-4xl text-[#f4ebdc] mb-3">
                Bangkok & Remote Collaboration
              </h2>
              <p className="text-xs sm:text-sm text-[#d4c3b3] mb-6">
                Based in vibrant Bangkok, Thailand (GMT+7). Experienced in working with remote distributed teams across APAC, Europe, and North America.
              </p>
              <div className="p-5 sm:p-6 rounded-2xl bg-[#342a23] border border-[#f4ebdc]/10 font-mono text-xs space-y-3">
                <div className="flex items-center justify-between border-b border-[#f4ebdc]/10 pb-2">
                  <span className="text-[#d4c3b3]">Current Base:</span>
                  <span className="text-white">Bangkok, Thailand</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#f4ebdc]/10 pb-2">
                  <span className="text-[#d4c3b3]">Working Mode:</span>
                  <span className="text-[#a3e635]">Remote / Hybrid Worldwide</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#d4c3b3]">Languages:</span>
                  <span className="text-white">Thai (Native), English (Professional)</span>
                </div>
              </div>
            </div>
          )}

          {/* 6. POSTER / ABOUT ME */}
          {activeModal === "poster" && (
            <div>
              <span className="font-caveat text-xl text-[#f2b705] block mb-1">
                The Manifesto 🎸
              </span>
              <h2 className="font-playfair text-2xl sm:text-4xl text-[#f4ebdc] mb-4">
                Ask First, Code Later
              </h2>
              <div className="space-y-4 text-xs sm:text-base text-[#d4c3b3] leading-relaxed font-karla">
                <p>
                  Coding is the execution phase. The real engineering happens before the editor opens: in understanding the user&rsquo;s core problem, challenging vague requirements, and clarifying edge-cases.
                </p>
                <p>
                  As a Full-Stack and Mobile Developer, I love the harmony between intuitive frontends and resilient backends. I stay hungry, dedicated to continuous learning, and take pride in work that stands the test of time.
                </p>
              </div>
            </div>
          )}

          {/* 7. PLANT */}
          {activeModal === "plant" && (
            <div className="text-center py-4">
              <span className="font-caveat text-3xl text-[#a3e635] block mb-2">
                Pothos Ivy Care 🌿
              </span>
              <p className="font-playfair text-xl sm:text-2xl text-white mb-3">
                &ldquo;Water regularly, give ample indirect light, and refactor clean code.&rdquo;
              </p>
              <span className="text-xs text-[#d4c3b3] font-mono">
                Thriving in the office alongside clean Git commits.
              </span>
            </div>
          )}

          {/* 8. POSTCARD */}
          {activeModal === "postcard" && (
            <div className="text-center py-4">
              <span className="font-caveat text-3xl text-[#f2b705] block mb-2">
                Greetings from Bangkok 💌
              </span>
              <p className="font-playfair text-lg sm:text-xl text-white mb-2">
                &ldquo;Where street food meets high-tech product engineering.&rdquo;
              </p>
              <span className="text-xs text-[#d4c3b3] font-mono">
                Postmarked Bangkok, 2026.
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
