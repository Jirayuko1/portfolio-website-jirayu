"use client";

import { motion } from "framer-motion";
import { Smartphone, Layout, Server, Cpu } from "lucide-react";

export default function TechStack() {
  const stackCategories = [
    {
      title: "Mobile Development",
      icon: Smartphone,
      subtitle: "iOS & Android Cross-platform and Native",
      skills: [
        { name: "React Native / Expo", level: "Advanced" },
        { name: "Flutter / Dart", level: "Proficient" },
        { name: "Offline Sync & Local DB (SQLite, MMKV)", level: "Advanced" },
        { name: "Mobile UI/UX & Native Bridges", level: "Experienced" },
        { name: "App Store & Play Store Deployment", level: "Experienced" },
      ],
    },
    {
      title: "Frontend & Web Experience",
      icon: Layout,
      subtitle: "Modern, Accessible & Interactive Interfaces",
      skills: [
        { name: "Next.js 15 & React 19", level: "Advanced" },
        { name: "TypeScript", level: "Advanced" },
        { name: "Tailwind CSS & Design Systems", level: "Advanced" },
        { name: "Three.js & WebGL Basics", level: "Creative" },
        { name: "Framer Motion & GSAP", level: "Interactive" },
      ],
    },
    {
      title: "Backend & Systems",
      icon: Server,
      subtitle: "Scalable APIs & Resilient Data Architecture",
      skills: [
        { name: "Node.js & NestJS", level: "Advanced" },
        { name: "PostgreSQL & Prisma / Drizzle", level: "Advanced" },
        { name: "Redis Caching & Pub/Sub", level: "Proficient" },
        { name: "RESTful APIs & GraphQL", level: "Advanced" },
        { name: "Docker & Containerization", level: "Experienced" },
      ],
    },
    {
      title: "Engineering Mindset",
      icon: Cpu,
      subtitle: "Standards, Clarification & Delivery",
      skills: [
        { name: "Requirements Discovery & Analysis", level: "Core Strength" },
        { name: "Clean Architecture & Modular Design", level: "Advanced" },
        { name: "Git Workflow & CI/CD Pipelines", level: "Proficient" },
        { name: "Automated Testing (Unit & Integration)", level: "Experienced" },
        { name: "Fast Learner & High Ownership", level: "Always Active" },
      ],
    },
  ];

  return (
    <section id="skills" className="relative py-28 px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="mb-16">
        <span className="text-xs font-mono tracking-widest text-blue-400 uppercase">
          // 03. CAPABILITIES & TECH STACK
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-100 mt-2">
          Engineered for Full-Cycle Delivery.
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-xl mt-3 font-normal">
          ความสามารถทางเทคนิคที่ครอบคลุมตั้งแต่หน้าจอสมาร์ตโฟน เว็บเบราว์เซอร์ ไปจนถึงระบบเซิร์ฟเวอร์บนคลาวด์
        </p>
      </div>

      {/* Grid of 4 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stackCategories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-5">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-zinc-100 mb-1">{cat.title}</h3>
                <p className="text-xs text-zinc-500 mb-6 font-mono leading-relaxed">
                  {cat.subtitle}
                </p>

                <ul className="space-y-3">
                  {cat.skills.map((skill, sIdx) => (
                    <li
                      key={sIdx}
                      className="flex items-center justify-between text-xs py-1.5 border-b border-zinc-900/80 last:border-0"
                    >
                      <span className="text-zinc-300 font-medium">{skill.name}</span>
                      <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800/60">
                        {skill.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
