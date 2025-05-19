import { AnimatePresence, motion } from "framer-motion";
import { FileWarningIcon, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteQuery } from "../../../context/CallBacks";

export default function QueryDeleteModal({
  setShowDeleteConfirm,
  query,
  getQuery,
}) {
  const navigator = useNavigate();
  const { username } = useParams();
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden animate-modal-appear"
        >
          <div className="bg-red-50 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <FileWarningIcon className="w-6 h-6 text-red-500 mr-3" />
              <h2 className="text-xl font-semibold text-red-700">
                Delete This Query
              </h2>
            </div>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-6 py-5 text-justify">
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete this query? This action cannot be
              undone.
            </p>
          </div>
          <div className="px-6 py-4 bg-red-50 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(false)}
              className="px-4 py-2 text-red-700 hover:bg-red-100 border-2 border-red-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                DeleteQuery(query?._id, getQuery);
                navigator(`/main/${username}/dashboard/query/contact`);
              }}
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
