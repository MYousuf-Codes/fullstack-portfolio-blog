"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '../data/projects';
import Image from 'next/image';
import Link from 'next/link';

const ProjectsCard: React.FC = () => {
  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
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
              <h3 className="text-xl font-semibold text-left mb-2 dark:text-white">{project.title}</h3>
              <p className="text-gray-600 text-left mb-4 dark:text-white">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 dark:bg-white rounded-full text-sm"
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
    </section>
  );
};

export default ProjectsCard;
