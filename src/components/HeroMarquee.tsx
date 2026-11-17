"use client";

import Image from "next/image";

export default function HeroMarquee() {
  const line1 = [
    "Full-Stack developer",
    "Full-Stack developer",
    "Full-Stack developer",
    "Full-Stack developer",
  ];

  const line2 = [
    "Mobile Developer",
    "Mobile Developer",
    "Mobile Developer",
    "Mobile Developer",
  ];

  const line3 = [
    "Creative Engineer",
    "Creative Engineer",
    "Creative Engineer",
    "Creative Engineer",
  ];

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-white select-none pt-24 pb-16">
      {/* 3-Row Infinite Marquee */}
      <div className="flex flex-col justify-center w-full space-y-[-1vw] md:space-y-[-1.5vw] overflow-hidden">
        {/* Row 1: Left */}
        <div className="overflow-hidden flex">
          <div className="animate-marquee-left flex items-center whitespace-nowrap">
            {line1.concat(line1).map((text, idx) => (
              <span
                key={idx}
                className="font-humane text-[17vw] leading-[0.8] tracking-[-0.02em] text-black pr-[3vw] inline-block uppercase"
              >
                {text}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2: Right */}
        <div className="overflow-hidden flex">
          <div className="animate-marquee-right flex items-center whitespace-nowrap">
            {line2.concat(line2).map((text, idx) => (
              <span
                key={idx}
                className="font-humane text-[17vw] leading-[0.8] tracking-[-0.02em] text-black pr-[3vw] inline-block uppercase"
              >
                {text}
              </span>
            ))}
          </div>
        </div>

        {/* Row 3: Left */}
        <div className="overflow-hidden flex">
          <div className="animate-marquee-left flex items-center whitespace-nowrap">
            {line3.concat(line3).map((text, idx) => (
              <span
                key={idx}
                className="font-humane text-[17vw] leading-[0.8] tracking-[-0.02em] text-black pr-[3vw] inline-block uppercase"
              >
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Center Portrait (Exact Russell Numo styling) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
        <div className="relative w-[220px] h-[280px] sm:w-[280px] sm:h-[360px] md:w-[350px] md:h-[450px] shadow-2xl overflow-hidden bg-zinc-200">
          <Image
            src="/images/portrait.webp"
            alt="Jirayu Portrait"
            fill
            sizes="(max-width: 992px) 280px, 350px"
            priority
            className="object-cover grayscale contrast-110 hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
      </div>

      {/* Bottom Metadata */}
      <div className="absolute bottom-8 left-0 right-0 px-6 sm:px-12 flex items-center justify-between font-montreal text-xs sm:text-sm text-zinc-500 z-30 pointer-events-none">
        <span className="capitalize">based in bangkok</span>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Open to work</span>
        </div>
      </div>
    </section>
  );
}
