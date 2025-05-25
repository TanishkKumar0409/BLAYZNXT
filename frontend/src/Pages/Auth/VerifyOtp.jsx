import { motion } from "framer-motion";
import { Upload, ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { API } from "../../context/API";
import { VerifyOptValidation } from "../../context/ValidationSchemas";
import { handleResendVerifyOpt } from "../../context/CallBacks";
import toast from "react-hot-toast";

const VerifyOTP = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      otp: ["", "", "", "", "", ""],
    },
    validationSchema: VerifyOptValidation,
    onSubmit: async (values) => {
      const otpString = values.otp.join("");
      try {
        const response = await API.post(`/verify/${username}`, {
          otp: otpString,
        });
        toast.success(response.data.message);
        navigate(`/login`);
      } catch (error) {
        toast.error(error?.response?.data?.error || "Internal Server Error");
      }
    },
  });

  const handleOTPChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOTP = [...formik.values.otp];
      newOTP[index] = value;
      formik.setFieldValue("otp", newOTP);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !formik.values.otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

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

          {/* Form */}
          <div className="relative backdrop-blur-xl rounded-xl p-8 pt-0">
            <div className="text-center mb-8">
              <p className="text-gray-600">
                Enter the 6-digit code sent to your email
              </p>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <div className="flex justify-center space-x-4">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={formik.values.otp[index]}
                      onChange={(e) => handleOTPChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ))}
                </div>
                {formik.errors.otp && (
                  <p className="mt-2 text-sm text-red-500 text-center">
                    {formik.errors.otp}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/20 transition-all"
              >
                Verify OTP
              </motion.button>

              <p className="text-center text-sm text-gray-600">
                Didn't receive the code?{" "}
                <button
                  type="button"
                  onClick={() => handleResendVerifyOpt(username)}
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Resend
                </button>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyOTP;
