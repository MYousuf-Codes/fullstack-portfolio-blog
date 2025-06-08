'use client';

import { motion } from 'framer-motion';
import { Bot, MessageSquare, Zap, Shield, Settings, Users } from 'lucide-react';
import CTAGetStarted from '@/components/CTAGetStarted';

const ChatBotDev = () => {
    const features = [
        {
            icon: <MessageSquare className="w-6 h-6" />,
            title: "Natural Language Processing",
            description: "Advanced NLP for human-like conversations"
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Real-time Responses",
            description: "Instant and accurate interactions"
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Secure Integration",
            description: "Enterprise-grade security measures"
        },
        {
            icon: <Settings className="w-6 h-6" />,
            title: "Customizable Solutions",
            description: "Tailored to your specific needs"
        },
        {
            icon: <Bot className="w-6 h-6" />,
            title: "Multi-platform Support",
            description: "Works across all platforms"
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "24/7 Availability",
            description: "Always ready to assist customers"
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
                        AI {" "}
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Chatbot Development
                        </span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Intelligent conversational AI solutions to enhance your customer experience
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

                {/* Benefits Section */}
                <div className="bg-white p-8 rounded-2xl shadow-lg mb-24">
                    <h2 className="text-3xl font-bold text-center mb-8">Benefits</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            "24/7 Customer Support",
                            "Reduced Operating Costs",
                            "Increased Customer Satisfaction",
                            "Scalable Solutions",
                            "Quick Implementation",
                            "Detailed Analytics"
                        ].map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center p-4 bg-slate-50 rounded-lg"
                            >
                                <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                                {benefit}
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

export default ChatBotDev;