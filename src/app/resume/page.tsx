"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Printer, Mail, Phone, MapPin, Globe, Award, Briefcase, Code, CheckCircle, ExternalLink, Sparkles, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function ResumePage() {
  const [lightboxData, setLightboxData] = useState<{
    images: { url: string; caption: string }[];
    currentIndex: number;
  } | null>(null);

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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen w-full overflow-y-auto bg-[#faf8f5] text-[#2d2522] font-sans antialiased select-text selection:bg-[#f2b705] selection:text-black">
      {/* Top Floating Action Bar (Hidden when printing) */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#e5ded4] py-3.5 px-4 sm:px-8 print:hidden shadow-xs">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-[#786b62] hover:text-[#1c1613] transition-colors py-1.5 px-3 rounded-lg hover:bg-[#f3eee7]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to 3D Desk</span>
          </Link>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2d2522] hover:bg-[#1a1513] text-white text-xs sm:text-sm font-mono font-medium shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <a
              href="mailto:jirayukokhoon@gmail.com?subject=Opportunity%20Discussion"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f2b705] hover:bg-[#d9a404] text-[#1c1613] text-xs sm:text-sm font-mono font-bold shadow-md transition-all active:scale-95"
            >
              <Mail className="w-4 h-4" />
              <span>Hire Jirayu</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Resume Sheet */}
      <main className="max-w-4xl mx-auto my-6 sm:my-10 p-6 sm:p-12 bg-white rounded-2xl shadow-xl print:shadow-none print:m-0 print:p-8 print:max-w-none border border-[#eee6dc] print:border-none">
        {/* Header Block */}
        <div className="border-b border-[#eee6dc] pb-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1c1613] tracking-tight">
                Jirayu Kokhoon (จิรายุ โกคูณ)
              </h1>
              <p className="text-base sm:text-lg font-mono text-[#995511] font-semibold mt-1">
                Full-Stack & Mobile Developer
              </p>
              <p className="text-xs sm:text-sm text-[#786b62] mt-2 max-w-xl leading-relaxed">
                Pragmatic software engineer with high ownership and an &ldquo;Ask First, Code Later&rdquo; mindset. 
                Specialized in cross-platform mobile apps (React Native/Flutter), high-throughput full-stack web (Next.js/Node/Go), 
                and interactive 3D WebGL experiences.
              </p>
            </div>

            <div className="flex flex-col gap-1.5 text-xs font-mono text-[#5c5047] sm:text-right shrink-0">
              <span className="flex items-center sm:justify-end gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#995511]" />
                Bangkok, Thailand (Remote / Hybrid)
              </span>
              <a href="mailto:jirayukokhoon@gmail.com" className="flex items-center sm:justify-end gap-1.5 hover:underline text-[#2d2522]">
                <Mail className="w-3.5 h-3.5 text-[#995511]" />
                jirayukokhoon@gmail.com
              </a>
              <span className="flex items-center sm:justify-end gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#995511]" />
                +66 81 234 5678
              </span>
              <a
                href="https://github.com/Jirayuko1"
                target="_blank"
                rel="noreferrer"
                className="flex items-center sm:justify-end gap-1.5 hover:underline text-[#2d2522]"
              >
                <Code className="w-3.5 h-3.5 text-[#995511]" />
                github.com/Jirayuko1
              </a>
              <a
                href="https://www.linkedin.com/in/jirayu-kokhoon-883796390/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center sm:justify-end gap-1.5 hover:underline text-[#2d2522]"
              >
                <Globe className="w-3.5 h-3.5 text-[#995511]" />
                linkedin.com/in/jirayu-kokhoon
              </a>
            </div>
          </div>
        </div>

        {/* Section: Core Philosophy */}
        <div className="mb-8 p-4 rounded-xl bg-[#faf6f0] border border-[#eee4d8]">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#995511] mb-1 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" />
            Engineering Philosophy: &ldquo;Ask First, Code Later&rdquo;
          </h2>
          <p className="text-xs sm:text-sm text-[#5c5047] leading-relaxed">
            I eliminate costly rework by clarifying ambiguous specifications, questioning unstated assumptions, 
            and understanding real user needs upfront. Code is an asset only when it solves the right problem; otherwise, it is technical debt.
          </p>
        </div>

        {/* Section: Technical Proficiencies & Working Tools */}
        <div className="mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#995511] mb-3 flex items-center gap-2">
            <Code className="w-4 h-4" />
            Technical Proficiencies & Tools
          </h2>

          {/* Core Tools Badge Row */}
          <div className="mb-3 p-3.5 rounded-xl border border-[#995511]/20 bg-[#faf6f0]">
            <span className="text-[11px] font-mono font-bold text-[#995511] uppercase tracking-wider block mb-2">
              Primary Working Tools & Platforms:
            </span>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {["Flutter", "GitHub", "Git Desktop", "Lovable", "Antigravity", "Android Studio", "Figma", "LINE OA"].map((tool) => (
                <span
                  key={tool}
                  className="px-2.5 py-1 rounded-md bg-white border border-[#ecd8c7] text-[#1c1613] font-semibold shadow-xs"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg border border-[#eee6dc] bg-[#fdfbf9]">
              <span className="font-bold text-[#1c1613] block mb-1">Mobile Development</span>
              <p className="text-[#5c5047] leading-relaxed">
                Flutter, Dart, Android Studio, iOS/Android Cross-Platform, Offline-first SQLite Sync, FCM Push Notifications, Mobile CI/CD, Material Design & Cupertino.
              </p>
            </div>
            <div className="p-3 rounded-lg border border-[#eee6dc] bg-[#fdfbf9]">
              <span className="font-bold text-[#1c1613] block mb-1">Full-Stack & Cloud Architecture</span>
              <p className="text-[#5c5047] leading-relaxed">
                React, Next.js (App Router), TypeScript, Node.js, Express, Python, Go, Tailwind CSS, Supabase (PostgreSQL, PostGIS), Firebase (Firestore, Cloud Functions), WebSockets.
              </p>
            </div>
            <div className="p-3 rounded-lg border border-[#eee6dc] bg-[#fdfbf9]">
              <span className="font-bold text-[#1c1613] block mb-1">AI, Chatbots & Multi-Modal</span>
              <p className="text-[#5c5047] leading-relaxed">
                Google Gemini AI, Botnoi Chatbot Webhooks, LINE Official Account (LINE OA) & LINE LIFF, WebAvatar SDK Voice AI, State Contract Architecture.
              </p>
            </div>
            <div className="p-3 rounded-lg border border-[#eee6dc] bg-[#fdfbf9]">
              <span className="font-bold text-[#1c1613] block mb-1">Creative Web & Engineering Discipline</span>
              <p className="text-[#5c5047] leading-relaxed">
                Three.js 3D WebGL, Web Audio API sound synthesis, Framer Motion, WCAG 2.2 AA Accessibility, Unit & Integration Testing, Zero-Slop UX Craftsmanship.
              </p>
            </div>
          </div>
        </div>

        {/* Section: Work & Internship Experience */}
        <div className="mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#995511] mb-3 flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Work & Internship Experience
          </h2>
          <div className="space-y-3.5">
            <div className="p-4 rounded-xl border border-[#eee6dc] bg-[#fdfbf9]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-[#1c1613]">
                    Mobile Application Developer (Trainee)
                  </h3>
                  <span className="text-xs font-semibold text-[#995511]">
                    Botnoi Group Co., Ltd. (บริษัท ไอบอทน้อย จำกัด)
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#995511] bg-[#f9ebe0] px-2.5 py-0.5 rounded shrink-0 self-start sm:self-auto">
                  March 2026 – November 2026
                </span>
              </div>
              <p className="text-xs text-[#5c5047] leading-relaxed mt-2">
                Engineered production-grade cross-platform mobile application prototypes with Flutter integrated with Botnoi AI Chatbot webhooks. Spearheaded the Aura Staff mobile hotel operations system with smart room extraction and FCM push notifications. Graduated from the BOTNOI TRAINEE program with distinction.
              </p>
              <div className="pt-2.5 mt-2.5 border-t border-[#eee6dc]/70 flex flex-wrap gap-2 print:hidden">
                <button
                  type="button"
                  onClick={() =>
                    setLightboxData({
                      images: [
                        {
                          url: "/images/certificates/cert-botnoi-completion.webp",
                          caption: "BOTNOI TRAINEE Certificate of Completion: Mobile Application Developer (Signed by Dr. Winn Voravuthikunchai, CEO & Founder)",
                        },
                        {
                          url: "/images/certificates/cert-botnoi-internship-letter.webp",
                          caption: "Official Internship Verification Letter — Botnoi Group Co., Ltd. (Ref: IBN-0670)",
                        },
                      ],
                      currentIndex: 0,
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#995511]/10 hover:bg-[#995511]/20 text-[#995511] text-xs font-mono font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>🔍 View Official Certificate (2 Pages)</span>
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-[#eee6dc] bg-[#fdfbf9]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-[#1c1613]">
                    Operations & Maintenance Technician
                  </h3>
                  <span className="text-xs font-semibold text-[#995511]">
                    Prompt Techno Service Co., Ltd. — Stationed at NXP Semiconductor Unit
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#786b62] bg-[#f3eee7] px-2.5 py-0.5 rounded shrink-0 self-start sm:self-auto">
                  April 2021 – March 2022
                </span>
              </div>
              <p className="text-xs text-[#5c5047] leading-relaxed mt-2">
                Managed operations and preventive maintenance for critical facility support and electrical control systems in Section A of NXP Semiconductor plant. Maintained strict compliance with ISO 9001:2015 quality procedures and high-reliability industrial safety standards.
              </p>
              <div className="pt-2.5 mt-2.5 border-t border-[#eee6dc]/70 flex flex-wrap gap-2 print:hidden">
                <button
                  type="button"
                  onClick={() =>
                    setLightboxData({
                      images: [
                        {
                          url: "/images/certificates/cert-prompt-techno-letter.webp",
                          caption: "Official Work Verification Letter — Prompt Techno Service Co., Ltd. (Stationed at NXP Semiconductor Unit)",
                        },
                        {
                          url: "/images/certificates/cert-prompt-techno-iso9001.webp",
                          caption: "Professional Operational Training Certificate: Teamwork & ISO 9001:2015 — Prompt Techno Service",
                        },
                        {
                          url: "/images/certificates/cert-prompt-techno-dual.webp",
                          caption: "Dual Vocational Training Certificate: Operations Technician — Prompt Techno Service",
                        },
                      ],
                      currentIndex: 0,
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#995511]/10 hover:bg-[#995511]/20 text-[#995511] text-xs font-mono font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>🔍 View Official Verification & Training Certs (3 Pages)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Featured Projects & Case Studies */}
        <div className="mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#995511] mb-3 flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Featured Engineering Projects
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-[#eee6dc] bg-[#fdfbf9]">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-[#1c1613]">
                    ARENA LIVE: FIGHTER BLAZE — TikTok Live 16-Bit Cyber City Interactive Game
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    <a
                      href="https://tik-tok-live-interactive-game.vercel.app/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-800 hover:text-emerald-950 text-xs font-mono font-semibold inline-flex items-center gap-1 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 px-2 py-0.5 rounded transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>🎮 Play Live Demo ↗</span>
                    </a>
                    <a
                      href="https://github.com/Jirayuko1/TikTok-Live-Interactive-Game"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#995511] hover:text-[#1c1613] text-xs font-mono inline-flex items-center gap-1 bg-[#f9ebe0] hover:bg-[#f3ded0] border border-[#ecd8c7] px-2 py-0.5 rounded transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>View GitHub ↗</span>
                    </a>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-[#995511] bg-[#f9ebe0] px-2 py-0.5 rounded shrink-0">
                  React · Next.js · Node.js · Python · WebSockets
                </span>
              </div>
              <p className="text-xs text-[#5c5047] leading-relaxed mb-2">
                Cyberpunk 16-bit pixel battle royale game built for TikTok Live streams. Bridges real-time TikTok Live chat comments, likes, and gifts directly into 2D arena physics, attacks, and ring-out mechanics with full OBS overlay support.
              </p>
              <span className="text-[11px] font-mono text-[#786b62]">
                Key Impact: Sub-second reaction latency for gifts & chat commands; zero dropped packets under high viewer engagement bursts.
              </span>
            </div>

            <div className="p-4 rounded-xl border border-[#eee6dc] bg-[#fdfbf9]">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-[#1c1613]">
                    Aura Mobile App — Smart Hotel Operations & Task Dispatch
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    <a
                      href="https://github.com/Jirayuko1/aura_mobile_app_prototype"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#995511] hover:text-[#1c1613] text-xs font-mono inline-flex items-center gap-1 bg-[#f9ebe0] hover:bg-[#f3ded0] border border-[#ecd8c7] px-2.5 py-0.5 rounded transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>View GitHub ↗</span>
                    </a>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-[#995511] bg-[#f9ebe0] px-2 py-0.5 rounded shrink-0">
                  Flutter · Dart · Firebase · Cloud Functions · Botnoi AI
                </span>
              </div>
              <p className="text-xs text-[#5c5047] leading-relaxed mb-2">
                Cross-platform hotel staff app integrated with Botnoi AI chatbot. Automatically parses guest requests, extracts room numbers, and dispatches real-time tickets with FCM push alerts, in-progress lifecycle tracking, and photo-proof verification.
              </p>
              <span className="text-[11px] font-mono text-[#786b62]">
                Key Impact: Automated guest-to-staff task routing eliminating manual dispatch; real-time performance analytics by hotel department.
              </span>
            </div>

            <div className="p-4 rounded-xl border border-[#eee6dc] bg-[#fdfbf9]">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-[#1c1613]">
                    Pobsuk (พบสุข) — AI Senior Activity Booking on LINE OA & LIFF
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    <a
                      href="https://github.com/Jirayuko1/pobsuk"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#995511] hover:text-[#1c1613] text-xs font-mono inline-flex items-center gap-1 bg-[#f9ebe0] hover:bg-[#f3ded0] border border-[#ecd8c7] px-2.5 py-0.5 rounded transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>View GitHub ↗</span>
                    </a>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-[#995511] bg-[#f9ebe0] px-2 py-0.5 rounded shrink-0">
                  LINE OA · LINE LIFF · Gemini AI · React · Express · Supabase
                </span>
              </div>
              <p className="text-xs text-[#5c5047] leading-relaxed mb-2">
                AI booking platform for senior citizens built on LINE Official Account and LINE Front-end Framework (LIFF). Integrates Google Gemini AI for empathetic natural language booking, generates digital tickets, and records senior physical accommodations.
              </p>
              <span className="text-[11px] font-mono text-[#786b62]">
                Key Impact: Zero friction onboarding via LINE with AI typing animations; atomic stored procedures in PostgreSQL/PostGIS preventing concurrent seat overbooking.
              </span>
            </div>

            <div className="p-4 rounded-xl border border-[#eee6dc] bg-[#fdfbf9]">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-[#1c1613]">
                    Voice-Bot-Bella — Bella Digital Bank & WebAvatar Voice Assistant
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    <a
                      href="https://github.com/Jirayuko1/Voice-Bot-Bella"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#995511] hover:text-[#1c1613] text-xs font-mono inline-flex items-center gap-1 bg-[#f9ebe0] hover:bg-[#f3ded0] border border-[#ecd8c7] px-2.5 py-0.5 rounded transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>View GitHub ↗</span>
                    </a>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-[#995511] bg-[#f9ebe0] px-2 py-0.5 rounded shrink-0">
                  WebAvatar SDK · Voice AI · FinTech Engine · JavaScript
                </span>
              </div>
              <p className="text-xs text-[#5c5047] leading-relaxed mb-2">
                Multimodal AI voice assistant and digital banking platform. Features real-time visual WebAvatar speech interaction, a state contract architecture eliminating handoff loss across 5 specialized financial prompts, and automated mathematical diagnostics for debt-service ratio (DSR), emergency fund health, and retirement planning.
              </p>
              <span className="text-[11px] font-mono text-[#786b62]">
                Key Impact: Zero conversational state loss across complex multi-step financial consultations; strict regulatory compliance safeguards in investment advisory.
              </span>
            </div>

            <div className="p-4 rounded-xl border border-[#eee6dc] bg-[#fdfbf9]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                <h3 className="font-bold text-sm sm:text-base text-[#1c1613]">
                  Interactive 3D Workstation Portfolio
                </h3>
                <span className="text-[11px] font-mono text-[#995511] bg-[#f9ebe0] px-2 py-0.5 rounded">
                  Three.js · Next.js · Web Audio API · Tailwind
                </span>
              </div>
              <p className="text-xs text-[#5c5047] leading-relaxed mb-2">
                Created a fully interactive 3D digital twin of a real workspace. Integrated real-time procedural audio synthesis, 
                dynamic day/night lighting lerps, cinematic camera zoom, and accessible modal navigation. Zero external audio files required.
              </p>
              <span className="text-[11px] font-mono text-[#786b62]">
                Key Impact: Buttery 60fps on modern mobile and desktop browsers with 100/100 Lighthouse performance metrics.
              </span>
            </div>
          </div>
        </div>

        {/* Section: Education & Academic Background */}
        <div className="mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#995511] mb-3 flex items-center gap-2">
            <Award className="w-4 h-4" />
            Education & Academic Background
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-[#eee6dc] bg-[#fdfbf9] space-y-1">
              <span className="font-bold text-[#1c1613] block">
                Bachelor of Engineering / Science Candidate in Digital & Information Technology (DIT)
              </span>
              <span className="text-[#5c5047] block">
                Panyapiwat Institute of Management (PIM) — Chaengwattana
              </span>
              <span className="text-[#786b62] block text-[11px]">
                Faculty of Engineering and Technology (คณะวิศวกรรมศาสตร์และเทคโนโลยี)
              </span>
              <span className="text-[#995511] font-mono text-[11px] mt-1 inline-block bg-[#f9ebe0] px-2 py-0.5 rounded">
                2023 — Present · Currently Studying (กำลังศึกษาอยู่)
              </span>
            </div>

            <div className="p-3.5 rounded-xl border border-[#eee6dc] bg-[#fdfbf9] space-y-1">
              <span className="font-bold text-[#1c1613] block">
                Technical Education Diploma (ปวส.) in Electrical Engineering
              </span>
              <span className="text-[#5c5047] block">
                Saraburi Technical College (วิทยาลัยเทคนิคสระบุรี)
              </span>
              <span className="text-[#786b62] block text-[11px]">
                Specialization: Electrical Control Devices (สาขางานไฟฟ้าควบคุม) · GPA 3.14 (Project Grade 4.00)
              </span>
              <span className="text-[#786b62] font-mono text-[11px] mt-1 inline-block bg-[#f3eee7] px-2 py-0.5 rounded">
                2020 — 2022 · Graduated March 15, 2022
              </span>
              <div className="pt-2 mt-2 border-t border-[#eee6dc]/70 print:hidden">
                <button
                  type="button"
                  onClick={() =>
                    setLightboxData({
                      images: [
                        {
                          url: "/images/certificates/transcript-saraburi-thai-p1.webp",
                          caption: "Technical Education Diploma Transcript (Thai Version - Page 1) — Saraburi Technical College",
                        },
                        {
                          url: "/images/certificates/transcript-saraburi-thai-p2.webp",
                          caption: "Technical Education Diploma Transcript (Thai Version - Page 2) — Project Grade 4.00, Cumulative GPA 3.14",
                        },
                        {
                          url: "/images/certificates/transcript-saraburi-en-p1.webp",
                          caption: "Technical Education Diploma Transcript (Official English Version) — Saraburi Technical College",
                        },
                      ],
                      currentIndex: 0,
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#995511]/10 hover:bg-[#995511]/20 text-[#995511] text-[11px] font-mono font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>🔍 View Official Transcript (GPA 3.14)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Certifications & National Skill Standards */}
        <div>
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#995511] mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Certifications & National Skill Standards
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-[#eee6dc] bg-[#fdfbf9] space-y-1 flex flex-col justify-between">
              <div>
                <span className="font-bold text-[#1c1613] block">
                  National Skill Standard Assessment: On Building Electrician Level 1
                </span>
                <span className="text-[#5c5047] block text-[11px]">
                  Department of Skill Development, Ministry of Labour (Score: 89.6 / 100)
                </span>
                <span className="text-[#995511] font-mono text-[11px] mt-1 block">
                  Certified March 29, 2021
                </span>
              </div>
              <div className="pt-2 mt-2 border-t border-[#eee6dc]/70 print:hidden">
                <button
                  type="button"
                  onClick={() =>
                    setLightboxData({
                      images: [
                        {
                          url: "/images/certificates/cert-national-skill-standard-front.webp",
                          caption: "National Skill Standard Assessment Certificate: On Building Electrician Level 1 — Department of Skill Development, Ministry of Labour",
                        },
                        {
                          url: "/images/certificates/cert-national-skill-standard-back.webp",
                          caption: "National Skill Standard Score Sheet (Theory: 15, Practical: 74.6, Total: 89.6 / 100)",
                        },
                      ],
                      currentIndex: 0,
                    })
                  }
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#995511]/10 hover:bg-[#995511]/20 text-[#995511] text-[11px] font-mono font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>🔍 View Certificate</span>
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-[#eee6dc] bg-[#fdfbf9] space-y-1 flex flex-col justify-between">
              <div>
                <span className="font-bold text-[#1c1613] block">
                  BOTNOI TRAINEE Certificate: Mobile Application Developer
                </span>
                <span className="text-[#5c5047] block text-[11px]">
                  Botnoi Group (Signed by Dr. Winn Voravuthikunchai, CEO & Founder)
                </span>
                <span className="text-[#995511] font-mono text-[11px] mt-1 block">
                  Certified 2026
                </span>
              </div>
              <div className="pt-2 mt-2 border-t border-[#eee6dc]/70 print:hidden">
                <button
                  type="button"
                  onClick={() =>
                    setLightboxData({
                      images: [
                        {
                          url: "/images/certificates/cert-botnoi-completion.webp",
                          caption: "BOTNOI TRAINEE Certificate of Completion: Mobile Application Developer (Signed by Dr. Winn Voravuthikunchai, CEO & Founder)",
                        },
                        {
                          url: "/images/certificates/cert-botnoi-internship-letter.webp",
                          caption: "Official Internship Verification Letter — Botnoi Group Co., Ltd.",
                        },
                      ],
                      currentIndex: 0,
                    })
                  }
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#995511]/10 hover:bg-[#995511]/20 text-[#995511] text-[11px] font-mono font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>🔍 View Certificate</span>
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-[#eee6dc] bg-[#fdfbf9] space-y-1 flex flex-col justify-between">
              <div>
                <span className="font-bold text-[#1c1613] block">
                  Professional Operational Training: Teamwork & ISO 9001:2015
                </span>
                <span className="text-[#5c5047] block text-[11px]">
                  Prompt Techno Service Co., Ltd. (NXP Semiconductor Facility)
                </span>
                <span className="text-[#995511] font-mono text-[11px] mt-1 block">
                  Certified March 20, 2022
                </span>
              </div>
              <div className="pt-2 mt-2 border-t border-[#eee6dc]/70 print:hidden">
                <button
                  type="button"
                  onClick={() =>
                    setLightboxData({
                      images: [
                        {
                          url: "/images/certificates/cert-prompt-techno-iso9001.webp",
                          caption: "Professional Operational Training Certificate: Teamwork & ISO 9001:2015 — Prompt Techno Service Co., Ltd.",
                        },
                        {
                          url: "/images/certificates/cert-prompt-techno-dual.webp",
                          caption: "Dual Vocational Training Certificate: Operations Technician — Prompt Techno Service Co., Ltd.",
                        },
                      ],
                      currentIndex: 0,
                    })
                  }
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#995511]/10 hover:bg-[#995511]/20 text-[#995511] text-[11px] font-mono font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>🔍 View Certificate</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto py-8 text-center text-xs font-mono text-[#a39487] print:hidden">
        © 2026 Jirayu Kokhoon (จิรายุ โกคูณ) · Available for High-Impact Full-Stack & Mobile Roles · Bangkok, Thailand
      </footer>

      {/* Fullscreen Lightbox Modal for Viewing Credentials (Print Hidden, In-app only, No download button) */}
      {lightboxData && (
        <div
          className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 print:hidden"
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
                (Press Esc or tap outside to close, Left/Right arrow keys to navigate)
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
        </div>
      )}
    </div>
  );
}
