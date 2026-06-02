import { motion } from "framer-motion";

import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import ProfileCard from "../components/dashboard/ProfileCard";
import StatsCards from "../components/dashboard/StatsCards";
import RecentOrders from "../components/dashboard/RecentOrders";
import FavoriteFoods from "../components/dashboard/FavoriteFoods";
import AccountSettings from "../components/dashboard/AccountSettings";

function Dashboard() {
  return (
    <div
      className="
      min-h-screen
      bg-gray-100
      p-6
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        grid
        lg:grid-cols-4
        gap-8
        "
      >
        <DashboardSidebar />

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
          <ProfileCard />

          <StatsCards />

          <RecentOrders />

          <FavoriteFoods />

          <AccountSettings />
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;