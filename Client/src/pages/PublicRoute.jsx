import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

function PublicRoute({ children }) {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/myprofile" />;
  }

  return children;
}

export default PublicRoute;