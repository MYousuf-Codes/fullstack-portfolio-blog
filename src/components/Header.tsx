"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

interface NavLinkProps {
  href: string;
  title: string;
  active?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, title, active }) => (
  <NavigationMenu.Link asChild>
    <Link
      href={href}
      className={classNames(
        "relative text-[15px] font-medium text-gray-700 dark:text-gray-300 transition hover:text-blue-600 dark:hover:text-blue-400 text-center",
        active && "text-blue-600 dark:text-blue-400"
      )}
    >
      {title}
      <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </Link>
  </NavigationMenu.Link>
);

const Header: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("All");

  // Mobile dropdown states for Blog and Services
  const [mobileBlogDropdownOpen, setMobileBlogDropdownOpen] = useState(false);
  const [mobileServicesDropdownOpen, setMobileServicesDropdownOpen] = useState(false);

  // Tutorials pagination state (if on /tutorials)
  const [currentPage, setCurrentPage] = useState(0);
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
  const itemsPerPage = 4;
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const paginatedCategories = categories.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Main navigation links
  const mainLinks = ["Home", "Projects", "Services", "Tutorials", "Blog", "About", "Contact"];
  const getLink = (item: string) => (item === "Home" ? "/" : `/${item.toLowerCase()}`);

  const nextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
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

        {/* Desktop Navigation using Radix NavigationMenu */}
        <nav className="hidden md:block flex-1">
          <NavigationMenu.Root>
            <NavigationMenu.List className="flex justify-end items-center space-x-10">
              {mainLinks.map((item) => {
                // Blog dropdown (with Blog & Authors)
                if (item === "Blog") {
                  return (
                    <NavigationMenu.Item key={item}>
                      <NavigationMenu.Trigger
                        className="group flex items-center gap-1 rounded px-3 py-2 text-[15px] font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-blue-400"
                      >
                        {item}
                        <ChevronDown
                          className="w-4 h-4 transition-transform duration-250 group-data-[state=open]:-rotate-180"
                          aria-hidden
                        />
                      </NavigationMenu.Trigger>
                      <NavigationMenu.Content className="absolute top-full mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-10">
                        <ul className="p-2">
                          <li>
                            <NavLink href="/blog" title="Blog" active={pathname === "/blog"} />
                          </li>
                          <li className="mt-1">
                            <NavLink href="/authors" title="Authors" active={pathname === "/authors"} />
                          </li>
                        </ul>
                      </NavigationMenu.Content>
                    </NavigationMenu.Item>
                  );
                }

                // Services dropdown (with multiple service links)
                if (item === "Services") {
                  return (
                    <NavigationMenu.Item key={item}>
                      <NavigationMenu.Trigger
                        className="group flex items-center gap-1 rounded px-3 py-2 text-[15px] font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-blue-400"
                      >
                        {item}
                        <ChevronDown
                          className="w-4 h-4 transition-transform duration-250 group-data-[state=open]:-rotate-180"
                          aria-hidden
                        />
                      </NavigationMenu.Trigger>
                      <NavigationMenu.Content className="absolute top-full mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-10">
                        <ul className="p-2">
                          <li>
                            <NavLink
                              href="/services"
                              title="Services"
                              active={pathname === "/services"}
                            />
                          </li>
                          <li className="mt-1">
                            <NavLink
                              href="/services/web-development"
                              title="Full-Stack Web Development"
                              active={pathname === "/services/web-development"}
                            />
                          </li>
                          <li className="mt-1">
                            <NavLink
                              href="/services/ai-chatbot-develpoment"
                              title="AI Chatbot Development"
                              active={pathname === "/services/ai-chatbot-development"}
                            />
                          </li>
                        </ul>
                      </NavigationMenu.Content>
                    </NavigationMenu.Item>
                  );
                }

                // Default link
                return (
                  <NavigationMenu.Item key={item}>
                    <NavLink href={getLink(item)} title={item} active={pathname === getLink(item)} />
                  </NavigationMenu.Item>
                );
              })}
              <NavigationMenu.Indicator className="top-full z-10 flex h-2.5 items-end justify-center overflow-hidden transition-[width,transform_250ms_ease] data-[state=hidden]:animate-fadeOut data-[state=visible]:animate-fadeIn">
                <div className="relative top-[70%] w-2.5 h-2.5 rotate-45 rounded-tl-sm bg-blue-600" />
              </NavigationMenu.Indicator>
            </NavigationMenu.List>
          </NavigationMenu.Root>
        </nav>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2" aria-label="Open mobile navigation">
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
              <nav aria-label="Mobile Navigation" className="mt-6">
                <ul className="flex flex-col items-center space-y-4 py-4">
                  {mainLinks.map((item) => {
                    if (item === "Blog") {
                      return (
                        <li key={item} className="w-full flex flex-col items-center">
                          <button
                            onClick={() => setMobileBlogDropdownOpen(!mobileBlogDropdownOpen)}
                            className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                            aria-expanded={mobileBlogDropdownOpen}
                          >
                            {item}
                            <ChevronDown
                              className={classNames(
                                "w-4 h-4 transition-transform",
                                mobileBlogDropdownOpen && "rotate-180"
                              )}
                            />
                          </button>
                          {mobileBlogDropdownOpen && (
                            <div className="mt-2 w-full border border-gray-200 dark:border-gray-700 rounded-md p-4">
                              <SheetClose asChild>
                                <Link
                                  href="/blog"
                                  className="block w-full text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                                >
                                  Blog
                                </Link>
                              </SheetClose>
                              <SheetClose asChild>
                                <Link
                                  href="/authors"
                                  className="block w-full mt-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                                >
                                  Authors
                                </Link>
                              </SheetClose>
                            </div>
                          )}
                        </li>
                      );
                    }
                    if (item === "Services") {
                      return (
                        <li key={item} className="w-full flex flex-col items-center">
                          <button
                            onClick={() =>
                              setMobileServicesDropdownOpen(!mobileServicesDropdownOpen)
                            }
                            className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                            aria-expanded={mobileServicesDropdownOpen}
                          >
                            {item}
                            <ChevronDown
                              className={classNames(
                                "w-4 h-4 transition-transform",
                                mobileServicesDropdownOpen && "rotate-180"
                              )}
                            />
                          </button>
                          {mobileServicesDropdownOpen && (
                            <div className="mt-2 w-full border border-gray-200 dark:border-gray-700 rounded-md p-4">
                              <SheetClose asChild>
                                <Link
                                  href="/services"
                                  className="block w-full text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                                >
                                  Services
                                </Link>
                              </SheetClose>
                              <SheetClose asChild>
                                <Link
                                  href="/services/web-development"
                                  className="block w-full mt-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                                >
                                  Full-Stack Web Development
                                </Link>
                              </SheetClose>
                              <SheetClose asChild>
                                <Link
                                  href="/services/ai-chatbot-develpoment"
                                  className="block w-full mt-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                                >
                                  AI Chatbot Development
                                </Link>
                              </SheetClose>
                            </div>
                          )}
                        </li>
                      );
                    }
                    return (
                      <li key={item} className="w-full">
                        <SheetClose asChild>
                          <Link
                            href={getLink(item)}
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition text-center block"
                          >
                            {item}
                          </Link>
                        </SheetClose>
                      </li>
                    );
                  })}
                </ul>
              </nav>
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

      {/* Tutorials Categories Navigation */}
      {pathname === "/tutorials" && (
        <nav
          className="bg-gray-100 dark:bg-gray-800 py-2 px-2"
          aria-label="Tutorial Categories"
        >
          <div className="flex justify-between items-center px-2 sm:px-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className={`p-2 rounded-full ${
                currentPage === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              aria-label="Previous categories"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            <ul className="flex justify-center space-x-2 sm:space-x-4">
              {paginatedCategories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => setActiveTab(category)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${
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
            <button
              onClick={nextPage}
              disabled={currentPage >= totalPages - 1}
              className={`p-2 rounded-full ${
                currentPage >= totalPages - 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              aria-label="Next categories"
            >
              <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
