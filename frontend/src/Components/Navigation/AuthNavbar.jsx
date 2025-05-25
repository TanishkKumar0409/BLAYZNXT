import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { handlehide, handleLogout } from "../../context/CallBacks";
import {
  Menu,
  X,
  User,
  User2,
  LogOut,
  ShieldCheck,
  UserRound,
  MessageCircleQuestion,
  MailCheck,
  Scale,
} from "lucide-react";
import { motion } from "framer-motion";
import { API } from "../../context/API";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const [profile, setProfile] = useState("");
  const getProfile = useCallback(async () => {
    try {
      const response = await API.get(`/profile`);
      setProfile(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const isActive = (path) => {
    if (location.pathname === path) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <nav
      className={`sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm ${handlehide(
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

          {/* Mobile menu button */}
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

          {/* Desktop Navigation */}
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
                to={`/main/${profile?.username}`}
                className={`relative  hover:text-blue-600 transition-colors w-full md:w-auto ${
                  isActive(`/main/${profile?.username}`)
                    ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text"
                    : "text-gray-700"
                }`}
              >
                Home
                {isActive(`/main/${profile?.username}`) && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </Link>
              <Link
                to={`/main/${profile?.username}/storage`}
                className={`relative  hover:text-blue-600 transition-colors w-full md:w-auto ${
                  isActive(`/main/${profile?.username}/storage`)
                    ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text"
                    : "text-gray-700"
                }`}
              >
                Storage
                {isActive(`/main/${profile?.username}/storage`) && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </Link>
              <Link
                to={`/main/${profile?.username}/history`}
                className={`relative  hover:text-blue-600 transition-colors w-full md:w-auto ${
                  isActive(`/main/${profile?.username}/history`)
                    ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text"
                    : "text-gray-700"
                }`}
              >
                History
                {isActive(`/main/${profile?.username}/history`) && (
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

              {profile?.role === "ADMIN" && (
                <div className="relative group w-full md:w-auto">
                  <button className="md:flex hidden items-center text-gray-700 hover:text-blue-600 transition-colors w-full md:w-auto">
                    ADMIN
                  </button>
                  <div
                    className="
                  md:absolute md:right-0 md:mt-0 w-full md:w-48 
                  bg-white md:shadow-sm rounded-md 
                  md:hidden group-hover:block overflow-hidden
                "
                  >
                    <Link
                      to={`/main/${profile?.username}/dashboard/admin`}
                      className="flex items-center md:px-4 py-2 text-gray-700 hover:bg-blue-50"
                    >
                      <ShieldCheck className="w-4 h-4 mr-2" />
                      All Admins
                    </Link>
                    <Link
                      to={`/main/${profile?.username}/dashboard/user`}
                      className="flex items-center md:px-4 py-2 text-gray-700 hover:bg-blue-50"
                    >
                      <UserRound className="w-4 h-4 mr-2" />
                      All Users
                    </Link>
                    <Link
                      to={`/main/${profile?.username}/dashboard/query/contact`}
                      className="flex items-center md:px-4 py-2 text-gray-700 hover:bg-blue-50"
                    >
                      <MessageCircleQuestion className="w-4 h-4 mr-2" />
                      All Queries
                    </Link>
                    <Link
                      to={`/main/${profile?.username}/dashboard/query/newsletters`}
                      className="flex items-center md:px-4 py-2 text-gray-700 hover:bg-blue-50"
                    >
                      <MailCheck className="w-4 h-4 mr-2" />
                      All Newsletter
                    </Link>
                    <Link
                      to={`/main/${profile?.username}/dashboard/legal/updates`}
                      className="flex items-center md:px-4 py-2 text-gray-700 hover:bg-blue-50"
                    >
                      <Scale className="w-4 h-4 mr-2" />
                      Legals
                    </Link>
                  </div>
                </div>
              )}

              {/* Notifications Dropdown */}
              <div className="relative group w-full md:w-auto">
                <button className="md:flex hidden items-center justify-center text-gray-600  font-bold hover:text-black w-10 h-10 rounded-full overflow-hidden bg-gray-100 hover:bg-gray-200 transition-colors shadow-md">
                  {profile?.profile ? (
                    <img
                      src={`${import.meta.env.VITE_API_URL}/${
                        profile?.profile
                      }`}
                      alt={profile?.username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 " />
                  )}
                </button>
                <div
                  className="
                  md:absolute md:right-0 md:mt-0 w-full md:w-48 
                  bg-white md:shadow-sm rounded-md 
                  md:hidden group-hover:block overflow-hidden
                "
                >
                  <Link
                    to={`/main/${profile?.username}/profile`}
                    className="flex items-center md:px-4 py-2 text-gray-700 hover:bg-blue-50"
                  >
                    <User2 className="w-4 h-4 mr-2" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full md:px-4 py-2 text-gray-700 hover:bg-blue-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
