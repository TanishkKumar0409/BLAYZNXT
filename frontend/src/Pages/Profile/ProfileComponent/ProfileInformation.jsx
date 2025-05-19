import React from "react";
import { Mail, Phone, MapPin, Edit } from "lucide-react";
import { Link } from "react-router-dom";

const ProfileInformation = ({ profile }) => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">
          Profile Information
        </h2>
        <Link
          to={`/main/${profile?.username}/profile/update`}
          className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Personal Information */}
        <div className="space-y-6">
          <div className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
            <label className="text-sm text-gray-500 block mb-2">
              Full Name
            </label>
            <p className="text-lg font-medium text-gray-900">
              {profile?.name || "Not provided"}
            </p>
          </div>

          <div className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
            <label className="text-sm text-gray-500 block mb-2">Email</label>
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-indigo-400 mr-3" />
              <p className="text-lg font-medium text-gray-900">
                {profile.email || "Not provided"}
              </p>
            </div>
          </div>

          <div className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
            <label className="text-sm text-gray-500 block mb-2">Phone</label>
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-indigo-400 mr-3" />
              <p className="text-lg font-medium text-gray-900">
                {profile.contact || "Not provided"}
              </p>
            </div>
          </div>
        </div>

        {profile?.address &&
          profile.city &&
          profile.state &&
          profile.pincode &&
          profile.country && (
            <div className="space-y-6">
              <div className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                <label className="text-sm text-gray-500 block mb-2">
                  Address
                </label>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-indigo-400 mr-3 mt-1" />
                  <div>
                    <p className="text-lg font-medium text-gray-900 mb-1">
                      {profile.address}
                    </p>
                    <p className="text-gray-600">
                      {profile.city}, {profile.state} {profile.pincode}
                    </p>
                    <p className="text-gray-600">{profile.country}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default ProfileInformation;
