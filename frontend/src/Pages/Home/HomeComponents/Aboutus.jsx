import React from "react";
import { motion } from "framer-motion";
import { Shield, Users } from "lucide-react";

const About = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/Images/home_about.jpeg"
                alt="Team Collaboration"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            {/* <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-blue-600" />
                <span className="font-semibold text-gray-900">
                  10M+ Users Trust Us
                </span>
              </div>
            </div> */}
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Empowering Teams with Secure File Sharing
            </h2>
            <p className="text-lg text-gray-600">
              Since 2025, we've been revolutionizing how teams share and
              collaborate on files. Our platform combines enterprise-grade
              security with intuitive design, making file sharing both safe and
              simple.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-blue-600">
                  <Shield className="h-5 w-5" />
                  <span className="font-semibold">Enterprise Security</span>
                </div>
                <p className="text-gray-600">
                  Bank-level encryption for all your files
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-purple-600">
                  <Users className="h-5 w-5" />
                  <span className="font-semibold">Global Scale</span>
                </div>
                <p className="text-gray-600">Trusted by teams worldwide</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
