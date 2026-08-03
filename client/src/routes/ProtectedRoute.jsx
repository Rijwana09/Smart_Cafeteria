import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Wrap any route element with this component to require login,
// and optionally a specific role (e.g. "admin").
// Usage: <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={role === "admin" ? "/admin-login" : "/login"} replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
