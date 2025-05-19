import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Calendar1, MailCheckIcon, Clock1 } from "lucide-react";
import { API } from "../../context/API";
import PageHeader from "../../Components/PageHeader/PageHeader";

const Newsletter = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const getData = useCallback(async () => {
    try {
      const response = await API.get(`/newsletter`);
      const data = response.data;
      setData(data);
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const filterData = () => {
    return data.filter((user) => {
      const matchesSearch =
        !searchQuery ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    });
  };

  const displayedData = filterData().slice(0, visibleCount);

  return (
    <>
      <PageHeader
        title={`All Newsletter`}
        subtitle="Stay Updated with the Latest News, Offers, and Insights Delivered Straight to Your Inbox."
        backgroundImage="/Images/newsletter_banner.jpeg"
      />
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
                All Newsletter
              </h2>

              <div className="flex space-x-2">
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
                    Search Newsletter
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
                        <MailCheckIcon className="w-4 h-4 mr-2" />
                        Email
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <Calendar1 className="w-4 h-4 mr-2" />
                        Subscribed Date
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <Clock1 className="w-4 h-4 mr-2" />
                        Subscribed Time
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
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(user.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long",
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(user.createdAt).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}
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

export default Newsletter;
