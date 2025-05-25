import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import {
  Upload,
  Mail,
  MessageSquare,
  CheckCircle,
  Loader,
  X,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { API } from "../../../context/API";
import toast from "react-hot-toast";
import { UploadValidation } from "../../../context/ValidationSchemas";

const UploadForm = ({ setShowLink }) => {
  const { username } = useParams();
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = (acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    setIsDragging(false);
  };

  const removeFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    onDragOver: () => setIsDragging(true),
    multiple: true,
  });

  const formik = useFormik({
    initialValues: { email: "", message: "" },
    validationSchema: UploadValidation,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append(`email`, values.email);
      formData.append(`message`, values.message);
      files.map((item) => {
        formData.append("files", item);
      });

      try {
        setIsUploading(true);
        setUploadProgress(0);
        const response = await API.post(`/share/${username}`, formData, {
          timeout: 120000,
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        });

        setIsUploading(false);
        toast.success(response.data.message);
        setShowLink(response.data.savedHistory);
      } catch (error) {
        setIsUploading(false);
        toast.error(error?.response?.data?.error || "Internal Server Error");
      }
    },
  });

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    if (bytes < 1024 * 1024 * 1024)
      return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
    return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
  };

  const getTotalSize = () => {
    return formatFileSize(files.reduce((acc, file) => acc + file.size, 0));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="backdrop-blur-xl rounded-2xl p-8"
    >
      {!isUploading && (
        <div
          {...getRootProps()}
          className={`relative border-2 border-dashed rounded-xl p-8 mb-6 text-center transition-all cursor-pointer ${
            isDragging || isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-400"
          }`}
        >
          <input {...getInputProps()} />
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
      )}

      {files.length > 0 && !isUploading && (
        <div className="mb-4 text-left text-sm text-gray-600">
          <div className="flex justify-between items-center mb-2">
            <p className="font-medium">Selected Files: {files?.length} files</p>
            <p className="text-blue-600 font-medium">
              Total Size: {getTotalSize()}
            </p>
          </div>
          <ul className="space-y-2 max-h-[120px] overflow-auto">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-50 p-2 rounded-lg"
              >
                <span className="truncate flex-1">
                  {file.name} ({formatFileSize(file.size)})
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeFile(index);
                  }}
                  className="ml-2 p-1 hover:bg-red-100 rounded-full text-red-500 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isUploading && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Uploading files...
            </span>
            <span className="text-sm font-medium text-blue-600">
              {uploadProgress}%
            </span>
          </div>
          <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
              initial={{ width: "0%" }}
              animate={{ width: `${uploadProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-4">
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
              {...formik.getFieldProps(`email`)}
              name="email"
            />
          </div>
          {formik.errors.email && formik.touched.email && (
            <small className="text-red-600">{formik.errors.email}</small>
          )}
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
              {...formik.getFieldProps(`message`)}
              name="message"
              placeholder="Add a message..."
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isUploading || files.length === 0}
          className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 disabled:opacity-50 text-white py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/20 transition-all transform hover:-translate-y-1 flex items-center justify-center"
        >
          {isUploading ? (
            <>
              <Loader className="h-5 w-5 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            "Share Files"
          )}
        </button>

        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span>Files are encrypted end-to-end</span>
        </div>
      </form>
    </motion.div>
  );
};

export default UploadForm;
