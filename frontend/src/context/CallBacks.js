import { API } from "./API";
import toast from "react-hot-toast";

export const handleDownload = async (username, id) => {
  try {
    const APIurl = import.meta.env.VITE_API_URL;
    window.location.href = `${APIurl}/api/storage/file/download?username=${username}&folderId=${id}`;
  } catch (error) {
    console.error(error.message);
  }
};

export const handleLogout = async () => {
  try {
    const response = await API.get(`/logout`);
    toast.success(response?.data?.message);
    window.location.reload();
  } catch (error) {
    toast.error(error?.response?.data?.error || "Internal Server Error");
  }
};

export const handleResendVerifyOpt = async (username) => {
  try {
    const response = await API.get(`/verify/resend/${username}`);
    toast.success(response.data.message);
  } catch (error) {
    toast.error(error?.response?.data?.error || "Internal Server Error");
  }
};
export const BlockUserFunction = async (username, finalize) => {
  try {
    const response = await API.patch(`/status/${username}/blocked`);
    toast.success(response.data.message);
  } catch (error) {
    toast.error(error?.response?.data?.error || "Internal Server Error");
  } finally {
    finalize();
  }
};
export const RoleUpdate = async (username, role, finalize) => {
  const mainRole = role === "ADMIN" ? "user" : "admin";

  try {
    const response = await API.patch(`/role/${username}/${mainRole}`);
    toast.success(response.data.message);
  } catch (error) {
    toast.error(error?.response?.data?.error || "Internal Server Error");
  } finally {
    finalize();
  }
};
export const DeleteQuery = async (id, finalize) => {
  try {
    const response = await API.delete(`/contact/${id}`);
    toast.success(response.data.message);
  } catch (error) {
    toast.error(error?.response?.data?.error || "Internal Server Error");
  } finally {
    finalize();
  }
};

export const getStatusColor = (status) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "ACTIVE":
      return "bg-green-100 text-green-800";
    case "COMPLETED":
      return "bg-blue-100 text-blue-800";
    case "SUSPENDED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
