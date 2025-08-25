"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight, FaEye } from 'react-icons/fa';
import { projects } from '../data/projects';
import Image from 'next/image';
import Link from 'next/link';

const ProjectsCard: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({});

  const nextImage = (projectId: number, totalImages: number, e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex(prev => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) + 1) % totalImages
    }));
  };

  const prevImage = (projectId: number, totalImages: number, e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex(prev => ({
      ...prev,
      [projectId]: prev[projectId] > 0 ? prev[projectId] - 1 : totalImages - 1
    }));
  };

  const goToImage = (projectId: number, index: number, e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex(prev => ({
      ...prev,
      [projectId]: index
    }));
  };

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
        {projects.map((project) => {
          const currentIndex = currentImageIndex[project.id] || 0;
          const hasMultipleImages = project.images && project.images.length > 1;
          const projectImages = project.images || [];
          
          return (
            <motion.div
              key={project.id}
              className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-gray-200/50 dark:border-gray-700/50"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Image Container with Pagination */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                {projectImages.length > 0 ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full"
                    >
                      <Image
                        src={projectImages[currentIndex]}
                        alt={`${project.title} - Image ${currentIndex + 1}`}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        priority={currentIndex === 0}
                      />
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  /* Placeholder for projects without images */
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-gray-400 dark:text-gray-600 text-4xl">
                      📁
                    </div>
                  </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                    project.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                  }`}>
                    {project.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>

                {/* Image Navigation - Only show on hover if multiple images */}
                {hasMultipleImages && hoveredProject === project.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-between p-4"
                  >
                    <button
                      onClick={(e) => prevImage(project.id, projectImages.length, e)}
                      className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all duration-200 backdrop-blur-sm"
                    >
                      <FaChevronLeft size={14} />
                    </button>
                    <button
                      onClick={(e) => nextImage(project.id, projectImages.length, e)}
                      className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all duration-200 backdrop-blur-sm"
                    >
                      <FaChevronRight size={14} />
                    </button>
                  </motion.div>
                )}

                {/* Image Indicators - Only show if multiple images exist */}
                {hasMultipleImages && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {projectImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => goToImage(project.id, index, e)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          index === currentIndex
                            ? 'bg-white scale-125'
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* View Details Button */}
                <div className="absolute top-4 right-4">
                  <Link href={`/projects/${project.slug}`}>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-all duration-200"
                    >
                      <FaEye size={14} />
                    </motion.button>
                  </Link>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <Link href={`/projects/${project.slug}`}>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Category */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-1 rounded-md">
                    {project.category}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {project.duration}
                  </span>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 4).map((tech, index) => (
                    <motion.span
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                    >
                      {tech}
                    </motion.span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium text-gray-600 dark:text-gray-400">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-4">
                    {project.githubUrl && (
                      <motion.a
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                      >
                        <FaGithub size={18} />
                      </motion.a>
                    )}
                    {project.liveUrl && (
                      <motion.a
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-all duration-200"
                      >
                        <FaExternalLinkAlt size={16} />
                      </motion.a>
                    )}
                  </div>
                  
                  <Link href={`/projects/${project.slug}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      View Details
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectsCard;