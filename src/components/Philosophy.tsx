"use client";

import { motion } from "framer-motion";
import { HelpCircle, Flame, Layers, CheckCircle2 } from "lucide-react";

export default function Philosophy() {
  const principles = [
    {
      icon: HelpCircle,
      tag: "CORE MINDSET",
      title: "Ask First, Code Later",
      desc: "ไม่ด่วนสรุปโจทย์ แต่เริ่มต้นด้วยการตั้งคำถามและเคลียร์ Functional & Non-functional Requirements ให้ชัดเจนกับทีมและผู้ใช้ เพื่อสร้างสิ่งที่ตอบโจทย์จริงและลดเวลาแก้ไขโค้ดซ้ำซ้อนในภายหลัง",
      metrics: "Zero Assumption • Crystal Clear Scope",
    },
    {
      icon: Flame,
      tag: "WORK ETHIC",
      title: "Growth & Relentless Dedication",
      desc: "มีความกระหายในการเรียนรู้เครื่องมือ สถาปัตยกรรม และ Best Practices ใหม่ๆ อยู่เสมอ ทุ่มเทเต็มที่กับทุกชิ้นงาน ใส่ใจในรายละเอียดทั้งความเร็ว ความปลอดภัย และความเสถียร",
      metrics: "Continuous Learner • High Ownership",
    },
    {
      icon: Layers,
      tag: "HARD SKILLS",
      title: "Cross-Platform Synergy (App + Web)",
      desc: "มองเห็นภาพรวมของระบบแบบ End-to-End ไม่ว่าจะสลับระหว่างการพัฒนา Mobile App (iOS / Android) ที่เน้น UX ลื่นไหล หรือ Web Platforms ที่เน้นสถาปัตยกรรมและ Cloud Backend",
      metrics: "Full-Stack • Mobile Native/Hybrid",
    },
  ];

  return (
    <section id="about" className="relative py-28 px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="mb-16">
        <span className="text-xs font-mono tracking-widest text-blue-400 uppercase">
          // 01. PHILOSOPHY & MINDSET
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-100 mt-2">
          How I Think & Build.
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-xl mt-3 font-normal">
          การเขียนโค้ดเป็นเพียงขั้นตอนสุดท้าย สิ่งที่สร้างความแตกต่างคือวิธีคิด การสื่อสาร และความรับผิดชอบต่อผลลัพธ์
        </p>
      </div>

      {/* Grid of Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {principles.map((p, idx) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group relative p-7 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 hover:border-blue-500/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
                    {p.tag}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-zinc-100 mb-3 group-hover:text-blue-300 transition-colors">
                  {p.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-normal">
                  {p.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-900 flex items-center gap-2 text-xs font-mono text-zinc-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400/80" />
                <span>{p.metrics}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
