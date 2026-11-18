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
  const [catSpeechIdx, setCatSpeechIdx] = useState(0);

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

  const handleCatMeow = () => {
    sound.playCatMeow();
    setCatSpeechIdx((prev) => (prev + 1) % (t.cat.traits.length));
  };

  if (!activeModal) return null;

  const modalTitles: Record<string, Record<Language, string>> = {
    bookshelf: { en: "Case Studies", th: "กรณีศึกษาและผลงาน" },
    phone: { en: "Direct Contact", th: "ข้อมูลติดต่อโดยตรง" },
    cat: { en: "Office Companion", th: "ผู้ช่วยประจำออฟฟิศ" },
    corkboard: { en: "Kind Words", th: "คำนิยมและความเห็น" },
    globe: { en: "Location & Mode", th: "พิกัดและการทำงาน" },
    poster: { en: "Engineering Philosophy", th: "ปรัชญาการพัฒนา" },
    plant: { en: "Pothos Ivy Care", th: "การดูแลต้นไม้" },
    postcard: { en: "Bangkok Postcard", th: "โปสการ์ดกรุงเทพฯ" },
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm"
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
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#271f1a] text-[#f4ebdc] border border-[#f4ebdc]/15 shadow-2xl p-5 sm:p-10 font-karla"
        >
          {/* Sticky Modal Top Bar with Category & Close Button */}
          <div className="sticky top-0 z-30 flex items-center justify-between pb-4 pt-1 bg-[#271f1a]/95 backdrop-blur-md border-b border-[#f4ebdc]/10 -mx-5 px-5 sm:-mx-10 sm:px-10 mb-6">
            <span className="text-[11px] font-mono tracking-widest text-[#f2b705] uppercase">
              {modalTitles[activeModal]?.[language] || "Office Artifact"}
            </span>

            <button
              onClick={handleClose}
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
                {t.bookshelf.tag}
              </span>
              <h2 className="font-playfair text-2xl sm:text-4xl text-[#f4ebdc] mb-3">
                {t.bookshelf.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#d4c3b3] mb-6 leading-relaxed">
                {t.bookshelf.desc}
              </p>

              <div className="space-y-6">
                {t.bookshelf.projects.map((proj, idx) => (
                  <div key={idx} className="p-5 sm:p-6 rounded-2xl bg-[#342a23] border border-[#f4ebdc]/10">
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
                    <div className="p-3 rounded-xl bg-[#231a15] text-xs text-[#a3e635] font-mono mb-4 border border-[#a3e635]/20 leading-relaxed">
                      ★ {proj.solved}
                    </div>
                    <div className="flex flex-wrap gap-2 text-[11px] font-mono text-[#f4ebdc]/80">
                      {proj.stack.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded bg-[#231a15]">{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. PHONE / DIRECT CONTACT */}
          {activeModal === "phone" && (
            <div className="break-words">
              <span className="font-caveat text-xl text-[#f2b705] block mb-1">
                {t.phone.tag}
              </span>
              <h2 className="font-playfair text-2xl sm:text-4xl text-[#f4ebdc] mb-3">
                {t.phone.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#d4c3b3] mb-6 leading-relaxed">
                {t.phone.desc}
              </p>

              <div className="p-5 sm:p-6 rounded-2xl bg-[#342a23] border border-[#f4ebdc]/10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[#271f1a]">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Mail className="w-5 h-5 text-[#f2b705] shrink-0" />
                    <div className="overflow-hidden">
                      <span className="text-[10px] font-mono text-[#d4c3b3] block uppercase tracking-wider">
                        {t.phone.email}
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
                        <span>{t.phone.copyBtn}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <a
                    href="https://github.com/Jirayuko1/portfolio-website-jirayu"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-xl bg-[#271f1a] hover:bg-[#3d312a] border border-[#f4ebdc]/5 flex items-center justify-between text-[#f4ebdc] transition-colors"
                  >
                    <span>{t.phone.github}</span>
                    <span className="text-[#f2b705]">github.com/Jirayuko1 ↗</span>
                  </a>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-xl bg-[#271f1a] hover:bg-[#3d312a] border border-[#f4ebdc]/5 flex items-center justify-between text-[#f4ebdc] transition-colors"
                  >
                    <span>{t.phone.linkedin}</span>
                    <span className="text-[#f2b705]">linkedin.com/in/jirayu ↗</span>
                  </a>
                </div>

                <div className="text-[11px] font-mono text-[#d4c3b3] flex items-center justify-between pt-2 border-t border-[#f4ebdc]/10">
                  <span>{t.phone.location}</span>
                  <span className="text-white">{t.phone.locationVal}</span>
                </div>
              </div>
            </div>
          )}

          {/* 3. CAT / ZUKO COMPANION */}
          {activeModal === "cat" && (
            <div className="break-words">
              <span className="font-caveat text-xl text-[#f2b705] block mb-1">
                {t.cat.tag}
              </span>
              <h2 className="font-playfair text-2xl sm:text-4xl text-[#f4ebdc] mb-3">
                {t.cat.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#d4c3b3] mb-6 leading-relaxed">
                {t.cat.desc}
              </p>

              {/* Interactive Speech Bubble */}
              <div
                onClick={handleCatMeow}
                className="cursor-pointer select-none p-5 sm:p-6 rounded-2xl bg-[#342a23] border border-[#f2b705]/30 relative mb-6 hover:border-[#f2b705] transition-all group"
              >
                <div className="flex items-center justify-between mb-3 text-xs font-mono text-[#f2b705]">
                  <span>🐾 Zuko says (Click me!):</span>
                  <span className="group-hover:scale-110 transition-transform">🔊 Meow</span>
                </div>
                <p className="font-caveat text-xl sm:text-2xl text-white leading-relaxed">
                  &ldquo;{t.cat.traits[catSpeechIdx]?.text}&rdquo;
                </p>
                <div className="mt-3 text-[11px] font-mono text-[#a3e635]">
                  ★ Insight: {t.cat.traits[catSpeechIdx]?.label}
                </div>
              </div>
            </div>
          )}

          {/* 4. CORKBOARD / KIND WORDS */}
          {activeModal === "corkboard" && (
            <div className="break-words">
              <span className="font-caveat text-xl text-[#f2b705] block mb-1">
                {t.corkboard.tag}
              </span>
              <h2 className="font-playfair text-2xl sm:text-4xl text-[#f4ebdc] mb-3">
                {t.corkboard.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#d4c3b3] mb-6 leading-relaxed">
                {t.corkboard.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {t.corkboard.notes.map((note, idx) => {
                  const colors = [
                    "bg-[#fef08a] text-[#713f12]",
                    "bg-[#bbf7d0] text-[#14532d]",
                    "bg-[#fed7aa] text-[#7c2d12]",
                    "bg-[#e9d5ff] text-[#581c87]",
                  ];
                  return (
                    <div key={idx} className={`p-5 rounded-xl ${colors[idx % colors.length]} shadow-md`}>
                      <span className="text-[10px] font-mono uppercase tracking-wider block opacity-75 mb-1 font-bold">
                        {note.role}
                      </span>
                      <p className="font-caveat text-lg leading-snug">
                        &ldquo;{note.text}&rdquo;
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 5. GLOBE / LOCATION */}
          {activeModal === "globe" && (
            <div className="break-words">
              <span className="font-caveat text-xl text-[#f2b705] block mb-1">
                {t.globe.tag}
              </span>
              <h2 className="font-playfair text-2xl sm:text-4xl text-[#f4ebdc] mb-3">
                {t.globe.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#d4c3b3] mb-6 leading-relaxed">
                {t.globe.desc}
              </p>
              <div className="p-5 sm:p-6 rounded-2xl bg-[#342a23] border border-[#f4ebdc]/10 font-mono text-xs space-y-3">
                <div className="flex items-center justify-between border-b border-[#f4ebdc]/10 pb-2">
                  <span className="text-[#d4c3b3]">{language === "th" ? "ที่ตั้งปัจจุบัน:" : "Current Base:"}</span>
                  <span className="text-white">{t.globe.base}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#f4ebdc]/10 pb-2">
                  <span className="text-[#d4c3b3]">{language === "th" ? "รูปแบบการทำงาน:" : "Working Mode:"}</span>
                  <span className="text-[#a3e635]">{t.globe.mode}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#d4c3b3]">{language === "th" ? "ทักษะภาษา:" : "Languages:"}</span>
                  <span className="text-white">{t.globe.languages}</span>
                </div>
              </div>
            </div>
          )}

          {/* 6. POSTER / ABOUT ME */}
          {activeModal === "poster" && (
            <div className="break-words">
              <span className="font-caveat text-xl text-[#f2b705] block mb-1">
                {t.poster.tag}
              </span>
              <h2 className="font-playfair text-2xl sm:text-4xl text-[#f4ebdc] mb-4">
                {t.poster.title}
              </h2>
              <div className="space-y-4 text-xs sm:text-base text-[#d4c3b3] leading-relaxed font-karla">
                <p>{t.poster.p1}</p>
                <p>{t.poster.p2}</p>
              </div>
            </div>
          )}

          {/* 7. PLANT */}
          {activeModal === "plant" && (
            <div className="text-center py-4 break-words">
              <span className="font-caveat text-3xl text-[#a3e635] block mb-2">
                {t.plant.tag}
              </span>
              <p className="font-playfair text-xl sm:text-2xl text-white mb-3">
                &ldquo;{t.plant.quote}&rdquo;
              </p>
              <span className="text-xs text-[#d4c3b3] font-mono">
                {t.plant.sub}
              </span>
            </div>
          )}

          {/* 8. POSTCARD */}
          {activeModal === "postcard" && (
            <div className="text-center py-4 break-words">
              <span className="font-caveat text-3xl text-[#f2b705] block mb-2">
                {t.postcard.tag}
              </span>
              <p className="font-playfair text-lg sm:text-xl text-white mb-2">
                &ldquo;{t.postcard.quote}&rdquo;
              </p>
              <span className="text-xs text-[#d4c3b3] font-mono">
                {t.postcard.sub}
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
