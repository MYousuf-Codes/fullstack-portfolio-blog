import React from "react";
import Link from "next/link";
import { FaBook, FaArrowLeft, FaCode, FaBug, FaLightbulb } from "react-icons/fa";
import NewsLetter from "@/components/NewsLetter";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web Development Tutorials | Comprehensive Guides & Solutions',
  description: 'Learn web development with our comprehensive tutorials covering HTML, CSS, JavaScript, TypeScript, Python, React, Next.js, and Node.js. Includes common errors and solutions.',
};

export default function Tutorials() {
  return (
        <div className="min-h-screen pt-24 bg-gradient-to-b from-slate-100 to-slate-200">
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>
                <div className="absolute top-1/3 -left-24 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>
            </div>

            <div className="max-w-5xl mx-auto px-4">
                {/* Back Button */}
                <Link
                    href="/"
                    className="mb-8 flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors group"
                >
                    <FaArrowLeft className="text-sm group-hover:translate-x-[-2px] transition-transform" />
                    <span>Back to home</span>
                </Link>

                {/* Main Content */}
                <div className="text-center">
                    {/* Icon */}
                    <div className="mb-8 flex justify-center">
                        <div className="w-24 h-24 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                            <FaBook className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        Comprehensive{" "}
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Tutorials
                        </span>
                    </h1>

                    {/* Tagline */}
                    <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
                        Master web development with our in-depth guides, troubleshooting tips, and best practices
                    </p>

                    {/* What You'll Learn Section */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl py-8 px-6 md:px-12 shadow-lg mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center justify-center gap-3">
                            <FaCode className="text-indigo-500" />
                            What You&apos;ll Learn
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                            {/* Frontend Technologies */}
                            <div>
                                <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">Frontend Technologies</h3>
                                <ul className="space-y-4">
                                    <li className="flex gap-3">
                                        <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2.5"></span>
                                        <div>
                                            <span className="font-medium text-slate-900 dark:text-white">HTML5</span>
                                            <p className="text-sm text-slate-600 dark:text-slate-300">Semantic markup, accessibility best practices, SEO optimization, and modern HTML features</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2.5"></span>
                                        <div>
                                            <span className="font-medium text-slate-900 dark:text-white">CSS</span>
                                            <p className="text-sm text-slate-600 dark:text-slate-300">Flexbox, Grid, animations, responsive design, CSS variables, and modern layout techniques</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2.5"></span>
                                        <div>
                                            <span className="font-medium text-slate-900 dark:text-white">JavaScript</span>
                                            <p className="text-sm text-slate-600 dark:text-slate-300">ES6+, async/await, DOM manipulation, event handling, and modern JavaScript patterns</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2.5"></span>
                                        <div>
                                            <span className="font-medium text-slate-900 dark:text-white">TypeScript</span>
                                            <p className="text-sm text-slate-600 dark:text-slate-300">Type systems, interfaces, generics, utility types, and integration with popular frameworks</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            
                            {/* Frameworks & Backend */}
                            <div>
                                <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">Frameworks & Backend</h3>
                                <ul className="space-y-4">
                                    <li className="flex gap-3">
                                        <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2.5"></span>
                                        <div>
                                            <span className="font-medium text-slate-900 dark:text-white">React</span>
                                            <p className="text-sm text-slate-600 dark:text-slate-300">Hooks, context API, state management, performance optimization, and component patterns</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2.5"></span>
                                        <div>
                                            <span className="font-medium text-slate-900 dark:text-white">Next.js</span>
                                            <p className="text-sm text-slate-600 dark:text-slate-300">Server components, app router, data fetching strategies, SSR, SSG, and deployment options</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2.5"></span>
                                        <div>
                                            <span className="font-medium text-slate-900 dark:text-white">Node.js</span>
                                            <p className="text-sm text-slate-600 dark:text-slate-300">Express, RESTful APIs, authentication, database integration, and server-side architecture</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2.5"></span>
    <div>
                                            <span className="font-medium text-slate-900 dark:text-white">Python</span>
                                            <p className="text-sm text-slate-600 dark:text-slate-300">Django, Flask, data analysis with pandas, automation scripts, and web scraping techniques</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    {/* Common Issues & Solutions */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl py-8 px-6 md:px-12 shadow-lg mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center justify-center gap-3">
                            <FaBug className="text-indigo-500" />
                            Common Issues & Solutions
                        </h2>
                        
                        <p className="text-slate-600 dark:text-slate-300 mb-6">
                            Our tutorials include comprehensive troubleshooting guides for common errors and bugs you might encounter:
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                            <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                                <h3 className="font-medium text-slate-900 dark:text-white mb-2">Frontend Debugging</h3>
                                <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
                                    <li>• React rendering issues and performance bottlenecks</li>
                                    <li>• CSS layout and responsive design problems</li>
                                    <li>• TypeScript type errors and compatibility issues</li>
                                    <li>• Browser compatibility and polyfill solutions</li>
                                </ul>
                            </div>
                            
                            <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                                <h3 className="font-medium text-slate-900 dark:text-white mb-2">Backend Challenges</h3>
                                <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
                                    <li>• Node.js memory leaks and performance optimization</li>
                                    <li>• API error handling and status code best practices</li>
                                    <li>• Database connection and query optimization</li>
                                    <li>• Authentication and security vulnerabilities</li>
                                </ul>
                            </div>
                            
                            <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                                <h3 className="font-medium text-slate-900 dark:text-white mb-2">Next.js Specific Issues</h3>
                                <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
                                    <li>• Server vs. client component confusion</li>
                                    <li>• Data fetching and caching strategies</li>
                                    <li>• Routing and middleware complications</li>
                                    <li>• Deployment and build optimization</li>
                                </ul>
                            </div>
                            
                            <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                                <h3 className="font-medium text-slate-900 dark:text-white mb-2">Development Workflow</h3>
                                <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
                                    <li>• Git merge conflicts and version control issues</li>
                                    <li>• Package dependency conflicts and versioning</li>
                                    <li>• Build and bundling configuration problems</li>
                                    <li>• Testing and CI/CD pipeline troubleshooting</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    {/* Coming Soon Banner */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl py-8 px-6 shadow-lg mb-12 text-white">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <FaLightbulb className="text-yellow-300 text-2xl" />
                            <h2 className="text-2xl font-bold">Coming Soon!</h2>
                        </div>
                        <p className="max-w-2xl mx-auto">
                            We&apos;re working hard to bring you these comprehensive tutorials. Sign up for our newsletter below to be notified when new content is available.
                        </p>
                    </div>
                </div>
            </div>
            <NewsLetter />
    </div>
  );
}
