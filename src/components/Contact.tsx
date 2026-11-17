"use client";

import { useState } from "react";
import { Mail, Copy, Check, ArrowUpRight } from "lucide-react";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "jirayu.dev@example.com"; // User can easily customize this

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="relative py-28 px-6 border-t border-zinc-900 bg-zinc-950/80">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Tag */}
        <span className="text-xs font-mono tracking-widest text-blue-400 uppercase mb-4">
          // 04. GET IN TOUCH
        </span>

        {/* Big CTA */}
        <h2 className="text-3xl sm:text-6xl font-bold tracking-tight text-zinc-100 max-w-2xl leading-tight mb-6">
          Ready to build next-level Web & Mobile products?
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base max-w-xl mb-10 font-normal">
          ไม่ว่าจะเป็นการร่วมงานในตำแหน่ง Full-Stack / Mobile Engineer, โปรเจกต์ใหม่, หรือต้องการแลกเปลี่ยนความคิดเห็น ยินดีพูดคุยเสมอครับ
        </p>

        {/* Interactive Email Copy Pill */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40"
          >
            <Mail className="w-4 h-4" />
            <span>Send Email</span>
          </a>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-300 font-mono text-xs transition-all hover:text-white"
            title="Copy email address"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-zinc-400" />
                <span>{email}</span>
              </>
            )}
          </button>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6 text-sm text-zinc-400 font-mono mb-16">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 text-zinc-600" />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3 h-3 text-zinc-600" />
          </a>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="w-full pt-8 border-t border-zinc-900/80 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-600 gap-4">
          <span>© 2026 Jirayu. Built with Next.js, Three.js & Tailwind CSS.</span>
          <span>Designed with inspiration from Awwwards</span>
        </div>
      </div>
    </footer>
  );
}
