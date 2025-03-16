import React from "react";
import Link from "next/link";
import { FaBook, FaArrowLeft } from "react-icons/fa";
import NewsLetter from "@/components/NewsLetter";

export default function Tutorials() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200 pt-24 pb-24">
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>
                <div className="absolute top-1/3 -left-24 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>
            </div>

            <div className="max-w-4xl mx-auto px-4">
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
                        Tutorials Coming Soon
                    </h1>

                    {/* Tagline */}
                    <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
                        Comprehensive guides to help you master modern web development
                    </p>

                    {/* Description */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl py-12 px-28 shadow-lg mb-8">
                        <p className="text-slate-600 dark:text-slate-300 mb-6">
                            We're working on creating detailed, step-by-step tutorials that will help you learn and master various aspects of web development. Our tutorials will cover:
                        </p>
                        <ul className="text-left space-y-3 text-slate-600 dark:text-slate-300">
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                                Modern React and Next.js development
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                                TypeScript best practices
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                                Tailwind CSS and responsive design
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                                Content management with Sanity.io
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                                Performance optimization techniques
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* Newsletter Signup */}
            <NewsLetter />
        </div>
    );
}
