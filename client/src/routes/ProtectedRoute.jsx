import AdminDashboard from "../pages/AdminDashboard"

function ProtectedRoutes() {
  return (
        <Route
        path="/admin"
        element={
            <AdminRoute>
            <AdminDashboard />
            </AdminRoute>
        }
        />
    );
}

export default ProtectedRoutes;