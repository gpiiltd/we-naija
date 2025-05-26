import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const isTokenExpired = (token: string): boolean => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(""),
    );

    const { exp } = JSON.parse(jsonPayload);
    const currentTime = Math.floor(Date.now() / 1000);

    return exp < currentTime;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return true;
  }
};

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    // Skip the check if we're already on the login page
    if (location.pathname === "/login") {
      setIsAuthenticated(false);
      return;
    }

    const checkAuth = () => {
      const isValid =
        Boolean(accessToken) && !isTokenExpired(accessToken as string);
      setIsAuthenticated(isValid);

      if (!isValid) {
        navigate("/login", { replace: true });
      }
    };

    checkAuth();
  }, [accessToken, navigate, location.pathname]);

  // Show nothing while checking authentication
  if (isAuthenticated === null) {
    return null;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
