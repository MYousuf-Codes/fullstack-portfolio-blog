"use client";
import React, { useState, FormEvent, useEffect } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaCheckCircle, FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

// Contact information
const contactInfo = {
  address: "Karachi, Sindh, Pakistan",
  phone: "+92 301 2381884",
  email: "yousufhere.dev@gmail.com",
  hours: "Monday - Sunday: 9:00 AM - 6:00 PM"
};

// Form fields configuration
const formFields = [
  { id: "name" as const, label: "Full Name", type: "text", placeholder: "Your full name" },
  { id: "email" as const, label: "Email Address", type: "email", placeholder: "your@email.com" },
  { id: "phone" as const, label: "Phone Number", type: "tel", placeholder: "+92 300 1234567" },
  { id: "subject" as const, label: "Subject", type: "text", placeholder: "How can we help you?" }
];

// Define field ID type for type safety
type FieldId = typeof formFields[number]['id'] | 'message';

// Types
interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<FieldId, string>>;

interface SubmitStatus {
  success: boolean;
  message: string;
}

export default function Contact() {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({ success: false, message: "" });
  const [useDirectEmail, setUseDirectEmail] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  
  // Initialize EmailJS
  useEffect(() => {
    try {
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "nRHwdkPfgbKpsIBc0";
      
      emailjs.init({
        publicKey: publicKey,
        limitRate: {
          throttle: 2000 // Prevent multiple sends within 2 seconds
        }
      });
      console.log("EmailJS initialized successfully with key:", publicKey.substring(0, 4) + "...");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error("EmailJS initialization error:", errorMessage);
    }
  }, []);
  
  // Add state for tracking active FAQ
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Toggle FAQ
  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Handle input change with typesafe approach
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Update form data, ensuring name is a valid key
    if (name === 'name' || name === 'email' || name === 'phone' || 
        name === 'subject' || name === 'message') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      // Clear error when user starts typing
      if (errors[name]) {
        const newErrors = { ...errors };
        delete newErrors[name];
        setErrors(newErrors);
      }
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    
    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: "" }); // Reset status
    
    try {
      // Get values from .env.local - using hardcoded values for reliability
      const serviceId = "service_ikspnml"; // Use the known working service ID
      const templateId = "template_6kbac1u"; // Use the known working template ID
      const publicKey = "nRHwdkPfgbKpsIBc0"; // Use the known working public key
      
      console.log("Attempting to send email with:", { 
        serviceId, 
        templateId,
        publicKey: publicKey.substring(0, 4) + "..."
      });
      
      // Update template parameters to match your EmailJS template exactly
      const templateParams = {
        from_name: formData.name,
        to_name: "Website Admin",
        reply_to: formData.email, 
        email: formData.email,
        phone: formData.phone || "Not provided",
        subject: formData.subject,
        message: formData.message
      };
      
      console.log("Template parameters:", {
        from_name: templateParams.from_name,
        to_name: templateParams.to_name,
        email: templateParams.email,
        phone: templateParams.phone,
        subject: templateParams.subject,
        message: `${templateParams.message.substring(0, 20)}...`
      });
      
      // Use a direct try-await with fixed values
      try {
        const result = await emailjs.send(
          serviceId,
          templateId,
          templateParams,
          publicKey
        );
        
        console.log("EmailJS send successful:", result);
        
        if (result.status === 200) {
          setSubmitStatus({
            success: true,
            message: "Your message has been sent successfully. We will get back to you soon!"
          });
          // Reset form
          setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: ""
          });
        } else {
          throw new Error(`Request returned unexpected status: ${result.status}`);
        }
      } catch (sendError: unknown) {
        console.error("EmailJS send error:", sendError);
        const errorText = sendError instanceof Error ? sendError.message : "Error sending email";
        throw new Error(errorText);
      }
    } catch (error: unknown) {
      console.error("Form submission error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      
      // Track failed attempts
      setFailedAttempts(prev => prev + 1);
      
      // Provide more specific guidance based on the error
      let userMessage = `Failed to send your message: ${errorMessage}.`;
      
      if (errorMessage.includes("NetworkError") || errorMessage.includes("Failed to fetch")) {
        userMessage = "Network error: Please check your internet connection and try again.";
      } else if (errorMessage.includes("timeout")) {
        userMessage = "The request timed out. Please try again later when the network is more stable.";
      } else if (errorMessage.includes("rate limit")) {
        userMessage = "Too many messages sent recently. Please wait a moment before trying again.";
      }
      
      setSubmitStatus({
        success: false,
        message: `${userMessage} Alternatively, please contact us directly at ${contactInfo.email} or ${contactInfo.phone}.`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to generate mailto link
  const generateMailtoLink = (): string => {
    const subject = encodeURIComponent(formData.subject || 'Contact Form Inquiry');
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n\n` +
      `Message:\n${formData.message}`
    );
    return `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
  };

  // Toggle between EmailJS and direct email
  const toggleEmailMethod = () => {
    setUseDirectEmail(!useDirectEmail);
    setSubmitStatus({ success: false, message: "" });
  };

  // FAQ Data
  const faqItems = [
    {
      question: "What services do you offer?",
      answer: "We specialize in full-stack web development, custom software solutions, e-commerce platforms, and digital marketing services tailored to your business needs."
    },
    {
      question: "How long does it take to complete a project?",
      answer: "Project timelines vary based on complexity and requirements. A simple website may just take 1-2 days, while complex applications can take 1-2 weeks. We'll provide a detailed timeline during consultation."
    },
    {
      question: "Do you work with clients internationally?",
      answer: "Yes, we work with clients globally! Our team has experience collaborating with businesses across different time zones to deliver exceptional results."
    },
    {
      question: "What is your payment structure?",
      answer: "We typically work with a 50% upfront payment and the remaining 50% upon project completion. For larger projects, we offer milestone-based payment schedules."
    },
    {
      question: "Do you provide ongoing maintenance and support?",
      answer: "Yes, we offer comprehensive maintenance and support packages to ensure your application runs smoothly after launch. Our team is always available to address any issues or implement new features."
    },
    {
      question: "What technologies do you specialize in?",
      answer: "We're proficient in a wide range of technologies including React, Next.js, Node.js, TypeScript, Python, Django, MongoDB, PostgreSQL, AWS, and more. We choose the best tech stack for each specific project's requirements."
    },
    {
      question: "Can you work with our existing team?",
      answer: "Yes, we're experienced in collaborative development. We can seamlessly integrate with your in-house team, providing specialized expertise where needed while maintaining clear communication and workflow alignment."
    },
    {
      question: "Do you offer custom design services?",
      answer: "Absolutely! Our design team specializes in creating intuitive, visually appealing interfaces customized to your brand. We follow user-centered design principles and conduct usability testing to ensure the best possible user experience."
    }
  ];

  return (
    <div className="min-h-screen pt-36 pb-24 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>
        <div className="absolute top-1/3 -left-24 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Get in 
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Touch
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {`We'd love to hear from you. Send us a message and we'll respond as soon as possible.`}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-8 shadow-lg h-full">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-indigo-600 mt-1">
                    <FaMapMarkerAlt className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900">Our Location</h3>
                    <p className="text-slate-600">{contactInfo.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="text-indigo-600 mt-1">
                    <FaPhone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900">Phone Number</h3>
                    <a href={`tel:${contactInfo.phone}`} className="text-slate-600 hover:text-indigo-600 transition-colors">
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="text-indigo-600 mt-1">
                    <FaEnvelope className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900">Email Address</h3>
                    <a href={`mailto:${contactInfo.email}`} className="text-slate-600 hover:text-indigo-600 transition-colors">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="text-indigo-600 mt-1">
                    <FaClock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900">Working Hours</h3>
                    <p className="text-slate-600">{contactInfo.hours}</p>
                  </div>
                </div>
              </div>
              
              {/* Map or additional info */}
              <div className="mt-8 pt-8 border-t border-slate-200">
                <h3 className="font-medium text-slate-900 mb-4">Connect With Us</h3>
                <p className="text-slate-600 mb-4">
                  Follow us on social media to stay updated with our latest projects and announcements.
                </p>
                <div className="flex gap-4">
                  {/* Social icons can be added here */}
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-8 shadow-lg" id="contact-form">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">Send us a Message</h2>
              
              {submitStatus.message ? (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg mb-6 flex items-center gap-3 ${
                    submitStatus.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {submitStatus.success ? (
                    <FaCheckCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <span className="w-5 h-5 flex-shrink-0">⚠️</span>
                  )}
                  <p>{submitStatus.message}</p>
                </motion.div>
              ) : null}
              
              {/* Show recommendation after multiple failed attempts */}
              {failedAttempts >= 2 && !useDirectEmail && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800"
                >
                  <p className="font-medium">Having trouble with the form?</p>
                  <p className="mt-1">We recommend using the direct email method instead. Click the checkbox above to switch methods.</p>
                  <button 
                    onClick={toggleEmailMethod}
                    className="mt-2 text-blue-700 font-medium underline hover:text-blue-900"
                  >
                    Switch to direct email now
                  </button>
                </motion.div>
              )}
              
              {/* Form Method Toggle */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="useDirectEmail"
                    checked={useDirectEmail}
                    onChange={toggleEmailMethod}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="useDirectEmail" className="text-sm text-slate-700">
                    Use direct email method instead
                  </label>
                </div>
                <div className="text-xs text-slate-500">
                  {useDirectEmail ? 'Using: Direct Email Link' : 'Using: Automated Form Submission'}
                </div>
              </div>
              
              {!useDirectEmail ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* EmailJS form */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {formFields.map((field) => (
                      <div key={field.id} className="space-y-2">
                        <label htmlFor={field.id} className="block text-sm font-medium text-slate-700">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          id={field.id}
                          name={field.id}
                          placeholder={field.placeholder}
                          value={formData[field.id]}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors[field.id as keyof FormErrors] ? "border-red-300 bg-red-50" : "border-slate-300"
                          } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors`}
                        />
                        {errors[field.id as keyof FormErrors] && (
                          <p className="text-red-600 text-sm mt-1">{errors[field.id as keyof FormErrors]}</p>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.message ? "border-red-300 bg-red-50" : "border-slate-300"
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors`}
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-600 text-sm mt-1">{errors.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full md:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center ${
                        isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                /* Direct Email Form */
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {formFields.map((field) => (
                      <div key={field.id} className="space-y-2">
                        <label htmlFor={`direct-${field.id}`} className="block text-sm font-medium text-slate-700">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          id={`direct-${field.id}`}
                          placeholder={field.placeholder}
                          value={formData[field.id]}
                          onChange={handleChange}
                          name={field.id}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="direct-message" className="block text-sm font-medium text-slate-700">
                      Your Message
                    </label>
                    <textarea
                      id="direct-message"
                      name="message"
                      rows={6}
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    ></textarea>
                  </div>
                  
                  <div>
                    <a
                      href={generateMailtoLink()}
                      className="inline-block w-full md:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-300 text-center"
                    >
                      Open Email Client & Send
                    </a>
                  </div>
                  
                  <div className="text-sm text-slate-600 bg-amber-50 p-4 rounded-lg border border-amber-100">
                    <p>This will open your default email application with a pre-filled message. You can review and send directly from your email client.</p>
                  </div>
                </div>
              )}
              
              <div className="mt-6 pt-6 border-t border-slate-200 text-slate-500 text-sm">
                <p>
                  {useDirectEmail ? 
                    "This option uses your default email client to send messages directly." :
                    "This contact form uses EmailJS to securely deliver your message directly to our inbox."
                  } Your information is never stored in a database and is only used to respond to your inquiry.
                </p>
                <p className="mt-2">
                  {`If you encounter any issues with the form, please reach out to us directly via email or phone.`}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {faqItems.map((faq, index) => (
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
        <div className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 opacity-90">
            Contact us today to discuss how we can help bring your vision to life.
          </p>
          <a
            href="#contact-form"
            className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transition-colors duration-300"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
