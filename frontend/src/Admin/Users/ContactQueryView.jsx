import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Trash2 } from "lucide-react";
import { API } from "../../context/API";
import { useParams } from "react-router-dom";
import { getStatusColor } from "../../context/CallBacks";
import QueryDeleteModal from "../AdminComponents/Modals/QueryDeleteModal";

const ContactQueriesView = () => {
  const { objectId } = useParams();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [status, setStatus] = useState("");
  const [query, setQuery] = useState("");

  const getQuery = useCallback(async () => {
    try {
      const response = await API.get(`/contact/${objectId}`);
      setQuery(response.data);
      setStatus(response.data.status);
    } catch (error) {
      console.error(error.message);
    }
  }, [objectId]);

  useEffect(() => {
    getQuery();
  }, [getQuery]);

  const toggleStatus = async () => {
    try {
      await API.patch(`/contact/${objectId}`);
      getQuery();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <motion.div
          initial={{ rotate: -10, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mr-4 p-3 bg-gradient-to-r from-blue-500/20 to-red-500/20 rounded-full"
        >
          <MessageSquare className="h-6 w-6 text-blue-600" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-gray-900"
        >
          Contact Queries
        </motion.h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Contact Query Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Name
                </label>
                <p className="text-gray-900">{query.name}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email
                </label>
                <p className="text-gray-900">{query.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Contact
                </label>
                <p className="text-gray-900">{query.contact}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Date
                </label>
                <p className="text-gray-900">
                  {new Date(query.createdAt).toLocaleDateString("en-US", {
                    weekday: "long",
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Subject
                </label>
                <p className="text-gray-900">{query.subject}</p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Message
                </label>
                <p className="text-gray-900 whitespace-pre-wrap">
                  {query.message}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <motion.span
              whileHover={{ scale: 1.05 }}
              onClick={toggleStatus}
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                status
              )} cursor-pointer`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </motion.span>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDeleteConfirm(true)}
              className="text-red-600 hover:text-red-900"
            >
              <Trash2 className="h-5 w-5" />
            </motion.button>
          </div>

          {showDeleteConfirm && (
            <>
              <QueryDeleteModal
                query={query}
                getQuery={getQuery}
                setShowDeleteConfirm={setShowDeleteConfirm}
              />
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ContactQueriesView;
