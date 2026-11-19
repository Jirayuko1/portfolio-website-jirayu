"use client";

import Link from "next/link";
import { ArrowLeft, Printer, Mail, Phone, MapPin, Globe, Award, Briefcase, Code, CheckCircle, ExternalLink } from "lucide-react";

export default function ResumePage() {
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

        {/* Section: Technical Proficiencies */}
        <div className="mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#995511] mb-3 flex items-center gap-2">
            <Code className="w-4 h-4" />
            Technical Proficiencies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg border border-[#eee6dc] bg-[#fdfbf9]">
              <span className="font-bold text-[#1c1613] block mb-1">Mobile Development</span>
              <p className="text-[#5c5047] leading-relaxed">
                React Native, Expo (EAS), Flutter, Swift/iOS Native, Kotlin/Android, Offline-first SQLite Sync, CoreML on-device vision, Push Notifications, App Store & Play Store CI/CD.
              </p>
            </div>
            <div className="p-3 rounded-lg border border-[#eee6dc] bg-[#fdfbf9]">
              <span className="font-bold text-[#1c1613] block mb-1">Web & Cloud Architecture</span>
              <p className="text-[#5c5047] leading-relaxed">
                Next.js (App Router), TypeScript, React 19, Node.js, NestJS, Tailwind CSS, PostgreSQL, Redis, Apache Kafka, Docker, Netlify Edge CDN, AWS, WebSockets.
              </p>
            </div>
            <div className="p-3 rounded-lg border border-[#eee6dc] bg-[#fdfbf9]">
              <span className="font-bold text-[#1c1613] block mb-1">3D Graphics & Creative Web</span>
              <p className="text-[#5c5047] leading-relaxed">
                Three.js, WebGL GLSL Shaders, Web Audio API procedural sound synthesis, Framer Motion, GSAP, Blender 3D model optimization (GLTF/DRACO).
              </p>
            </div>
            <div className="p-3 rounded-lg border border-[#eee6dc] bg-[#fdfbf9]">
              <span className="font-bold text-[#1c1613] block mb-1">Disciplines & Standards</span>
              <p className="text-[#5c5047] leading-relaxed">
                WCAG 2.2 AA Accessibility, Unit & E2E Testing (Jest, Playwright), CI/CD Automation, Semantic HTML, Zero-Slop UX Craftsmanship.
              </p>
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

        {/* Section: Education & Certification */}
        <div>
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#995511] mb-3 flex items-center gap-2">
            <Award className="w-4 h-4" />
            Education & Certifications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-[#eee6dc] bg-[#fdfbf9]">
              <span className="font-bold text-[#1c1613] block">B.Sc. in Computer Science (Honors)</span>
              <span className="text-[#786b62] block">Graduated with Academic Distinction</span>
              <span className="text-[#995511] font-mono text-[11px] mt-1 block">2019 — 2023</span>
            </div>
            <div className="p-3.5 rounded-xl border border-[#eee6dc] bg-[#fdfbf9]">
              <span className="font-bold text-[#1c1613] block">Certified Mobile Application Architect</span>
              <span className="text-[#786b62] block">Advanced Cross-Platform & Native Systems</span>
              <span className="text-[#995511] font-mono text-[11px] mt-1 block">Credentialed 2024</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto py-8 text-center text-xs font-mono text-[#a39487] print:hidden">
        © 2026 Jirayu Kokhoon (จิรายุ โกคูณ) · Available for High-Impact Full-Stack & Mobile Roles · Bangkok, Thailand
      </footer>
    </div>
  );
}
