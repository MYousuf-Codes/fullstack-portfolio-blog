"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { skillCategories } from '../data/skills';

const SkillsExpertise: React.FC = () => {
    //  refs for each section
    const frontendRef = useRef(null);
    const backendRef = useRef(null);
    const databaseRef = useRef(null);
    const toolsRef = useRef(null);
    
    // Check if sections are in view
    const frontendInView = useInView(frontendRef, { once: true, amount: 0.2 });
    const backendInView = useInView(backendRef, { once: true, amount: 0.2 });
    const databaseInView = useInView(databaseRef, { once: true, amount: 0.2 });
    const toolsInView = useInView(toolsRef, { once: true, amount: 0.2 });

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, scale: 0.9 },
        show: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    const sectionVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className="py-16 px-4 max-w-6xl mx-auto">
            <motion.h2 
                className="text-6xl text-indigo-500 font-bold text-left mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Skills & Expertise
            </motion.h2>

            <div className="grid grid-cols-1 gap-4">
                {/* First Row - Frontend (Full Width Rectangle) */}
                <motion.div 
                    ref={frontendRef}
                    variants={sectionVariant}
                    initial="hidden"
                    animate={frontendInView ? "visible" : "hidden"}
                    className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg"
                >
                    <h3 className="text-2xl font-semibold mb-4 text-indigo-500 border-b border-gray-200 dark:border-gray-700 pb-2">
                        {skillCategories[0].name}
                    </h3>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate={frontendInView ? "show" : "hidden"}
                        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3"
                    >
                        {skillCategories[0].skills.map((skill) => (
                            <motion.div
                                key={skill.name}
                                variants={item}
                                className="group flex flex-col items-center justify-center p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                            >
                                <div className="relative w-8 h-8 mb-1.5 group-hover:scale-110 transition-transform duration-300">
                                    <Image
                                        src={skill.icon}
                                        alt={skill.name}
                                        fill
                                        className="object-contain drop-shadow-md"
                                    />
                                </div>
                                <span className="text-xs font-medium text-center text-gray-700 dark:text-gray-300">
                                    {skill.name}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Second Row - Combined Backend and Database */}
                <motion.div 
                    className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg"
                    variants={sectionVariant}
                    initial="hidden"
                    animate={backendInView || databaseInView ? "visible" : "hidden"}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
                        {/* Backend Section */}
                        <div ref={backendRef} className="pb-4 md:pb-0 md:pr-4">
                            <h3 className="text-2xl font-semibold mb-4 text-indigo-500 border-b border-gray-200 dark:border-gray-700 pb-2">
                                {skillCategories[1].name}
                            </h3>

                            <motion.div
                                variants={container}
                                initial="hidden"
                                animate={backendInView ? "show" : "hidden"}
                                className="grid grid-cols-2 sm:grid-cols-4 gap-3"
                            >
                                {skillCategories[1].skills.map((skill) => (
                                    <motion.div
                                        key={skill.name}
                                        variants={item}
                                        className="group flex flex-col items-center justify-center p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                                    >
                                        <div className="relative w-8 h-8 mb-1.5 group-hover:scale-110 transition-transform duration-300">
                                            <Image
                                                src={skill.icon}
                                                alt={skill.name}
                                                fill
                                                className="object-contain drop-shadow-md"
                                            />
                                        </div>
                                        <span className="text-xs font-medium text-center text-gray-700 dark:text-gray-300">
                                            {skill.name}
                                        </span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Database Section */}
                        <div ref={databaseRef} className="pt-4 md:pt-0 md:pl-4">
                            <h3 className="text-2xl font-semibold mb-4 text-indigo-500 border-b border-gray-200 dark:border-gray-700 pb-2">
                                {skillCategories[2].name}
                            </h3>

                            <motion.div
                                variants={container}
                                initial="hidden"
                                animate={databaseInView ? "show" : "hidden"}
                                className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                            >
                                {skillCategories[2].skills.map((skill) => (
                                    <motion.div
                                        key={skill.name}
                                        variants={item}
                                        className="group flex flex-col items-center justify-center p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                                    >
                                        <div className="relative w-8 h-8 mb-1.5 group-hover:scale-110 transition-transform duration-300">
                                            <Image
                                                src={skill.icon}
                                                alt={skill.name}
                                                fill
                                                className="object-contain drop-shadow-md"
                                            />
                                        </div>
                                        <span className="text-xs font-medium text-center text-gray-700 dark:text-gray-300">
                                            {skill.name}
                                        </span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Additional Tools Section */}
                <motion.div 
                    ref={toolsRef}
                    variants={sectionVariant}
                    initial="hidden"
                    animate={toolsInView ? "visible" : "hidden"}
                    className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg"
                >
                    <h3 className="text-2xl font-semibold mb-4 text-indigo-500 border-b border-gray-200 dark:border-gray-700 pb-2">
                        Additional Tools & Technologies
                    </h3>
                    <center>
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate={toolsInView ? "show" : "hidden"}
                        className="flex flex-wrap gap-2"
                    >
                        {[
                            'Git', 
                            'Docker',
                            'Redux',
                            'Webpack',
                            'GitHub Actions',
                            'AWS',
                            'Linux',
                            'REST APIs',
                            'Postman',
                            'VS Code',
                            'npm/yarn',
                            'Figma',
                            'Vercel',
                            'Netlify'
                        ].map((tool) => (
                            <motion.span
                                key={tool}
                                variants={item}
                                className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 rounded-lg text-xs font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors duration-300"
                            >
                                {tool}
                            </motion.span>
                        ))}
                    </motion.div>
                    </center>
                </motion.div>
            </div>
        </section>
    );
};

export default SkillsExpertise;
