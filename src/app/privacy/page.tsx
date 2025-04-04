'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = 'Privacy Policy';
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
            Privacy{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Policy
            </span>
          </h1>
          <p className="text-slate-600 text-lg">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="prose prose-lg dark:prose-invert max-w-none"
        >
          {/* Sections */}
          <section className="bg-white/50 rounded-xl p-6 mb-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-slate-700 mb-4">
              We collect information that you provide directly to us when requesting our full-stack development or AI chatbot services, including:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Name and contact information</li>
              <li>Project requirements and specifications</li>
              <li>Communication preferences</li>
              <li>Business information relevant to project development</li>
            </ul>
          </section>

          <section className="bg-white/50 rounded-xl p-6 mb-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              2. Use of Information
            </h2>
            <p className="text-slate-700 mb-4">
              We use the collected information to:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Provide and improve our development services</li>
              <li>Communicate about project progress and updates</li>
              <li>Send relevant technical documentation and support</li>
              <li>Process payments and maintain business records</li>
            </ul>
          </section>

          <section className="bg-white/50 rounded-xl p-6 mb-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              3. Data Security
            </h2>
            <p className="text-slate-700">
              We implement industry-standard security measures to protect your information. All project-related data is handled with strict confidentiality, and our team adheres to professional security practices in software development.
            </p>
          </section>

          <section className="bg-white/50 rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              4. Contact Us
            </h2>
            <p className="text-slate-700">
              For any privacy-related questions or concerns about our development services, please contact our team at{" "}
              <a
                href="mailto:yousufhere.dev@gmail.com"
                className="text-indigo-600 hover:text-indigo-700"
              >
                yousufhere.dev@gmail.com
              </a>
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
