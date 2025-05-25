import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Globe,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

const ContactInfo = () => {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Get in Touch
        <span className="block mt-2 w-20 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600"></span>
      </h2>

      <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-100">
        <p className="text-gray-700 mb-6">
          We're here to address any questions you have regarding our services,
          pricing, or how FileShare can benefit your business. Contact us
          through any of the following options.
        </p>

        <div className="space-y-4">
          <InfoItem
            icon={<Mail className="h-5 w-5 text-blue-600" />}
            label="Email Us"
            value={import.meta.env.VITE_APP_EMAIL}
            link={`mailto:${import.meta.env.VITE_APP_EMAIL}`}
          />

          <InfoItem
            icon={<Phone className="h-5 w-5 text-blue-600" />}
            label="Call Us"
            value={import.meta.env.VITE_APP_CONTACT}
            link={`tel:${import.meta.env.VITE_APP_CONTACT}`}
          />

          <InfoItem
            icon={<Globe className="h-5 w-5 text-blue-600" />}
            label="Website"
            value={import.meta.env.VITE_APP_URL}
            link={import.meta.env.VITE_APP_URL}
          />
        </div>
      </div>

      <div className="mt-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>

        <div className="flex space-x-3">
          <SocialIcon icon={<Twitter className="h-5 w-5" />} label="Twitter" />
          <SocialIcon
            icon={<Facebook className="h-5 w-5" />}
            label="Facebook"
          />
          <SocialIcon
            icon={<Instagram className="h-5 w-5" />}
            label="Instagram"
          />
          <SocialIcon
            icon={<Linkedin className="h-5 w-5" />}
            label="LinkedIn"
          />
          <SocialIcon icon={<Youtube className="h-5 w-5" />} label="YouTube" />
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value, link }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 mt-1">{icon}</div>
    <div className="ml-4">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      {link ? (
        <a
          href={link}
          className="text-gray-900 hover:text-blue-600 transition-colors"
          target={link.startsWith("http") ? "_blank" : undefined}
          rel={link.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {value}
        </a>
      ) : (
        <p className="text-gray-900">{value}</p>
      )}
    </div>
  </div>
);

const SocialIcon = ({ icon, label }) => (
  <motion.a
    href="#"
    aria-label={label}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gradient-to-r from-blue-600 to-purple-600 hover:text-white transition-colors"
  >
    {icon}
  </motion.a>
);

export default ContactInfo;
