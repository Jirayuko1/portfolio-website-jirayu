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
  ArrowLeft,
  AlertCircle,
  Cpu,
  Workflow,
  Layers,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Briefcase,
  GraduationCap,
  Wrench,
  Play,
  Eye,
  ArrowRight,
  Camera,
  Gamepad2,
  MessageSquare,
  Database,
  Star,
} from "lucide-react";
import { Language, translations } from "@/lib/translations";
import { sound } from "@/lib/soundEffects";

interface OfficeModalsProps {
  activeModal: string | null;
  onClose: () => void;
  discoveredCount: number;
  language: Language;
  onSwitchModal?: (id: string) => void;
}

export default function OfficeModals({
  activeModal,
  onClose,
  language,
  onSwitchModal,
}: OfficeModalsProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedLine, setCopiedLine] = useState(false);
  const [phoneTab, setPhoneTab] = useState<"apps" | "contact" | "game">("apps");
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [accordionOpen, setAccordionOpen] = useState<{
    problem: boolean;
    solution: boolean;
    tech: boolean;
    highlights: boolean;
    workflow: boolean;
  }>({
    problem: true,
    solution: true,
    tech: true,
    highlights: true,
    workflow: true,
  });
  const [lightboxData, setLightboxData] = useState<{
    images: { url: string; caption: string }[];
    currentIndex: number;
  } | null>(null);

  useEffect(() => {
    if (activeModal !== "laptop" && activeModal !== "yellow_vase") {
      setSelectedProjectIndex(null);
      setLightboxData(null);
      setSpotlightIndex(0);
    }
  }, [activeModal]);

  useEffect(() => {
    if (!lightboxData) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxData(null);
      } else if (e.key === "ArrowLeft") {
        setLightboxData((prev) =>
          prev
            ? {
                ...prev,
                currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length,
              }
            : null
        );
      } else if (e.key === "ArrowRight") {
        setLightboxData((prev) =>
          prev
            ? {
                ...prev,
                currentIndex: (prev.currentIndex + 1) % prev.images.length,
              }
            : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxData]);
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
    <>
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
          className="relative w-full max-w-2xl max-h-[92dvh] overflow-y-auto overscroll-contain rounded-2xl sm:rounded-3xl bg-[#231b16] text-[#f4ebdc] border border-[#f4ebdc]/15 shadow-2xl p-4 sm:p-8 font-karla outline-none"
        >
          {/* Static Modal Header Bar with Category & Close Button (for all modals except laptop which has its own bespoke header) */}
          {activeModal !== "laptop" && (
            <div className="flex items-center justify-between pb-3.5 pt-1 border-b border-[#f4ebdc]/10 mb-5 sm:mb-6">
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
          )}

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
                    <span>{language === "th" ? `แอป (${t.phone.apps.length})` : `Apps (${t.phone.apps.length})`}</span>
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
                    {t.phone.apps.map((app, idx) => {
                      const appGithubLinks: Record<number, string> = {
                        0: "https://github.com/Jirayuko1/aura_mobile_app_prototype",
                        1: "https://github.com/Jirayuko1/pobsuk",
                        2: "https://github.com/Jirayuko1/Voice-Bot-Bella",
                      };
                      // Project order: 0: Aura, 1: Bella, 2: Pobsuk, 3: Arena Live
                      const appTargetProjectMap: Record<number, number> = {
                        0: 0, // Aura Staff -> Project 0 (Aura)
                        1: 2, // Pobsuk -> Project 2 (Pobsuk)
                        2: 1, // Bella -> Project 1 (Bella)
                      };
                      const targetProjIndex = appTargetProjectMap[idx] ?? 0;

                      return (
                        <div
                          key={idx}
                          className="p-3.5 sm:p-4 rounded-2xl bg-[#1f1713] border border-[#f4ebdc]/10 hover:border-[#f2b705]/40 transition-colors"
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
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {app.tech.map((tc) => (
                              <span
                                key={tc}
                                className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#2a1f18] text-[#f4ebdc]/80"
                              >
                                {tc}
                              </span>
                            ))}
                          </div>

                          {/* Interactive Deep-Dive Actions */}
                          <div className="flex flex-wrap items-center gap-2 pt-2.5 border-t border-[#f4ebdc]/10">
                            <button
                              type="button"
                              onClick={() => {
                                sound.playClick();
                                setSelectedProjectIndex(targetProjIndex);
                                onSwitchModal?.("laptop");
                              }}
                              className="min-h-[44px] flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#f2b705] hover:bg-[#fbbf24] text-[#140e0b] text-xs font-mono font-bold transition-all shadow-sm active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2b705]"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>{language === "th" ? "ดูสถาปัตยกรรม & รูปภาพ 🔍" : "View Architecture & Gallery 🔍"}</span>
                            </button>

                            {appGithubLinks[idx] && (
                              <a
                                href={appGithubLinks[idx]}
                                target="_blank"
                                rel="noreferrer"
                                onClick={() => sound.playClick()}
                                className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2e231d] hover:bg-[#3d2e26] text-[#f4ebdc] border border-[#f4ebdc]/15 text-xs font-mono font-medium transition-all shadow-sm active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2b705]"
                              >
                                <ExternalLink className="w-3.5 h-3.5 text-[#f2b705]" />
                                <span>GitHub ↗</span>
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })}
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
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                      <button
                        onClick={handleCopyLine}
                        className="min-h-[44px] p-3 rounded-xl bg-[#1f1713] hover:bg-[#2c201a] border border-[#f4ebdc]/10 flex items-center justify-between text-left text-[#f4ebdc] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2b705]"
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
                        href="https://github.com/Jirayuko1"
                        target="_blank"
                        rel="noreferrer"
                        className="min-h-[44px] p-3 rounded-xl bg-[#1f1713] hover:bg-[#2c201a] border border-[#f4ebdc]/10 flex items-center justify-between text-[#f4ebdc] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2b705]"
                      >
                        <div className="flex items-center gap-2">
                          <ExternalLink className="w-4 h-4 text-[#f2b705]" />
                          <span>GitHub</span>
                        </div>
                        <span className="text-[10px] text-[#f2b705]">Visit ↗</span>
                      </a>

                      <a
                        href="https://www.linkedin.com/in/jirayu-kokhoon-883796390/"
                        target="_blank"
                        rel="noreferrer"
                        className="min-h-[44px] p-3 rounded-xl bg-[#1f1713] hover:bg-[#2c201a] border border-[#f4ebdc]/10 flex items-center justify-between text-[#f4ebdc] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2b705]"
                      >
                        <div className="flex items-center gap-2">
                          <ExternalLink className="w-4 h-4 text-[#60a5fa]" />
                          <span>LinkedIn</span>
                        </div>
                        <span className="text-[10px] text-[#60a5fa]">Visit ↗</span>
                      </a>
                    </div>

                    {/* High-Impact Conversion CTAs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      <a
                        href="mailto:jirayukokhoon@gmail.com?subject=Schedule%20a%2015-minute%20Chat%20with%20Jirayu&body=Hi%20Jirayu,%0D%0A%0D%0AI'd%20love%20to%20schedule%20a%2015-min%20call%20to%20discuss%20an%20opportunity."
                        onClick={() => sound.playClick()}
                        className="min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#60a5fa] hover:bg-[#93c5fd] text-[#0f172a] text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa]"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>{t.phone.scheduleCallBtn || (language === "th" ? "นัดคุยงาน 15 นาที" : "Schedule 15-min Chat")}</span>
                      </a>

                      <a
                        href="/resume"
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => sound.playClick()}
                        className="min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#f2b705] hover:bg-[#fbbf24] text-[#140e0b] text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2b705]"
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
                              className="absolute -translate-x-1/2 -translate-y-1/2 min-w-[48px] min-h-[48px] flex items-center justify-center text-2xl p-2 rounded-full hover:scale-125 active:scale-75 transition-all duration-200 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]"
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

              {/* Working Tools & Platforms */}
              {"tools" in t.green_art && (
                <div className="space-y-3">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[#38bdf8] flex items-center gap-2">
                    <Wrench className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>{"toolsTitle" in t.green_art ? t.green_art.toolsTitle : (language === "th" ? "เครื่องมือที่ใช้ในการทำงาน (Tools & Platforms)" : "Working Tools & Platforms")}</span>
                  </h3>
                  <div className="p-4 rounded-2xl bg-[#2c2019] border border-[#f4ebdc]/10">
                    <div className="flex flex-wrap gap-2.5">
                      {t.green_art.tools.map((tool: string, i: number) => (
                        <span
                          key={i}
                          className="px-3.5 py-1.5 rounded-xl bg-[#1e1511] border border-[#38bdf8]/25 text-xs font-mono font-medium text-[#f4ebdc] flex items-center gap-2 shadow-xs hover:border-[#38bdf8]/60 hover:text-white transition-all select-none"
                        >
                          <span className="w-2 h-2 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]" />
                          <span>{tool}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

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
                    href="https://www.linkedin.com/in/jirayu-kokhoon-883796390/"
                    target="_blank"
                    rel="noreferrer"
                    className="min-h-[44px] p-3 rounded-xl bg-[#1e1511] hover:bg-[#382b24] border border-[#f4ebdc]/10 flex items-center justify-between text-[#f4ebdc] transition-colors"
                  >
                    <span>LinkedIn</span>
                    <span className="text-[#f2b705]">linkedin.com/in/jirayu-kokhoon ↗</span>
                  </a>
                </div>

                <div className="text-[11px] font-mono text-[#c8b7a6] flex items-center justify-between pt-1">
                  <span>{t.yellow_vase.location}</span>
                  <span className="text-white font-medium">{t.yellow_vase.locationVal}</span>
                </div>
              </div>

              {/* Work & Internships */}
              {"experience" in t.yellow_vase && t.yellow_vase.experience && (
                <div className="space-y-3">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[#a3e635] flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#a3e635]" />
                    <span>{"experienceTitle" in t.yellow_vase ? t.yellow_vase.experienceTitle : (language === "th" ? "ประวัติการทำงาน / ฝึกงาน (Work & Internships)" : "Work & Internships")}</span>
                  </h3>
                  <div className="space-y-3">
                    {t.yellow_vase.experience.map((exp: any, i: number) => {
                      const experienceCerts: Record<number, { url: string; caption: string }[]> = {
                        0: [
                          {
                            url: "/images/certificates/cert-botnoi-completion.webp",
                            caption: language === "th" ? "วุฒิบัตร BOTNOI TRAINEE Certificate: Mobile Application Developer (ดร.วินน์ วรวุฒิคุณชัย)" : "BOTNOI TRAINEE Certificate of Completion: Mobile Application Developer (Dr. Winn Voravuthikunchai)"
                          },
                          {
                            url: "/images/certificates/cert-botnoi-internship-letter.webp",
                            caption: language === "th" ? "หนังสือรับรองการทำงาน / ฝึกงาน บริษัท ไอบอทน้อย จำกัด (เลขที่ IBN-0670)" : "Official Internship Verification Letter — Botnoi Group Co., Ltd. (Ref: IBN-0670)"
                          }
                        ],
                        1: [
                          {
                            url: "/images/certificates/cert-prompt-techno-letter.webp",
                            caption: language === "th" ? "หนังสือรับรองผ่านงาน บริษัท พร้อม เทคโน เซอร์วิส จำกัด (ประจำหน่วยงาน NXP Semiconductor)" : "Work Verification Letter — Prompt Techno Service (NXP Semiconductor Facility)"
                          },
                          {
                            url: "/images/certificates/cert-prompt-techno-iso9001.webp",
                            caption: language === "th" ? "เกียรติบัตรการฝึกอบรมการทำงานเป็นทีม และมาตรฐาน ISO 9001:2015 — Prompt Techno Service" : "Training Certificate: Teamwork & ISO 9001:2015 — Prompt Techno Service"
                          },
                          {
                            url: "/images/certificates/cert-prompt-techno-dual.webp",
                            caption: language === "th" ? "วุฒิบัตรการฝึกวิชาชีพตำแหน่ง ช่างเทคนิค ในระบบทวิภาคี — Prompt Techno Service" : "Dual Vocational Training Certificate: Operations Technician — Prompt Techno Service"
                          }
                        ]
                      };

                      return (
                        <div
                          key={i}
                          className="p-4 rounded-2xl bg-[#2c2019] border border-[#f4ebdc]/10 space-y-1.5"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <span className="font-semibold text-sm text-white">
                              {exp.role}
                            </span>
                            <span className="text-[11px] font-mono text-[#a3e635] bg-[#1e1511] px-2.5 py-0.5 rounded-md border border-[#a3e635]/25 self-start sm:self-auto">
                              {exp.period}
                            </span>
                          </div>
                          <span className="text-xs text-[#f2b705] font-medium block">
                            {exp.company}
                          </span>
                          <p className="text-xs text-[#d4c3b3] leading-relaxed pt-1">
                            {exp.desc}
                          </p>

                          {experienceCerts[i] && (
                            <div className="pt-2 border-t border-[#f4ebdc]/10 mt-2">
                              <button
                                type="button"
                                onClick={() => {
                                  sound.playClick();
                                  setLightboxData({ images: experienceCerts[i], currentIndex: 0 });
                                }}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#a3e635]/15 hover:bg-[#a3e635]/25 text-[#a3e635] border border-[#a3e635]/30 text-xs font-mono font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                              >
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>{language === "th" ? `🔍 เปิดดูเอกสารจริง (${experienceCerts[i].length} หน้า)` : `🔍 View Original Document (${experienceCerts[i].length} Pages)`}</span>
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Education */}
              <div className="space-y-3">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#f2b705] flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-[#f2b705]" />
                  <span>{t.yellow_vase.educationTitle}</span>
                </h3>
                <div className="space-y-2.5">
                  {t.yellow_vase.education.map((edu, i) => {
                    const educationCerts: Record<number, { url: string; caption: string }[]> = {
                      1: [
                        {
                          url: "/images/certificates/transcript-saraburi-thai-p1.webp",
                          caption: language === "th" ? "ระเบียนแสดงผลการเรียนตามหลักสูตร ปวส. วิทยาลัยเทคนิคสระบุรี (หน้า 1)" : "Technical Education Diploma Transcript (Thai - Page 1)"
                        },
                        {
                          url: "/images/certificates/transcript-saraburi-thai-p2.webp",
                          caption: language === "th" ? "ระเบียนแสดงผลการเรียน ปวส. วิทยาลัยเทคนิคสระบุรี — โครงงาน 2 เกรด 4.00, เกรดเฉลี่ยสะสม GPA 3.14 (หน้า 2)" : "Technical Education Diploma Transcript — Cumulative GPA 3.14 / Project 4.00 (Thai - Page 2)"
                        },
                        {
                          url: "/images/certificates/transcript-saraburi-en-p1.webp",
                          caption: language === "th" ? "ระเบียนแสดงผลการเรียน ปวส. ฉบับภาษาอังกฤษ (English Transcript)" : "Technical Education Diploma Transcript (English Version)"
                        }
                      ]
                    };

                    return (
                      <div
                        key={i}
                        className="p-4 rounded-2xl bg-[#2c2019] border border-[#f4ebdc]/10 flex flex-col gap-2"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                          <div className="space-y-0.5">
                            <span className="font-semibold text-sm text-white block">
                              {edu.degree}
                            </span>
                            <span className="text-xs text-[#c8b7a6] block leading-relaxed">
                              {edu.school}
                            </span>
                          </div>
                          <span className="text-xs font-mono text-[#a3e635] shrink-0 bg-[#1e1511] px-2.5 py-0.5 rounded-md border border-[#f4ebdc]/5 self-start sm:self-auto">
                            {edu.year}
                          </span>
                        </div>

                        {educationCerts[i] && (
                          <div className="pt-2 border-t border-[#f4ebdc]/10 mt-1">
                            <button
                              type="button"
                              onClick={() => {
                                sound.playClick();
                                setLightboxData({ images: educationCerts[i], currentIndex: 0 });
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f2b705]/15 hover:bg-[#f2b705]/25 text-[#f2b705] border border-[#f2b705]/30 text-xs font-mono font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>{language === "th" ? `🔍 เปิดดูทรานสคริปต์จริง (${educationCerts[i].length} หน้า)` : `🔍 View Transcript (${educationCerts[i].length} Pages)`}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Certifications & National Standards */}
              {"certifications" in t.yellow_vase && t.yellow_vase.certifications && (
                <div className="space-y-3">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[#60a5fa] flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#60a5fa]" />
                    <span>{"certsTitle" in t.yellow_vase ? t.yellow_vase.certsTitle : (language === "th" ? "ใบรับรองและมาตรฐานวิชาชีพ (Certificates & Standards)" : "Certifications & Standards")}</span>
                  </h3>
                  <div className="space-y-2.5">
                    {t.yellow_vase.certifications.map((cert: any, i: number) => {
                      const credentialsCerts: Record<number, { url: string; caption: string }[]> = {
                        0: [
                          {
                            url: "/images/certificates/cert-national-skill-standard-front.webp",
                            caption: language === "th" ? "หนังสือรับรองมาตรฐานฝีมือแรงงานแห่งชาติ: ช่างไฟฟ้าภายในอาคาร ระดับ 1 — กรมพัฒนาฝีมือแรงงาน" : "National Skill Standard Assessment Certificate: On Building Electrician Level 1"
                          },
                          {
                            url: "/images/certificates/cert-national-skill-standard-back.webp",
                            caption: language === "th" ? "ใบแจ้งผลคะแนนมาตรฐานฝีมือแรงงานแห่งชาติ (รวม 89.6 / 100) — กระทรวงแรงงาน" : "National Skill Standard Score Sheet (Total Score: 89.6 / 100)"
                          }
                        ],
                        1: [
                          {
                            url: "/images/certificates/cert-botnoi-completion.webp",
                            caption: language === "th" ? "BOTNOI TRAINEE 2026 Certificate: Mobile Application Developer (ดร.วินน์ วรวุฒิคุณชัย)" : "BOTNOI TRAINEE Certificate of Completion: Mobile Application Developer"
                          },
                          {
                            url: "/images/certificates/cert-botnoi-internship-letter.webp",
                            caption: language === "th" ? "หนังสือรับรองการทำงาน / ฝึกงาน บริษัท ไอบอทน้อย จำกัด (IBN-0670)" : "Official Internship Verification Letter — Botnoi Group Co., Ltd."
                          }
                        ],
                        2: [
                          {
                            url: "/images/certificates/cert-prompt-techno-iso9001.webp",
                            caption: language === "th" ? "เกียรติบัตรการฝึกอบรมการทำงานเป็นทีม และมาตรฐาน ISO 9001:2015 — บริษัท พร้อม เทคโน เซอร์วิส จำกัด" : "Training Certificate: Teamwork & ISO 9001:2015 — Prompt Techno Service"
                          },
                          {
                            url: "/images/certificates/cert-prompt-techno-dual.webp",
                            caption: language === "th" ? "วุฒิบัตรการฝึกวิชาชีพตำแหน่ง ช่างเทคนิค ในระบบทวิภาคี — บริษัท พร้อม เทคโน เซอร์วิส จำกัด" : "Vocational Training Certificate: Operations Technician — Prompt Techno Service"
                          },
                          {
                            url: "/images/certificates/cert-prompt-techno-letter.webp",
                            caption: language === "th" ? "หนังสือรับรองผ่านงาน แผนก Operation and Maintenance Section A (หน่วยงาน NXP Semiconductor)" : "Work Verification Letter — Prompt Techno Service (NXP Semiconductor Facility)"
                          }
                        ]
                      };

                      return (
                        <div
                          key={i}
                          className="p-4 rounded-2xl bg-[#2c2019] border border-[#f4ebdc]/10 flex flex-col gap-2"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                            <div className="space-y-0.5">
                              <span className="font-semibold text-xs sm:text-sm text-white block">
                                {cert.title}
                              </span>
                              <span className="text-[11px] text-[#c8b7a6] block">
                                {cert.issuer}
                              </span>
                            </div>
                            <span className="text-[11px] font-mono text-[#60a5fa] shrink-0 bg-[#1e1511] px-2.5 py-0.5 rounded-md border border-[#60a5fa]/25 self-start sm:self-auto">
                              {cert.year}
                            </span>
                          </div>

                          {credentialsCerts[i] && (
                            <div className="pt-2 border-t border-[#f4ebdc]/10 mt-1">
                              <button
                                type="button"
                                onClick={() => {
                                  sound.playClick();
                                  setLightboxData({ images: credentialsCerts[i], currentIndex: 0 });
                                }}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#60a5fa]/15 hover:bg-[#60a5fa]/25 text-[#60a5fa] border border-[#60a5fa]/30 text-xs font-mono font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                              >
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>{language === "th" ? `🔍 เปิดดูใบรับรองจริง (${credentialsCerts[i].length} หน้า)` : `🔍 View Certificate (${credentialsCerts[i].length} Pages)`}</span>
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

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
          {/* 3. LAPTOP: FEATURED CASE STUDIES & ARCHITECTURE DEEP DIVE    */}
          {/* ============================================================ */}
          {activeModal === "laptop" && (
            <div className="break-words space-y-5">
              {selectedProjectIndex !== null && t.laptop.projects[selectedProjectIndex] ? (
                // ==========================================================
                // VIEW 2: PROJECT DETAIL VIEW (IMAGE 2)
                // ==========================================================
                (() => {
                  const proj = t.laptop.projects[selectedProjectIndex];
                  const arch = "architecture" in proj ? proj.architecture : null;

                  return (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
                      {/* Top Header Row: Case Study Number + Gold Divider + Gold-ring (X) */}
                      <div className="flex items-center justify-between gap-3 border-b border-[#d4af37]/30 pb-3">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          {proj.type.toLowerCase().includes("game") ? (
                            <Gamepad2 className="w-4 h-4 text-[#e5be7a] shrink-0" />
                          ) : proj.type.toLowerCase().includes("mobile") || proj.type.toLowerCase().includes("มือถือ") ? (
                            <Smartphone className="w-4 h-4 text-[#e5be7a] shrink-0" />
                          ) : (
                            <Globe className="w-4 h-4 text-[#e5be7a] shrink-0" />
                          )}
                          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#d4af37] shrink-0">
                            {`CASE STUDY / ${String(selectedProjectIndex + 1).padStart(2, "0")}`}
                          </span>
                          <div className="h-[1px] bg-[#d4af37]/30 flex-1 ml-2" />
                        </div>

                        {/* Gold-Ring Close Button (X) -> returns to Featured Works Main View */}
                        <button
                          type="button"
                          onClick={() => {
                            sound.playClick();
                            setSelectedProjectIndex(null);
                          }}
                          aria-label={language === "th" ? "ย้อนกลับไปรายการผลงาน" : "Back to case studies list"}
                          className="w-9 h-9 rounded-full border border-[#d4af37]/60 flex items-center justify-center text-white/90 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer shrink-0"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Project Title & Category Meta */}
                      <div>
                        <h2 className="font-playfair text-2xl sm:text-3xl text-white font-bold leading-tight">
                          {proj.title.split(" — ")[0]}
                        </h2>
                        <p className="text-xs sm:text-sm text-[#b8a896] font-mono mt-1">
                          {proj.type} · {proj.year}
                        </p>
                      </div>

                      {/* Hero Image Banner (Clean: No LIVE, No 16 👁, No Play Overlay) */}
                      <div
                        onClick={() => {
                          sound.playClick();
                          if (proj.images && proj.images.length > 0) {
                            setLightboxData({ images: proj.images, currentIndex: 0 });
                          }
                        }}
                        className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden cursor-pointer border border-[#f4ebdc]/15 group shadow-lg bg-black"
                      >
                        <img
                          src={proj.images?.[0]?.url || "/images/projects/arena-live/arena-live-gameplay.webp"}
                          alt={proj.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

                        {/* Bottom-right Fullscreen hint */}
                        {proj.images && proj.images.length > 0 && (
                          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono border border-white/20 flex items-center gap-1.5 shadow-md">
                            <Camera className="w-3.5 h-3.5" />
                            <span>{language === "th" ? `ดูรูปทั้งหมด (${proj.images.length})` : `View all (${proj.images.length})`}</span>
                          </div>
                        )}
                      </div>

                      {/* Summary Description */}
                      <p className="text-xs sm:text-sm text-[#d4c3b3] leading-relaxed">
                        {proj.desc}
                      </p>

                      {/* Key Highlights Card with Green Checkmark & Sparkle */}
                      <div className="rounded-2xl bg-[#231711] border border-[#d4af37]/35 p-3.5 sm:p-4 relative shadow-md">
                        <div className="absolute top-3 right-3 text-[#e5be7a] text-sm select-none pointer-events-none">
                          ✦
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#22c55e]/20 border border-[#22c55e]/40 text-[#22c55e] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                            ✓
                          </div>
                          <div className="space-y-1.5 text-xs sm:text-sm text-[#e0cfbd]">
                            {arch && arch.keyHighlights ? (
                              arch.keyHighlights.map((kh, kIdx) => (
                                <div key={kIdx} className="flex items-start gap-1.5">
                                  <span className="text-[#a3e635]">•</span>
                                  <span>
                                    <strong className="text-white">{kh.title}:</strong> {kh.desc}
                                  </span>
                                </div>
                              ))
                            ) : (
                              <div className="flex items-start gap-1.5">
                                <span className="text-[#a3e635]">•</span>
                                <span>{proj.solved}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {proj.stack.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-mono px-3 py-1 rounded-full bg-[#2a1d17] border border-white/10 text-white/90 shadow-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Screenshots Gallery Section */}
                      {proj.images && proj.images.length > 1 && (
                        <div className="pt-2">
                          <div className="flex items-center justify-between mb-2.5">
                            <div className="flex items-center gap-1.5 font-mono text-xs font-bold tracking-wider text-[#d4af37] uppercase">
                              <Camera className="w-3.5 h-3.5" />
                              <span>SCREENSHOTS GALLERY</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                sound.playClick();
                                setLightboxData({ images: proj.images!, currentIndex: 0 });
                              }}
                              className="text-xs font-mono text-[#d4af37] hover:underline cursor-pointer"
                            >
                              View All →
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-2.5">
                            {proj.images.slice(0, 2).map((img, imgIdx) => (
                              <div
                                key={imgIdx}
                                onClick={() => {
                                  sound.playClick();
                                  setLightboxData({ images: proj.images!, currentIndex: imgIdx });
                                }}
                                className="relative aspect-[16/10] rounded-xl overflow-hidden cursor-pointer border border-[#f4ebdc]/10 hover:border-[#d4af37]/60 group bg-black/40"
                              >
                                <img
                                  src={img.url}
                                  alt={img.caption}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 5 Collapsible Accordion Sections */}
                      {arch && (
                        <div className="space-y-2.5 pt-2">
                          {/* 1. PROBLEM STATEMENT */}
                          <div className="rounded-xl bg-[#231711] border border-[#f4ebdc]/10 overflow-hidden">
                            <button
                              type="button"
                              onClick={() => {
                                sound.playClick();
                                setAccordionOpen((prev) => ({ ...prev, problem: !prev.problem }));
                              }}
                              className="w-full p-3 sm:p-3.5 flex items-center justify-between text-left hover:bg-white/5 transition-colors cursor-pointer"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-amber-400">⚠️</span>
                                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                                  PROBLEM STATEMENT
                                </span>
                              </div>
                              {accordionOpen.problem ? (
                                <ChevronUp className="w-4 h-4 text-[#b8a896]" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-[#b8a896]" />
                              )}
                            </button>
                            {accordionOpen.problem && (
                              <div className="px-3.5 pb-3.5 pt-1 text-xs sm:text-sm text-[#d4c3b3] leading-relaxed border-t border-[#f4ebdc]/5">
                                {arch.problemStatement}
                              </div>
                            )}
                          </div>

                          {/* 2. ARCHITECTURAL SOLUTION */}
                          <div className="rounded-xl bg-[#231711] border border-[#f4ebdc]/10 overflow-hidden">
                            <button
                              type="button"
                              onClick={() => {
                                sound.playClick();
                                setAccordionOpen((prev) => ({ ...prev, solution: !prev.solution }));
                              }}
                              className="w-full p-3 sm:p-3.5 flex items-center justify-between text-left hover:bg-white/5 transition-colors cursor-pointer"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-amber-300">💡</span>
                                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                                  ARCHITECTURAL SOLUTION
                                </span>
                              </div>
                              {accordionOpen.solution ? (
                                <ChevronUp className="w-4 h-4 text-[#b8a896]" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-[#b8a896]" />
                              )}
                            </button>
                            {accordionOpen.solution && (
                              <div className="px-3.5 pb-3.5 pt-1 text-xs sm:text-sm text-[#d4c3b3] leading-relaxed border-t border-[#f4ebdc]/5">
                                {arch.solutionApproach}
                              </div>
                            )}
                          </div>

                          {/* 3. TECH STACK BREAKDOWN */}
                          <div className="rounded-xl bg-[#231711] border border-[#f4ebdc]/10 overflow-hidden">
                            <button
                              type="button"
                              onClick={() => {
                                sound.playClick();
                                setAccordionOpen((prev) => ({ ...prev, tech: !prev.tech }));
                              }}
                              className="w-full p-3 sm:p-3.5 flex items-center justify-between text-left hover:bg-white/5 transition-colors cursor-pointer"
                            >
                              <div className="flex items-center gap-2">
                                <span>🗄️</span>
                                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                                  TECH STACK BREAKDOWN
                                </span>
                              </div>
                              {accordionOpen.tech ? (
                                <ChevronUp className="w-4 h-4 text-[#b8a896]" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-[#b8a896]" />
                              )}
                            </button>
                            {accordionOpen.tech && (
                              <div className="px-3.5 pb-3.5 pt-1 space-y-2 border-t border-[#f4ebdc]/5">
                                {arch.techRoles.map((tr, trIdx) => (
                                  <div key={trIdx} className="p-2.5 rounded-lg bg-[#1a110c] border border-white/5">
                                    <span className="text-xs font-mono font-bold text-[#f5d070] block mb-0.5">
                                      {tr.name}
                                    </span>
                                    <span className="text-xs text-[#d4c3b3] block leading-relaxed">
                                      {tr.role}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 4. ENGINEERING HIGHLIGHTS */}
                          <div className="rounded-xl bg-[#231711] border border-[#f4ebdc]/10 overflow-hidden">
                            <button
                              type="button"
                              onClick={() => {
                                sound.playClick();
                                setAccordionOpen((prev) => ({ ...prev, highlights: !prev.highlights }));
                              }}
                              className="w-full p-3 sm:p-3.5 flex items-center justify-between text-left hover:bg-white/5 transition-colors cursor-pointer"
                            >
                              <div className="flex items-center gap-2">
                                <span>⭐</span>
                                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                                  ENGINEERING HIGHLIGHTS
                                </span>
                              </div>
                              {accordionOpen.highlights ? (
                                <ChevronUp className="w-4 h-4 text-[#b8a896]" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-[#b8a896]" />
                              )}
                            </button>
                            {accordionOpen.highlights && (
                              <div className="px-3.5 pb-3.5 pt-1 flex flex-wrap gap-2 border-t border-[#f4ebdc]/5">
                                {arch.keyHighlights.map((kh, khIdx) => (
                                  <div
                                    key={khIdx}
                                    className="p-2.5 rounded-lg bg-[#1a110c] border border-white/5 flex-1 min-w-[200px]"
                                  >
                                    <span className="text-xs font-mono font-bold text-[#a3e635] block mb-1">
                                      {kh.title}
                                    </span>
                                    <span className="text-xs text-[#d4c3b3] block leading-relaxed">
                                      {kh.desc}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 5. WORKFLOW PIPELINE */}
                          <div className="rounded-xl bg-[#231711] border border-[#f4ebdc]/10 overflow-hidden">
                            <button
                              type="button"
                              onClick={() => {
                                sound.playClick();
                                setAccordionOpen((prev) => ({ ...prev, workflow: !prev.workflow }));
                              }}
                              className="w-full p-3 sm:p-3.5 flex items-center justify-between text-left hover:bg-white/5 transition-colors cursor-pointer"
                            >
                              <div className="flex items-center gap-2">
                                <span>🔗</span>
                                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                                  WORKFLOW PIPELINE
                                </span>
                              </div>
                              {accordionOpen.workflow ? (
                                <ChevronUp className="w-4 h-4 text-[#b8a896]" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-[#b8a896]" />
                              )}
                            </button>
                            {accordionOpen.workflow && (
                              <div className="px-4 pb-4 pt-2 border-t border-[#f4ebdc]/5">
                                <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-[2px] before:bg-gradient-to-b before:from-[#a3e635] before:via-[#e5be7a] before:to-[#a3e635]">
                                  {arch.workflowSteps.map((ws, wsIdx) => (
                                    <div key={wsIdx} className="relative group">
                                      <span className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-[#1a110c] border-2 border-[#a3e635] ring-2 ring-[#a3e635]/20 group-hover:scale-125 transition-transform" />
                                      <div className="flex items-baseline gap-2">
                                        <span className="text-[11px] font-mono font-bold text-[#a3e635] tracking-wider uppercase">
                                          {`STEP ${ws.step}`}
                                        </span>
                                        <span className="text-xs font-bold text-white">
                                          {ws.title}
                                        </span>
                                      </div>
                                      <p className="text-xs text-[#b8a896] mt-0.5 leading-relaxed">
                                        {ws.desc}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Bottom Sticky Action Bar */}
                      <div className="pt-4 mt-6 border-t border-[#d4af37]/30 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              sound.playClick();
                              setSelectedProjectIndex(null);
                            }}
                            className="px-3.5 py-2 rounded-xl bg-[#2a1d17] hover:bg-[#38271f] text-[#f5d070] text-xs font-mono font-bold flex items-center gap-1.5 border border-[#d4af37]/30 transition-all active:scale-95 cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>{language === "th" ? "รายการผลงาน" : "Case Studies"}</span>
                          </button>

                          {proj.images && proj.images.length > 0 && (
                            <button
                              type="button"
                              onClick={() => {
                                sound.playClick();
                                setLightboxData({ images: proj.images!, currentIndex: 0 });
                              }}
                              className="px-3.5 py-2 rounded-xl bg-[#2a1d17] hover:bg-[#38271f] text-white text-xs font-mono font-bold flex items-center gap-1.5 border border-white/10 transition-all active:scale-95 cursor-pointer"
                            >
                              <Camera className="w-3.5 h-3.5" />
                              <span>{language === "th" ? "ดูรูปภาพ" : "Gallery"}</span>
                            </button>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {"demoUrl" in proj && proj.demoUrl && (
                            <a
                              href={proj.demoUrl}
                              target="_blank"
                              rel="noreferrer"
                              onClick={() => sound.playClick()}
                              className="px-4 py-2 rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-black text-xs font-mono font-bold flex items-center gap-1.5 shadow-md transition-all active:scale-95"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>{language === "th" ? "เล่นเกมจริง (Live Demo)" : "Live Demo"}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}

                          {"github" in proj && proj.github && (
                            <a
                              href={proj.github}
                              target="_blank"
                              rel="noreferrer"
                              onClick={() => sound.playClick()}
                              className="px-3.5 py-2 rounded-full border border-[#d4af37] text-white hover:bg-[#d4af37]/20 text-xs font-mono font-bold flex items-center gap-1.5 transition-all active:scale-95"
                            >
                              <span>View on GitHub</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()
              ) : (
                // ==========================================================
                // VIEW 1: FEATURED WORKS MAIN VIEW (ALL EQUAL SIZE CARDS)
                // ==========================================================
                (() => {
                  return (
                    <div className="space-y-5 animate-in fade-in duration-200">
                      {/* Top Bar: Title & Circular Gold-ring Close Button */}
                      <div className="flex items-center justify-between pb-3 border-b border-[#d4af37]/30">
                        <span className="text-[11px] font-mono tracking-widest text-[#d4af37] uppercase font-bold">
                          {language === "th" ? "ผลงานเด่น (CASE STUDIES)" : "CASE STUDIES"}
                        </span>

                        <button
                          type="button"
                          onClick={handleClose}
                          aria-label="Close modal dialog"
                          className="w-9 h-9 rounded-full border border-[#d4af37]/60 flex items-center justify-center text-white/90 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Header Section (Clean: No 3 rays, No Botanical Watermark) */}
                      <div className="pt-1">
                        <h2 className="font-playfair text-3xl sm:text-4xl text-white font-bold tracking-tight">
                          {language === "th" ? "ผลงานของฉัน" : "My Creations"}
                        </h2>

                        <p className="font-playfair italic text-2xl sm:text-3xl text-[#e5be7a] font-normal mt-0.5">
                          Featured Works
                        </p>
                        <p className="text-xs sm:text-sm text-[#b8a896] mt-1.5 leading-relaxed">
                          {language === "th"
                            ? "ผลงานที่เราภูมิใจ และอยากแบ่งปันให้คุณได้รู้จัก"
                            : "Projects crafted with architectural rigor, scalability, and passion."}
                        </p>
                      </div>

                      {/* Equal-Size Project Cards Grid (All 4 cards equal size!) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                        {t.laptop.projects.map((proj, pIdx) => {
                          const projectNumber = `0${pIdx + 1}`;
                          const isMobile = proj.type.toLowerCase().includes("mobile") || proj.type.toLowerCase().includes("มือถือ");
                          const isGame = proj.type.toLowerCase().includes("game");
                          const isVoiceBella = proj.title.toLowerCase().includes("bella") || proj.type.toLowerCase().includes("voice") || proj.type.toLowerCase().includes("fintech");
                          const isPobsuk = proj.title.toLowerCase().includes("pobsuk") || proj.title.includes("พบสุข");

                          return (
                            <div
                              key={pIdx}
                              className="rounded-2xl bg-[#231711] border border-[#f4ebdc]/15 hover:border-[#d4af37]/60 p-4 transition-all flex flex-col justify-between group shadow-md hover:shadow-xl"
                            >
                              <div>
                                {/* Project Thumbnail Preview (Clean: No LIVE, No 16 👁, No Play Overlay) */}
                                <div
                                  onClick={() => {
                                    sound.playClick();
                                    setSelectedProjectIndex(pIdx);
                                  }}
                                  className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black/40 border border-white/5 cursor-pointer mb-3"
                                >
                                  <img
                                    src={proj.images?.[0]?.url || "/images/projects/arena-live/arena-live-gameplay.webp"}
                                    alt={proj.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                                  {/* Top-left Category Pill */}
                                  <div className="absolute top-2.5 left-2.5">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/65 backdrop-blur-md text-[10px] font-mono text-white/95 border border-white/10 shadow-sm">
                                      {isGame ? (
                                        <Gamepad2 className="w-3 h-3 text-[#e5be7a]" />
                                      ) : isMobile ? (
                                        <Smartphone className="w-3 h-3 text-[#e5be7a]" />
                                      ) : isVoiceBella ? (
                                        <Sparkles className="w-3 h-3 text-[#e5be7a]" />
                                      ) : (
                                        <Globe className="w-3 h-3 text-[#e5be7a]" />
                                      )}
                                      <span>
                                        {isMobile
                                          ? "Mobile App"
                                          : isVoiceBella
                                          ? "FinTech & Voice AI"
                                          : isPobsuk
                                          ? "AI & LINE LIFF"
                                          : "16-Bit Game"}
                                      </span>
                                    </span>
                                  </div>

                                  {/* Top-right Index Badge */}
                                  <div className="absolute top-2.5 right-2.5">
                                    <span className="font-mono text-[10px] font-bold text-[#e5be7a] bg-black/65 backdrop-blur-md px-2 py-0.5 rounded-md border border-[#d4af37]/30 shadow-sm">
                                      {projectNumber}
                                    </span>
                                  </div>
                                </div>

                                {/* Project Title & Year */}
                                <div className="flex items-start justify-between gap-1 mb-1">
                                  <h3
                                    onClick={() => {
                                      sound.playClick();
                                      setSelectedProjectIndex(pIdx);
                                    }}
                                    className="font-playfair text-base sm:text-lg font-bold text-white group-hover:text-[#e5be7a] transition-colors leading-snug line-clamp-2 cursor-pointer"
                                  >
                                    {proj.title.split(" — ")[0]}
                                  </h3>
                                  <span className="text-[10px] font-mono text-[#a3e635] bg-[#1a110c] px-2 py-0.5 rounded border border-[#f4ebdc]/5 shrink-0">
                                    {proj.year}
                                  </span>
                                </div>

                                {/* Short Description */}
                                <p className="text-xs text-[#b8a896] line-clamp-2 leading-relaxed mb-3">
                                  {proj.title.includes(" — ") ? proj.title.split(" — ")[1] : proj.desc}
                                </p>

                                {/* Key Highlights Snippet */}
                                <div className="p-2.5 rounded-xl bg-[#1a110c] border border-[#a3e635]/20 text-[11px] text-[#a3e635] font-mono leading-relaxed mb-3 break-words">
                                  ✓ {proj.solved}
                                </div>

                                {/* Tech Stack Badges */}
                                <div className="flex flex-wrap gap-1 mb-4">
                                  {proj.stack.slice(0, 4).map((tech) => (
                                    <span
                                      key={tech}
                                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#2a1d17] border border-white/5 text-white/80"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                  {proj.stack.length > 4 && (
                                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-[#2a1d17] border border-white/5 text-[#d4af37]">
                                      +{proj.stack.length - 4}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Card Actions: Full-width Gold CTA Button */}
                              <div className="pt-2 border-t border-[#f4ebdc]/10 space-y-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    sound.playClick();
                                    setSelectedProjectIndex(pIdx);
                                  }}
                                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#d4a359] via-[#e5be7a] to-[#d4a359] hover:brightness-110 text-[#1a120c] font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
                                >
                                  <span>{language === "th" ? "ดูรายละเอียดโปรเจกต์" : "View Project Details"}</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>

                                {/* Direct Links Row (if live demo or github available) */}
                                <div className="flex items-center justify-between gap-2 pt-1 text-[11px] font-mono">
                                  {"demoUrl" in proj && proj.demoUrl ? (
                                    <a
                                      href={proj.demoUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        sound.playClick();
                                      }}
                                      className="inline-flex items-center gap-1 text-[#4ade80] hover:underline"
                                    >
                                      <Play className="w-3 h-3 fill-current" />
                                      <span>Live Demo ↗</span>
                                    </a>
                                  ) : proj.images && proj.images.length > 0 ? (
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        sound.playClick();
                                        setLightboxData({ images: proj.images!, currentIndex: 0 });
                                      }}
                                      className="inline-flex items-center gap-1 text-[#f5d070] hover:underline cursor-pointer"
                                    >
                                      <Camera className="w-3 h-3" />
                                      <span>{language === "th" ? `รูปภาพ (${proj.images.length})` : `Images (${proj.images.length})`}</span>
                                    </button>
                                  ) : (
                                    <span />
                                  )}

                                  {"github" in proj && proj.github && (
                                    <a
                                      href={proj.github}
                                      target="_blank"
                                      rel="noreferrer"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        sound.playClick();
                                      }}
                                      className="inline-flex items-center gap-1 text-[#e0cfbd] hover:text-white"
                                    >
                                      <span>GitHub ↗</span>
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Footer Info: Total projects count */}
                      <div className="flex items-center justify-between pt-3 border-t border-[#f4ebdc]/10 text-xs font-mono text-[#b8a896]">
                        <span>{language === "th" ? "โครงการทั้งหมด 4 รายการ" : "All 4 Engineering Case Studies"}</span>
                        <span className="text-[#e5be7a] font-bold">04 / 04</span>
                      </div>
                    </div>
                  );
                })()
              )}
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

    {/* ============================================================ */}
    {/* FULLSCREEN IMAGE LIGHTBOX VIEWER                             */}
    {/* ============================================================ */}
    <AnimatePresence>
      {lightboxData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6"
          onClick={() => setLightboxData(null)}
        >
          {/* Top Toolbar */}
          <div
            className="w-full max-w-5xl flex items-center justify-between text-white pb-3 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono bg-white/10 px-3 py-1 rounded-full text-[#f2b705] border border-white/10">
                {lightboxData.currentIndex + 1} / {lightboxData.images.length}
              </span>
              <span className="text-xs text-white/70 font-mono hidden sm:inline">
                {language === "th"
                  ? "(กด Esc หรือแตะที่ว่างเพื่อปิด, ปุ่มลูกศร ซ้าย-ขวา เพื่อเปลี่ยนรูป)"
                  : "(Press Esc or tap outside to close, Left/Right arrow keys to navigate)"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setLightboxData(null)}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/10 active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Image Stage */}
          <div
            className="relative w-full max-w-5xl flex-1 flex items-center justify-center min-h-0 py-2"
            onClick={(e) => e.stopPropagation()}
          >
            {lightboxData.images.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setLightboxData((prev) =>
                    prev
                      ? {
                          ...prev,
                          currentIndex:
                            (prev.currentIndex - 1 + prev.images.length) % prev.images.length,
                        }
                      : null
                  );
                }}
                className="absolute left-2 sm:left-4 z-20 w-11 h-11 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer active:scale-95 shadow-xl"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            <img
              key={lightboxData.images[lightboxData.currentIndex].url}
              src={lightboxData.images[lightboxData.currentIndex].url}
              alt={lightboxData.images[lightboxData.currentIndex].caption}
              className="max-h-[75vh] max-w-full w-auto object-contain rounded-xl shadow-2xl border border-white/10"
            />

            {lightboxData.images.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setLightboxData((prev) =>
                    prev
                      ? {
                          ...prev,
                          currentIndex: (prev.currentIndex + 1) % prev.images.length,
                        }
                      : null
                  );
                }}
                className="absolute right-2 sm:right-4 z-20 w-11 h-11 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer active:scale-95 shadow-xl"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Caption Bar */}
          <div
            className="w-full max-w-3xl text-center py-2.5 px-4 bg-black/80 backdrop-blur-sm rounded-xl border border-white/10 text-white text-xs sm:text-sm font-medium z-10 shadow-lg mt-2"
            onClick={(e) => e.stopPropagation()}
          >
            {lightboxData.images[lightboxData.currentIndex].caption}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
