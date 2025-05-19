import { useState } from "react";
import { X, Mail, Loader } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { handleResendVerifyOpt } from "../../../../context/CallBacks";

const VerifyEmailModal = ({ email, onClose }) => {
  const navigator = useNavigate();
  const { username } = useParams();
  const [isSending, setIsSending] = useState(false);

  const handleSendVerification = async () => {
    setIsSending(true);
    try {
      await handleResendVerifyOpt(username);
      navigator(`/verify/${username}`);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden animate-modal-appear">
        <div className="bg-indigo-50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Mail className="w-6 h-6 text-indigo-500 mr-3" />
            <h2 className="text-xl font-semibold text-indigo-700">
              Verify Email
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5">
          <p className="text-gray-700 mb-4">
            We'll send a verification link to your email address:
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-5">
            <p className="font-medium text-gray-800">{email}</p>
          </div>

          <p className="text-sm text-gray-600">
            After clicking the link in the email, your account will be verified,
            and you'll have full access to all features.
          </p>
        </div>

        <div className="px-6 py-4 bg-indigo-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-indigo-700 border-2 border-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSendVerification}
            disabled={isSending}
            className={`px-4 py-2 text-white bg-indigo-600 rounded-lg transition-colors flex items-center ${
              !isSending
                ? "hover:bg-indigo-700"
                : "opacity-70 cursor-not-allowed"
            }`}
          >
            {isSending ? (
              <>
                <Loader className="h-5 w-5 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Verification Email"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailModal;
