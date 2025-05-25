import React, { useState } from "react";
import { X, ImageOff, Loader } from "lucide-react";
import { API } from "../../../../context/API";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const DeleteProfileImageModal = ({ setIsDeletingProfile }) => {
  const { username } = useParams();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteProfile = async () => {
    setIsDeleting(true);
    try {
      const response = await API.delete(`/user/${username}`);
      toast.success(response.data.message);
      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data?.error || "Internal Server Error");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden animate-modal-appear">
        {/* Header */}
        <div className="bg-orange-50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <ImageOff className="w-6 h-6 text-orange-500 mr-3" />
            <h2 className="text-xl font-semibold text-orange-700">
              Delete Profile Image
            </h2>
          </div>
          <button
            onClick={() => setIsDeletingProfile(false)}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5">
          <p className="text-gray-700 mb-4">
            You're about to delete your profile image:
          </p>

          <p className="text-sm text-gray-600">
            This action will remove your current profile picture. You can upload
            a new one later from your account settings.
          </p>
        </div>

        <div className="px-6 py-4 bg-orange-50 flex justify-end gap-3">
          <button
            onClick={() => setIsDeletingProfile(false)}
            className="px-4 py-2 text-orange-700 border-2 border-orange-700 rounded-lg hover:bg-orange-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteProfile}
            disabled={isDeleting}
            className={`px-4 py-2 text-white bg-orange-600 rounded-lg transition-colors flex items-center ${
              !isDeleting
                ? "hover:bg-orange-700"
                : "opacity-70 cursor-not-allowed"
            }`}
          >
            {isDeleting ? (
              <>
                <Loader className="h-5 w-5 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              "Confirm Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProfileImageModal;
