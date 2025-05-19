import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  RefreshCw,
  Eye,
  Settings2,
  Activity,
  CheckCircle,
  UserCheck,
  User,
  UserX2,
  UserCog2,
} from "lucide-react";
import { API } from "../../context/API";
import { Link, useParams } from "react-router-dom";
import PageHeader from "../../Components/PageHeader/PageHeader";
import BlockUser from "../AdminComponents/Modals/BlockUser";
import RoleUpdateModal from "../AdminComponents/Modals/RoleUpdateModal";

const Admin = () => {
  const { username, role } = useParams();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState("");
  const [showPromoteModal, setShowPromoteModal] = useState("");

  const getData = useCallback(async () => {
    try {
      const response = await API.get(`/users`);
      const data = response.data;
      setData(data?.filter((item) => item.role === role?.toUpperCase()));
    } catch (error) {
      console.error(error.message);
    }
  }, [role]);

  useEffect(() => {
    getData();
  }, [getData]);

  const filterData = () => {
    return data.filter((user) => {
      const matchesSearch =
        !searchQuery ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.contact.toString().includes(searchQuery) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    });
  };

  const displayedData = filterData().slice(0, visibleCount);

  return (
    <>
      <PageHeader
        title={`All ${role}`}
        subtitle="Browse through our user directory to connect, collaborate, and discover new opportunities."
        backgroundImage="/Images/admin_banner.jpeg"
      />
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
                All {role}
              </h2>

              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={getData}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg flex items-center"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg flex items-center"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </motion.button>
              </div>
            </div>

            <motion.div
              initial={false}
              animate={{ height: isFilterOpen ? "auto" : 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Search {role}
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter username,name,email,contact"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Table */}
            <div className="overflow-x-auto shadow">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Username
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <UserCheck className="w-4 h-4 mr-2" />
                        Name
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Verified
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <Activity className="w-4 h-4 mr-2" />
                        Status
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <Settings2 className="w-4 h-4 mr-2" />
                        Actions
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {displayedData.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-4 text-center text-gray-500 text-lg"
                      >
                        No data available
                      </td>
                    </tr>
                  ) : (
                    displayedData.map((user, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {index + 1}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.username}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.name}
                        </td>
                        <td className="px-6 py-4">
                          {user.isVerified ? (
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                              Verified
                            </span>
                          ) : (
                            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                              Unverified
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {user.status === "ACTIVE" ? (
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                              Active
                            </span>
                          ) : (
                            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                              BLOCKED
                            </span>
                          )}
                        </td>
                        <td className="flex gap-1 px-6 py-4 text-sm text-gray-900">
                          <Link
                            to={`/main/${username}/dashboard/${role}/${user.username}`}
                            className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            <Eye />
                          </Link>
                          <button
                            className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium"
                            title={`Make ${
                              user?.role === "ADMIN" ? "User" : "Admin"
                            }`}
                            onClick={() => setShowPromoteModal(user)}
                          >
                            <UserCog2 />
                          </button>
                          {user?.status !== "BLOCKED" && (
                            <button
                              onClick={() => setShowBlockModal(user)}
                              className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium"
                              title="Block User"
                            >
                              <UserX2 />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {showBlockModal && (
              <BlockUser
                user={showBlockModal}
                getData={getData}
                setShowBlockModal={setShowBlockModal}
              />
            )}
            {showPromoteModal && (
              <RoleUpdateModal
                user={showPromoteModal}
                getData={getData}
                setPrmoteModal={setShowPromoteModal}
              />
            )}

            {data.length > visibleCount && (
              <div className="mt-6 text-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setVisibleCount(visibleCount + 10)}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg"
                >
                  Load More
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
