import type { Metadata, Viewport } from "next";
import {
  Playfair_Display,
  Caveat,
  Karla,
  Pinyon_Script,
  IBM_Plex_Sans_Thai,
} from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const pinyon = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

// Unified Modern Thai Typography: IBM Plex Sans Thai (Ultra-clean, modern, non-cluttered, high-legibility)
const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  variable: "--font-thai",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://portfolio-website-jirayu.vercel.app";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#baa792" },
    { media: "(prefers-color-scheme: dark)", color: "#2e2620" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jirayu Kokhoon (จิรายุ โกคูณ) · Full-Stack & Mobile Developer",
    template: "%s | Jirayu Kokhoon Portfolio",
  },
  description:
    "Explore Jirayu Kokhoon's interactive 3D studio office. Full-Stack & Mobile Developer specializing in React Native, Flutter, Next.js, Node.js, and interactive 3D WebGL experiences with an 'Ask First, Code Later' engineering philosophy.",
  keywords: [
    "Jirayu Kokhoon",
    "จิรายุ โกคูณ",
    "Jirayu",
    "จิรายุ",
    "Full-Stack Developer",
    "Mobile Developer",
    "React Native",
    "Flutter",
    "Next.js",
    "Node.js",
    "Three.js",
    "WebGL",
    "TypeScript",
    "iOS Developer",
    "Android Developer",
    "Software Engineer Thailand",
    "Bangkok Developer",
    "Interactive Portfolio",
  ],
  authors: [{ name: "Jirayu Kokhoon", url: siteUrl }],
  creator: "Jirayu Kokhoon",
  publisher: "Jirayu Kokhoon",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "th-TH": `${siteUrl}?lang=th`,
      "en-US": `${siteUrl}?lang=en`,
    },
  },
  openGraph: {
    type: "profile",
    firstName: "Jirayu",
    lastName: "Kokhoon",
    username: "Jirayuko1",
    locale: "th_TH",
    alternateLocale: ["en_US"],
    url: siteUrl,
    siteName: "Jirayu Kokhoon · Full-Stack & Mobile Developer",
    title: "Jirayu Kokhoon (จิรายุ โกคูณ) · Full-Stack & Mobile Developer",
    description:
      "Step into Jirayu Kokhoon's interactive 3D workspace. Explore mobile apps, high-throughput cloud architectures, and interactive 3D case studies.",
    images: [
      {
        url: "/images/office-og.jpg",
        width: 1200,
        height: 630,
        alt: "Jirayu Kokhoon's Interactive 3D Studio Desk Portfolio",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jirayu Kokhoon (จิรายุ โกคูณ) · Full-Stack & Mobile Developer",
    description:
      "Step into Jirayu Kokhoon's interactive 3D workspace. Explore mobile apps, high-throughput cloud architectures, and interactive 3D case studies.",
    images: ["/images/office-og.jpg"],
    creator: "@jirayu_dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdPerson = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jirayu Kokhoon (จิรายุ โกคูณ)",
    alternateName: ["Jirayu Kokhoon", "จิรายุ โกคูณ", "Jirayu"],
    jobTitle: "Full-Stack & Mobile Developer",
    url: siteUrl,
    email: "mailto:jirayukokhoon@gmail.com",
    image: `${siteUrl}/images/portrait-tarot.webp`,
    sameAs: [
      "https://github.com/Jirayuko1",
      "https://www.linkedin.com/in/jirayu-kokhoon-883796390/",
      "https://portfolio-website-jirayu.vercel.app",
    ],
    knowsAbout: [
      "Mobile Application Development",
      "React Native",
      "Flutter",
      "Next.js & React 19",
      "TypeScript",
      "Three.js & WebGL",
      "Node.js & Go",
      "Cloud Architecture & Serverless",
      "Web Audio API",
      "UI/UX Design Systems",
    ],
    description:
      "Full-Stack & Mobile Developer with an 'Ask First, Code Later' engineering mindset. Specialized in cross-platform mobile apps, cloud backends, and creative 3D web experiences.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bangkok",
      addressCountry: "TH",
    },
  };

  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Jirayu Kokhoon Portfolio",
    url: siteUrl,
    description:
      "Interactive 3D studio office portfolio of Jirayu, showcasing full-stack web and mobile engineering work.",
    inLanguage: ["th-TH", "en-US"],
    author: {
      "@type": "Person",
      name: "Jirayu",
    },
  };

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${caveat.variable} ${karla.variable} ${pinyon.variable} ${ibmPlexSansThai.variable} antialiased`}
      style={{ background: "#2e2620" }}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
      </head>
      <body className="bg-[#2e2620] text-[#f4ebdc] font-sans antialiased min-h-[100dvh] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
