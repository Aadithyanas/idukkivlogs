import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Techodep Edutech LLP — Empowering Minds. Building the Future.",
  description:
    "A Kerala-based educational technology company. Robotics innovation, 3D printing services, student engineering projects, and startup lab.",
  keywords: [
    "Techodep Edutech",
    "Edutech Kerala",
    "Robotics",
    "3D printing",
    "Arduino",
    "IoT",
    "startup lab",
    "innovation",
    "engineering",
  ],
  openGraph: {
    title: "Techodep Edutech LLP — Empowering Minds. Building the Future.",
    description:
      "Educational technology, robotics innovation, 3D printing & startup culture from the heart of Kerala.",
    type: "website",
  },
};

import WhatsAppFloatingBtn from "@/components/ui/WhatsAppFloatingBtn";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      </head>
      <body>
        {children}
        <WhatsAppFloatingBtn />
      </body>
    </html>
  );
}
