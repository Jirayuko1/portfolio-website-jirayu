import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume & Credentials",
  description:
    "Curriculum Vitae and technical credentials of Jirayu, Senior Full-Stack & Mobile Developer. Specialized in React Native, Flutter, Next.js, and high-throughput cloud architectures.",
  alternates: {
    canonical: "https://portfolio-website-jirayu.vercel.app/resume",
  },
  openGraph: {
    title: "Jirayu (จิรายุ) · Resume & Engineering Credentials",
    description:
      "Review Jirayu's technical proficiencies, featured engineering projects (OmniFit, Tripsync, PromptVault), work experience, and educational background.",
    url: "https://portfolio-website-jirayu.vercel.app/resume",
    images: [
      {
        url: "/images/office-og.jpg",
        width: 1200,
        height: 630,
        alt: "Jirayu Engineering Resume",
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
