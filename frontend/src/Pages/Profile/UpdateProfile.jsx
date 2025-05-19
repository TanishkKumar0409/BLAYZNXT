import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { API } from "../../context/API";
import { UpdateUserValidation } from "../../context/ValidationSchemas";
import toast from "react-hot-toast";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState("");
  const getProfile = useCallback(async () => {
    try {
      const response = await API.get(`/profile`);
      setProfile(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const formik = useFormik({
    initialValues: {
      username: profile?.username || "",
      name: profile?.name || "",
      email: profile?.email || "",
      contact: profile?.contact || "",
      address: profile?.address || "",
      pincode: profile?.pincode || "",
      city: profile?.city || "",
      state: profile?.state || "",
      country: profile?.country || "",
    },
    validationSchema: UpdateUserValidation,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const response = await API.patch(`/user/${profile?.username}`, values);
        toast.success(response.data.message);
        navigate(`/main/${profile?.username}/profile`);
      } catch (error) {
        console.error(error.message);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-sm overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <h1 className="text-2xl font-bold text-white">Update Profile</h1>
          </div>

          <form onSubmit={formik.handleSubmit} className="p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  {...formik.getFieldProps("username")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled
                />
                {formik.errors.username && formik.touched.username && (
                  <small className="text-red-600">
                    {formik.errors.username}
                  </small>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  {...formik.getFieldProps("name")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {formik.errors.name && formik.touched.name && (
                  <small className="text-red-600">{formik.errors.name}</small>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  {...formik.getFieldProps("email")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {formik.errors.email && formik.touched.email && (
                  <small className="text-red-600">{formik.errors.email}</small>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="contact"
                  {...formik.getFieldProps("contact")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {formik.errors.contact && formik.touched.contact && (
                  <small className="text-red-600">
                    {formik.errors.contact}
                  </small>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  {...formik.getFieldProps("address")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {formik.errors.address && formik.touched.username && (
                  <small className="text-red-600">
                    {formik.errors.username}
                  </small>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  {...formik.getFieldProps("pincode")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {formik.errors.pincode && formik.touched.pincode && (
                  <small className="text-red-600">
                    {formik.errors.pincode}
                  </small>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  {...formik.getFieldProps("city")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {formik.errors.city && formik.touched.city && (
                  <small className="text-red-600">{formik.errors.city}</small>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  {...formik.getFieldProps("state")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {formik.errors.state && formik.touched.state && (
                  <small className="text-red-600">{formik.errors.state}</small>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  {...formik.getFieldProps("country")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {formik.errors.country && formik.touched.country && (
                  <small className="text-red-600">
                    {formik.errors.country}
                  </small>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <Link
                to={`/main/${profile?.username}/profile`}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default UpdateProfile;
