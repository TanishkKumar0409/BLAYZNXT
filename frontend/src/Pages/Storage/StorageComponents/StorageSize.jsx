import { HardDrive } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { API } from "../../../context/API";

export default function StorageSize() {
  const [profile, setProfile] = useState({});
  const [storageData, setStorageData] = useState({ total: 0, used: 0 });

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

  useEffect(() => {
    setStorageData({
      total: profile.totalStorage || 0,
      used: profile.usedStorage || 0,
    });
  }, [profile]);

  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const usagePercentage =
    storageData.total > 0 ? (storageData.used / storageData.total) * 100 : 0;

  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <HardDrive className="w-6 h-6 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Storage Usage
            </h2>
          </div>
          <span className="text-sm text-gray-600">
            {formatBytes(storageData.used)} of {formatBytes(storageData.total)}{" "}
            used
          </span>
        </div>
        <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`absolute left-0 top-0 h-full rounded-full transition-all duration-300 ${
              usagePercentage > 80
                ? "bg-gradient-to-r from-orange-700 to-red-700"
                : usagePercentage > 50
                ? "bg-gradient-to-r from-yellow-700 to-orange-700"
                : "bg-gradient-to-r from-green-700 to-yellow-700"
            }`}
            style={{ width: `${usagePercentage}%` }}
          />
        </div>
        <div className="mt-2 text-sm text-gray-600">
          {formatBytes(storageData.total - storageData.used)} available
        </div>
      </div>
    </div>
  );
}
