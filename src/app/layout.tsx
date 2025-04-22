import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";



export const metadata: Metadata = {
  title: "MYousuf Codes | Full-Stack Developer & Tech Blogger",
  description:
    "Welcome to MYousuf Codes — a portfolio and blog by a professional full-stack web developer. Explore expert insights on web development, programming tutorials, and projects built with Next.js, React, Tailwind CSS, and Sanity. Let's build the web, one line of code at a time.",
  icons: {
    icon: [
      { rel: "icon", type: "image/x-icon", url: "/favicon.ico" }, // Standard Favicon
      { rel: "icon", type: "image/png", sizes: "16x16", url: "/favicon-16x16.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", url: "/favicon-32x32.png" },
      { rel: "apple-touch-icon", sizes: "180x180", url: "/apple-touch-icon.png" }, // iOS Devices
      { rel: "icon", type: "image/png", sizes: "192x192", url: "/android-chrome-192x192.png" }, // Android
      { rel: "icon", type: "image/png", sizes: "512x512", url: "/android-chrome-512x512.png" }, // Large Android Icon
    ],
    other: [
      { rel: "manifest", url: "/site.webmanifest" }, // Web Manifest for PWA
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`antialiased bg-background text-foreground`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
