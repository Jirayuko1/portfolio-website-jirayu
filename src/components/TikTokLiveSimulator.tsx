"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, RotateCcw, Zap, Sparkles, MessageCircle, Activity, Award, Volume2, VolumeX } from "lucide-react";
import { sound } from "@/lib/soundEffects";
import { Language } from "@/lib/translations";

interface TikTokLiveSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  emoji?: string;
  alpha: number;
  life: number;
  maxLife: number;
}

interface ChatMessage {
  id: string;
  user: string;
  text: string;
  badge?: string;
  color: string;
}

const SAMPLE_USERS = [
  "Somchai_BKK", "Beam_Developer", "Nonny_Dev", "Golf_Gamer",
  "Ploy_Live", "Krit_Code", "Aom_Design", "Tee_Tech", "Ice_NextJS",
  "Nat_React", "Fah_Frontend", "Top_Backend", "Fern_FullStack"
];

const CHAT_COMMENTS_TH = [
  "ทีมแดงสู้ๆๆ 🌹", "กุหลาบมารัวๆ เลยยย", "ทีมน้ำเงินอย่ายอม 💖", "จัดจรวดไปดิคร้าบบ 🚀",
  "เหรียญทองมาแล้ว 🪙", "ระบบอย่างลื่นเลย", "สตรีมสดชัดแจ๋ว 60fps", "ดันๆๆๆ ให้ชนะ",
  "คอมเมนต์รัวขนาดนี้เซิร์ฟเวอร์ยังไม่หลุด", "WebSocket โคตรไว!"
];

const CHAT_COMMENTS_EN = [
  "Red team let's go! 🌹", "Spamming roses now!", "Blue team fight back 💖", "Rocket combo deployed! 🚀",
  "Golden coins incoming 🪙", "Zero lag on stream!", "60fps buttery smooth", "Push the line guys!",
  "High throughput event stream!", "WebSocket is so fast!"
];

export default function TikTokLiveSimulator({ isOpen, onClose, language }: TikTokLiveSimulatorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Game state
  const [redScore, setRedScore] = useState(50); // 0 to 100
  const [comboCount, setComboCount] = useState(0);
  const [autoSpam, setAutoSpam] = useState(false);
  const [eventsPerSec, setEventsPerSec] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);
  const [winner, setWinner] = useState<"red" | "blue" | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [recentBanner, setRecentBanner] = useState<string | null>(null);

  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const eventCounterRef = useRef<number>(0);
  const bannerTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize starting chat
  useEffect(() => {
    if (!isOpen) return;
    setRedScore(50);
    setWinner(null);
    setComboCount(0);
    setAutoSpam(false);
    setTotalEvents(0);

    const initMsgs: ChatMessage[] = [
      { id: "1", user: "Somchai_BKK", text: language === "th" ? "ยินดีต้อนรับเข้าสู่ Live Arena! 🎮" : "Welcome to the Live Arena! 🎮", color: "#f2b705" },
      { id: "2", user: "Beam_Developer", text: language === "th" ? "ส่งกุหลาบดันทีมแดง ส่งหัวใจดันทีมน้ำเงิน!" : "Send roses for Red, hearts for Blue!", color: "#38bdf8" },
    ];
    setMessages(initMsgs);
  }, [isOpen, language]);

  // Show banner announcement
  const triggerBanner = useCallback((text: string) => {
    setRecentBanner(text);
    if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current);
    bannerTimerRef.current = setTimeout(() => {
      setRecentBanner(null);
    }, 2200);
  }, []);

  // Spawn visual particle on canvas
  const spawnGiftVisual = useCallback((type: "rose" | "heart" | "coin" | "rocket") => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.width;
    const height = canvas.height;

    let emoji = "🌹";
    let color = "#ef4444";
    let startX = width * 0.25;
    let targetVx = (Math.random() * 3 + 2);
    let count = 4;

    if (type === "rose") {
      emoji = "🌹";
      color = "#f43f5e";
      startX = width * 0.2;
      targetVx = Math.random() * 4 + 3;
      count = 5;
    } else if (type === "heart") {
      emoji = "💖";
      color = "#3b82f6";
      startX = width * 0.8;
      targetVx = -(Math.random() * 4 + 3);
      count = 5;
    } else if (type === "coin") {
      emoji = "🪙";
      color = "#f2b705";
      startX = width * 0.5 + (Math.random() - 0.5) * 40;
      targetVx = (Math.random() - 0.5) * 4;
      count = 8;
    } else if (type === "rocket") {
      emoji = "🚀";
      color = "#a855f7";
      startX = width * 0.5;
      targetVx = (Math.random() - 0.5) * 6;
      count = 14;
    }

    for (let i = 0; i < count; i++) {
      particlesRef.current.push({
        id: Math.random(),
        x: startX + (Math.random() - 0.5) * 30,
        y: height * 0.5 + (Math.random() - 0.5) * 40,
        vx: targetVx + (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 4 - 2,
        size: type === "rocket" ? 28 : type === "coin" ? 22 : 18,
        color,
        emoji,
        alpha: 1,
        life: 0,
        maxLife: Math.random() * 40 + 35,
      });
    }
  }, []);

  // Handle gift triggers
  const sendGift = useCallback((type: "rose" | "heart" | "coin" | "rocket", isUser = true) => {
    if (winner) return;

    eventCounterRef.current += 1;
    setTotalEvents((prev) => prev + 1);
    setComboCount((prev) => prev + 1);

    if (isUser) {
      sound.playGiftSound(type);
    }

    spawnGiftVisual(type);

    // Score adjustments
    setRedScore((prev) => {
      let delta = 0;
      if (type === "rose") delta = 1.2;
      else if (type === "heart") delta = -1.2;
      else if (type === "coin") delta = Math.random() > 0.5 ? 4 : -4;
      else if (type === "rocket") delta = Math.random() > 0.5 ? 12 : -12;

      const next = Math.max(0, Math.min(100, prev + delta));
      if (next >= 100) {
        setWinner("red");
        sound.playGameSuccess();
        triggerBanner(language === "th" ? "🎉 ทีมแดง (กุหลาบ) ชนะรอบนี้!" : "🎉 Red Team (Roses) Won!");
      } else if (next <= 0) {
        setWinner("blue");
        sound.playGameSuccess();
        triggerBanner(language === "th" ? "🎉 ทีมน้ำเงิน (หัวใจ) ชนะรอบนี้!" : "🎉 Blue Team (Hearts) Won!");
      }
      return next;
    });

    // Add chat message
    const randomUser = isUser ? (language === "th" ? "คุณ (You)" : "You") : SAMPLE_USERS[Math.floor(Math.random() * SAMPLE_USERS.length)];
    let giftBadge = "";
    if (type === "rose") giftBadge = "🌹 x1";
    else if (type === "heart") giftBadge = "💖 x1";
    else if (type === "coin") giftBadge = "🪙 x5";
    else if (type === "rocket") giftBadge = "🚀 x20";

    const newMsg: ChatMessage = {
      id: Math.random().toString(),
      user: randomUser,
      text: `${language === "th" ? "ส่งของขวัญ" : "sent"} ${giftBadge}`,
      badge: giftBadge,
      color: type === "rose" ? "#f43f5e" : type === "heart" ? "#38bdf8" : type === "coin" ? "#f2b705" : "#c084fc",
    };

    setMessages((prev) => [...prev.slice(-6), newMsg]);
  }, [winner, spawnGiftVisual, language, triggerBanner]);

  // Reset Game
  const handleReset = () => {
    sound.playClick();
    setRedScore(50);
    setWinner(null);
    setComboCount(0);
    particlesRef.current = [];
    triggerBanner(language === "th" ? "🔄 รีเซ็ตสนามแข่ง เริ่มรอบใหม่!" : "🔄 Arena reset! New round!");
  };

  // Auto-simulate high-throughput stream traffic
  useEffect(() => {
    if (!autoSpam || winner || !isOpen) return;

    const interval = setInterval(() => {
      // Simulate random gifts firing at high velocity
      const gifts: ("rose" | "heart" | "coin" | "rocket")[] = [
        "rose", "rose", "rose",
        "heart", "heart", "heart",
        "coin", "coin",
        "rocket"
      ];
      const randomGift = gifts[Math.floor(Math.random() * gifts.length)];
      sendGift(randomGift, false);

      // Random chat comment injection
      if (Math.random() > 0.65) {
        const pool = language === "th" ? CHAT_COMMENTS_TH : CHAT_COMMENTS_EN;
        const comment = pool[Math.floor(Math.random() * pool.length)];
        const user = SAMPLE_USERS[Math.floor(Math.random() * SAMPLE_USERS.length)];
        setMessages((prev) => [
          ...prev.slice(-6),
          {
            id: Math.random().toString(),
            user,
            text: comment,
            color: "#e2e8f0"
          }
        ]);
      }
    }, 95); // ~10-15 bursts per second

    return () => clearInterval(interval);
  }, [autoSpam, winner, isOpen, sendGift, language]);

  // Monitor Events per second telemetry
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setEventsPerSec(eventCounterRef.current);
      eventCounterRef.current = 0;
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Canvas 60fps Game Loop
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = true;

    const render = () => {
      if (!running) return;

      const width = canvas.width;
      const height = canvas.height;

      // 1. Dark Neon Arena Background
      ctx.clearRect(0, 0, width, height);

      // Subtle gradient background
      const grad = ctx.createLinearGradient(0, 0, width, 0);
      grad.addColorStop(0, "rgba(225, 29, 72, 0.12)");
      grad.addColorStop(0.5, "rgba(15, 23, 42, 0.4)");
      grad.addColorStop(1, "rgba(37, 99, 235, 0.12)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. Tug-of-war Center Boundary Line
      const divideX = (redScore / 100) * width;

      // Glowing Center Beam
      ctx.save();
      ctx.shadowColor = redScore > 50 ? "#f43f5e" : "#3b82f6";
      ctx.shadowBlur = 18;
      ctx.strokeStyle = redScore > 50 ? "rgba(244, 63, 94, 0.85)" : "rgba(59, 130, 246, 0.85)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(divideX, 0);
      ctx.lineTo(divideX, height);
      ctx.stroke();
      ctx.restore();

      // Team Labels & Territory markers
      ctx.font = "bold 13px monospace";
      ctx.fillStyle = "rgba(244, 63, 94, 0.8)";
      ctx.fillText(`🔴 RED ${Math.round(redScore)}%`, 14, 24);

      ctx.fillStyle = "rgba(59, 130, 246, 0.8)";
      ctx.textAlign = "right";
      ctx.fillText(`${Math.round(100 - redScore)}% BLUE 🔵`, width - 14, 24);
      ctx.textAlign = "left";

      // 3. Render Particles & Emojis
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.life += 1;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // Gravity
        p.alpha = Math.max(0, 1 - p.life / p.maxLife);

        if (p.life >= p.maxLife || p.y > height + 20) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        if (p.emoji) {
          ctx.font = `${p.size}px sans-serif`;
          ctx.fillText(p.emoji, p.x, p.y);
        } else {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      running = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isOpen, redScore]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-black/85 backdrop-blur-md"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-xl h-[92dvh] max-h-[820px] rounded-3xl bg-[#0f1117] text-white border border-white/15 shadow-2xl flex flex-col overflow-hidden outline-none font-sans"
        >
          {/* 1. TIKTOK LIVE STREAM HEADER */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#161a23] border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-[#ef4444] shadow-md bg-[#2c2019] shrink-0">
                <img
                  src="/images/portrait-tarot.webp?v=5"
                  alt="Jirayu Streamer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs sm:text-sm text-white">Jirayu Kokhoon</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-[#ef4444] text-[9px] font-bold text-white uppercase tracking-wider animate-pulse">
                    LIVE
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#94a3b8]">
                  @jirayu.dev · {language === "th" ? "1.4k ผู้ชม" : "1.4k viewers"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                title={language === "th" ? "รีเซ็ตเกม" : "Reset game"}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onClose}
                aria-label="Close simulator"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 2. REAL-TIME TELEMETRY STATS HUD (Technical Architecture Badge) */}
          <div className="bg-[#1e2430]/90 px-3 py-1.5 border-b border-white/5 flex items-center justify-between text-[10px] font-mono text-[#94a3b8] shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-ping" />
              <span className="text-[#22c55e] font-semibold">WebSocket: 12ms</span>
              <span className="text-white/30">•</span>
              <span>Events: <strong className="text-white">{eventsPerSec}/s</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#f2b705] font-semibold">60 FPS</span>
              <span className="text-white/30">•</span>
              <span>Total: <strong className="text-[#38bdf8]">{totalEvents}</strong></span>
            </div>
          </div>

          {/* 3. INTERACTIVE BATTLE CANVAS (GAME ARENA) */}
          <div className="relative flex-1 bg-black overflow-hidden flex flex-col justify-between">
            {/* Top Score Meter Bar */}
            <div className="absolute top-2 left-4 right-4 z-20">
              <div className="w-full h-3 rounded-full bg-white/15 overflow-hidden flex shadow-inner border border-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#e11d48] to-[#f43f5e]"
                  animate={{ width: `${redScore}%` }}
                  transition={{ duration: 0.15 }}
                />
                <motion.div
                  className="h-full bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8]"
                  animate={{ width: `${100 - redScore}%` }}
                  transition={{ duration: 0.15 }}
                />
              </div>
            </div>

            {/* Banner Announcement Popups */}
            <AnimatePresence>
              {recentBanner && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  className="absolute top-8 left-1/2 -translate-x-1/2 z-30 px-4 py-1.5 rounded-full bg-[#f2b705] text-[#140e0b] font-bold text-xs shadow-2xl tracking-wide whitespace-nowrap border border-white/40"
                >
                  {recentBanner}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Victory Overlay if game ended */}
            {winner && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/75 backdrop-blur-sm p-4 text-center">
                <span className="text-4xl mb-2">{winner === "red" ? "🌹🏆" : "💖🏆"}</span>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {winner === "red"
                    ? (language === "th" ? "ทีมแดง (กุหลาบ) ได้รับชัยชนะ!" : "RED TEAM (ROSES) WON!")
                    : (language === "th" ? "ทีมน้ำเงิน (หัวใจ) ได้รับชัยชนะ!" : "BLUE TEAM (HEARTS) WON!")}
                </h3>
                <p className="text-xs text-[#94a3b8] mb-4">
                  {language === "th"
                    ? `ประมวลผลสำเร็จ ${totalEvents} Events ความหน่วง < 15ms`
                    : `Processed ${totalEvents} Real-Time Events with <15ms Latency`}
                </p>
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-xl bg-[#f2b705] hover:bg-[#fbbf24] text-[#140e0b] font-bold text-xs font-mono shadow-xl transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{language === "th" ? "เล่นรอบใหม่ (Play Again)" : "Play Again"}</span>
                </button>
              </div>
            )}

            {/* 60fps Physics Canvas */}
            <canvas
              ref={canvasRef}
              width={540}
              height={380}
              className="w-full h-full object-cover"
            />

            {/* Floating Live Chat Overlay (TikTok Style on Bottom Left) */}
            <div className="absolute bottom-3 left-3 z-20 max-w-[65%] pointer-events-none space-y-1.5">
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, x: -16, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs shadow-md"
                >
                  <span className="font-bold text-[11px]" style={{ color: m.color }}>
                    {m.user}:
                  </span>
                  <span className="text-white text-[11px] truncate max-w-[180px]">
                    {m.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 4. INTERACTIVE VIEWER CONTROLS DECK (BOTTOM DECK) */}
          <div className="p-3 sm:p-4 bg-[#161a23] border-t border-white/10 shrink-0 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#94a3b8] font-mono text-[11px]">
                {language === "th" ? "🎮 แตะส่งของขวัญเพื่อร่วมเล่นเกม:" : "🎮 Tap gifts to trigger game mechanics:"}
              </span>

              {/* High-throughput Auto-Spam Toggle */}
              <button
                onClick={() => setAutoSpam((prev) => !prev)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  autoSpam
                    ? "bg-[#ef4444] text-white animate-pulse shadow-md"
                    : "bg-white/10 text-[#94a3b8] hover:text-white"
                }`}
              >
                <Zap className="w-3 h-3" />
                <span>{autoSpam ? (language === "th" ? "บอทรัวไลฟ์: เปิดอยู่" : "Auto-Spam: ON") : (language === "th" ? "จำลองคนดูรัวไลฟ์" : "Simulate Heavy Load")}</span>
              </button>
            </div>

            {/* 4 Interactive Gift Buttons */}
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => sendGift("rose")}
                disabled={winner !== null}
                className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-b from-[#e11d48]/20 to-[#e11d48]/40 hover:from-[#e11d48]/30 hover:to-[#e11d48]/50 border border-[#e11d48]/50 flex flex-col items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer disabled:opacity-40"
              >
                <span className="text-xl sm:text-2xl">🌹</span>
                <span className="text-[10px] font-bold text-white font-mono">{language === "th" ? "กุหลาบ" : "Rose"}</span>
                <span className="text-[9px] text-[#f43f5e] font-mono font-semibold">+1 Red</span>
              </button>

              <button
                onClick={() => sendGift("heart")}
                disabled={winner !== null}
                className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-b from-[#2563eb]/20 to-[#2563eb]/40 hover:from-[#2563eb]/30 hover:to-[#2563eb]/50 border border-[#2563eb]/50 flex flex-col items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer disabled:opacity-40"
              >
                <span className="text-xl sm:text-2xl">💖</span>
                <span className="text-[10px] font-bold text-white font-mono">{language === "th" ? "หัวใจ" : "Heart"}</span>
                <span className="text-[9px] text-[#38bdf8] font-mono font-semibold">+1 Blue</span>
              </button>

              <button
                onClick={() => sendGift("coin")}
                disabled={winner !== null}
                className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-b from-[#ca8a04]/20 to-[#ca8a04]/40 hover:from-[#ca8a04]/30 hover:to-[#ca8a04]/50 border border-[#ca8a04]/50 flex flex-col items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer disabled:opacity-40"
              >
                <span className="text-xl sm:text-2xl">🪙</span>
                <span className="text-[10px] font-bold text-white font-mono">{language === "th" ? "เหรียญ" : "Coins"}</span>
                <span className="text-[9px] text-[#f2b705] font-mono font-semibold">+5 Strike</span>
              </button>

              <button
                onClick={() => sendGift("rocket")}
                disabled={winner !== null}
                className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-b from-[#9333ea]/20 to-[#9333ea]/40 hover:from-[#9333ea]/30 hover:to-[#9333ea]/50 border border-[#9333ea]/50 flex flex-col items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer disabled:opacity-40"
              >
                <span className="text-xl sm:text-2xl">🚀</span>
                <span className="text-[10px] font-bold text-white font-mono">{language === "th" ? "จรวด" : "Rocket"}</span>
                <span className="text-[9px] text-[#c084fc] font-mono font-semibold">+20 Mega</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
