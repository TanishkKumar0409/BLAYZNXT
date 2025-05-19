import { useState, useCallback, useEffect } from "react";
import { API } from "../../context/API";
import { useParams } from "react-router-dom";
import {
  Activity,
  CheckCircle,
  Mail,
  MapPin,
  Phone,
  User,
  UserCog,
  UserX,
} from "lucide-react";
import BlockUser from "../AdminComponents/Modals/BlockUser";
import RoleUpdateModal from "../AdminComponents/Modals/RoleUpdateModal";

function AdminView() {
  const { name } = useParams();
  const [user, setUser] = useState("");
  const [promoteModal, setPrmoteModal] = useState(false);
  const [showBlockUserModal, setShowBlockUserModal] = useState(false);

  const getUser = useCallback(async () => {
    try {
      const response = await API.get(`/user/${name}`);
      setUser(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <div className="min-h-screen bg-gray-50 py-5">
      <div className="max-w-5xl mx-auto shadow-sm rounded-2xl overflow-hidden">
        <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-8 py-16 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]" />
          <div className="relative flex flex-col items-center z-10">
            <div className="relative group">
              <div className="w-36 h-36 bg-white rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-lg overflow-hidden transition-all duration-300">
                {user?.profile ? (
                  <img
                    src={`${import.meta.env.VITE_API_URL}/${user?.profile}`}
                    alt={user?.username || "User"}
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                ) : (
                  <User className="w-20 h-20 text-indigo-500" />
                )}
              </div>
            </div>

            <h1 className="text-3xl font-bold text-white tracking-tight">
              {user.username || "User"}
            </h1>

            {user?.isVerified ? (
              <div className="mt-2 px-3 py-1 bg-green-500/20 backdrop-blur-sm text-green-50 text-sm font-medium rounded-full">
                Verified Account
              </div>
            ) : (
              <div className="mt-2 px-3 py-1 bg-amber-500/20 backdrop-blur-sm text-amber-50 text-sm font-medium rounded-full">
                Unverified Account
              </div>
            )}
          </div>
        </div>

        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              User Information
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <div className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                <label className="text-sm text-gray-500 block mb-2">
                  Full Name
                </label>

                <div className="flex items-center">
                  <User className="w-5 h-5 text-indigo-400 mr-3" />
                  <p className="text-lg font-medium text-gray-900">
                    {user?.name || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                <label className="text-sm text-gray-500 block mb-2">
                  Email
                </label>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-indigo-400 mr-3" />
                  <p className="text-lg font-medium text-gray-900">
                    {user.email || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                <label className="text-sm text-gray-500 block mb-2">
                  Phone
                </label>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-indigo-400 mr-3" />
                  <p className="text-lg font-medium text-gray-900">
                    {user.contact || "Not provided"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {user?.address &&
                user.city &&
                user.state &&
                user.pincode &&
                user.country && (
                  <div className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <label className="text-sm text-gray-500 block mb-2">
                      Address
                    </label>
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-indigo-400 mr-3 mt-1" />
                      <div>
                        <p className="text-lg font-medium text-gray-900 mb-1">
                          {user.address}
                        </p>
                        <p className="text-gray-600">
                          {user.city}, {user.state} {user.pincode}
                        </p>
                        <p className="text-gray-600">{user.country}</p>
                      </div>
                    </div>
                  </div>
                )}
              <div className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                <label className="text-sm text-gray-500 block mb-2">Role</label>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-indigo-400 mr-3 mt-1" />
                  <div>
                    <p className="text-lg font-medium text-gray-900 mb-1">
                      {user?.role}
                    </p>
                  </div>
                </div>
              </div>
              <div className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                <label className="text-sm text-gray-500 block mb-2">
                  Status
                </label>
                <div className="flex items-start">
                  <Activity className="w-5 h-5 text-indigo-400 mr-3 mt-1" />
                  <div>
                    {user.status === "ACTIVE" ? (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Active
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                        BLOCKED
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-8 pb-8">
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Account Actions
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setPrmoteModal(true)}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium rounded-lg transition-all duration-300"
              >
                <UserCog className="w-5 h-5" />
                Make {user?.role === "ADMIN" ? "User" : "Admin"}
              </button>{" "}
              {user?.status !== "BLOCKED" && (
                <button
                  onClick={() => setShowBlockUserModal(true)}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-red-200 hover:bg-red-50 text-red-600 font-medium rounded-lg transition-all duration-300"
                >
                  <UserX className="w-5 h-5" />
                  Block {user?.role === "ADMIN" ? "Admin" : "User"}
                </button>
              )}
            </div>
          </div>

          {promoteModal && (
            <RoleUpdateModal
              user={user}
              getData={getUser}
              setPrmoteModal={setPrmoteModal}
            />
          )}

          {showBlockUserModal && (
            <BlockUser
              user={user}
              getData={getUser}
              setShowBlockModal={setShowBlockUserModal}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminView;
