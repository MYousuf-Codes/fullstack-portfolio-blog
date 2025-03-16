"use client";
import React from "react";
import Image from "next/image";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { FaArrowRight, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

// Typewriter component for coding technologies
const TechTypewriter: React.FC = () => {
  const [tech] = useTypewriter({
    words: ["React.js", "Next.js", "FastAPI", "Flask", "Django"],
    loop: 0,
    typeSpeed: 120,
    deleteSpeed: 80,
    delaySpeed: 2000,
  });

  return (
    <span className="text-primary font-bold">
      {tech}
      <Cursor cursorColor="#6366f1" />
    </span>
  );
};

// Typewriter component for databases
const DBTypewriter: React.FC = () => {
  const [db] = useTypewriter({
    words: ["PostgreSQL", "MySQL", "SQLite", "MongoDB", "Firebase"],
    loop: 0,
    typeSpeed: 120,
    deleteSpeed: 80,
    delaySpeed: 2000,
  });

  return (
    <span className="text-primary font-bold">
      {db}
      <Cursor cursorColor="#6366f1" />
    </span>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="w-full min-h-screen py-32 px-4 max-w-6xl mx-auto">

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Section - Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6 text-center lg:text-left"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              MYousaf-Codes
            </span>
          </h1>

          <h2 className="text-xl sm:text-2xl text-slate-700">
            I specialize in <TechTypewriter />
          </h2>

          <h2 className="text-xl sm:text-2xl text-slate-700">
            I use database systems including <DBTypewriter />
          </h2>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0">
            I am a Full Stack Developer specializing in Next.js, API Development, and modern web technologies. Building elegant solutions to complex problems.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start mt-8">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center gap-2 transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 font-medium"
              >
                Get in Touch <FaArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>

            <Link href="/blog">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg font-medium"
              >
                Explore Blogs
              </motion.button>
            </Link>

            <Link href="https://github.com/myousuf-codes" target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
              >
                <FaGithub className="text-lg" /> GitHub
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Right Section - Image (Hidden on Mobile) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden md:flex justify-center items-center"
        >
          <div className="relative w-full max-w-sm mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur-xl opacity-20"></div>
            <div className="relative bg-white p-1.5 rounded-xl shadow-lg">
              <center>
                <Image
                  src="/images/profile.png"
                  alt="Muhammad Yousuf"
                  width={350}
                  height={350}
                  className="rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </center>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
