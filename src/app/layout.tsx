import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/ChatBot";

export const metadata: Metadata = {
  title: "MYousaf Codes | Full-Stack | Agentic AI | Developer & Blogger",
  description:
    "Welcome to MYousaf Codes — a portfolio and blog by a professional full-stack web developer. Explore expert insights on web development, programming tutorials, and projects built with Next.js, React, Tailwind CSS, and Sanity. Let's build the web, one line of code at a time.",
  verification: {
    google: "s9faGWURF6VDwYE3r0NexHCUTcie24oCK_9SY2ARfxM",
  },
  icons: {
    icon: [
      { rel: "icon", type: "image/x-icon", url: "/favicon.ico" },
      { rel: "icon", type: "image/png", sizes: "16x16", url: "/favicon-16x16.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", url: "/favicon-32x32.png" },
      { rel: "apple-touch-icon", sizes: "180x180", url: "/apple-icon.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", url: "/android-chrome-192x192.png" },
      { rel: "icon", type: "image/png", sizes: "512x512", url: "/android-chrome-512x512.png" },
    ],
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2BVREWWW6C"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2BVREWWW6C');
          `}
        </Script>
      </head>
      <body className="antialiased bg-background text-foreground">
        <Header />
        {children}
        <Chatbot />
        <Footer />
      </body>
    </html>
  );
}
