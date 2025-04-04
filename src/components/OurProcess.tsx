import { motion } from 'framer-motion';
import { 
    Lightbulb, 
    PenTool, 
    Code2, 
    TestTube, 
    Rocket, 
    Repeat 
} from 'lucide-react';

const processes = [
    {
        icon: <Lightbulb className="w-8 h-8" />,
        title: "Discovery & Planning",
        description: "We start by understanding your goals, target audience, and project requirements through in-depth consultations.",
        step: "01"
    },
    {
        icon: <PenTool className="w-8 h-8" />,
        title: "Design & Prototype",
        description: "Creating wireframes and interactive prototypes to visualize the solution before development begins.",
        step: "02"
    },
    {
        icon: <Code2 className="w-8 h-8" />,
        title: "Development",
        description: "Our experienced team brings the design to life using cutting-edge technologies and best practices.",
        step: "03"
    },
    {
        icon: <TestTube className="w-8 h-8" />,
        title: "Testing & QA",
        description: "Rigorous testing ensures your solution works flawlessly across all devices and scenarios.",
        step: "04"
    },
    {
        icon: <Rocket className="w-8 h-8" />,
        title: "Deployment",
        description: "Smooth deployment to your preferred hosting platform with zero downtime.",
        step: "05"
    },
    {
        icon: <Repeat className="w-8 h-8" />,
        title: "Monitoring & Support",
        description: "Ongoing support and regular updates to keep your solution running optimally.",
        step: "06"
    }
];

const ProcessSection = () => {
    return (
        <div className="mb-24">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    Our Development{" "}
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Process
                    </span>
                </h2>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    A systematic approach to delivering high-quality solutions that exceed expectations
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {processes.map((process, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                                {process.icon}
                            </div>
                            <div>
                                <span className="absolute top-4 right-4 text-4xl font-bold text-slate-100">
                                    {process.step}
                                </span>
                                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                    {process.title}
                                </h3>
                                <p className="text-slate-600">
                                    {process.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-12 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="inline-block px-6 py-3 bg-white rounded-xl shadow-md"
                >
                    <p className="text-slate-600">
                        <span className="font-semibold text-indigo-600">Pro tip:</span>{" "}
                        Our agile methodology ensures quick iterations and constant communication
                        throughout the development process.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default ProcessSection;