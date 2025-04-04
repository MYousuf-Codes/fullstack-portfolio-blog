"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Menu, 
  X, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Code2,
  Bot,
  LineChart,
  FileText,
  Users,
  Home,
  FolderGit2,
  Server,
  BookOpen,
  MessageCircle,
  Info,
  LayoutDashboard,
  Zap,
  Globe
} from "lucide-react";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";
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
  <Link
    href={href}
    className={classNames(
      "relative text-[15px] font-medium text-gray-800 dark:text-gray-100 transition hover:text-blue-600 dark:hover:text-blue-400",
      active && "text-blue-600 dark:text-blue-400"
    )}
  >
    {title}
    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
  </Link>
);

interface DropdownItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  active?: boolean;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  href,
  icon,
  title,
  description,
  active,
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
    className="p-0"
  >
    <Link href={href}>
      <div className="group relative flex items-center gap-4 p-4 rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl transition-all hover:shadow-lg">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
          {icon}
        </div>
        <div>
          <p className="font-semibold text-gray-800 dark:text-gray-100">{title}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
        {/* Neon animated border */}
        <div className="absolute inset-0 rounded-md pointer-events-none border border-transparent group-hover:border bg-gradient-to-r from-neon-blue to-indigo-500 animate-[borderFlow_2s_linear_infinite]" />
      </div>
    </Link>
  </motion.div>
);

// Modified HoverDropdown component with right-aligned positioning
interface HoverDropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
}

const HoverDropdown: React.FC<HoverDropdownProps> = ({ trigger, children, align = 'right' }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="relative">
        {trigger}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} mt-2 z-50`}
            style={{ maxWidth: "95vw", width: "40rem" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Header: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("All");

  const [mobileBlogOpen, setMobileBlogOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

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

  const mainLinks = [
    { name: "Home", icon: <Home size={18} /> },
    { name: "Projects", icon: <FolderGit2 size={18} /> },
    { name: "Services", icon: <Server size={18} /> },
    { name: "Tutorials", icon: <BookOpen size={18} /> },
    { name: "Blog", icon: <FileText size={18} /> },
    { name: "About", icon: <Info size={18} /> },
    { name: "Contact", icon: <MessageCircle size={18} /> },
  ];
  
  const getLink = (name: string) =>
    name === "Home" ? "/" : `/${name.toLowerCase()}`;

  const nextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  // Animation variants for menu items
  const dropdownVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: 10,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 }
  };

  // Service items - now in two columns
  const serviceItemsColumn1 = [
    {
      href: "/services",
      icon: <LayoutDashboard size={20} />,
      title: "Our Services",
      description: "Overview of all services",
      active: pathname === "/services"
    },
    {
      href: "/services/web-development",
      icon: <Code2 size={20} />,
      title: "Web Development",
      description: "Custom web solutions",
      active: pathname === "/services/web-development"
    },
  ];
  
  const serviceItemsColumn2 = [
    {
      href: "/services/ai-chatbot-development",
      icon: <Bot size={20} />,
      title: "AI Chatbots",
      description: "Intelligent assistants",
      active: pathname === "/services/ai-chatbot-development"
    },
    {
      href: "/services/seo-performance-optimization",
      icon: <LineChart size={20} />,
      title: "SEO Optimization",
      description: "Improve ranking and speed",
      active: pathname === "/services/seo-performance-optimization"
    }
  ];

  // Blog items - now in two columns
  const blogItemsColumn1 = [
    {
      href: "/blog",
      icon: <FileText size={20} />,
      title: "Blog",
      description: "Latest articles and insights",
      active: pathname === "/blog"
    },
    {
      href: "/authors",
      icon: <Users size={20} />,
      title: "Authors",
      description: "Meet our contributors",
      active: pathname === "/authors"
    }
  ];
  
  const blogItemsColumn2 = [
    {
      href: "/blog/categories",
      icon: <Globe size={20} />,
      title: "Categories",
      description: "Browse by topic",
      active: pathname === "/blog/categories"
    },
    {
      href: "/blog/featured",
      icon: <Zap size={20} />,
      title: "Featured",
      description: "Most popular content",
      active: pathname === "/blog/featured"
    }
  ];

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 bg-white/70 dark:bg-gray-950/80 backdrop-blur-xl shadow-md"
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
        <nav className="hidden md:flex md:flex-1 justify-end" aria-label="Main Navigation">
          <ul className="flex justify-end items-center space-x-6">
            {mainLinks.map((item) => {
              if (item.name === "Blog") {
                return (
                  <li key="Blog" className="relative">
                    <HoverDropdown
                      trigger={
                        <div className="flex items-center px-3 py-2 text-[15px] font-medium text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                          {item.name}
                          <ChevronDown className="w-4 h-4 ml-1 transition-transform duration-250" />
                        </div>
                      }
                      align="right"
                    >
                      <motion.div 
                        className="w-full rounded-lg p-4 shadow-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200 dark:border-gray-700"
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* First Column */}
                          <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Main</h3>
                            {blogItemsColumn1.map((blogItem, index) => (
                              <motion.div key={index} variants={itemVariants}>
                                <DropdownItem
                                  href={blogItem.href}
                                  icon={blogItem.icon}
                                  title={blogItem.title}
                                  description={blogItem.description}
                                  active={blogItem.active}
                                />
                              </motion.div>
                            ))}
                          </div>
                          
                          {/* Second Column */}
                          <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Explore</h3>
                            {blogItemsColumn2.map((blogItem, index) => (
                              <motion.div key={index} variants={itemVariants}>
                                <DropdownItem
                                  href={blogItem.href}
                                  icon={blogItem.icon}
                                  title={blogItem.title}
                                  description={blogItem.description}
                                  active={blogItem.active}
                                />
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </HoverDropdown>
                  </li>
                );
              }

              if (item.name === "Services") {
                return (
                  <li key="Services" className="relative">
                    <HoverDropdown
                      trigger={
                        <div className="flex items-center px-3 py-2 text-[15px] font-medium text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                          {item.name}
                          <ChevronDown className="w-4 h-4 ml-1 transition-transform duration-250" />
                        </div>
                      }
                      align="right"
                    >
                      <motion.div 
                        className="w-full rounded-lg p-4 shadow-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200 dark:border-gray-700"
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* First Column */}
                          <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Core Services</h3>
                            {serviceItemsColumn1.map((serviceItem, index) => (
                              <motion.div key={index} variants={itemVariants}>
                                <DropdownItem
                                  href={serviceItem.href}
                                  icon={serviceItem.icon}
                                  title={serviceItem.title}
                                  description={serviceItem.description}
                                  active={serviceItem.active}
                                />
                              </motion.div>
                            ))}
                          </div>
                          
                          {/* Second Column */}
                          <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Specialized Services</h3>
                            {serviceItemsColumn2.map((serviceItem, index) => (
                              <motion.div key={index} variants={itemVariants}>
                                <DropdownItem
                                  href={serviceItem.href}
                                  icon={serviceItem.icon}
                                  title={serviceItem.title}
                                  description={serviceItem.description}
                                  active={serviceItem.active}
                                />
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </HoverDropdown>
                  </li>
                );
              }
              return (
                <li key={item.name}>
                  <NavLink
                    href={getLink(item.name)}
                    title={item.name}
                    active={pathname === getLink(item.name)}
                  />
                </li>
              );
            })}
          </ul>
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
              className="bg-white dark:bg-gray-900 overflow-y-auto max-h-screen"
              aria-describedby="sheet-description"
            >
              <SheetTitle className="dark:text-white">Navigation Menu</SheetTitle>
              <SheetDescription className="dark:text-white" id="sheet-description">
                Access main navigation links and website sections
              </SheetDescription>
              <nav aria-label="Mobile Navigation" className="mt-6">
                <ul className="flex flex-col items-start space-y-4 py-4">
                  {mainLinks.map((item) => {
                    if (item.name === "Blog") {
                      return (
                        <li key={item.name} className="w-full">
                          <button
                            onClick={() => setMobileBlogOpen(!mobileBlogOpen)}
                            className="flex items-center gap-2 text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition w-full"
                            aria-expanded={mobileBlogOpen}
                          >
                            {item.icon}
                            {item.name}
                            <ChevronDown
                              className={classNames(
                                "w-4 h-4 transition-transform ml-auto",
                                mobileBlogOpen && "rotate-180"
                              )}
                            />
                          </button>
                          <AnimatePresence>
                            {mobileBlogOpen && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden mt-2 w-full border border-gray-200 dark:border-gray-700 rounded-md p-4"
                              >
                                <div className="space-y-6">
                                  {/* First Mobile Column */}
                                  <div>
                                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Main</h3>
                                    <div className="space-y-3">
                                      {blogItemsColumn1.map((blogItem, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                          <div className="w-6 h-6 text-blue-600 dark:text-blue-400">
                                            {blogItem.icon}
                                          </div>
                                          <SheetClose asChild>
                                            <Link
                                              href={blogItem.href}
                                              className="block text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition"
                                            >
                                              {blogItem.title}
                                            </Link>
                                          </SheetClose>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  {/* Second Mobile Column */}
                                  <div>
                                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Explore</h3>
                                    <div className="space-y-3">
                                      {blogItemsColumn2.map((blogItem, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                          <div className="w-6 h-6 text-blue-600 dark:text-blue-400">
                                            {blogItem.icon}
                                          </div>
                                          <SheetClose asChild>
                                            <Link
                                              href={blogItem.href}
                                              className="block text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition"
                                            >
                                              {blogItem.title}
                                            </Link>
                                          </SheetClose>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </li>
                      );
                    }
                    if (item.name === "Services") {
                      return (
                        <li key={item.name} className="w-full">
                          <button
                            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                            className="flex items-center gap-2 text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition w-full"
                            aria-expanded={mobileServicesOpen}
                          >
                            {item.icon}
                            {item.name}
                            <ChevronDown
                              className={classNames(
                                "w-4 h-4 transition-transform ml-auto",
                                mobileServicesOpen && "rotate-180"
                              )}
                            />
                          </button>
                          <AnimatePresence>
                            {mobileServicesOpen && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden mt-2 w-full border border-gray-200 dark:border-gray-700 rounded-md p-4"
                              >
                                <div className="space-y-6">
                                  {/* First Mobile Column */}
                                  <div>
                                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Core Services</h3>
                                    <div className="space-y-3">
                                      {serviceItemsColumn1.map((serviceItem, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                          <div className="w-6 h-6 text-blue-600 dark:text-blue-400">
                                            {serviceItem.icon}
                                          </div>
                                          <SheetClose asChild>
                                            <Link
                                              href={serviceItem.href}
                                              className="block text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition"
                                            >
                                              {serviceItem.title}
                                            </Link>
                                          </SheetClose>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  {/* Second Mobile Column */}
                                  <div>
                                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Specialized Services</h3>
                                    <div className="space-y-3">
                                      {serviceItemsColumn2.map((serviceItem, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                          <div className="w-6 h-6 text-blue-600 dark:text-blue-400">
                                            {serviceItem.icon}
                                          </div>
                                          <SheetClose asChild>
                                            <Link
                                              href={serviceItem.href}
                                              className="block text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition"
                                            >
                                              {serviceItem.title}
                                            </Link>
                                          </SheetClose>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </li>
                      );
                    }
                    return (
                      <li key={item.name} className="w-full">
                        <SheetClose asChild>
                          <Link
                            href={getLink(item.name)}
                            className="flex items-center gap-2 text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition"
                          >
                            {item.icon}
                            {item.name}
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

      {pathname === "/tutorials" && (
        <nav className="bg-gray-100 dark:bg-gray-800 py-2 px-2" aria-label="Tutorial Categories">
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
              <ChevronLeft className="w-5 h-5 text-gray-800 dark:text-gray-100" />
            </button>
            <ul className="flex justify-center space-x-2 sm:space-x-4 overflow-x-auto px-2 scrollbar-hide">
              {paginatedCategories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => setActiveTab(category)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                      activeTab === category
                        ? "bg-blue-600 text-white"
                        : "text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
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
              <ChevronRight className="w-5 h-5 text-gray-800 dark:text-gray-100" />
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;