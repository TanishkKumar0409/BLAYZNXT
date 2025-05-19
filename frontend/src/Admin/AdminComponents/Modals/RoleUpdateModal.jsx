import { AnimatePresence, motion } from "framer-motion";
import { Users, X } from "lucide-react";
import { RoleUpdate } from "../../../context/CallBacks";

export default function RoleUpdateModal({ setPrmoteModal, user, getData }) {
  const isAdmin = user.role === "ADMIN";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden animate-modal-appear"
        >
          <div className="bg-indigo-50 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <Users className="w-6 h-6 text-indigo-600 mr-3" />
              <h2 className="text-xl font-semibold text-indigo-700">
                {isAdmin ? "Demote to User" : "Promote to Admin"}
              </h2>
            </div>
            <button
              onClick={() => setPrmoteModal(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-6 py-5 text-justify">
            <p className="text-gray-700 mb-4">
              {isAdmin
                ? "Are you sure you want to demote this Admin to a regular user? They will lose access to admin controls and privileges."
                : "Are you sure you want to promote this user to Admin? Admins have full access to the system and can manage users, content, and settings."}
            </p>
          </div>

          <div className="px-6 py-4 bg-indigo-50 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setPrmoteModal(false)}
              className="px-4 py-2 text-indigo-700 hover:bg-indigo-100 border-2 border-indigo-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                await RoleUpdate(user?.username, user?.role, getData);
                setPrmoteModal("");
              }}
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {isAdmin ? "Demote" : "Prmote"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
