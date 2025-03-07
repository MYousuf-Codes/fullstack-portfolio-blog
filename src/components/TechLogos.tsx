"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";

// Define technology logos
const techLogos = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", alt: "HTML5" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", alt: "CSS3" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", alt: "JavaScript" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", alt: "TypeScript" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", alt: "React" },
  { 
    src: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg", 
    alt: "Next.js",
    isNextJS: true, // Special flag for Next.js logo size
  },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", alt: "Tailwind CSS" },
];

const TechLogos: React.FC = () => {
  const controls = useAnimation();
  const scrollingLogos = [...techLogos, ...techLogos, ...techLogos];

  useEffect(() => {
    controls.start({
      x: "-50%",
      transition: {
        ease: "linear",
        duration: 16,
        repeat: Infinity,
      },
    });
  }, [controls]);

  return (
    <div className="relative w-full bg-gray-800 py-4 sm:py-6 overflow-hidden flex items-center">
      <div className="w-11/12 lg:w-4/5 mx-auto overflow-hidden relative">
        <motion.div
          className="flex gap-6 sm:gap-8 md:gap-12"
          animate={controls}
          onMouseEnter={() => controls.stop()}
          onMouseLeave={() =>
            controls.start({
              x: "-50%",
              transition: {
                ease: "linear",
                duration: 16,
                repeat: Infinity,
              },
            })
          }
        >
          {scrollingLogos.map((brand, index) => (
            <div 
              key={index} 
              className={`flex items-center justify-center ${
                brand.isNextJS 
                  ? "min-w-[100px] sm:min-w-[130px] md:min-w-[160px]"  // Adjusted Next.js logo size
                  : "min-w-[70px] sm:min-w-[90px] md:min-w-[110px]"
              }`}
            >
              <Image
                src={brand.src}
                alt={brand.alt}
                width={brand.isNextJS ? 90 : 65}  // Adjusted image sizes for mobile
                height={brand.isNextJS ? 95 : 67}
                className="object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TechLogos;
