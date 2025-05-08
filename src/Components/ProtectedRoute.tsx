import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store/store";

const ProtectedRoute = () => {
  const { userData } = useSelector((state: RootState) => state.user);
  const accessToken = localStorage.getItem("accessToken");

  // Check if user is authenticated
  const isAuthenticated = accessToken && Object.keys(userData).length > 0;

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
