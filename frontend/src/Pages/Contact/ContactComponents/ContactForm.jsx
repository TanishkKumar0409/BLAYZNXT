import { useState } from "react";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { Loader, Send } from "lucide-react";
import { contactValidation } from "../../../context/ValidationSchemas";
import { API } from "../../../context/API";
import toast from "react-hot-toast";

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
    validationSchema: contactValidation,
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      try {
        const response = await API.post(`/contact`, values);
        setIsSubmitted(response.data.message);
        resetForm();
      } catch (error) {
        toast.error(error?.response?.data?.error || "Internal Server Error");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Send Us a Message
        <span className="block mt-2 w-20 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600"></span>
      </h2>

      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-lg bg-green-50 border border-green-100 mb-6"
        >
          <h3 className="text-lg font-semibold text-green-700 mb-2">
            Message Sent Successfully!
          </h3>
          <p className="text-green-600">{isSubmitted}</p>
        </motion.div>
      ) : (
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                className={`w-full px-4 py-3 rounded-lg border ${
                  formik.errors.name
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors`}
              />
              {formik.errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                className={`w-full px-4 py-3 rounded-lg border ${
                  formik.errors.email
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors`}
              />
              {formik.errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
                className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors ${
                  formik.errors.phone
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                } `}
              />
              {formik.errors.phone && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.phone}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                onChange={formik.handleChange}
                value={formik.values.subject}
                className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors`}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              onChange={formik.handleChange}
              value={formik.values.message}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors`}
            ></textarea>
            {formik.errors.message && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.message}
              </p>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/20 transition-all flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <Loader className="h-5 w-5 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Send Message
              </>
            )}
          </motion.button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
