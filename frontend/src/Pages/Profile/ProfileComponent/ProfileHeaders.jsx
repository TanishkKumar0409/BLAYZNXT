import { useState } from "react";
import { User, Edit, Trash2 } from "lucide-react";
import DeleteProfileImageModal from "./Modals/DeleteProfileImageModal";

const ProfileHeader = ({ profile, handleFileChange }) => {
  const [isDeletingProfile, setIsDeletingProfile] = useState(false);
  return (
    <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-8 py-16 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]" />
      <div className="relative flex flex-col items-center z-10">
        <div className="relative group">
          <div className="w-36 h-36 bg-white rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-lg overflow-hidden transition-all duration-300">
            {profile?.profile ? (
              <img
                src={`${import.meta.env.VITE_API_URL}/${profile?.profile}`}
                alt={profile?.username || "User"}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            ) : (
              <User className="w-20 h-20 text-indigo-500" />
            )}
          </div>
          <div className="w-36 h-36 absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="absolute inset-0 bg-black/40 rounded-full"></div>
            <div className="flex gap-2 z-10">
              <label className="bg-white rounded-full p-2.5 shadow-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <Edit className="w-5 h-5 text-gray-700" />
              </label>

              {profile?.profile && (
                <button
                  onClick={() => setIsDeletingProfile(true)}
                  className="bg-white rounded-full p-2.5 shadow-lg cursor-pointer hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              )}
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white tracking-tight">
          {profile.username || "User"}
        </h1>

        {profile?.isVerified ? (
          <div className="mt-2 px-3 py-1 bg-green-500/20 backdrop-blur-sm text-green-50 text-sm font-medium rounded-full">
            Verified Account
          </div>
        ) : (
          <div className="mt-2 px-3 py-1 bg-amber-500/20 backdrop-blur-sm text-amber-50 text-sm font-medium rounded-full">
            Unverified Account
          </div>
        )}
      </div>
      {isDeletingProfile && (
        <DeleteProfileImageModal setIsDeletingProfile={setIsDeletingProfile} />
      )}
    </div>
  );
};

export default ProfileHeader;
