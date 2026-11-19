"use client";

import { useState, useEffect, useRef } from "react";
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
  PhoneCall,
  Wifi,
  BatteryMedium,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  QrCode,
  ShieldCheck,
  Zap,
  Calendar,
  FileText,
  Download,
  RotateCcw,
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
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedLine, setCopiedLine] = useState(false);
  const [phoneTab, setPhoneTab] = useState<"apps" | "contact" | "game">("apps");
  const [bugScore, setBugScore] = useState(0);
  const [bugs, setBugs] = useState<{ id: number; x: number; y: number; icon: string }[]>([
    { id: 1, x: 25, y: 35, icon: "🐛" },
    { id: 2, x: 70, y: 55, icon: "🪲" },
    { id: 3, x: 45, y: 75, icon: "🐜" },
  ]);

  const handleWhackBug = (bugId: number) => {
    sound.playGameTap();
    const nextScore = bugScore + 1;
    setBugScore(nextScore);
    if (nextScore >= 10) {
      sound.playGameSuccess();
    }
    setBugs((prev) =>
      prev.map((b) =>
        b.id === bugId
          ? {
              ...b,
              x: 12 + Math.floor(Math.random() * 72),
              y: 20 + Math.floor(Math.random() * 60),
            }
          : b
      )
    );
  };

  const handleResetGame = () => {
    sound.playClick();
    setBugScore(0);
    setBugs([
      { id: 1, x: 25, y: 35, icon: "🐛" },
      { id: 2, x: 70, y: 55, icon: "🪲" },
      { id: 3, x: 45, y: 75, icon: "🐜" },
    ]);
  };

  const dialogRef = useRef<HTMLDivElement>(null);

  const email = "jirayukokhoon@gmail.com";
  const rawPhone = "+66 81 234 5678";
  const lineId = "@jirayu.dev";
  const t = translations[language].modals;

  // 1. Accessibility: ESC key to close modal
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

  // 2. Accessibility: Focus Trap within modal dialog
  useEffect(() => {
    if (!activeModal || !dialogRef.current) return;
    const dialog = dialogRef.current;
    const focusable = dialog.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    // Gently shift focus to first element without aggressive page jump
    first.focus({ preventScroll: true });

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    dialog.addEventListener("keydown", handleFocusTrap);
    return () => dialog.removeEventListener("keydown", handleFocusTrap);
  }, [activeModal, phoneTab]);

  const handleClose = () => {
    sound.playClick();
    onClose();
  };

  const handleCopyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    sound.playClick();
    navigator.clipboard.writeText(rawPhone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyLine = () => {
    sound.playClick();
    navigator.clipboard.writeText(lineId);
    setCopiedLine(true);
    setTimeout(() => setCopiedLine(false), 2000);
  };

  if (!activeModal) return null;

  const modalTitles: Record<string, Record<Language, string>> = {
    phone: { en: "Smartphone & Mobile Apps", th: "สมาร์ตโฟน & ผลงานโมบายล์แอป" },
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
        className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-black/75 backdrop-blur-sm"
        onClick={handleClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-category-title"
      >
        <motion.div
          ref={dialogRef}
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[92dvh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-[#231b16] text-[#f4ebdc] border border-[#f4ebdc]/15 shadow-2xl p-4 sm:p-8 font-karla outline-none"
        >
          {/* Sticky Modal Top Bar with Category & Close Button */}
          <div className="sticky top-0 z-30 flex items-center justify-between pb-3.5 pt-1 bg-[#231b16]/95 backdrop-blur-md border-b border-[#f4ebdc]/10 -mx-4 px-4 sm:-mx-8 sm:px-8 mb-5 sm:mb-6">
            <span
              id="modal-category-title"
              className="text-[11px] font-mono tracking-widest text-[#f2b705] uppercase"
            >
              {modalTitles[activeModal]?.[language] || "Desk Artifact"}
            </span>

            <button
              onClick={handleClose}
              aria-label="Close modal dialog (Press Escape)"
              className="min-h-[44px] min-w-[44px] p-2 rounded-full bg-[#382b24] hover:bg-[#4d3c33] text-[#f4ebdc] transition-all hover:scale-105 active:scale-95 flex items-center justify-center border border-[#f4ebdc]/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* ============================================================ */}
          {/* 0. SMARTPHONE ON STAND: MOBILE APPS & DIRECT LINE            */}
          {/* ============================================================ */}
          {activeModal === "phone" && (
            <div className="break-words space-y-6">
              {/* Realistic Smartphone Frame Mockup */}
              <div className="max-w-md mx-auto rounded-[2.5rem] bg-[#140e0b] border-2 border-[#f4ebdc]/20 shadow-2xl overflow-hidden p-3 sm:p-4 text-[#f4ebdc]">
                {/* Smartphone Dynamic Island Notch & Status Bar */}
                <div className="flex items-center justify-between px-3 pt-1 pb-3 text-[11px] font-mono text-[#d4c3b3]">
                  <span className="font-bold text-white tracking-wider">09:41</span>
                  <div className="w-20 h-4 rounded-full bg-black border border-white/10 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-white/30" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-[#a3e635] font-semibold">5G</span>
                    <Wifi className="w-3.5 h-3.5" />
                    <BatteryMedium className="w-4 h-4 text-[#a3e635]" />
                  </div>
                </div>

                {/* Device Screen Header */}
                <div className="px-3 pt-2 pb-3">
                  <span className="text-[10px] font-mono tracking-wider text-[#a3e635] uppercase block mb-1">
                    {t.phone.tag}
                  </span>
                  <h2 className="font-playfair text-2xl text-white">
                    {t.phone.title}
                  </h2>
                  <p className="text-xs text-[#d4c3b3] mt-1 leading-relaxed">
                    {t.phone.desc}
                  </p>
                </div>

                {/* Device Tab Switcher: Apps vs Contact vs Bug Hunter Game */}
                <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-[#231b16] border border-[#f4ebdc]/10 mb-4 text-xs font-mono">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setPhoneTab("apps");
                    }}
                    className={`py-2 px-2 rounded-lg text-center transition-all min-h-[44px] flex items-center justify-center gap-1 font-bold ${
                      phoneTab === "apps"
                        ? "bg-[#f2b705] text-[#140e0b] shadow-md"
                        : "text-[#d4c3b3] hover:text-white"
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>{language === "th" ? "แอป (3)" : "Apps (3)"}</span>
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setPhoneTab("contact");
                    }}
                    className={`py-2 px-2 rounded-lg text-center transition-all min-h-[44px] flex items-center justify-center gap-1 font-bold ${
                      phoneTab === "contact"
                        ? "bg-[#f2b705] text-[#140e0b] shadow-md"
                        : "text-[#d4c3b3] hover:text-white"
                    }`}
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{language === "th" ? "ติดต่อด่วน" : "Contact"}</span>
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setPhoneTab("game");
                    }}
                    className={`py-2 px-2 rounded-lg text-center transition-all min-h-[44px] flex items-center justify-center gap-1 font-bold ${
                      phoneTab === "game"
                        ? "bg-[#10b981] text-[#140e0b] shadow-md"
                        : "text-[#a3e635] hover:text-white"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{language === "th" ? "มินิเกม 🎮" : "Game 🎮"}</span>
                  </button>
                </div>

                {/* TAB 1: Mobile Apps Showcase */}
                {phoneTab === "apps" && (
                  <div className="space-y-3 px-1">
                    {t.phone.apps.map((app, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-[#1f1713] border border-[#f4ebdc]/10 hover:border-[#f2b705]/40 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div>
                            <span className="font-semibold text-sm text-white block">
                              {app.name}
                            </span>
                            <span className="text-[11px] text-[#f2b705] font-mono">
                              {app.category}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#2e231d] text-[#a3e635] border border-[#a3e635]/20 shrink-0">
                            {app.stats}
                          </span>
                        </div>
                        <p className="text-xs text-[#d4c3b3] leading-relaxed mb-2.5">
                          {app.desc}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {app.tech.map((tc) => (
                            <span
                              key={tc}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#2a1f18] text-[#f4ebdc]/80"
                            >
                              {tc}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB 2: Quick Direct Contact */}
                {phoneTab === "contact" && (
                  <div className="space-y-3 px-1">
                    {/* Direct Call / Number Card */}
                    <div className="p-4 rounded-2xl bg-[#1f1713] border border-[#f4ebdc]/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-[#2e231d] flex items-center justify-center text-[#a3e635] border border-[#a3e635]/20">
                            <PhoneCall className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-[#c8b7a6] uppercase tracking-wider block">
                              {language === "th" ? "เบอร์โทรศัพท์สายตรง" : "Direct Phone Line"}
                            </span>
                            <span className="text-sm font-mono text-white font-bold">
                              {t.phone.phoneNum}
                            </span>
                          </div>
                        </div>
                        <a
                          href={`tel:${t.phone.phoneNum.replace(/[^0-9+]/g, "")}`}
                          onClick={() => sound.playClick()}
                          className="min-h-[44px] px-3.5 rounded-xl bg-[#a3e635] hover:bg-[#86efac] text-[#140e0b] text-xs font-mono font-bold flex items-center gap-1.5 shadow-md transition-all active:scale-95"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>{t.phone.callBtn}</span>
                        </a>
                      </div>

                      <div className="pt-2 border-t border-[#f4ebdc]/10 flex items-center justify-between text-xs font-mono">
                        <button
                          onClick={handleCopyPhone}
                          className="min-h-[44px] text-[#f2b705] hover:underline flex items-center gap-1.5"
                        >
                          {copiedPhone ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#a3e635]" />
                              <span className="text-[#a3e635]">{t.phone.copiedPhone}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>{language === "th" ? "คัดลอกเบอร์โทร" : "Copy Number"}</span>
                            </>
                          )}
                        </button>
                        <span className="text-[#a3e635] flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          {t.phone.status}
                        </span>
                      </div>
                    </div>

                    {/* LINE / Social Quick Connect */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono">
                      <button
                        onClick={handleCopyLine}
                        className="min-h-[44px] p-3 rounded-xl bg-[#1f1713] hover:bg-[#2c201a] border border-[#f4ebdc]/10 flex items-center justify-between text-left text-[#f4ebdc] transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-4 h-4 text-[#a3e635]" />
                          <span>{t.phone.lineContact}</span>
                        </div>
                        <span className="text-[10px] text-[#f2b705]">
                          {copiedLine ? "Copied!" : "Copy"}
                        </span>
                      </button>

                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noreferrer"
                        className="min-h-[44px] p-3 rounded-xl bg-[#1f1713] hover:bg-[#2c201a] border border-[#f4ebdc]/10 flex items-center justify-between text-[#f4ebdc] transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <ExternalLink className="w-4 h-4 text-[#60a5fa]" />
                          <span>LinkedIn</span>
                        </div>
                        <span className="text-[10px] text-[#f2b705]">Visit ↗</span>
                      </a>
                    </div>

                    {/* High-Impact Conversion CTAs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      <a
                        href="mailto:jirayukokhoon@gmail.com?subject=Schedule%20a%2015-minute%20Chat%20with%20Jirayu&body=Hi%20Jirayu,%0D%0A%0D%0AI'd%20love%20to%20schedule%20a%2015-min%20call%20to%20discuss%20an%20opportunity."
                        onClick={() => sound.playClick()}
                        className="min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#60a5fa] hover:bg-[#93c5fd] text-[#0f172a] text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>{t.phone.scheduleCallBtn || (language === "th" ? "นัดคุยงาน 15 นาที" : "Schedule 15-min Chat")}</span>
                      </a>

                      <a
                        href="/resume"
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => sound.playClick()}
                        className="min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#f2b705] hover:bg-[#fbbf24] text-[#140e0b] text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                      >
                        <Download className="w-4 h-4" />
                        <span>{t.phone.downloadResumeBtn || (language === "th" ? "ดาวน์โหลดเรซูเม่ (PDF)" : "Download Resume (PDF)")}</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* TAB 3: Retro Bug Hunter Mini-Game */}
                {phoneTab === "game" && (
                  <div className="space-y-3 px-1">
                    <div className="p-3.5 rounded-2xl bg-[#090d0b] border border-[#10b981]/30 text-center">
                      <div className="flex items-center justify-between text-xs font-mono text-[#a3e635] mb-2 px-1">
                        <span className="flex items-center gap-1.5 font-bold">
                          <Zap className="w-3.5 h-3.5 text-[#10b981]" />
                          {t.phone.miniGameTitle || "Bug Hunter"}
                        </span>
                        <span className="bg-[#10b981]/20 px-2 py-0.5 rounded-full text-white font-bold border border-[#10b981]/40">
                          {t.phone.scoreLabel || "Bugs Fixed:"} {bugScore}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#d1d5db] mb-3">
                        {bugScore >= 10
                          ? (t.phone.gameDone || "🎉 Senior Debugger Level Unlocked! Production is safe!")
                          : (t.phone.gameInstruction || "Bugs are invading production! Tap them to debug!")}
                      </p>

                      {/* Interactive Game Arena */}
                      <div className="relative w-full h-56 rounded-xl bg-[#131b17] border border-[#10b981]/20 overflow-hidden select-none cursor-crosshair">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b9810d_1px,transparent_1px),linear-gradient(to_bottom,#10b9810d_1px,transparent_1px)] bg-[size:16px_16px]" />

                        {bugScore < 10 ? (
                          bugs.map((bug) => (
                            <button
                              key={bug.id}
                              onClick={() => handleWhackBug(bug.id)}
                              style={{ left: `${bug.x}%`, top: `${bug.y}%` }}
                              className="absolute -translate-x-1/2 -translate-y-1/2 text-2xl p-2 rounded-full hover:scale-125 active:scale-75 transition-all duration-200 cursor-pointer select-none"
                              aria-label="Squash bug"
                            >
                              {bug.icon}
                            </button>
                          ))
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                            <span className="text-4xl mb-2">🏆</span>
                            <span className="text-sm font-bold text-[#a3e635] font-mono mb-1">
                              {language === "th" ? "เคลียร์บั๊กสำเร็จ 100%!" : "All Production Bugs Squashed!"}
                            </span>
                            <span className="text-xs text-[#d1d5db] font-mono mb-3">
                              {language === "th" ? "ระบบเสถียร 99.99% Uptime พร้อมขึ้นโปรดักชัน" : "System 99.99% stable & ready for deploy."}
                            </span>
                            <button
                              onClick={handleResetGame}
                              className="px-4 py-2 rounded-xl bg-[#10b981] hover:bg-[#34d399] text-[#090d0b] text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg active:scale-95 transition-all"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              <span>{language === "th" ? "เล่นใหม่อีกรอบ" : "Play Again"}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Smartphone Bottom Home Indicator */}
                <div className="pt-4 pb-1">
                  <div className="w-28 h-1 rounded-full bg-white/20 mx-auto" />
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 1. GREEN ART: HARD & SOFT SKILLS (De-slopped)                */}
          {/* ============================================================ */}
          {activeModal === "green_art" && (
            <div className="break-words space-y-6">
              <div>
                <span className="text-xs font-mono tracking-wider text-[#a3e635] uppercase block mb-1">
                  {t.green_art.tag.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "").trim()}
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
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#f2b705] flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.green_art.hardSkillsTitle}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {t.green_art.hardSkills.map((h, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-[#2c2019] border border-[#f4ebdc]/10"
                    >
                      <span className="font-semibold text-sm text-white block mb-1">
                        {h.name}
                      </span>
                      <p className="text-xs text-[#d4c3b3] leading-relaxed">
                        {h.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div className="space-y-3">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#a3e635] flex items-center gap-2">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>{t.green_art.softSkillsTitle}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {t.green_art.softSkills.map((s, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-[#2c2019] border border-[#f4ebdc]/10"
                    >
                      <div className="flex items-center gap-1.5 mb-1 text-[#a3e635]">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span className="font-semibold text-sm text-white">
                          {s.title}
                        </span>
                      </div>
                      <p className="text-xs text-[#d4c3b3] leading-relaxed pl-5">
                        {s.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 2. YELLOW VASE: CONTACT & BIO & EDUCATION (De-slopped)       */}
          {/* ============================================================ */}
          {activeModal === "yellow_vase" && (
            <div className="break-words space-y-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="relative w-28 h-36 sm:w-32 sm:h-40 shrink-0 rounded-2xl overflow-hidden border-2 border-[#f2b705]/40 shadow-xl bg-[#1a1410]">
                  <img
                    src="/images/portrait-tarot.webp?v=5"
                    alt="Jirayu Tarot Portrait"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-xs font-mono tracking-wider text-[#f2b705] uppercase block mb-1">
                    {t.yellow_vase.tag.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "").trim()}
                  </span>
                  <h2 className="font-playfair text-2xl sm:text-3xl text-white mb-2">
                    {t.yellow_vase.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#d4c3b3] leading-relaxed">
                    {t.yellow_vase.desc}
                  </p>
                </div>
              </div>

              {/* Clean Single-Layer Contact Group */}
              <div className="p-5 rounded-2xl bg-[#2c2019] border border-[#f4ebdc]/10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#f4ebdc]/10">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Mail className="w-5 h-5 text-[#f2b705] shrink-0" />
                    <div className="overflow-hidden">
                      <span className="text-[10px] font-mono text-[#c8b7a6] block uppercase tracking-wider">
                        {t.yellow_vase.email}
                      </span>
                      <span className="text-sm font-mono text-white font-medium break-all">
                        {email}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="min-h-[44px] flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#f2b705] hover:bg-[#d9a404] text-[#1c1613] text-xs font-mono font-bold transition-all shadow-md active:scale-95 shrink-0"
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
                    href="https://github.com/Jirayuko1"
                    target="_blank"
                    rel="noreferrer"
                    className="min-h-[44px] p-3 rounded-xl bg-[#1e1511] hover:bg-[#382b24] border border-[#f4ebdc]/10 flex items-center justify-between text-[#f4ebdc] transition-colors"
                  >
                    <span>GitHub</span>
                    <span className="text-[#f2b705]">github.com/Jirayuko1 ↗</span>
                  </a>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="min-h-[44px] p-3 rounded-xl bg-[#1e1511] hover:bg-[#382b24] border border-[#f4ebdc]/10 flex items-center justify-between text-[#f4ebdc] transition-colors"
                  >
                    <span>LinkedIn</span>
                    <span className="text-[#f2b705]">linkedin.com/in/jirayu ↗</span>
                  </a>
                </div>

                <div className="text-[11px] font-mono text-[#c8b7a6] flex items-center justify-between pt-1">
                  <span>{t.yellow_vase.location}</span>
                  <span className="text-white font-medium">{t.yellow_vase.locationVal}</span>
                </div>
              </div>

              {/* Education */}
              <div className="space-y-3">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#f2b705] flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>{t.yellow_vase.educationTitle}</span>
                </h3>
                <div className="space-y-2.5">
                  {t.yellow_vase.education.map((edu, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-[#2c2019] border border-[#f4ebdc]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1"
                    >
                      <div>
                        <span className="font-semibold text-sm text-white block">
                          {edu.degree}
                        </span>
                        <span className="text-xs text-[#c8b7a6]">
                          {edu.school}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[#a3e635]">
                        {edu.year}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Conversion CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href="mailto:jirayukokhoon@gmail.com?subject=Schedule%20a%2015-minute%20Chat%20with%20Jirayu"
                  onClick={() => sound.playClick()}
                  className="min-h-[44px] px-4 py-3 rounded-xl bg-[#60a5fa] hover:bg-[#93c5fd] text-[#0f172a] text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{language === "th" ? "นัดคุยงาน 15 นาที" : "Schedule 15-min Chat"}</span>
                </a>

                <a
                  href="/resume"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  className="min-h-[44px] px-4 py-3 rounded-xl bg-[#f2b705] hover:bg-[#fbbf24] text-[#140e0b] text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>{language === "th" ? "ดาวน์โหลดเรซูเม่ (PDF)" : "Download Resume (PDF)"}</span>
                </a>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 3. LAPTOP: FEATURED CASE STUDIES                             */}
          {/* ============================================================ */}
          {activeModal === "laptop" && (
            <div className="break-words space-y-6">
              <div>
                <span className="text-xs font-mono tracking-wider text-[#f2b705] uppercase block mb-1">
                  {t.laptop.tag.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "").trim()}
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
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-2xl bg-[#2c2019] border border-[#f4ebdc]/10"
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-[#f2b705] mb-2">
                      <span className="flex items-center gap-1.5">
                        {idx === 0 ? (
                          <Smartphone className="w-3.5 h-3.5" />
                        ) : (
                          <Globe className="w-3.5 h-3.5" />
                        )}
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
                    <div className="p-3 rounded-xl bg-[#1e1511] text-xs text-[#a3e635] font-mono mb-4 border border-[#a3e635]/20 leading-relaxed flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#a3e635]" />
                      <span>{proj.solved}</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <div className="flex flex-wrap gap-2 text-[11px] font-mono text-[#f4ebdc]/80">
                        {proj.stack.map((s) => (
                          <span
                            key={s}
                            className="px-2.5 py-1 rounded-md bg-[#1e1511] border border-[#f4ebdc]/5"
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 ml-auto">
                        {"demoUrl" in proj && proj.demoUrl && (
                          <a
                            href={proj.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => sound.playClick()}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-mono font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>{language === "th" ? "🎮 เล่นเกมจริง (Live Demo ↗)" : "🎮 Play Live Demo ↗"}</span>
                          </a>
                        )}

                        {"github" in proj && proj.github && (
                          <a
                            href={proj.github}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => sound.playClick()}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f2b705] hover:bg-[#fbbf24] text-[#140e0b] text-xs font-mono font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>View on GitHub ↗</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 4. CARDS RED: WORK LIFE SNAPSHOTS                            */}
          {/* ============================================================ */}
          {activeModal === "cards_red" && (
            <div className="break-words space-y-6">
              <div>
                <span className="text-xs font-mono tracking-wider text-[#f87171] uppercase block mb-1">
                  {t.cards_red.tag.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "").trim()}
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
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-[#fed7aa] text-[#7c2d12] shadow-md border border-[#ea580c]/30"
                  >
                    <span className="font-bold text-xs uppercase tracking-wider block mb-1">
                      {c.title}
                    </span>
                    <p className="font-karla text-sm sm:text-base leading-relaxed text-[#7c2d12]/95">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 5. CARDS GREEN: VALUE PROPOSITION                            */}
          {/* ============================================================ */}
          {activeModal === "cards_green" && (
            <div className="break-words space-y-6">
              <div>
                <span className="text-xs font-mono tracking-wider text-[#a3e635] uppercase block mb-1">
                  {t.cards_green.tag.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "").trim()}
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
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-[#bbf7d0] text-[#14532d] shadow-md border border-[#16a34a]/30"
                  >
                    <span className="font-bold text-xs uppercase tracking-wider block mb-1">
                      {c.title}
                    </span>
                    <p className="font-karla text-sm sm:text-base leading-relaxed text-[#14532d]/95">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 6. CARDS BLUE: ENGINEERING ARTICLES                          */}
          {/* ============================================================ */}
          {activeModal === "cards_blue" && (
            <div className="break-words space-y-6">
              <div>
                <span className="text-xs font-mono tracking-wider text-[#60a5fa] uppercase block mb-1">
                  {t.cards_blue.tag.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "").trim()}
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
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-[#2c2019] border border-[#f4ebdc]/10 hover:border-[#60a5fa]/50 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-[#60a5fa] mb-1">
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Technical Article</span>
                      </span>
                      <span>{art.readTime}</span>
                    </div>
                    <h3 className="font-playfair text-base sm:text-lg text-white mb-1.5">
                      {art.title}
                    </h3>
                    <p className="text-xs text-[#d4c3b3] leading-relaxed">
                      {art.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 7. POST-IT NOTE                                              */}
          {/* ============================================================ */}
          {activeModal === "postit" && (
            <div className="break-words text-center py-6">
              <div className="w-64 h-64 mx-auto p-6 rounded-xl bg-[#fef08a] text-[#713f12] shadow-2xl flex flex-col justify-between rotate-[-2deg]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#a16207]">
                  Rule #1
                </span>
                <p className="font-caveat text-2xl font-bold leading-relaxed">
                  &ldquo;Ask First, Code Later.&rdquo;
                </p>
                <span className="text-xs font-mono text-[#a16207]">
                  Always clarify specs upfront.
                </span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
