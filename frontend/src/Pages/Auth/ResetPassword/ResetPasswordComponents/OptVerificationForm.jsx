import React, { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

const OTPVerificationForm = ({ onOTPVerified }) => {
  const [resendCountdown, setResendCountdown] = useState(0);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(
        () => setResendCountdown((prev) => prev - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const formik = useFormik({
    initialValues: {
      otp: ["", "", "", "", "", ""],
    },
    validationSchema: Yup.object({
      otp: Yup.array()
        .of(Yup.string().required("").length(1, ""))
        .length(6, "Please enter all 6 digits")
        .required("Verification code is required"),
    }),
    onSubmit: (values) => {
      const fullOtp = values.otp.join("");
      onOTPVerified(fullOtp);
    },
  });

  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...formik.values.otp];
      newOtp[index] = value;
      formik.setFieldValue("otp", newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !formik.values.otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOTP = () => {
    if (resendCountdown > 0) return;
    setResendCountdown(60);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Verification Code
        </label>
        <div className="flex justify-between gap-2">
          {formik.values.otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              ref={(el) => (inputRefs.current[index] = el)}
              value={digit}
              onChange={(e) =>
                handleOtpChange(index, e.target.value.replace(/\D/g, ""))
              }
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`w-12 h-12 text-center text-lg font-semibold border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all ${
                formik.errors.otp ? "border-red-300" : "border-gray-300"
              }`}
              maxLength={1}
              inputMode="numeric"
              autoComplete="one-time-code"
              required
            />
          ))}
        </div>
        {formik.errors.otp && typeof formik.errors.otp === "string" && (
          <p className="mt-2 text-sm text-red-500">{formik.errors.otp}</p>
        )}
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={handleResendOTP}
          disabled={resendCountdown > 0}
          className="text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400 transition-colors"
        >
          {resendCountdown > 0 ? (
            <span className="flex items-center justify-center">
              Resend code in {resendCountdown}s
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <RefreshCw className="h-3 w-3 mr-1" /> Resend verification code
            </span>
          )}
        </button>
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/20 transition-all disabled:opacity-70`}
      >
        Continue
      </motion.button>
    </form>
  );
};

export default OTPVerificationForm;
