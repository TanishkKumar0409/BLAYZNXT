import React from "react";
import { motion } from "framer-motion";
import { Shield, Users, Globe, Zap } from "lucide-react";

const MissionSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl transform rotate-2 opacity-70" />
            <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
              <img
                src="/Images/home_about.jpeg"
                alt="Team working together"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                our aim is to empower individuals and companies with secure file
                sharing products to safeguard information while facilitating
                effortless collaboration.
              </p>
              <p className="text-lg text-gray-700">
                We believe that technology should serve people, not the other
                way of avoiding. That's why we've constructed with security,
                simpllicity, and accessibility at its very center.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Who We Are
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <ValueCard
                  icon={<Shield className="h-8 w-8 text-blue-600" />}
                  title="Security-First"
                  description="We prioritize the protection of your data with bank-grade encryption and robust security protocols."
                />
                <ValueCard
                  icon={<Users className="h-8 w-8 text-purple-600" />}
                  title="People-Centered"
                  description="We design our solutions with real people in mind, prioritizing intuitive interfaces and seamless experiences."
                />
                <ValueCard
                  icon={<Globe className="h-8 w-8 text-pink-600" />}
                  title="Globally Accessible"
                  description="We ensure our platform is accessible to everyone, regardless of location or technical expertise."
                />
                <ValueCard
                  icon={<Zap className="h-8 w-8 text-amber-500" />}
                  title="Efficiency-Driven"
                  description="We constantly optimize our systems to provide lightning-fast file transfers and minimal friction."
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ValueCard = ({ icon, title, description }) => (
  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
    <div className="mb-4">{icon}</div>
    <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default MissionSection;
