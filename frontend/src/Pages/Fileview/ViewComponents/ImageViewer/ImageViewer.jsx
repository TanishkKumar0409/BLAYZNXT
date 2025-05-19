import React, { useState } from "react";
import { motion } from "framer-motion";
import { ZoomIn, ZoomOut, RotateCcw, RotateCw } from "lucide-react";
import { useLocation } from "react-router-dom";

const ImageViewer = ({ data }) => {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  const location = useLocation();
  const imageUrl =
    new URLSearchParams(location.search).get("url") ||
    `${import.meta.env.VITE_API_URL}/${data?.filePath}`;

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.1, 3));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));
  const handleRotateLeft = () => setRotation((prev) => prev - 90);
  const handleRotateRight = () => setRotation((prev) => prev + 90);

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Toolbar */}
        <div className="bg-white/10 backdrop-blur-xl rounded-lg p-4 mb-8 flex flex-wrap gap-4 justify-between items-center">
          <div className="flex space-x-2">
            <button
              onClick={handleZoomIn}
              className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              <ZoomIn className="w-6 h-6" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              <ZoomOut className="w-6 h-6" />
            </button>
            <button
              onClick={handleRotateLeft}
              className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
            <button
              onClick={handleRotateRight}
              className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              <RotateCw className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Image Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/5 backdrop-blur-xl rounded-lg p-4 flex items-center overflow-hidden justify-center"
          style={{ minHeight: "600px" }}
        >
          <motion.img
            src={imageUrl}
            alt="Preview"
            style={{
              transform: `scale(${scale}) rotate(${rotation}deg)`,
              maxWidth: "100%",
              maxHeight: "70vh",
              objectFit: "contain",
            }}
            className="transition-transform duration-200"
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.1}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ImageViewer;
