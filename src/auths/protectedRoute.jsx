import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
//  const token = localStorage.getItem("token");

  if (true) {
    return <Navigate to="/dashboard
    " />;
  }

  return children;
}
