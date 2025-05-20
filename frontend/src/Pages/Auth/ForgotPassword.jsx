import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Upload, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API } from "../../context/API";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const navigator = useNavigate();
  const [isSending, setIsSending] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      console.log("run");
      setIsSending(true);
      try {
        const response = await API.post(`/password/change/opt`, {
          email: values.email,
        });
        toast.success(response.data.message);
        navigator(`/reset/password/${values.email}`);
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.error || "Internal Server Error");
      } finally {
        setIsSending(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: "300px",
              height: "300px",
              background: `linear-gradient(45deg, ${
                i === 0
                  ? "rgba(59, 130, 246, 0.1)"
                  : i === 1
                  ? "rgba(147, 51, 234, 0.1)"
                  : "rgba(236, 72, 153, 0.1)"
              })`,
              borderRadius: "40%",
              filter: "blur(40px)",
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              delay: i * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-md w-full">
        <Link
          to="/login"
          className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors relative z-10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Login
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Logo */}

          {/* Card Background Effects */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl transform rotate-2" />
          <div className="absolute -inset-4 bg-white/80 rounded-2xl backdrop-blur-xl" />

          {/* Form */}
          <div className="relative bg-white/90 backdrop-blur-xl rounded-xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <div className="text-center">
                <div className="inline-flex items-center space-x-2">
                  <Upload className="h-8 w-8 text-blue-600" />
                  <span className="text-2xl font-bold text-gray-900">
                    FileShare
                  </span>
                </div>
              </div>
              <p className="text-gray-600">
                Enter your email to reset your password
              </p>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all ${
                      formik.touched.email && formik.errors.email
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSending}
                className={`w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/20 transition-all ${
                  isSending && "opacity-50"
                }`}
              >
                {isSending ? (
                  <div className="flex justify-center align-middle">
                    <Loader className="h-5 w-5 mr-2 animate-spin" />
                    Sending...
                  </div>
                ) : (
                  "Send Reset Link"
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;
