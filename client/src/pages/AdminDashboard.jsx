import { motion } from "framer-motion";

import AdminSidebar from "../components/admin/AdminSidebar";
import DashboardStats from "../components/admin/DashboardStats";
import RecentOrders from "../components/admin/RecentOrders";
import PopularFoods from "../components/admin/PopularFoods";
import RevenueChart from "../components/admin/RevenueChart";
import UserTable from "../components/admin/UserTable";
import InventoryTable from "../components/admin/InventoryTable";

function AdminDashboard() {

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div
        className="
        max-w-7xl
        mx-auto
        grid
        lg:grid-cols-4
        gap-8
        "
      >
        <AdminSidebar />

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
          lg:col-span-3
          space-y-8
          "
        >
          <DashboardStats />

          <RecentOrders />

          <div id="reports">
            <RevenueChart />
          </div>

          <div
            className="
            grid
            lg:grid-cols-2
            gap-8
            "
          >
            <PopularFoods />
            <InventoryTable />
          </div>

          <div id="users">
            <UserTable />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AdminDashboard;