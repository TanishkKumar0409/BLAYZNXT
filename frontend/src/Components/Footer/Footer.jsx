import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileUp,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Send,
  Globe,
} from "lucide-react";
import { API } from "../../context/API";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        const response = await API.post(`/newsletter`, { email });
        setIsSubscribed(response.data.message);
        setEmail("");
      } catch (error) {
        setIsSubscribed(error.response.data.error);
      }
    }
  };

  return (
    <footer className="pt-16 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Stay Updated
          </h3>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter for the latest updates, security tips,
            and exclusive offers.
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/20 transition-all flex items-center justify-center"
            >
              <Send className="h-5 w-5 mr-2" />
              Subscribe
            </button>
          </form>
          {isSubscribed && (
            <p className="text-green-600 mt-4">{isSubscribed}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company & Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <FileUp className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                FileShare
              </span>
            </div>
            <p className="text-gray-600 mb-6">
              Experience secure, lightning-fast file sharing designed for modern
              teams and individuals.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Facebook size={18} />} />
              <SocialIcon icon={<Instagram size={18} />} />
              <SocialIcon icon={<Linkedin size={18} />} />
              <SocialIcon icon={<Youtube size={18} />} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/about" label="About Us" />
              <FooterLink to="/contact" label="Contact" />
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <FooterLink to="/legal/privacy-policy" label="Privacy Policy" />
              <FooterLink
                to="/legal/terms-and-conditions"
                label="Terms and Conditions"
              />
              <FooterLink to="/legal/disclaimers" label="Disclaimers" />
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail
                  size={18}
                  className="text-blue-600 mr-2 mt-1 flex-shrink-0"
                />
                <span className="text-gray-600">example@gmail.com</span>
              </li>
              <li className="flex items-start">
                <Phone
                  size={18}
                  className="text-blue-600 mr-2 mt-1 flex-shrink-0"
                />
                <span className="text-gray-600">+91 12345 67890</span>
              </li>
              <li className="flex items-start">
                <Globe
                  size={18}
                  className="text-blue-600 mr-2 mt-1 flex-shrink-0"
                />
                <span className="text-gray-600">www.fileshare.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} FileShare. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

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
const FooterLink = ({ to, label }) => (
  <li>
    <Link
      to={to}
      className="text-gray-600 hover:text-blue-600 transition-colors"
    >
      {label}
    </Link>
  </li>
);

export default Footer;
