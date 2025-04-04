"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaLightbulb, FaHandshake, FaRocket, FaChartLine, FaGithub, FaLinkedin, FaChevronDown } from "react-icons/fa";
import { SiUpwork, SiFiverr } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import Testimonials from "@/components/Testimonials";
import CTAGetStarted from "@/components/CTAGetStarted";

// Value Proposition Cards Data
const valueProps = [
  {
    icon: <FaLightbulb className="w-6 h-6" />,
    title: "Innovation First",
    description: "We constantly push boundaries and explore new ideas to deliver cutting-edge solutions.",
  },
  {
    icon: <FaHandshake className="w-6 h-6" />,
    title: "Customer Success",
    description: "Your success is our priority. We're committed to helping you achieve your goals.",
  },
  {
    icon: <FaRocket className="w-6 h-6" />,
    title: "Fast Delivery",
    description: "Quick turnaround without compromising on quality is our standard.",
  },
  {
    icon: <FaChartLine className="w-6 h-6" />,
    title: "Growth Focused",
    description: "We help businesses scale and grow with strategic digital solutions.",
  },
];

// Team Members Data
const teamMembers = [
  {
    name: "Abdul Rauf",
    role: "Founder & CEO",
    image: "/team/abdul-rauf.png",
    bio: "With 15+ years in digital innovation, Sarah leads our vision for the future.",
    socials: {
      fiverr: "https://www.fiverr.com/yousaf_codes?public_mode=true",
      upwork: "https://www.upwork.com/freelancers/~01c98ab5f3a9ac4c0e"
    }
  },
  {
    name: "Muhammad Yousuf",
    role: "Full-Stack Developer",
    image: "/team/m-yousuf.png",
    bio: "Expert in cutting-edge tech, Michael ensures we stay ahead of the curve.",
    socials: {
      github: "https://github.com/myousuf",
      linkedin: "https://linkedin.com/in/myousuf"
    }
  },
  {
    name: "Muhammad Yousuf",
    role: "Full-Stack Developer",
    image: "/team/m-yousuf.png",
    bio: "Expert in cutting-edge tech, Michael ensures we stay ahead of the curve.",
    socials: {
      github: "https://github.com/myousuf",
      linkedin: "https://linkedin.com/in/myousuf"
    }
  },
];

// Why Choose Us FAQs
const whyChooseUsFaqs = [
  {
    question: "What makes your development approach unique?",
    answer: "We follow a collaborative development process that keeps you involved at every stage. Our agile methodology allows for flexible adjustments as your project evolves, ensuring the final product perfectly aligns with your vision and business goals."
  },
  {
    question: "How do you ensure quality in your projects?",
    answer: "Quality is built into our process through rigorous testing at every development stage. We implement automated testing, code reviews, and performance optimizations to ensure your application is robust, secure, and scalable from day one."
  },
  {
    question: "Do you provide post-launch support?",
    answer: "Absolutely! Our relationship doesn't end at launch. We offer comprehensive maintenance packages, regular updates, and ongoing support to keep your application running smoothly. We're committed to your long-term success."
  },
  {
    question: "How do you stay current with rapidly changing technologies?",
    answer: "Our team dedicates time each week to learning and exploring new technologies. We participate in tech conferences, contribute to open-source projects, and maintain internal knowledge-sharing practices to ensure we're always at the cutting edge."
  },
  {
    question: "What types of businesses have you worked with?",
    answer: "We've successfully delivered projects for startups, mid-sized businesses, and enterprise clients across diverse industries including e-commerce, healthcare, fintech, education, and entertainment. This varied experience allows us to bring cross-industry insights to your project."
  },
  {
    question: "How do you handle project budgets and timelines?",
    answer: "Transparency is key in our approach. We provide detailed estimates before project kickoff and regular progress updates throughout development. Our project management system gives you real-time visibility into milestones, tasks, and budget utilization."
  }
];


export default function About() {
  // State for tracking active FAQ
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Toggle FAQ
  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen pt-36 pb-24 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>
        <div className="absolute top-1/3 -left-24 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Transforming Ideas into
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Digital Excellence
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {`We're passionate about creating exceptional digital experiences that drive growth
            and innovation for businesses worldwide.`}
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-32">
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/mission.webp"
              alt="Our Mission"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
            <p className="text-lg text-slate-600 mb-6">
              {`To empower businesses with innovative digital solutions that drive growth,
              enhance user experience, and create lasting impact in the digital landscape.`}
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 mt-1">✓</span>
                <span className="text-slate-700">Industry-leading expertise in digital transformation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 mt-1">✓</span>
                <span className="text-slate-700">Proven track record of successful projects</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 mt-1">✓</span>
                <span className="text-slate-700">Commitment to innovation and excellence</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Value Props Section */}
        <div className="mb-32">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-16">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((prop, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-indigo-600 mb-4">{prop.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {prop.title}
                </h3>
                <p className="text-slate-600">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-32 container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-16">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg group hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative w-full h-72 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Social Links Overlay */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    {member.socials.fiverr && (
                      <a
                        href={member.socials.fiverr}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors duration-200"
                      >
                        <SiFiverr className="w-8 h-8 text-[#1dbf73]" />
                      </a>
                    )}
                    {member.socials.upwork && (
                      <a
                        href={member.socials.upwork}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors duration-200"
                      >
                        <SiUpwork className="w-8 h-8 text-[#14a800]" />
                      </a>
                    )}
                    {member.socials.github && (
                      <a
                        href={member.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors duration-200"
                      >
                        <FaGithub className="w-8 h-8 text-[#333]" />
                      </a>
                    )}
                    {member.socials.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors duration-200"
                      >
                        <FaLinkedin className="w-8 h-8 text-[#0077b5]" />
                      </a>
                    )}
                  </div>
                </div>
                <div className="p-8 relative z-10 bg-white">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-indigo-600 font-medium mb-4">{member.role}</p>
                  <p className="text-slate-600 leading-relaxed">{member.bio}</p>
                  <div className="h-1 w-20 bg-indigo-600 mt-6 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-xl p-12 mb-32">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">500+</div>
              <div className="text-slate-600">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">98%</div>
              <div className="text-slate-600">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">50+</div>
              <div className="text-slate-600">Team Members</div>
            </div>
    <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">12+</div>
              <div className="text-slate-600">Years Experience</div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <Testimonials />

        {/* Why Choose Us FAQ Section */}
        <div className="mb-32">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-16">
            Why Partner With Us
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {whyChooseUsFaqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 flex justify-between items-center text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white transition-all duration-300 hover:bg-slate-50"
                >
                  <div className="flex items-center">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-semibold text-sm mr-4 flex-shrink-0">
                      {index + 1}
                    </span>
                    <h3 className="text-xl font-semibold text-slate-900 pr-8">{faq.question}</h3>
                  </div>
                  <motion.div
                    animate={{ rotate: activeFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`text-indigo-600 flex-shrink-0 ${activeFaq === index ? 'text-indigo-800' : ''}`}
                  >
                    <FaChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden border-t border-slate-100"
                    >
                      <div className="p-6 pt-4 text-slate-600">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <CTAGetStarted />
      </div>
    </div>
  );
}