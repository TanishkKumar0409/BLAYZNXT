import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Logo */}
          <div className="text-center">
            <Link to={`/`} className="inline-flex items-center space-x-2">
              <img
                src="/Images/logo.png"
                className="w-auto h-20 relative z-10"
                alt=""
              />
            </Link>
          </div>

          {/* Card Background Effects */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl transform rotate-2" />
          <div className="absolute -inset-4 bg-white/80 rounded-2xl backdrop-blur-xl" />

          {/* Form Container */}
          <div className="relative backdrop-blur-xl rounded-xl p-8 pt-0">
            <div className="text-center mb-8">
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
