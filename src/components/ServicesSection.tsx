"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ServicesSection() {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const services = [
    {
      title: "Mobile Development",
      hint: "← click me",
      items: "iOS & Android  ·  React Native  ·  Flutter  ·  Offline Sync  ·  Native Integrations",
    },
    {
      title: "Full-Stack Web",
      hint: "click me →",
      items: "Next.js & React  ·  TypeScript  ·  Node.js / NestJS  ·  PostgreSQL  ·  Scalable APIs",
    },
    {
      title: "Systems & Architecture",
      hint: "← click me",
      items: "Requirements Discovery  ·  Edge-case Analysis  ·  Clean Code  ·  Docker & CI/CD",
    },
    {
      title: "Creative Engineering",
      hint: "click me →",
      items: "Interactive UI  ·  Three.js & WebGL  ·  Framer Motion  ·  Micro-interactions",
    },
  ];

  return (
    <section id="services" className="relative py-28 sm:py-36 px-6 sm:px-12 max-w-7xl mx-auto border-t border-zinc-200">
      {/* Label */}
      <div className="mb-12">
        <span className="font-montreal text-sm text-zinc-500 font-medium">
          (Services)
        </span>
      </div>

      {/* Services List in Humane Font */}
      <div className="divide-y divide-zinc-200 border-y border-zinc-200 mb-24">
        {services.map((service, idx) => {
          const isOpen = activeItem === idx;
          return (
            <div
              key={idx}
              onClick={() => setActiveItem(isOpen ? null : idx)}
              className="group cursor-pointer py-6 sm:py-8 transition-colors hover:bg-zinc-50/50"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-humane text-5xl sm:text-7xl md:text-8xl leading-[0.8] text-black group-hover:text-zinc-500 transition-colors uppercase tracking-[-0.01em]">
                  {service.title}
                </h3>
                <div className="flex items-center gap-3 font-mono text-xs sm:text-sm text-zinc-400 group-hover:text-black transition-colors">
                  <span>( {isOpen ? "−" : "+"} )</span>
                  <span className="hidden sm:inline">{service.hint}</span>
                </div>
              </div>

              {/* Expandable details */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden pt-4"
                  >
                    <p className="font-montreal text-base sm:text-lg text-zinc-600 font-medium">
                      {service.items}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Creator Manifesto Sub-statement */}
      <div className="max-w-4xl font-montreal text-base sm:text-xl md:text-2xl text-zinc-600 leading-relaxed space-y-6">
        <p>
          I&rsquo;m not a founder, a CEO, or a strategist hiding behind a title. I&rsquo;m an engineer and builder. Someone who designs, codes, and thinks in equal measure, and uses that to walk products through every stage of their lifecycle, from the first clarified requirement on a blank page to the moment a high-performance system goes live.
        </p>
        <p>
          I&rsquo;m not here to chase transient trends or pile on unnecessary deliverables. I&rsquo;m here to build with relentless dedication and deliver digital products that truly perform.
        </p>
      </div>
    </section>
  );
}
