import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Key, CheckCircle } from "lucide-react";

const SecurityPromise = () => {
  const securityPoints = [
    "End-to-end encryption for all files",
    "Zero-knowledge architecture",
    "Regular security audits",
    "Expiring Download Links",
    "Account Activity Notifications",
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-purple-50 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 font-medium mb-4"
              >
                Bank-Grade Security
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Security Promise
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl">
                Your security is our top priority. We employ industry-leading
                measures and advanced encryption protocols to keep your files
                safe and private.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {securityPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center space-x-2"
                >
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{point}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              Learn More About Security
            </motion.button>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Background Decoration */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl transform rotate-3" />
              <div className="absolute -inset-4 bg-white/80 rounded-2xl backdrop-blur-xl" />

              {/* Content */}
              <div className="relative grid gap-6">
                {[
                  {
                    icon: <Shield className="h-8 w-8 text-blue-600" />,
                    title: "End-to-End Encryption",
                    description:
                      "Your files are encrypted in transit and at rest using AES-256 encryption.",
                  },
                  {
                    icon: <Key className="h-8 w-8 text-green-600" />,
                    title: "Data Privacy",
                    description:
                      "We never access your files without explicit permission.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
                  >
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-3 rounded-lg inline-block mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SecurityPromise;
