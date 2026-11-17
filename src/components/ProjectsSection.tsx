import Image from "next/image";

export default function ProjectsSection() {
  const projects = [
    {
      index: "01",
      role: "Full-Stack & Cloud Architecture",
      year: "2026",
      titleLine1: "OmniFit",
      titleLine2: "Ecosystem",
      description:
        "A comprehensive health and nutrition ecosystem combining computer vision on mobile with a resilient real-time cloud backend, engineered with offline-first local synchronization.",
      image: "/images/project1.jpg",
      link: "https://example.com",
    },
    {
      index: "02",
      role: "Mobile App Development",
      year: "2024",
      titleLine1: "PulsePay",
      titleLine2: "Wallet",
      description:
        "High-security contactless merchant wallet for iOS & Android with biometric authentication, dynamic QR generation, and real-time transaction processing.",
      image: "/images/project2.jpg",
      link: "https://example.com",
    },
  ];

  return (
    <section id="projects" className="relative py-28 sm:py-36 px-6 sm:px-12 max-w-7xl mx-auto border-t border-zinc-200">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-baseline justify-between mb-16 sm:mb-24 gap-4">
        <h2 className="font-humane text-6xl sm:text-8xl md:text-[10rem] leading-[0.8] text-black tracking-[-0.02em]">
          Featured Work
        </h2>
        <span className="font-mono text-xs sm:text-sm text-zinc-400">
          [Scroll to explore more]
        </span>
      </div>

      {/* Projects List */}
      <div className="space-y-32 sm:space-y-44">
        {projects.map((project) => (
          <article key={project.index} className="group flex flex-col gap-8">
            {/* Meta bar */}
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4 font-montreal text-xs sm:text-sm text-zinc-500">
              <span className="font-medium text-black">({project.index})</span>
              <div className="flex items-center gap-6">
                <span>{project.role}</span>
                <span className="font-mono">{project.year}</span>
              </div>
            </div>

            {/* Giant Title in Humane Font */}
            <h3 className="font-humane text-7xl sm:text-9xl md:text-[11rem] leading-[0.8] text-black group-hover:text-zinc-600 transition-colors tracking-[-0.02em]">
              <div>{project.titleLine1}</div>
              <div>{project.titleLine2}</div>
            </h3>

            {/* Project Image */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-zinc-100 shadow-sm">
              <Image
                src={project.image}
                alt={`${project.titleLine1} ${project.titleLine2}`}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Bottom description & link */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 font-montreal pt-2">
              <p className="max-w-xl text-base sm:text-lg text-zinc-600 leading-relaxed">
                {project.description}
              </p>
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-black uppercase tracking-wider hover:opacity-60 transition-opacity"
              >
                <span>View Project</span>
                <span>→</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
