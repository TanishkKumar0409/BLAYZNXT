import React from "react";
import { motion } from "framer-motion";
import { Download, FileQuestion, AlertCircle } from "lucide-react";
import { handleDownload } from "../../../../context/CallBacks";

const UnknownFileViewer = ({ data, userData }) => {
  const fileName = data ? data?.root : "Unknown File";

  return (
    <div className="bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-xl rounded-lg p-4 mb-8 flex flex-wrap gap-4 justify-between items-center">
          <div className="flex items-center space-x-2 text-white">
            <FileQuestion className="w-6 h-6" />
            <span>Unknown File Type</span>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/5 backdrop-blur-xl rounded-lg p-8 flex flex-col items-center justify-center text-center"
          style={{ minHeight: "400px" }}
        >
          <FileQuestion className="w-24 h-24 text-gray-400 mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">{fileName}</h2>

          <div className="bg-yellow-500/20 text-yellow-200 px-6 py-4 rounded-lg flex items-center mb-6">
            <AlertCircle className="w-6 h-6 mr-3 flex-shrink-0" />
            <p>
              This file type cannot be previewed in the browser. Please download
              the file to view its contents.
            </p>
          </div>

          <div className="grid md:grid-cols-1 gap-4 w-full max-w-lg">
            <button
              onClick={() => handleDownload(userData?.username, data?.folderId)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Download File</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UnknownFileViewer;
