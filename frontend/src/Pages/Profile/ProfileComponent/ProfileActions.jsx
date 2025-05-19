import { useState } from "react";
import { LogOut, UserX, Mail, Lock } from "lucide-react";
import DeleteAccountModal from "./Modals/DeleteAccountModal";
import VerifyEmailModal from "./Modals/VerifyEmailModal";
import { handleLogout } from "../../../context/CallBacks";
import { Link } from "react-router-dom";

const ProfileActions = ({ profile }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  return (
    <div className="px-8 pb-8">
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Account Actions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to={`/forgot-password`}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-medium rounded-lg shadow-sm transition-all duration-300"
          >
            <Lock className="w-5 h-5" />
            Reset Password
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-all duration-300"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-red-200 hover:bg-red-50 text-red-600 font-medium rounded-lg transition-all duration-300"
          >
            <UserX className="w-5 h-5" />
            Delete Account
          </button>
          {!profile.isVerified && (
            <button
              onClick={() => setShowVerifyModal(true)}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-medium rounded-lg shadow-sm transition-all duration-300"
            >
              <Mail className="w-5 h-5" />
              Verify Email
            </button>
          )}
        </div>
      </div>

      {showDeleteModal && (
        <DeleteAccountModal
          email={profile?.email}
          onClose={() => setShowDeleteModal(false)}
        />
      )}

      {showVerifyModal && (
        <VerifyEmailModal
          email={profile?.email}
          onClose={() => setShowVerifyModal(false)}
        />
      )}
    </div>
  );
};

export default ProfileActions;
