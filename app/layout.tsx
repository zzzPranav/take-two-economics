import type { Metadata } from "next";
import { Fraunces, Newsreader, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Take-Two and the eighty-dollar copy",
  description:
    "An economics research memo on Take-Two Interactive, Grand Theft Auto V, and the pricing of Grand Theft Auto VI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${newsreader.variable} ${fraunces.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
