"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { testimonials } from '../data/testimonials';

// // Company logos
// const companies = [
//   {
//     name: "Google",
//     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
//   },
//   {
//     name: "Microsoft",
//     logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
//   },
//   {
//     name: "Amazon",
//     logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2500px-Amazon_icon.svg.png"
//   },
//   {
//     name: "Meta",
//     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg"
//   }
// ];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay]);

  const handlePrevious = () => {
    setAutoplay(false);
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setAutoplay(false);
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % testimonials.length
    );
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
        
      <h2 className="text-6xl md:text-7xl text-indigo-500 font-bold text-left mb-12">Testimonials</h2>
      
      <div className="relative bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg overflow-hidden">
        <div className="absolute top-8 left-8 text-indigo-400 opacity-20">
          <FaQuoteLeft size={60} />
        </div>
        
        <div className="relative min-h-[300px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute w-full"
            >
              <div className="flex flex-col md:flex-row items-center gap-8 p-4">
                <div className="w-24 h-24 md:w-32 md:h-32 relative flex-shrink-0 rounded-full overflow-hidden shadow-md">
                  <Image
                    src={testimonials[currentIndex].imageUrl}
                    alt={testimonials[currentIndex].name}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 96px, 128px"
                  />
                </div>
                
                <div className="flex-1">
                  <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 italic mb-6">
                    &quot;{testimonials[currentIndex].quote}&quot;
                  </p>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-indigo-500 font-medium">
                      {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Navigation Dots */}
        <div className="flex justify-center mt-6 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setAutoplay(false);
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex 
                  ? 'bg-indigo-500' 
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-indigo-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Navigation Arrows */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          aria-label="Previous testimonial"
        >
          <FaChevronLeft className="text-indigo-500" size={20} />
        </button>
        
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          aria-label="Next testimonial"
        >
          <FaChevronRight className="text-indigo-500" size={20} />
        </button>
      </div>
      
      {/* Companies Section */}
      {/* <div className="mt-16">
        <h3 className="text-2xl font-semibold text-center mb-8 text-gray-700 dark:text-gray-300">
          Companies I have Worked With
        </h3>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {companies.map((company, index) => (
            <div 
              key={index} 
              className="w-24 h-24 md:w-32 md:h-32 relative grayscale hover:grayscale-0 transition-all duration-300 filter hover:drop-shadow-md"
            >
              <Image
                src={company.logo}
                alt={company.name}
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 96px, 128px"
              />
            </div>
          ))}
        </div>
      </div> */}
    </section>
  );
};

export default Testimonials;
