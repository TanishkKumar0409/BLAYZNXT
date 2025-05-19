import { useState } from "react";
import { X, AlertTriangle, Mail, Lock, Loader } from "lucide-react";
import { API } from "../../../../context/API";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const DeleteAccountModal = ({ onClose, email }) => {
  const { username } = useParams();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");

  const handleSendEmail = async () => {
    if (!password) return;

    try {
      setIsSendingEmail(true);
      const response = await API.post(`/user/delete/account/otp`, {
        email,
        password,
      });
      toast.success(response.data.message);
      setShowOTP(true);
      setIsSendingEmail(false);
    } catch (error) {
      setIsSendingEmail(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleDeleteAccount = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) return;

    setIsDeleting(true);
    try {
      const otpString = otp.join("");
      const response = await API.post(`/user/delete/account/${username}`, {
        deletionOtp: otpString,
      });
      toast(response.data.message);
      window.location.href = "/";
    } catch (error) {
      toast.error(error?.response?.data?.error || "Internal Server Error");
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden animate-modal-appear">
        <div className="bg-red-50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
            <h2 className="text-xl font-semibold text-red-700">
              Delete Account
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {!showOTP ? (
            <>
              <p className="text-gray-700 mb-4">
                This action{" "}
                <span className="font-semibold">cannot be undone</span>. We'll
                send a verification code to your email:
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 flex items-center">
                <Mail className="w-5 h-5 text-gray-400 mr-3" />
                <p className="font-medium text-gray-800">{email}</p>
              </div>

              <div className="mb-3 relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="text-right">
                <button
                  onClick={() => toast("Redirect to forgot password page")}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Forgot Password?
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-700 mb-6">
                Enter the 6-digit code sent to your email to confirm account
                deletion.
              </p>

              <div className="flex justify-center gap-2 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none"
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-red-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-red-700 border-2 border-red-700 rounded-lg hover:bg-red-100 transition-colors"
          >
            Cancel
          </button>
          {!showOTP ? (
            <button
              onClick={handleSendEmail}
              disabled={isSendingEmail || !password}
              className={`px-4 py-2 text-white bg-red-600 rounded-lg transition-colors flex items-center ${
                !isSendingEmail && password
                  ? "hover:bg-red-700"
                  : "opacity-70 cursor-not-allowed"
              }`}
            >
              {isSendingEmail ? (
                <>
                  <Loader className="h-5 w-5 mr-2 animate-spin" />
                  Sending Email...
                </>
              ) : (
                "Send Verification Email"
              )}
            </button>
          ) : (
            <button
              onClick={handleDeleteAccount}
              disabled={isDeleting || otp.join("").length !== 6}
              className={`px-4 py-2 text-white bg-red-600 rounded-lg transition-colors flex items-center ${
                !isDeleting && otp.join("").length === 6
                  ? "hover:bg-red-700"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              {isDeleting ? (
                <>
                  <Loader className="h-5 w-5 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Account"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
