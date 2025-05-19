import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Zap, Globe, Award, ServerCrash } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
          >
            Why Choose FileShare?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="text-lg text-gray-700"
          >
            We combine cutting-edge technology with user-friendly design to
            provide the most secure and efficient file sharing platform
            available.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Shield className="h-10 w-10 text-blue-600" />}
            title="Enhanced Security"
            description="End-to-end encryption ensures your files remain private and secure from upload to download."
            delay={0}
          />
          <FeatureCard
            icon={<Lock className="h-10 w-10 text-purple-600" />}
            title="Access Control"
            description="Define who can view, edit, or share your files with granular permission settings."
            delay={0.1}
          />
          <FeatureCard
            icon={<Zap className="h-10 w-10 text-pink-600" />}
            title="Lightning Fast"
            description="Optimized transfer protocols ensure your files upload and download at maximum speed."
            delay={0.2}
          />
          <FeatureCard
            icon={<Globe className="h-10 w-10 text-blue-600" />}
            title="Global Access"
            description="Access your files from anywhere in the world, on any device, with our responsive platform."
            delay={0.6}
          />
          <FeatureCard
            icon={<Award className="h-10 w-10 text-purple-600" />}
            title="Compliance Ready"
            description="Meet regulatory requirements with our GDPR, HIPAA, and SOC 2 compliant platform."
            delay={0.7}
          />
          <FeatureCard
            icon={<ServerCrash className="h-10 w-10 text-pink-600" />}
            title="Disaster Recovery"
            description="Multiple redundant systems ensure your data is safe even in the event of hardware failures."
            delay={0.8}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            How It Works
          </h3>
          <div className="flex flex-col md:flex-row justify-center items-center md:space-x-8 space-y-8 md:space-y-0">
            <StepCard
              number="1"
              title="Upload Files"
              description="Select and upload any files you want to share through our secure interface."
            />
            <div className="hidden md:block text-gray-300">
              <ArrowSvg />
            </div>
            <StepCard
              number="2"
              title="Enter Receiver's Email"
              description="Provide the email address of the person you want to share the files with."
            />
            <div className="hidden md:block text-gray-300">
              <ArrowSvg />
            </div>
            <StepCard
              number="3"
              title="Click Share"
              description="Click the Share button to send an email to the receiver with the download link."
            />
            <div className="hidden md:block text-gray-300">
              <ArrowSvg />
            </div>
            <StepCard
              number="4"
              title="Manual Link Sharing"
              description="You can also copy and share the link manually with anyone you wish."
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const StepCard = ({ number, title, description }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm w-full md:w-64">
    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center text-xl font-bold mb-4">
      {number}
    </div>
    <h4 className="text-xl font-semibold text-gray-900 mb-2">{title}</h4>
    <p className="text-gray-600">{description}</p>
  </div>
);

const ArrowSvg = () => {
  return (
    <svg
      width="40"
      height="24"
      viewBox="0 0 40 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M39.0607 13.0607C39.6464 12.4749 39.6464 11.5251 39.0607 10.9393L29.5147 1.3934C28.9289 0.807611 27.9792 0.807611 27.3934 1.3934C26.8076 1.97919 26.8076 2.92893 27.3934 3.51472L35.8787 12L27.3934 20.4853C26.8076 21.0711 26.8076 22.0208 27.3934 22.6066C27.9792 23.1924 28.9289 23.1924 29.5147 22.6066L39.0607 13.0607ZM0 13.5H38V10.5H0V13.5Z"
        fill="currentColor"
      />
    </svg>
  );
};
export default FeaturesSection;
