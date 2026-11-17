export default function AboutSection() {
  return (
    <section id="about" className="relative py-28 sm:py-40 px-6 sm:px-12 max-w-7xl mx-auto border-t border-zinc-200">
      {/* Number Index */}
      <div className="mb-6">
        <span className="font-montreal text-sm text-zinc-500 font-medium">
          (01)
        </span>
      </div>

      {/* Massive Title in Humane */}
      <div className="mb-12 sm:mb-16">
        <h2 className="font-humane text-7xl sm:text-9xl md:text-[13rem] leading-[0.8] text-black tracking-[-0.02em]">
          About
        </h2>
      </div>

      {/* Editorial Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16 font-montreal">
        <p className="text-xl sm:text-2xl md:text-3xl font-medium leading-snug text-black tracking-tight">
          I design and develop digital experiences with a focus on craft, motion, and systems — creating interfaces where every detail is intentional and robust.
        </p>

        <div className="space-y-6 text-base sm:text-lg text-zinc-600 font-normal leading-relaxed">
          <p>
            Based in Bangkok, I work at the intersection of full-stack engineering and mobile product development. From concept to code, I bring ideas to life with meticulous attention to detail.
          </p>
          <p>
            Driven by an <strong className="text-black font-semibold">&ldquo;Ask First, Code Later&rdquo;</strong> mindset, I prioritize understanding the core problem and clarifying requirements with stakeholders before writing code. This eliminates rework and ensures the end product is resilient, scalable, and purposeful.
          </p>
        </div>
      </div>
    </section>
  );
}
