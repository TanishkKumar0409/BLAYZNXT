import React, { useCallback, useEffect, useMemo, useState } from "react";
import { matchPath, Navigate, useLocation, useParams } from "react-router-dom";
import { API } from "./API";

export default function Protected({ children }) {
  const { username } = useParams();
  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const path = location.pathname;

  const memoizedUser = useMemo(() => authUser, [authUser]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, tokenResponse] = await Promise.all([
          API.get("/profile"),
          API.get("/get-token"),
        ]);
        setAuthUser(userResponse.data);
        setToken(tokenResponse.data.token);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const publicPaths = [
    "/forgot-password",
    "/verify/:username",
    "/reset/password/:email",
    "/about",
    "/contact",
    "/legal/:legal",
  ];

  const nonLoginPaths = ["/", "/login", "/register"];

  const roleRoutes = {
    USER: [
      "/main/:username",
      "/main/:username/storage",
      "/main/:username/history",
      "/main/:username/file/view/:id",
      "/main/:username/profile",
      "/main/:username/profile/update",
    ],
    ADMIN: [
      "/main/:username",
      "/main/:username/storage",
      "/main/:username/history",
      "/main/:username/profile",
      "/main/:username/file/view/:id",
      "/main/:username/profile/update",
      "/main/:username/dashboard/:role",
      "/main/:username/dashboard/:role/:name",
      "/main/:username/dashboard/query/contact",
      "/main/:username/dashboard/query/contact/:objectID",
      "/main/:username/dashboard/query/newsletters",
      "/main/:username/dashboard/legal/updates",
    ],
  };

  const isPathMatching = (paths) =>
    paths.some((route) => matchPath(route, path));

  if (loading) return null;

  if (token && isPathMatching(nonLoginPaths)) {
    return <Navigate to={`/main/${authUser?.username}`} replace />;
  }

  if (!token && !isPathMatching([...nonLoginPaths, ...publicPaths])) {
    return <Navigate to="/" replace />;
  }

  if (memoizedUser?.role) {
    const allowedRoutes = roleRoutes[memoizedUser.role] || [];
    if (!isPathMatching([...allowedRoutes, ...publicPaths])) {
      return <Navigate to={`/main/${authUser?.username}`} replace />;
    }
  }

  if (authUser && username) {
    if (authUser?.username !== username) {
      return <Navigate to={`/main/${authUser?.username}`} replace />;
    }
  }

  return children;
}
