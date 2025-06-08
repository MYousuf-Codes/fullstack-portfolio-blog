'use client';

import { motion } from 'framer-motion';
import { Code2, Database, Layout, Smartphone, Globe, Gauge } from 'lucide-react';
import CTAGetStarted from '@/components/CTAGetStarted';

const WebDev = () => {
    const features = [
        {
            icon: <Layout className="w-6 h-6" />,
            title: "Responsive Design",
            description: "Websites that look perfect on all devices"
        },
        {
            icon: <Database className="w-6 h-6" />,
            title: "Backend Development",
            description: "Robust and scalable server-side solutions"
        },
        {
            icon: <Smartphone className="w-6 h-6" />,
            title: "Progressive Web Apps",
            description: "Modern web apps with native-like features"
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: "API Integration",
            description: "Seamless third-party service integration"
        },
        {
            icon: <Code2 className="w-6 h-6" />,
            title: "Clean Code",
            description: "Maintainable and scalable codebase"
        },
        {
            icon: <Gauge className="w-6 h-6" />,
            title: "Performance",
            description: "Lightning-fast loading speeds"
        }
    ];

    return (
        <div className="min-h-screen pt-36 pb-24 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200">
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>
                <div className="absolute top-1/3 -left-24 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>
            </div>

            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        Full-Stack {" "}
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Web Development
                        </span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Building powerful, scalable, and beautiful web applications using cutting-edge technologies
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-6 rounded-2xl shadow-lg"
                        >
                            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 text-indigo-600">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-slate-900">{feature.title}</h3>
                            <p className="text-slate-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Tech Stack Section */}
                <div className="bg-white p-8 rounded-2xl shadow-lg mb-24">
                    <h2 className="text-3xl font-bold text-center mb-8">Our Tech Stack</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {["React", "Next.js", "Node.js", "TypeScript", "MongoDB", "PostgreSQL", "AWS", "Docker"].map((tech, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center p-4 bg-slate-50 rounded-lg"
                            >
                                {tech}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <CTAGetStarted />
            </div>
        </div>
    );
};

export default WebDev;