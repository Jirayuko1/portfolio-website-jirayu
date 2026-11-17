export default function FooterSection() {
  const email = "jirayu.dev@example.com";

  return (
    <footer id="contact" className="relative pt-28 sm:pt-40 pb-12 px-6 sm:px-12 max-w-7xl mx-auto border-t border-zinc-200">
      <div className="flex flex-col mb-24 sm:mb-32">
        {/* Intro prompt */}
        <p className="font-montreal text-base sm:text-xl text-zinc-500 mb-8 max-w-xl">
          For enquiries, collaboration requests, or engineering roles, don’t hesitate to reach out!
        </p>

        {/* Giant Get in Touch Heading */}
        <a
          href={`mailto:${email}`}
          className="group inline-block"
        >
          <h2 className="font-humane text-7xl sm:text-9xl md:text-[13rem] leading-[0.8] text-black group-hover:text-zinc-600 transition-colors tracking-[-0.02em]">
            Get in touch
          </h2>
        </a>

        {/* Contact links */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12 mt-12 font-montreal">
          <a
            href={`mailto:${email}`}
            className="text-lg sm:text-2xl text-black hover:opacity-60 transition-opacity border-b border-black pb-1"
          >
            {email}
          </a>
          <span className="text-sm sm:text-base text-zinc-400 font-mono">
            Bangkok, Thailand (GMT+7)
          </span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-8 border-t border-zinc-200 font-montreal text-xs text-zinc-500 gap-4">
        <span>© 2026 Jirayu</span>

        <nav className="flex items-center gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-black transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-black transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-black transition-colors"
          >
            Instagram
          </a>
        </nav>

        <span>Designed & Developed with craft</span>
      </div>
    </footer>
  );
}
