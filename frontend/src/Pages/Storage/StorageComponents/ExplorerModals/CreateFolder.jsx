import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderPlus, X } from "lucide-react";
import { API } from "../../../../context/API";
import toast from "react-hot-toast";

const CreateFolderModal = ({
  isOpen,
  onClose,
  setIsOpen,
  userData,
  currentFolderId,
}) => {
  const [folderName, setFolderName] = useState("");

  const handleCreateFolder = async (e) => {
    e.preventDefault();
    if (!folderName.trim()) {
      toast.error("Folder name cannot be empty.");
      return;
    }

    try {
      const response = await API.post("/storage/folder/create", {
        username: userData?.username,
        root: folderName,
        parentId: currentFolderId,
      });

      setFolderName("");
      setIsOpen(false);
      onClose();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.error || "Internal Server Error");
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
            className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden animate-modal-appear"
          >
            <div className="bg-purple-50 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <FolderPlus className="w-6 h-6 text-purple-500 mr-3" />
                <h2 className="text-xl font-semibold text-purple-700">
                  Create Folder
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateFolder}>
              <div className="px-6 py-5">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Folder Name
                  </label>
                  <input
                    type="text"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter folder name"
                    requipurple
                  />
                </div>
              </div>
              <div className="px-6 py-4 bg-purple-50 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-purple-700 hover:bg-purple-100 border-2 border-purple-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Create
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateFolderModal;
