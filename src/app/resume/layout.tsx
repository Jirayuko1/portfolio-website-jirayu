import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume & Credentials — Jirayu Kokhoon",
  description:
    "Curriculum Vitae and technical credentials of Jirayu Kokhoon (จิรายุ โกคูณ), Full-Stack & Mobile Developer. Specialized in React Native, Flutter, Next.js, and high-throughput cloud architectures.",
  alternates: {
    canonical: "https://portfolio-website-jirayu.vercel.app/resume",
  },
  openGraph: {
    title: "Jirayu Kokhoon (จิรายุ โกคูณ) · Resume & Engineering Credentials",
    description:
      "Review Jirayu Kokhoon's technical proficiencies, featured engineering projects (ARENA LIVE, Aura Mobile App, Pobsuk, Voice-Bot-Bella), work experience, and educational background.",
    url: "https://portfolio-website-jirayu.vercel.app/resume",
    images: [
      {
        url: "/images/jirayu-og.jpg",
        width: 1200,
        height: 630,
        alt: "Jirayu Kokhoon Engineering Resume",
      },
    ],
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
