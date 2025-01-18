import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { matchPath } from "react-router-dom";
import { noFileAPI } from "../../Services/API/API";

export default function ProtectedRoutes({ children }) {
  const loginToken = localStorage.getItem("loginToken");
  const adminToken = localStorage.getItem("adminToken");

  const username = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const path = location.pathname;

  const [user, setUser] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        if (username) {
          const response = await noFileAPI.get(`/user/${username}`);
          setUser(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData()

  }, [username]);

  const nonLoginPaths = ["/", "/form"];
  const loginPaths = [
    "/main",
    "/main/history",
    "/main/storage",
    "/main/file/view/:folderId",
    "/main/user/:username",
    "/main/user/delete/account",
    "/main/user/delete/account/:username",
    "/main/user/update/account/:username",
    "/verify/send/:username",
  ];
  const adminPaths = [
    "/admin/dashboard",
    "/admin/dashboard/info",
    "/admin/dashboard/user",
    "/admin/dashboard/query",
    "/admin/dashboard/user/:username",
  ];

  const isPathMatching = (paths) =>
    paths.some((route) => matchPath(route, path));

  if (loginToken && nonLoginPaths.includes(path)) {
    return <Navigate to="/main" replace />;
  }

  if (!loginToken && isPathMatching(loginPaths)) {
    return <Navigate to="/" replace />;
  }

  if (!adminToken && isPathMatching(adminPaths)) {
    return <Navigate to="/" replace />;
  }

  if (isPathMatching(["/verify/:username"])) {
    if (user) {
      if (!user.verifyOTP) {
        return <Navigate to="/" replace />;
      }
    }
  }

  return children;
}
// ntij pdqd jzcn hycy
