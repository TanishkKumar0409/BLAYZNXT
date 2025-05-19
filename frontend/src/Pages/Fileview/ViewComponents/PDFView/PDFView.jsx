import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const PDFViewer = ({ data }) => {
  const location = useLocation();
  const pdfUrl =
    new URLSearchParams(location.search).get("url") ||
    `${import.meta.env.VITE_API_URL}/${data?.filePath}`;

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/5 backdrop-blur-xl rounded-lg p-4 flex items-center justify-center"
          style={{ minHeight: "800px" }}
        >
          <iframe
            src={pdfUrl}
            title="PDF Viewer"
            className="w-full h-[800px] rounded-lg"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default PDFViewer;
