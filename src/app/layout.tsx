import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MYousuf Codes | Full-Stack Developer & Tech Blogger",
  description: "Welcome to MYousuf Codes — a portfolio and blog by a professional full-stack web developer. Explore expert insights on web development, programming tutorials, and projects built with Next.js, React, Tailwind CSS, and Sanity. Lets build the web, one line of code at a time."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Header />
        {children}
        <script
          id="messenger-widget-b"
          src="https://cdn.botpenguin.com/website-bot.js"
          defer>67e5bd3121bc133d303222e6,67e5bc9a844d562ef61f629e
        </script>

        <Footer />
      </body>
    </html>
  );
}
