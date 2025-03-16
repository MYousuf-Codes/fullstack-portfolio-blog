"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { techLogos } from '@/data/techLogos';

const TechLogos: React.FC = () => {
  // Duplicate the logos array to create a seamless loop
  const duplicatedLogos = [...techLogos, ...techLogos];

  return (
    <div className="py-12 bg-gradient-to-r from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-8">
          Technologies We Work With
        </h2>
        
        <div className="relative">
          {/* Add a gradient overlay on the left */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-slate-50 to-transparent dark:from-gray-900"></div>
          
          {/* Add a gradient overlay on the right */}
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-slate-50 to-transparent dark:from-gray-900"></div>
          
          {/* Scrolling container */}
          <div className="flex overflow-hidden">
            <motion.div
              className="flex items-center space-x-12 py-6"
              animate={{ x: [0, -50 * techLogos.length] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear"
                }
              }}
            >
              {duplicatedLogos.map((logo, index) => (
                <div 
                  key={`${logo.alt}-${index}`} 
                  className="flex flex-col items-center justify-center space-y-2 w-24 h-24"
                >
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      priority={logo.priority}
                      className={`object-contain filter grayscale hover:grayscale-0 transition-all duration-300 ${logo.isNextJS ? 'dark:invert' : ''}`}
                    />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400 font-medium text-center">
                    {logo.alt}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechLogos;