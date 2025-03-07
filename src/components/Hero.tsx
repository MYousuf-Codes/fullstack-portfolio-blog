"use client";
import React from "react";
import Image from "next/image";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { FaArrowRight } from "react-icons/fa";

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
    <span className="text-blue-400 font-bold"> {/* Typewriter Text Color */}
      {tech}
      <Cursor cursorColor="#fff" />
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
    <span className="text-blue-400 font-bold"> {/* Typewriter Text Color */}
      {db}
      <Cursor cursorColor="#ffff" />
    </span>
  );
};

const Hero: React.FC = () => {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center px-6 md:px-16 bg-gray-900 text-white mt-10 md:mt-16  ">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Section */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            Welcome to <span className="text-blue-500">MYousuf-Codes</span>
          </h1>
          <h2 className="text-2xl text-gray-300">
            I specialize in <TechTypewriter />
          </h2>
          <h2 className="text-2xl text-gray-300">
            I use database systems including <DBTypewriter />
          </h2>
          <p className="text-lg text-gray-400">
            I am a Full Stack Developer specializing in Next.js, API Development, and modern web technologies.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center gap-2 transition">
              Get in Touch <FaArrowRight />
            </button>
            <button className="px-6 py-3 border border-gray-500 hover:bg-gray-800 text-white rounded-md transition">
              Explore Blogs
            </button>
          </div>
        </div>

        {/* Right Section (Hidden on Mobile) */}
        <div className="hidden md:flex justify-center">
          <Image
            src="/images/profile.png"
            alt="Muhammad Yousuf"
            width={400}
            height={400}
            className="rounded-lg shadow-lg"
            priority
          />
        </div>
      </div>
    </main>
  );
};

export default Hero;
