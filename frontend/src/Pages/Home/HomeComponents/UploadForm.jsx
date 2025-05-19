import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Mail, MessageSquare, CheckCircle } from "lucide-react";

const UploadForm = ({ setShowLoginModal }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    setShowLoginModal(true);
  };

  const handleShare = (e) => {
    e.preventDefault();
    setShowLoginModal(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl"
      >
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 mb-6 text-center transition-all cursor-pointer
            ${
              isDragging
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-blue-400"
            }`}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => setShowLoginModal(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl" />
                <Upload className="h-12 w-12 text-blue-500 mx-auto mb-4 relative" />
              </motion.div>
              <p className="text-gray-600">
                Drag and drop your files here, or{" "}
                <span className="text-blue-500 font-medium">browse</span>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Supports any file type up to 4GB
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <form onSubmit={handleShare} className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recipient's Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message (optional)
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <textarea
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                rows={3}
                placeholder="Add a message..."
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/20 transition-all transform hover:-translate-y-1"
          >
            Share Files
          </button>

          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Files are encrypted end-to-end</span>
          </div>
        </form>
      </motion.div>
    </>
  );
};

export default UploadForm;
