import {
  Geist,
  Geist_Mono,
  Plus_Jakarta_Sans,
  Instrument_Serif,
  Playfair_Display,
} from "next/font/google";

import "./globals.css";
import { Navbar } from "@/components/Navbar";
import MaybeFooter from "@/components/MaybeFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export const metadata = {
  title: "Singkat Sajak",
  description:
    "Sebuah komunitas jurnalis yang berkarya melalui tulisan-tulisan mengenai alam, kearifan lokal, politik, sosial, ekonomi, dan teknologi.",
};

export default function RootLayout({ children }) {
  return (
    <html className="scroll-smooth" lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${plusJakartaSans.variable} ${instrumentSerif.variable} ${playfairDisplay.variable} antialiased`}
      >
        <Navbar />
        {children}
        <MaybeFooter />
      </body>
    </html>
  );
}
