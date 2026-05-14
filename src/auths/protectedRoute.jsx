import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
 // const token = localStorage.getItem("token");
 const isAuth = false 
  if (isAuth) {
    return <Navigate to="/Login
    " />;
  }

  return children;
}
