"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Smartphone, Globe, ArrowUpRight } from "lucide-react";

type ProjectCategory = "all" | "mobile" | "web";

interface Project {
  id: string;
  title: string;
  category: "mobile" | "web";
  categoryLabel: string;
  subtitle: string;
  description: string;
  requirementsSolved: string;
  tags: string[];
  metrics: string;
  githubUrl?: string;
  liveUrl?: string;
}

export default function Projects() {
  const [filter, setFilter] = useState<ProjectCategory>("all");

  const projects: Project[] = [
    {
      id: "1",
      title: "OmniFit — AI Fitness & Nutrition Tracker",
      category: "mobile",
      categoryLabel: "Mobile App (iOS & Android)",
      subtitle: "Cross-platform mobile application with offline-first synchronization",
      description: "แอปพลิเคชันเพื่อสุขภาพที่ผสาน Computer Vision ในการนับ Reps และจัดการโภชนาการแบบเรียลไทม์ รองรับการทำงานแบบออฟไลน์และซิงก์ข้อมูลอัตโนมัติเมื่อต่ออินเทอร์เน็ต",
      requirementsSolved: "เคลียร์โจทย์ Data Persistence และ Battery Optimization บนมือถือ โดยออกแบบ Local SQLite sync engine ที่ใช้แบตเตอรี่ลดลง 35%",
      tags: ["React Native", "TypeScript", "Node.js", "SQLite", "TensorFlow Lite"],
      metrics: "4.8★ App Store • 50k+ Active Users",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
    {
      id: "2",
      title: "NexFlow — Cloud Logistics & Fleet Dashboard",
      category: "web",
      categoryLabel: "Full-Stack Web Platform",
      subtitle: "High-throughput real-time telemetry and supply chain dispatch system",
      description: "ระบบบริหารจัดการกองยานพาหนะและคลังสินค้าแบบ Real-time แสดงผลพิกัด GPS อัตโนมัติผ่าน WebSockets พร้อมระบบวิเคราะห์ความคุ้มค่าของเส้นทางขนส่ง",
      requirementsSolved: "ตั้งคำถามและคุยกับ Operator หน้างานจนพบปัญหาคอขวด นำไปสู่การปรับปรุง Real-time Message Broker ให้รับโหลดได้ 10,000+ events/sec",
      tags: ["Next.js", "NestJS", "PostgreSQL", "Redis", "Kafka", "Docker"],
      metrics: "Sub-50ms Latency • 99.99% Uptime",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
    {
      id: "3",
      title: "PulsePay — Contactless Merchant Wallet",
      category: "mobile",
      categoryLabel: "Mobile Fintech App",
      subtitle: "Secure biometric authentication & micro-transaction payment gateway",
      description: "แอปกระเป๋าเงินดิจิทัลสำหรับร้านค้าย่อย รองรับ Dynamic QR Code, การยืนยันตัวตนด้วย Face/Touch ID และการออกใบเสร็จรับเงินแบบเรียลไทม์",
      requirementsSolved: "เคลียร์มาตรการความปลอดภัยและ Compliance PCI-DSS ตั้งแต่ช่วงวางแผนสเปก ป้องกันช่องโหว่ Token Expire และ Replay Attack ได้สมบูรณ์",
      tags: ["Flutter", "Dart", "Go", "PostgreSQL", "mTLS", "Biometrics"],
      metrics: "0.2s Transaction Time • Zero Fraud Incident",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
    {
      id: "4",
      title: "DevPulse — Collaborative Developer Workspace",
      category: "web",
      categoryLabel: "Full-Stack Web Platform",
      subtitle: "Multiplayer workspace with interactive canvas and live code execution",
      description: "แพลตฟอร์มสำหรับทีมวิศวกรซอฟต์แวร์ในการทำ Architecture Design และ Code Review ร่วมกันบน Infinite Canvas พร้อม Runner รันโค้ดใน Sandbox",
      requirementsSolved: "ออกแบบ CRDTs (Conflict-free Replicated Data Types) เพื่อให้ทีมแก้ไขข้อมูลบนหน้าจอพร้อมกันได้อย่างไร้รอยต่อโดยไม่มีปัญหา Data Conflict",
      tags: ["React", "TypeScript", "FastAPI", "WebAssembly", "Tailwind CSS"],
      metrics: "Zero Conflict Sync • 120 FPS Rendering",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
  ];

  const filteredProjects = projects.filter((p) => {
    if (filter === "all") return true;
    return p.category === filter;
  });

  return (
    <section id="projects" className="relative py-28 px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <span className="text-xs font-mono tracking-widest text-blue-400 uppercase">
            // 02. SELECTED WORKS
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-100 mt-2">
            Engineered with Purpose.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-lg mt-3 font-normal">
            คัดเลือกผลงานที่สะท้อนทั้งความสามารถทาง Mobile Apps, Web Architecture และการแก้ปัญหาตามโจทย์จริง
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-zinc-950 border border-zinc-800 self-start md:self-auto">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              filter === "all"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            All Works
          </button>
          <button
            onClick={() => setFilter("mobile")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              filter === "mobile"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
          <button
            onClick={() => setFilter("web")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              filter === "web"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Web Platform</span>
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="group relative flex flex-col justify-between p-8 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-zinc-700 backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/5"
            >
              <div>
                {/* Category & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-blue-400">
                    {project.category === "mobile" ? (
                      <Smartphone className="w-3.5 h-3.5" />
                    ) : (
                      <Globe className="w-3.5 h-3.5" />
                    )}
                    {project.categoryLabel}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">
                    {project.metrics}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-zinc-100 group-hover:text-blue-300 transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-zinc-400 mb-4">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm text-zinc-300 leading-relaxed mb-6 font-normal">
                  {project.description}
                </p>

                {/* Requirement Clarified Highlight */}
                <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60 mb-6">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1">
                    <span>★ Key Requirement Solved</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-normal">
                    {project.requirementsSolved}
                  </p>
                </div>
              </div>

              {/* Tags & Action links */}
              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-zinc-900 text-zinc-400 border border-zinc-800/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 hover:text-white transition-colors group/link"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover/link:text-blue-400 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-500 hover:text-zinc-300 transition-colors"
                      title="Source Code"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
