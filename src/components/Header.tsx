"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const pathname = usePathname();

  const mainLinks = ["Home", "Blog", "News", "About", "Contact"];
  const categories = ["HTML", "CSS", "TypeScript", "Python", "React", "Next.js"];

  return (
    <header
      className="bg-white dark:bg-gray-900 shadow-md fixed w-full top-0 left-0 z-50"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Go to homepage"
          className="text-2xl font-bold text-gray-900 dark:text-white"
        >
          MyBlog
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex" aria-label="Main Navigation">
          <ul className="flex space-x-6">
            {mainLinks.map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Theme Toggle Button */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-800"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="text-yellow-500" />
          ) : (
            <Moon className="text-gray-700" />
          )}
        </button>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
          aria-label="Toggle mobile navigation"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-gray-900 dark:text-white" />
          ) : (
            <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav
          className="md:hidden bg-white dark:bg-gray-900"
          aria-label="Mobile Navigation"
        >
          <ul className="flex flex-col items-center space-y-4 py-4">
            {mainLinks.map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Blog Tab Navigation – visible only on the Blog page */}
      {pathname === "/" && (
        <nav
          className="bg-gray-100 dark:bg-gray-800 py-2"
          aria-label="Blog Categories"
        >
          <ul className="flex justify-center space-x-4 overflow-x-auto px-4">
            {categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => setActiveTab(category)}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    activeTab === category
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
