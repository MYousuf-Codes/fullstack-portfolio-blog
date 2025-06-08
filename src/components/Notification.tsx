"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

interface NotificationProps {
  show: boolean;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ show, onClose }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (show) {
      let frame = 0;
      const interval = setInterval(() => {
        frame += 1;
        setProgress(100 - frame * 2); // reduces to 0% in 5s
        if (frame >= 50) {
          clearInterval(interval);
          onClose();
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
        >
          <div className="bg-white rounded-3xl shadow-2xl px-8 py-6 w-full max-w-md mx-auto text-center pointer-events-auto border border-green-300">
            <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
            <p className="text-lg font-semibold text-gray-800">
              You’ve successfully subscribed to{" "}
              <span className="text-green-600 font-bold">MYousaf-Codes</span>!
            </p>
            <p className="text-sm text-gray-500 mt-1">
              You’ll receive our latest newsletters and updates.
            </p>

            <div className="mt-5 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
