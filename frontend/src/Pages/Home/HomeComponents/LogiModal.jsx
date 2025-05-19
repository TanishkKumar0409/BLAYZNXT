import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

const LoginModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative bg-white rounded-xl shadow-2xl p-6 max-w-md w-full"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center mb-6">
              <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-4">
                <LogIn className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Login Required
              </h3>
              <p className="text-gray-600 mt-2">
                Please login to your account to share files
              </p>
            </div>

            <Link
              to="/login"
              className="block w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-3 rounded-lg text-center hover:shadow-lg transition-all transform hover:-translate-y-1"
              onClick={onClose}
            >
              Login Now
            </Link>

            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-500"
                onClick={onClose}
              >
                Register
              </Link>
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
