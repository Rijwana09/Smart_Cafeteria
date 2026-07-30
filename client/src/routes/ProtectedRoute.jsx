import AdminDashboard from "../pages/AdminDashboard";
import AdminOrders from "../pages/AdminOrders";

function ProtectedRoutes() {
  return (
    <Routes>
        <Route
        path="/admin"
        element={
            <AdminRoute>
            <AdminDashboard />
            </AdminRoute>
        }
        />
        <Route
            path="/admin/orders"
            element={
                <AdminRoute>
                <AdminOrders />
                </AdminRoute>
            }
            />
        </Routes>
        
        
    );
}

export default ProtectedRoutes;