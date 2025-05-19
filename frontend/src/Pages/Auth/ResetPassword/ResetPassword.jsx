import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Upload, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import OTPVerificationForm from "./ResetPasswordComponents/OptVerificationForm";
import NewPasswordForm from "./ResetPasswordComponents/NewPasswordForm";
import toast from "react-hot-toast";
import { API } from "../../../context/API";

const ResetPassword = () => {
  const { email } = useParams();
  const navigator = useNavigate();
  const [currentStep, setCurrentStep] = useState("otp");
  const [verifiedOTP, setVerifiedOTP] = useState("");

  const handleOTPVerified = (otp) => {
    setVerifiedOTP(otp);
    setCurrentStep("password");
  };

  const handleResetComplete = async (values) => {
    try {
      const payload = { ...values, otp: verifiedOTP, email };
      const response = await API.post(`/password/change`, payload);
      toast.success(response.data.message);
      navigator(`/`);
    } catch (error) {
      toast.error(error?.response?.data?.error || "Internal Server Error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* <AnimatedBackground /> */}

      <div className="max-w-md w-full">
        <Link
          to="/login"
          className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors"
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
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2">
              <Upload className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">
                FileShare
              </span>
            </div>
          </div>

          {/* Card Background Effects */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl transform rotate-2" />
          <div className="absolute -inset-4 bg-white/80 rounded-2xl backdrop-blur-xl" />

          {/* Form Container */}
          <div className="relative bg-white/90 backdrop-blur-xl rounded-xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Reset Password
              </h2>
              <p className="text-gray-600">
                {currentStep === "otp"
                  ? "Enter the verification code sent to your email"
                  : "Create a new password for your account"}
              </p>
            </div>

            {/* Steps indicator */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    currentStep === "otp"
                      ? "bg-blue-600 text-white"
                      : "bg-blue-200 text-blue-800"
                  }`}
                >
                  1
                </div>
                <div
                  className={`w-12 h-1 ${
                    currentStep === "password" ? "bg-blue-600" : "bg-blue-200"
                  }`}
                ></div>
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    currentStep === "password"
                      ? "bg-blue-600 text-white"
                      : "bg-blue-200 text-blue-800"
                  }`}
                >
                  2
                </div>
              </div>
            </div>

            {currentStep === "otp" ? (
              <OTPVerificationForm onOTPVerified={handleOTPVerified} />
            ) : (
              <NewPasswordForm onResetComplete={handleResetComplete} />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPassword;
