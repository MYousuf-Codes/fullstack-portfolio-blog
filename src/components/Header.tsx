"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetTitle,
  SheetDescription
} from "@/components/ui/sheet";

const Header: React.FC = () => {
  // Declare hooks unconditionally at the top
  const [activeTab, setActiveTab] = useState("All");
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // Pagination hook
  const [blogDropdownOpen, setBlogDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const blogDropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Now conditionally render as all hooks are declared
  if (!mounted) {
    return null;
  }

  const mainLinks = ["Home", "Tutorials", "Blog", "About", "Contact"];
  const categories = [
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

  // Pagination logic for categories
  const itemsPerPage = 4; // Number of categories per page on mobile
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const paginatedCategories = categories.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-md"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Go to homepage"
          className="text-3xl font-bold text-indigo-800 dark:text-white"
        >
          MYousaf-Codes
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex" aria-label="Main Navigation">
          <ul className="flex space-x-6">
            {mainLinks.map((item) => {
              if (item === "Blog") {
                return (
                  <li
                    key={item}
                    className="relative group"
                    ref={blogDropdownRef}
                    onMouseEnter={() => setBlogDropdownOpen(true)}
                    onMouseLeave={() => setBlogDropdownOpen(false)}
                  >
                    <Link
                      href="/blog"
                      className={`text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition ${pathname.startsWith("/blog") || pathname.startsWith("/authors")
                          ? "text-blue-600 dark:text-blue-400"
                          : ""
                        }`}
                    >
                      {item}
                    </Link>

                    {/* Dropdown Menu */}
                    <div
                      className={`absolute top-full left-0 mt-1 w-36 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 transition-opacity duration-200 ${blogDropdownOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                    >
                      <Link
                        href="/blog"
                        className={`block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition ${pathname === "/blog" ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"
                          }`}
                      >
                        Blog
                      </Link>
                      <Link
                        href="/authors"
                        className={`block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition ${pathname === "/authors" ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"
                          }`}
                      >
                        Authors
                      </Link>
                    </div>
                  </li>
                );
              }

              return (
                <li key={item}>
                  <Link
                    href={getLink(item)}
                    className={`text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition ${pathname === getLink(item) ? "text-blue-600 dark:text-blue-400" : ""
                      }`}
                  >
                    {item}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center space-x-4">
          {/* Mobile Menu Trigger using Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden" aria-label="Open mobile navigation">
                <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-white dark:bg-gray-900"
              aria-describedby="sheet-description"
            >
              <SheetTitle>Navigation Menu</SheetTitle>
              <SheetDescription id="sheet-description">
                Access main navigation links and website sections
              </SheetDescription>

              {/* Mobile Menu */}
              <nav aria-label="Mobile Navigation" className="mt-6">
                <ul className="flex flex-col items-center space-y-4 py-4">
                  {mainLinks.map((item) => {
                    if (item === "Blog") {
                      return (
                        <li key={item} className="w-full flex flex-col items-center">
                          <div className="flex flex-col items-center w-full">
                            <button
                              onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                              className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                              aria-expanded={mobileDropdownOpen}
                            >
                              {item}
                              <ChevronRight className={`w-4 h-4 transition-transform ${mobileDropdownOpen ? 'rotate-90' : ''}`} />
                            </button>

                            {/* Mobile Dropdown */}
                            {mobileDropdownOpen && (
                              <div className="mt-2 w-full flex flex-col items-center space-y-2 py-2 border-t border-b border-gray-200 dark:border-gray-700">
                                <SheetClose asChild>
                                  <Link
                                    href="/blog"
                                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                                  >
                                    Blog
                                  </Link>
                                </SheetClose>
                                <SheetClose asChild>
                                  <Link
                                    href="/authors"
                                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                                  >
                                    Authors
                                  </Link>
                                </SheetClose>
                              </div>
                            )}
                          </div>
                        </li>
                      );
                    }

                    return (
                      <li key={item}>
                        <SheetClose asChild>
                          <Link
                            href={getLink(item)}
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                          >
                            {item}
                          </Link>
                        </SheetClose>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Close Button */}
              <div className="absolute top-4 right-4">
                <SheetClose asChild>
                  <button aria-label="Close mobile navigation">
                    <X className="w-6 h-6 text-gray-900 dark:text-white" />
                  </button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Tutorials Tab Navigation (Responsive with Pagination) */}
      {pathname === "/tutorials" && (
        <nav className="bg-gray-100 dark:bg-gray-800 py-2 px-2" aria-label="Tutorial Categories">
          <div className="flex justify-between items-center px-2 sm:px-4">
            {/* Previous Button */}
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className={`p-2 rounded-full ${currentPage === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              aria-label="Previous categories"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>

            {/* Categories List */}
            <ul className="flex justify-center space-x-2 sm:space-x-4">
              {paginatedCategories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => setActiveTab(category)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === category
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>

            {/* Next Button */}
            <button
              onClick={nextPage}
              disabled={currentPage >= totalPages - 1}
              className={`p-2 rounded-full ${currentPage >= totalPages - 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              aria-label="Next categories"
            >
              <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </nav>
      )}
      <script id="messenger-widget-b" src="https://cdn.botpenguin.com/website-bot.js" defer>67e5bd3121bc133d303222e6,67e5bc9a844d562ef61f629e</script>
    </header>
  );
};

export default Header;
