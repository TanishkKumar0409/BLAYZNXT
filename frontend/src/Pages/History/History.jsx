import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Calendar,
  Clock,
  Mail,
  MessageSquare,
  Link2,
  FileText,
  Filter,
  RefreshCw,
} from "lucide-react";
import { API } from "../../context/API";
import { useParams } from "react-router-dom";
import PageHeader from "../../Components/PageHeader/PageHeader";

const History = () => {
  const { username } = useParams();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [dayFilter, setDayFilter] = useState("");
  const [linkStatusFilter, setLinkStatusFilter] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2024 + 1 },
    (_, i) => 2024 + i
  );
  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("en", { month: "long" })
  );

  const getData = useCallback(async () => {
    try {
      const response = await API.get(`/share/history/user/${username}`);
      setData(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }, [username]);

  useEffect(() => {
    getData();
  }, [getData]);

  const filterData = () => {
    return data.filter((file) => {
      const matchesSearch =
        !searchQuery ||
        file.receiverEmail.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesYear =
        !yearFilter ||
        new Date(file.sharedAt).getFullYear() === parseInt(yearFilter, 10);
      const matchesMonth =
        !monthFilter ||
        new Date(file.sharedAt).getMonth() + 1 === parseInt(monthFilter, 10);
      const matchesDay =
        !dayFilter ||
        new Date(file.sharedAt).getDate() === parseInt(dayFilter, 10);
      const matchesStatus =
        !linkStatusFilter || file.deleteStatus === linkStatusFilter;

      return (
        matchesSearch &&
        matchesYear &&
        matchesMonth &&
        matchesDay &&
        matchesStatus
      );
    });
  };

  const displayedData = filterData().slice(0, visibleCount);
  const uniqueStatuses = Array.from(
    new Set(data.map((item) => item.deleteStatus))
  );

  return (
    <>
      <PageHeader
        title="History"
        subtitle="Effortlessly Access and Manage Your Complete History of Shared Files Anytime, from Any Device."
        backgroundImage="/Images/history_banner.jpeg"
      />
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
                Shared History
              </h2>

              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={getData}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </motion.button>
              </div>
            </div>

            {/* Filters Panel */}
            <motion.div
              initial={false}
              animate={{ height: isFilterOpen ? "auto" : 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Search by Email
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year
                  </label>
                  <select
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Month
                  </label>
                  <select
                    value={monthFilter}
                    onChange={(e) => setMonthFilter(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Month</option>
                    {months.map((month, index) => (
                      <option key={index + 1} value={index + 1}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Day
                  </label>
                  <select
                    value={dayFilter}
                    onChange={(e) => setDayFilter(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Day</option>
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Link Status
                  </label>
                  <select
                    value={linkStatusFilter}
                    onChange={(e) => setLinkStatusFilter(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Status</option>
                    {uniqueStatuses.map((status, index) => (
                      <option key={index} value={status}>
                        {status === "PENDING" ? "Active" : "Expired"}
                      </option>
                    ))}
                  </select>
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
                        <Calendar className="w-4 h-4 mr-2" />
                        Shared Date
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        Shared Time
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        Shared To
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <Link2 className="w-4 h-4 mr-2" />
                        Status
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        Files
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
                    displayedData.map((file, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(file.sharedAt).toLocaleDateString("en-GB")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(file.sharedAt).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {file.receiverEmail}
                        </td>
                        <td className="px-6 py-4">{file.message}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {file.deleteStatus === "PENDING" ? (
                            <div className="relative group cursor-pointer inline-block">
                              <span
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    `${import.meta.env.VITE_API_URL}/${
                                      file._id
                                    }`
                                  );
                                }}
                                className={`px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800`}
                              >
                                Active
                              </span>

                              {/* Tooltip */}
                              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-md bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none text-nowrap">
                                Click to copy link
                              </div>
                            </div>
                          ) : (
                            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                              Expired
                            </span>
                          )}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          {file.fileName.length} Files
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {data.length > visibleCount && (
              <div className="mt-6 text-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setVisibleCount(visibleCount + 10)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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

export default History;
