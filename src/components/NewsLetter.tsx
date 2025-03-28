"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';

const NewsLetter: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
  });

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
        throw new Error('EmailJS configuration is missing');
      }

      // Sending email using EmailJS
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_name: 'Admin',
          from_name: formData.fullName,
          from_email: formData.email,
          message: `New newsletter subscription from ${formData.fullName} (${formData.email})`,
        }
      );

      if (result.status === 200) {
        toast.success('Successfully subscribed to the newsletter!');
        setFormData({ fullName: '', email: '' });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error(
        error instanceof Error && error.message === 'EmailJS configuration is missing'
          ? 'Newsletter service is not configured properly. Please try again later.'
          : 'Failed to subscribe. Please try again later.'
      );
    }

    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Stay Updated with Latest Web Development Tips
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get exclusive tutorials, best practices, and industry insights delivered straight to your inbox.
            Join our growing community of developers!
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto bg-white rounded-xl shadow-xl p-6 md:p-8"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className={`w-full mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 ${
              isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-indigo-700'
            } transition-colors duration-200`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                <span>Subscribing...</span>
              </>
            ) : (
              <>
                <FaPaperPlane className="text-lg" />
                <span>Subscribe Now</span>
              </>
            )}
          </motion.button>

          <p className="mt-4 text-sm text-gray-500 text-center">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.form>
      </div>
    </section>
  );
};

export default NewsLetter;
