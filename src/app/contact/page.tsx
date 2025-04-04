"use client";
import React, { useState, FormEvent, useEffect } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaCheckCircle, FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Link } from "lucide-react";

// EmailJS configuration
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';

// Contact information
const contactInfo = {
  address: "Karachi, Sindh, Pakistan",
  phone: "+92 301 2381884",
  email: "yousufhere.dev@gmail.com",
  hours: "Monday - Sunday: 9:00 AM - 12:00 AM"
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
      const publicKey = EMAILJS_PUBLIC_KEY;

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

      const templateId = EMAILJS_TEMPLATE_ID;
      const publicKey = EMAILJS_PUBLIC_KEY;
      const serviceId = EMAILJS_SERVICE_ID;
      1
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
                  className={`p-4 rounded-lg mb-6 flex items-center gap-3 ${submitStatus.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
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
                          className={`w-full px-4 py-3 rounded-lg border ${errors[field.id as keyof FormErrors] ? "border-red-300 bg-red-50" : "border-slate-300"
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
                      className={`w-full px-4 py-3 rounded-lg border ${errors.message ? "border-red-300 bg-red-50" : "border-slate-300"
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
                      className={`w-full md:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
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
                    <Link
                      href={generateMailtoLink()}
                      className="inline-block w-full md:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-300 text-center"
                    >
                      Open Email Client & Send
                    </Link>
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
                    "Your information is never stored in a database and is only used to respond to your inquiry."
                  } 
                  
                </p>
                <p className="mt-2">
                  {`If you encounter any issues with the form, please reach out to us directly via email or phone.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
