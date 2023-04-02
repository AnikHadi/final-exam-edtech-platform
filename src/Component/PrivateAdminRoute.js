import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateAdminRoute({ children }) {
  const isLoggedIn = useAuth();

  return isLoggedIn && isLoggedIn?.role === "admin" ? (
    children
  ) : (
    <Navigate to="/admin" />
  );
}
