"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '../data/projects';
import Image from 'next/image';
import Link from 'next/link';

const FeaturedProjects: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 2;
    const totalPages = Math.ceil(projects.length / projectsPerPage);

    const getProjectsForCurrentPage = () => {
        const startIndex = (currentPage - 1) * projectsPerPage;
        return projects.slice(startIndex, startIndex + projectsPerPage);
    };

    return (
        <section className="py-16 px-6 max-w-6xl mx-auto">

            <h1 className="text-6xl md:text-7xl font-bold text-slate-900 mb-4">
                Featured{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Projects
                </span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {getProjectsForCurrentPage().map((project) => (
                    <motion.div
                        key={project.id}
                        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                        whileHover={{ y: -5 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="relative h-64 overflow-hidden">
                            <Image
                                src={project.imageUrl}
                                alt={project.title}
                                width={500}
                                height={300}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.techStack.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex justify-between items-center">
                                <Link
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors"
                                >
                                    <FaGithub size={24} />
                                </Link>
                                <Link
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors"
                                >
                                    <FaExternalLinkAlt size={20} />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-12 gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg transition-colors ${currentPage === page
                            ? 'bg-indigo-500 text-white'
                            : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
                            }`}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </section>
    );
};

export default FeaturedProjects;
