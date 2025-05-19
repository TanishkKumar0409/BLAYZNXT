import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import {
  Calendar,
  Clock,
  Mail,
  MessageSquare,
  Link2,
  FileText,
} from "lucide-react";
import { API } from "../../../context/API";

export default function HistoryTable() {
  const { username } = useParams();
  const [data, setData] = useState([]);

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

  return (
    <section className="py-16 md:px-16 bg-white">
      <div className="container mx-auto px-5">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Recent History</h2>
          <Link
            to={`/main/${username}/history`}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            View All
          </Link>
        </div>

        <div className="overflow-x-auto shadow">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  S.No.
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
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-4 text-center text-gray-500 text-lg"
                  >
                    No data available
                  </td>
                </tr>
              ) : (
                data.slice(0, 5).map((file, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
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
                                `${import.meta.env.VITE_API_URL}/${file._id}`
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
      </div>
    </section>
  );
}
