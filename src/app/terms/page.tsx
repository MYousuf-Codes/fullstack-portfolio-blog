'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function TermsPage() {
    useEffect(() => {
        document.title = 'Terms of Service';
    }, []);

    return (
        <div className="min-h-screen pt-36 pb-24 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200">
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>
                <div className="absolute top-1/3 -left-24 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>
            </div>

            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        Terms of{" "}
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Service
                        </span>
                    </h1>
                    <p className="text-slate-600 text-lg">Last updated: {new Date().toLocaleDateString()}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="prose prose-lg dark:prose-invert max-w-none"
                >
                    {/* Sections with consistent styling */}
                    {[
                        { title: "1. Acceptance of Terms", content: "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement." },
                        { title: "2. Use License", content: "Permission is granted to temporarily view the materials on our website. This license shall automatically terminate if you violate any of these restrictions." },
                        { title: "3. Disclaimer", content: "The materials on this website are provided on an 'as is' basis. We make no warranties, expressed or implied." },
                        { title: "4. Limitations", content: "In no event shall we or our suppliers be liable for any damages arising out of the use or inability to use the materials on our website." },
                        { title: "5. Privacy Policy", content: "Your use of this website is also governed by our Privacy Policy, which is incorporated into these terms and conditions by reference." },
                        { title: "6. Governing Law", content: "These terms and conditions are governed by and construed in accordance with applicable laws." },
                        { title: "7. Changes to Terms", content: "We reserve the right to revise these terms of service at any time without notice." }
                    ].map((section, index) => (
                        <section key={index} className="bg-white/50 rounded-xl p-6 mb-8 shadow-sm">
                            <h2 className="text-2xl font-semibold text-slate-900 mb-4">{section.title}</h2>
                            <p className="text-gray-700 dark:text-gray-300">{section.content}</p>
                        </section>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
