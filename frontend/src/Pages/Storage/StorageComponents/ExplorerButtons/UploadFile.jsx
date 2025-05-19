import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { API } from "../../../../context/API";
import toast from "react-hot-toast";

export default function UploadFileButton({
  userData,
  currentFolderId,
  getData,
}) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    const MAX_TOTAL_SIZE = userData?.totalStorage - userData?.usedStorage;

    if (!files.length) {
      toast.error("No valid folder or files selected.");
      return;
    }

    const totalSize = Array.from(files).reduce(
      (sum, file) => sum + file.size,
      0
    );
    if (totalSize > MAX_TOTAL_SIZE) {
      toast.error("Do not have Enough Space");
      return;
    }

    let uploadedBytes = 0;
    let successCount = 0;
    const totalFiles = files.length;

    setUploading(true);
    setUploadProgress(0);

    for (let i = 0; i < totalFiles; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("parentId", currentFolderId);
      formData.append("files", file);

      try {
        await API.post(`/storage/file/upload/${userData?.username}`, formData, {
          onUploadProgress: (progressEvent) => {
            uploadedBytes += progressEvent.loaded;
            const percent = Math.min((uploadedBytes / totalSize) * 100, 100);
            setUploadProgress(percent);
          },
        });
        successCount++;
      } catch (error) {
        toast.error(error?.response?.data?.error || "Internal Server Error");
      }
    }

    setUploading(false);
    setUploadProgress(0);

    if (successCount > 0) {
      toast(
        `${
          successCount > 1 ? `${successCount} Files are` : "File is"
        } uploaded successfully`
      );
    }

    getData();
    event.target.value = "";
  };

  return (
    <div className="space-y-2">
      {!uploading ? (
        <motion.label
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center space-x-2 hover:bg-green-50 transition-colors cursor-pointer"
        >
          <Upload className="w-5 h-5 text-green-600" />
          <span className="text-gray-700 font-medium">Upload</span>
          <input
            type="file"
            multiple
            className="hidden"
            onChange={handleFileUpload}
          />
        </motion.label>
      ) : (
        <motion.label
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white p-5 rounded-lg shadow-sm flex items-center justify-center space-x-2 hover:bg-green-50 transition-colors cursor-pointer"
        >
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-green-500 h-full transition-all duration-300 ease-out"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </motion.label>
      )}
    </div>
  );
}
