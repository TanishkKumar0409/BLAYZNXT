import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import JoditEditor from "jodit-react";
import { Loader, Send } from "lucide-react";
import { useFormik } from "formik";
import { API } from "../../context/API";
import { LegalValidation } from "../../context/ValidationSchemas";
import { useSearchParams } from "react-router-dom";
import { getEditorConfig } from "../../context/EditorConfigs";
import toast from "react-hot-toast";

const tabs = [
  { name: "Terms And Conditions", tabId: "term" },
  { name: "Privacy Policy", tabId: "privacy" },
  { name: "Disclaimers", tabId: "disclaimers" },
];

const Legals = () => {
  const editor = useRef(null);
  const editorConfig = useMemo(() => getEditorConfig(), []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allLegals, setAllLegals] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const defaultTab = searchParams.get("tabId") || "term";
  const [activeTab, setActiveTab] = useState(defaultTab);

  const updateSearchParams = (tabId) => {
    setSearchParams({ tabId });
  };

  useEffect(() => {
    const tabId = searchParams.get("tabId");
    if (tabId && tabs.some((tab) => tab.tabId === tabId)) {
      setActiveTab(tabId);
    }
  }, [searchParams]);

  const getAllLegal = useCallback(async () => {
    try {
      const response = await API.get(`/legal`);
      setAllLegals(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  useEffect(() => {
    getAllLegal();
  }, [getAllLegal]);

  const formik = useFormik({
    initialValues: {
      tabId: activeTab,
      title: tabs.find((t) => t.tabId === activeTab)?.name || "",
      legal_description:
        allLegals.find((t) => t.tabId === activeTab)?.legal_description || "",
    },
    enableReinitialize: true,
    validationSchema: LegalValidation,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const response = await API.post(`/legal`, values);
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response?.data?.error || "Submission failed");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto pb-2 hide-scrollbar">
            {tabs.map((item, index) => (
              <motion.button
                key={index}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                onClick={() => updateSearchParams(item.tabId)}
                className={`relative flex items-center whitespace-nowrap px-6 py-3 font-medium text-sm transition-all duration-200 mx-1 first:ml-0 ${
                  activeTab === item.tabId
                    ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {item.name}
                {activeTab === item.tabId && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute opacity-100 -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 relative"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {tabs.find((t) => t.tabId === activeTab)?.name}
        </h2>

        <form onSubmit={formik.handleSubmit}>
          <JoditEditor
            ref={editor}
            config={editorConfig}
            value={formik.values.legal_description}
            onChange={(newContent) =>
              formik.setFieldValue("legal_description", newContent)
            }
            className="mb-6"
          />
          {formik.errors.legal_description &&
            formik.touched.legal_description && (
              <p className="text-red-500 text-sm mb-4">
                {formik.errors.legal_description}
              </p>
            )}

          <div className="flex justify-end">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
              className={`
                flex items-center px-6 py-3 rounded-full font-medium text-white 
                transition-all shadow-md hover:shadow-lg
                bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600
                ${isSubmitting ? "opacity-60 cursor-not-allowed" : ""}
              `}
            >
              {isSubmitting ? (
                <Loader className="animate-spin" />
              ) : (
                <>
                  <span>Submit</span>
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Legals;
