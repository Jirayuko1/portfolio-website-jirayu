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
  BookOpen,
  Award,
  Sparkles,
  Music,
  Fish,
  Lightbulb,
} from "lucide-react";
import { Language, translations } from "@/lib/translations";
import { sound } from "@/lib/soundEffects";

interface OfficeModalsProps {
  activeModal: string | null;
  onClose: () => void;
  discoveredCount: number;
  language: Language;
}

export default function OfficeModals({
  activeModal,
  onClose,
  language,
}: OfficeModalsProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const email = "jirayu.dev@example.com";
  const t = translations[language].modals;

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        sound.playClick();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleClose = () => {
    sound.playClick();
    onClose();
  };

  const handleCopy = () => {
    sound.playClick();
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  if (!activeModal) return null;

  const modalTitles: Record<string, Record<Language, string>> = {
    laptop: { en: "Case Studies", th: "ผลงานเด่น (Case Studies)" },
    green_art: { en: "Skills Matrix", th: "ทักษะ Hard & Soft Skills" },
    yellow_vase: { en: "Contact & Bio", th: "ข้อมูลติดต่อและประวัติ" },
    cards_red: { en: "Work Life", th: "ภาพบรรยากาศการทำงาน" },
    cards_green: { en: "Value Proposition", th: "จุดเด่นที่คุ้มค่า (Value Pitch)" },
    cards_blue: { en: "Engineering Articles", th: "บทความและเกร็ดเทคนิค" },
    aquarium: { en: "Aquarium Oasis", th: "ตู้ปลาเรืองแสง (Mini-Game)" },
    speaker: { en: "Lo-Fi Music", th: "สถานีเพลง Lo-Fi" },
    postit: { en: "Quick Wisdom", th: "ข้อคิดการทำงาน" },
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
        role="dialog"
        aria-modal="true"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#231b16] text-[#f4ebdc] border border-[#f4ebdc]/15 shadow-2xl p-5 sm:p-8 font-karla"
        >
          {/* Sticky Modal Top Bar with Category & Close Button */}
          <div className="sticky top-0 z-30 flex items-center justify-between pb-4 pt-1 bg-[#231b16]/95 backdrop-blur-md border-b border-[#f4ebdc]/10 -mx-5 px-5 sm:-mx-8 sm:px-8 mb-6">
            <span className="text-[11px] font-mono tracking-widest text-[#f2b705] uppercase">
              {modalTitles[activeModal]?.[language] || "Desk Artifact"}
            </span>

            <button
              onClick={handleClose}
              aria-label="Close modal (Press Escape)"
              className="p-2 rounded-full bg-[#382b24] hover:bg-[#4d3c33] text-[#f4ebdc] transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* 1. GREEN ART: HARD & SOFT SKILLS */}
          {activeModal === "green_art" && (
            <div className="break-words space-y-6">
              <div>
                <span className="font-caveat text-xl text-[#a3e635] block mb-1">
                  {t.green_art.tag}
                </span>
                <h2 className="font-playfair text-2xl sm:text-3xl text-white mb-2">
                  {t.green_art.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#d4c3b3] leading-relaxed">
                  {t.green_art.desc}
                </p>
              </div>

              {/* Hard Skills */}
              <div className="space-y-3">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#f2b705] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {t.green_art.hardSkillsTitle}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {t.green_art.hardSkills.map((h, i) => (
                    <div key={i} className="p-4 rounded-xl bg-[#2e231d] border border-[#f4ebdc]/10">
                      <span className="font-semibold text-sm text-white block mb-1">{h.name}</span>
                      <p className="text-xs text-[#d4c3b3] leading-relaxed">{h.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div className="space-y-3">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#a3e635] flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5" />
                  {t.green_art.softSkillsTitle}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {t.green_art.softSkills.map((s, i) => (
                    <div key={i} className="p-4 rounded-xl bg-[#2e231d] border border-[#f4ebdc]/10">
                      <span className="font-semibold text-sm text-[#a3e635] block mb-1">★ {s.title}</span>
                      <p className="text-xs text-[#d4c3b3] leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. YELLOW VASE: CONTACT & BIO & EDUCATION */}
          {activeModal === "yellow_vase" && (
            <div className="break-words space-y-6">
              <div>
                <span className="font-caveat text-xl text-[#f2b705] block mb-1">
                  {t.yellow_vase.tag}
                </span>
                <h2 className="font-playfair text-2xl sm:text-3xl text-white mb-2">
                  {t.yellow_vase.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#d4c3b3] leading-relaxed">
                  {t.yellow_vase.desc}
                </p>
              </div>

              {/* Contact Card */}
              <div className="p-5 rounded-2xl bg-[#2e231d] border border-[#f4ebdc]/10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[#1c1511]">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Mail className="w-5 h-5 text-[#f2b705] shrink-0" />
                    <div className="overflow-hidden">
                      <span className="text-[10px] font-mono text-[#d4c3b3] block uppercase tracking-wider">
                        {t.yellow_vase.email}
                      </span>
                      <span className="text-sm font-mono text-white font-medium break-all">
                        {email}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#f2b705] hover:bg-[#d9a404] text-[#1c1613] text-xs font-mono font-bold transition-all shadow-md active:scale-95 shrink-0"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t.yellow_vase.copyBtn}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <a
                    href="https://github.com/Jirayuko1/portfolio-website-jirayu"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-xl bg-[#1c1511] hover:bg-[#382b24] border border-[#f4ebdc]/5 flex items-center justify-between text-[#f4ebdc] transition-colors"
                  >
                    <span>{t.yellow_vase.github}</span>
                    <span className="text-[#f2b705]">github.com/Jirayuko1 ↗</span>
                  </a>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-xl bg-[#1c1511] hover:bg-[#382b24] border border-[#f4ebdc]/5 flex items-center justify-between text-[#f4ebdc] transition-colors"
                  >
                    <span>{t.yellow_vase.linkedin}</span>
                    <span className="text-[#f2b705]">linkedin.com/in/jirayu ↗</span>
                  </a>
                </div>

                <div className="text-[11px] font-mono text-[#d4c3b3] flex items-center justify-between pt-2 border-t border-[#f4ebdc]/10">
                  <span>{t.yellow_vase.location}</span>
                  <span className="text-white">{t.yellow_vase.locationVal}</span>
                </div>
              </div>

              {/* Education */}
              <div className="space-y-3">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#f2b705] flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  {t.yellow_vase.educationTitle}
                </h3>
                <div className="space-y-2.5">
                  {t.yellow_vase.education.map((edu, i) => (
                    <div key={i} className="p-4 rounded-xl bg-[#2e231d] border border-[#f4ebdc]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <span className="font-semibold text-sm text-white block">{edu.degree}</span>
                        <span className="text-xs text-[#d4c3b3]">{edu.school}</span>
                      </div>
                      <span className="text-xs font-mono text-[#a3e635]">{edu.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. LAPTOP: CASE STUDIES */}
          {activeModal === "laptop" && (
            <div className="break-words space-y-6">
              <div>
                <span className="font-caveat text-xl text-[#f2b705] block mb-1">
                  {t.laptop.tag}
                </span>
                <h2 className="font-playfair text-2xl sm:text-3xl text-white mb-2">
                  {t.laptop.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#d4c3b3] leading-relaxed">
                  {t.laptop.desc}
                </p>
              </div>

              <div className="space-y-4">
                {t.laptop.projects.map((proj, idx) => (
                  <div key={idx} className="p-5 sm:p-6 rounded-2xl bg-[#2e231d] border border-[#f4ebdc]/10">
                    <div className="flex items-center justify-between text-xs font-mono text-[#f2b705] mb-2">
                      <span className="flex items-center gap-1.5">
                        {idx === 0 ? <Smartphone className="w-3.5 h-3.5" /> : <Globe className="w-3.5 h-3.5" />}
                        {proj.type}
                      </span>
                      <span>{proj.year}</span>
                    </div>
                    <h3 className="font-playfair text-xl sm:text-2xl text-white mb-2">
                      {proj.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#d4c3b3] leading-relaxed mb-4">
                      {proj.desc}
                    </p>
                    <div className="p-3 rounded-xl bg-[#1c1511] text-xs text-[#a3e635] font-mono mb-4 border border-[#a3e635]/20 leading-relaxed">
                      ★ {proj.solved}
                    </div>
                    <div className="flex flex-wrap gap-2 text-[11px] font-mono text-[#f4ebdc]/80">
                      {proj.stack.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded bg-[#1c1511]">{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. CARDS RED: WORK LIFE SNAPSHOTS */}
          {activeModal === "cards_red" && (
            <div className="break-words space-y-6">
              <div>
                <span className="font-caveat text-xl text-[#f87171] block mb-1">
                  {t.cards_red.tag}
                </span>
                <h2 className="font-playfair text-2xl sm:text-3xl text-white mb-2">
                  {t.cards_red.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#d4c3b3] leading-relaxed">
                  {t.cards_red.desc}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {t.cards_red.cards.map((c, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[#fed7aa] text-[#7c2d12] shadow-md border-t-4 border-[#ea580c]">
                    <span className="font-bold text-xs uppercase tracking-wider block mb-1">{c.title}</span>
                    <p className="font-caveat text-base leading-snug">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. CARDS GREEN: VALUE PROPOSITION */}
          {activeModal === "cards_green" && (
            <div className="break-words space-y-6">
              <div>
                <span className="font-caveat text-xl text-[#a3e635] block mb-1">
                  {t.cards_green.tag}
                </span>
                <h2 className="font-playfair text-2xl sm:text-3xl text-white mb-2">
                  {t.cards_green.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#d4c3b3] leading-relaxed">
                  {t.cards_green.desc}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {t.cards_green.cards.map((c, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[#bbf7d0] text-[#14532d] shadow-md border-t-4 border-[#16a34a]">
                    <span className="font-bold text-xs uppercase tracking-wider block mb-1">{c.title}</span>
                    <p className="font-caveat text-base leading-snug">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. CARDS BLUE: ENGINEERING ARTICLES */}
          {activeModal === "cards_blue" && (
            <div className="break-words space-y-6">
              <div>
                <span className="font-caveat text-xl text-[#60a5fa] block mb-1">
                  {t.cards_blue.tag}
                </span>
                <h2 className="font-playfair text-2xl sm:text-3xl text-white mb-2">
                  {t.cards_blue.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#d4c3b3] leading-relaxed">
                  {t.cards_blue.desc}
                </p>
              </div>

              <div className="space-y-3.5">
                {t.cards_blue.cards.map((art, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[#2e231d] border border-[#f4ebdc]/10 hover:border-[#60a5fa]/50 transition-colors">
                    <div className="flex items-center justify-between text-xs font-mono text-[#60a5fa] mb-1">
                      <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> Technical Article</span>
                      <span>{art.readTime}</span>
                    </div>
                    <h3 className="font-playfair text-base sm:text-lg text-white mb-1.5">{art.title}</h3>
                    <p className="text-xs text-[#d4c3b3] leading-relaxed">{art.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. AQUARIUM MINI-GAME */}
          {activeModal === "aquarium" && (
            <div className="break-words text-center py-4 space-y-4">
              <span className="font-caveat text-3xl text-[#38bdf8] block mb-1">
                {t.aquarium.tag}
              </span>
              <h2 className="font-playfair text-2xl sm:text-3xl text-white">
                {t.aquarium.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#d4c3b3] max-w-md mx-auto leading-relaxed">
                {t.aquarium.desc}
              </p>
              <div className="p-4 rounded-2xl bg-[#0369a1]/20 border border-[#38bdf8]/40 text-xs text-[#38bdf8] font-mono leading-relaxed max-w-sm mx-auto">
                <Fish className="w-5 h-5 mx-auto mb-2 text-[#38bdf8]" />
                {t.aquarium.instruction}
              </div>
            </div>
          )}

          {/* 8. SPEAKER LO-FI MUSIC */}
          {activeModal === "speaker" && (
            <div className="break-words text-center py-4 space-y-4">
              <span className="font-caveat text-3xl text-[#f2b705] block mb-1">
                {t.speaker.tag}
              </span>
              <h2 className="font-playfair text-2xl sm:text-3xl text-white">
                {t.speaker.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#d4c3b3] max-w-md mx-auto leading-relaxed">
                {t.speaker.desc}
              </p>
              <div className="p-4 rounded-2xl bg-[#f2b705]/10 border border-[#f2b705]/30 text-xs text-[#f2b705] font-mono leading-relaxed max-w-sm mx-auto flex items-center justify-center gap-2">
                <Music className="w-4 h-4 animate-bounce" />
                <span>Click speaker on desk to toggle music</span>
              </div>
            </div>
          )}

          {/* 9. POST-IT NOTE */}
          {activeModal === "postit" && (
            <div className="break-words text-center py-6">
              <div className="w-64 h-64 mx-auto p-6 rounded-xl bg-[#fef08a] text-[#713f12] shadow-2xl flex flex-col justify-between rotate-[-2deg]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#a16207]">★ Rule #1</span>
                <p className="font-caveat text-2xl font-bold leading-relaxed">
                  &ldquo;Ask First, Code Later.&rdquo;
                </p>
                <span className="text-xs font-mono text-[#a16207]">Always clarify specs upfront.</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
