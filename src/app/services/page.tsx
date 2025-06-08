'use client';

import { motion } from 'framer-motion';
import { Code2, Bot, BarChart } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import PricingCard from '@/components/PricingCard';
import CTAGetStarted from '@/components/CTAGetStarted';
import ProcessSection from '@/components/OurProcess';

const ServicesPage = () => {
    const services = [
        {
            title: "Full-Stack Development",
            description: "End-to-end web development solutions using the latest technologies.",
            icon: <Code2 className="w-full h-full" />,
            link: "/services/web-development"
        },
        {
            title: "AI Chatbot Development",
            description: "Custom AI-powered chatbots for enhanced customer engagement.",
            icon: <Bot className="w-full h-full" />,
            link: "/services/ai-chatbot-developoment"
        },
        {
            title: "Performance Optimization",
            description: "Data-driven insights and performance optimization services.",
            icon: <BarChart className="w-full h-full" />,
            link: "/services/seo-performance-optimization"
        }
    ];

    const plans = [
        {
            title: "Starter",
            price: "$999",
            description: "Perfect for small businesses just getting started",
            features: [
                { name: "Basic Web Development", included: true },
                { name: "5 Pages", included: true },
                { name: "SEO-Optimized", included: true },
                { name: "Mobile Responsive", included: true },
                { name: "Custom AI Chatbot", included: false },
                { name: "Analytics Dashboard", included: false },
                { name: "24/7 Support", included: true }
            ]
        },
        {
            title: "Business",
            price: "$2499",
            description: "Ideal for growing businesses",
            features: [
                { name: "Advanced Web Development", included: true },
                { name: "Unlimited Pages", included: true },
                { name: "Advanced SEO", included: true },
                { name: "Mobile Responsive", included: true },
                { name: "Basic AI Chatbot", included: true },
                { name: "Analytics Dashboard", included: true },
                { name: "24/7 Support", included: true }
            ],
            popular: true
        },
        {
            title: "Premium",
            price: "$4999",
            description: "For enterprises requiring complete solutions",
            features: [
                { name: "Enterprise Web Development", included: true },
                { name: "Unlimited Pages", included: true },
                { name: "Advanced SEO", included: true },
                { name: "Mobile Responsive", included: true },
                { name: "Advanced AI Chatbot", included: true },
                { name: "Custom Analytics", included: true },
                { name: "24/7 Priority Support", included: true }
            ]
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
                        Our {" "}
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Services
                        </span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Transforming ideas into digital reality with cutting-edge web development 
                        and AI solutions.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 p-5 bg-white rounded-2xl shadow-lg">
                    {[
                        { number: "100+", label: "Projects Completed" },
                        { number: "50+", label: "Happy Clients" },
                        { number: "24/7", label: "Support Available" }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-center p-6"
                        >
                            <div className="text-4xl font-bold text-indigo-600 mb-2">
                                {stat.number}
                            </div>
                            <div className="text-slate-600">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                <ProcessSection />


                {/* CTA Section */}
                <CTAGetStarted />
            </div>
        </div>
    );
};

export default ServicesPage;