import { AnimatePresence, motion } from "framer-motion";
import { UserX, X } from "lucide-react";
import { BlockUserFunction } from "../../../context/CallBacks";

export default function BlockUser({ setShowBlockModal, user, getData }) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden animate-modal-appear"
        >
          <div className="bg-orange-50 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <UserX className="w-6 h-6 text-orange-500 mr-3" />
              <h2 className="text-xl font-semibold text-orange-700">
                Block This User
              </h2>
            </div>
            <button
              onClick={() => setShowBlockModal(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-6 py-5 text-justify">
            <p className="text-gray-700 mb-4">
              Are you sure you want to block this user? This action will prevent
              them from accessing or interacting with your account. You can
              unblock them later if needed.
            </p>
          </div>
          <div className="px-6 py-4 bg-orange-50 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowBlockModal(false)}
              className="px-4 py-2 text-orange-700 hover:bg-orange-100 border-2 border-orange-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                await BlockUserFunction(user?.username, getData);
                setShowBlockModal("");
              }}
              type="submit"
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Block
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
