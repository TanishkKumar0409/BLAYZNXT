import { useState } from "react";
import { motion } from "framer-motion";
import UploadForm from "./UploadForm";
import { FileText, Shield, Upload } from "lucide-react";
import LoginModal from "./LogiModal";
import { Link } from "react-router-dom";

const FloatingIcon = ({ icon, className, delay = 0 }) => (
  <motion.div
    className={`absolute ${className}`}
    animate={{
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      delay,
    }}
  >
    {icon}
  </motion.div>
);

const Hero = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/Images/featured_image.jpeg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
      </div>
      <FloatingIcon
        icon={<FileText className="h-8 w-8 text-blue-400/30" />}
        className="top-1/4 left-1/4"
        delay={0}
      />
      <FloatingIcon
        icon={<Shield className="h-10 w-10 text-purple-400/30" />}
        className="bottom-1/3 left-1/4"
        delay={1}
      />
      <FloatingIcon
        icon={<Upload className="h-12 w-12 text-pink-400/30" />}
        className="bottom-1/4 left-1/3"
        delay={2}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-7xl px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 font-medium mb-6"
            >
              Secure File Sharing Made Simple
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Share Files with
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  Confidence
                </span>
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-3 bg-blue-200/30 -z-10"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                />
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Experience secure, lightning-fast file sharing designed for modern
              teams and individuals. Upload, share, and collaborate with
              unmatched simplicity and security.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to={`/login`}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/20 transition-all transform hover:-translate-y-1"
              >
                Get Started Free
              </Link>
              <Link
                to={`/about`}
                className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-full hover:border-blue-500 hover:text-blue-500 transition-all transform hover:-translate-y-1"
              >
                Learn More
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex items-center space-x-8">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-sm text-gray-600">
                  Bank-grade Security
                </span>
              </div>
              <div className="flex items-center">
                <Upload className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-sm text-gray-600">Lightning Fast</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Upload Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Decorative Background */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl transform rotate-2" />
            <div className="absolute -inset-4 bg-white/80 rounded-2xl backdrop-blur-xl" />

            <div className="relative">
              <UploadForm setShowLoginModal={setShowLoginModal} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-20"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-white"
          />
        </svg>
      </div>
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </section>
  );
};

export default Hero;
