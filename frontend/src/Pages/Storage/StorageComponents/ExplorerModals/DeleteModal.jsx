import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { API } from "../../../../context/API";
import toast from "react-hot-toast";

const DeleteModal = ({
  isOpen,
  onClose,
  selectedItem,
  userData,
  setSelectedItem,
  setIsOpen,
  getProfile,
}) => {
  const handleDeleteItem = async () => {
    if (!selectedItem) {
      toast.error("No item selected to delete.");
      return;
    }

    try {
      const response = await API.delete("/storage/folder/delete", {
        data: { username: userData?.username, folderId: selectedItem },
      });

      setSelectedItem(null);
      setIsOpen(false);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.error || "Internal Server Error");
    } finally {
      onClose();
      getProfile();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden"
          >
            {/* Title Bar */}
            <div className="bg-red-50 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
                <h2 className="text-xl font-semibold text-red-700">
                  Confirm Delete
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 text-center">
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete this item? This action cannot be
                undone.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="px-6 py-4 bg-red-50 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-red-700 hover:bg-red-100 border-2 border-red-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteItem}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeleteModal;
