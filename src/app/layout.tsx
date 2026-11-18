import type { Metadata } from "next";
import { Playfair_Display, Caveat, Karla, Pinyon_Script } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-website-jirayu.vercel.app"),
  title: "Jirayu · Senior Full-Stack & Mobile Developer",
  description:
    "Welcome to my office. Click around and explore my shelf, case studies, engineering philosophy and a little about me.",
  openGraph: {
    title: "Jirayu · Senior Full-Stack & Mobile Developer",
    description: "Welcome to my office. Click the things on my shelf to explore my work, my cases and a little about me.",
    images: ["/images/office-og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${caveat.variable} ${karla.variable} ${pinyon.variable} antialiased`}
      style={{ background: "#2e2620" }}
    >
      <body className="bg-[#2e2620] text-[#f4ebdc] font-sans antialiased overflow-hidden w-screen h-screen select-none">
        {children}
      </body>
    </html>
  );
}
