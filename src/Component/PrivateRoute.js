import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ children }) {
  const isLoggedIn = useAuth();

  return isLoggedIn && isLoggedIn?.role === "student" ? (
    children
  ) : (
    <Navigate to="/" />
  );
}
