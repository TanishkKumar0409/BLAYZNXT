import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, FileText, File } from "lucide-react";
import { motion } from "framer-motion";
import { handlehide } from "../../context/CallBacks";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className={`lg:px-20 sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm ${handlehide(
        location.pathname
      )}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/Images/logo.png"
              alt="Logo"
              className="h-15 w-auto object-cover"
            />
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>

          <div
            className={`
            absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto
            bg-white md:bg-transparent shadow-lg md:shadow-none
            ${isMenuOpen ? "block" : "hidden"} md:block
            transition-all duration-200 ease-in-out
          `}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center p-4 md:p-0 space-y-4 md:space-y-0 md:space-x-6">
              <Link
                to="/"
                className={`relative  hover:text-blue-600 transition-colors w-full md:w-auto ${
                  isActive("/")
                    ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text"
                    : "text-gray-700"
                }`}
              >
                Home
                {isActive("/") && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </Link>
              <Link
                to="/about"
                className={`relative  hover:text-blue-600 transition-colors w-full md:w-auto ${
                  isActive("/about")
                    ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text"
                    : "text-gray-700"
                }`}
              >
                About Us
                {isActive("/about") && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </Link>
              <Link
                to="/contact"
                className={`relative hover:text-blue-600 transition-colors w-full md:w-auto ${
                  isActive("/contact")
                    ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text"
                    : "text-gray-700"
                }`}
              >
                Contact Us
                {isActive("/contact") && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </Link>

              <Link
                to="/login"
                className="px-5 py-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/20 transition-all transform hover:-translate-y-1"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
