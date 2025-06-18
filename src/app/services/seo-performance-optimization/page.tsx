'use client';
import { Search, BarChart2, Target, Rocket, Activity, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Gauge, TrendingUp, LineChart } from 'lucide-react';
import CTAGetStarted from '@/components/CTAGetStarted';

const PerformanceOptimization = () => {
    const features = [
        {
            icon: <Search className="w-6 h-6" />,
            title: "SEO Audit",
            description: "Comprehensive analysis of your website's SEO health"
        },
        {
            icon: <Gauge className="w-6 h-6" />,
            title: "Speed Optimization",
            description: "Improve loading times and performance"
        },
        {
            icon: <Target className="w-6 h-6" />,
            title: "Keyword Strategy",
            description: "Target the right keywords for your audience"
        },
        {
            icon: <TrendingUp className="w-6 h-6" />,
            title: "Ranking Improvement",
            description: "Boost your search engine rankings"
        },
        {
            icon: <BarChart className="w-6 h-6" />,
            title: "Performance Metrics",
            description: "Track and analyze key performance indicators"
        },
        {
            icon: <LineChart className="w-6 h-6" />,
            title: "Conversion Optimization",
            description: "Improve conversion rates and user experience"
        }
    ];

    const processes = [
    {
        icon: <Search className="w-6 h-6" />,
        title: "Initial Site Audit",
        description: "We dive deep into your website's current performance, analyzing every aspect from technical SEO to user experience.",
        highlight: "Comprehensive Analysis"
    },
    {
        icon: <BarChart2 className="w-6 h-6" />,
        title: "Performance Analysis",
        description: "Using advanced tools, we measure your site's speed, accessibility, and SEO metrics to identify improvement areas.",
        highlight: "Data-Driven Insights"
    },
    {
        icon: <Target className="w-6 h-6" />,
        title: "Optimization Strategy",
        description: "We create a tailored roadmap focusing on quick wins and long-term sustainable improvements.",
        highlight: "Custom Action Plan"
    },
    {
        icon: <Rocket className="w-6 h-6" />,
        title: "Implementation",
        description: "Our team expertly applies the optimizations, ensuring zero disruption to your live site.",
        highlight: "Seamless Execution"
    },
    {
        icon: <Activity className="w-6 h-6" />,
        title: "Monitoring & Reporting",
        description: "Track progress with detailed analytics and regular performance reports.",
        highlight: "Real-time Tracking"
    },
    {
        icon: <RefreshCw className="w-6 h-6" />,
        title: "Continuous Improvement",
        description: "We continuously refine our approach based on performance data and evolving SEO practices.",
        highlight: "Ongoing Optimization"
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
                        SEO & {" "}
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Performance Optimization
                        </span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        {`Boost your website's visibility and performance with our optimization services`}
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

                {/* Process Section */}
                <div className="bg-white p-8 rounded-2xl shadow-lg mb-24">
                    <h2 className="text-3xl font-bold text-center mb-8">Our Optimization Process</h2>
                    <div className="space-y-8">
                        {processes.map((process, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start p-6 bg-gradient-to-r from-slate-50 to-white rounded-xl hover:shadow-md transition-all duration-300"
                            >
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mr-6">
                                        {process.icon}
                                    </div>
                                </div>
                                <div className="flex-grow">
                                    <div className="flex items-center mb-2">
                                        <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">
                                            {index + 1}
                                        </span>
                                        <h3 className="text-xl font-semibold text-slate-900">{process.title}</h3>
                                    </div>
                                    <p className="text-slate-600 mb-2">{process.description}</p>
                                    <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                                        {process.highlight}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <CTAGetStarted />
            </div>
        </div>
    );
};

export default PerformanceOptimization;