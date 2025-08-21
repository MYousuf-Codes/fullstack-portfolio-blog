"use client";
import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  const mainLinks = ["Home", "Projects", "Services", "Tutorials", "Blog", "About", "Contact"];
  const tutorialCategories = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "Python",
    "React",
    "Next.js",
    "Node.js",
  ];

  const getLink = (item: string) => (item === "Home" ? "/" : `/${item.toLowerCase()}`);

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 py-16 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand and Description */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              MYousaf-Codes
            </Link>
            <p className="text-gray-400 text-sm">
              Building elegant solutions to complex problems with modern web technologies and best practices.
            </p>
            <div className="flex space-x-4 pt-2">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://github.com/myousuf-codes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaGithub size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://linkedin.com/in/myousuf-codes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaLinkedin size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="mailto:yousufhere.dev@gmail.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaEnvelope size={20} />
              </motion.a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Navigation</h3>
            <ul className="space-y-2">
              {mainLinks.map((item) => (
                <li key={item}>
                  <Link
                    href={getLink(item)}
                    className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tutorials */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Tutorials</h3>
            <ul className="space-y-2">
              {tutorialCategories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/tutorials`}
                    className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Get in Touch
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Latest Articles
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} MYousaf-Codes. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap.xml" className="hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;